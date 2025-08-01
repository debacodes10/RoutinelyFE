import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, {useState, useEffect} from 'react'
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"
import LongPressModal from "../Selectors/LongPressModal"
import { useNavigation } from "@react-navigation/native"
import { SERVER_URL, SERVER_PORT } from "@env"

export default function NoteBlock({id, title, tag, body}) {

  const navigation = useNavigation()
  const [modalVisible, setModalVisible] = useState(false);
  
  const handleUpdate = () => {
    navigation.navigate("EditNote", {id, title, tag, body})
    setModalVisible(false)
  } 

  const handleDelete = async () => {
  try {
    console.log("Deleting...");
    console.log(id);

    const response = await fetch(`${SERVER_URL}:${SERVER_PORT}/api/note/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error("Failed to delete note");
    }

    console.log("Note deleted successfully");
  } catch (error) {
    console.error("Error deleting note:", error.message);
  } finally {
    setModalVisible(false);
  }
};
  return (
    <>
    <View style={styles.container}>
      <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <Text style={[styles.text, {fontSize: 28}]}>{title}</Text>
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', columnGap: 12, alignItems: 'center'}}>
            <View style={styles.categoryOption}>
                <Text style={[styles.text, {fontSize: 18, color: '#252525'}]}>
                    {tag}
                </Text>
            </View>
            <TouchableOpacity
              //style={[styles.container]}
              activeOpacity={0.5}
              onPress={() => setModalVisible(true)}
>
                <SimpleLineIcons name="options-vertical" size={20} color={"#EEE"} />
            </TouchableOpacity>
        </View>
      </View>
      <Text style={[styles.text, {color: '#AAA', fontSize: 18, marginTop: 8,}]} numberOfLines={3}>
      {body}
      </Text>
    </View>
      <LongPressModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </>
  )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1.5,
        borderColor: '#EEE',
        width: '100%',
        paddingHorizontal: 8,
        paddingVertical: 12,
        borderRadius: 12,
    },
    text: {
        fontFamily: 'Outfit',
        color: '#EEE',
    },
    categoryOption: {
        backgroundColor: '#EEE',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
