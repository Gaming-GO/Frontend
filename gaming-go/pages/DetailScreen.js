import { SafeAreaView, StyleSheet, View, Text, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import { SecondaryButton } from '../components/button';
import COLORS from '../constants/colors';

const baseUrl = 'https://3104-2001-448a-110d-1aea-468-5dbe-c57f-7bee.ap.ngrok.io';

const DetailsScreen = ({ navigation, route }) => {
  const gadget = route.params;

  const access_token = useSelector((state) => state.users.access_token);
  // console.log(access_token);

  const addTransaction = (id) => {
    console.log(id);
    // console.log('lllllllllllllllllllllllllllllllll');
    const rentEnd = 5;
    fetch(baseUrl + `/pub/rent/${id}`, {
      method: 'POST',
      body: JSON.stringify({ rentEnd }),
      headers: {
        'Content-Type': 'application/json',
        access_token: access_token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        navigation.navigate('HomeScreen');
      });
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
          <Text style={style.detailsText}>{gadget.description}</Text>

          <View style={{ marginTop: 40, marginBottom: 40 }}>
            <SecondaryButton title="Add To Cart" onPress={() => addTransaction(gadget.id)} />
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
});

export default DetailsScreen;
