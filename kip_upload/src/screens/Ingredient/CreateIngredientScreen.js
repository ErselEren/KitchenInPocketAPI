import React, { useLayoutEffect, useState, useContext } from "react";
import {Text,View,Modal,StyleSheet, Image} from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from '@expo/vector-icons';
import { fetchPostRequest } from "../../data/MockDataAPI";
import { UserContext } from '../../data/UserContext';
import * as ImagePicker from 'expo-image-picker';

export default function CreateIngredientScreen(props) {
    const { navigation, route } = props;
    const [ingredientName, setIngredientName] = useState("");
    const [ingredientUnit, setIngredientUnit] = useState("");
    const [ingredientPrice, setIngredientPrice] = useState("");
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const { userId } = useContext(UserContext);
    const [image, setImage] = useState(null);

    const handleImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64:true
      });
  
      //console.log(result);
  
      if (!result.canceled) {
        
      }
      else{
        navigation.goBack();
      }


      //console.log(">>>"+result.assets[0].base64);


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


    useLayoutEffect(() => {  
    }, [navigation, route]);

    
    const handleIngredientNameChange = (text) => {
        setIngredientName(text);
    };

   

    const CreateButton = async () => {
        const parsedIngredientPrice = parseFloat(ingredientPrice);
      
        const ingredientData = {
          name: ingredientName,
          unit: "gr",
          unitPrice: "0.0",
          photo_url: image,
        };
      
        try {
          await fetchPostRequest('ingredients/'+userId+"/ingredient", ingredientData);
          closePopup();
          navigation.goBack();
        } catch (error) {
          //console.error('Error while creating ingredient:', error);
        }
        navigation.goBack();
      };
      
      
    return (
    <View style={{flex:1}}>
        <View style={{backgroundColor:'#202020', height:'100%', width:'100%',alignItems:'center'}}>
        <Image source={{ uri: "https://www.foodbusinessnews.net/ext/resources/TopicLandingPages/Product-Development-Ingredient-Applications.jpg?1519144948" }} style={styles.image} />
        
        <View style={{backgroundColor:'#4D1C0D00',marginTop:20,borderTopLeftRadius:50,borderTopRightRadius:50,width:'95%'}}>
            <Text style={{fontSize:20,backgroundColor:'#F1444400',marginTop:5, color:'#DFB27E',paddingLeft:30}}> Malzeme adını giriniz :</Text>
            <TextInput value={ingredientName} onChangeText={handleIngredientNameChange} placeholder="Malzeme Adı" placeholderTextColor="#DFB27E" style={{backgroundColor:'#FFFFFF',marginTop:10,borderWidth:0,borderRadius:10,width:'90%',alignSelf:'center', height:50, marginBottom:10, paddingLeft:20}}>   
            </TextInput>
        </View>

        {/* <View style={{backgroundColor:'#FF774D',marginTop:20,width:'90%',borderTopLeftRadius:50,borderTopRightRadius:50}}>    
            <Text style={{fontSize:20,backgroundColor:'#F1444400',marginTop:5, color:'#FFFFFF',alignSelf:'center'}}> Malzemenin birimini seçin :</Text>
            <TouchableOpacity onPress={openPopup} style={{justifyContent:'center'}}>
                <Text style={{fontSize:20,left:10,color:'white',paddingHorizontal:5,backgroundColor:'#535353',borderRadius:5,textAlign:'center'}}>gr</Text>
            </TouchableOpacity>
        </View>

        <View style={{backgroundColor:'#FF774D',marginTop:20,width:'90%',borderTopLeftRadius:50,borderTopRightRadius:50}}>
            <Text style={{fontSize:20,backgroundColor:'#F1444400',marginTop:5, color:'#FFFFFF',alignSelf:'center'}}> Malzemenin birim fiyatını giriniz :</Text>
            <TextInput value={ingredientPrice} onChangeText={handleIngredientPriceChange} placeholder="    Birim Fiyatı" placeholderTextColor="#9B9B9B" style={{backgroundColor:'#D6D6D6',marginTop:10,borderWidth:1,borderRadius:20,width:'90%',alignSelf:'center', height:40, marginBottom:10}}></TextInput>
        </View> */}

        <View style={{backgroundColor:'#FF774D00',marginTop:20,width:'95%',borderTopLeftRadius:50,borderTopRightRadius:50}}>
            <Text style={{fontSize:20,backgroundColor:'#F1444400',marginTop:5, color:'#DFB27E',paddingLeft:30}}> Fotoğraf Ekle : (İsteğe Bağlı)</Text>
            <TouchableOpacity onPress={handleImage} style={{backgroundColor:'#FFFFFF',marginTop:10,borderWidth:0,borderRadius:10,width:'90%',alignSelf:'center', height:50, marginBottom:10, flexDirection:'row', alignItems:'center'}}>
                <AntDesign name="camera" size={24} color="#DFB27E" style={{marginLeft:10}}/>
                <Text style={{marginLeft:10, color:'#DFB27E'}}>Fotoğraf Ekle</Text>
            </TouchableOpacity>                 
        </View>  
        
        <View>
          <Image source={{ uri: image }} style={{ width: 350, height: 200, borderRadius:5 }} />
        </View>

        <View style={{backgroundColor:'#41414100',position:'absolute', bottom:20,alignSelf:'center'}}>
            <TouchableOpacity onPress={CreateButton} style={{backgroundColor:'#6ECC62',marginTop:10,borderColor:'#FFFFFF',borderWidth:0,borderRadius:20,alignSelf:'center', height:50, marginBottom:10, flexDirection:'row', justifyContent:'center', alignItems:'center',paddingHorizontal:20}}>
                <AntDesign name="plus" size={25} color="white" style={{}}/>
                <Text style={{marginLeft:0, color:'white',fontSize:20}}> Oluştur</Text>
            </TouchableOpacity>
        </View>  
        </View>
   
    </View>
    );
}

  
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

