import { ScrollView, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import NoteBlock from '../Blocks/NoteBlock';
import {SERVER_URL, SERVER_PORT} from "@env"

export default function NoteContainer({ email }) {

  const [userEmail, setUserEmail] = useState("");
  const [noteData, setNoteData] = useState([]);

  useEffect(() => {
    setUserEmail(email);
  }, [email]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (userEmail) {
        try {
          const response = await fetch(`${SERVER_URL}:${SERVER_PORT}/api/note/${userEmail}`);
          const data = await response.json();
          console.log(data)
          setNoteData(data);
        } catch (error) {
          console.log('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [userEmail]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {noteData.map((note) => (
        <NoteBlock 
          key={note._id}
          title={note.title}
          tag={note.tags}
          body={note.description}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    rowGap: 20,
    paddingBottom: 56,
  },
});
