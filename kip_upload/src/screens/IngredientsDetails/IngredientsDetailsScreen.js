import React, { useLayoutEffect,useState, useEffect, useContext } from "react";
import { Text, View, Image,Modal, StyleSheet, TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { fetchPutRequest,fetchGetRequest, fetchDeleteRequest } from "../../data/MockDataAPI";
import { UserContext } from '../../data/UserContext';
import { ScrollView } from "react-native-gesture-handler";

export default function IngredientsDetailsScreen(props) {
  const { navigation, route } = props;
  const [recipeItem, SetRecipeItem] = useState(route.params?.item);
  const [ingredientsArray, setIngredientsArray] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [edited, setEdited] = useState(false);
  const [selectedModalIndex, setSelectedModalIndex] = useState(null);
  const [selectedModalIndex2, setSelectedModalIndex2] = useState(null);
  const [recipeIngredientArray, setRecipeIngredientArray] = useState([]);
  const [isDeletePopupVisible, setDeleteIsPopupVisible] = useState(false);
  const [count, setCount] = useState(0);
  const longText = "Yeni Malzeme Ekle";
  const rowLength = 15; // Adjust this value as needed
  const { userId } = useContext(UserContext);

  const openPopup = (index) => {
    setSelectedModalIndex(index);
    setIsPopupVisible(true);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  useEffect(() => {
    getIngredients();
    const unsubscribe = navigation.addListener('focus', getIngredients); // Add this listener
    return unsubscribe;
  }, [count]);

  useLayoutEffect(() => {
    getIngredients();
  }, []);
  

  const getIngredients = async () => {
    try {
      const recipeIngredients = await fetchGetRequest("recipes/"+ userId +"/recipe/"+ recipeItem.id + "/ingredients");
      setRecipeIngredientArray(recipeIngredients);
      //updaterecipe item 
      const updatedRecipeItem = { ...recipeItem };
      updatedRecipeItem.recipeIngredientArray = recipeIngredients;
      SetRecipeItem(updatedRecipeItem);

      
      const updatedIngredientsArray = [];
  
      for (const item of recipeIngredients) {
        try {
          const ingredientData = await fetchGetRequest("ingredients/"+userId+"/ingredient/"+item.ingredientId);
          //const ingredientData = await fetchGetRequest(`ingredients/${item.ingredientId}`);
          updatedIngredientsArray.push(ingredientData);
        } catch (error) {
          //console.error('Error getting ingredient data:', error);
        }
      }
  
      setIngredientsArray(updatedIngredientsArray);
    } catch (error) {
      //console.error('Error getting recipe ingredients:', error);
    }
  };
  
  const handleSave = async () => {
    try {
      //const uri = `user/recipes/${recipeItem.id}/recipeIngredients`;
      const uri = "recipes/"+ userId +"/recipe/"+ recipeItem.id + "/recipeIngredients";
      for (const item of recipeItem.recipeIngredientArray) {
        console.log(">" + item.quantity);
      }
      
      await fetchPutRequest(uri, recipeItem.recipeIngredientArray);
    } catch (error) {
      //console.error("Error updating data:", error);
      // You can display an error message to the user or handle the error in an appropriate way.
    }

    navigation.goBack();
  };
  
  const calculateSum = () => {
    let sum2 = 0;
  
    if (recipeItem.recipeIngredientArray) {
      sum2 = recipeItem.recipeIngredientArray.reduce((total, item) => {
        const ingredient = ingredientsArray.find(ingredient => ingredient.id === item.ingredientId);
  
        if (ingredient) {
          return total + item.quantity * ingredient.unitPrice;
        } else {
          return total;
        }
      }, 0);
    } else {
      // Handle the case when recipeIngredientArray is undefined or empty
    }
  
    return sum2;
  };
  
  const sum = calculateSum();
  
  function countDigits(number) {
    return Math.max(Math.floor(Math.log10(Math.abs(number))), 0) + 1;
  }

  const handlePress = async () => { 
    navigation.goBack();
  };

  const handleIncrement = async (index) => {
    setEdited(true);
    console.log(recipeIngredientArray[index].quantity);
    let numDigits = countDigits(recipeIngredientArray[index].quantity);
    if(numDigits === 3 || numDigits === 4){
      numDigits = 100;
    }
    else if(numDigits === 2){
      numDigits = 10;
    }
    else{
      numDigits = 1;
    }

    const updatedRecipeItem = { ...recipeItem };
    updatedRecipeItem.recipeIngredientArray[index].quantity += numDigits;
    SetRecipeItem(updatedRecipeItem);
    setRecipeIngredientArray(updatedRecipeItem.recipeIngredientArray);
    console.log("|"+recipeItem.recipeIngredientArray[index].quantity);
  };

  const handleDecrement = async (index) => {
    let numDigits = countDigits(recipeIngredientArray[index].quantity);
    if(numDigits === 3 || numDigits === 4){
      numDigits = 100;
    }
    else if(numDigits === 2){
      numDigits = 10;
    }
    else{
      numDigits = 1;
    }
    
    const updatedRecipeItem = { ...recipeItem };
    if(updatedRecipeItem.recipeIngredientArray[index].quantity - numDigits >= 0){
      updatedRecipeItem.recipeIngredientArray[index].quantity -= numDigits;
      SetRecipeItem(updatedRecipeItem);
      setRecipeIngredientArray(updatedRecipeItem.recipeIngredientArray);
    }
    else {
      updatedRecipeItem.recipeIngredientArray[index].quantity = 0;
      SetRecipeItem(updatedRecipeItem);
      setRecipeIngredientArray(updatedRecipeItem.recipeIngredientArray);
    }

    setEdited(true);
  };

  const handleInputChange = (index, text) => {
    const updatedRecipeItem = { ...recipeItem };
    updatedRecipeItem.recipeIngredientArray[index].quantity = parseFloat(text) || 0;
    SetRecipeItem(updatedRecipeItem);
    setEdited(true);
  };

  const splitTextIntoRows = (text, rowLength) => {
    const words = text.split(' ');
    const rows = [];
    let currentRow = '';
  
    for (const word of words) {
      if (currentRow.length + word.length + 1 <= rowLength) {
        currentRow += (currentRow.length > 0 ? ' ' : '') + word;
      } else {
        rows.push(currentRow);
        currentRow = word;
      }
    }
  
    if (currentRow.length > 0) {
      rows.push(currentRow);
    }
  
    return rows;
  };

  const LongTextComponent = ({ text, rowLength }) => {
    const rows = splitTextIntoRows(text, rowLength);
  
    return (
      <View >
        {rows.map((row, index) => (
          <Text key={index} style={styles.rowText}>
            {row}
          </Text>
        ))}
      </View>
    );
  };

  const handleCreateIngredient = () => {
    navigation.navigate('ChooseIngredient', {item: recipeItem});
    setCount(count + 1);
  };

  const handleLongPress = (index) => {
    setSelectedModalIndex2(index);
    setDeleteIsPopupVisible(true);
  };


  const deleteIngredientAtIndex = async (indexToDelete) => {
    // Filter out the item at the specified index
    const newArray = ingredientsArray.filter((item, index) => index !== indexToDelete);

    // Update the state with the new array
    setIngredientsArray(newArray);

    const newArray2 = recipeIngredientArray.filter((item, index) => index !== indexToDelete);
    
    // Update the state with the new array
    setRecipeIngredientArray(newArray2);

    for (const item of recipeIngredientArray) {
      console.log("1>" + item.ingredientId);
    }

    for(const item of ingredientsArray){
      console.log("2>>" + item.id);
    }

  };

  const handleDelete = async (index) => {
    try {
      console.log(index+" id of the ingredient to be deleted: " + recipeIngredientArray[index].ingredientId);
      //print recipeIngredientArray[index].ingredientId
      for (const item of recipeIngredientArray) {
        console.log("0>" + item.ingredientId);
      }

      for(const item of ingredientsArray){
        console.log("0>>" + item.id);
      }
      

      
      await fetchDeleteRequest("recipes/"+userId+"/recipe/"+recipeItem.id + "/recipeIngredients/"+recipeIngredientArray[index].ingredientId);
      

      // Remove the deleted ingredient from the array
      
  
      setDeleteIsPopupVisible(false);

      
      //setEdited(true);
    } catch (error) {
      // Handle error
    }
    setDeleteIsPopupVisible(false);
    //setEdited(true);
    await deleteIngredientAtIndex(index);

    
  };


  return (   
     <View style={{backgroundColor:'#131313',flex:1}}>
          
          <View style={{backgroundColor:'#131313',height:40, flexDirection:'row',top:10,marginBottom:10,left:10,borderBottomWidth:0,borderColor:'#F5C794',width:'95%'}}>
              
              <TouchableOpacity style={{backgroundColor:'#131313'}} onPress={handlePress} >
                   <AntDesign name="arrowleft" size={40} color="#F5C794" />
               </TouchableOpacity>
              
              <Text style={{color:'#F5C794',fontSize:25,left:20}}>Malzemeler</Text>
          </View>
          <ScrollView>
          {ingredientsArray && ingredientsArray.map((item, index) => {
            
            if(!recipeIngredientArray[index]){}

            return (
              
            <View key={index}>
                  <TouchableOpacity onLongPress={() => handleLongPress(index)}>
                    <View style={{marginLeft:10, flexDirection:'row', marginVertical:10, alignContent:'center',backgroundColor:'#353535', width:'95%',borderRadius:5, borderBottomLeftRadius:20}}>
                        <View style={{backgroundColor:'transparent'}}>
                          <Image source={{ uri: item.photo_url }} style={{ width: 80, height: 80, borderRadius:10}} />
                        </View>

                        <View style={{flex:1,backgroundColor:'transparent'}}> 
                            
                          <View style={{backgroundColor:'transparent',flexDirection:'column',left:5}}>
                          
                                <Text style={{fontSize:20,color:'#F5C794',marginBottom:10,top:5}}> 
                                  {item.name}
                                </Text>

                                <View style={{flexDirection:'row',backgroundColor:'transparent'}}>
                                
                                    <TouchableOpacity style={{backgroundColor:'transparent'}} onPress={() => handleDecrement(index)} >
                                      <AntDesign name="minussquare" size={35} color="#FF5656" />
                                    </TouchableOpacity>
                                    
                                    <TouchableOpacity style={{justifyContent:'center',borderWidth:0,borderRadius:5, borderLeftWidth:0,borderRightWidth:0, borderColor:'#F5DEC4', backgroundColor:'#FFE8CE1C'}}>
                                      <TextInput onChangeText={(text) => handleInputChange(index, text)} keyboardType="numeric" style={{fontSize:20, color:'white',textAlignVertical:'center', paddingHorizontal:10}}>{recipeIngredientArray[index].quantity}</TextInput>
                                    </TouchableOpacity>
                                    
                                    <TouchableOpacity style={{backgroundColor:'transparent'}} onPress={() => handleIncrement(index)}>
                                      <AntDesign name="plussquare" size={35} color="#76CA58" />
                                    </TouchableOpacity>
                                    
                                    <TouchableOpacity onPress={() => openPopup(index)} style={{justifyContent:'center'}}>
                                      <Text style={{fontSize:20,left:10,color:'white',paddingHorizontal:5,backgroundColor:'#535353',borderRadius:5,textAlign:'center'}}>{item.unit}</Text>
                                    </TouchableOpacity>
                                    
                                </View>

                          </View>
                          
                        </View>

                        <View style={{paddingHorizontal:5,height:40,backgroundColor:'#202020',justifyContent:'center',alignSelf:'center',borderTopLeftRadius:15,borderBottomLeftRadius:15}}>
                          <Text style={{color:'white',fontSize:20,alignSelf:'center'}}>
                          {(recipeIngredientArray[index].quantity*item.unitPrice).toFixed(1)} TL
                          </Text>
                        </View>
                    </View>
                  </TouchableOpacity>

                  <Modal visible={isDeletePopupVisible && selectedModalIndex2 === index} animationType="slide" transparent={true}>
                    <View style={styles2.modalContainer}>
                      <View style={styles2.popupContainer}>
                        <Text style={{fontSize:20, marginBottom:15,color:'#CACACA'}}>Silmek istediğinize emin misiniz?</Text>
                        <View style={{flexDirection:'row',width:'100%', justifyContent:'center'}}>
                          <TouchableOpacity onPress={() => handleDelete(index)} style={{width:'40%',backgroundColor:'#E25C5C',borderRadius:15,justifyContent:'center', marginRight:5}}>
                            <Text style={{width:100,height:50,textAlign:'center',textAlignVertical:'center',fontSize:20,color:'white'}}>Hayır </Text>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => handleDelete(index)} style={{width:'40%',backgroundColor:'#67BB60',borderRadius:15,justifyContent:'center', marginLeft:5}}>
                            <Text style={{width:100,height:50,textAlign:'center',textAlignVertical:'center',fontSize:20,color:'white'}}> Evet </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </Modal> 

            </View>   
            )})
            }

            <View style={{height:100}}></View>
            </ScrollView>
            <View style={{position:'absolute',bottom:20,height:65,flexDirection:'row', alignSelf:'center'}}>
                  <View style={{height:65,backgroundColor:'#FFFFFF',alignSelf:'center',justifyContent:'center',borderRadius:20,paddingHorizontal:10,marginRight:10}}>
                      
                          <Text style={{fontSize:17,color:'#FFA24B'}}>
                            Toplam : {sum.toFixed(2)} TL
                          </Text>
                           
                  </View>        
                  <TouchableOpacity onPress={handleCreateIngredient} style={{backgroundColor:'#65A8DF',justifyContent:'center', borderRadius:20, marginLeft:0, paddingHorizontal:10}}>
                        <LongTextComponent text={longText} rowLength={rowLength} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleSave} style={{backgroundColor: edited ? '#86DF6B':'#3B3B3B' ,justifyContent:'center', borderRadius:20, marginLeft:10}}>
                        <Text style={{fontSize:17,color: edited ? '#FFFFFF' : '#C4C4C4', paddingHorizontal:10}}>
                          Kaydet
                        </Text>
                  </TouchableOpacity>
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
