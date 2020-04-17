import * as React from 'react';
import "react-native-gesture-handler";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './screens/Home.js';
import TODO from './screens/TODO.js';

const Stack = createStackNavigator();

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ gestureEnabled: false,headerShown:false }}>
          <Stack.Screen name='Home' component={Home} initalParams={{}} />
          <Stack.Screen name='TODO' component={TODO} initalParams={{}} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

