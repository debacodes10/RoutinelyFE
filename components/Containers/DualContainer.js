import { StyleSheet, Text, TouchableOpacity, View, Animated, Easing } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import LectureContainer from './LectureContainer'
import ReminderContainer from './ReminderContainer'

export default function DualContainer({email}) {
    const userEmail = email;
    const [today, setToday] = useState("")
    const [activeBlock, setActiveBlock] = useState("lectures")
    const activePosition = useRef(new Animated.Value(0)).current

    useEffect(() => {
        const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });
        setToday(currentDay)
        const toValue = activeBlock === "lectures" ? 0 : 1
        Animated.timing(activePosition, {
            toValue,
            duration: 300,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
        }).start()
    }, [activeBlock])

    const translateX = activePosition.interpolate({
        inputRange: [0, 1],
        outputRange: [30, 220]
    })

    return (
        <View style={styles.container}>
            <View style={styles.tabContainer}>
                <Animated.View style={[styles.activeBlock, { transform: [{ translateX }] }]} />
                <TouchableOpacity style={styles.tab} activeOpacity={1}
                    onPress={() => setActiveBlock("lectures")}>
                    <Text style={[styles.text, { fontSize: 18, fontWeight: '400' }]}>LECTURES</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tab} activeOpacity={1}
                    onPress={() => setActiveBlock("reminders")}>
                    <Text style={[styles.text, { fontSize: 18, fontWeight: '400' }]}>REMINDERS</Text>
                </TouchableOpacity>
            </View>
            {activeBlock === "lectures" ? 
                <LectureContainer email={userEmail ? userEmail: ""} today={today}/>
            : null }
            {activeBlock === "reminders" ? 
                <ReminderContainer email={userEmail ? userEmail: ""} from={"Dashboard"}/>
            : null }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#18191A',
        paddingHorizontal: 4,
        paddingBottom: 48
    },
    text: {
        fontFamily: 'Outfit',
        color: '#EEE'
    },
    tabContainer: {
        display: 'flex',
        flexDirection: 'row',
        columnGap: 12,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 4,
    },
    activeBlock: {
        backgroundColor: '#373A40',
        position: 'absolute',
        width: 120,
        height: '100%',
        borderRadius: 25,
        zIndex: -1,
    }
})
