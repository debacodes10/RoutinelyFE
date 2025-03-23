import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import dayjs from 'dayjs';

export default function DaySelector({ setSelectedDay }) {
  const [selectedDay, setLocalSelectedDay] = useState('Today');
  const [days, setDays] = useState([]);

  useEffect(() => {
    const generateDays = () => {
      const daysArray = ['All'];
      for (let i = 0; i < 10; i++) {
        const day = dayjs().add(i, 'day');
        daysArray.push(day);
      }
      setDays(daysArray);
    };
    generateDays();
  }, []);

  const getDayLabel = (day) => {
    if (day === 'All') return 'All';
    if (day.isSame(dayjs(), 'day')) return 'Today';
    if (day.isSame(dayjs().add(1, 'day'), 'day')) return 'Tomorrow';
    return day.format('DD/MM');
  };

  const handleDayPress = (day) => {
    const label = getDayLabel(day);
    setLocalSelectedDay(label);
    setSelectedDay(label);
  };

  return (
    <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.container}>
        {days.map((day, index) => (
            <TouchableOpacity
            key={index}
            style={[styles.eachDay, selectedDay === getDayLabel(day) && styles.selectedDay]}
            onPress={() => handleDayPress(day)}
            >
            <Text style={[styles.text, selectedDay === getDayLabel(day) && styles.selectedText]}>
                {getDayLabel(day)}
            </Text>
            </TouchableOpacity>
        ))}
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#18191A',
    columnGap: 10,
  },
  eachDay: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#333',
  },
  selectedDay: {
    backgroundColor: '#EEE',
  },
  text: {
    color: '#EEE',
    fontSize: 18,
    fontFamily: 'Outfit',
    fontWeight: '500',
  },
  selectedText: {
    color: '#18191A',
  },
});
