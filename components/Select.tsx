import { useTranslation } from "next-i18next";
import { useState } from "react";

export interface SelectOption {
  value: string;
  label: string;
  // TODO: maybe add "example" that's shown on hover
}

const Select: React.FC<{
  title: string;
  options: SelectOption[];
  hasAllOption?: boolean;
  defaultValues?: string[];
  multi?: boolean;
  onSelect: (values: string[]) => void;
}> = ({
  title,
  options,
  hasAllOption = false,
  defaultValues = [],
  multi = false,
  onSelect = () => undefined,
}) => {
  if (hasAllOption && !multi) {
    throw new Error("When there is an all option, 'multi' needs to be true");
  }

  if (!multi && defaultValues.length > 1) {
    throw new Error(
      "More than 1 default value was passed, but 'multi' is not true"
    );
  }

  const { t } = useTranslation();

  const allOption = {
    value: "",
    label: t("select_all_option"),
  };

  if (options.find((o) => o.value === allOption.value)) {
    throw new Error(
      "Do not use '' as a value in your options. That value is reserved for the all-option. Use 'hasAllOption' parameter for this."
    );
  }

  const allOptions = (hasAllOption ? [allOption] : []).concat(options);

  if (
    defaultValues.length &&
    defaultValues.find((v) => {
      return !allOptions.find((o) => {
        return o.value === v;
      });
    })
  ) {
    throw new Error("At least one default value does not overlap with options");
  }

  const [selectedValues, changeSelectedValues] = useState(
    defaultValues === [allOption.value] ? [] : defaultValues
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
    <div className="w-full flex flex-col mt-6">
      <p className="text-3xl">{title}</p>
      <div className="pb-4" />
      <div className="w-full -my-2">
        {allOptions.map(({ value, label }) => (
          <button
            key={`select-${title}-option-${value}`}
            type="button"
            className={`btn-primary m-2 ${
              selectedValues.includes(value) ||
              (!selectedValues.length && value === allOption.value)
                ? "selected"
                : ""
            }`}
            onClick={() => onOptionClick(value)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Select;
