import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

export default function EmptyList({param}) {
  console.log(param)
  return (   
    <View style={styles.container}>
      <LottieView 
        source={require('../../assets/animations/catanimation.json')}
        autoPlay
        loop
        style={styles.lottie}
      />
      <Text style={styles.title}>No items yet!</Text>
      <Text style={styles.subtitle}>Looks a little empty... go ahead and add something fun 🐾</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '80%',
    backgroundColor: '#18191A',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  lottie: {
    width: 350,
    height: 350,
  },
  title: {
    color: '#EEE',
    fontSize: 24,
    fontWeight: '600',
    marginTop: 12,
    fontFamily: 'Outfit',
  },
  subtitle: {
    color: '#AAA',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 4,
    fontFamily: 'Outfit',
  },
});
