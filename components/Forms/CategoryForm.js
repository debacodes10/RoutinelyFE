import React, {useState, useEffect} from 'react';
import {TextInput, View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function CategoryForm ({userEmail}) {

  const [category, setCategory] = useState()

  const handleSubmit = async () => {
    const body = {
      userEmail: userEmail,
      category: category
    }
    console.log(body)
  }

  return (
    <View style={styles.container}>
      <TextInput 
      value = {category}
      onChangeText = {(e)=>setCategory(e)}
      style={[styles.input, styles.text]}
      placeholder = "Projects? Reading? Bring it on!"
      />
      <TouchableOpacity onPress={handleSubmit}>
          <AntDesign name="pluscircle" size={28} color={'#EEE'} />
      </TouchableOpacity>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 16,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  input: {
     width: '90%', 
     borderBottomWidth: 1,
     borderBottomColor: '#CCC'
  },
  btn: {

  },
  text: {
    fontFamily: 'Outfit',
    fontSize: 24,
    fontWeight: '300',
    color: '#EEE'
  }
})
