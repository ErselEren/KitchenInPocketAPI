import { StyleSheet, Dimensions } from 'react-native';
import { color } from 'react-native-reanimated';

const { width: viewportWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1A1A1A',
    flex: 1
  },
  carouselContainer: {
    minHeight: 250,
    //backgroundColor:'red'
  },
  carousel: {},

  image: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: 250,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    width: viewportWidth,
    height: 250
  },
  paginationContainer: {
    flex: 1,
    position: 'absolute',
    alignSelf: 'center',
    paddingVertical: 8,
    marginTop: 200
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 0
  },
  infoRecipeContainer: {
    flex: 1,
    margin: 25,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#1A1A1A',
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  infoPhoto: {
    height: 20,
    width: 20,
    marginRight: 0
  },
  infoRecipe: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  category: {
    fontSize: 14,
    fontWeight: 'bold',
    margin: 10,
    color: '#2cd18a'
  },
  infoDescriptionRecipe: {
    textAlign: 'left',
    fontSize: 16,
    marginTop: 30,
    margin: 15,
    color: '#8B8B8B'
  },
  infoRecipeName: {
    fontSize: 28,
    marginBottom: 15,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    color: '#F5C794'
  }
});

export default styles;
