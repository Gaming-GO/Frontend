import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dimensions } from 'react-native';
import * as Location from 'expo-location';
const { width, height } = Dimensions.get('screen');
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, SafeAreaView, ImageBackground } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { slides } from '../constants/constant';
import { setToken } from '../store/action/actionCreator';
import { useDispatch } from 'react-redux';

// const createFormData = (photo, body = {}) => {
//   const data = new FormData();

//   data.append("photo", {
//     name: photo.fileName,
//     type: photo.type,
//     uri: Platform.OS === "ios" ? photo.uri.replace("file://", "") : photo.uri,
//   });

//   Object.keys(body).forEach((key) => {
//     data.append(key, body[key]);
//   });

//   return data;
// };

// const baseUrl = 'https://3104-2001-448a-110d-1aea-468-5dbe-c57f-7bee.ap.ngrok.io';
const baseUrl = 'https://ad2d-139-192-36-123.ap.ngrok.io';

export default function Login({ navigation }) {
  const dispatch = useDispatch();

  const [login, setLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  // const [location, setLocation] = useState();

  // useEffect(() => {
  //   const getPermissions = async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== 'granted') {
  //       console.log('please grant location permissisons');
  //       return;
  //     }
  //     let currentLocation = await Location.getCurrentPositionAsync({});
  //     setLocation(currentLocation);
  //     console.log('location:');
  //     console.log(currentLocation);
  //   };
  //   getPermissions();
  // }, []);

  const buttonLabel = (label) => {
    return (
      <View style={{ padding: 12 }}>
        <Text
          style={{
            color: '#fff',
            fontWeight: '600',
            fontSize: 16,
          }}
        >
          {label}
        </Text>
      </View>
    );
  };
  if (!login) {
    return (
      <AppIntroSlider
        data={slides}
        renderItem={({ item }) => {
          return (
            <ImageBackground source={require('../assets/background1.png')} style={styles.appIntroContainer}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 30,
                  fontWeight: 'bold',
                }}
              >
                {item.name}
              </Text>
              <Image
                source={item.image}
                style={{
                  width: width - 80,
                  height: 400,
                }}
                resizeMode="contain"
              />

              <Text
                style={{
                  fontWeight: 'bold',
                  color: '#072F4A',
                  fontSize: 14,
                  textAlign: 'center',
                  paddingTop: 10,
                }}
              >
                {item.description}
              </Text>
            </ImageBackground>
          );
        }}
        dotStyle={{
          backgroundColor: '#fff',
        }}
        activeDotStyle={{
          backgroundColor: 'red',
          width: 30,
        }}
        renderNextButton={() => buttonLabel('NEXT')}
        renderSkipButton={() => buttonLabel('SKIP >>>')}
        renderDoneButton={() => buttonLabel('DONE')}
        onDone={() => {
          setLogin(true);
        }}
      />
    );
  }

  const managePass = () => {
    setShowPassword(!showPassword);
  };

  const loginForm = () => {
    let input = { email, password };
    fetch(baseUrl + '/pub/login', {
      method: 'POST',
      body: JSON.stringify(input),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        dispatch(setToken(data));
        navigation.navigate('HomeScreen');
      });
  };
  return (
    <SafeAreaView>
      <ImageBackground
        source={require('../assets/background.png')}
        style={{
          //   paddingTop: ,
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          resizeMode: 'contain',
        }}
      >
        <Image style={styles.image} source={require('../assets/Logo1.png')} />
        <StatusBar style="auto" />
        <View style={styles.inputView}>
          <TextInput style={styles.TextInput} placeholder="Email" placeholderTextColor="#fff" onChangeText={(email) => setEmail(email)} defaultValue={email} />
        </View>
        <View style={{ ...styles.inputView, flexDirection: 'row' }}>
          <TextInput style={{ ...styles.TextInput, marginLeft: 50 }} placeholder="Password" placeholderTextColor="#fff" secureTextEntry={!showPassword} onChangeText={(password) => setPassword(password)} defaultValue={password} />
          <TouchableOpacity onPress={managePass}>
            <Text style={styles.showPasswordText}>{showPassword ? 'Hide' : 'Show'}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => loginForm(email, password)} style={styles.loginBtn}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        <Text style={styles.registerText}>Dont have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterPage')}>
          <Text style={styles.forgot_button}>register</Text>
        </TouchableOpacity>
        {/* <Text style={{ color: "#fff" }}>{location.coords.longitude}</Text>
        <Text style={{ color: "#fff" }}>{location.coords.latitude}</Text> */}
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    marginBottom: 40,
    width: 200,
    height: 100,
  },
  inputView: {
    backgroundColor: 'transparent',
    borderRadius: 10,
    borderColor: '#fff',
    borderWidth: 1,
    width: '70%',
    height: 45,
    marginBottom: 20,
    alignItems: 'center',
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    textAlign: 'center',
    color: '#fff',
    fontWeight: '900',
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
    color: '#fff',
  },
  loginBtn: {
    width: '50%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: '#fff',
  },
  registerText: {
    paddingTop: 10,
    color: '#fff',
  },
  loginText: {
    fontWeight: 'bold',
  },
  showPasswordText: {
    color: '#fff',
    paddingRight: 10,
  },
  appIntroContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
    paddingTop: 100,
    // backgroundColor: `#ffe4b5`,
  },
});
