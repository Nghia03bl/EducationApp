import { View, Dimensions } from 'react-native';
import React from 'react';
import * as Progess from 'react-native-progress';

export default function ProgressBar({ progress }) {
  const safeProgress = Math.min(Math.max(progress, 0), 1);

  return (
    <View style={{ alignItems: 'center', marginVertical: 10 }}>
      <Progess.Bar
        progress={safeProgress}
        width={Dimensions.get('screen').width * 0.85}
        height={10}
        borderRadius={5}
      />
    </View>
  );
}
