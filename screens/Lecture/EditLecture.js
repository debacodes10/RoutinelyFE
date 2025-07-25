import React, {useState, useEffect} from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"
import AntDesign from "react-native-vector-icons/AntDesign"
import { useNavigation } from "@react-navigation/native"
import {SERVER_URL, SERVER_PORT} from "@env"
import EditLectureForm from "../../components/Forms/EditLectureForm"

export default function EditLecture({ route }) {
  
  const navigation = useNavigation();
  const { 
    id, lectureCode, startTime, endTime, lectureName, priority, professor, accentColor
  } = route.params

  const [classData, setClassData] = useState({})

  const data = {
        id: id,
        lectureCode: lectureCode,
        startTime: startTime,
        endTime: endTime,
        lectureName: lectureName,
        priority: priority,
        professor: professor,
        accentColor: accentColor
      } 

  const fetchData = () => {
    try {
      setClassData(data)
      console.log(classData)
    } catch (error) {
      console.error(error)
    } 
  }

  useEffect(() => {
    fetchData()
  }, []);
 
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={1}>
                <AntDesign name="left" size={40} color={"#EEE"}/>
            </TouchableOpacity>
            <Text style={[styles.text, {fontSize: 40, fontWeight: '300'}]}>Edit Lecture</Text>
        </View>
      </View>
      <EditLectureForm props={classData} classId={id} />
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
