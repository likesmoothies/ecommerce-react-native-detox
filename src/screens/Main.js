import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from './Home/HomeScreen';

const Drawer = createDrawerNavigator();

const Main = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        swipeEdgeWidth: 0,
        swipeEnabled: false,
      }}>
      <Drawer.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
};

export default Main;
