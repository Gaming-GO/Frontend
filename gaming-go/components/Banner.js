import { Image, View } from "react-native";

export default function Banner({ data }) {
  return (
    <View>
      <Image
        source={data.image}
        style={{ height: 150, width: 100, borderRadius: 10 }}
      />
    </View>
  );
}
