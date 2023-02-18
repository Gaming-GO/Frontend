import { Entypo } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, StyleSheet, ScrollView, ImageBackground, TouchableOpacity, Dimensions, FlatList, TouchableHighlight, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNearest } from '../store/action/actionCreator';
const { width } = Dimensions.get('screen');
const cardWidth = width / 2 - 20;

import Carousel from 'react-native-reanimated-carousel';
import COLORS from '../constants/colors';

const images = [
  'https://cdn1-production-images-kly.akamaized.net/YDew-Y-9yOrMhX4sHJ4xLDfUDN4=/640x360/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/3540960/original/009739200_1629026250-rog_zephyrus_m16.jpg',
  'https://assets3.razerzone.com/gGI3HDoCD5iavWrRhTXbwDOyh4U=/1500x1000/https%3A%2F%2Fhybrismediaprod.blob.core.windows.net%2Fsys-master-phoenix-images-container%2Fhe1%2Fhe0%2F9286404931614%2F210104-blade-17-d8-fhd-1500x1000-1.jpg',
  'https://storage-asset.msi.com/global/picture/image/feature/desktop/Aegis-Ti5/Product-video-MEG-Aegis-Ti5-thumbnail-2.jpg',
  'https://cdn.urbandigital.id/wp-content/uploads/2017/11/Xbox-One.jpg',
];

const { height } = Dimensions.get('window');
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

  const RenderCards = ({ gadget }) => {
    // <TouchableHighlight
    //   // underlayColor="rgba(73,182,77,0.9)"
    //   underlayColor="transparent"
    //   onPress={() => {
    //     navigation.push('DetailScreen', gadget);
    //   }}
    // >
    //   <View style={styles.containerCard}>
    //     <Image style={styles.photo} source={{ uri: gadget.imgUrl }} />
    //     <Text style={styles.title}>{gadget.name}</Text>
    //     {/* <Text style={styles.category}>{gadget.category.name}</Text> */}
    //     <Text style={styles.category}>Rp {gadget.price}</Text>
    //   </View>
    // </TouchableHighlight>
    return (
      <TouchableHighlight underlayColor={COLORS.white} activeOpacity={0.9} onPress={() => navigation.navigate('DetailScreen', gadget)}>
        <View style={styles.card}>
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
        ></View>
        <View>
          <Text style={styles.category}></Text>
          <TouchableOpacity>
            <View style={{ paddingLeft: -40 }}>
              <Carousel
                // loop
                width={width}
                height={width / 2}
                autoPlay={false}
                data={images}
                scrollAnimationDuration={3000}
                // onSnapToItem={(index) => console.log('current index:', index)}
                panGestureHandlerProps={{
                  activeOffsetX: [-10, 10],
                }}
                renderItem={({ index }) => (
                  <View style={{ flex: 1, width: width, borderWidth: 1, justifyContent: 'center', flexDirection: 'row', paddingLeft: 480 }}>
                    {images.map((e, index) => {
                      return <Image source={{ uri: e }} key={index} style={{ width: 450, height: 210 }} resizeMode="cover" />;
                      // return console.log(e)
                    })}
                  </View>

                  // <View
                  //       style={{
                  //           flex: 1,
                  //           borderWidth: 1,
                  //           justifyContent: 'center',
                  //       }}
                  //   >
                  //       <Text style={{ textAlign: 'center', fontSize: 30 }}>
                  //           {index}
                  //       </Text>
                  //   </View>
                )}
              />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {/* <View style={{ height: 10, position: 'relative' }}></View> */}
      {/* <Text style={{ paddingLeft: 40, f }}>Nearest</Tex */}
      <View style={{ flex: 100, paddingLeft: 30 }}>
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
            marginTop: 400,
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
    marginLeft: -20,
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
});
