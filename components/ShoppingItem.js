import {View, Text, Pressable} from 'react-native';
import React, {useState} from 'react';
import {CheckCircleIcon} from 'react-native-heroicons/outline';
import {TrashIcon, MinusCircleIcon} from 'react-native-heroicons/solid';

const ShoppingItem = () => {
  const [isChecked, setIsCheck] = useState(false);

  const onCheckedHandler = () => {
    setIsCheck(!isChecked);
  };
  return (
    <View className="flex-row items-center bg-slate-300 p-2 w-[90%] self-center rounded-lg my-2">
      {/* checked icon */}
      <Pressable onPress={onCheckedHandler}>
        {isChecked ? (
          <MinusCircleIcon size={32} color="black" />
        ) : (
          <CheckCircleIcon size={32} color="black" />
        )}
      </Pressable>
      {/* shopping text */}
      <Text className="text-lg font-bold tracking-widest flex-1 text-slate-700 ml-3">
        Bread
      </Text>
      {/* delete button */}
      <Pressable>
        <TrashIcon size={24} color="black" />
      </Pressable>
    </View>
  );
};

export default ShoppingItem;
