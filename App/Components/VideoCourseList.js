import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

export default function VideoCourseList({ courses }) {
  const navigation = useNavigation();
  
  const onPressCourse = (item) => {
    console.log('Course pressed:', item);
    navigation.navigate('CourseDetail', { courseId: item.id });
  };

  return (
    <View style={{ marginTop: 15 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 3 }}>Video Course</Text>
      <FlatList
        data={courses} // Truyền danh sách khóa học vào đây
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
