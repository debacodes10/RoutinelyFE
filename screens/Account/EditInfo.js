import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native"
import AntDesign from "react-native-vector-icons/AntDesign"
import UserInfoForm from "../../components/Forms/UserInfoForm"

export default function EditInfo() {

  const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={1}>
            <AntDesign name="left" size={40} color={"#EEE"} />
          </TouchableOpacity>
          <Text style={[styles.text, { fontSize: 40, fontWeight: '300' }]}>
            Edit Info 
          </Text>
        </View>
      </View>
      <UserInfoForm />
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

})
