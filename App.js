import {
  Pressable,
  Text,
  SafeAreaView,
  View,
  TextInput,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ShoppingItem from './components/ShoppingItem';
import firestore from '@react-native-firebase/firestore';

import {TrashIcon} from 'react-native-heroicons/outline';

const App = () => {
  const [itemInput, setItemInput] = useState('');
  const [shoppingList, setShoppingList] = useState([]);

  const onAddItem = () => {
    if (itemInput === '') {
      return;
    }

    firestore()
      .collection('ShoppingList')
      .add({
        name: itemInput,
        isChecked: false,
        created: new Date(),
      })
      .then(() => {
        console.log('Item added!');
        setItemInput('');
      })
      .catch(err => {
        console.log('Error: ', err.message);
      });
  };

  const onDeleteItem = id => {
    firestore()
      .collection('ShoppingList')
      .doc(id)
      .delete()
      .then(() => {
        console.log('Item Deleted!');
      });
  };

  const deleteShoppingListItems = async () => {
    // Get all items in the shoppingList
    const shoppingListQuerySnapshot = await firestore()
      .collection('ShoppingList')
      .get();

    // Create a new batch instance
    const batch = firestore().batch();

    shoppingListQuerySnapshot.forEach(documentSnapshot => {
      batch.delete(documentSnapshot.ref);
    });

    return batch.commit();
  };

  const onUpdate = item => {
    firestore()
      .collection('ShoppingList')
      .doc(item.id)
      .update({
        isChecked: !item.isChecked,
      })
      .then(() => {
        console.log('Item updated!');
      });
  };

  useEffect(() => {
    firestore()
      .collection('ShoppingList')
      .orderBy('created', 'desc')
      .get()
      .then(querySnapshot => {
        const shoppingListArray = [];

        querySnapshot.forEach(documentSnapshot => {
          const {name, isChecked, created} = documentSnapshot.data();
          shoppingListArray.push({
            id: documentSnapshot.id,
            name,
            isChecked,
            created,
          });
        });

        setShoppingList(shoppingListArray);
      })
      .catch(err => {
        console.log('Error: ', err.message);
      });
  }, [shoppingList]);

  return (
    <SafeAreaView className="flex-1">
      <View className="w-[90%] self-center flex-row mt-5 items-center justify-between p-3">
        {/* Heading */}
        <Text className=" flex-1 text-3xl font-bold text-slate-700">
          Shopping List
        </Text>

        {/* shopping items count */}
        <Text className="text-sm font-bold text-slate-700 mx-2">
          [ {shoppingList.length} <Text>items ]</Text>
        </Text>

        {/* delete all */}
        <Pressable onPress={deleteShoppingListItems}>
          <TrashIcon size={24} color="black" />
        </Pressable>
      </View>

      {/* ShoppingList */}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={shoppingList}
        renderItem={({item}) => (
          <ShoppingItem
            item={item}
            onDelete={() => onDeleteItem(item.id)}
            onUpdate={() => onUpdate(item)}
          />
        )}
      />

      {/* text input */}
      <TextInput
        placeholder="Enter item..."
        className="bg-slate-100 p-3 w-[90%] self-center rounded-full mt-auto"
        value={itemInput}
        onChangeText={text => setItemInput(text)}
        onSubmitEditing={onAddItem}
      />
    </SafeAreaView>
  );
};

export default App;
