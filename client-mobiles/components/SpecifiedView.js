import { Platform, SafeAreaView, View } from "react-native";
import { SafeAreaView as AndroidVer } from "react-native-safe-area-context";

const SpecifiedView = ({ children, style }) => {
  return Platform.OS === "ios" ? (
    <SafeAreaView style={style}>{children}</SafeAreaView>
  ) : (
    <AndroidVer style={style}>{children}</AndroidVer>
  );
};

export default SpecifiedView;