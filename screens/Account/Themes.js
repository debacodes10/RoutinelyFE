import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from "@react-navigation/native"
import AntDesign from "react-native-vector-icons/AntDesign"
import RadioGroup from 'react-native-radio-buttons-group'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Theme() {
  const navigation = useNavigation()
  const [selectedId, setSelectedId] = useState("dark")  // Default theme is dark

  useEffect(() => {
    // Load theme from storage on component mount
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme')
        if (savedTheme) {
          setSelectedId(savedTheme)
          console.log("Loaded Theme:", savedTheme)
        }
      } catch (error) {
        console.log("Error loading theme:", error)
      }
    }
    loadTheme()
  }, [])

  // Save theme when selection changes
  const handleThemeChange = async (id) => {
    setSelectedId(id)
    try {
      await AsyncStorage.setItem('theme', id)
      console.log("Saved Theme:", id)
    } catch (error) {
      console.log("Error saving theme:", error)
    }
  }

  const radioButtons = [
    { id: 'light', label: 'Light Mode', value: 'light' },
    { id: 'dark', label: 'Dark Mode', value: 'dark' }
  ]

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={1}>
            <AntDesign name="left" size={40} color={"#EEE"} />
          </TouchableOpacity>
          <Text style={[styles.text, { fontSize: 40, fontWeight: '300' }]}>
            Theme
          </Text>
        </View>
      </View>

      {/* Theme Selection */}
      <View style={styles.themeSelector}>
        {radioButtons.map((button) => (
          <TouchableOpacity 
            key={button.id} 
            style={styles.radioContainer} 
            onPress={() => handleThemeChange(button.id)}
            activeOpacity={0.8}
          >
            <Text style={styles.radioText}>{button.label}</Text>
            <View style={selectedId === button.id ? styles.radioSelected : styles.radioUnselected} />
          </TouchableOpacity>
        ))}
      </View>
      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#18191A'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 16
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 12,
  },
  text: {
    color: '#EEE',
    fontFamily: 'Outfit'
  },
  themeSelector: {
    marginTop: 20,
    paddingHorizontal: 8,
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#242526',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 10
  },
  radioText: {
    color: '#EEE',
    fontSize: 24,
    fontFamily: 'Outfit'
  },
  radioUnselected: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#BBB',
  },
  radioSelected: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#0A84FF',
    borderWidth: 2,
    borderColor: '#0A84FF',
  }
})
