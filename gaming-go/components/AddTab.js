import { useState, useEffect } from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  FlatList,
  ScrollView,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";
// import { Picker } from '@react-native-picker/picker';
import DropDownPicker from "react-native-dropdown-picker";
import Icon from "react-native-vector-icons/MaterialIcons";
const { width } = Dimensions.get("screen");
const cardWidth = width / 2 - 20;
import COLORS from "../constants/colors";
import { useDispatch, useSelector } from "react-redux";
import { postDevice } from "../store/action/actionCreator";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import { Menu, MenuItem } from "react-native-material-menu";

export default function AddTab({ navigation }) {
  const dispatch = useDispatch();

  // const [imgHolder, setImgHolder] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [imgUrl, setImgUrl] = useState("");
  const [categoryId, setCategoryId] = useState(null);
  const access_token = useSelector((state) => state.users.access_token);
  const [visible, setVisible] = useState(false);
  const [catVisible, setCatVisible] = useState(false)
  const [pick, setPick] = useState("");
  const [specs, setSpecs] = useState('')

  const hideMenu = () => {
    setVisible(false);
  };

  const hideCatMenu = () => {
    setCatVisible(false)
  }

  const showMenu = () => {
    setVisible(true);
    // console.log(visible);
  };

  const showCatMenu = () => {
    setCatVisible(true)
  }

  const handleMenuItemSelection = (value) => {
    console.log("Selected item value:", value);
    setPick(value);
    // console.log(pick)
    hideMenu();
  };

  const handleCategorySelection = (value) => {
    // console.log("Selected category value:", value);
    setCategoryId(value);
    hideCatMenu();
  };

  useEffect(() => {
    getPermissionAsync();
  }, []);

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status === "granted") {
        let data = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        if (!data.cancelled) {
          setImgUrl(data.uri);
          let newImage = {
            uri: data.uri,
            type: "device/image",
            name: "device/image",
          };
          // handleupload
          handleUpload(newImage);
        }
      } else {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      // console.log(result.assets[0].uri);
      if (!result.cancelled) {
        setImgUrl(result.uri);
        let newImage = {
          uri: result.uri,
          type: "customer/image",
          name: "customer/image",
        };
        handleUpload(newImage);
        // setImgHolder(newImage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpload = (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "Gaming-GO");
    data.append("cloud_name", "gaminggo");

    fetch("https://api.cloudinary.com/v1_1/gaminggo/image/upload", {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        setImgUrl(data.url)
      });
      // .then((data) => console.log(data.url));
  };

  const addProduct = () => {
    // console.log({ name, description, price, specs: value, imgUrl, categoryId });
    // console.log(categoryId, '<<<<<<')
    // setTimeout(() => {
    //   handleUpload(imgHolder);
    // }, 2000);
    // return
    const input = {
      name,
      description,
      price,
      specs: pick,
      imgUrl,
      CategoryId: Number(categoryId),
    };
    dispatch(postDevice(input, access_token)).then((_) =>
      navigation.navigate("HomeScreen")
    );
    // console.log(categoryId);
    console.log(input)
  };
  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <View style={styles.container}>
        <Text style={styles.title}>Add Product</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Device Name"
            keyboardType="text"
            placeholderTextColor="black"
            value={name}
            onChangeText={(name) => setName(name)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            multiline={true}
            numberOfLines={4}
            style={styles.TextInput}
            placeholder="Description"
            keyboardType="text"
            placeholderTextColor="black"
            value={description}
            onChangeText={(description) => setDescription(description)}
          />
        </View>
        <View style={styles.inputView}>
          <Menu
            visible={visible}
            anchor={
              <Text style={{fontWeight: 'bold', paddingTop: 10}} onPress={showMenu}>{pick ? pick : "pick specs range"}</Text>
            }
            onRequestClose={hideMenu}
            style={{}}
          >
            <MenuItem
              onPress={() => handleMenuItemSelection("High-end")}
              data-my-value={"High-end"}
            >
              High-end
            </MenuItem>
            <MenuItem
              onPress={() => handleMenuItemSelection("Mid-end")}
              value="Mid-end"
            >
              Mid-end
            </MenuItem>
            <MenuItem
              onPress={() => handleMenuItemSelection("Low-end")}
              value="Low-end"
            >
              Low-end
            </MenuItem>
          </Menu>
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Price"
            keyboardType="numeric"
            placeholderTextColor="black"
            value={price}
            onChangeText={(price) => setPrice(price)}
          />
        </View>
        <View style={styles.inputView}>
          <TouchableOpacity onPress={pickImage}>
            <Text style={{ color: `black`, fontWeight: "bold", padding: 11 }}>
              {imgUrl ? "Change Photo" : "Upload Photo"}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputView}>
          <Menu
            visible={catVisible}
            anchor={
              <Text style={{fontWeight: 'bold', paddingTop: 10}} onPress={showCatMenu}>{categoryId === 1 ? 'Laptop' : categoryId === 2 ? 'Handphone' : categoryId === 3 ? 'PC' : categoryId === 4 ? 'Console' : categoryId === 5 ? 'Peripherals' : 'Pick device category'}</Text>
            }
            onRequestClose={hideCatMenu}
            style={{}}
          >
            <MenuItem onPress={() => handleCategorySelection(1)}>
              Laptop
            </MenuItem>
            <MenuItem onPress={() => handleCategorySelection(2)}>
              Handphone
            </MenuItem>
            <MenuItem onPress={() => handleCategorySelection(3)}>
              PC
            </MenuItem>
            <MenuItem onPress={() => handleCategorySelection(4)}>
              Console
            </MenuItem>
            <MenuItem onPress={() => handleCategorySelection(5)}>
              Peripherals
            </MenuItem>
          </Menu>
        </View>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() =>
            addProduct(name, description, price, specs, imgUrl, categoryId)
          }
        >
          <Text style={styles.loginText}>Add</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 100,
    paddingVertical: 10
  },
  image: {
    marginBottom: 40,
    width: 200,
    height: 100,
  },
  inputView: {
    backgroundColor: "transparent",
    borderRadius: 10,
    borderColor: "black",
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
    color: "black",
    fontWeight: "900",
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
    color: "#fff",
  },
  loginBtn: {
    width: 100,
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "gray",
  },
  registerText: {
    paddingTop: 10,
    color: "#fff",
  },
  loginText: {},
  showPasswordText: {
    color: "#fff",
    paddingRight: 10,
  },
  title: {
    flex: 1,
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
    color: "#2A2A2A",
    marginTop: 3,
    marginRight: 5,
    marginLeft: 5,
    paddingBottom: 20
  },
});