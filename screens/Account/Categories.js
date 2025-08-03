import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from '@react-navigation/native';
import CategoryForm from "../../components/Forms/CategoryForm"
import CategoryContainer from "../../components/Containers/CategoryContainer"

export default function Categories () {

  const navigation = useNavigation()

  const fakeData = 
[
  {
    "id": "finance",
    "name": "Finance"
  },
  {
    "id": "projects",
    "name": "Projects"
  },
  {
    "id": "reading",
    "name": "Reading"
  },
  {
    "id": "assignments",
    "name": "Assignments"
  },
  {
    "id": "exams",
    "name": "Exams"
  },
  {
    "id": "events",
    "name": "Events"
  }
]

  return (
   <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={1}>
            <AntDesign name="left" size={40} color={"#EEE"} />
          </TouchableOpacity>
          <Text style={[styles.text, { fontSize: 40, fontWeight: '300' }]}>
            Categories 
          </Text>
        </View>
      </View>     
      <View>
        <CategoryForm userEmail={"sample@mail.com"}/>
        <Text style={[styles.text, {marginVertical: 24, paddingHorizontal: 16, fontSize: 24, fontWeight: '300'}]}>
          Manage
        </Text>
        <CategoryContainer data={fakeData}/>
      </View>
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
