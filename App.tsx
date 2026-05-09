import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import AskHelpScreen from './src/screens/AskHelpScreen';
import OfferHelpScreen from './src/screens/OfferHelpScreen';
import FeedScreen from './src/screens/FeedScreen';
import FeedDetailsScreen from './src/screens/FeedDetailsScreen';
import MapScreen from './src/screens/MapScreen';
import MapFocusedScreen from './src/screens/MapFocusedScreen';

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

function TabsNavigator() {
  return (
    <Tabs.Navigator screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="Home" component={HomeScreen} />
      <Tabs.Screen name="Feed" component={FeedScreen} />
      <Tabs.Screen name="Mapa" component={MapScreen} />
    </Tabs.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Tabs" component={TabsNavigator} />
        <Stack.Screen name="AskHelp" component={AskHelpScreen} />
        <Stack.Screen name="OfferHelp" component={OfferHelpScreen} />
        <Stack.Screen name="FeedDetails" component={FeedDetailsScreen} />
        <Stack.Screen name="MapFocused" component={MapFocusedScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
