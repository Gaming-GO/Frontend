import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { SecondaryButton } from '../components/button';
import COLORS from '../constants/colors';
import { addTransactionFromHehe } from '../store/action/actionCreator';

// const baseUrl = 'https://3104-2001-448a-110d-1aea-468-5dbe-c57f-7bee.ap.ngrok.io';
const baseUrl = 'https://ad2d-139-192-36-123.ap.ngrok.io';

const DetailsScreen = ({ navigation, route }) => {
  const [rentEnd, setRentEnd] = useState(1);
  const [currentUser, setCurrentUser] = useState(0);
  const gadget = route.params;
  useEffect(() => {
    fetch(baseUrl + "/pub/user", {
      headers: {
        "Content-Type": "application/json",
        access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjc1NzgyNDg3fQ.0JFb-MSeVLI_xa7T0Nz0CjIwXBKxyghR5S9td9DKBww"
      }
    })
    .then(resp => {
      if(!resp.ok) throw {name:"Failed here", status:resp.status}
      return resp.json()
    })
    .then(data => {
      setCurrentUser(data.id)
    })
    .catch(err => console.log(err))
  }, [])

  const dispatch = useDispatch();

  let temp = rentEnd;

  const access_token = useSelector((state) => state.users.access_token);
  // console.log(access_token);

  const addTransaction = (id) => {
    // console.log(id);
    // console.log(temp);
    // console.log('lllllllllllllllllllllllllllllllll');
    // rentEnd = 5;
    dispatch(addTransactionFromHehe(id, access_token, temp)).then((_) => navigation.navigate('HomeScreen'));

    // fetch(baseUrl + `/pub/rent/${id}`, {
    //   method: 'POST',
    //   body: JSON.stringify({ rentEnd: temp }),
    //   headers: {
    //     'Content-Type': 'application/json',
    //     access_token: access_token,
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //     navigation.navigate('HomeScreen');
    //   });
  };

  

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white }}>
      <View style={style.header}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Details</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 280,
          }}
        >
          <Image source={{ uri: gadget.imgUrl }} style={{ height: 220, width: 220, resizeMode: 'contain' }} />
        </View>
        <View style={style.details}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 25, fontWeight: 'bold', color: COLORS.white }}>{gadget.name}</Text>
            <View style={style.iconContainer}>
              {/* <Icon name="favorite-border" color={COLORS.primary} size={25} /> */}
              <Text style={{ fontSize: 20, fontWeight: '600' }}>Rp {gadget.price}</Text>
            </View>
          </View>
          {/* tombol +- */}
          <View style={style.actionBtn}>
            <Icon name="remove" size={25} color={COLORS.white} onPress={() => setRentEnd((temp -= 1))} />
            <Text>{temp}</Text>
            <Icon name="add" size={25} color={COLORS.white} onPress={() => setRentEnd((temp += 1))} />
          </View>

          <Text style={style.detailsText}>{gadget.description}</Text>
          <View style={{ marginTop: 40, marginBottom: 40 }}>
            <SecondaryButton title="Add To Cart" onPress={() => addTransaction(gadget.id)} />
            <SecondaryButton title="Chat Seller" onPress={() => {
              console.log(gadget.UserId, currentUser, " att button");
              navigation.navigate("Messaging", {toUserId:gadget.UserId,fromUserId:currentUser, test:"teslkjadlj"})
            }} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  details: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 60,
    backgroundColor: COLORS.primary,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  iconContainer: {
    backgroundColor: COLORS.white,
    height: 50,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  detailsText: {
    marginTop: 10,
    lineHeight: 22,
    fontSize: 16,
    color: COLORS.white,
  },
  actionBtn: {
    width: 80,
    height: 30,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
});

export default DetailsScreen;
