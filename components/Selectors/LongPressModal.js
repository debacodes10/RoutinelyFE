import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function ActionModal({ visible, onClose, onUpdate, onDelete }) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <TouchableOpacity style={styles.modalOverlay} onPress={onClose} activeOpacity={1}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.option} onPress={onUpdate}>
            <Text style={styles.optionText}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.option, styles.delete]} onPress={onDelete}>
            <Text style={[styles.optionText, {color: '#E72929'}]}>Delete</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#18191A",
    width: 200,
    paddingVertical: 4,
    borderRadius: 10,
    alignItems: "center",
    elevation: 5,
  },
  option: {
    width: "100%",
    paddingVertical: 12,
    alignItems: "center",
  },
  delete: {
    borderTopWidth: 1,
    borderTopColor: "#999999",
  },
  optionText: {
    fontSize: 24,
    fontWeight: "500",
    color: "#DDD",
    fontFamily: 'Outfit'
  },
});
