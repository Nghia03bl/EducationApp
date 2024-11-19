import { View, Text, FlatList, Ionicons, TouchableOpacity } from 'react-native';
import React from 'react';
import Colors from '../Shared/Colors';

export default function CourseContent({ course, userProgess, courseType }) {

  // Định nghĩa hàm onChapterPress (giả sử bạn muốn làm gì đó khi người dùng nhấn vào chapter)
  const onChapterPress = (item) => {
    console.log("Chapter pressed:", item);
    // Thực hiện hành động khi người dùng nhấn vào topic
  };

  // Định nghĩa hàm checkUserProgress (giả sử kiểm tra sự tiến bộ của người dùng)
  const checkUserProgress = (chapterId) => {
    // Kiểm tra sự tiến bộ của người dùng đối với chapter
    // Trả về true hoặc false
    return userProgess?.includes(chapterId); // Ví dụ giả sử userProgess là mảng chứa các id của những chapter đã hoàn thành
  };

  return (
    <View style={{ marginTop: 10 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 16 }}>CourseContent</Text>
      <FlatList
        style={{ marginTop: 10 }}
        data={course?.Topic}
        renderItem={({ item, index }) => (
          <TouchableOpacity 
            onPress={() => onChapterPress(item)} 
            style={{ display: 'flex', flexDirection: 'row', backgroundColor: Colors.white, marginBottom: 5, padding: 13, alignItems: 'center', borderRadius: 5 }}
          >
            { checkUserProgress(item.id) 
              ? <Ionicons name='checkmark-circle' size={24} color={Colors.green} style={{ marginRight: 20 }} />
              : <Text style={{ fontWeight: 'bold', fontSize: 20, color: Colors.gray, marginRight: 20 }}>{index + 1}</Text>
            }
            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{item.Topic ? item.Topic : item.name}</Text>
            <Ionicons name='play-circle' size={24} style={{ position: 'absolute', right: 10 }} color={Colors.primary} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
