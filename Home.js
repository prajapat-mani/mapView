import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, TouchableOpacity, Text, Image, Modal, Dimensions, Button } from 'react-native';
import { Polyline } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import MapView from "react-native-map-clustering";
import QRCodeScanner from 'react-native-qrcode-scanner';
import ChargingIcon from "./Assets/charging.png";
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const initialRegion = {
  latitude: 26.8842613,
  longitude: 75.7434461,
  latitudeDelta: 8.5,
  longitudeDelta: 8.5,
};

const markerData = [
  { latitude: 26.8942613, longitude: 75.7834461, name: 'Station 1', description: 'First station description' },
  { latitude: 26.8842615, longitude: 75.8434461, name: 'Station 2', description: 'Second station description' },
  { latitude: 26.9842613, longitude: 75.7434461, name: 'Station 3', description: 'Third station description' },
  { latitude: 26.7842613, longitude: 75.7434461, name: 'Station 4', description: 'Fourth station description' },
  { latitude: 26.8842613, longitude: 75.6434461, name: 'Station 5', description: 'Fifth station description' },
  { latitude: 26.8842613, longitude: 75.5434461, name: 'Station 6', description: 'Sixth station description' },
  { latitude: 26.6842613, longitude: 75.7434461, name: 'Station 7', description: 'Seventh station description' },
  { latitude: 26.5842613, longitude: 75.5434461, name: 'Station 8', description: 'Eighth station description' },
];

const Home = () => {
  const staticLocation = {
    latitude: 26.8842613,
    longitude: 75.7434461
  };

  const [region, setRegion] = useState(initialRegion);
  const [nearestStation, setNearestStation] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStation, setSelectedStation] = useState(null);
  const [distanceStation, setDistanceStation] = useState([]);
  const [scannerVisible, setScannerVisible] = useState(false);
  const [qrCodeData, setQrCodeData] = useState([]);
  const [firstStation, setFirstStation] = useState(null);
  const [isSelectingSecond, setIsSelectingSecond] = useState(false);
  const [showRoute, setShowRoute] = useState(false);


  const haversine = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Radius of the Earth in km

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in km
  };

  useEffect(() => {
    findNearestStation();
  }, []);

