import { View, TextInput, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Fontisto } from '@expo/vector-icons';

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={styles.container}>
      <Fontisto name="search" size={20} color="#ccc" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Search"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}  // Cập nhật giá trị khi người dùng nhập
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    elevation: 2,
    marginTop: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  icon: {
    paddingLeft: 10,
  },
});
