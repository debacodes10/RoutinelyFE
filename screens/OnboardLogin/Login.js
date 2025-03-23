import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { supabase } from "../../libs/supabase"

import AntDesign from "react-native-vector-icons/AntDesign"
import Entypo from "react-native-vector-icons/Entypo"

export default function Login() {

    const navigation = useNavigation()

    const [email, setEmail] = useState("")
    const [passwd, setPasswd] = useState("")
    const [visible, setVisible] = useState(false)

    const handleSignIn = async () => {
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: passwd,
      })
      if (error) console.log(error);
      if (error) Alert.alert(error.message)
      navigation.navigate("Dashboard")
    }

    return (
        <ImageBackground source={require("../../assets/images/onBoard.webp")} resizeMode='cover'
          style={styles.imageBody}>
          <View style={styles.contentArea}>
            <Text style={[styles.text, {fontSize: 28, fontWeight: '300'}]}>Login</Text>
            <Text style={[styles.text, {fontSize: 16, fontWeight: '500', color: '#CCC'}]}>
                Please login to continue with your account
            </Text>
            <View style={styles.inputContainer}>
                <Text style={[styles.text, {fontSize: 20, fontWeight: '400'}]}>Email</Text>
                <TextInput 
                placeholder='What is your email ID?'
                style={styles.textInput}
                value={email}
                onChangeText={(e)=>setEmail(e)}
                placeholderTextColor={'#686D76'}
                autoCorrect={false}
                autoCapitalize="none"/>
            </View>
            <View style={styles.inputContainer}>
                <Text style={[styles.text, {fontSize: 20, fontWeight: '400'}]}>Password</Text>
                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
                    borderBottomWidth: 1, borderColor: '#FFF'
                }}>
                    <TextInput 
                    placeholder='We promise not to look *winks*'
                    style={[styles.textInput, {width: "85%", borderBottomWidth: 0}]}
                    value={passwd}
                    onChangeText={(e)=>setPasswd(e)}
                    placeholderTextColor={'#686D76'}
                    secureTextEntry={!visible}/>
                    {passwd.length > 1 ? (
                        visible ? (
                            <TouchableOpacity onPress={() => setVisible(false)}>
                            <Entypo name="eye-with-line" size={25} color="#EEE" />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={() => setVisible(true)}>
                            <Entypo name="eye" size={25} color="#EEE" />
                            </TouchableOpacity>
                        )
                        ) : null}
                </View>
            </View>
            <TouchableOpacity style={styles.positiveBtn} onPress={handleSignIn}>
              <Text style={[styles.text, {fontSize: 24, fontWeight: '400' }]}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={[styles.text, {fontSize: 16, fontWeight: '500'}]}>Forgot password?</Text>
            </TouchableOpacity>
            <View style={{display: 'flex', flexDirection: 'row', columnGap: 4,}}>
                <Text style={[styles.text, {fontSize: 16, fontWeight: '300'}]}>New here?</Text>
                <TouchableOpacity onPress={()=>navigation.navigate("Register")}>
                    <Text style={[styles.text, {fontSize: 16, fontWeight: '500'}]}>Create an account</Text>
                </TouchableOpacity>
            </View>
            <View style={{rowGap: 12,}}>
                <Text style={[styles.text, {fontSize: 16, fontWeight: '300'}]}>Login with socials</Text>
                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                    <TouchableOpacity style={styles.socialBtn}>
                        <AntDesign name="apple1" size={25} color={"#EEE"} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialBtn}>
                        <AntDesign name="google" size={25} color={"#EEE"} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialBtn}>
                        <AntDesign name="facebook-square" size={25} color={"#EEE"} />
                    </TouchableOpacity>
                </View>
            </View>
          </View>
        </ImageBackground>
      )
    }
    
    const styles = StyleSheet.create({
      imageBody: {
        height: '100%',
        width: '100%',
        alignItems: 'center'
      },
      contentArea: {
        position: 'absolute',
        backgroundColor: '#000',
        opacity: 0.95,
        bottom: 0,
        width: '100%',
        rowGap: 12,
        paddingHorizontal: 16,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        paddingVertical: 36,
      },
      positiveBtn: {
        backgroundColor: '#379777',
        width: '100%',
        alignItems: 'center',
        borderRadius: 25,
        paddingVertical: 6,
      },
      text: {
        fontFamily: 'Outfit',
        color: '#FFF'
      },
      textInput: {
        borderBottomWidth: 1,
        borderColor: '#CCC',
        paddingHorizontal: 6,
        paddingVertical: 8,
        fontFamily: 'Outfit',
        color: '#EEE',
        fontSize: 16,
        width: '100%'
      },
      inputContainer: {
        rowGap: 10,
      },
      socialBtn: {
        backgroundColor: '#222831',
        paddingHorizontal: 24,
        paddingVertical: 10,
        borderRadius: 18,
      }
    })
