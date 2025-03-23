import { StyleSheet, Text, Dimensions, View, Animated } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import BottomNavigation from '../../components/Navigation/BottomNavigation';
import DualContainer from '../../components/Containers/DualContainer';
import { supabase } from "./../../libs/supabase"

const { height: screenHeight } = Dimensions.get('window');

export default function Dashboard() {
    const navigation = useNavigation();
    const scrollY = useRef(new Animated.Value(0)).current;

    const [initializing, setInitializing] = useState(true)
    const [user, setUser] = useState()
    const [userData, setUserData] = useState()
    const [session, setSession] = useState()

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
                        You have 3 remaining classes and 2 pending tasks for today.
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
