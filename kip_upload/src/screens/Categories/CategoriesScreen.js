import React, { useLayoutEffect,useState, useEffect, useContext} from "react";
import { FlatList, Text, View, Image, TouchableHighlight,Modal, StyleSheet} from "react-native";
import {fetchGetRequest, fetchPutRequest, fetchDeleteRequest} from "../../data/MockDataAPI";
import { TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { ScrollView, TextInput, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Ionicons } from '@expo/vector-icons';
import { set } from "react-native-reanimated";
import { UserContext } from '../../data/UserContext';

export default function CategoriesScreen(props) {
  const { navigation, route } = props;
  const [ingredientsArray, setIngredientsArray] = useState([]);
  const item = route.params?.ingredients;
  const [selectedModalIndex, setSelectedModalIndex] = useState(null);
  const [selectedModalIndex2, setSelectedModalIndex2] = useState(null);
  const [deletedIngredients, setDeletedIngredients] = useState([]);
  const [addedIngredients, setAddedIngredients] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isDeletePopupVisible, setDeleteIsPopupVisible] = useState(false);
  const [updatedIngredients, setUpdatedIngredients] = useState([]);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredIngredients, setFilteredIngredients] = useState([]);
  const { userId } = useContext(UserContext);

  const openPopup = (index) => {
    setSelectedModalIndex(index);
    setIsPopupVisible(true);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };


  useLayoutEffect(() => {
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
      console.error(error.message);
    }
  };

  useEffect(() => {
    const filtered = ingredientsArray.filter((ingredient) =>
      ingredient.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredIngredients(filtered);

    getIngredients();
    const unsubscribe = navigation.addListener('focus', getIngredients); // Add this listener
    return unsubscribe;
  }, []);

  const SaveAndExit = async () => {
    
    updatedIngredients.forEach(async (ingredient) => {
      try {
        const updatedIngredient = await fetchPutRequest("ingredients/"+userId+"/ingredient/"+ingredient.id, ingredient);
        //const updatedIngredient = await fetchPutRequest(`ingredients/${ingredient.id}`, ingredient);
        //console.log('Updated ingredient:', updatedIngredient);
      } catch (error) {
        //console.error('Error updating ingredient:', error);
      }
    });

    // Delete ingredients
    deletedIngredients.forEach(async (ingredient) => {
      try {
        await fetchDeleteRequest("ingredients/"+userId+"/ingredient/"+ingredient.id);
      } catch (error) {
        //console.error('Error deleting ingredient:', error);
      }
    });
  
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

  const handleTouchableOpacityPress = (index, unit) => {
    const newIngredients = [...ingredientsArray];
    newIngredients[index].unit = unit;
    setIngredientsArray(newIngredients);
    updatedIngredients.push(ingredientsArray[index]);
    closePopup();
  };

  const handleLongPress = (index) => {
    setSelectedModalIndex2(index);
    setDeleteIsPopupVisible(true);
  };

  const handleDelete = (isDelete, index) => {
    if (isDelete) {
      const newIngredients = [...ingredientsArray];
      newIngredients.splice(index, 1);
      setIngredientsArray(newIngredients);
      deletedIngredients.push(ingredientsArray[index]);
      setDeletedIngredients(deletedIngredients);
    }
    setSelectedModalIndex2(index);
    setDeleteIsPopupVisible(false);
  };

  const CreateIngredient = () => {
    navigation.navigate("CreateIngredient");
  };

  const handleSearch = (text) => {
    setIsSearchVisible(!isSearchVisible);
    setSearchText(text);
  };
  


  return (   
      <View style={{backgroundColor:'#131313',flex:1}}>
          <ScrollView style={{top:50}}>
          
            {ingredientsArray.map((ingredient,index) => {

              return (
              
                <TouchableWithoutFeedback key={index} onLongPress={()=>handleLongPress(index)}>
                <View style={{marginLeft:10, flexDirection:'row', marginVertical:10, alignContent:'center',backgroundColor:'#353535', width:'95%',borderRadius:10}}>
                    <View style={{backgroundColor:'transparent'}}>
                      <Image source={{ uri: ingredient.photo_url }} style={{ width: 80, height: 80, borderRadius:25, borderTopLeftRadius:0, borderBottomLeftRadius:0}} />
                    </View>

                  
                  <View style={{flex:1,backgroundColor:'transparent',flexDirection:'row'}}>                      
                    <View style={{backgroundColor:'transparent',flexDirection:'row',left:6}}>
                          
                          <Text style={{fontSize:20,color:'#F5C794',marginBottom:10,top:5,position:'absolute',left:5}}> 
                            {ingredient.name}
                          </Text> 
                          <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between' }}>
                              <View style={{flexDirection:'row',backgroundColor:'transparent',marginRight:5,top:5}}>
                                  <Text style={{fontSize:17, color:'white',textAlignVertical:'center'}}> Birim :</Text>
                                  <TouchableOpacity onPress={() => openPopup(index)} style={{justifyContent:'center'}}>
                                    <Text style={{fontSize:17,left:5,color:'white',paddingHorizontal:5,backgroundColor:'#535353',borderRadius:5,textAlign:'center'}}>{ingredient.unit}</Text>
                                  </TouchableOpacity>
                              </View>
                              <View style={{flexDirection:'row'}}>
                                <View style={{alignSelf:'center',marginLeft:'5%',top:5,marginRight:5}}>
                                    <Text style={{color:'#FFFFFF',fontSize:17}}>Birim Fiyatı:</Text>
                                </View>
                                
                                <View style={{top:5,width:65,height:35,backgroundColor:'#2C2C2C',justifyContent:'center',alignSelf:'center',borderTopLeftRadius:10,borderBottomLeftRadius:10, flexDirection:'row'}}>                               
                                    <TextInput onChangeText={(text) => handleInputChange(index, text)} keyboardType="numeric" style={{fontSize:20, color:'white',textAlignVertical:'center', marginLeft:0}}>{ingredient.unitPrice}</TextInput>
                                    <Text style={{color:'white',fontSize:17,alignSelf:'center'}}> TL</Text>                                
                                </View>
                              </View>
                          </View>
                    </View> 

                     
                  </View>
                         
                  <Modal visible={isPopupVisible && selectedModalIndex === index} animationType="fade" transparent={true}>
                              <View style={styles2.modalContainer}>
                                
                                <View style={{backgroundColor:'#313131', alignItems:'center', paddingVertical:20, width:'90%',borderRadius:15}}>
                                  <Text style={{fontSize:25, marginBottom:15,color:'#FFFFFF'}}>Birim Seçin</Text>
                                  <View style={styles2.popupContainer}>
                                    <ItemButton onPress={() => handleTouchableOpacityPress(index, 'gr')} text="gram" />
                                    <ItemButton onPress={() => handleTouchableOpacityPress(index, 'kg')} text="kilogram" />
                                    <ItemButton onPress={() => handleTouchableOpacityPress(index, 'ml')} text="mililitre" />
                                    <ItemButton onPress={() => handleTouchableOpacityPress(index, 'litre')} text="litre" />
                                    <ItemButton onPress={() => handleTouchableOpacityPress(index, 'adet')} text="adet" />
                                    <ItemButton onPress={() => handleTouchableOpacityPress(index, 'paket')} text="paket" />
                                    <ItemButton onPress={() => handleTouchableOpacityPress(index, 'bardak')} text="bardak" />
                                    <ItemButton onPress={() => handleTouchableOpacityPress(index, 'çay k.')} text="çay k." />
                                    <ItemButton onPress={() => handleTouchableOpacityPress(index, 'tatlı k.')} text="tatlı k." />
                                    <ItemButton onPress={() => handleTouchableOpacityPress(index, 'yemek k.')} text="yemek k." />
                                  </View>
                                  <TouchableOpacity onPress={closePopup} style={{width:'40%',backgroundColor:'#E25C5C',borderRadius:25,justifyContent:'center',alignItems:'center'}}>
                                      <Text style={{width:100,height:50,textAlign:'center',textAlignVertical:'center',fontSize:20,color:'white'}}> Kapat </Text>     
                                  </TouchableOpacity>
                                </View>
                              </View>
                  </Modal>

                  <Modal visible={isDeletePopupVisible && selectedModalIndex2 === index} animationType="slide" transparent={true}>
                    <View style={styles2.modalContainer}>
                      <View style={styles2.popupContainer}>
                        <Text style={{fontSize:20, marginBottom:15,color:'#CACACA'}}>Silmek istediğinize emin misiniz?</Text>
                        <View style={{flexDirection:'row',width:'100%', justifyContent:'center'}}>
                          <TouchableOpacity onPress={() => handleDelete(false,index)} style={{width:'40%',backgroundColor:'#E25C5C',borderRadius:15,justifyContent:'center', marginRight:5}}>
                            <Text style={{width:100,height:50,textAlign:'center',textAlignVertical:'center',fontSize:20,color:'white'}}>Hayır </Text>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => handleDelete(true,index)} style={{width:'40%',backgroundColor:'#67BB60',borderRadius:15,justifyContent:'center', marginLeft:5}}>
                            <Text style={{width:100,height:50,textAlign:'center',textAlignVertical:'center',fontSize:20,color:'white'}}> Evet </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </Modal>                                


                </View>
                </TouchableWithoutFeedback>
                


              );
            })}
            
          <View style={{height:200}}></View>
          </ScrollView>

          <View style={{backgroundColor:'#131313',height:50, flexDirection:'row',top:0,marginBottom:10,left:10,borderBottomWidth:2,borderColor:'#F5C794',width:'95%',position:'absolute'}}>           
              <TouchableOpacity style={{left:5, top:5}} onPress={handleGoBack} >
                   <AntDesign name="arrowleft" size={40} color="#F5C794"/>
               </TouchableOpacity>
              
              <Text style={{color:'#F5C794',fontSize:25,left:10,top:10}}>Tüm Malzemelerim</Text>
          </View>

          {/* <View style={{position:'absolute',top:55,backgroundColor:'#F3F3F3',height:40,borderRadius:10,width:'95%',borderColor:'#97F04F',flexDirection:'row',alignSelf:'center',justifyContent:'space-between'}}>
                <TextInput onChangeText={(text) => { setSearchQuery(text);}} placeholder="Malzeme Ara" style={{paddingLeft:10,width:'90%',backgroundColor:'#F3F3F3', borderRadius:10}}></TextInput>
                <TouchableOpacity onPress={handleSearch} style={{height:50, backgroundColor:'#FFFFFF00'}}>
                  <Ionicons name="search-sharp" size={40} color="#5C5C5C" />
                </TouchableOpacity>                    
          </View> */}

          <View style={{position:'absolute',bottom:5, alignSelf:'center', flexDirection:'row'}}>
            <View style={{marginRight:5,borderWidth:0,borderColor:'#2C5528',height:60,backgroundColor:'#65A8DF',justifyContent:'center',borderRadius:10,paddingHorizontal:10,}}>
                  <TouchableOpacity onPress={CreateIngredient} style={{flexDirection:'row', alignItems:'center'}}>
                  <Ionicons name="md-add" size={30} color='#FFFFFF' />
                    <Text style={{fontSize:15,color:'#FFFFFF'}}>Malzeme Oluştur</Text>
                  </TouchableOpacity>
                  
            </View>
            <View style={{marginLeft:5,borderWidth:0,borderColor:'#2C5528',height:60,backgroundColor:'#67BB60',justifyContent:'center',borderRadius:10,paddingHorizontal:10,}}>
                  <TouchableOpacity style={{flexDirection:'row', alignItems:'center'}} onPress={SaveAndExit}>
                  <AntDesign name="checksquareo" size={24} color='#FFFFFF' />
                    <Text style={{fontSize:15,color:'#FFFFFF'}}> Kaydet ve Çık</Text>
                  </TouchableOpacity>                  
            </View>     
          </View>
      </View>
      
  );
}

const ItemButton = ({ onPress, text }) => (
  <View style={styles.itemContainer}>
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.itemText}>{text}</Text>
    </TouchableOpacity>
  </View>
);

const styles2 = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Add a semi-transparent background
  },
  popupContainer: {
    backgroundColor: '#313131',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between',
    width:'90%',
  },
});

const styles = StyleSheet.create({
  rowText: {
    textAlign: 'center', // Center the text horizontally
    marginBottom: 0, // Add some spacing between rows
    fontSize: 17,
    color:'#FFFFFF'
  },
  itemContainer: {
    justifyContent: 'center',
    height: 50,
    width: '48%', // Adjust as needed
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderRadius: 5,
    borderColor: 'white',
    marginBottom: 10,
  },
  itemText: {
    fontSize: 25,
    textAlign: 'center',
    color: '#FFA137',
  },
});
