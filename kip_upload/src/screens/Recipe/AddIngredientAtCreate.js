import React, { useLayoutEffect,useState } from "react";
import { Text, View, Image, StyleSheet} from "react-native";
import { fetchGetRequest} from "../../data/MockDataAPI";
import { TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { ScrollView, TextInput, TouchableWithoutFeedback } from "react-native-gesture-handler";

const AddIngredientAtCreate = ({ route, navigation }) => {

    const { recipeItem} = route.params;


  return (   
    <View>
        <Text>{recipeItem.title}</Text>
    </View>
      
  );
}

const styles2 = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Add a semi-transparent background
  },
  popupContainer: {
    backgroundColor: '#474747',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
});

export default AddIngredientAtCreate;