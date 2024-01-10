import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import AppContainer from './src/navigations/AppNavigation';
import { UserProvider } from './src/data/UserContext';

console.disableYellowBox = true;


export default function App() {
  return (
    <UserProvider>
      <View style={{flex: 1}}>
        <StatusBar backgroundColor="#131313" barStyle="light-content" />
        <AppContainer />
      </View>
    </UserProvider>
  );
}
