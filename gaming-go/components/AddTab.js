import { useState } from 'react';
import { Dimensions, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { FlatList, ScrollView, TextInput, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
// import { Picker } from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
const { width } = Dimensions.get('screen');
const cardWidth = width / 2 - 20;
import COLORS from '../constants/colors';
import { useDispatch, useSelector } from 'react-redux';
import { postDevice } from '../store/action/actionCreator';

export default function AddTab({ navigation }) {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [specs, setSpecs] = useState([
    { label: 'High-end', value: 'High-end' },
    { label: 'Mid-end', value: 'Mid-end' },
    { label: 'Low-end', value: 'Low-end' },
  ]);
  const [imgUrl, setImgUrl] = useState('');
  const [categoryId, setCategoryId] = useState(1);
  const [selectedValue, setSelectedValue] = useState(null);

  const [open, setOpen] = useState(false);
  //   const [value, setValue] = useState(null);
  const [value, setValue] = useState(['High-end', 'Mid-end', 'Low-end']);

  const access_token = useSelector((state) => state.users.access_token);

  //   useEffect();

  const addProduct = () => {
    // console.log({ name, description, price, specs: value, imgUrl, categoryId });
    const input = { name, description, price, specs: value, imgUrl, CategoryId: Number(categoryId) };
    dispatch(postDevice(input, access_token)).then((_) => navigation.navigate('HomeScreen'));
    // console.log(categoryId);
  };
  return (
    // <SafeAreaView>
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Add Product</Text>
        <View style={styles.inputView}>
          <TextInput style={styles.TextInput} placeholder="Device Name" keyboardType="text" placeholderTextColor="black" value={name} onChangeText={(name) => setName(name)} />
        </View>
        <View style={styles.inputView}>
          <TextInput multiline={true} numberOfLines={4} style={styles.TextInput} placeholder="Description" keyboardType="text" placeholderTextColor="black" value={description} onChangeText={(description) => setDescription(description)} />
        </View>
        <View style={styles.inputView}>
          {/* <Picker selectedValue={specs} style={{ height: 50, width: 150 }} mode="dropdown" onValueChange={(itemValue, itemIndex) => setSpecs(itemValue)}>
            <Picker.Item label="High-End" value="High-end" />
            <Picker.Item label="Mid-End" value="Mid-end" />
            <Picker.Item label="Low-End" value="Low-end" />
          </Picker> */}
          <DropDownPicker
            open={open}
            // value={value}
            items={[
              { label: 'Low-end', value: 'Low-end' },
              { label: 'Mid-end', value: 'Mid-end' },
              { label: 'High-end', value: 'High-end' },
            ]}
            defaultValue={selectedValue}
            onValueChange={(value) => setSelectedValue(value)}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setSpecs}
            placeholder="Select Device Specs"
            dropDownContainerStyle={{ backgroundColor: 'black' }}
            theme="DARK"
          />
        </View>
        <View style={styles.inputView}>
          <TextInput style={styles.TextInput} placeholder="Price" keyboardType="text" placeholderTextColor="black" value={price} onChangeText={(price) => setPrice(price)} />
        </View>
        <View style={styles.inputView}>
          <TextInput style={styles.TextInput} placeholder="Image Url" keyboardType="text" placeholderTextColor="black" value={imgUrl} onChangeText={(imgUrl) => setImgUrl(imgUrl)} />
        </View>
        <View style={styles.inputView}>
          <TextInput style={styles.TextInput} placeholder="Category" keyboardType="text" placeholderTextColor="black" value={categoryId} onChangeText={(categoryId) => setCategoryId(categoryId)} />
        </View>
        <TouchableOpacity style={styles.loginBtn} onPress={() => addProduct(name, description, price, specs, imgUrl, categoryId)}>
          <Text style={styles.loginText}>Add</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#567189',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 100,
  },
  image: {
    marginBottom: 40,
    width: 200,
    height: 100,
  },
  inputView: {
    backgroundColor: 'transparent',
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    width: '70%',
    height: 45,
    marginBottom: 20,
    alignItems: 'center',
    // zIndex: 0,
    // alignItems: 'flex-end',
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    textAlign: 'center',
    color: 'black',
    fontWeight: '900',
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
    color: '#fff',
  },
  loginBtn: {
    width: 100,
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: 'gray',
  },
  registerText: {
    paddingTop: 10,
    color: '#fff',
  },
  loginText: {},
  showPasswordText: {
    color: '#fff',
    paddingRight: 10,
  },
  title: {
    flex: 1,
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2A2A2A',
    marginTop: 3,
    marginRight: 5,
    marginLeft: 5,
  },
});
