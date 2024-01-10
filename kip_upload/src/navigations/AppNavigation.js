import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'
import {createDrawerNavigator} from '@react-navigation/drawer' 
import HomeScreen from '../screens/Home/HomeScreen';
import CategoriesScreen from '../screens/Categories/CategoriesScreen';
import RecipeScreen from '../screens/Recipe/RecipeScreen';
import RecipesListScreen from '../screens/RecipesList/RecipesListScreen';
import DrawerContainer from '../screens/DrawerContainer/DrawerContainer';
import IngredientScreen from '../screens/Ingredient/IngredientScreen';
import SearchScreen from '../screens/Search/SearchScreen';
import IngredientsDetailsScreen from '../screens/IngredientsDetails/IngredientsDetailsScreen';
import CreateIngredientScreen from '../screens/Ingredient/CreateIngredientScreen';
import ChooseIngredientScreen from '../screens/Ingredient/ChooseIngredientScreen';
import CreateRecipeScreen from '../screens/Recipe/CreateRecipeScreen';
import AddIngredientAtCreateScreen from '../screens/Recipe/AddIngredientAtCreate';
import UpdateRecipeScreen from '../screens/Recipe/UpdateRecipeScreen';
import GetRecommendationScreen from '../screens/Recommendation/GetRecommendationScreen';
import GeneratedRecipeScreen from '../screens/Recommendation/GeneratedRecipeScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';

import { View } from 'react-native';
import TestScreen from '../screens/TestScreen/TestScreen';

const Stack = createStackNavigator();

function MainNavigator() {
  return(
    <Stack.Navigator screenOptions={{headerShown:false, headerTitleStyle:{color:'green'}}}>      
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Register' component={RegisterScreen} />
      <Stack.Screen name='Home' component={HomeScreen} options={{title:'Tariflerim'}} />
      <Stack.Screen name='Categories' component={CategoriesScreen}/>
      <Stack.Screen name='Recipe' component={RecipeScreen}/>
      <Stack.Screen name='RecipesList' component={RecipesListScreen} />
      <Stack.Screen name='Ingredient' component={IngredientScreen} />
      <Stack.Screen name='IngredientsDetails' component={IngredientsDetailsScreen} />
      <Stack.Screen name='TestScreen' component={TestScreen} />
      <Stack.Screen name='CreateIngredient' component={CreateIngredientScreen} />
      <Stack.Screen name='ChooseIngredient' component={ChooseIngredientScreen} />
      <Stack.Screen name='CreateRecipe' component={CreateRecipeScreen} />
      <Stack.Screen name='AddIngredientAtCreate' component={AddIngredientAtCreateScreen} />
      <Stack.Screen name='UpdateRecipe' component={UpdateRecipeScreen}/>
      <Stack.Screen name='GetRecommendation' component={GetRecommendationScreen} />
      <Stack.Screen name='GeneratedRecipe' component={GeneratedRecipeScreen} />
    </Stack.Navigator>
  )
} 

 const Drawer = createDrawerNavigator();

 function DrawerStack() {
  return (
    <Drawer.Navigator drawerPosition='right' initialRouteName='CreateIngredient' drawerStyle={{ width: 200, backgroundColor: '#000000' }}
      screenOptions={{ headerShown: false, headerStyle: { backgroundColor: '#131313'},  headerTintColor: '#C2C2C2',
                      headerTitleStyle: { fontWeight: 'light', textAlign: 'center', color: '#C2C2C2'}}}
      drawerContent={({ navigation }) => <DrawerContainer navigation={navigation}  />}>
      
          <Drawer.Screen name='TariflerimX' component={MainNavigator}  />  
    </Drawer.Navigator>
  );
}


 export default function AppContainer() {
  return(
   
    <NavigationContainer>
        <View style={{flex:1}}>
          <DrawerStack/>
        </View>
    </NavigationContainer>

  )
} 
 

console.disableYellowBox = true;