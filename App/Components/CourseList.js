import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import Colors from '../Shared/Colors';

export default function CourseList({ type, courses }) {
  
  // Định nghĩa hàm xử lý khi nhấn vào một course
  const onPressCourse = (item) => {
    console.log('Course pressed:', item);
    // Thực hiện các hành động khi nhấn vào course
  };

  return (
    <View style={{ marginTop: 10 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', textTransform: 'capitalize', marginBottom: 3 }}>
        {type} Course
      </Text>

      <FlatList
        data={courses} // Dữ liệu cần hiển thị
        keyExtractor={(item) => item.id.toString()} // Đảm bảo mỗi item có key duy nhất
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={{ backgroundColor: Colors.white, marginRight: 10, borderRadius: 10 }} 
            onPress={() => onPressCourse(item)}
          >
            <Image 
              source={{ uri: item.image }} 
              style={{ width: 180, height: 100, borderTopLeftRadius: 10, borderTopRightRadius: 10, resizeMode: 'cover' }} 
            />
            <View style={{ padding: 10 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{item.name}</Text>
              <Text style={{ color: Colors.gray, fontWeight: '300' }}>{item.Topic?.length} Lessons</Text> {/* Sửa lỗi length */}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