const navigation=useNavigation()


  const findNearestStation = () => {
    let minDistance = Infinity;
    let nearest = null;

    markerData.forEach((station) => {
      const distance = haversine(
        staticLocation.latitude,
        staticLocation.longitude,
        station.latitude,
        station.longitude
      );
      setDistanceStation((prevDistances) => [...prevDistances, distance]);

      if (distance < minDistance) {
        minDistance = distance;
        nearest = station;
      }
    });

    setNearestStation(nearest);
  };

  const handleMarkerPress = (station) => {
    if (isSelectingSecond) {
      const distance = haversine(
        firstStation.latitude,
        firstStation.longitude,
        station.latitude,
        station.longitude
      );
      setSelectedStation({ ...station, distance: distance.toFixed(2) });
      

      // setIsSelectingSecond(false);
    } else {
      setFirstStation(station);
      setSelectedStation({ ...station, distance: null });
    }
    setModalVisible(true);
  };

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

  const onQRCodeScan = (e) => {
    setScannerVisible(false);
    alert(`QR Code Scanned: ${e.data}`);
    setQrCodeData(e.data);
  };

  const anotherStationHandler = () => {
    setIsSelectingSecond(true);
    setModalVisible(false);
  };
  const showRouteHandler=()=>{
    setShowRoute(true)
    setModalVisible(false)
  }
  const clearRoute = () => {
  setFirstStation("")
    setShowRoute(false);
    setIsSelectingSecond(false)
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalView}>
            {selectedStation && (
              <View style={styles.container2}>
                <Text style={styles.title}>{selectedStation.name}</Text>
                <View style={styles.infoContainer}>
                  <Text style={styles.infoLabel}>Description:</Text>
                  <Text style={styles.infoText}>{selectedStation.description}</Text>
                </View>

                {
                  isSelectingSecond===true ?
                    <View style={styles.infoContainer}>
                  
                    <Text style={styles.infoLabel}> Distance:`{firstStation.name}to {selectedStation.name}`</Text>
                    <Text style={styles.infoText}>
                      {selectedStation.distance ? `${selectedStation.distance} km` : 'N/A'}
                    </Text>
                    <TouchableOpacity style={{height:50,width:200,backgroundColor:"orange",justifyContent:"center",alignItems:"center"}} 
                  onPress={()=>navigation.navigate("RouteDirection",{state:firstStation,secondState:selectedStation})}
                    >
                      <Text>Show route</Text>
                    </TouchableOpacity >
                  </View>:<View></View>

                  
                }
              
                <TouchableOpacity
                  style={styles.qrButton}
                  onPress={() => setScannerVisible(true)}
                >
                  <Text style={styles.qrButtonText}>Open QR Code Scanner</Text>
                </TouchableOpacity>
                {!isSelectingSecond && (
                  <TouchableOpacity
                    onPress={anotherStationHandler}
                    style={styles.anotherStationButton}
                  >
                    <Text>Select Another Station</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
        </TouchableOpacity>
      </Modal>

      <Modal
        animationType="slide"
        transparent={false}
        visible={scannerVisible}
        onRequestClose={() => setScannerVisible(false)}
      >
        <QRCodeScanner
          onRead={onQRCodeScan}
          topContent={<Text style={styles.qrTopContent}>Scan the QR Code</Text>}
          bottomContent={
            <TouchableOpacity style={styles.qrCloseButton} onPress={() => setScannerVisible(false)}>
              <Text style={styles.qrCloseButtonText}>Close</Text>
            </TouchableOpacity>
          }
        />
      </Modal>

      <View style={styles.container}>
        
        <MapView
          style={styles.mapStyle}
          region={region}
          onRegionChangeComplete={setRegion}
          customMapStyle={mapStyle}
        >
          <Marker
            coordinate={{
              latitude: staticLocation.latitude,
              longitude: staticLocation.longitude
            }}
            title={'Manish Prajapat'}
            description={'My location'}
          />
          {markerData.map((val, ind) => (
            <Marker
              tracksViewChanges={false}
              key={ind}
              coordinate={{
                latitude: val.latitude,
                longitude: val.longitude,
              }}
              onPress={() => handleMarkerPress(val)}
            >
              {nearestStation && nearestStation.latitude === val.latitude && nearestStation.longitude === val.longitude && (
                <TouchableOpacity>
                  <View style={{ backgroundColor: "white", borderRadius: 10, height: 60, width: 150, justifyContent: "center", alignItems: "center", padding: 5 }}>
                    <Text style={styles.calloutTitle}>{val.name}</Text>
                    <Text style={styles.calloutDescription}>{val.description}</Text>
                  </View>
                  <View style={{ backgroundColor: "white", height: 20, width: 4, alignSelf: "center", marginRight: 50, borderRadius: 20 }} />
                </TouchableOpacity>
              )}
              <Image
                source={ChargingIcon}
                style={{ width: 100, height: 40, resizeMode: "contain" }}
              />
            </Marker>
          ))}
             {/* {showRoute && firstStation && selectedStation && (
            <Polyline
              coordinates={[
                { latitude: firstStation.latitude, longitude: firstStation.longitude },
                { latitude: selectedStation.latitude, longitude: selectedStation.longitude },
              ]}
              strokeColor="#FF0000"
              strokeWidth={3}
            />
          )} */}
        </MapView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={zoomIn} style={styles.zoomButton}>
            <Text style={styles.zoomButtonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={zoomOut} style={styles.zoomButton}>
            <Text style={styles.zoomButtonText}>-</Text>
          </TouchableOpacity>
        </View>
        <Button title='Clear Route' onPress={clearRoute}></Button>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  container2: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  mapStyle: {
    ...StyleSheet.absoluteFillObject,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  infoContainer: {
    marginVertical: 10,
  },
  infoLabel: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  qrButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  qrButtonText: {
    color: 'white',
  },
  anotherStationButton: {
    marginTop: 20,
    backgroundColor: '#DDDDDD',
    padding: 10,
    borderRadius: 10,
  },
  qrTopContent: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  qrCloseButton: {
    padding: 12,
    backgroundColor: '#DDDDDD',
    borderRadius: 10,
    marginTop: 20,
  },
  qrCloseButtonText: {
    fontSize: 16,
    color: 'black',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  zoomButton: {
    backgroundColor: 'white',
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    elevation: 2,
  },
  zoomButtonText: {
    fontSize: 24,
    color: 'black',
  },
  calloutTitle: {
    fontSize: 14,
    fontWeight: "bold"
  },
  calloutDescription: {
    fontSize: 12,
    color: "gray"
  }
});

const mapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8ec3b9"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1a3646"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#64779e"
      }
    ]
  },
  {
    "featureType": "administrative.province",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#334e87"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6f9ba5"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3C7680"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#304a7d"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2c6675"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#255763"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#b0d5ce"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3a4762"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#0e1626"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#4e6d70"
      }
    ]
  }
];

export default Home;
