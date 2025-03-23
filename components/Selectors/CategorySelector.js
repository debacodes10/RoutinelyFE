import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';

const categories = ['All', 'Design', 'Finance', 'Grocery', 'Games'];

export default function CategorySelector() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategoryButton
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedCategoryText
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
    backgroundColor: '#18191A',
  },
  categoryButton: {
    borderWidth: 1.5,
    borderColor: '#EEE',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 5,
  },
  selectedCategoryButton: {
    backgroundColor: '#EEE',
  },
  categoryText: {
    color: '#EEE',
    fontSize: 16,
  },
  selectedCategoryText: {
    color: '#18191A',
  },
});
