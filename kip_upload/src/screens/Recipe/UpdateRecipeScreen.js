import React, { useLayoutEffect, useState, useEffect, useContext} from "react";
import {Text,View, Image, StyleSheet} from "react-native";
import { ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from '@expo/vector-icons';
import { fetchPostRequest, fetchPutRequest } from "../../data/MockDataAPI";
import { UserContext } from '../../data/UserContext';
import * as ImagePicker from 'expo-image-picker';

export default function UpdateRecipeScreen(props){
    const { navigation, route } = props;
    const [ingredientName, setIngredientName] = useState("");
    const [ingredientUnit, setIngredientUnit] = useState("");
    const [ingredientPrice, setIngredientPrice] = useState("");
    const { item } = route.params;
    const { userId } = useContext(UserContext);
    const [image, setImage] = useState(null);

    useLayoutEffect(() => {  
        console.log(">"+item.title);

    }, [navigation, route]);

    const handleIngredientNameChange = (text) => {
        setIngredientName(text);
    };

    const handleIngredientUnitChange = (text) => {
        setIngredientUnit(text);
    };

    const handleImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64:true
      });
  
  
      if (!result.canceled) {
        
      }
      else{
        navigation.goBack();
      }


      const formData = new FormData();
      formData.append('image', result.assets[0].base64);
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
        setImage(responseJson.data.display_url);

      })
      .catch(error => {
        console.error('Upload failed', error);
        //setGeneratedImageUrl(imageURL);
      });
    };

    const CreateButton = async () => {
      
        const newRecipeData = {
          title: ingredientName,
          description: ingredientUnit,
          photo_url: image ? image : "https://www.southernliving.com/thmb/HSEUOjJVCl4kIRJRMAZ1eblQlWE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Millionaire_Spaghetti_019-34e9c04b1ae8405088f53450a048e413.jpg"
        };
        
        console.log("item.id>>" + item.id);

        try {
          await fetchPutRequest("recipes/"+userId+"/recipe/"+item.id, newRecipeData);
          navigation.goBack();
        } catch (error) {
          //console.error('Error while creating recipe:', error);
        }

        navigation.goBack();
    };
      

   
    const handleGoBack = () => {
        navigation.goBack();
    };

    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{backgroundColor:'#202020', height:'100%', width:'100%',alignItems:'center'}}>
          <Image source={{ uri: item.photo_url }} style={styles.image} />
          <View style={{backgroundColor:'#FFFFFF',flexDirection:'row',top:5,marginBottom:5,left:5,borderRadius:5,borderColor:'#F5C794',position:'absolute'}}>           
          <TouchableOpacity style={{backgroundColor:'#FFFFFF', borderRadius:5, flexDirection:'row'}} onPress={handleGoBack} >
                <AntDesign name="arrowleft" size={45} color="#FFC27C" />
                <Text style={{fontSize:20,textAlign:'center', color:'#FFAB4B', textAlignVertical:'center', paddingRight:10}}>Geri</Text>
          </TouchableOpacity>
          </View>
          <View style={{backgroundColor:'#97979700',marginTop:20,borderTopLeftRadius:50,borderTopRightRadius:50,width:'95%'}}>
              <Text style={{fontSize:20,backgroundColor:'#F1444400',marginTop:5, color:'#DFB27E',paddingLeft:20}}> Tarif adını giriniz :</Text>
              <TextInput onChangeText={handleIngredientNameChange} placeholderTextColor="#DFB27E" style={{paddingLeft:20,backgroundColor:'#F0F0F0',marginTop:10,borderWidth:0,borderRadius:10,width:'90%',alignSelf:'center', height:50, marginBottom:10}}>   
              {item.title}
              </TextInput>
          </View>

          <View style={{backgroundColor:'#97979700',marginTop:20,width:'95%',borderTopLeftRadius:0,borderTopRightRadius:0}}>
              <Text style={{fontSize:20,backgroundColor:'#F1444400',marginTop:5, color:'#DFB27E',paddingLeft:20}}>Tarif açıklamasını giriniz :</Text>
              <TextInput multiline onChangeText={handleIngredientUnitChange} placeholder="Tarif Açıklaması" placeholderTextColor="#DFB27E" style={{paddingLeft:20,backgroundColor:'#F0F0F0',marginTop:10,borderWidth:0,borderRadius:10,width:'90%',alignSelf:'center', marginBottom:10, height: Math.max(50, ingredientUnit.length * 0.3)}}>
                {item.description}
              </TextInput>
          </View>

          <View style={{backgroundColor:'#97979700',marginTop:20,width:'95%',borderTopLeftRadius:0,borderTopRightRadius:0}}>
              <Text style={{fontSize:20,backgroundColor:'#F1444400',marginTop:5, color:'#DFB27E',paddingLeft:20}}> Fotoğraf Ekle : (İsteğe Bağlı)</Text>
              <TouchableOpacity onPress={handleImage} style={{backgroundColor:'#F0F0F0',marginTop:10,borderWidth:0,borderRadius:10,width:'90%',alignSelf:'center', height:50, marginBottom:10, flexDirection:'row', alignItems:'center'}}>
                  <AntDesign name="camera" size={24} color="#9B9B9B" style={{marginLeft:20}}/>
                  <Text style={{marginLeft:5, color:'#DFB27E'}}>Fotoğrafı Değiştir</Text>
              </TouchableOpacity>                 
          </View>  

          <View style={{backgroundColor:'#41414100',position:'absolute', bottom:20,alignSelf:'center'}}>
              <TouchableOpacity onPress={CreateButton} style={{backgroundColor:'#6ECC62',marginTop:10,borderColor:'#FFFFFF',borderWidth:0,borderRadius:20,alignSelf:'center', height:50, marginBottom:10, flexDirection:'row', justifyContent:'center', alignItems:'center',paddingHorizontal:20}}>
                  <Text style={{marginLeft:0, color:'white',fontSize:20}}>Güncelle</Text>
              </TouchableOpacity>
          </View>

          <View style={{height:500}}>

          </View>  
      </View>
      </ScrollView>
    );
};

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    position:'absolute'
  },
  image: {
    width: '100%',
    height: '30%',
  },
});
