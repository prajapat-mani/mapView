import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './Home';
import RouteDirection from './RouteDirection';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen
          name="Home"
          component={Home}
        />
        <Stack.Screen component={RouteDirection} name='RouteDirection'/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App