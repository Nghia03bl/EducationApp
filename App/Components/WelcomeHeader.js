import { View, Text, Image, StyleSheet } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';

import { useSQLiteContext, deleteDatabaseAsync } from 'expo-sqlite';

export default function WelcomeHeader() {
    // const { userData } = useContext(AuthContext);

    const db = useSQLiteContext();

    const [userData, setUserData] = useState({});

    useEffect(() => {
        const setUser = async() => {
            // const user = await db.getFirstAsync(
            //     'select * from Accounts where email = ?',
            //     ['test1']
            // );

            // // setUserData(user);
            // console.log('data',user);

            // const courses = await db.getAllAsync(
            //     'select * from Courses'
            // );

            // console.log('data', courses[0].courseDescription.split('\n'))
        }

        setUser();

    }, []);

    return (
        <View style={styles.container}>
            <View>
                <Text>Hello</Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                    {userData?.email || "User"}
                </Text>
            </View>

            {/* Kiểm tra xem userData có tồn tại và có thuộc tính avatar hay không */}
            {userData?.avatar ? (
                <Image source={{ uri: `data:image/png;base64,${userData.avatar}` }} style={{ width: 40, height: 40, borderRadius: 100 }} />
            ) : (
                <Image source={require('../../assets/default-avatar.jpg')} style={{ width: 40, height: 40, borderRadius: 100 }} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});
