import React, {useState} from "react"
import {Image, View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView} from 'react-native'

export default function UserInfoForm() {

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [birthday, setBirthday] = useState("")
  const [uniName, setUniName] = useState("")
  const [degree, setDegree] = useState("")
  const [year, setYear] = useState("")

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center', rowGap: 32}}>
        <Image 
          source={require('../../assets/images/blank_pfp.png')}
          style={styles.image}
          resizeMode="contain"
        />
        <TouchableOpacity style={styles.positiveBtn} activeOpacity={0.50}>
          <Text style={[styles.text, {fontSize: 24, color: '#379777' }]}>
            Upload
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{paddingVertical: 24, rowGap: 24}}>
        <View style={styles.eachInput}>
          <Text style={[styles.text, {fontSize: 24}]}>First Name</Text>
          <TextInput 
            value={firstName}
            onChangeText={(e)=>setFirstName(e)}
            style={[styles.text, styles.inputText]}
          />
        </View>
        <View style={styles.eachInput}>
          <Text style={[styles.text, {fontSize: 24}]}>Last Name</Text>
          <TextInput 
            value={lastName}
            onChangeText={(e)=>setLastName(e)}
            style={[styles.text, styles.inputText]}
          />
        </View>
        <View style={styles.eachInput}>
          <Text style={[styles.text, {fontSize: 24}]}>Date of Birth</Text>
          <TextInput 
            value={birthday}
            onChangeText={(e)=>setBirthday(e)}
            style={[styles.text, styles.inputText]}
          />
        </View>
        <View style={styles.eachInput}>
          <Text style={[styles.text, {fontSize: 24}]}>University Name</Text>
          <TextInput 
            value={uniName}
            onChangeText={(e)=>setUniName(e)}
            style={[styles.text, styles.inputText]}
          />
        </View>
        <View style={styles.eachInput}>
          <Text style={[styles.text, {fontSize: 24}]}>Degree</Text>
          <TextInput 
            value={degree}
            onChangeText={(e)=>setDegree(e)}
            style={[styles.text, styles.inputText]}
          />
        </View>
    </View>
      <TouchableOpacity style={styles.saveBtn} activeOpacity={0.50}>
        <Text style={[styles.text, {fontSize: 24, fontWeight: '400'}]}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100
  },
  positiveBtn: {
    borderRadius: 25,
    borderColor: '#379777',
    borderWidth: 2,
    paddingHorizontal: 28,
    paddingVertical: 6
  },
  saveBtn: {
    borderRadius: 25,
    backgroundColor: '#379777',
    paddingHorizontal: 28,
    paddingVertical: 6,
    width: '90%',
    alignItems: 'center'
  },
  eachInput: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  text: {
    fontFamily: 'Outfit',
    fontWeight: '300',
    fontSize: 18,
    color: '#EEE'
  },
  inputText: {
    minWidth: 250,
    maxWidth: 300,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    paddingVertical: 4,
    fontSize: 20
  }
})
