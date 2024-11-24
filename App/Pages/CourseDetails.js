import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../Shared/Colors';
import CourseContent from '../Components/CourseContent';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function CourseDetails() {
    const param = useRoute().params;
    const [course, setCourse] = useState(param?.courseData);

    const navigation = useNavigation();

    return (
        <View style={{ padding: 20, paddingTop: 50 }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back-sharp" size={24} color="black" />
            </TouchableOpacity>
            <View>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{course.name}</Text>
                <Text style={{ color: Colors.gray }}>By Tubeguruji</Text>
                <Image source={{ uri: course.image }} style={{ height: 150, marginTop: 10, borderRadius: 10 }} />
                <Text style={{ marginTop: 10, fontSize: 16, fontWeight: 'bold' }}>About Course</Text>
                <Text numberOfLines={4} style={{ color: Colors.gray }}>{course.description}</Text>
            </View>
            <CourseContent course={course} />
        </View>
    );
}
