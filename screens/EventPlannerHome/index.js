import React, { useState, useEffect } from "react"
import {
  Image,
  Alert,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TextInput,
  FlatList,
  ImageBackground,
  ScrollView,
  LogBox
} from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { Button, Input, CustomModal, HomeEventItem } from "../../components"
import { Colors, Typography, Mixins } from "../../styles"
import NavigationHeader from "../../components/NavigationHeader"
import { useNavigation } from "@react-navigation/native"
import {
  getDataStorage,
  setDataStorage,
  clearStorage
} from "../../utils/storage"
import { data } from "../../data"

import { useSelector, useDispatch } from "react-redux"
import { unwrapResult } from "@reduxjs/toolkit"
import { getUser } from "../../services/user"
import { getCategories, getEvents } from "../../services/events"

const { width, height } = Dimensions.get("window")

const EventPlannerHomeScreen = () => {
  LogBox.ignoreLogs(["Warning: ..."]) // Ignore log notification by message
  LogBox.ignoreAllLogs()
  const navigation = useNavigation()
  const [events, setEvents] = useState([])
  const [eventCategories, setEventCategories] = useState([])

  const [searchedEvents, setSearchedEvents] = useState([])

  const [searchValue, setSearchValue] = useState("")
  const [userImage, setUserImage] = useState("")

  useEffect(async () => {
    const events = data.getEvents()
    setEvents(events)
    getUser()
  }, [])

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      let user = global.user
      setUserImage(user?.profile_picture)

      // The screen is focused
      // Call any action
    })

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe
  }, [navigation])

  useEffect(async () => {
    getEventsFromBackend()
    getEventCategories()
  }, [])

  const getEventsFromBackend = async () => {
    let resp = await getEvents()
    console.log("events ", resp.results)
    setEvents(resp.results)
  }

  const getEventCategories = async () => {
    let resp = await getCategories()
    setEventCategories(resp?.results)
  }

  const getUser = async () => {
    const user = await getDataStorage("@user")
    console.log("user ", user)
    if (user) {
      global.user = user
      setUserImage(user?.profile_picture)
    }
  }

  SearchForEvent = value => {
    setSearchValue(value)
    let searchResult = []
    if (value.length >= 3) {
      events.forEach(event => {
        if (event.title.toLowerCase().includes(value.toLowerCase())) {
          searchResult.push(event)
        }
      })

      setSearchedEvents(searchResult)
    } else {
      setSearchedEvents([])
    }
  }

  const CategoryRender = ({ event }) => (
    <TouchableOpacity
      style={{
        height: 190,
        width: 160,
        marginHorizontal: 5,
        flex: 1,
        alignItems: "flex-end"
      }}
      key={event.id}
    >
      <ImageBackground
        imageStyle={{
          borderRadius: 10,
          backgroundColor: Colors.NETURAL_3
        }}
        style={{
          width: "100%",
          height: "100%",
          // height: Mixins.scaleHeight(120),
          borderRadius: 30,
          backgroundColor: Colors.NETURAL_3
        }}
        resizeMode="cover"
        source={{ uri: event.image }}
      >
        <Text
          style={{
            position: "absolute",
            bottom: 20,
            marginLeft: 10,
            marginRight: 20,
            color: Colors.WHITE,
            fontSize: Typography.FONT_SIZE_14,
            fontFamily: Typography.FONT_FAMILY_POPPINS_REGULAR,
            fontWeight: Typography.FONT_WEIGHT_BOLD
          }}
        >
          {event.name}
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.NETURAL_3 }}>


      <ScrollView>
        {events?.length > 0 && (
          <View style={{ marginTop: "5%", marginHorizontal: "5%" }}>
            <Text
              style={{
                fontFamily: Typography.FONT_FAMILY_POPPINS_REGULAR,
                fontSize: Typography.FONT_SIZE_14,
                fontWeight: Typography.FONT_WEIGHT_600,
                color: Colors.PRIMARY_1,
                marginVertical: "5%"
              }}
            >
              My Events
            </Text>

            <View style={{}}>
              <FlatList
                style={
                  {
                    // paddingLeft: Mixins.scaleWidth(10),
                    // marginTop: "5%"
                  }
                }
                contentContainerStyle={{ paddingRight: 10 }}
                numColumns={1}
                data={searchValue.length >= 3 ? searchedEvents : events}
                extraData={searchedEvents}
                renderItem={({ item }) => (
                  <HomeEventItem
                    event={item}
                    onPress={() =>
                      navigation.navigate("EventDetails", { event: item })
                    }
                  />
                )}
                keyExtractor={(item, index) => index}
              />
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default EventPlannerHomeScreen

let styles = StyleSheet.create({
  button: {
    width: 100,
    height: 50,
    backgroundColor: "red"
  }
})