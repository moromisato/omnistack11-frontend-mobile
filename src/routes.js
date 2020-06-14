import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const AppStack = createStackNavigator()

import Incidents from './screens/Incidents'
import Detail from './screens/Detail'
import { StatusBar } from 'react-native'

export default function Router() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor='#f2f2f2' barStyle='dark-content' />
      <AppStack.Navigator screenOptions={{ headerShown: false }}>
        <AppStack.Screen name="Incidents" component={Incidents} />
        <AppStack.Screen name="Detail" component={Detail} />
      </AppStack.Navigator>
    </NavigationContainer>
  )
}