import { Entypo } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, StyleSheet, ScrollView, ImageBackground, TouchableOpacity, Dimensions, FlatList, TouchableHighlight, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNearest } from '../store/action/actionCreator';

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;
const recipeNumColums = 2;
const RECIPE_ITEM_HEIGHT = 150;
const RECIPE_ITEM_MARGIN = 20;

export default function HomeTab({ navigation }) {
  const dispatch = useDispatch();
  const access_token = useSelector((state) => state.users.access_token);

  const nearest = useSelector((state) => state.users.nearest);

  useEffect(() => {
    dispatch(fetchNearest(access_token));
  }, []);

  const RenderCards = ({ gadget }) => (
    <TouchableHighlight
      // underlayColor="rgba(73,182,77,0.9)"
      underlayColor="transparent"
      onPress={() => {
        navigation.push('DetailScreen', gadget);
      }}
    >
      <View style={styles.containerCard}>
        <Image style={styles.photo} source={{ uri: gadget.imgUrl }} />
        <Text style={styles.title}>{gadget.name}</Text>
        {/* <Text style={styles.category}>{gadget.category.name}</Text> */}
        <Text style={styles.category}>Rp {gadget.price}</Text>
      </View>
    </TouchableHighlight>
  );

  const RenderCategory = ({ data }) => {
    return (
      <TouchableOpacity
        style={{
          padding: 10,
          borderColor: '#2D2C2C',
          borderRadius: 5,
          backgroundColor: '#EBE8E7',
          borderWidth: 1,
          margin: 2,
        }}
      >
        <Text style={{}}>{data.category}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ padding: 20 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 20,
            flex: 1,
          }}
        >
          <Text style={styles.category}>Hello Friends || </Text>
          <Text style={styles.category}>INI DATA NEARESTTT </Text>
          <ImageBackground source={require('../assets/slider3.png')} style={{ width: 35, height: 35, flex: 1 }} imageStyle={{ borderRadius: 25 }}></ImageBackground>
        </View>
        <View>
          <Text style={styles.category}>Upcoming Events</Text>
          <TouchableOpacity>
            <Text></Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={{ height: 40, position: 'relative' }}></View>
      <View style={{ flex: 3 }}>
        <FlatList
          vertical
          // data={data}
          data={nearest}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <RenderCards gadget={item} />}
          // keyExtractor={(item) => `${item.id}`}
        ></FlatList>
        <View
          style={{
            position: 'absolute',
            marginTop: 330,
            alignSelf: 'flex-end',
            justifyContent: 'flex-end',
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate('ChatScreen')} style={styles.chatButton}>
            <Entypo name="chat" size={24} color="#c0c0c0" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: `#fff`,
  },
  photo: {
    width: (SCREEN_WIDTH - (recipeNumColums + 1) * RECIPE_ITEM_MARGIN) / recipeNumColums,
    height: RECIPE_ITEM_HEIGHT - 25,
    borderRadius: 5,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    resizeMode: 'stretch',
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
  category: {
    marginTop: 3,
    marginBottom: 3,
    color: '#2A2A2A',
  },
  containerCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: RECIPE_ITEM_MARGIN,
    marginTop: 20,
    width: (SCREEN_WIDTH - (recipeNumColums + 1) * RECIPE_ITEM_MARGIN) / recipeNumColums,
    height: RECIPE_ITEM_HEIGHT + 50,
    borderColor: '#cccccc',
    // borderWidth: 0.5,
    borderRadius: 5,
    // backgroundColor: `#1E1716`,
    backgroundColor: `#F1EEED`,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
    // position: "relative",
  },
  chatButton: {
    backgroundColor: 'tomato',
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'tomato',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.9,
    shadowRadius: 8,
    marginRight: 20,
    marginBottom: 10,
  },
});
