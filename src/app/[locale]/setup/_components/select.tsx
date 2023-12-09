"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import Button from "~/components/button";
import { cn } from "~/server/utils/cn";

export interface SelectOption {
  value: string;
  label: string;
}

export default function Select({
  title,
  options,
  hasAllOption = false,
  defaultValues = [],
  multi = false,
  onSelect = () => undefined,
}: {
  title: string;
  options: SelectOption[];
  hasAllOption?: boolean;
  defaultValues?: string[];
  multi?: boolean;
  onSelect: (values: string[]) => void;
}) {
  if (hasAllOption && !multi) {
    throw new Error("When there is an all option, 'multi' needs to be true");
  }

  if (!multi && defaultValues.length > 1) {
    throw new Error(
      "More than 1 default value was passed, but 'multi' is not true",
    );
  }

  const t = useTranslations();

  const allOption = {
    value: "",
    label: t("select_all_option"),
  };

  if (options.find((o) => o.value === allOption.value)) {
    throw new Error(
      "Do not use '' as a value in your options. That value is reserved for the all-option. Use 'hasAllOption' parameter for this.",
    );
  }

  const allOptions = (hasAllOption ? [allOption] : []).concat(options);

  const [selectedValues, changeSelectedValues] = useState(
    defaultValues.includes(allOption.value) ? [allOption.value] : [],
  );

  const onOptionClick = (value: string) => {
    let newValues: string[] = selectedValues;
    if (multi) {
      if (value === allOption.value) {
        // single select all option
        newValues = [];
      } else {
        // a single option is clicked
        const index = newValues.indexOf(value);
        if (index !== -1) {
          // unselect single option
          newValues = newValues
            .slice(0, index)
            .concat(newValues.slice(index + 1));
        } else {
          // select option
          newValues = newValues.concat(value);
        }
      }
    } else if (newValues.includes(value)) {
      // unselect single option
      newValues = [];
    } else {
      // select single option
      newValues = [value];
    }

    if (newValues !== selectedValues) {
      changeSelectedValues(newValues);
    }

    onSelect(newValues);
  };

  return (
    <div className="mt-6 flex w-full flex-col">
      <p className="text-3xl">{title}</p>
      <div className="pb-4" />
      <div className="-my-2 w-full">
        {allOptions.map(({ value, label }) => (
          <Button
            key={`select-${title}-option-${value}`}
            className={cn(
              "m-2",
              selectedValues.includes(value) ??
                (!selectedValues.length && value === allOption.value)
                ? "selected"
                : "",
            )}
            onClick={() => onOptionClick(value)}
          >
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
}
