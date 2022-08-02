import React from 'react';
import LottieView from 'lottie-react-native';
import { StyleSheet, View, useRef } from 'react-native';
import loadingAnimation from '../../assets/lottieAnimations/loadingScreen.json'; 

export default function Loading(props) {
    return (
      <View style={{
            ...props.style,
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: '85%',
            paddingBottom: '95%'
        }}>
        <LottieView
          autoPlay
          // ref={animation}
          style={{
            width: 200,
            height: 350,
            backgroundColor: '#f2f2f2',
          }}
          speed={0.75}
          // Find more Lottie files at https://lottiefiles.com/featured
          source={loadingAnimation}
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