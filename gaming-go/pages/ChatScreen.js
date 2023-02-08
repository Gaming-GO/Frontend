// import { SafeAreaView, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { View, Text, Pressable, SafeAreaView, FlatList } from "react-native";
import { Feather } from "@expo/vector-icons";
import ChatComponent from "../components/ChatComponent";
import { stylesChat } from "../config/stylesChat";
// import { GiftedChat } from "react-native-gifted-chat";
import {baseUrl} from '../store/action/actionType';

export default function RoomScreen() {
  const [listUser, setListUser] = useState([])
  const [currentUser, setCurrentUser] = useState(0);  
  const [allUsers, setAllUsers] = useState([]);



  useEffect(() => {
    fetch(baseUrl + "/pub/user/0", {
      headers: {
        "Content-Type": "application/json",
        access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjc1ODY4MzYzfQ.jVuRLVRTYJXxJuaNRdobjnY5YvKXahW15rcMnNHgtE8"
      }
    })
    .then(resp => {
      if(!resp.ok) throw {name:"Failed here", status:resp.status}
      return resp.json()
    })
    .then(data => {
      setCurrentUser(data.id)
      return fetch(baseUrl + `/message/${data.id}`)
    })
    .then(resp => {
      if(!resp.ok) throw {name:"Failed here3"}
      return resp.json()
    })
    .then(data => {
      setListUser(data)
      return fetch(baseUrl + "/pub/users")
    })
    .then(resp => {
      if(!resp.ok) throw {name:"Failed on username"}
      return resp.json()
    })
    .then(data => {
      setAllUsers(data);
    })
    .catch(err => console.log(err))
  }, [])
  //   const [messages, setMessages] = useState([
  //     /**
  //      * Mock message data
  //      */
  //     // example of system message
  //     {
  //       _id: 0,
  //       text: "New room created.",
  //       createdAt: new Date().getTime(),
  //       system: true,
  //     },
  //     // example of chat message
  //     {
  //       _id: 1,
  //       text: "Henlo!",
  //       createdAt: new Date().getTime(),
  //       user: {
  //         _id: 2,
  //         name: "Test User",
  //       },
  //     },
  //   ]);

  //   // helper method that is sends a message
  //   function handleSend(newMessage = []) {
  //     setMessages(GiftedChat.append(messages, newMessage));
  //   }
  const rooms = [
    {
      id: "1",
      name: "yasser alifanno",
      messages: [
        {
          id: "1a",
          text: "Hello guys, welcome!",
          time: "07:50",
          user: "Tomer",
        },
        {
          id: "1b",
          text: "Hi Tomer, thank you! 😇",
          time: "08:50",
          user: "David",
        },
      ],
    },
    {
      id: "2",
      name: "Nando Np",
      messages: [
        {
          id: "2a",
          text: "Guys, who's awake? 🙏🏽",
          time: "12:50",
          user: "Team Leader",
        },
        {
          id: "2b",
          text: "What's up? 🧑🏻‍💻",
          time: "03:50",
          user: "Victoria",
        },
      ],
    },
  ];
  return (
    // <SafeAreaView>
    //   <Text>ROOM</Text>
    //   <GiftedChat
    //     messages={messages}
    //     onSend={(newMessage) => handleSend(newMessage)}
    //     user={{ _id: 1 }}
    //   />
    // </SafeAreaView>
    <SafeAreaView style={stylesChat.chatscreen}>
      <View style={stylesChat.chattopContainer}>
        <View style={stylesChat.chatheader}>
          <Text style={stylesChat.chatheading}>Chats</Text>

          {/* 👇🏻 Logs "ButtonPressed" to the console when the icon is clicked */}
        </View>
      </View>

      <View style={stylesChat.chatlistContainer}>
        {rooms.length > 0 ? (
          <FlatList
            data={listUser}
            renderItem={({ item }) => <ChatComponent item={item} mainUserId={currentUser} userName={allUsers}/>}
            keyExtractor={(item) => item._id}
          />
        ) : (
          <View style={stylesChat.chatemptyContainer}>
            <Text style={stylesChat.chatemptyText}>No rooms created!</Text>
            <Text>Click the icon above to create a Chat room</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
