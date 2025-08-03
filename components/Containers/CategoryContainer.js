import React, {useState} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import LongPressModal from "../Selectors/LongPressModal";

export default function CategoryContainer({ data }) {

  const [modalVisible, setModalVisible] = useState(false);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onLongPress={()=>setModalVisible(true)}>
      <Text style={styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
  );
  
  const handleUpdate = async () => {
    navigation.navigate("EditReminders", {id}) 
    setModalVisible(false);
  };

  const handleDelete = async () => {
    console.log("Delete started...")
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />

      <LongPressModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  listContainer: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 16
  },
  itemContainer: {
     borderWidth: 1,
     borderColor: '#EEE',
     paddingVertical: 8,
     alignItems: 'center',
     borderRadius: 4 
  },
  itemText: {
    fontFamily: 'Outfit',
    fontSize: 22,
    fontWeight: '300',
    color: '#EEE'
  }
});

