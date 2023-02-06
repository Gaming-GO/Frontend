import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import COLORS from '../constants/colors';
import gadgets from '../constants/gadget';
import { PrimaryButton } from './button';

const baseUrl = 'https://3104-2001-448a-110d-1aea-468-5dbe-c57f-7bee.ap.ngrok.io';

export default function TransactionTab({ navigation }) {
  const [interval, setInterval] = useState(0);
  const [trs, setTrs] = useState({});
  const [data, setData] = useState({});

  const access_token = useSelector((state) => state.users.access_token);

  useEffect(() => {
    fetch(baseUrl + '/pub/transactions', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        access_token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTrs(data.Transaction.totalPrice);
        // setData(data.Details);
        setData(data);
        // dispatch(setToken(data));
        // navigation.navigate('HomeScreen');
      });
  }, []);

  const CartCard = ({ item }) => {
    return (
      <View style={style.cartCard}>
        <Image source={{ uri: item.Device.imgUrl }} style={{ height: 80, width: 80 }} />
        <View
          style={{
            height: 100,
            marginLeft: 10,
            paddingVertical: 20,
            flex: 1,
          }}
        >
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.Device.name}</Text>
          <Text style={{ fontSize: 13, color: COLORS.grey }}>{item.ingredients}</Text>
          <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Rp {item.price}</Text>
        </View>
        <View style={{ marginRight: 20, alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{interval}days</Text>
          <View style={style.actionBtn}>
            <Icon name="remove" size={25} color={COLORS.white} onPress={() => setInterval(item.price - 1)} />
            <Icon name="add" size={25} color={COLORS.white} onPress={() => setInterval(item.price + 1)} />
          </View>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <View style={style.header}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Cart</Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
        data={data.Details}
        renderItem={({ item }) => <CartCard item={item} />}
        ListFooterComponentStyle={{ paddingHorizontal: 20, marginTop: 20 }}
        // ListFooterComponent={() => (
        //   <View>
        //     <View
        //       style={{
        //         flexDirection: 'row',
        //         justifyContent: 'space-between',
        //         marginVertical: 15,
        //       }}
        //     >
        //       <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Total Price</Text>
        //       <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{trs}</Text>
        //     </View>
        //     <View style={{ marginHorizontal: 30 }}>
        //       <PrimaryButton title="CHECKOUT" />
        //     </View>
        //   </View>
        // )}
      />
      {/* <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Total Price</Text>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{trs}</Text>
      <View style={{ marginHorizontal: 30 }}>
        <PrimaryButton title="CHECKOUT" />
      </View> */}
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 15,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Total Price</Text>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{trs}</Text>
        </View>
        <View style={{ marginHorizontal: 30 }}>
          <PrimaryButton title="CHECKOUT" />
        </View>
      </View>
    </SafeAreaView>
  );
}
const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  cartCard: {
    height: 100,
    elevation: 15,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
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
