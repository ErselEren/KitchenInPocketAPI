import React, {useState, useEffect } from "react";
import { FlatList, Text, View, TouchableHighlight, Image, Modal, Button, Alert} from "react-native";
import { TextInput, TouchableOpacity,ScrollView, } from "react-native-gesture-handler";
import { AntDesign } from '@expo/vector-icons';

export default function GetRecommendationScreen(props) {
    const { navigation, route } = props;
    const [ingredientsArray, setIngredientsArray] = useState([]);
    const [ingredientName, setIngredientName] = useState("");
    const [recipeDescription, setRecipeDescription] = useState("");
    const [generatedRecipe, setGeneratedRecipe] = useState(null);
    const handleGoBack = () => {
        props.navigation.goBack();
    };


    useEffect(() => {
        // Here, you can fetch or set the initial data for ingredientsArray
        // For example, you can fetch data from an API, or set it from a constant array.
        
      }, []); // The empty dependency array means this effect will run only once, on component mount
    

    const addIngredient = () => {
        // Add a new ingredient to the array
        setIngredientsArray([...ingredientsArray, ""]);
    };  

    const createRecommendation = async () => {
        //print ingredientsArray
        console.log("RecipeDesc>>" + recipeDescription);
        console.log("IngredientsArr>>"+ingredientsArray);
        
        //convert ingredientsArray to ingredientString 
        var ingredientString = "";
        for (let i = 0; i < ingredientsArray.length; i++) {
            ingredientString += ingredientsArray[i] + " ,";
        }
    
        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer "+"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" , // Replace with your actual API key
              },
              body: JSON.stringify({
                model: "gpt-4",
                messages: [
                  {
                    role: "system",
                    content: "Generate recipe with ingredients I'll give and use additional ingredients also. Response should be JSON. Recipe must has title,instructions(as string, not array) and ingredients array. Ingredients array has name,quantity(float) and unit for each ingredient. Field types will be in english. Other of the response should be in Turkish language."
                  },
                  {
                    role: "user",
                    content: ingredientString+ " kullanarak "+ recipeDescription+" tarifi oluştur." 
                  }
                ]
              }),
            });
            
            const data = await response.json();
            const result = JSON.parse(data.choices[0].message.content);
            const response2 = await fetch('https://api.openai.com/v1/images/generations', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer "+"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" , // Replace with your actual API key
              },
              body: JSON.stringify({
                model: "dall-e-3",
                prompt: result.title,
                n : 1,
                size : "1024x1024",
              }),
            });
            console.log("Response2 -> "+response2);
            const data2 = await response2.json();

            console.log("data.choices[0].message.content >->"+ data.choices[0].message.content);
            console.log("data2.data[0].url |>-|" +data2.data[0].url);
            
            //const result2 = JSON.parse(data2.data[0].url);
            
            result.photo_url = data2.data[0].url;
            navigation.navigate("GeneratedRecipe", {item: result});
          } catch (error) {
            console.error('Error:', error);
          }

        
        
        // const recipeText = "{\n  \"title\": \"Kakao ve Hindistan Cevizli Süt\",\n  \"instructions\": \"1. Bir tencereye 2 su bardağı süt ekleyin.\\n2. Üzerine 2 yemek kaşığı kakao ekleyin.\\n3. Orta ateşte sürekli karıştırarak sütü kaynatın.\\n4. Kaynadıktan sonra ocaktan alın ve hindistan cevizini ekleyin.\\n5. Hindistan cevizi sütte karıştırarak eriyene kadar bekletin.\\n6. Hazırladığınız kakao ve hindistan cevizli sütü fincana dökün ve sıcak olarak servis yapın.\",\n  \"ingredients\": [\n    {\n      \"name\": \"süt\",\n      \"unit\": \"su bardağı\",\n      \"quantity\": 2\n    },\n    {\n      \"name\": \"kakao\",\n      \"unit\": \"yemek kaşığı\",\n      \"quantity\": 2\n    },\n    {\n      \"name\": \"hindistan cevizi\",\n      \"unit\": \"çay kaşığı\",\n      \"quantity\": \"1\"\n    }\n  ]\n}"
        // const cleanedText = recipeText.replace(/\\/g, '').replace(/\n/g, '');
        // console.log(cleanedText);
        // const result = JSON.parse(cleanedText);
        
    };  

    const deleteIngredient = (index) => {
        // Create a new array without the ingredient at the specified index
        const newArray = ingredientsArray.filter((_, i) => i !== index);
        setIngredientsArray(newArray);
    };

    const updateElement = (text, index) => {
        const newElements = [...ingredientsArray];
        newElements[index] = text;
        setIngredientsArray(newElements);
      };

    const updateRecipeDescription = (text) => {
        setRecipeDescription(text);
    }
      


    return (
    <View style={{backgroundColor:'#131313', flex: 1 }}>
        
        

        <View style={{backgroundColor:'#131313',height:40, flexDirection:'row',top:10,marginBottom:10,left:10,width:'95%'}}>
              
            <TouchableOpacity onPress={handleGoBack} style={{backgroundColor:'#FFFFFF00', borderRadius:5, flexDirection:'row'}}  >
                <AntDesign name="arrowleft" size={45} color="#FFC27C" />
              
          </TouchableOpacity>
              
              <Text style={{color:'#F5C794',fontSize:20,left:20, textAlignVertical:'center', position:'absolute', left:'35%'}}>Tarif Önerisi Al</Text>
        </View>
        
        <View style={{ backgroundColor: '#00000000', flexDirection: 'row', alignSelf:'center'}}>
          <TextInput onChangeText={(text) => updateRecipeDescription(text)} placeholder="Tarif Açıklaması Giriniz." placeholderTextColor="#DFB27E" style={{ backgroundColor: '#FFFFFF', marginTop: 10, borderWidth: 0, borderRadius: 10, width: '90%', height: 75, marginBottom: 10, paddingLeft: 20 }}>
          </TextInput>     
        </View>
        
        <View style={{backgroundColor:'#FFFFFF', height:1, width:"90%", alignSelf:'center',marginBottom:10}}>
            <Text> </Text>
        </View>
        
        <ScrollView style={{}}>
        
                {ingredientsArray.length === 0 ? (
            <Text style={{ color: '#FFFFFF', fontSize: 18, textAlign: 'center', marginTop: 20 }}>Malzeme Listesi Boş!</Text>
            ) : (
            ingredientsArray.map((ingredient, index) => (
                <View key={index} style={{ backgroundColor: '#00000000', flexDirection: 'row' }}>
                <TextInput value={ingredient} onChangeText={(text) => updateElement(text, index)} placeholder="Malzeme Adı ve Miktarını Giriniz." placeholderTextColor="#DFB27E" style={{ backgroundColor: '#FFFFFF', marginTop: 10, borderWidth: 0, borderRadius: 10, width: '80%', left: 20, height: 40, marginBottom: 10, paddingLeft: 20 }}>
                </TextInput>
                <View style={{ justifyContent: 'center', marginLeft: '7.5%' }}>
                    <TouchableOpacity onPress={() => deleteIngredient(index)}>
                    <AntDesign name="minuscircle" size={24} color="#F57272" />
                    </TouchableOpacity>
                </View>
                </View>
            ))
            )}
           
        </ScrollView>
        
        <View style={{position:'absolute', bottom:20, flexDirection:'row', alignSelf:'center'}}>
            <View style={{height:50, bottom:20,marginHorizontal:5}}>
                <TouchableOpacity onPress={addIngredient} underlayColor="transparent" style={{ elevation : 5, backgroundColor: 'white', padding: 16,borderRadius: 10,paddingHorizontal:15,paddingVertical:10,backgroundColor:'#F0F0F0', borderRadius:50, justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                    <AntDesign name="plus" size={30} color="#FFA24B"/>
                    <Text style={{fontSize:20, color:'#FFA24B'}}>Malzeme Ekle</Text>
                </TouchableOpacity>
            </View>
            <View style={{height:50, bottom:20, marginHorizontal:5}}>
                <TouchableOpacity onPress={createRecommendation} underlayColor="transparent" style={{elevation : 5, backgroundColor: 'white', padding: 16,paddingHorizontal:15,paddingVertical:10,backgroundColor:'#BB884E', borderRadius:50, justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                    <Text style={{fontSize:20, color:'#FFFFFF'}}>Tarif Oluştur</Text>
                </TouchableOpacity>
            </View>
        </View>

    </View>  
  );
}
