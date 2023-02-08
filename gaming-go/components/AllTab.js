import { useEffect, useState } from 'react';
import { Button, Dimensions, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { FlatList, ScrollView, TextInput, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import categories from '../constants/categories';
import COLORS from '../constants/colors';
import gadgets from '../constants/gadget';
import { fetchAllDevices, fetchByFilter, fetchCategories } from '../store/action/actionCreator';
const { width } = Dimensions.get('screen');
const cardWidth = width / 2 - 20;

// const baseUrl = 'https://e06d-2001-448a-1101-171a-85d2-8409-5431-4c0.ap.ngrok.io';

export default function AllTab({ navigation }) {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const dispatch = useDispatch();
  const [filteredDevices, setFilteredDevices] = useState(null);

  let categoriesData = useSelector((state) => state.users.categories);
  // const filteredData = useSelector((state) => state.users.filteredDevices);
  let gadgets = useSelector((state) => state.users.allDevices);

  // const filter = filteredData.Devices;

  // let filteredDevices;
  const filterByCategory = (id, index) => {
    setSelectedCategoryIndex(index);
    // console.log(id);
    // dispatch(fetchByFilter(id));
    let a = gadgets.filter((e) => e.CategoryId == id);
    setFilteredDevices(a);
    // console.log(filteredDevices);
    // return;
  };

  // console.log(categoriesData, '<<<<+=====================');
  const filterSpecs = [
    {
      name: 'All',
    },
    {
      name: 'High-end',
    },
    {
      name: 'Mid-end',
    },
    {
      name: 'Low-end',
    },
  ];

  const ListSpecs = () => {
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={style.categoriesListContainer}>
        {filterSpecs.map((specs, index) => (
          <TouchableOpacity key={index} activeOpacity={0.8} onPress={() => console.log('cok')}>
            <View
              style={{
                backgroundColor: selectedCategoryIndex == index ? 'grey' : `#dcdcdc`,
                ...style.categoryBtn,
              }}
            >
              {/* <View style={style.categoryBtnImgCon}>
                <Image
                  source={category.image}
                  style={{
                    height: 35,
                    width: 35,
                    resizeMode: 'contain',
                    borderRadius: 100,
                  }}
                />
              </View> */}
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 'bold',
                  marginLeft: 3,
                  color: selectedCategoryIndex == index ? COLORS.white : `#696969`,
                }}
              >
                {specs.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  useEffect(() => {
    dispatch(fetchAllDevices());
    dispatch(fetchCategories());
  }, []);

  const ListCategories = () => {
    return (
      <>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={style.categoriesListContainer}>
          {categoriesData.map((category, index) => (
            <TouchableOpacity key={index} activeOpacity={0.8} onPress={() => filterByCategory(category.id, index)}>
              <View
                style={{
                  backgroundColor: selectedCategoryIndex == index ? 'grey' : `#dcdcdc`,
                  ...style.categoryBtn,
                }}
              >
                {/* <View style={style.categoryBtnImgCon}>
                <Image
                  source={category.image}
                  style={{
                    height: 35,
                    width: 35,
                    resizeMode: 'contain',
                    borderRadius: 100,
                  }}
                />
              </View> */}
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    marginLeft: 3,
                    color: selectedCategoryIndex == index ? COLORS.white : `#696969`,
                  }}
                >
                  {category.name}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        {/* <ListSpecs /> */}
      </>
    );
  };

  const Card = ({ gadget }) => {
    return (
      <TouchableHighlight underlayColor={COLORS.white} activeOpacity={0.9} onPress={() => navigation.navigate('DetailScreen', gadget)}>
        <View style={style.card}>
          <View style={{ alignItems: 'center' }}>
            <Image
              source={{ uri: gadget.imgUrl }}
              style={{
                height: 130,
                width: 175,
                resizeMode: 'cover',
                borderRadius: 5,
              }}
            />
          </View>
          <View style={{ marginHorizontal: 20, marginTop: 10 }}>
            <Text style={{ fontSize: 15, textAlign: 'center' }}>{gadget.name}</Text>
            {/* <Text style={{ fontSize: 14, color: COLORS.grey, marginTop: 2 }}>
              {gadget.ingredients}
            </Text> */}
          </View>
          <View
            style={{
              // marginTop: ,
              marginHorizontal: 20,
              // flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: 10,
            }}
          >
            <View style={{ backgroundColor: gadget.specs === 'High-end' ? '#f08080' : gadget.specs === 'Mid-end' ? 'lightblue' : 'lightgreen', width: 75, height: 22, borderRadius: 5 }}>
              <Text style={{ textAlign: 'center', fontSize: 14, paddingTop: 2.5 }}>{gadget.specs}</Text>
            </View>
            <Text style={{ textAlign: 'center', fontSize: 14, fontWeight: 'bold' }}>Rp {gadget.price}</Text>
            {/* <Text style={{ textAlign: 'center', fontSize: 14, fontWeight: 'bold' }}>Rp {gadget}</Text> */}
            {/* <View style={style.addToCartBtn}>
              <Icon specs="add" size={20} color={COLORS.white} />
            </View> */}
          </View>
        </View>
      </TouchableHighlight>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={style.header}>
        <View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 28 }}>Hello,</Text>
            <Text style={{ fontSize: 28, fontWeight: 'bold', marginLeft: 10 }}>BTB</Text>
          </View>
          <Text style={{ marginTop: 5, fontSize: 22, color: COLORS.grey }}>What do you want today?</Text>
        </View>
        <Image source={require('../assets/icon.png')} style={{ height: 50, width: 50, borderRadius: 25 }} />
      </View>
      <View
        style={{
          marginTop: 40,
          flexDirection: 'row',
          paddingHorizontal: 20,
        }}
      >
        <View style={style.inputContainer}>
          <Icon name="search" size={28} />
          <TextInput style={{ flex: 1, fontSize: 18 }} placeholder="Search for gadget" />
        </View>
        {/* <View style={style.sortBtn}>
          <Icon name="tune" size={28} color={COLORS.white} />
        </View> */}
      </View>
      <View>
        {/* <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 15, borderWidth: 1 }}>
          <Button title="all" />
          <Button title="High-end" />
          <Button title="Mid-end" />
          <Button title="Low-end" />
        </View> */}
        <ListSpecs />
        <ListCategories></ListCategories>
      </View>

      <FlatList style={{ paddingHorizontal: 10 }} showsVerticalScrollIndicator={false} numColumns={2} data={filteredDevices} renderItem={({ item }) => <Card gadget={item} />} />
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  inputContainer: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: COLORS.light,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  sortBtn: {
    width: 50,
    height: 50,
    marginLeft: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesListContainer: {
    paddingVertical: 10,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  categoryBtn: {
    height: 45,
    // width: 120,
    marginRight: 7,
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 10,
    flexDirection: 'row',
    paddingRight: 10,
  },
  categoryBtnImgCon: {
    height: 35,
    width: 35,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    height: 220,
    width: cardWidth - 10,
    marginHorizontal: 10,
    marginBottom: 15,
    marginTop: 15,
    borderRadius: 5,
    elevation: 13,
    backgroundColor: COLORS.white,
    borderColor: '#cccccc',
    // borderWidth: 0.5,
    // borderRadius: 5,
    // backgroundColor: `#1E1716`,
    backgroundColor: `#F1EEED`,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 6.68,

    elevation: 11,
    // position: "relative",
  },
  addToCartBtn: {
    height: 30,
    width: 30,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
