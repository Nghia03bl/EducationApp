import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as SQLite from 'expo-sqlite';
import Colors from '../Shared/Colors';

export default function SearchBar() {
  const [timKiem, setTimKiem] = useState('');
  const [ketQuaTimKiem, setKetQuaTimKiem] = useState([]);

  const xuLyTimKiem = async (vanBan) => {
    setTimKiem(vanBan);

    const db = SQLite.openDatabase('EducationDatabase.db');

    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM bang_tim_kiem WHERE ten LIKE ? LIMIT 10',
        [`%${vanBan}%`],
        (_, { rows }) => {
          const ketQua = [];
          for (let i = 0; i < rows.length; i++) {
            ketQua.push(rows.item(i));
          }
          setKetQuaTimKiem(ketQua);
        },
        (_, error) => {
          console.error('Lỗi tìm kiếm:', error);
        }
      );
    });
  };

  return (
    <View style={styles.container}>
      <Ionicons 
        name="search" 
        size={24} 
        color={Colors.gray} 
        style={{marginRight:10}} 
      /> 
      <TextInput 
        placeholder='Tìm kiếm' 
        value={timKiem}
        onChangeText={xuLyTimKiem}
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
    alignItems: 'center'
  }
});