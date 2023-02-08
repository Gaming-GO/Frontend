import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  FlatList,
  Pressable,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import socket from "../config/socket";
import { stylesChat } from "../config/stylesChat";
import {baseUrl} from '../store/action/actionType';
// import AsyncStorage from "@react-native-async-storage/async-storage";

import MessageComponent from "./MessageComponent";

const Messaging = ({ route, navigation }) => {
  const [message, setMessage] = useState("");
  const [inMsg, setInMsg] = useState({});
  const [scrollRef, setScrollRef] = useState(null);
  const [allChat, setAllChat] = useState([]);

  //👇🏻 Access the chatroom's name and id
  const { fromUserId, toUserId } = route.params;

  function scrollToEnd() {
    setTimeout(() => {
      scrollRef.scrollToEnd();
    }, 400);
  }

  useEffect(() => {
    // console.log("running outside socket")
      socket.on("resp:msg", (msg) => {
        console.log(msg);
        console.log("running inside socket")
        const dates = (new Date()).toISOString();
        const respMsg = {sender:msg.from, message:msg.msg, created:dates};
        console.log(respMsg, "RESP<<<<<<<<<<<<<,")
        // setInMsg([respMsg,...inMsg])/
        setInMsg((prev) => {
          const newS = [...prev];
          newS.push(respMsg)
          return newS
        })        
      })
      return () => {
        socket.off("resp:msg");
      }
    }, [socket])

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

        
  const handleNewMessage = () => {
    const dataMsg = {from:fromUserId, to:toUserId, message}
    socket.emit("chat:msg", {msg:message, room:allChat.roomId,from:fromUserId})
    fetch(baseUrl+ "/message", {
      method:"POST",
      body:JSON.stringify(dataMsg),
      headers: {
        "Content-Type" : "application/json"
      }
    })
    .then(resp => {
      if(!resp.ok) throw ""
      // return resp.json()
    })
    // .then(data => {
    //   console.log((data.message[data.message.length-1]))
    //   setInMsg([...inMsg, (data.message[data.message.length-1])])
    //   console.log(inMsg, " INMSGSSSSSSSSSSSSSS")
    // })
    .catch(err => console.log(err));
    setMessage("");
    scrollToEnd();
  };

  // console.log(inMsg, " INMSGSSSSS");

  return (
    <SafeAreaView style={stylesChat.messagingscreen}>
      <View
        style={[
          stylesChat.messagingscreen,
          { paddingVertical: 15, paddingHorizontal: 10 },
        ]}
      >
        <ScrollView ref={(scrollview) => setScrollRef(scrollview)}>
          {
            (inMsg && Object.keys(inMsg).length !== 0) ? inMsg.map((val,idx) => {
              return <MessageComponent item={val} key={idx} currentUser={allChat.fromUserId}/>
            })
            : <Text>Loading</Text>
          }
        </ScrollView>
        {/* <FlatList
            data={inMsg}
            renderItem={({ item,index }) => (
              <MessageComponent item={item} key={index} currentUser={allChat.fromUserId} />
            )} */}
          {/* /> */}
        {/* {chatMessages[0] ? (
          
        ) : (
          ""
        )} */}
      </View>

      <KeyboardAvoidingView>
        <View style={stylesChat.messaginginputContainer}>
          <TextInput
          value={message}
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
