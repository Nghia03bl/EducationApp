import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import { SQLiteProvider } from 'expo-sqlite';

import { NavigationContainer } from '@react-navigation/native';

import HomeNavigation from './App/Navigations/HomeNavigation';

import { AuthProvider } from './App/Context/AuthContext';

export default function App() {
  return (
    // <View style={styles.container}>
    //   <NavigationContainer>
    //     <HomeNavigation />
    //   </NavigationContainer>
    // </View>
    <AuthProvider>
      <SQLiteProvider
        databaseName='EducationDatabase.db'
        assetSource={{
          assetId: require('../educationapp/assets/EducationDatabase.db'),
          forceOverwrite: true
        }}
      >
        <NavigationContainer>
          <HomeNavigation />
        </NavigationContainer>
      </SQLiteProvider>
    </AuthProvider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F6F8FC',
//   },
// });