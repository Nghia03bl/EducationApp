import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, Dimensions } from 'react-native';
import * as SQLite from 'expo-sqlite';

export default function Slider() {
    const [slider, setSlider] = useState([]);

    useEffect(() => {
        layDuLieuSlider();
    }, []);

    const layDuLieuSlider = () => {
        const db = SQLite.openDatabase('EducationDatabase.db');

        db.transaction(tx => {
            tx.executeSql(
                'SELECT id, ten, duong_dan_anh FROM bang_slider',
                [],
                (_, { rows }) => {
                    const danhSachSlider = [];
                    for (let i = 0; i < rows.length; i++) {
                        const item = rows.item(i);
                        danhSachSlider.push({
                            id: item.id,
                            name: item.ten,
                            image: item.duong_dan_anh
                        });
                    }
                    setSlider(danhSachSlider);
                },
                (_, error) => {
                    console.error('Lỗi lấy dữ liệu slider:', error);
                }
            );
        });
    };

    return (
        <View style={{marginTop:10}}>
            <FlatList
                data={slider}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                    <View>
                        <Image 
                            source={{uri: item.image}} 
                            style={{
                                width: Dimensions.get('screen').width * 0.87,
                                height: 150,
                                borderRadius: 10,
                                marginRight: 15
                            }}
                        />
                    </View>
                )}
            />
        </View>
    );
}