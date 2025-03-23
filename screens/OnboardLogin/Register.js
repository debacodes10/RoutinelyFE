import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { supabase } from "../../libs/supabase"

import AntDesign from "react-native-vector-icons/AntDesign"
import Entypo from "react-native-vector-icons/Entypo"

export default function Register() {

    const navigation = useNavigation()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPasswd] = useState("")
    const [visible, setVisible] = useState(false)

    const handleRegister = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.signUp({
        email: email,
        password: password,
      })
      if (error) console.log(error);
      if (error) Alert.alert(error.message)
      if (!session) Alert.alert('Please check your inbox for email verification!')
      navigation.navigate("Login"); 
    }

    return (
        <ImageBackground source={require("../../assets/images/onBoard.webp")} resizeMode='cover'
          style={styles.imageBody}>
          <View style={styles.contentArea}>
            <Text style={[styles.text, {fontSize: 28, fontWeight: '300'}]}>Create an account</Text>
            <Text style={[styles.text, {fontSize: 16, fontWeight: '500', color: '#CCC'}]}>
                It's free and always will be :D
            </Text>
            <View style={styles.inputContainer}>
                <Text style={[styles.text, {fontSize: 20, fontWeight: '400'}]}>First Name</Text>
                <TextInput 
                placeholder='What should we call you?'
                style={styles.textInput}
                value={name}
                onChangeText={(e)=>setName(e)}
                placeholderTextColor={'#686D76'}/>
            </View>
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
                    value={password}
                    onChangeText={(e)=>setPasswd(e)}
                    placeholderTextColor={'#686D76'}
                    secureTextEntry={!visible}/>
                    {password.length > 1 ? (
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
            <TouchableOpacity style={styles.positiveBtn} onPress={handleRegister}>
              <Text style={[styles.text, {fontSize: 24, fontWeight: '400' }]}>Create account</Text>
            </TouchableOpacity>
            <View style={{display: 'flex', flexDirection: 'row', columnGap: 4,}}>
                <Text style={[styles.text, {fontSize: 16, fontWeight: '300'}]}>Already have an account?</Text>
                <TouchableOpacity onPress={()=>navigation.navigate("Login")}>
                    <Text style={[styles.text, {fontSize: 16, fontWeight: '500'}]}>Login instead</Text>
                </TouchableOpacity>
            </View>
            <View style={{rowGap: 12,}}>
                <Text style={[styles.text, {fontSize: 16, fontWeight: '300'}]}>Sign up with socials</Text>
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
