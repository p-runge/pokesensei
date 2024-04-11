import { SafeAreaView, Text, View } from "react-native";
import { Stack, useGlobalSearchParams } from "expo-router";

import { api } from "~/utils/api";

export default function Post() {
  const { id } = useGlobalSearchParams();
  if (!id || typeof id !== "string") throw new Error("unreachable");
  const { data } = api.quiz.getById.useQuery({ id, language: "en" });

  if (!data) return null;

  return (
    <SafeAreaView className="bg-background">
      <Stack.Screen options={{ title: data.id }} />
      <View className="h-full w-full p-4">
        <Text className="py-2 text-3xl font-bold text-primary">{data.id}</Text>
        <Text className="py-4 text-foreground">
          {data.questions.map((q) => q.label).join()}
        </Text>
      </View>
    </SafeAreaView>
  );
}
