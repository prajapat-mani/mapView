// Import React
import React from 'react';
// Import required components
import {SafeAreaView, StyleSheet, View} from 'react-native';
// Import Map and Marker
import MapView, {Marker} from 'react-native-maps';
import { Polyline } from 'react-native-maps';
import { Image } from 'react-native';
import ChargingIcon from "./Assets/charging.png";

const App = ({route}) => {
    const firstStation=route.params.state
    secondStation=route.params.secondState
    console.log(firstStation);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <MapView
          style={styles.mapStyle}
          const initialRegion = {{
            latitude: 26.8842613,
            longitude: 75.7434461,
            latitudeDelta: 8.5,
            longitudeDelta: 8.5,
          }}
          customMapStyle={mapStyle}>
          <Marker
            draggable
            coordinate={{
              latitude: firstStation.latitude,
              longitude:firstStation.longitude,
            }}>
                 <Image
                source={ChargingIcon}
                style={{ width: 100, height: 40, resizeMode: "contain" }}
              />
            </Marker>
           <Marker
            draggable
            coordinate={{
              latitude: secondStation.latitude,
              longitude:secondStation.longitude,
            }}
            >
                 <Image
                source={ChargingIcon}
                style={{ width: 100, height: 40, resizeMode: "contain" }}
              />
            </Marker>

<Polyline
              coordinates={[
                { latitude:firstStation.latitude , longitude:firstStation.longitude},
                { latitude:  secondStation.latitude, longitude: secondStation.longitude },
              ]}
              strokeColor="#FF0000"
              strokeWidth={3}
            />
        </MapView>
      </View>
    </SafeAreaView>
  );
};
export default App;
const mapStyle = [
  {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
  {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
  {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{color: '#263c3f'}],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{color: '#6b9a76'}],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{color: '#38414e'}],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{color: '#212a37'}],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{color: '#9ca5b3'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{color: '#746855'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{color: '#1f2835'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{color: '#f3d19c'}],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{color: '#2f3948'}],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{color: '#17263c'}],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{color: '#515c6d'}],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{color: '#17263c'}],
  },
];
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});