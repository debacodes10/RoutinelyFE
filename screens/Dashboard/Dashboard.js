import { StyleSheet, Text, Dimensions, View, Animated } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import BottomNavigation from '../../components/Navigation/BottomNavigation';
import DualContainer from '../../components/Containers/DualContainer';
import { supabase } from "./../../libs/supabase"
import {SERVER_URL, SERVER_PORT} from "@env"

const { height: screenHeight } = Dimensions.get('window');

export default function Dashboard() {
    const navigation = useNavigation();
    const scrollY = useRef(new Animated.Value(0)).current;

    const [initializing, setInitializing] = useState(true)
    const [user, setUser] = useState()
    const [userData, setUserData] = useState()
    const [session, setSession] = useState()
    const [reminderCount, setReminderCount] = useState(0);
    const [classCount, setClassCount] = useState(0);
    
  // Calculate maximum height for blockContainer
    const maxBlockContainerHeight = screenHeight - 25;

    // Calculate dynamic height for blockContainer based on scrollY
    const blockContainerHeight = scrollY.interpolate({
        inputRange: [0, maxBlockContainerHeight],
        outputRange: [maxBlockContainerHeight, 250],
        extrapolate: 'clamp',
    });

    const hideReminderText = scrollY.interpolate({
        inputRange: [0, 250],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });

    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
      })

      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })
    }, [])

    
useEffect(() => {
  const fetchCounts = async () => {
    if (!session?.user?.email) return;

    try {
      const reminderRes = await fetch(`${SERVER_URL}:${SERVER_PORT}/api/reminder/${session.user.email}`);
      const classRes = await fetch(`${SERVER_URL}:${SERVER_PORT}/api/class/${session.user.email}`);

      if (!reminderRes.ok || !classRes.ok) {
        throw new Error("One or both requests failed");
      }

      const reminders = await reminderRes.json();
      const classes = await classRes.json();

      const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });
      const filteredClasses = classes.filter(cls => cls.day === currentDay)

      const today = new Date();
      const currentDate = today.toLocaleDateString('en-GB'); // gives DD/MM/YYYY
      const filteredReminders = reminders.filter(reminder => reminder.date === currentDate)

      setReminderCount(filteredReminders.length || 0);
      setClassCount(filteredClasses.length || 0);
    } catch (error) {
      console.error("Failed to fetch counts:", error);
      setReminderCount(0);
      setClassCount(0);
    }
  };

  fetchCounts();
}, [session]);
    return (
        <SafeAreaView style={styles.container}>
            <Text style={[styles.text, { fontWeight: '500', fontSize: 16, color: '#CCC' }]}>
                Hello, {session && session.user ? `${session.user.email}` : " User"}
                {/*Hello, {userData && userData.firstName ? ` ${userData.firstName}` : " User"} */}
            </Text>
            <Animated.ScrollView
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
            >
                <Animated.View style={{ 
                    opacity: hideReminderText, 
                    transform: [{
                        translateY: scrollY.interpolate({
                            inputRange: [0, 150],
                            outputRange: [0, -90],
                            extrapolate: 'clamp',
                        })
                    }] 
                }}>
                    <Text style={[styles.text, { fontWeight: '300', fontSize: 36, marginVertical: 12 }]}>
                        You have {classCount} remaining classes and {reminderCount} pending tasks for today.
                    </Text>
                </Animated.View>
                <Animated.View style={{ height: blockContainerHeight }}>
                    <DualContainer email={session && session.user ? session.user.email : undefined}/>
                </Animated.View>
            </Animated.ScrollView>
            <BottomNavigation active={"home"} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#18191A',
        height: '100%',
        paddingHorizontal: 8,
    },
    text: {
        fontFamily: 'Outfit',
        color: '#EEE'
    }
});
