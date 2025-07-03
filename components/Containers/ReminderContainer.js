import { ScrollView, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import ReminderBlock from '../Blocks/ReminderBlock';
import {SERVER_URL, SERVER_PORT} from "@env"
import EmptyList from "./../Fillers/EmptyList"

export default function ReminderContainer({ email }) {
  const [userEmail, setUserEmail] = useState('');
  const [reminderData, setReminderData] = useState([]);

  
  useEffect(() => {
  if (email) {
    setUserEmail(email);
    
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${SERVER_URL}:${SERVER_PORT}/api/reminder/${email}`);
        const data = await response.json();

        // Get the current date in DD/MM/YYYY format
        const currentDate = new Date().toLocaleDateString('en-GB');

        // Filter data to only include reminders for the current date
        const filteredData = data.filter(reminder => reminder.date === currentDate);
        
        setReminderData(filteredData);
      } catch (error) {
        console.log('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }
}, [email]);  // Depend only on `email`, no need for `userEmail`

  return (
    <ScrollView
      style={styles.containerDimensions}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {reminderData.map((reminder) => (
        <ReminderBlock
          key={reminder._id} 
          id={reminder._id} 
          tag={reminder.tag}
          time={reminder.time}
          taskName={reminder.title}
          priority={reminder.priority}
          assignee={reminder.assignee}
          accentColor={reminder.accentColor}
        />
      ))}
      {reminderData.length === 0 && <EmptyList />}
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
