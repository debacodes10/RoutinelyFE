import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import BottomNavigation from '../../components/Navigation/BottomNavigation';
import DaySelector from '../../components/Selectors/DaySelector';
import { supabase } from './../../libs/supabase';
import AntDesign from 'react-native-vector-icons/AntDesign';
import dayjs from 'dayjs';
import ReminderBlock from '../../components/Blocks/ReminderBlock';
import {SERVER_URL, SERVER_PORT} from "@env"

export default function Reminders() {
  const navigation = useNavigation();

  const [session, setSession] = useState();
  const [reminders, setReminders] = useState([]);
  const [filteredReminders, setFilteredReminders] = useState([]);
  const [selectedDay, setSelectedDay] = useState('Today');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  useEffect(() => {
    const fetchReminders = async () => {
      if (session?.user?.email) {
        try {
          //console.log(session.user.email)
          const response = await fetch(`${SERVER_URL}:${SERVER_PORT}/api/reminder/${session.user.email}`);
          const data = await response.json();
          //console.log(data)
          setReminders(data);
        } catch (error) {
          console.error('Error fetching reminders:', error);
        }
      }
    };

    fetchReminders();
  }, [session]);

  useEffect(() => {
    if (selectedDay === 'All') {
      setFilteredReminders(reminders);
    } else {
      const formattedDay =
        selectedDay === 'Today'
          ? dayjs().format('DD/MM/YYYY')
          : selectedDay === 'Tomorrow'
          ? dayjs().add(1, 'day').format('DD/MM/YYYY')
          : selectedDay + '/2025';
      const filtered = reminders.filter((reminder) => reminder.date == formattedDay);
      setFilteredReminders(filtered);
    }
  }, [selectedDay, reminders]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={1}>
            <AntDesign name="left" size={40} color={'#EEE'} />
          </TouchableOpacity>
          <Text style={[styles.text, { fontSize: 40, fontWeight: '300' }]}>Reminders</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddReminder', { email: session && session.user ? session.user.email : undefined })}
        >
          <AntDesign name="pluscircle" size={35} color={'#EEE'} />
        </TouchableOpacity>
      </View>
      <DaySelector setSelectedDay={setSelectedDay} />
      <FlatList
        data={filteredReminders}
        style={styles.blockContainer}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <ReminderBlock
            id={item._id}
            tag={item.tag}
            time={item.time}
            taskName={item.title}
            priority={item.priority}
            assignee={item.assignee}
            accentColor={item.accentColor}
          />
        )}
      />
      <BottomNavigation active={'reminder'} />
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
    marginBottom: 8,
  },
  headerLeft: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: 12,
    alignItems: 'center',
  },
  text: {
    color: '#EEE',
    fontFamily: 'Outfit',
  },
  blockContainer: {
    paddingVertical: 16,
  }
});
