import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function CourseChapter({ courseContent }) {
  const navigation = useNavigation();
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    if (courseContent) {
      setChapters(courseContent); // Giả sử courseContent là mảng các chương học
    }
  }, [courseContent]);

  return (
    <View style={{ padding: 20, marginTop: 25 }}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: 10 }}>
        <Ionicons name="arrow-back-sharp" size={24} color="black" />
      </TouchableOpacity>

      <View>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Course Chapters</Text>
        
        {/* Render danh sách các chương học */}
        {chapters && chapters.length > 0 ? (
          chapters.map((chapter, index) => (
            <TouchableOpacity key={index} style={{ marginVertical: 10 }}>
              <Text style={{ fontSize: 16, color: 'black' }}>{chapter.name}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={{ color: 'gray' }}>No chapters available</Text>
        )}
      </View>
    </View>
  );
}
