import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, TouchableOpacity, Text, FlatList,Image, LogBox } from 'react-native';
import { Marker } from 'react-native-maps';
import MapView from "react-native-map-clustering";
import ChargingIcon from "./Assets/charging.png"
import Geolocations from './GeoLocation';

const MapViews = () => {

  const markerData = [
    {
      latitude: 26.8942613, longitude: 75.7834461
    },
    { latitude: 26.8842613, longitude: 75.8434461 },
    { latitude: 26.9842613, longitude: 75.7434461},
    { latitude: 26.7842613, longitude: 75.7434461},
    { latitude: 26.8842613, longitude: 75.6434461},
    { latitude: 26.8842613, longitude: 75.5434461},
    { latitude: 26.6842613, longitude: 75.7434461},
    { latitude: 26.5842613, longitude: 75.5434461 },



  ]






  const initialRegion = {
    latitude: 26.8842613,
    longitude: 75.7434461,
    latitudeDelta: 8.5,
    longitudeDelta: 8.5,
  };

  const [region, setRegion] = useState(initialRegion);

  const zoomIn = () => {
    setRegion({
      ...region,
      latitudeDelta: region.latitudeDelta / 2,
      longitudeDelta: region.longitudeDelta / 2,
    });
  };

  const zoomOut = () => {
    setRegion({
      ...region,
      latitudeDelta: region.latitudeDelta * 2,
      longitudeDelta: region.longitudeDelta * 2,
    });
  };

  const renderMarkerData = (value) => {
    // console.log(value.item.latitude);
    return <Marker
      draggable
      coordinate={{
        latitude: value?.item?.latitude,
        longitude: value?.item?.longitude,
      }}
      onDragEnd={(e) => alert(JSON.stringify(e.nativeEvent.coordinate))}
      title={'Test Marker'}
      description={'This is a description of the marker'}
    />;

  }




  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <MapView
          style={styles.mapStyle}
          region={region}
          onRegionChangeComplete={setRegion}
          customMapStyle={mapStyle}
        >

          {/* <FlatList data={markerData} renderItem={({item})=><Marker
           coordinate={{
            latitude:item?.latitude,
            longitude:item?.longitude,
          }}
          />}/> */}
          <Marker coordinate={{
            latitude:cord,
            longitude:cord2
          }}
          onDragEnd={(e) => alert(JSON.stringify(e.nativeEvent.coordinate))}
                title={'Manish Prajapat'}
                description={'my Location'}
          />

          {
            markerData?.map((val, ind) => {
              return <Marker
              key={ind}
                coordinate={{
                  latitude: val?.latitude,
                  longitude: val?.longitude,
                }}

                onDragEnd={(e) => alert(JSON.stringify(e.nativeEvent.coordinate))}
                title={'Test Marker'}
                description={'This is a description of the marker'}
                
              >

    <Image
      source={ChargingIcon}
      style={{ width: 100, height: 40,resizeMode:"contain" }}  // set your desired width and height
    />
                </Marker>
            })
          }



        </MapView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={zoomIn} style={styles.button}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={zoomOut} style={styles.button}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
        </View>
        
      </View>
    </SafeAreaView>
  );
};


const mapStyle = [
  { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#263c3f' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#6b9a76' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#38414e' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#212a37' }],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#9ca5b3' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#746855' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#1f2835' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#f3d19c' }],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#2f3948' }],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#17263c' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#515c6d' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#17263c' }],
  },
];


export default MapViews

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
  buttonContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'column',
  },
  button: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 4,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
