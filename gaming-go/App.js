import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './pages/Login';
import Register from './pages/Register';
import HomeScreen from './pages/HomeScreen';
import DetailsScreen from './pages/DetailScreen';
import RoomScreen from './pages/ChatScreen';
import Messaging from './components/Messaging';
import { Provider } from 'react-redux';
import store from './store/index';
import MidTransScreen from './pages/Midtrans';
import History from './pages/History';
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs();

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: 'tomato',
          }}
        >
          <Stack.Screen name="LoginPage" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="RegisterPage" component={Register} options={{ headerShown: false }} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="DetailScreen" component={DetailsScreen} />
          <Stack.Screen name="ChatScreen" component={RoomScreen} />
          <Stack.Screen name="Messaging" component={Messaging} />
          <Stack.Screen name="MidTransScreen" component={MidTransScreen} />
          <Stack.Screen name="History" component={History} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
