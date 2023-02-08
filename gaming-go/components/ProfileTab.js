import { SafeAreaView, Text, View, Image, ImageBackground, Button } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { baseUrl } from '../store/action/actionType';
import { useSelector } from 'react-redux';

export default function ProfileTab({ navigation }) {

  const [user, setUser] = useState({})
  const selectToken = useSelector((state) => state.users.access_token)

  useEffect(() => {
    fetch(baseUrl+ "/pub/user/0", {
      headers: {
        "Content-Type" : "application/json",
        access_token:selectToken
      }
    })
    .then(resp => {
      if(!resp.ok) throw {name:"Failed profile"}
      return resp.json()
    })
    .then(data => {
      setUser(data)
    })
    .catch(err => console.log(err))
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground style={{ flex: 0.5 }} resizeMode="cover" source={{ uri: 'https://wallpapercave.com/wp/wp8972629.jpg' }}>
        <View style={{ flex: 0.1 }}></View>
      </ImageBackground>
      <View style={{ flex: 2, backgroundColor: '#fff' }}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image source={{ uri: 'https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars.png' }} style={{ width: 100, height: 100, borderRadius: 100, position: 'absolute', zIndex: 1 }} />
        </View>
        <View style={{ marginTop: 60 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>{user.username || user?.email.split("@")[0]}</Text>
          <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>{user.nik}</Text>
          {/* <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>{user.password}</Text> */}
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
          <MaterialCommunityIcons name="phone" size={25} color="#900" />
          <View style={{ justifyContent: 'center', marginHorizontal: 10 }}>
            <Text>{user.phoneNumber || "0812345678"}</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
          <MaterialCommunityIcons name="map-marker-radius-outline" size={25} color="#900" />
          <View style={{ justifyContent: 'center', marginHorizontal: 10 }}>
            <Text>{user.address || "Jl tanduk"}</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
          <MaterialCommunityIcons name="mail" size={25} color="#900" />
          <View style={{ justifyContent: 'center', marginHorizontal: 10 }}>
            <Text>{user.email ||" Slebew@mail.com"}</Text>
          </View>
        </View>
        <View style={{paddingTop:322}}>
          <Button title="Transaction History" onPress={() => navigation.navigate('History')}></Button>
        </View>
      </View>
    </SafeAreaView>
  );
}