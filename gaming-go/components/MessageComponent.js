import { View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { stylesChat } from "../config/stylesChat";

export default function MessageComponent({ item, currentUser }) {
  const status = item.sender === currentUser;

  return (
    <View>
      <View
        style={
          status
            ? stylesChat.mmessageWrapper
            : [stylesChat.mmessageWrapper, { alignItems: "flex-end" }]
        }
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={
              status
                ? stylesChat.mmessage
                : [
                    stylesChat.mmessage,
                    { backgroundColor: "rgb(194, 243, 194)" },
                  ]
            }
          >
            <Text>{item.message}</Text>
          </View>
        </View>
        <Text style={{ marginLeft: 40 }}>{item.created.slice(11,19)}</Text>
      </View>
    </View>
  );
}
