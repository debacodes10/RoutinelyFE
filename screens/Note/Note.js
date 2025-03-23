
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Animated, Dimensions, Alert } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import BottomNavigation from '../../components/Navigation/BottomNavigation';
import CategorySelector from '../../components/Selectors/CategorySelector';
import NoteContainer from '../../components/Containers/NoteContainer';
import { supabase } from "./../../libs/supabase";
import OptionModal from '../../components/Selectors/OptionModal';
import {SERVER_URL, SERVER_PORT} from "@env"

const { height: screenHeight } = Dimensions.get('window');

const tagOptions = [
    { label: 'Design', value: 'Design', color: '#EEE' },
    { label: 'Finance', value: 'Finance', color: '#EEE' },
    { label: 'Grocery', value: 'Grocery', color: '#EEE'  },
    { label: 'Games', value: 'Games', color: '#EEE'  }
];

export default function Note() {
    const navigation = useNavigation();
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [session, setSession] = useState();
    const [selectedTag, setSelectedTag] = useState('');
    const [isTagModalVisible, setIsTagModalVisible] = useState(false);

    const scrollY = useRef(new Animated.Value(0)).current;

    const maxBlockContainerHeight = screenHeight + 70;

    const blockContainerHeight = scrollY.interpolate({
        inputRange: [0, maxBlockContainerHeight],
        outputRange: [maxBlockContainerHeight, 300],
        extrapolate: 'clamp',
    });

    const hideTitleText = scrollY.interpolate({
        inputRange: [0, 150],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    }, []);

    const handleSubmit = async() => {
      const data = {
        title: title,
        description: desc,
        userEmail: session.user.email,
        tags: selectedTag,
      }
      try {
        const response = await fetch(`${SERVER_URL}:${SERVER_PORT}/api/note/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok) {
          Alert.alert('Success', 'Note added successfully!');
        } else {
          Alert.alert('Error', result.message || 'Failed to add note');
        }
      } catch (error) {
        Alert.alert('Error', 'Something went wrong. Please try again later.');
      }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={[styles.text, { fontWeight: '500', fontSize: 16, color: '#CCC' }]}>
              Hello, {session && session.user ? `${session.user.email}` : "User"}
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
                    opacity: hideTitleText,
                    transform: [{
                        translateY: scrollY.interpolate({
                            inputRange: [0, 150],
                            outputRange: [0, -90],
                            extrapolate: 'clamp',
                        })
                    }]
                }}>
                    <Text style={[styles.text, { fontSize: 40, fontWeight: '300', marginVertical: 8 }]}>Quick Note</Text>
                    <View style={{ rowGap: 8 }}>
                        <View style={styles.titleText}>
                            <TextInput
                                value={title}
                                onChangeText={setTitle}
                                placeholder={"What's on your mind?"}
                                placeholderTextColor={"#686D76"}
                                style={[styles.text, { fontWeight: '400', fontSize: 24 }]}
                            />
                        </View>
                        <View style={styles.descText}>
                            <TextInput
                                value={desc}
                                onChangeText={setDesc}
                                placeholder={"Got something longer?"}
                                placeholderTextColor={"#686D76"}
                                style={[styles.text, { fontWeight: '400', fontSize: 20 }]}
                                numberOfLines={4}
                                multiline={true}
                            />
                        </View>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 16 }}>
                        <TouchableOpacity style={[styles.genericBtn]} onPress={() => setIsTagModalVisible(true)}>
                            <Text style={[styles.text, { fontSize: 22 }]}>{selectedTag || 'Select Tag'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.genericBtn, { borderColor: '#379777' }]}
                            onPress={handleSubmit}>
                            <Text style={[styles.text, { fontSize: 22, color: '#379777' }]}>Add</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
                <Animated.View style={{ height: blockContainerHeight }}>
                    <CategorySelector />
                    <NoteContainer email={session && session.user ? session.user.email : ""} />
                </Animated.View>
            </Animated.ScrollView>
            <BottomNavigation active={"note"} />

            <OptionModal
                visible={isTagModalVisible}
                onClose={() => setIsTagModalVisible(false)}
                options={tagOptions}
                onSelect={(tag) => setSelectedTag(tag)}
            />
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
    },
    titleText: {
        borderBottomWidth: 1,
        borderBottomColor: '#BBB'
    },
    descText: {
        fontWeight: '400',
        borderBottomWidth: 1,
        borderBottomColor: '#BBB',
        height: 100
    },
    genericBtn: {
        borderWidth: 1.5,
        borderColor: '#EEE',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 12,
        width: 150,
        alignItems: 'center'
    }
});
