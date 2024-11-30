import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import * as SQLite from 'expo-sqlite'
import { useNavigation } from '@react-navigation/native'
import Colors from '../Shared/Colors'

export default function CourseList({ type }) { 
    const [courseList, setCourseList] = useState([])
    const navigation = useNavigation()
    const db = SQLite.openDatabase('EducationDatabase.db')

    useEffect(() => {
        getCourseList()
    }, [type])

    const getCourseList = () => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT id, name, description, image, (SELECT COUNT(*) FROM Topics WHERE courseId = Courses.id) as topicCount FROM Courses WHERE type = ?',
                [type],
                (_, { rows }) => {
                    const courses = []
                    for (let i = 0; i < rows.length; i++) {
                        const item = rows.item(i)
                        courses.push({
                            id: item.id,
                            name: item.name,
                            description: item.description,
                            image: item.image,
                            Topic: Array(item.topicCount).fill(null)
                        })
                    }
                    setCourseList(courses)
                },
                (_, error) => {
                    console.error('Lỗi khi tải danh sách khóa học:', error)
                }
            )
        })
    }

    const onPressCourse = (course) => {
        navigation.navigate('course-detail', {
            courseData: course,
            courseType: 'text'
        })
    }

    return (
        <View style={{marginTop:10}}>
            <Text style={{
                fontSize:20,
                fontWeight:'bold',
                textTransform:'capitalize',
                marginBottom:3
            }}>
                {type} Course
            </Text>

            <FlatList
                data={courseList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                    <TouchableOpacity 
                        style={{
                            backgroundColor:Colors.white,
                            marginRight:10,
                            borderRadius:10
                        }} 
                        onPress={() => onPressCourse(item)}
                    >
                        <Image 
                            source={{uri: item.image}}  
                            style={{
                                width:180,
                                height:100,  
                                borderTopLeftRadius:10,
                                borderTopRightRadius:10,
                                resizeMode:'cover'
                            }} 
                        />
                        <View style={{padding:10}}>
                            <Text style={{fontWeight:'bold', fontSize:15}}>
                                {item.name}
                            </Text>
                            <Text style={{color:Colors.gray, fontWeight:'300'}}>
                                {item.Topic?.length || 0} Lessons
                            </Text>
                        </View>
                    </TouchableOpacity> 
                )}
            />
        </View>
    )
}