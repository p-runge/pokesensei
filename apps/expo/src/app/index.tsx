import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

import { api } from "~/utils/api";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <View className="mt-4 flex gap-2">
      <TextInput
        className=" items-center rounded-md border border-input bg-background px-3 text-lg leading-[1.25] text-foreground"
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
      />
      <TextInput
        className="items-center rounded-md border border-input bg-background px-3  text-lg leading-[1.25] text-foreground"
        value={content}
        onChangeText={setContent}
        placeholder="Content"
      />
    </View>
  );
}

export default function Index() {
  const utils = api.useUtils();

  return (
    <SafeAreaView className=" bg-background">
      {/* Changes page title visible on the header */}
      <Stack.Screen options={{ title: "Home Page" }} />
      <View className="h-full w-full bg-background p-4">
        <Text className="pb-2 text-center text-5xl font-bold text-foreground">
          Create <Text className="text-primary">T3</Text> Turbo
        </Text>

        <Pressable
          onPress={() => void utils.quiz.getById.invalidate()}
          className="flex items-center rounded-lg bg-primary p-2"
        >
          <Text className="text-foreground"> Refresh posts</Text>
        </Pressable>

        <View className="py-2">
          <Text className="font-semibold italic text-primary">
            Press on a post
          </Text>
        </View>

        <CreatePost />
      </View>
    </SafeAreaView>
  );
}
