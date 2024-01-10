import React, { useEffect, useLayoutEffect,useContext, useState } from "react";
import {ScrollView,Text,View,Image,Dimensions,TouchableHighlight,StyleSheet} from "react-native";
import styles from "./styles";
import BackButton from "../../components/BackButton/BackButton";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Octicons } from '@expo/vector-icons';
import { fetchGetRequest } from "../../data/MockDataAPI";
import { AntDesign } from '@expo/vector-icons';
import { UserContext } from '../../data/UserContext';

export default function TestScreen(props) {
  const { navigation, route } = props;
  const item = route.params?.item;
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [ingredientsArray, setIngredientsArray] = useState([]);
  const { userId } = useContext(UserContext);

  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    try {
      const recipeData = await fetchGetRequest("recipes/"+ userId +"/recipe/"+ item.id + "/ingredients");
      setRecipeIngredients(recipeData);
      console.log("recipeIngredients:", recipeIngredients);
      getIngredientsArray(recipeData); // Call the function without 'await'
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  const getIngredientsArray = async (recipeData) => {
    const tempIngredientsArray = [];
    for (let i = 0; i < recipeData.length; i++) {
      try {
        const ingredientData = await fetchGetRequest("ingredients/"+ userId+"/ingredient/"+ recipeData[i].ingredientId);
        tempIngredientsArray.push(ingredientData);
      } catch (error) {
        console.error("Error fetching ingredient data:", error);
      }
    }
  
    //console.log("tempIngredientsArray:", tempIngredientsArray);
    setIngredientsArray(tempIngredientsArray);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: "true",
      headerLeft: () => (
        <BackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
      headerRight: () => <View />,
    });
  }, []);


  const handleUpdateDescription = () => {
    navigation.navigate("UpdateRecipe", { item });
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      
      <View style={styles.carouselContainer}> 
        <Image style={styles.image} source={{ uri: item.photo_url }} />
      </View>
      <View style={{backgroundColor:'#FFFFFF',flexDirection:'row',top:5,marginBottom:5,left:5,borderRadius:5,borderColor:'#F5C794',position:'absolute'}}>           
          <TouchableOpacity style={{backgroundColor:'#FFFFFF', borderRadius:5, flexDirection:'row'}} onPress={handleGoBack} >
                <AntDesign name="arrowleft" size={45} color="#FFC27C" />
                <Text style={{fontSize:20,textAlign:'center', color:'#FFAB4B', textAlignVertical:'center', paddingRight:10}}>Geri</Text>
          </TouchableOpacity>
      </View>

      <View style={styles.infoRecipeContainer}>
          <Text style={styles.infoRecipeName}>{item.title}</Text>

          <View style={styles.infoContainer}>
            
            
            <TouchableHighlight style={{justifyContent:'center' }}  underlayColor='#FFFFFF' onPress={() => {console.log(">>>>"+item.id) ;navigation.navigate("IngredientsDetails", { item })}}>
                <View style={{flex:1,height:50,width:170,borderColor:'#F5C794',borderRadius:10, borderWidth:0,alignItems:'center',marginRight:5, backgroundColor:'#FFF3E9'}}>
                <Text style={{fontSize:14,color:'#FF8521',top:15}}>Malzemeleri Görüntüle</Text>
                </View>
            </TouchableHighlight>

            <TouchableHighlight style={{}} onPress={handleUpdateDescription}>
              <View style={{width:80,height:50, justifyContent:'center', borderRadius:10, borderWidth:0, borderColor:'#F5C794',marginLeft:5, backgroundColor:'#FFF3E9'}}>
                  <Text style={{textAlign:'center', color:'#FF8521'}}>Düzenle</Text>
              </View>    
            </TouchableHighlight>
            
          </View>
          
          {recipeIngredients.length > 0 && ingredientsArray.length > 0 && (
            recipeIngredients.map((ingredient, index) => (
              <View key={index} style={{backgroundColor:'#FFFFFF00',top:10,marginTop:0,borderRadius:5, alignSelf:'flex-start', flexDirection:'row', alignItems:'center',left:2}}>
                <Octicons name="dot" size={15} color="#FF9640" />
                <Text style={{color:'#ACACAC', textAlignVertical:'center', fontSize:20, left:5}}> {recipeIngredients[index].quantity} {ingredientsArray[index].unit} {ingredientsArray[index].name} </Text>
              </View>
            ))
          )}


          <View style={styles.infoContainer2}>
            <Text style={styles.infoDescriptionRecipe}>{item.description}</Text>
          </View>
      </View>
    </ScrollView>
  );
}

