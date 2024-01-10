import { StyleSheet, Dimensions } from 'react-native';

// screen sizing
const { width, height } = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;

const recipeNumColums = 3;
// item size
const RECIPE_ITEM_HEIGHT = 120;
const RECIPE_ITEM_MARGIN = 12;

// 2 photos per width
export const RecipeCard = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: RECIPE_ITEM_MARGIN,
    marginTop: 10,
    width: (SCREEN_WIDTH - (recipeNumColums + 1) * RECIPE_ITEM_MARGIN) / recipeNumColums,
    height: RECIPE_ITEM_HEIGHT + 40,
    borderColor: 'white',
    borderWidth: 0,
    borderRadius: 5,
    backgroundColor: '#FFF5E9',

  },
  photo: {
    width: (SCREEN_WIDTH - (recipeNumColums + 1) * RECIPE_ITEM_MARGIN) / recipeNumColums,
    height: RECIPE_ITEM_HEIGHT,
    borderRadius: 5,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  title: {
    flex: 1,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FF8C20',
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center'
  },
  category: {
    marginTop: 5,
    marginBottom: 5
  }
});
