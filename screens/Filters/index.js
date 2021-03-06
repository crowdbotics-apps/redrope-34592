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
  ScrollView
} from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { Button, Input, CustomModal } from "../../components"
import { Colors, Typography, Mixins } from "../../styles"
import NavigationHeader from "../../components/NavigationHeader"
import { useNavigation } from "@react-navigation/native"
import {
  getDataStorage,
  setDataStorage,
  clearStorage
} from "../../utils/storage"

import { useSelector, useDispatch } from "react-redux"
import { unwrapResult } from "@reduxjs/toolkit"
const { width, height } = Dimensions.get("window")
import { Slider } from "@miblanchard/react-native-slider"
import { applyFilter, resetFilter } from "../../store/custom/Home/home.slice"

const FiltersScreen = () => {
  const navigation = useNavigation()
  const [user, setUser] = useState(global.user)
  const [selectedEvent, setSelectedEvent] = useState(0)
  const [dateTabSelection, setDateTabSelection] = useState(-1)
  const [selectedDuration, setSelectedDuration] = useState(0)
  const [priceRangeValue, setPriceRangeValue] = useState([0, 1000])

  const { hasFilters, filterObj } = useSelector(state => state.home)

  const dispatch = useDispatch()

  const eventTypes = [
    { id: 1, type: "Yacht Parties" },
    { id: 2, type: "Bottle Service" },
    { id: 3, type: "Pool Parties" }
  ]

  useEffect(() => {
    console.log("filter>>>>: ", hasFilters, filterObj)
    if (hasFilters) {
      if (filterObj.today) {
        setDateTabSelection(0)
      } else if (filterObj.tomorrow) {
        setDateTabSelection(1)
      } else if (filterObj.this_week) {
        setDateTabSelection(2)
      }

      setPriceRangeValue([filterObj.min_cost ?? 0, filterObj.max_cost ?? 1000])
      if (filterObj.categories) {
        console.log("Categories>>>>: ", filterObj.categories)
        let index = eventTypes.findIndex(
          item => item.type == filterObj.categories
        )
        console.log("Categories index>>>>: ", index)
        if (index > -1) {
          setSelectedEvent(index + 1)
        }
      }
    } else {
      setDateTabSelection(-1)
      setSelectedEvent(0)
      setPriceRangeValue([0, 1000])
    }
  }, [hasFilters])

  const timeDateSection = () => {
    return (
      <View style={{ margin: "5%" }}>
        <Text style={styles.heading}>{"Time & Date"}</Text>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity
            onPress={() => setDateTabSelection(0)}
            style={[
              dateTabSelection === 0
                ? styles.selectedBoxStyle
                : styles.unselectedBoxStyle,
              {
                borderRadius: 10,
                borderWidth: 1,
                alignItems: "center",
                justifyContent: "center",
                width: "30%"
              }
            ]}
          >
            <Text
              style={[
                dateTabSelection === 0
                  ? styles.selectedTextColor
                  : styles.unselectedTextColor,
                {
                  fontSize: Typography.FONT_SIZE_14,
                  fontFamily: Typography.FONT_FAMILY_POPPINS_REGULAR
                }
              ]}
            >
              {"Today"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setDateTabSelection(1)}
            style={[
              dateTabSelection === 1
                ? styles.selectedBoxStyle
                : styles.unselectedBoxStyle,
              {
                borderRadius: 10,
                borderWidth: 1,
                alignItems: "center",
                justifyContent: "center",
                width: "30%"
              }
            ]}
          >
            <Text
              style={[
                dateTabSelection === 1
                  ? styles.selectedTextColor
                  : styles.unselectedTextColor,
                {
                  marginVertical: "10%",
                  fontSize: Typography.FONT_SIZE_14,
                  fontFamily: Typography.FONT_FAMILY_POPPINS_REGULAR
                }
              ]}
            >
              {"Tomorrow"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setDateTabSelection(2)}
            style={[
              dateTabSelection === 2
                ? styles.selectedBoxStyle
                : styles.unselectedBoxStyle,
              {
                borderRadius: 10,
                borderWidth: 1,
                alignItems: "center",
                justifyContent: "center",
                width: "30%"
              }
            ]}
          >
            <Text
              style={[
                dateTabSelection === 2
                  ? styles.selectedTextColor
                  : styles.unselectedTextColor,
                {
                  marginHorizontal: "3%",
                  //   marginVertical: "10%",
                  fontSize: Typography.FONT_SIZE_14,
                  fontFamily: Typography.FONT_FAMILY_POPPINS_REGULAR
                }
              ]}
            >
              {"This week"}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => setDateTabSelection(0)}
          style={[
            styles.unselectedBoxStyle,
            {
              marginTop: "5%",
              borderRadius: 10,
              borderWidth: 1,
              alignItems: "center",
              flex: 1,
              flexDirection: "row"
            }
          ]}
        >
          <Image
            source={require("../../assets/dashboard/calendar-off.png")}
            style={{ margin: "3%", width: 25, height: 25 }}
          />
          <Text
            style={{
              fontSize: Typography.FONT_SIZE_16,
              fontFamily: Typography.FONT_FAMILY_POPPINS_REGULAR,
              marginVertical: "7%",
              color: Colors.GREY,
              flex: 1
            }}
          >
            Choose from calender
          </Text>

          <Text
            style={{
              fontSize: Typography.FONT_SIZE_24,
              fontFamily: Typography.FONT_FAMILY_POPPINS_REGULAR,
              marginRight: "5%",
              color: Colors.GREY
            }}
          >
            {">"}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  const locationSection = () => {
    return (
      <View style={{ marginHorizontal: "5%", maginBottom: "5%" }}>
        <Text style={styles.heading}>{"Location"}</Text>

        <TouchableOpacity
          onPress={() => setDateTabSelection(0)}
          style={[
            styles.unselectedBoxStyle,
            {
              borderRadius: 10,
              borderWidth: 1,
              alignItems: "center",
              flex: 1,
              flexDirection: "row"
            }
          ]}
        >
          <Image
            source={require("../../assets/dashboard/location-filled.png")}
            style={{ margin: "3%", width: 25, height: 25 }}
          />
          <Text
            style={{
              fontSize: Typography.FONT_SIZE_16,
              fontFamily: Typography.FONT_FAMILY_POPPINS_REGULAR,
              marginVertical: "7%",
              color: Colors.GREY,
              flex: 1
            }}
          >
            Choose location
          </Text>

          <Text
            style={{
              fontSize: Typography.FONT_SIZE_24,
              fontFamily: Typography.FONT_FAMILY_POPPINS_REGULAR,
              marginRight: "5%",
              color: Colors.GREY
            }}
          >
            {">"}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  const durationSection = () => {
    return (
      <View style={{ margin: "5%" }}>
        <Text style={styles.heading}>{"Duration"}</Text>

        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <TouchableOpacity
            onPress={() => setSelectedDuration(0)}
            style={[
              selectedDuration === 0
                ? styles.selectedBoxStyle
                : styles.unselectedBoxStyle,
              {
                borderRadius: 10,
                borderWidth: 1,
                alignItems: "center",
                justifyContent: "center",
                width: "45%"
              }
            ]}
          >
            <Text
              style={[
                selectedDuration === 0
                  ? styles.selectedTextColor
                  : styles.unselectedTextColor,
                {
                  fontSize: Typography.FONT_SIZE_14,
                  fontFamily: Typography.FONT_FAMILY_POPPINS_REGULAR
                }
              ]}
            >
              {"Half Day(4 hours)"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setSelectedDuration(1)}
            style={[
              selectedDuration === 1
                ? styles.selectedBoxStyle
                : styles.unselectedBoxStyle,
              {
                borderRadius: 10,
                borderWidth: 1,
                alignItems: "center",
                justifyContent: "center",
                width: "45%"
              }
            ]}
          >
            <Text
              style={[
                selectedDuration === 1
                  ? styles.selectedTextColor
                  : styles.unselectedTextColor,
                {
                  marginVertical: "10%",
                  fontSize: Typography.FONT_SIZE_14,
                  fontFamily: Typography.FONT_FAMILY_POPPINS_REGULAR
                }
              ]}
            >
              {"Full Day (8 Hours)"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const lengthSection = () => {}

  let thumbIndex = -1

  return (
    <SafeAreaView style={[styles.flex1, { backgroundColor: Colors.NETURAL_3 }]}>
      <NavigationHeader></NavigationHeader>
      <ScrollView style={{}} contentContainerStyle={{}}>
        <View style={{ flexDirection: "row", marginHorizontal: "5%" }}>
          <TouchableOpacity
            onPress={() => setSelectedEvent(1)}
            style={[
              selectedEvent === eventTypes[0].id
                ? styles.selectedBoxStyle
                : styles.unselectedBoxStyle,
              {
                borderRadius: 10,
                marginTop: "10%",
                borderWidth: 1,
                alignItems: "center",
                justifyContent: "center"
              }
            ]}
          >
            <Text
              style={[
                selectedEvent === eventTypes[0].id
                  ? styles.selectedTextColor
                  : styles.unselectedTextColor,
                {
                  marginHorizontal: "10%",
                  marginVertical: "10%",
                  fontSize: Typography.FONT_SIZE_14,
                  fontFamily: Typography.FONT_FAMILY_POPPINS_REGULAR
                }
              ]}
            >
              {eventTypes[0].type}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setSelectedEvent(2)}
            style={[
              selectedEvent === eventTypes[1].id
                ? styles.selectedBoxStyle
                : styles.unselectedBoxStyle,
              {
                borderRadius: 10,
                marginLeft: "3%",
                marginTop: "10%",
                flex: 1,
                borderWidth: 1,
                alignItems: "center",
                justifyContent: "center"
              }
            ]}
          >
            <Text
              style={[
                selectedEvent === eventTypes[1].id
                  ? styles.selectedTextColor
                  : styles.unselectedTextColor,
                {
                  marginHorizontal: "10%",
                  marginVertical: "10%",
                  fontSize: Typography.FONT_SIZE_14,
                  fontFamily: Typography.FONT_FAMILY_POPPINS_REGULAR
                }
              ]}
            >
              {eventTypes[1].type}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => setSelectedEvent(3)}
          style={[
            selectedEvent === eventTypes[2].id
              ? styles.selectedBoxStyle
              : styles.unselectedBoxStyle,
            {
              borderRadius: 10,
              marginTop: "3%",
              marginHorizontal: "5%",
              flex: 1,
              borderWidth: 1,
              alignItems: "center",
              justifyContent: "center"
            }
          ]}
        >
          <Text
            style={[
              selectedEvent === eventTypes[2].id
                ? styles.selectedTextColor
                : styles.unselectedTextColor,
              {
                marginHorizontal: "10%",
                marginVertical: "5%",
                fontSize: Typography.FONT_SIZE_14,
                fontFamily: Typography.FONT_FAMILY_POPPINS_REGULAR
              }
            ]}
          >
            {eventTypes[2].type}
          </Text>
        </TouchableOpacity>

        {timeDateSection()}
        {locationSection()}
        {selectedEvent === 1 && durationSection()}
        {selectedEvent === 1 && lengthSection()}

        <Text
          style={[
            styles.heading,
            { marginHorizontal: "5%", marginTop: "5%", marginBottom: 0 }
          ]}
        >
          {"Select price Range"}
        </Text>

        <View
          style={{
            flex: 1,
            width: "90%",
            marginVertical: "5%",
            alignSelf: "center"
          }}
        >
          <Slider
            step={1}
            maximumTrackTintColor={Colors.GREY}
            thumbTintColor={Colors.PRIMARY_1}
            animationType={"timing"}
            thumbTouchSize={{ width: 40, height: 40 }}
            minimumTrackTintColor={Colors.PRIMARY_1}
            containerStyle={{ height: "100%", width: "100%", flex: 1 }}
            value={priceRangeValue}
            maximumValue={1000}
            minimumValue={0}
            onValueChange={value => {
              setPriceRangeValue(value)
            }}
            renderAboveThumbComponent={index => {
              console.log("index ", index)
              return null
            }}
            renderThumbComponent={() => {
              thumbIndex++
              if (thumbIndex > 1) thumbIndex = 0
              return (
                <View
                  style={{
                    borderWidth: 1,
                    borderRadius: 20,
                    borderColor: Colors.PRIMARY_1,
                    backgroundColor: Colors.NETURAL_3
                  }}
                >
                  <Text
                    style={{
                      margin: 10,
                      color: Colors.PRIMARY_1,
                      fontSize: Typography.FONT_SIZE_18,
                      fontWeight: Typography.FONT_WEIGHT_BOLD
                    }}
                  >
                    {`$${priceRangeValue[thumbIndex]}`}
                  </Text>
                </View>
              )
            }}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            marginVertical: "5%",
            marginBottom: "30%"
          }}
        >
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: Colors.BUTTON_RED,
              borderRadius: 10,
              flex: 1,
              marginHorizontal: 15
            }}
            onPress={() => {
              dispatch(resetFilter())
            }}
          >
            <Text
              style={{
                color: Colors.WHITE,
                fontSize: Typography.FONT_SIZE_14,
                fontFamily: Typography.FONT_FAMILY_POPPINS_MEDIUM,
                margin: 15,
                textAlign: "center",
                fontWeight: Typography.FONT_WEIGHT_BOLD
              }}
            >
              RESET
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: Colors.BUTTON_RED,
              backgroundColor: Colors.BUTTON_RED,
              borderRadius: 10,
              flex: 1,
              marginHorizontal: 15
            }}
            onPress={async () => {
              let params = {}
              if (dateTabSelection == 0) {
                params.today = true
              } else if (dateTabSelection == 1) {
                params.tomorrow = true
              } else if (dateTabSelection == 2) {
                params.this_week = true
              }
              params.min_cost = priceRangeValue[0]
              params.max_cost = priceRangeValue[1]
              if (selectedEvent > 0) {
                params.categories = eventTypes[selectedEvent - 1].type
              }
              dispatch(applyFilter(params))
              navigation.goBack()
            }}
          >
            <Text
              style={{
                color: Colors.WHITE,
                fontSize: Typography.FONT_SIZE_14,
                fontFamily: Typography.FONT_FAMILY_POPPINS_MEDIUM,
                margin: 15,
                textAlign: "center",
                fontWeight: Typography.FONT_WEIGHT_BOLD
              }}
            >
              APPLY
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default FiltersScreen

let styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center"
  },
  flex1: {
    flex: 1
  },

  selectedBoxStyle: {
    backgroundColor: "#3f3720",
    borderColor: Colors.PRIMARY_1
  },
  unselectedBoxStyle: {
    borderColor: Colors.BORDER
  },
  selectedTextColor: {
    color: Colors.PRIMARY_1,
    fontWeight: Typography.FONT_WEIGHT_BOLD
  },
  unselectedTextColor: {
    color: Colors.WHITE,
    fontWeight: Typography.FONT_WEIGHT_400
  },
  heading: {
    marginVertical: "5%",
    fontWeight: Typography.FONT_WEIGHT_600,
    color: Colors.PRIMARY_1,
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: Typography.FONT_FAMILY_POPPINS_REGULAR
  }
})
