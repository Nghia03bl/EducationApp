import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import * as SQLite from 'expo-sqlite';
import { useNavigation } from '@react-navigation/native';
import Colors from '../Shared/Colors';

export default function CourseContent({ course, courseType }) {
    const navigation = useNavigation();
    const [userProgress, setUserProgress] = useState([]);
    const db = SQLite.openDatabase('EducationDatabase.db');

    // Lấy tiến trình học của người dùng
    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT courseContentId FROM UserProgress WHERE courseId = ?',
                [course.id],
                (_, { rows }) => {
                    const progress = [];
                    for (let i = 0; i < rows.length; i++) {
                        progress.push(rows.item(i));
                    }
                    setUserProgress(progress);
                },
                (_, error) => {
                    console.error('Lỗi khi tìm nạp tiến trình:', error);
                    return false;
                }
            );
        });
    }, [course.id]);

    // Kiểm tra xem nội dung đã học chưa
    const checkUserProgress = (contentId) => {
        return userProgress.find(item => item.courseContentId === contentId);
    }

    // Xử lý khi nhấn vào một chương
    const onChapterPress = (courseContent) => {
        if (courseType === 'text') {
            navigation.navigate('course-chapter', {
                courseContent: courseContent,
                courseId: course.id,
            });
        } else {
            navigation.navigate('play-video', {
                courseContent: courseContent,
                courseId: course.id,
            });
        }
    }

    return (
        <View style={{marginTop:10}}>
            <Text style={{fontWeight:'bold', fontSize:16}}>Nội Dung Khóa Học</Text>
            <FlatList
                style={{marginTop:10}}
                data={course?.Topic}
                renderItem={({item, index}) => (
                    <TouchableOpacity 
                        onPress={() => onChapterPress(item)} 
                        style={{
                            display:'flex',
                            flexDirection:'row',
                            backgroundColor:Colors.white,
                            marginBottom:5,
                            padding:13,
                            alignItems:'center',
                            borderRadius:5
                        }}
                    >
                        {checkUserProgress(item.id) ? (
                            <Ionicons 
                                name="checkmark-circle" 
                                size={24} 
                                color={Colors.green}
                                style={{marginRight:20}} 
                            />
                        ) : (
                            <Text style={{
                                fontWeight:'bold',
                                fontSize:20,
                                color:Colors.gray,
                                marginRight:20
                            }}>
                                {index + 1}
                            </Text>
                        )}
                        <Text style={{fontSize:15, fontWeight:'bold'}}>
                            {item.Topic || item.name}
                        </Text>
                        <Ionicons 
                            name="play-circle" 
                            size={24}
                            style={{position:'absolute', right:10}}
                            color={Colors.primary} 
                        />
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
}