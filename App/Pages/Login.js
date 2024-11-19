import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Fontisto } from '@expo/vector-icons';  // Fontisto vẫn được giữ

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Điều hướng đến màn hình Home khi nhấn "LOG IN"
    navigation.replace('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome</Text>
      <View style={styles.inputContainer}>
        <Fontisto name="email" size={20} color="#ccc" style={styles.icon} />
        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      </View>
      <View style={styles.inputContainer}>
        {/* Thay đổi biểu tượng "lock" thành "key" */}
        <Fontisto name="key" size={20} color="#ccc" style={styles.icon} />
        <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      </View>
      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>LOG IN</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 35,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    height: 50,
    width: '80%',
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  icon: {
    paddingLeft: 10,
  },
  loginButton: {
    backgroundColor: '#0C7DE4',
    padding: 15,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
