import React, { useEffect } from 'react';
import {
    View, StyleSheet, Text, Animated, Easing
} from 'react-native';
import { constants } from '../Constant';

const SplashScreen = ({ navigation }) => {
    let scaleValue = new Animated.Value(0);
    const cardScale = scaleValue.interpolate({
        inputRange: [0, 0.3, 1],
        outputRange: [.3, 4.1, 3.2],
    });
    let rotateValue = new Animated.Value(0);
    let rotation = rotateValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"] // degree of rotation
    });

    let transformStyle = { ...styles.card, transform: [{ scale: cardScale }, { rotate: rotation }] };
    let transformStyles = { ...styles.card, transform: [{ scale: cardScale }] };


    useEffect(() => {
        // const openHome = setTimeout(() => {
        //     navigation.navigate(constants.home)
        // }, 3000);
        // return () => openHome
    }, []);
    const bl = () => {
        scaleValue.setValue(0);
        Animated.timing(scaleValue, {
            toValue: 1,
            duration: 2500,
            easing: Easing.linear,
            useNativeDriver: true
        }
        ).start()

        Animated.timing(rotateValue, {
            toValue: 1,
            duration: 4000,
            easing: Easing.linear,
            useNativeDriver: true
        }).start();

        // cardAction();
    }
    bl()
    return (
        <View style={styles.container}>
            <Animated.View style={transformStyle}>

                <Text style={{ color: 'red', fontWeight: 'bold' }}>List of Movies </Text>
            </Animated.View>
            <Animated.View style={transformStyles}>
                <Text style={{ color: 'red', fontWeight: 'bold', margin: 60 }}>Let's Start  </Text>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default SplashScreen;
