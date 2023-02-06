import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  ScrollView,
  Pressable,
} from "react-native";

export default function Register({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [NIK, setNIK] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const managePass = () => {
    setShowPassword(!showPassword);
  };

  const registAction = () => {
    console.log({ username, email, password, NIK, phoneNumber, address });
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <ImageBackground
          source={require("../assets/background.png")}
          style={{
            //   paddingTop: ,
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image style={styles.image} source={require("../assets/Logo1.png")} />
          <StatusBar style="auto" />
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Username"
              placeholderTextColor="#fff"
              value={username}
              onChangeText={(username) => setUsername(username)}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Email"
              placeholderTextColor="#fff"
              value={email}
              onChangeText={(email) => setEmail(email)}
            />
          </View>
          <View style={{ ...styles.inputView, flexDirection: "row" }}>
            <TextInput
              style={{ ...styles.TextInput, marginLeft: 50 }}
              placeholder="Password"
              placeholderTextColor="#fff"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={(password) => setPassword(password)}
            />
            <TouchableOpacity onPress={managePass}>
              <Text style={styles.showPasswordText}>
                {showPassword ? "Hide" : "Show"}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="NIK"
              keyboardType="numeric"
              placeholderTextColor="#fff"
              value={NIK}
              onChangeText={(NIK) => setNIK(NIK)}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Phone Number"
              keyboardType="numeric"
              placeholderTextColor="#fff"
              value={phoneNumber}
              onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Address"
              placeholderTextColor="#fff"
              value={address}
              onChangeText={(address) => setAddress(address)}
            />
          </View>
          <TouchableOpacity
            onPress={() =>
              registAction(username, email, password, NIK, phoneNumber, address)
            }
            style={styles.loginBtn}
          >
            <Text style={styles.loginText}>Register</Text>
          </TouchableOpacity>
          <Text style={styles.registerText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("LoginPage")}>
            <Text style={styles.forgot_button}>login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
            <Text style={styles.forgot_button}>HomeScreen</Text>
          </TouchableOpacity>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#567189",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    marginBottom: 40,
    width: 200,
    height: 100,
  },
  inputView: {
    backgroundColor: "transparent",
    borderRadius: 10,
    borderColor: "#fff",
    borderWidth: 1,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    textAlign: "center",
    color: "#fff",
    fontWeight: "900",
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
    color: "#fff",
  },
  loginBtn: {
    width: "50%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#fff",
  },
  registerText: {
    paddingTop: 10,
    color: "#fff",
  },
  loginText: {
    fontWeight: "bold",
  },
  showPasswordText: {
    color: "#fff",
    paddingRight: 10,
  },
});
