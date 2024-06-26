import React from "react"
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from "react-native"
import { Colors } from "react-native/Libraries/NewAppScreen"
import LocalNotification from "./Notification"
import RemoteNotification from "./RemoteNotification"


function PushNotification(){
  const isDarkMode = useColorScheme() === "dark"

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
          }}>
            <RemoteNotification/>
          <Text> Push Notification!! </Text>
          <Button title={'Click Here'} onPress={LocalNotification} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
export default PushNotification;