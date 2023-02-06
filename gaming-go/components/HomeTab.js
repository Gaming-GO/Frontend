import { Entypo } from "@expo/vector-icons";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  FlatList,
  TouchableHighlight,
  Image,
} from "react-native";

const { width, height } = Dimensions.get("window");
const SCREEN_WIDTH = width < height ? width : height;
const recipeNumColums = 2;
const RECIPE_ITEM_HEIGHT = 150;
const RECIPE_ITEM_MARGIN = 20;
const data = [
  {
    id: 1,
    imgUrl:
      "https://www.asus.com/media/Odin/Websites/global/ProductLine/20200824120546.jpg",
    title: "Asus ROG",
    price: 10000,
  },
  {
    id: 2,
    imgUrl:
      "https://images.tokopedia.net/img/cache/500-square/VqbcmM/2021/8/14/700e3d48-6227-4c23-af71-332e509ca877.jpg",
    title: "Joystick",
    price: 10000,
  },
  {
    id: 3,
    imgUrl:
      "https://cdn.eraspace.com/pub/media/catalog/product/i/p/iphone_14_pro_max_deep_purple_1.jpg",
    title: "iPhone 14",
    price: 10000,
  },
  {
    id: 4,
    imgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3H6S-1wD_PYdIjIYn8-xiN3GppeaDeIQVuQ&usqp=CAU",
    title: "Lenovo Legion",
    price: 10000,
  },
  {
    id: 5,
    imgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3H6S-1wD_PYdIjIYn8-xiN3GppeaDeIQVuQ&usqp=CAU",
    title: "Lenovo Legion",
    price: 10000,
  },
  {
    id: 6,
    imgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3H6S-1wD_PYdIjIYn8-xiN3GppeaDeIQVuQ&usqp=CAU",
    title: "Lenovo Legion",
    price: 10000,
  },
  {
    id: 7,
    imgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3H6S-1wD_PYdIjIYn8-xiN3GppeaDeIQVuQ&usqp=CAU",
    title: "Lenovo Legion",
    price: 10000,
  },
  {
    id: 8,
    imgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3H6S-1wD_PYdIjIYn8-xiN3GppeaDeIQVuQ&usqp=CAU",
    title: "Lenovo Legion",
    price: 10000,
  },
];

const categories = [
  {
    category: "PC",
  },
  {
    category: "Laptop",
  },
  {
    category: "Smarthphone",
  },
  {
    category: "Console",
  },
  {
    category: "GameBox",
  },
];

export default function HomeTab({ navigation }) {
  const RenderCards = ({ data }) => (
    <TouchableHighlight
      // underlayColor="rgba(73,182,77,0.9)"
      underlayColor="transparent"
      onPress={() => {
        navigation.push("Detail", {
          foodId: food.id,
        });
      }}
    >
      <View style={styles.containerCard}>
        <Image style={styles.photo} source={{ uri: data.imgUrl }} />
        <Text style={styles.title}>{data.title}</Text>
        {/* <Text style={styles.category}>{data.category.name}</Text> */}
        <Text style={styles.category}>Rp {data.price}</Text>
      </View>
    </TouchableHighlight>
  );

  const RenderCategory = ({ data }) => {
    return (
      <TouchableOpacity
        style={{
          padding: 10,
          borderColor: "#2D2C2C",
          borderRadius: 5,
          backgroundColor: "#EBE8E7",
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
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 20,
            flex: 1,
          }}
        >
          <Text style={styles.category}>Hello Friends</Text>
          <ImageBackground
            source={require("../assets/slider3.png")}
            style={{ width: 35, height: 35, flex: 1 }}
            imageStyle={{ borderRadius: 25 }}
          ></ImageBackground>
        </View>
        <View>
          <Text style={styles.category}>Upcoming Events</Text>
          <TouchableOpacity>
            <Text></Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={{ height: 40, position: "relative" }}>
        <FlatList
          horizontal
          data={categories}
          // numColumns={2}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <RenderCategory data={item} />}
          // keyExtractor={(item) => `${item.id}`}
        ></FlatList>
      </View>
      <View style={{ flex: 3 }}>
        <FlatList
          vertical
          data={data}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <RenderCards data={item} />}
          // keyExtractor={(item) => `${item.id}`}
        ></FlatList>
        <View
          style={{
            position: "absolute",
            marginTop: 330,
            alignSelf: "flex-end",
            justifyContent: "flex-end",
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("ChatScreen")}
            style={styles.chatButton}
          >
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
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: `#fff`,
  },
  photo: {
    width:
      (SCREEN_WIDTH - (recipeNumColums + 1) * RECIPE_ITEM_MARGIN) /
      recipeNumColums,
    height: RECIPE_ITEM_HEIGHT - 25,
    borderRadius: 5,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    resizeMode: "stretch",
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
  },
  category: {
    marginTop: 3,
    marginBottom: 3,
    color: "#2A2A2A",
  },
  containerCard: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: RECIPE_ITEM_MARGIN,
    marginTop: 20,
    width:
      (SCREEN_WIDTH - (recipeNumColums + 1) * RECIPE_ITEM_MARGIN) /
      recipeNumColums,
    height: RECIPE_ITEM_HEIGHT + 50,
    borderColor: "#cccccc",
    // borderWidth: 0.5,
    borderRadius: 5,
    // backgroundColor: `#1E1716`,
    backgroundColor: `#F1EEED`,
    shadowColor: "#000",
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
    backgroundColor: "tomato",
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "tomato",
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
