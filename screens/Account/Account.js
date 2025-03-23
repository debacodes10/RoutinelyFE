import { Image, StyleSheet, Text, View, Animated, Dimensions } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import BottomNavigation from '../../components/Navigation/BottomNavigation'
import Entypo from "react-native-vector-icons/Entypo"
import AccountOptions from '../../components/Containers/AccountOptions'
import { supabase } from "./../../libs/supabase"

const { height: screenHeight } = Dimensions.get('window');

export default function Account() {

    const navigation = useNavigation()
    const scrollY = useRef(new Animated.Value(0)).current;

    // Calculate maximum height for blockContainer
    const maxBlockContainerHeight = screenHeight + 150;

    // Calculate dynamic height for blockContainer based on scrollY
    const blockContainerHeight = scrollY.interpolate({
        inputRange: [0, maxBlockContainerHeight],
        outputRange: [maxBlockContainerHeight, 250],
        extrapolate: 'clamp',
    });

    const hideReminderText = scrollY.interpolate({
        inputRange: [0, 150],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });

    const [loggedIn, setLoggedIn] = useState(false)
    const [initializing, setInitializing] = useState(true)
    const [user, setUser] = useState()
    const [userData, setUserData] = useState()
    const [session, setSession] = useState()


    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
      })

      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
        if (session) setLoggedIn(true)
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
                            inputRange: [0, 250],
                            outputRange: [0, -90],
                            extrapolate: 'clamp',
                        })
                    }] 
                }}>
      <View style={styles.pfpContainer}>
        {userData && userData.picture ? 
          <Image src={userData.picture} style={styles.pfp}/>
        : 
          <Image source={require("../../assets/images/blank_pfp.png")} style={styles.pfp}/>
        }
      </View>
      {loggedIn ?
      <>
        <View style={[styles.primTitleView, {alignItems: 'flex-end'}]}>
          <Text style={[styles.text, {fontSize: 36, fontWeight: '300'}]}>
            {userData && userData.firstName ? userData.firstName : "User"}
          </Text>
          <Text style={[styles.text, {fontSize: 20, fontWeight: '400', color: '#AAA'}]}>19 Y.O.</Text>
        </View>
        <View style={[styles.primTitleView, {columnGap: 0}]}>
          <Text style={[styles.text, {fontSize: 18, fontWeight: '400'}]}>
            {userData && userData.universityName ? userData.universityName: ""}
          </Text>
          <Entypo name="dot-single" size={30} color={"#CCC"} />
          <Text style={[styles.text, {fontSize: 18, fontWeight: '400', color: '#AAA'}]}>
            {userData && userData.year ? userData.year : ""}
          </Text>
        </View>
      </>
      :
      null
      }
      </Animated.View>
      <Animated.View style={{ height: blockContainerHeight }}>
        <AccountOptions authenticated={loggedIn}/>
      </Animated.View>
      </Animated.ScrollView>
      <BottomNavigation active={"account"}/>
    </SafeAreaView>
  )
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
    },
    pfpContainer: {
      width: '100%',
      alignItems: 'center',
      marginVertical: 16,
    },
    pfp: {
      borderRadius: 100,
      height: 200,
      width: 200
    },
    primTitleView: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      columnGap: 12,
      marginTop: 8
    }
})
