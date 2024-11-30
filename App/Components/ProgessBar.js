import React, { useState, useEffect } from 'react';
import { View, Dimensions } from 'react-native';
import * as Progress from 'react-native-progress';
import * as SQLite from 'expo-sqlite';

export default function ProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const db = SQLite.openDatabase('EducationDatabase.db');

    const layTienDo = () => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT tien_do FROM bang_tien_do LIMIT 1', 
          [],
          (_, { rows }) => {
            if (rows.length > 0) {
              setProgress(rows.item(0).tien_do);
            }
          },
          (_, error) => {
            console.error('Lỗi lấy tiến độ:', error);
          }
        );
      });
    };

    layTienDo();
  }, []);

  return (
    <View>
      <Progress.Bar 
        progress={progress} 
        width={Dimensions.get('screen').width * 0.85} 
      />
    </View>
  );
}