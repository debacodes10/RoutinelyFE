import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import LongPressModal from "../Selectors/LongPressModal";
import { SERVER_URL, SERVER_PORT } from "@env"
import { useNavigation } from "@react-navigation/native"

export default function LectureBlock({
  id,
  lectureCode,
  startTime,
  endTime,
  lectureName,
  priority,
  professor,
  accentColor,
}) {

  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  //console.log(id) 
  const handleUpdate = async () => {
    navigation.navigate("EditLecture", { 
      id, lectureCode, startTime, endTime, lectureName, priority, professor, accentColor
    }) 
    setModalVisible(false)
  }

  const handleDelete = async () => {
    try {
      console.log(id)
      const response = await fetch(`${SERVER_URL}:${SERVER_PORT}/api/class/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete lecture");
      }
    } catch (error) {
      console.error("Error deleting lecture:", error.message);
    } finally {
      setModalVisible(false);
    }
  };

  return (
    <>
      {/* Lecture Block */}
      <TouchableOpacity
        style={[styles.container, { backgroundColor: accentColor }]}
        activeOpacity={0.5}
        onLongPress={() => setModalVisible(true)}
      >
        <View style={styles.row}>
          <Text style={[styles.text, styles.boldText]}>{lectureCode}</Text>
          <Text style={[styles.text, styles.boldText]}>
            {startTime} - {endTime}
          </Text>
        </View>

        <Text style={[styles.text, styles.lectureName]}>{lectureName}</Text>

        <View style={styles.row}>
          <View style={styles.tagContainer}>
            <Text style={[styles.text, styles.borderedText]}>In 25 mins</Text>
            <Text style={[styles.text, styles.borderedText]}>{priority}</Text>
          </View>
          <Text style={[styles.text, styles.professor]}>{professor}</Text>
        </View>
      </TouchableOpacity>

      {/* Action Modal */}
      <LongPressModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E25E3E",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  text: {
    fontFamily: "Outfit",
    color: "#EEE",
  },
  boldText: {
    fontWeight: "600",
    fontSize: 16,
  },
  lectureName: {
    fontWeight: "300",
    fontSize: 28,
    marginVertical: 12,
  },
  professor: {
    fontWeight: "400",
    fontSize: 20,
    textDecorationLine: "underline",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tagContainer: {
    flexDirection: "row",
    columnGap: 12,
  },
  borderedText: {
    borderWidth: 1.5,
    borderColor: "#EEE",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontWeight: "600",
    fontSize: 16,
  },
});
