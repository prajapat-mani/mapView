import React, { useEffect, useState } from 'react';
import { View, Text, Alert } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { request, PERMISSIONS, check, RESULTS } from 'react-native-permissions';

const Geolocations = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    requestPermission();
  }, []);

  const requestPermission = async () => {
    let permission;
    if (Platform.OS === 'ios') {
      permission = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
    } else {
      permission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
    }

    try {
      const result = await request(permission);
      if (result === RESULTS.GRANTED) {
        getCurrentLocation();
      } else {
        Alert.alert("Permission Denied", "Location permission is required to fetch the location.");
      }
    } catch (err) {
      console.error('Permission request error:', err);
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        setLocation(position);
      },
      (error) => {
        console.error("Geolocation error:", error);
        Alert.alert("Error", "Could not fetch location. Please try again.");
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      
      {location ? (
        <View>
          <Text>
            Latitude: {location.coords.latitude}, Longitude: {location.coords.longitude}
          </Text>
        </View>
      ) : (
        <Text>No location data available</Text>
      )}
    </View>
  );
};

export default Geolocations;
