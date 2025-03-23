import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import FontAwesome from "react-native-vector-icons/FontAwesome"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import FontAwesome6 from "react-native-vector-icons/FontAwesome6"
import { useNavigation } from '@react-navigation/native'

export default function BottomNavigation( { active } ) {

    const navigation = useNavigation()

    const [activeTab, setActiveTab] = useState("")

    useEffect(() => {
        setActiveTab(active)
    }, [activeTab])

    const toDashboard = () => {
        setActiveTab("home")
        navigation.navigate("Dashboard")
    }

    const toLectures = () => {
        setActiveTab("lecture")
        navigation.navigate("Lecture")
    }

    const toNote = () => {
        setActiveTab("note")
        navigation.navigate("Note")
    }

    const toReminders = () => {
        setActiveTab("reminder")
        navigation.navigate("Reminders")
    }

    const toAccount = () => {
        setActiveTab("account")
        navigation.navigate("Account")
    }

    return (
        <View style={styles.container}>
            {activeTab === "home" ? 
            <TouchableOpacity style={styles.activeTab} activeOpacity={0.75}>
                <FontAwesome name="home" size={30} color={"#EEE"} />
                <Text style={[styles.text, { fontWeight: '600', fontSize: 16 }]}>Home</Text>
            </TouchableOpacity>
            : 
            <TouchableOpacity onPress={toDashboard} activeOpacity={0.75}>
                <FontAwesome name="home" size={30} color={"#EEE"} />
            </TouchableOpacity>
            }
            {activeTab === "lecture" ? 
            <TouchableOpacity style={styles.activeTab} activeOpacity={0.75}>
                <MaterialCommunityIcons size={30} name="bookshelf" color={"#EEE"} />
                <Text style={[styles.text, { fontWeight: '600', fontSize: 16 }]}>Lectures</Text>
            </TouchableOpacity>
            : 
            <TouchableOpacity onPress={toLectures} activeOpacity={0.75}>
                <MaterialCommunityIcons size={30} name="bookshelf" color={"#EEE"} />
            </TouchableOpacity>
            }
            {activeTab === "note" ? 
            <TouchableOpacity style={styles.activeTab} activeOpacity={0.75}>
                <FontAwesome6 size={30} name="square-plus" color={"#EEE"} />
                <Text style={[styles.text, { fontWeight: '600', fontSize: 16 }]}>Note</Text>
            </TouchableOpacity>
            : 
            <TouchableOpacity onPress={toNote} activeOpacity={0.75}>
                <FontAwesome6 size={30} name="square-plus" color={"#EEE"} />
            </TouchableOpacity>
            }
            {activeTab === "reminder" ? 
            <TouchableOpacity style={styles.activeTab} activeOpacity={0.75}>
                <FontAwesome6 size={30} name="list-ol" color={"#EEE"} />
                <Text style={[styles.text, { fontWeight: '600', fontSize: 16 }]}>Reminder</Text>
            </TouchableOpacity>
            : 
            <TouchableOpacity onPress={toReminders} activeOpacity={0.75}>
                <FontAwesome6 size={30} name="list-ol" color={"#EEE"} />
            </TouchableOpacity>
            }
            {activeTab === "account" ? 
            <TouchableOpacity style={styles.activeTab} activeOpacity={0.75}>
                <MaterialCommunityIcons size={30} name="account" color={"#EEE"} />
                <Text style={[styles.text, { fontWeight: '600', fontSize: 16 }]}>Account</Text>
            </TouchableOpacity>
            : 
            <TouchableOpacity onPress={toAccount} activeOpacity={0.75}>
                <MaterialCommunityIcons size={30} name="account" color={"#EEE"} />
            </TouchableOpacity>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 16,
        backgroundColor: '#242526',
        width: '98%',
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        paddingHorizontal: 12, 
        borderRadius: 100,
        alignItems: 'center',
        opacity: 0.95
    },
    activeTab: {
        display: 'flex',
        flexDirection: 'row',
        columnGap: 6,
        alignItems: 'center',
        backgroundColor: '#373A40',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 25,
    },
    text: {
        fontFamily: 'Outfit', 
        color: '#BBB'
    }
})
