import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import OptionModal from './../Selectors/OptionModal';
import { useNavigation } from "@react-navigation/native"
import {SERVER_URL, SERVER_PORT} from "@env"

export default function LectureForm({day, email}) {
  
  const navigation = useNavigation()
  
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [profName, setProfName] = useState('');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('11:30');
  const [priority, setPriority] = useState('High');
  const [color, setColor] = useState('Green');

  const [priorityModalVisible, setPriorityModalVisible] = useState(false);
  const [colorModalVisible, setColorModalVisible] = useState(false);

  const [isStartTimePickerVisible, setStartTimePickerVisible] = useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisible] = useState(false);

  const priorityOptions = [
    { label: 'High', value: 'High', color: '#B82132' },
    { label: 'Medium', value: 'Medium', color: '#27667B' },
    { label: 'Low', value: 'Low', color: '#FFB22C' },
  ];

  const colorOptions = [
    { label: 'Orange', value: 'Orange', color: '#E25E3E' },
    { label: 'Green', value: 'Green', color: '#006769' },
    { label: 'Blue', value: 'Blue', color: '#1679AB' },
  ];

  const formatTime = (date) => {
    return date.toTimeString().slice(0, 5);
  };

  const handleConfirmStartTime = (date) => {
    setStartTime(formatTime(date));
    setStartTimePickerVisible(false);
  };

  const handleConfirmEndTime = (date) => {
    setEndTime(formatTime(date));
    setEndTimePickerVisible(false);
  };

  const handleSubmit = async() => {
    const selectedColor = colorOptions.find(o => o.value === color)?.color;
    const data = {
      day: day,
      userEmail: email,
      lectureName: title,
      lectureCode: code,
      professorName: profName,
      startTime: startTime,
      endTime: endTime,
      priority: priority,
      accentColor: selectedColor,
    }
    console.log(data)
    try {
      const response = await fetch(`${SERVER_URL}:${SERVER_PORT}/api/class/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      if(response.ok) {
        Alert.alert('Success', 'Class registered successfully!');
        navigation.goBack()
      } else {
        Alert.alert('Failed', result.message || 'Something went wrong');
      }
    } catch (error) {
      Alert.alert('Failed', 'Network error');
    }
  }

  return (
    <View style={styles.container}>
      <View style={{ rowGap: 24 }}>
        <View style={styles.eachInput}>
          <Text style={[styles.text, { fontSize: 24 }]}>Lec. Name :</Text>
          <TextInput
            style={[styles.text, { fontSize: 22 }]}
            value={title}
            onChangeText={setTitle}
            placeholder="Artificial Intelligence"
          />
        </View>

        <View style={styles.eachInput}>
          <Text style={[styles.text, { fontSize: 24 }]}>Lec. Code :</Text>
          <TextInput
            style={[styles.text, { fontSize: 22 }]}
            value={code}
            onChangeText={setCode}
            placeholder="21CSC301J"
          />
        </View>

        <View style={styles.eachInput}>
          <Text style={[styles.text, { fontSize: 24 }]}>Prof. Name :</Text>
          <TextInput
            style={[styles.text, { fontSize: 22 }]}
            value={profName}
            onChangeText={setProfName}
            placeholder="Dr. H. Christus"
          />
        </View>

        <TouchableOpacity style={styles.eachInput} onPress={() => setStartTimePickerVisible(true)}>
          <Text style={[styles.text, { fontSize: 24 }]}>Start Time :</Text>
          <Text style={[styles.text, { fontSize: 22 }]}>{startTime}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.eachInput} onPress={() => setEndTimePickerVisible(true)}>
          <Text style={[styles.text, { fontSize: 24 }]}>End Time :</Text>
          <Text style={[styles.text, { fontSize: 22 }]}>{endTime}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.eachInput} onPress={() => setPriorityModalVisible(true)}>
          <Text style={[styles.text, { fontSize: 24 }]}>Priority :</Text>
          <Text style={[styles.text, { fontSize: 22, color: priorityOptions.find(o => o.value === priority)?.color }]}> {priority}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.eachInput} onPress={() => setColorModalVisible(true)}>
          <Text style={[styles.text, { fontSize: 24 }]}>Accent Color:</Text>
          <Text style={[styles.text, { fontSize: 22, color: colorOptions.find(o => o.value === color)?.color }]}>{color}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.saveBtn} onPress={handleSubmit}>
        <Text style={[styles.text, { fontSize: 24, fontWeight: '400' }]}>Save</Text>
      </TouchableOpacity>

      <OptionModal
        visible={priorityModalVisible}
        onClose={() => setPriorityModalVisible(false)}
        options={priorityOptions}
        onSelect={(value) => setPriority(value)}
      />

      <OptionModal
        visible={colorModalVisible}
        onClose={() => setColorModalVisible(false)}
        options={colorOptions}
        onSelect={(value) => setColor(value)}
      />

      <DateTimePickerModal
        isVisible={isStartTimePickerVisible}
        mode="time"
        onConfirm={handleConfirmStartTime}
        onCancel={() => setStartTimePickerVisible(false)}
      />

      <DateTimePickerModal
        isVisible={isEndTimePickerVisible}
        mode="time"
        onConfirm={handleConfirmEndTime}
        onCancel={() => setEndTimePickerVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 16,
    height: '100%',
  },
  eachInput: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  text: {
    color: '#EEE',
    fontFamily: 'Outfit',
  },
  saveBtn: {
    marginTop: 24,
    backgroundColor: '#379777',
    width: '100%',
    alignItems: 'center',
    borderRadius: 25,
    paddingVertical: 6,
  },
});
