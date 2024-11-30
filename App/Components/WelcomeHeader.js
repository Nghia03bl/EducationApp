import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import * as SQLite from 'expo-sqlite';

export default function WelcomeHeader() {
    const [userData, setUserData] = useState({
        email: 'Người dùng',
        avatar: null
    });

    useEffect(() => {
        layThongTinNguoiDung();
    }, []);

    const layThongTinNguoiDung = () => {
        const db = SQLite.openDatabase('EducationDatabase.db');

        db.transaction(tx => {
            tx.executeSql(
                'SELECT email, anh_dai_dien FROM bang_nguoi_dung WHERE dang_nhap_hien_tai = 1 LIMIT 1',
                [],
                (_, { rows }) => {
                    if (rows.length > 0) {
                        const nguoiDung = rows.item(0);
                        setUserData({
                            email: nguoiDung.email || 'Người dùng',
                            avatar: nguoiDung.anh_dai_dien
                        });
                    }
                },
                (_, error) => {
                    console.error('Lỗi lấy thông tin người dùng:', error);
                }
            );
        });
    };

    return (
        <View style={styles.container}>
            <View>
                <Text>Xin chào</Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                    {userData.email}
                </Text>
            </View>

            {userData.avatar ? (
                <Image 
                    source={{ uri: `data:image/png;base64,${userData.avatar}` }} 
                    style={{ width: 40, height: 40, borderRadius: 100 }} 
                />
            ) : (
                <Image 
                    source={require('../../assets/default-avatar.jpg')} 
                    style={{ width: 40, height: 40, borderRadius: 100 }} 
                />
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