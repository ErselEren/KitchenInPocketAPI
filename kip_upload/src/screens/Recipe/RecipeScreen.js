import React, { useLayoutEffect, useRef, useState } from "react";
import {ScrollView,Text,View,Image,Dimensions,TouchableHighlight} from "react-native";
import styles from "./styles";
import Carousel, { Pagination } from "react-native-snap-carousel";
import {getIngredientName,getCategoryName,getCategoryById} from "../../data/MockDataAPI";
import BackButton from "../../components/BackButton/BackButton";
import ViewIngredientsButton from "../../components/ViewIngredientsButton/ViewIngredientsButton";
import { TouchableOpacity } from "react-native-gesture-handler";
import styles2 from "../../components/ViewIngredientsButton/styles.js";

const { width: viewportWidth } = Dimensions.get("window");

export default function RecipeScreen(props) {
  const { navigation, route } = props;

  const item = route.params?.item;
  const category = getCategoryById(item.categoryId);
  const title = getCategoryName(category.id);
  const [activeSlide, setActiveSlide] = useState(0);

  const slider1Ref = useRef();

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

  const renderImage = ({ item }) => (
    <TouchableHighlight>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: item }} />
      </View>
    </TouchableHighlight>
  );

  const onPressIngredient = (item) => {
    var name = getIngredientName(item);
    let ingredient = item;
    navigation.navigate("Ingredient", { ingredient, name });
  };

  const handleUpdateDescription = () => {
      updateRecipeDescription(recipe.id, updatedDescription);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.carouselContainer}> 
        <Image style={styles.image} source={{ uri: item.photo_url }} />
      </View>

      <View style={styles.infoRecipeContainer}>
          <Text style={styles.infoRecipeName}>{item.title}</Text>
          <View style={styles.infoContainer}>
            
            {/* <TouchableHighlight
              onPress={() =>
                navigation.navigate("RecipesList", { category, title })
              }
            >
              <Text style={styles.category}>
                {getCategoryName(item.categoryId).toUpperCase()}
              </Text>
            </TouchableHighlight> */}
          </View>

          {/* <View style={styles.infoContainer}>
            <Image
              style={styles.infoPhoto}
              source={require("../../../assets/icons/time.png")}
            />
            <Text style={styles.infoRecipe}>{item.time} minutes </Text>
          </View> */}

          <View style={styles.infoContainer}>
            <View style={{flexDirection:'row'}}>
                <ViewIngredientsButton
                  onPress={() => {
                    let ingredients = item.ingredients;
                    let title = "Ingredients for " + item.title;
                    navigation.navigate("IngredientsDetails", { ingredients, title });
                  }}
                />
                <TouchableOpacity style={{}}>
                  <View style={{width:80,height:50, justifyContent:'center', borderRadius:30, borderWidth:1, borderColor:'#F5C794',marginHorizontal:5}}>
                      <Text style={{textAlign:'center', color:'#F5C794'}}>Hesapla</Text>
                  </View>    
                </TouchableOpacity>
                <TouchableOpacity style={{}} onPress={handleUpdateDescription}>
                  <View style={{width:80,height:50, justifyContent:'center', borderRadius:30, borderWidth:1, borderColor:'#F5C794'}}>
                      <Text style={{textAlign:'center', color:'#F5C794'}}>Düzenle</Text>
                  </View>    
                </TouchableOpacity>
            </View>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.infoDescriptionRecipe}>{item.description}</Text>
          </View>
      </View>
    </ScrollView>
  );
}
