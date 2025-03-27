import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Ionicons from "react-native-vector-icons/Ionicons"
import { useNavigation } from "@react-navigation/native"
import { supabase } from "./../../libs/supabase"

export default function AccountOptions({ authenticated }) {

    const navigation = useNavigation();

    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        setLoggedIn(authenticated)
    }, [authenticated])

    const handleLogout = async () => {
      try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error('Logout Error:', error.message);
        alert('Failed to log out. Please try again.');
      } else {
        console.log('User logged out successfully');
        // Optionally, navigate to login screen or reset navigation stack
        navigation.reset({ index: 0, routes: [{ name: 'OnBoard' }] });
      }
      } catch (err) {
        console.error('Unexpected Logout Error:', err.message);
        alert('Something went wrong. Please try again later.');
      }
    };

    const handleFeatureNotReady = () => {
      Alert.alert(
        "Feature Under Development",
        "Sorry, this feature is still under development and will be available shortly.",
        [{ text: "OK", style: "default" }]
      );
    };

    return (
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
            {loggedIn ? (
                <>
                    <View style={styles.rowContainer}>
                        <TouchableOpacity style={styles.eachOption} activeOpacity={0.75} >
                            <MaterialIcons name="manage-accounts" size={50} color={"#EEE"} />
                            <Text style={styles.text}>Edit Info</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.eachOption} activeOpacity={0.75}
                          onPress={handleFeatureNotReady}>
                            <MaterialCommunityIcons name="database-export" size={50} color={"#EEE"} />
                            <Text style={styles.text}>Export Data</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.rowContainer}>
                        <TouchableOpacity style={styles.eachOption} activeOpacity={0.75} 
                          onPress={()=>navigation.navigate("Theme")}>
                            <MaterialCommunityIcons name="theme-light-dark" size={50} color={"#EEE"} />
                            <Text style={styles.text}>Theme</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.eachOption} activeOpacity={0.75}
                          onPress={handleFeatureNotReady}>
                            <Ionicons name="color-palette" size={50} color={"#EEE"} />
                            <Text style={styles.text}>Accent Colors</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.rowContainer}>
                        <TouchableOpacity style={styles.eachOption} activeOpacity={0.75}
                          onPress={handleFeatureNotReady}>
                            <MaterialIcons name="category" size={50} color={"#EEE"} />
                            <Text style={styles.text}>Categories</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.eachOption} activeOpacity={0.75} onPress={()=>navigation.navigate("About")}>
                            <MaterialIcons name="policy" size={50} color={"#EEE"} />
                            <Text style={styles.text}>About Routinely</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.longBtn} activeOpacity={0.75} onPress={handleLogout}>
                        <Text style={[styles.text, { color: "#E72929", fontSize: 20, fontWeight: '400' }]}>LOG OUT</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <>
                    <TouchableOpacity style={[styles.longBtn, {borderColor: '#50B498'}]} activeOpacity={0.75}>
                        <Text style={[styles.text, { color: "#50B498", fontSize: 20, fontWeight: '400' }]}>LOG IN</Text>
                    </TouchableOpacity>
                    <View style={styles.rowContainer}>
                        <TouchableOpacity style={styles.eachOption} activeOpacity={0.75} onPress={()=>navigation.navigate("Theme")}>
                            <MaterialCommunityIcons name="theme-light-dark" size={50} color={"#EEE"} />
                            <Text style={styles.text}>Theme</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.eachOption} activeOpacity={0.75} onPress={()=>navigation.navigate("About")}>
                            <MaterialIcons name="policy" size={50} color={"#EEE"} />
                            <Text style={styles.text}>About Routinely</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 24,
        rowGap: 12,
        paddingBottom: 76
    },
    rowContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        columnGap: 12,
    },
    eachOption: {
        width: '48%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#373A40',
        height: 150,
        borderRadius: 15,
    },
    text: {
        fontFamily: 'Outfit',
        color: '#EEE',
        marginTop: 12,
        fontWeight: '500',
        fontSize: 18
    },
    longBtn: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        paddingBottom: 12,
        borderWidth: 1.5,
        borderColor: '#E72929'
    }
})
