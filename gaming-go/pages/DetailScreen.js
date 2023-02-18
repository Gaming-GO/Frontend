import { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { SecondaryButton } from '../components/button';
import COLORS from '../constants/colors';
import { addTransactionFromHehe } from '../store/action/actionCreator';

// const baseUrl = 'https://3104-2001-448a-110d-1aea-468-5dbe-c57f-7bee.ap.ngrok.io';
// const baseUrl = 'https://e06d-2001-448a-1101-171a-85d2-8409-5431-4c0.ap.ngrok.io';
const baseUrl = 'https://702f-2001-448a-1101-171a-4c51-8a97-e1e4-9b06.ap.ngrok.io';

const DetailsScreen = ({ navigation, route }) => {
  const [rentEnd, setRentEnd] = useState(1);
  const [currentUser, setCurrentUser] = useState(0);
  const gadget = route.params;

  console.log(gadget.UserId, '<<<<<');

  const dispatch = useDispatch();

  const selectToken = useSelector((state) => state.users.access_token);
  // access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjc1ODY4MzYzfQ.jVuRLVRTYJXxJuaNRdobjnY5YvKXahW15rcMnNHgtE8',
  useEffect(() => {
    fetch(baseUrl + '/pub/user/0', {
      headers: {
        'Content-Type': 'application/json',
        access_token: selectToken,
      },
    })
      .then((resp) => {
        if (!resp.ok) throw { name: 'Failed here', status: resp.status };
        return resp.json();
      })
      .then((data) => {
        setCurrentUser(data.id);
      })
      .catch((err) => console.log(err));
  }, []);

  // console.log(gadget, '<<<<atengOcis');

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
      <View>
        <View style={style.header}>
          <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Details</Text>
        </View>
        <View showsVerticalScrollIndicator={false}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 280,
            }}
          >
            <Image source={{ uri: gadget.imgUrl }} style={{ height: 220, width: 220, resizeMode: 'contain' }} />
          </View>
          <ScrollView style={style.details}>
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
                <Text style={{ fontSize: 15, fontWeight: '600' }}>Rp {gadget.price}</Text>
              </View>
            </View>
            {/* tombol +- */}
            <View style={style.actionBtn}>
              <Icon name="remove" size={35} color={COLORS.white} onPress={() => setRentEnd((temp -= 1))} />
              <Text style={{ fontWeight: 'bold', paddingTop: 7, fontSize: 20 }}>{temp}</Text>
              <Icon name="add" size={35} color={COLORS.white} onPress={() => setRentEnd((temp += 1))} />
            </View>

            <Text>{gadget.User}</Text>
            <Text style={style.detailsText}>{gadget.description}</Text>
          </ScrollView>
        </View>
      </View>
      <View style={{ paddingVertical: 40, backgroundColor: '#696969', borderBottomRightRadius: 30, borderBottomLeftRadius: 30, justifyContent: 'center', alignContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
        <SecondaryButton title="Add To Cart" onPress={() => addTransaction(gadget.id)} />
        <Text style={{ color: '#696969' }}>_</Text>
        <SecondaryButton
          title="Chat Seller"
          onPress={() => {
            console.log(gadget.UserId, currentUser, ' att button');
            navigation.navigate('Messaging', { toUserId: gadget.UserId, fromUserId: currentUser });
          }}
        />
      </View>
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
    backgroundColor: `#696969`,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    // borderRadius: 40,
    height: 320,
  },
  iconContainer: {
    backgroundColor: COLORS.white,
    height: 40,
    width: 100,
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
    width: 150,
    height: 40,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
});

export default DetailsScreen;
