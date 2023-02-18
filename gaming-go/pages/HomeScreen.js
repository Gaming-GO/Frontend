import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeTab from '../components/HomeTab';
import AllTab from '../components/AllTab';
import TransactionTab from '../components/TransactionTab';
import ProfileTab from '../components/ProfileTab';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AddTab from '../components/AddTab';
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
const Tab = createBottomTabNavigator();
// NAMA YANG KEPANJANAGN DIRUBAH DAR DB BIAR ENAK DILIHAT

export default function HomeScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: [
          {
            display: 'flex',
          },
          null,
        ],
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: `#c0c0c0`,
        tabBarStyle: { backgroundColor: '#696969' },
      }}
      tabBarOptions={{
        showLabel: false,
        style: {
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          backgroundColor: '#ffffff',
          borderRadius: 15,
          // ...style.shadow,
          paddingBottom: 5,
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeTab}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="AllTab"
        component={AllTab}
        options={{
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="gamepad-outline" color={color} size={30} />,
        }}
      />
      <Tab.Screen
        name="AddTab"
        component={AddTab}
        options={{
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="plus-outline" color={color} size={30} />,
        }}
      />
      <Tab.Screen
        name="TransactionTab"
        component={TransactionTab}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="ios-wallet-outline" color={color} size={30} />,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileTab}
        options={{
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="account-arrow-right-outline" color={color} size={30} />,
        }}
      />
    </Tab.Navigator>
  );
}

//home all transaction, profile
