import { ScrollView, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import ReminderBlock from '../Blocks/ReminderBlock';
import {SERVER_URL, SERVER_PORT} from "@env"

export default function ReminderContainer({ email }) {
  const [userEmail, setUserEmail] = useState('');
  const [reminderData, setReminderData] = useState([]);

  useEffect(() => {
    setUserEmail(email);
    //console.log(email)
  }, [email]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (userEmail) {
        try {
          const response = await fetch(`${SERVER_URL}:${SERVER_PORT}/api/reminder/${userEmail}`);
          const data = await response.json();

          // Get the current date in DD/MM/YYYY format
          const currentDate = new Date().toLocaleDateString('en-GB'); // 'en-GB' for DD/MM/YYYY format

          // Filter data to only include reminders for the current date
          const filteredData = data.filter(reminder => reminder.date === currentDate);
          
          setReminderData(filteredData);
        } catch (error) {
          console.log('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [userEmail]);

  return (
    <ScrollView
      style={styles.containerDimensions}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {reminderData.map((reminder) => (
        <ReminderBlock
          key={reminder._id} // Use a unique key for each item
          tag={reminder.tag}
          time={reminder.time}
          taskName={reminder.title}
          priority={reminder.priority}
          assignee={reminder.assignee}
          accentColor={reminder.accentColor}
        />
      ))}
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
