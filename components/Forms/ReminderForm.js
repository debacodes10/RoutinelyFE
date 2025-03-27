import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Platform, Alert } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { format } from 'date-fns';
import OptionModal from './../Selectors/OptionModal';
import { useNavigation } from "@react-navigation/native"
import {SERVER_PORT, SERVER_URL} from "@env"

export default function ReminderForm({email}) {

  const navigation = useNavigation()

  const [title, setTitle] = useState('');
  const [tag, setTag] = useState('');
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [inputHeight, setInputHeight] = useState(22 * 7);
  const [priority, setPriority] = useState('High');
  const [assignee, setAssignee] = useState('');

  const [priorityModalVisible, setPriorityModalVisible] = useState(false);
  const [colorModalVisible, setColorModalVisible] = useState(false);

  const [time, setTime] = useState('07:00');
  const [color, setColor] = useState('Green');

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const showTimePicker = () => {
    setTimePickerVisible(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisible(false);
  };

  const handleConfirmDate = (selectedDate) => {
    setDate(selectedDate);
    hideDatePicker();
  };

  const handleTimeConfirm = (selectedTime) => {
    const formattedTime = format(selectedTime, 'HH:mm');
    setTime(formattedTime);
    hideTimePicker();
  };

  const priorityOptions = [
    { label: 'High', value: 'High', color: '#B82132' },
    { label: 'Medium', value: 'Medium', color: '#27667B' },
    { label: 'Low', value: 'Low', color: '#FFB22C' },
  ] ;

  const colorOptions = [
    { label: 'Orange', value: 'Orange', color: '#E25E3E' },
    { label: 'Green', value: 'Green', color: '#006769' },
    { label: 'Blue', value: 'Blue', color: '#1679AB' },
  ];

  const handleSubmit = async () => {
    const selectedColor = colorOptions.find(o => o.value === color)?.color;
    const data = {
      userEmail: email,
      title: title,
      tag: tag,
      time: time,
      date: format(date, 'dd/MM/yyyy'),
      priority: priority,
      assignee: assignee,
      color: selectedColor,
    };
    console.log(data);
    try {
      const response = await fetch(`${SERVER_URL}:${SERVER_PORT}/api/reminder/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      if(response.ok) {
        Alert.alert('Success', 'Reminder registered successfully!');
        navigation.goBack()
      } else {
        Alert.alert('Failed', result.message || 'Something went wrong');
      }
    } catch (error) {
      Alert.alert('Failed', 'Network error');
    }

  };

  return (
    <View style={styles.container}>
      <TextInput
        value={title}
        onChangeText={(e) => setTitle(e)}
        placeholder="Title"
        placeholderTextColor="#AAA"
        style={[styles.text, { fontSize: 28, fontWeight: '300', borderBottomWidth: 1, borderBottomColor: '#CCC' }]}
      />

      <TextInput
        value={tag}
        onChangeText={(e) => setTag(e)}
        placeholder="Tag"
        style={[styles.text, { fontSize: 22, fontWeight: '300', height: inputHeight, borderBottomWidth: 1, borderBottomColor: '#CCC', textAlignVertical: 'top' }]}
        multiline
        placeholderTextColor="#AAA"
        onContentSizeChange={(e) => setInputHeight(Math.min(Math.max(e.nativeEvent.contentSize.height, 22 * 7), 22 * 12))}
      />

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Date :</Text>
        <TouchableOpacity onPress={showDatePicker}>
          <Text style={styles.dateText}>{format(date, 'EEEE, dd/MM/yyyy')}</Text>
        </TouchableOpacity>
      </View>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmDate}
        onCancel={hideDatePicker}
        display={Platform.OS === 'ios' ? 'inline' : 'calendar'}
      />

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Time :</Text>
        <TouchableOpacity onPress={showTimePicker}>
          <Text style={[styles.timebox, styles.text, {fontSize: 22, fontWeight: '300'}]}>{time}</Text>
        </TouchableOpacity>
      </View>

      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={hideTimePicker}
      />

      <TouchableOpacity onPress={() => setPriorityModalVisible(true)} style={styles.inputGroup}>
        <Text style={styles.label}>Priority :</Text>
        <Text style={[styles.text, { fontSize: 24, color: priorityOptions.find(o => o.value === priority)?.color }]}> {priority}</Text>
      </TouchableOpacity>

      <OptionModal
        visible={priorityModalVisible}
        onClose={() => setPriorityModalVisible(false)}
        options={priorityOptions}
        onSelect={(value) => setPriority(value)}
      />

      <TouchableOpacity style={styles.inputGroup} onPress={() => setColorModalVisible(true)}>
        <Text style={styles.label}>Accent Color:</Text>
        <Text style={[styles.text, { fontSize: 24, color: colorOptions.find(o => o.value === color)?.color }]}>{color}</Text>
      </TouchableOpacity>

      <OptionModal
        visible={colorModalVisible}
        onClose={() => setColorModalVisible(false)}
        options={colorOptions}
        onSelect={(value) => setColor(value)}
      />

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Assignee :</Text>
        <TextInput
          style={[styles.text, { fontSize: 24, fontWeight: '300' }]}
          value={assignee}
          onChangeText={(e) => setAssignee(e)}
          placeholder="Set assignee"
          placeholderTextColor="#AAA"
        />
      </View>

      <TouchableOpacity style={styles.saveBtn} onPress={handleSubmit}>
        <Text style={[styles.text, { fontSize: 24, fontWeight: '400' }]}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    rowGap: 16,
    paddingHorizontal: 4,
    height: '80%'
  },
  text: {
    fontFamily: 'Outfit',
    color: '#EEE',
  },
  inputGroup: {
    marginVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  label: {
    fontFamily: 'Outfit',
    fontSize: 24,
    color: '#EEE',
    fontWeight: '300'
  },
  dateText: {
    fontFamily: 'Outfit',
    fontSize: 24,
    color: '#CCC',
    fontWeight: '300',
    borderWidth: 1,
    borderColor: '#AAA',
    paddingVertical: 4,
    paddingHorizontal: 24,
    borderRadius: 8
  },
  timebox: {
    borderWidth: 1,
    borderColor: '#AAA',
    paddingVertical: 4,
    paddingHorizontal: 24,
    borderRadius: 8
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
