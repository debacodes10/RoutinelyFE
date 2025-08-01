import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import React, {useState, useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from "react-native-vector-icons/AntDesign"
import { useNavigation } from "@react-navigation/native"
import CategorySelector from '../../components/Selectors/CategorySelector';
import OptionModal from '../../components/Selectors/OptionModal';
import {SERVER_URL, SERVER_PORT} from "@env"

export default function EditNote({route}) {

  const navigation = useNavigation()
  const { id, title, tag, body } = route.params

  const tagOptions = [
    { label: 'Design', value: 'Design', color: '#EEE' },
    { label: 'Finance', value: 'Finance', color: '#EEE' },
    { label: 'Grocery', value: 'Grocery', color: '#EEE'  },
    { label: 'Games', value: 'Games', color: '#EEE'  }
  ];

  const [noteId, setNoteId] = useState(id)
  const [noteTitle, setNoteTitle] = useState(title);
  const [noteTag, setNoteTag] = useState(tag);
  const [noteBody, setNoteBody] = useState(body);
  const [isTagModalVisible, setIsTagModalVisible] = useState(false);

const handleUpdate = async () => {
  try {
    console.log("Handle Update...");
    console.log(noteTitle, noteTag, noteBody);

    const response = await fetch(
      `${SERVER_URL}:${SERVER_PORT}/api/note/${noteId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: noteTitle,
          tags: noteTag,
          description: noteBody,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Update successful:", data);
    navigation.goBack()
  } catch (error) {
    console.error("Error updating note:", error);
  }
};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={1}>
                <AntDesign name="left" size={40} color={"#EEE"}/>
            </TouchableOpacity>
            <Text style={[styles.text, {fontSize: 40, fontWeight: '300'}]}>Edit Note</Text>
        </View>
        <AntDesign name="check" size={40} color={'#EEE'} onPress={handleUpdate}/> 
      </View>
        <View style={styles.inputArea}>
          <View style={styles.titleArea}>
            <TextInput 
              value={noteTitle}
              onChangeText={setNoteTitle}
              style={[styles.text, {fontSize: 32, fontWeight: '400'}]}
            />
            <TouchableOpacity style={[styles.genericBtn]} onPress={() => setIsTagModalVisible(true)}>
            <Text style={[styles.text, { fontSize: 22 }]}>{noteTag || 'Select Tag'}</Text>
                        </TouchableOpacity>
          </View>
          <TextInput 
            value={noteBody}
            onChangeText={setNoteBody}
            style={[ styles.text, {fontSize: 24, fontWeight: '300'}]}
            multiline
/>

            <OptionModal
                visible={isTagModalVisible}
                onClose={() => setIsTagModalVisible(false)}
                options={tagOptions}
                onSelect={(tag) => setNoteTag(tag)}
            />
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
      backgroundColor: '#18191A',
      height: '100%',
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
  inputArea: {
    display: 'flex',
    flexDirection: 'column',
    paddingVertical: 8,
    rowGap: 12,
    height: "100%",
    paddingHorizontal: 4
  },
  titleArea: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
    categoryOption: {
        backgroundColor: '#EEE',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center'
    },
  genericBtn: {
        borderWidth: 1.5,
        borderColor: '#EEE',
        paddingHorizontal: 2,
        paddingVertical: 4,
        borderRadius: 12,
        width: 120,
        alignItems: 'center'
    }

})
