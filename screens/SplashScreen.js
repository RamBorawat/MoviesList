import React, { useEffect } from 'react';
import {
    View, StyleSheet, Text, Animated, Easing, Dimensions
} from 'react-native';
import { constants } from '../Constant';

const SplashScreen = ({ navigation }) => {
    let yTranslate = new Animated.Value(0);
    let scaleValue = new Animated.Value(0);
    const cardScale = scaleValue.interpolate({
        inputRange: [0, 0.3, 1],
        outputRange: [.3, 3.1, 2.2],
    });
    let rotateValue = new Animated.Value(0);
    let rotation = rotateValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"] // degree of rotation
    });
    const { height, width } = Dimensions.get("window");
    let negativeHeight = -height + 20;

    let modalMoveY = yTranslate.interpolate({
        inputRange: [0, 1],
        outputRange: [0, negativeHeight]
    });


    let transformStyle = { ...styles.card, transform: [{ scale: cardScale }, { rotate: rotation }] };

    let translateStyleY = { transform: [{ translateY: modalMoveY }, { scale: cardScale },] }
    useEffect(() => {
        const openHome = setTimeout(() => {
            navigation.replace(constants.home)
        }, 4000);
        return () => openHome
    }, []);
    const animations = () => {
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
        Animated.timing(yTranslate, {
            toValue: .5,
            duration: 4000,
            easing: Easing.linear,
            useNativeDriver: true
        }).start();

    }
    animations()
    return (
        <View style={styles.container}>
            <Animated.View style={transformStyle}>
                <Text style={{ color: 'red', fontWeight: 'bold' }}>List of Movies </Text>
            </Animated.View>
            <Animated.View style={[styles.containers, {
                height: height,
                width: width,
                bottom: -height,
                alignItems: 'center'
            }, translateStyleY]} >
                <Text style={{ color: 'orange', fontWeight: 'bold', margin: 60, fontSize: 20 }}>Let's Start  </Text>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containers: {
        position: "absolute",
        // backgroundColor: "#fff"
    }

})

export default SplashScreen;
