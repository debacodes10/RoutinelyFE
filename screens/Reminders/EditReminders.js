import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import AntDesign from "react-native-vector-icons/AntDesign"
import EditReminderForm from "../../components/Forms/EditReminderForm"
import { SERVER_URL, SERVER_PORT } from "@env"

export default function EditReminders({ route }) {

  const navigation = useNavigation();
  const { id } = route.params

  const [reminderData, setReminderData] = useState({})

  const fetchReminder = async () => {
    try {
      const response = await fetch(`${SERVER_URL}:${SERVER_PORT}/api/reminder/id/${id}`);
      const data = await response.json(); 
      setReminderData(data)
    } catch (error) {
      console.error("Error fetching reminder:", error);
    }
  };

  useEffect(()=>{
    fetchReminder()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={1}>
                <AntDesign name="left" size={40} color={"#EEE"}/>
            </TouchableOpacity>
            <Text style={[styles.text, {fontSize: 40, fontWeight: '300'}]}>Edit Reminder</Text>
        </View>
      </View>
      <EditReminderForm props={reminderData} reminderId={id}/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#18191A',
    paddingHorizontal: 8,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8 
  },
  headerLeft: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: 12,
    alignItems: 'center',
  },
  text: {
    color: '#EEE',
    fontFamily: 'Outfit'
  },
})
