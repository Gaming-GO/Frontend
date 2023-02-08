import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { SafeAreaView, ScrollView, Text, View, StyleSheet, FlatList, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { PrimaryButton } from '../components/button';
import COLORS from '../constants/colors';
import { fetchHistory } from '../store/action/actionCreator';

export default function History({ navigation }) {
  const dispatch = useDispatch();
  const { History } = useSelector((state) => state.users);
  const { access_token } = useSelector((state) => state.users);

  //   console.log(History, '<<SLEBEWWWW');

  useEffect(() => {
    dispatch(fetchHistory(access_token));
  }, []);

  if (History.length == 0) {
    return (
      <>
        <SafeAreaView>
          <Text>Loading...</Text>
        </SafeAreaView>
      </>
    );
  }
  const CartCard = ({ item }) => {
    // console.log(item, 'hehehehe');
    // return;
    var t1 = new Date(item.rentEnd);
    var t2 = new Date(item.rentDate);
    var delta = t2 - t1;
    var abs_delta = Math.abs(delta);
    var abs_delta_in_days = Math.ceil(abs_delta / (1000 * 60 * 60 * 24));

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
          <Text style={{ fontSize: 12 }}>Done</Text>
          <Text style={{ fontSize: 12 }}>
            {item.rentDate.split('T')[0]} - {item.rentEnd.split('T')[0]}
          </Text>
          <Text style={{ fontWeight: 'bold', fontSize: 14, paddingTop: 10 }}>{item.Device.name}</Text>

          {/* <Text style={{ fontSize: 13, color: COLORS.grey }}>{item.ingredients}</Text> */}
        </View>
        <View style={{ marginRight: 20, alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 14 }}>{abs_delta_in_days} Days</Text>
          <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Rp {item.price}</Text>

          {/* <View style={style.actionBtn}>
            <Icon name="remove" size={25} color={COLORS.white} onPress={() => setInterval(item.price - 1)} />
            <Icon name="add" size={25} color={COLORS.white} onPress={() => setInterval(item.price + 1)} />
          </View> */}
        </View>
      </View>
    );
  };

  return (
    <>
      <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
        {/*  */}
        <View style={style.header}>
          <MaterialCommunityIcons name="history" size={28} color={100} />
          <Text style={{ fontSize: 20, fontWeight: 'bold', paddingLeft: 10 }}>History</Text>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80 }}
          // data={data.Details}
          data={History}
          renderItem={({ item }) => <CartCard item={item} />}
          ListFooterComponentStyle={{ paddingHorizontal: 20, marginTop: 20 }}
          keyExtractor={(item) => item.id}
        />

        {/* <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 15,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Total Price</Text>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Rp.0</Text>
          </View>
          <View style={{ marginHorizontal: 30 }}>
            <PrimaryButton title="CHECKOUT" onPress={() => checkout()} />
          </View>
        </View> */}
      </SafeAreaView>
    </>
  );
}
const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    // justifyContent: 'center',
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
    borderWidth: 1,
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
