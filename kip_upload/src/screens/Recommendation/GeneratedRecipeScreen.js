import React, { useEffect, useLayoutEffect,  useState, useContext } from "react";
import {ScrollView,Text,View,Image,TouchableHighlight} from "react-native";
import styles from "./styles";
import BackButton from "../../components/BackButton/BackButton";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Octicons } from '@expo/vector-icons';
import { fetchGetRequest, fetchPutRequest } from "../../data/MockDataAPI";
import { AntDesign } from '@expo/vector-icons';
import { UserContext } from '../../data/UserContext';

export default function GeneratedRecipeScreen(props) {
  const { navigation, route } = props;
  const item = route.params?.item;
  const imageURL = "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505";
  const { userId } = useContext(UserContext);
  const [generatedImageUrl,setGeneratedImageUrl] = useState("C:\Users\ersel\Desktop\Internet Technologies\project\v6\kip\assets\def_image.png");


  useEffect(() => {
      fetchGeneratedImage();
  }, []);
  
  
  const fetchGeneratedImage = async () => {
      const formData = new FormData();
      formData.append('image', item.photo_url);
      formData.append('expiration', 10000000);
      formData.append('key', 'e2f5fca222a36e259f51b36cd69ba158'); // Replace with your actual API key

        // API request
      await fetch('https://api.imgbb.com/1/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => response.json())
      .then(responseJson => {
        console.log('Upload successful', responseJson);
        setGeneratedImageUrl(responseJson.data.display_url);

      })
      .catch(error => {
        console.error('Upload failed', error);
        setGeneratedImageUrl(imageURL);
      });
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



  const handleGoBack = () => {
    navigation.goBack();
  };

  

  const handleSaveGeneratedRecipe = async () => {
    const newRecipeData = {
      title: item.title,
      description: item.instructions,
      ingredients: item.ingredients,
      photo_url: generatedImageUrl
    };
    
    try {
      console.log("newRecipeData:", newRecipeData.description);
      await fetchPutRequest('recipes/'+userId+"/generated", newRecipeData);
      
      

    } catch (error) {
      //console.error('Error while creating ingredient:', error);
    }

    navigation.navigate("Home");
  }


  return (
    <ScrollView style={styles.container}>
      
      <View style={styles.carouselContainer}> 
        <Image style={styles.image} source={{ uri: generatedImageUrl}} />
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
            
            
            <TouchableHighlight style={{justifyContent:'center' }}  underlayColor='#FFFFFF' onPress={handleSaveGeneratedRecipe}>
                <View style={{flex:1,height:50,width:170,borderColor:'#F5C794',borderRadius:10, borderWidth:0,alignItems:'center',marginRight:5, backgroundColor:'#FFF3E9'}}>
                <Text style={{fontSize:14,color:'#FF8521',top:15}}>Tariflerime Kaydet</Text>
                </View>
            </TouchableHighlight>

           
            
          </View>
          
          {item.ingredients.length > 0 && (
            item.ingredients.map((ingredient, index) => (
              <View key={index} style={{backgroundColor:'#FFFFFF00',top:10,marginTop:0,borderRadius:5, alignSelf:'flex-start', flexDirection:'row', alignItems:'center',left:2}}>
                <Octicons name="dot" size={15} color="#FF9640" />
                <Text style={{color:'#ACACAC', textAlignVertical:'center', fontSize:20, left:5}}> {item.ingredients[index].quantity} {item.ingredients[index].unit} {item.ingredients[index].name} </Text>
              </View>
            ))
          )}


          <View style={styles.infoContainer2}>
            <Text style={styles.infoDescriptionRecipe}>{item.instructions}</Text>
          </View>
      </View>
    </ScrollView>
  );
}

