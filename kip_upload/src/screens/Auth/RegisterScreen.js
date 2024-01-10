import React, {useState, useEffect } from "react";
import { FlatList, Text, View, TouchableHighlight, Image, Modal, Button, Alert} from "react-native";
import { TextInput, TouchableOpacity,ScrollView, } from "react-native-gesture-handler";
import { AntDesign } from '@expo/vector-icons';
import { fetchPostRequest } from "../../data/MockDataAPI";

export default function RegisterScreen(props) {
    const { navigation, route } = props;
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");
    const [email, setEmail] = useState("");
    
    const updateUsername = (text) => {
        setUserName(text);
    }

    const updatePassword = (text) => {
        setPassword(text);
    }

    const updatePasswordAgain = (text) => {
        setPasswordAgain(text);
    }

    const updateEmail = (text) => {
        setEmail(text);
    }

    const handleSignin = () => {
        navigation.navigate("Login");
    }

    const handleRegister = async () => {
 
      console.log(userName);
      console.log(password);
      console.log(passwordAgain);
      console.log(email);
      if( password != passwordAgain){
        return;
      }

      const body = {
        username: userName,
        email: email,
        password: password
      };

        // result = await fetchPostRequest('api/auth/signup', body);
        // console.log(result);
        // if(result){
        //   navigation.navigate("Login");
        // }

      const BASE_URL = 'http://192.168.1.36:8080';
      const endpoint = 'api/auth/signup';

      try {
        const response = await fetch(`${BASE_URL}/${endpoint}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });
      
        // Check if the response is in JSON format
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          // Parse and log the response as JSON
          const jsonResponse = await response.json();
          console.log('JSON Response:', jsonResponse);
          navigation.navigate("Login");
        } else {
          // If not JSON, log the response as text
          const textResponse = await response.text();
          console.log('Text Response:', textResponse);
        }
      } catch (error) {
        throw new Error('Error posting data: ' + error.message);
      }
      
    }



    return (
    <View style={{backgroundColor:'#131313', flex: 1 }}>
        <View style={{backgroundColor:'#FACD99'}}>
            <Image resizeMode="stretch" style={{width:'100%',height:370,alignSelf:'center', marginTop:20}} source={require('../../../assets/kip_logo.png')} />
        </View>
                
        <View style={{ backgroundColor: '#00000000', flexDirection: 'row', alignSelf:'center', top:10}}>
          <TextInput onChangeText={(text) => updateEmail(text)} placeholder="E-posta" placeholderTextColor="#6E6E6E" style={{ backgroundColor: '#FFFFFF00', marginTop: 10, borderBottomWidth:1,borderColor:'#FFFFFF',borderRadius: 10, width: '90%', marginBottom: 10, paddingLeft: 10, fontSize:16, paddingBottom:5, color:'#DFB27E' }}>
          </TextInput>     
        </View>
        
        <View style={{ backgroundColor: '#00000000', flexDirection: 'row', alignSelf:'center', top:10}}>
          <TextInput onChangeText={(text) => updateUsername(text)} placeholder="Kullanıcı Adı" placeholderTextColor="#6E6E6E" style={{ backgroundColor: '#FFFFFF00', marginTop: 0, borderBottomWidth:1,borderColor:'#FFFFFF',borderRadius: 10, width: '90%', marginBottom: 10, paddingLeft: 10, fontSize:16, paddingBottom:5, color:'#DFB27E'  }}>
          </TextInput>     
        </View>
        
        <View style={{ backgroundColor: '#00000000', flexDirection: 'row', alignSelf:'center', top:10}}>
          <TextInput secureTextEntry onChangeText={(text) => updatePassword(text)} placeholder="Şifre" placeholderTextColor="#6E6E6E" style={{ backgroundColor: '#FFFFFF00', marginTop: 0, borderBottomWidth:1, borderColor:'#FFFFFF', borderRadius: 10, width: '90%', marginBottom: 10, paddingLeft: 10, fontSize:16, paddingBottom:5, color:'#DFB27E'  }}>
          </TextInput>     
        </View>

        <View style={{ backgroundColor: '#00000000', flexDirection: 'row', alignSelf:'center', top:10}}>
          <TextInput secureTextEntry onChangeText={(text) => updatePasswordAgain(text)} placeholder="Şifre Tekrar" placeholderTextColor="#6E6E6E" style={{ backgroundColor: '#FFFFFF00', marginTop: 0, borderBottomWidth:1, borderColor:'#FFFFFF', borderRadius: 10, width: '90%', marginBottom: 10, paddingLeft: 10, fontSize:16, paddingBottom:5,color:'#DFB27E'  }}>
          </TextInput>     
        </View>

        <View style={{height:50, marginHorizontal:5}}>
                <TouchableOpacity onPress={handleRegister} underlayColor="transparent" style={{alignSelf:'center',width:'90%',top:20,elevation : 5, backgroundColor: 'white', padding: 16,paddingHorizontal:15,paddingVertical:10,backgroundColor:'#BB884E', borderRadius:10, justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                    <Text style={{fontSize:20, color:'#FFFFFF'}}>Kayıt Ol</Text>
                </TouchableOpacity>
        </View>
        
        <View
          style={{
            flexDirection: "row",
            alignSelf: "center",
            top: "8%",
            width: "90%",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: "rgba(152,152,152,1)",
            }}
          />
          <View>
            <Text
              style={{
                width: 50,
                textAlign: "center",
                color: "rgba(152,152,152,1)",
              }}
            >
              veya
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: "rgba(152,152,152,1)",
            }}
          />
        </View>

        <View style={{marginHorizontal:5, top:40, width:200, alignSelf:'center'}}>
                <TouchableOpacity onPress={handleSignin} underlayColor="transparent" style={{ elevation : 5, backgroundColor: 'white', padding: 16,borderRadius: 10,paddingHorizontal:15,paddingVertical:10,backgroundColor:'#F0F0F0', justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                   
                    <Text style={{fontSize:20, color:'#FFA24B'}}>Giriş Yap</Text>
                </TouchableOpacity>
        </View>    
    </View>  
  );
}
