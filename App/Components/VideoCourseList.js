import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';

export default function VideoCourseList() {
  const [courses, setCourses] = useState([]);
  const navigation = useNavigation();
  
  useEffect(() => {
    layDanhSachKhoaHoc();
  }, []);

  const layDanhSachKhoaHoc = () => {
    const db = SQLite.openDatabase('EducationDatabase.db');

    db.transaction(tx => {
      tx.executeSql(
        'SELECT id, ten, duong_dan_anh FROM bang_khoa_hoc_video',
        [],
        (_, { rows }) => {
          const danhSachKhoaHoc = [];
          for (let i = 0; i < rows.length; i++) {
            const item = rows.item(i);
            danhSachKhoaHoc.push({
              id: item.id,
              name: item.ten,
              image: item.duong_dan_anh
            });
          }
          setCourses(danhSachKhoaHoc);
        },
        (_, error) => {
          console.error('Lỗi lấy danh sách khóa học:', error);
        }
      );
    });
  };

  const onPressCourse = (item) => {
    navigation.navigate('CourseDetail', { courseId: item.id });
  };

  return (
    <View style={{ marginTop: 15 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 3 }}>
        Khóa Học Video
      </Text>
      <FlatList
        data={courses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onPressCourse(item)}>
            <Image
              source={{ uri: item.image }}
              style={{ width: 210, height: 120, marginRight: 10, borderRadius: 7 }}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}