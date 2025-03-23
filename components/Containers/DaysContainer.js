import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesign from "react-native-vector-icons/AntDesign"
import { useNavigation } from '@react-navigation/native'

const daysOfWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];

export default function DaysContainer({email}) {
  const navigation = useNavigation();
  const [userEmail, setUserEmail] = useState("")

  useEffect(()=>{
    setUserEmail(email)
  },[email])
  //console.log(email)

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {daysOfWeek.map((day, index) => (
        <TouchableOpacity
          key={index}
          style={styles.eachDay}
          activeOpacity={0.65}
          onPress={() => navigation.navigate('EachDay', { day, userEmail })}
        >
          <Text style={[styles.text, { fontSize: 32, fontWeight: '400' }]}>{day}</Text>
          <AntDesign name="rightcircle" size={35} color={"#EEE"} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    rowGap: 24,
    paddingBottom: 64
  },
  eachDay: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1.25,
    borderColor: '#BBB',
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderRadius: 15,
  },
  text: {
    fontFamily: 'Outfit',
    color: '#EEE',
  }
})
