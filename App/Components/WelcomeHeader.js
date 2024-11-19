import { View, Text, Image, StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

export default function WelcomeHeader() {
    const { userData } = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <View>
                <Text>Hello</Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                    {userData?.email || "User"}
                </Text>
            </View>

            {/* Kiểm tra xem userData có tồn tại và có thuộc tính picture hay không */}
            {userData?.picture ? (
                <Image source={{ uri: userData.picture }} style={{ width: 40, height: 40, borderRadius: 100 }} />
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
