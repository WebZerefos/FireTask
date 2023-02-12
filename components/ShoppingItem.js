import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {CheckCircleIcon} from 'react-native-heroicons/outline';
import {TrashIcon, MinusCircleIcon} from 'react-native-heroicons/solid';
import moment from 'moment';

const ShoppingItem = ({item, onDelete, onUpdate}) => {
  return (
    <View className="flex-row items-center bg-slate-300 p-1 w-[90%] self-center rounded-lg my-2">
      {/* checked icon */}
      <Pressable onPress={onUpdate}>
        {item.isChecked ? (
          <MinusCircleIcon size={28} color="red" />
        ) : (
          <CheckCircleIcon size={28} color="black" />
        )}
      </Pressable>
      {/* shopping text */}
      <View className="flex-1">
        <Text className="text-1xl font-bold tracking-widest  text-slate-700 ml-3">
          {item.name}
        </Text>
        <Text className="text-xs font-bold tracking-widest  text-slate-400 ml-3">
          {moment(item.created).format('DD/M/YY')}
        </Text>
      </View>
      {/* delete button */}
      <Pressable onPress={onDelete}>
        <TrashIcon size={24} color="black" />
      </Pressable>
    </View>
  );
};

export default ShoppingItem;
