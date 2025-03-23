import {View, Text, TouchableOpacity, StyleSheet, Linking} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import AntDesign from "react-native-vector-icons/AntDesign"
import {ABOUT_US_LINK, PRIVACY_POLICY_LINK} from "@env"

export default function About () {

  const navigation = useNavigation()

  const aboutLink = ABOUT_US_LINK;
  const privacyPolicyLink = PRIVACY_POLICY_LINK;

  const handleExternalLink = (link) => {
    if (link) {
      Linking.openURL(link).catch(err => console.error("Failed to open URL:", err));
    } else {
      console.warn("No link provided.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={1}>
            <AntDesign name="left" size={40} color={"#EEE"} />
          </TouchableOpacity>
          <Text style={[styles.text, { fontSize: 40, fontWeight: '300' }]}>
           About Routinely 
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.optionView} activeOpacity={0.75} onPress={()=>handleExternalLink(aboutLink)}>
        <Text style={[styles.text, {fontSize: 24, fontWeight: '300'}]}>What is Routinely?</Text>
        <AntDesign name="link" size={25} color={"#EEE"} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionView} activeOpacity={0.75} onPress={()=>handleExternalLink(privacyPolicyLink)}>
        <Text style={[styles.text, {fontSize: 24, fontWeight: '300'}]}>Privacy Policy</Text>
        <AntDesign name="link" size={25} color={"#EEE"} />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#18191A'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 16
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 12,
  },
  text: {
    color: '#EEE',
    fontFamily: 'Outfit'
  },
  optionView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    marginBottom: 20
  }
})
