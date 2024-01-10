import React, {useState, useEffect, useContext } from "react";
import {BackHandler,FlatList, Text, View, TouchableHighlight, Image, Alert, ScrollView} from "react-native";
import styles from "./styles";
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity} from "react-native-gesture-handler";
import { Entypo } from '@expo/vector-icons';
import { fetchGetRequest, fetchDeleteRequest } from "../../data/MockDataAPI";
import { useFocusEffect } from '@react-navigation/native';

import { UserContext } from '../../data/UserContext';

export default function HomeScreen(props) {
  const { navigation } = props;
  const [fetchedRecipes, setFetchedRecipes] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const { userId } = useContext(UserContext);

  useEffect(() => {
    getRecipes();
    const unsubscribe = navigation.addListener('focus', getRecipes); // Add this listener
      
    return unsubscribe;
  }, []);

  const onPressRecipe = (item) => {
    navigation.navigate("TestScreen", { item });
  };

  const renderRecipes = ({ item }) => (
      <TouchableHighlight underlayColor="transparent" onLongPress={()=>handleLongPress(item)} onPress={() => onPressRecipe(item)}>
        <View style={styles.container}>
          <Image style={styles.photo} source={{ uri: item.photo_url }} />
          <Text style={styles.title}>{item.title}</Text>
        </View>
      </TouchableHighlight>
  );

  const getRecipes = async () => {
    try {
      const data = await fetchGetRequest(`recipes/${userId}`);
      //console.log(data);
      setFetchedRecipes(data);
    } catch (error) {
      console.error('Error getting recipes:', error);
    }
  };

  const CreateRecipe = () => {
    navigation.navigate("CreateRecipe");
  };

  const handleOption1 = () => {
    
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert("Çıkış Yap", "Çıkış yapmak istediğinize emin misiniz?", [
          {
            text: "İptal",
            onPress: () => null,
            style: "cancel"
          },
          { text: "Çıkış Yap", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );


  const handleLongPress = (item) => {
    setSelectedRecipe(item);
    Alert.alert(
      'Silmek istediğinize emin misiniz?',
      '',
      [
        {
          text: 'İptal',
          onPress: handleOption1,
        },
        {
          text: 'Sil',
          onPress: () => handleDelete(item.id), // Passing item id
        },
      ],
      { cancelable: true }
    );
  };
  

  const handleDelete = async (itemId) => {

    const uri = `recipes/${userId}/recipe/${itemId}`;
    //console.log("|"+uri);
    try {
      await fetchDeleteRequest(uri, itemId);
    }
    catch (error) {
      //console.error('Error deleting recipe:', error);
    }
    
    getRecipes(); // Refresh the recipes

  };

  return (
    <View style={{backgroundColor:'#131313', flex: 1 }}>

        <View style={{ flexDirection: 'row', backgroundColor: '#131313', height: 50, width: '100%', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ paddingLeft: 15}}>
              <Entypo name="menu" size={40} color="#F5C794" />
            </TouchableOpacity>
            <Text style={{ flex: 1, color: '#F5C794', fontSize: 20, fontWeight: 'bold', textAlign: 'center', maxWidth:'72%'}}>Tariflerim</Text>
        </View>

        <FlatList vertical showsVerticalScrollIndicator={false} numColumns={3} data={fetchedRecipes} renderItem={renderRecipes} keyExtractor={(item) => item.recipeId}/>
            
        

    <View style={{flex:1,flexDirection:'row', position:'absolute',width:'100%',height:50, justifyContent:'center', bottom:20}}>
            <TouchableOpacity onPress={CreateRecipe} underlayColor="transparent" style={{paddingHorizontal:15,paddingVertical:10,backgroundColor:'#FFFFFF', borderRadius:50, justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                <AntDesign name="plus" size={30} color="#FFA24B"/>
                <Text style={{fontSize:20, color:'#FFA24B'}}>Tarif Oluştur</Text>
            </TouchableOpacity>
        </View>
        </View>
  );
}
