import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  FlatList,
  Pressable,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import socket from "../config/socket";
import { stylesChat } from "../config/stylesChat";
import {baseUrl} from '../store/action/actionType';
// import AsyncStorage from "@react-native-async-storage/async-storage";

import MessageComponent from "./MessageComponent";

const Messaging = ({ route, navigation }) => {
  const [chatMessages, setChatMessages] = useState([
    {
      id: "1",
      text: "Hello btb, welcome!",
      time: "07:50",
      user: "Tomer",
    },
    {
      id: "2",
      text: "Hi fan, thank you! 😇",
      time: "08:50",
      user: "David",
    },
  ]);
  const [message, setMessage] = useState("");
  const [inMsg, setInMsg] = useState({});
  const [allChat, setAllChat] = useState([]);

  //👇🏻 Access the chatroom's name and id
  const { fromUserId, toUserId } = route.params;

  //👇🏻 This function gets the username saved on AsyncStorage
  //   const getUsername = async () => {
  //     try {
  //       const value = await AsyncStorage.getItem("username");
  //       if (value !== null) {
  //         setUser(value);
  //       }
  //     } catch (e) {
  //       console.error("Error while loading username!");
  //     }
  //   };

  useEffect(() => {
    fetch(baseUrl+ `/message/${fromUserId}/${toUserId}`)
    .then(resp => {
      if(!resp.ok) throw {name:"Failed at messaging"}
      return resp.json()
    })
    .then(data => {
      setAllChat(data);
      setInMsg(data.message);
      console.log(data.roomId, " <<<<<<<<<<<<<<<<<<<<<<<<<<<<ROOM");
      socket.emit("join:room", data.roomId)
    })
    .catch(err => console.log(err.name))
  }, [])

  //👇🏻 Sets the header title to the name chatroom's name
  // useLayoutEffect(() => {
  //   navigation.setOptions({ title: name });
  //   getUsername();
  // }, []);

  /*👇🏻 
        This function gets the time the user sends a message, then 
        logs the username, message, and the timestamp to the console.
     */

        useEffect(() => {

          socket.on("resp:msg", (msg) => {
            // setAllChat([...allChat, {fromUserId,toUserId, message:[...allChat.message, {sender:fromUserId,message:msg,created:(new Date())}]}])
            setInMsg([...inMsg, {sender:msg.from, message:msg, created:(new Date())}])
          })
        }, [inMsg])
  const handleNewMessage = () => {
    const dataMsg = {from:fromUserId, to:toUserId, message}
    socket.emit("chat:msg", {msg:message, room:allChat.roomId})
    fetch(baseUrl+ "/message", {
      method:"POST",
      body:JSON.stringify(dataMsg),
      headers: {
        "Content-Type" : "application/json"
      }
    })
    .then(() => console.log("success"))
    .catch(err => console.log(err));
  };

  return (
    <SafeAreaView style={stylesChat.messagingscreen}>
      <View
        style={[
          stylesChat.messagingscreen,
          { paddingVertical: 15, paddingHorizontal: 10 },
        ]}
      >
        {chatMessages[0] ? (
          <FlatList
            data={inMsg}
            renderItem={({ item,idx }) => (
              <MessageComponent key={idx} item={item} currentUser={allChat.fromUserId} />
            )}
            // keyExtractor={(item) => item.id}
          />
        ) : (
          ""
        )}
      </View>

      <KeyboardAvoidingView>
        <View style={stylesChat.messaginginputContainer}>
          <TextInput
            style={stylesChat.messaginginput}
            onChangeText={(value) => setMessage(value)}
          />
          <Pressable
            style={stylesChat.messagingbuttonContainer}
            onPress={handleNewMessage}
          >
            <View>
              <Text style={{ color: "#f2f0f1", fontSize: 20 }}>SEND</Text>
            </View>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Messaging;
