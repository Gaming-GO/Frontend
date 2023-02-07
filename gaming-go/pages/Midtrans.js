import { SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
import { useDispatch, useSelector } from 'react-redux';
import { successCheckoutSlebew } from '../store/action/actionCreator';
const baseUrl = 'https://403a-139-192-36-123.ap.ngrok.io';

export default function MidTransScreen({ route, navigation }) {
  //   console.log(route.params.data.midtransToken.redirect_url);
  const url = route.params.data.midtransToken.redirect_url;
  //   console.log('slebew');

  const access_token = useSelector((state) => state.users.access_token);

  const dispatch = useDispatch();

  const successCheckout = () => {
    // console.log('tekelik versi2');
    // fetch(baseUrl + '/pub/checkout', {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     access_token,
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //     // console.log(uriMidtrans);
    //     navigation.navigate('HomeScreen');
    //   });

    dispatch(successCheckoutSlebew(access_token)).then((_) => navigation.navigate('HomeScreen'));
  };
  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <WebView
          source={{ uri: url }}
          onNavigationStateChange={(navState) => {
            const { url } = navState;
            if (url.includes('status_code=200&transaction_status=capture')) {
              //   console.log('terkelikkk');
              successCheckout();
              return;
            }
          }}
        />
      </SafeAreaView>
    </>
  );
}
