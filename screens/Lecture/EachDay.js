
import { StyleSheet, Text, TouchableOpacity, View, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import BottomNavigation from '../../components/Navigation/BottomNavigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from '@react-navigation/native';
import LectureBlock from '../../components/Blocks/LectureBlock';
import {SERVER_URL, SERVER_PORT} from "@env"

export default function EachDay({ route }) {
  const navigation = useNavigation();
  const { day, userEmail } = route.params;
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  //console.log(userEmail)
  
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch(`${SERVER_URL}:${SERVER_PORT}/api/class/${userEmail}`);
        const data = await response.json();
        const filteredLectures = data.filter(lecture => lecture.day === day);
        setLectures(filteredLectures);
      } catch (error) {
        console.error('Error fetching classes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, [userEmail, day]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={1}>
                <AntDesign name="left" size={40} color={"#EEE"}/>
            </TouchableOpacity>
            <Text style={[styles.text, {fontSize: 40, fontWeight: '300'}]}>{day}</Text>
        </View>
        <TouchableOpacity onPress={()=>navigation.navigate("AddLecture", { param: {day, userEmail} })}>
          <AntDesign name="pluscircle" size={35} color={"#EEE"} />
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#EEE" style={{ marginTop: 20 }} />
      ) : (
        <FlatList 
          data={lectures}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <LectureBlock 
              lectureCode={item.lectureCode}
              startTime={item.startTime}
              endTime={item.endTime}
              lectureName={item.lectureName}
              priority={item.priority}
              professor={item.professorName}
              accentColor={item.accentColor}
            />
          )}
        />
      )}
      <BottomNavigation active={"lecture"} />
    </SafeAreaView>
  );
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
    paddingBottom: 16
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
});
