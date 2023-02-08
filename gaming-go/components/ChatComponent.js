import { View, Text, Pressable } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { stylesChat } from "../config/stylesChat";

const ChatComponent = ({ item,mainUserId,userName }) => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState({});
  const [identified,setIdentifier] = useState("");
  // const [dates, setDates] = useState((new Date(item.created)))

  //👇🏻 Retrieves the last message in the array from the item prop
  useLayoutEffect(() => {
    setMessages(item.message[item.message.length - 1]);
  }, []);

  useEffect(() => {
    if(userName.length !== 0) {
      const userIden = userName.find(val => val.id === (item.fromUserId === mainUserId ? item.toUserId : item.fromUserId));
      // console.log(userIden, " idennnnnnnnnn");
      setIdentifier(userIden);
    }
  }, [userName])

  ///👇🏻 Navigates to the Messaging screen
  const handleNavigation = () => {
    navigation.navigate("Messaging", {
      fromUserId:mainUserId,
      toUserId:(item.fromUserId === mainUserId ? item.toUserId : item.fromUserId)
    });
  };

  // console.log(userName, "<<<<<<<<<<<<<<<<<<<<<<<< inside chat comp")

  return (
    <Pressable style={stylesChat.cchat} onPress={handleNavigation}>
      <Ionicons
        name="person-circle-outline"
        size={45}
        color="black"
        style={stylesChat.cavatar}
      />

      <View style={stylesChat.crightContainer}>
        <View>
          <Text style={stylesChat.cusername}>{identified?.email || "No Name"}</Text>

          <Text style={stylesChat.cmessage}>
            {messages?.message ? messages.message : "Tap to start chatting"}
          </Text>
        </View>
        <View>
          <Text style={stylesChat.ctime}>
            {messages?.created ? ((messages.created).split("T")[0]) : "now"}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ChatComponent;
