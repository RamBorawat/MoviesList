import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { constants } from '../Constant';

const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        const openHome = setTimeout(() => {
            navigation.navigate(constants.home)
        }, 2000);
        return () => openHome
    }, []);

    return (
        <View style={styles.container}>
            <Text>splash screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default SplashScreen;
