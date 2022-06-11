import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import HomeScreen from "../screens/Home"
import TableSelectScreen from "../screens/TableSelect"
import EventDetailsScreen from "../screens/EventDetails"
import TableConfirmScreen from "../screens/TableConfirm"

const Stack = createStackNavigator()

const HomeNavigator = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="TableSelectScreen" component={TableSelectScreen} />
      <Stack.Screen name="EventDetailsScreen" component={EventDetailsScreen} />
      <Stack.Screen name="TableConfrimScreen" component={TableConfirmScreen} />
    </Stack.Navigator>
  )
}

export default HomeNavigator