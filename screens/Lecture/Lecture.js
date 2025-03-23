import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import BottomNavigation from '../../components/Navigation/BottomNavigation'
import DaysContainer from '../../components/Containers/DaysContainer'
import { supabase } from "./../../libs/supabase"

export default function Lecture() {

    const navigation = useNavigation()

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
      })
    }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Text style={[styles.text, { fontWeight: '500', fontSize: 16, color: '#CCC' }]}>
          Hello, {session && session.user ? `${session.user.email}` : " User"}
          {/*Hello, {userData && userData.firstName ? ` ${userData.firstName}` : " User"} */}
      </Text>
      <Text style={[styles.text, {fontSize: 40, fontWeight: '300', marginVertical: 8,}]}>Your Week</Text>
      <DaysContainer email={session && session.user ? session.user.email : undefined}/>
      <BottomNavigation active={"lecture"}/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#18191A',
        height: '100%',
        paddingHorizontal: 8,
        marginBottom: 0
    },
    text: {
        fontFamily: 'Outfit',
        color: '#EEE'
    }
})
