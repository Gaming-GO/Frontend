import { SafeAreaView, Text, View, Image, ImageBackground, Button } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
export default function ProfileTab({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground style={{ flex: 0.5 }} resizeMode="cover" source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Gunung_Kerinci_dari_Muaralabuh.jpg' }}>
        <View style={{ flex: 0.1 }}></View>
      </ImageBackground>
      <View style={{ flex: 2, backgroundColor: '#fff' }}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image source={{ uri: 'https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars.png' }} style={{ width: 100, height: 100, borderRadius: 100, position: 'absolute', zIndex: 1 }} />
        </View>
        <View style={{ marginTop: 60 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>GUS NANDO</Text>
          <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>Hobi: hehe</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
          <MaterialCommunityIcons name="phone" size={25} color="#900" />
          <View style={{ justifyContent: 'center', marginHorizontal: 10 }}>
            <Text>0812345678</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
          <MaterialCommunityIcons name="map-marker-radius-outline" size={25} color="#900" />
          <View style={{ justifyContent: 'center', marginHorizontal: 10 }}>
            <Text>Jl tanduk</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
          <MaterialCommunityIcons name="mail" size={25} color="#900" />
          <View style={{ justifyContent: 'center', marginHorizontal: 10 }}>
            <Text>Slebew@mail.com</Text>
          </View>
        </View>
        <Button title="Transaction History" onPress={() => navigation.navigate('History')}></Button>
      </View>
    </SafeAreaView>
  );
}