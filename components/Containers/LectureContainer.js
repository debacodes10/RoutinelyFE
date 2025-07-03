import { ScrollView, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import LectureBlock from '../Blocks/LectureBlock';
import {SERVER_URL, SERVER_PORT} from "@env"
import EmptyList from "./../Fillers/EmptyList"

export default function LectureContainer({ email, today }) { 
  const [userEmail, setUserEmail] = useState("");
  const [day, setDay] = useState("");
  const [classData, setClassData] = useState([]);

  useEffect(() => {
    setUserEmail(email);
    setDay(today);
  }, [email, today]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (userEmail && day) { // Ensure both userEmail and day are set
        try {
          const response = await fetch(`${SERVER_URL}:${SERVER_PORT}/api/class/${userEmail}`);
          const data = await response.json();
          const filteredData = data.filter(lecture => lecture.day === day);
          // console.log("Filtered data:", filteredData);
          setClassData(filteredData);
        } catch (error) {
          console.log('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [userEmail, day]); // Dependency array includes `userEmail` and `day`

  return (
    <ScrollView
      style={styles.containerDimensions}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {classData.map((lecture) => (
        <LectureBlock
          key={lecture._id}
          id={lecture._id}
          lectureCode={lecture.lectureCode}
          startTime={lecture.startTime}
          endTime={lecture.endTime}
          lectureName={lecture.lectureName}
          priority={lecture.priority}
          professor={lecture.professorName}
          accentColor={lecture.accentColor}
        />
      ))}
    {classData.length === 0 && <EmptyList /> }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    rowGap: 12,
    paddingBottom: 48,
  },
  containerDimensions: {
    marginTop: 12,
  },
});
