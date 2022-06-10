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
  TextInput
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

const MyBookingsScreen = () => {
  const navigation = useNavigation()
  const [searchValue, setSearchValue] = useState("")

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.NETURAL_3 }}>
        <TouchableOpacity style={{ alignSelf: "flex-end", marginRight: "5%" }}>
        <Image
          style={{ width: 30, height: 30, borderRadius: 1000 }}
          source={require("../../assets/images/userImage.png")}
        />
      </TouchableOpacity>

      <View
        style={{
          flexDirection: "row",
          borderRadius: 10,
          marginHorizontal: "5%",
          backgroundColor: Colors.NETURAL_4,
          marginTop: "5%"
        }}
      >
        <TouchableOpacity>
          <Image
            style={{ width: 24, height: 24, margin: 15 }}
            source={require("../../assets/dashboard/search-on.png")}
          />
        </TouchableOpacity>

        <TextInput
          style={{
            color: Colors.WHITE,

            flex: 1,
            height: "100%",
            fontSize: Typography.FONT_SIZE_16,
            fontWeight: Typography.FONT_WEIGHT_REGULAR,
            fontFamily: Typography.FONT_FAMILY_POPPINS_LIGHT
          }}
          placeholder={"Search my events"}
          placeholderTextColor={Colors.NETURAL_2}
          value={searchValue}
          onChangeText={value => setSearchValue(value)}
        />
      </View>
    </SafeAreaView>
  )
}

export default MyBookingsScreen
