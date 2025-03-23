import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"

export default function NoteBlock({title, tag, body}) {
  return (
    <View style={styles.container}>
      <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <Text style={[styles.text, {fontSize: 28}]}>{title}</Text>
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', columnGap: 12, alignItems: 'center'}}>
            <View style={styles.categoryOption}>
                <Text style={[styles.text, {fontSize: 18, color: '#252525'}]}>
                    {tag}
                </Text>
            </View>
            <TouchableOpacity>
                <SimpleLineIcons name="options-vertical" size={20} color={"#EEE"} />
            </TouchableOpacity>
        </View>
      </View>
      <Text style={[styles.text, {color: '#AAA', fontSize: 18, marginTop: 8,}]} numberOfLines={3}>
      {body}
      </Text>
    </View>
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