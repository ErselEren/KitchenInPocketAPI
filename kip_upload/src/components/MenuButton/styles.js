import { StyleSheet } from 'react-native';

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
  }
});

export default styles;
