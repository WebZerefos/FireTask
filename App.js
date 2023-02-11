import {Pressable, Text, SafeAreaView, View, TextInput} from 'react-native';
import React from 'react';
import ShoppingItem from './components/ShoppingItem';

import {TrashIcon} from 'react-native-heroicons/outline';

const App = () => {
  return (
    <SafeAreaView className="flex-1">
      <View className="w-[90%] self-center flex-row mt-5 items-center justify-between p-3">
        {/* Heading */}
        <Text className=" flex-1 text-3xl font-bold text-slate-700">
          Shopping List
        </Text>

        {/* shopping items count */}
        <Text className="text-sm font-bold text-slate-700 mx-2">
          [ 3 <Text>items ]</Text>
        </Text>
        {/* delete all */}
        <Pressable>
          <TrashIcon size={24} color="black" />
        </Pressable>
      </View>
      <ShoppingItem />
      {/* text input */}
      <TextInput
        placeholder="Enter item..."
        className="bg-slate-100 p-3 w-[90%] self-center rounded-full mt-auto"
      />
    </SafeAreaView>
  );
};

export default App;
