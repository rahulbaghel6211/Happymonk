import React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "../Screens/HomeScreen";
import LoginScreen from "../Screens/LoginScreen";
import RegisterScreen from "../Screens/RegisterScreen";
import ALLTripScreen from "../Screens/AllTripScreen";
import UpdatedTrip from "../Screens/UpdateTrip";
import GooglePlacesInput from "../Screens/recommandScreen";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerBackVisible: false, // Set this to hide the back option in the header
          }}
        />
          <Stack.Screen
          name="AllTrip"
          component={ALLTripScreen}
        />
          <Stack.Screen
          name="updateTrip"
          component={UpdatedTrip}
        />
          <Stack.Screen
          name="google"
          component={GooglePlacesInput}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
