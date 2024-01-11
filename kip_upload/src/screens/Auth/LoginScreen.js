import React, {useState, useEffect, useContext} from "react";
import { FlatList, Text, View, TouchableHighlight, Image, Modal, Button, Alert} from "react-native";
import { TextInput, TouchableOpacity,ScrollView, } from "react-native-gesture-handler";
import { AntDesign } from '@expo/vector-icons';
import { fetchPostRequest } from "../../data/MockDataAPI";
import { FontAwesome } from '@expo/vector-icons';
import { UserContext } from '../../data/UserContext';
import { useFocusEffect } from '@react-navigation/native';

export default function LoginScreen(props) {
    const { navigation, route } = props;
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [wrongPassword, setWrongPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { setUserId } = useContext(UserContext);

    useFocusEffect(
      React.useCallback(() => {
        setUserName("");
        setPassword("");
        setWrongPassword(false);
      }, [])
    );
    


    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const handleRegister = () => {
        navigation.navigate("Register");
    }

    const updateUsername = (text) => {
        setUserName(text);
    }

    const updatePassword = (text) => {
        setPassword(text);
    }

    const updateID = (id) => {
      setUserId(id);
    };
    
    const handleSignin = async () => {
      //use fetchPostRequest to send username and password to server
      //if server returns true, navigate to home screen
      //else show alert
      console.log(userName);
      console.log(password);

      const body = {
        username: userName,
        password: password
      };

      // const body = {
      //   username: "ersel",
      //   password: "ersel1467"
      // };

      const BASE_URL = 'http://192.168.1.36:8080';
      const endpoint = 'api/auth/signin';

      try {
        const response = await fetch(`${BASE_URL}/${endpoint}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });

        const responseData = await response.json();
        console.log(responseData);
        if(responseData.status == "200"){
          console.log(responseData);
          updateID(responseData.id);

          navigation.navigate("Home");
        }
        else{
          setWrongPassword(true);
        }

      } catch (error) {
        throw new Error('Error posting data: ' + error.message);
      }

        
      
    }

    return (
    <View style={{backgroundColor:'#131313', flex: 1 }}>
        
        <View style={{backgroundColor:'#FACD99'}}>
            <Image resizeMode="stretch" style={{width:'100%',height:400,alignSelf:'center', marginTop:20}} source={require('../../../assets/kip_logo.png')} />
        </View>
                
        <View style={{ backgroundColor: '#00000000', flexDirection: 'row', alignSelf:'center', top:20,borderBottomWidth:1, borderColor:'#FFFFFF',borderRadius: 10}}>
          <TextInput onChangeText={(text) => updateUsername(text)} value={userName} placeholder="Kullanıcı Adı" placeholderTextColor="#6E6E6E" style={{marginTop: 10, borderColor:'#FFFFFF', borderRadius: 10, width: '90%', marginBottom: 10, paddingLeft: 10, fontSize:20,color:'#DFB27E'  }}>
          </TextInput>     
        </View>
        
        <View style={{flexDirection: 'row', alignSelf:'center', top:20, alignItems:'center', borderBottomWidth:1, borderColor:'#FFFFFF',borderRadius: 10}}>
          <TextInput secureTextEntry={!showPassword} onChangeText={(text) => updatePassword(text)} value={password} placeholder="Şifre" placeholderTextColor="#6E6E6E" style={{marginTop: 10, borderColor:'#FFFFFF', borderRadius: 10, width: '85%', marginBottom: 10, paddingLeft: 10, fontSize:20,color:'#DFB27E'  }}>
          </TextInput> 
          <TouchableOpacity onPress={togglePasswordVisibility} style={{ right:10}}>
            <FontAwesome name="eye-slash" size={24} color="white" />
          </TouchableOpacity>
        </View>
        
          {wrongPassword ? (
            <View style={{height:50,width:'90%', justifyContent:'center',alignSelf:'center', backgroundColor:'#FFFFFF00', top:25}}>
              <Text style={{textAlign:'center',color:'#FD8B8B'}}>Kullanıcı Adı veya Şifre yanlış.</Text>
            </View>
          ) : null}
        

        <View style={{height:50, marginHorizontal:5, top:30}}>
                <TouchableOpacity onPress={handleSignin} underlayColor="transparent" style={{alignSelf:'center',width:'90%',elevation : 5, backgroundColor: 'white', padding: 16,paddingHorizontal:15,paddingVertical:10,backgroundColor:'#BB884E', borderRadius:10, justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                    <Text style={{fontSize:20, color:'#FFFFFF'}}>Giriş Yap</Text>
                </TouchableOpacity>
        </View>
        
        <View
          style={{
            flexDirection: "row",
            alignSelf: "center",
            top: "12%",
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

        <View style={{marginHorizontal:5, top:60, width:200, alignSelf:'center'}}>
                <TouchableOpacity onPress={handleRegister} underlayColor="transparent" style={{ elevation : 5, backgroundColor: 'white', padding: 16,borderRadius: 10,paddingHorizontal:15,paddingVertical:10,backgroundColor:'#F0F0F0', justifyContent:'center',alignItems:'center',flexDirection:'row'}}>                   
                    <Text style={{fontSize:20, color:'#FFA24B'}}>Kaydol</Text>
                </TouchableOpacity>
        </View>    


    </View>  
  );
}
