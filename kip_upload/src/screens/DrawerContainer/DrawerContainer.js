import React from "react";
import { TouchableHighlight, Image,View , StyleSheet, Text} from "react-native";
import PropTypes from "prop-types";
import MenuButton from "../../components/MenuButton/MenuButton";
import { AntDesign } from '@expo/vector-icons';

export default function DrawerContainer(props) {
  const { navigation } = props;
  return (
    <View style={styles.content}>
      <View style={styles.container}>
        <MenuButton
          title="Ana Sayfa"
          source={require("../../../assets/icons/home.png")}
          onPress={() => {
            navigation.navigate("Home");
            navigation.closeDrawer();
          }}
        />
        <MenuButton
          title="Tüm Malzemeler"
          source={require("../../../assets/icons/category.png")}
          onPress={() => {
            navigation.navigate("Categories");
            navigation.closeDrawer();
          }}
        />
        <TouchableHighlight onPress={() => {navigation.navigate("GetRecommendation"); navigation.closeDrawer();}} style={styles.btnClickContain} underlayColor="rgba(128, 128, 128, 0.1)">
          <View style={styles.btnContainer}>
            <AntDesign name="aliwangwang-o1" size={24} color='#F5C794' />
            <Text style={styles.btnText}>{"Tavsiye Al"}</Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
}

DrawerContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
};

const styles = StyleSheet.create({
  btnClickContain: {
    flexDirection: 'row',
    padding: 5,
    marginTop: 30,
    marginBottom: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#F5C794',
  },
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  btnIcon: {
    height: 25,
    width: 25,
    //change color of icon
    tintColor: '#F5C794'
  },
  btnText: {
    fontSize: 16,
    marginLeft: 10,
    marginTop: 2,
    color: '#F5C794',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2C2C2C',
    //headerTintColor: '#F5C794',
  },
  container: {
    flex: 1,
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
    color: '#F5C794',
    //headerTintColor: '#F5C794',
  }
});