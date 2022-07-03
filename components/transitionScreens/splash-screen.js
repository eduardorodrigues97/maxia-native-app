import React from 'react';
import LottieView from 'lottie-react-native';
import { StyleSheet, View, useRef } from 'react-native';
import splashAnimation from '../../assets/lottieAnimations/splashScreen.json'; 

export default function Splash(props) {
    return (
      <View style={{
            ...props.style,
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: '80%',
            backgroundColor: '#f2f2f2',
            paddingBottom: '95%'
        }}>
        <LottieView
          autoPlay
          // ref={animation}
          style={{
            width: 75,
            height: 50,
            backgroundColor: '#f2f2f2',
          }}
          speed={0.5}
          loop={false}
          // Find more Lottie files at https://lottiefiles.com/featured
          source={splashAnimation}
        />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    animationContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    }
  });