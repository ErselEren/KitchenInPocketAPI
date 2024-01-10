import React, { useLayoutEffect,useState, useContext } from "react";
import { Text, View, Image, StyleSheet} from "react-native";
import { fetchGetRequest, fetchPutRequest, fetchPostRequest} from "../../data/MockDataAPI";
import { TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { ScrollView, TextInput, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { UserContext } from '../../data/UserContext';

export default function CategoriesScreen(props) {
    const { navigation, route } = props;
    const recipeItem = route.params?.item;
    const [ingredientsArray, setIngredientsArray] = useState([]);
    const [selectedModalIndex, setSelectedModalIndex] = useState(null);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [updatedIngredients, setUpdatedIngredients] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const { userId } = useContext(UserContext);

    const openPopup = (index) => {
        setSelectedModalIndex(index);
        setIsPopupVisible(true);
    };

    const closePopup = () => {
        setIsPopupVisible(false);
    };


    useLayoutEffect(() => {
        console.log(">"+recipeItem.title);
        console.log(">"+recipeItem.description);
        console.log(">"+recipeItem.photo_url);
      
      
        navigation.setOptions({
        title: route.params?.title,
        headerTitleStyle: {
            fontSize: 16,
        },
        });

        getIngredients();
    }, []);

    const getIngredients = async () => {
        try {
        const data1 = await fetchGetRequest("ingredients/"+userId+"/ingredient");
        setIngredientsArray(data1);
        } catch (error) {
        //console.error(error.message);
        }
    };

    const SaveAndExit = async () => {
      for (const item of selectedItems) {
        const recipeIngredientData = {
          ingredientId: item.id,
          quantity: 0,
        };
    
        const endpoint = `recipes/${userId}/recipe/${recipeItem.id}/recipeIngredients`;
        const BASE_URL = 'http://192.168.1.36:8080';
        try {
          const response = await fetch(`${BASE_URL}/${endpoint}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(recipeIngredientData),
          });
    
          // Check if the response is not empty
          if (response.status === 200 && response.headers.get("content-length") !== "0") {
            await response.json(); // Parse as JSON if there is content
          } else {
            // Handle the case where there's no content
          }
        } catch (error) {
          console.error('Error while updating ingredient:', error);
        }
      }
    
      navigation.goBack();
    };
    
    
    
    const handleGoBack = () => {
        navigation.goBack();
    };

    const handleInputChange = (index, text) => {  
        const newIngredients = [...ingredientsArray];
        newIngredients[index].unitPrice = text;
        console.log(text);
        setIngredientsArray(newIngredients);
        updatedIngredients.push(ingredientsArray[index]);
    };

    const handlePress = (ingredient) => {
        if (selectedItems.includes(ingredient)) {
            setSelectedItems(selectedItems.filter((i) => i !== ingredient));
        } else {
            setSelectedItems([...selectedItems, ingredient]);
        }
    };



  return (   
      <View style={{backgroundColor:'#131313',flex:1}}>
          <ScrollView style={{}}>
          
          <View style={{backgroundColor:'#131313',height:40, flexDirection:'row',top:10,marginBottom:10,left:10,borderBottomWidth:2,borderColor:'#F5C794',width:'95%'}}>
              
              <TouchableOpacity style={{backgroundColor:'#131313'}} onPress={handleGoBack} >
                   <AntDesign name="arrowleft" size={40} color="#F5C794" />
               </TouchableOpacity>
              
              <Text style={{color:'#F5C794',fontSize:20,left:20, textAlignVertical:'center'}}>Eklemek İstediğiniz Malzemeleri Seçin</Text>
          </View>
        
        
            {ingredientsArray.map((ingredient,index) => {

              return (
              
                <TouchableWithoutFeedback key={index} onPress={()=>handlePress(ingredient)}>
                <View style={{marginLeft:10, flexDirection:'row', marginVertical:10, alignContent:'center',backgroundColor:selectedItems.includes(ingredient) ? '#B4FFD1' : '#353535', width:'95%',borderRadius:10}}>
                    <View style={{backgroundColor:'transparent'}}>
                      <Image source={{ uri: ingredient.photo_url }} style={{ width: 80, height: 80, borderRadius:20, borderBottomLeftRadius:0,borderTopLeftRadius:0}} />
                    </View>

                  
                  <View style={{flex:1,backgroundColor:'transparent',flexDirection:'row'}}>                      
                    <View style={{backgroundColor:'transparent',flexDirection:'row',left:6}}>
                          
                          <Text style={{fontSize:20,color:selectedItems.includes(ingredient) ? '#444444' : '#F5C794',marginBottom:10,top:5,position:'absolute',left:5}}> 
                            {ingredient.name}
                          </Text> 
                          <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between' }}>
                              <View style={{flexDirection:'row',backgroundColor:'transparent',marginRight:5,top:5}}>
                                  <Text style={{fontSize:17, color:selectedItems.includes(ingredient) ? '#444444' : 'white',textAlignVertical:'center'}}> Birim :</Text>
                                  <TouchableOpacity onPress={() => openPopup(index)} style={{justifyContent:'center'}}>
                                    <Text style={{fontSize:20,left:5,color:'white',paddingHorizontal:5,backgroundColor:'#535353',borderRadius:5,textAlign:'center'}}>{ingredient.unit}</Text>
                                  </TouchableOpacity>
                              </View>
                              <View style={{flexDirection:'row'}}>
                                <View style={{alignSelf:'center',marginLeft:'5%',top:5,marginRight:5}}>
                                    <Text style={{color:selectedItems.includes(ingredient) ? '#444444' : '#FFFFFF',fontSize:17}}>Birim Fiyatı:</Text>
                                </View>
                                
                                <View style={{top:5,width:75,height:40,backgroundColor:'#2C2C2C',justifyContent:'center',alignSelf:'center',borderTopLeftRadius:15,borderBottomLeftRadius:15, flexDirection:'row'}}>                               
                                    <TextInput onChangeText={(text) => handleInputChange(index, text)} keyboardType="numeric" style={{fontSize:20, color:'white',textAlignVertical:'center', marginLeft:10}}>{ingredient.unitPrice}</TextInput>
                                    <Text style={{color:'white',fontSize:20,alignSelf:'center'}}> TL</Text>                                
                                </View>
                              </View>
                          </View>
                    </View> 

                     
                  </View>
                         
                </View>
                </TouchableWithoutFeedback>
                


              );
            })}

            <View style={{height:200}}></View>

          </ScrollView>
          <View style={{position:'absolute',bottom:5, alignSelf:'center', flexDirection:'row'}}>
            <View style={{marginLeft:5,borderWidth:0,borderColor:'#2C5528',height:60,backgroundColor:'#67BB60',justifyContent:'center',borderRadius:10,paddingHorizontal:10,}}>
                  <TouchableOpacity style={{flexDirection:'row', alignItems:'center'}} onPress={SaveAndExit}>
                  <AntDesign name="checksquareo" size={24} color='#FFFFFF' />
                    <Text style={{fontSize:15,color:'#FFFFFF'}}> Ekle ve Çık</Text>
                  </TouchableOpacity>
            </View>     
          </View>
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