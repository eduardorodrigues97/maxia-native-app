import * as React from 'react';
import Lottie from 'lottie-react-native';
import { View, Dimensions } from 'react-native';


export default SplashScreenFadeOut = ({onAnimationEnd, onAnimationStart, status}) => {
    // After the end of the animation, call onAnimationEnd
    const animationRef = React.useRef(null)
    const [isPlaying, setIsPlaying] = React.useState(false);

    const [minTimer, setMinTimer] = React.useState(false);

    React.useEffect(() => {
        setTimeout(() => {
            setMinTimer(true);
        }, 2000);
        return (()=>{})
    }, []);
    
    if ((status === 2) & (minTimer) & (!isPlaying)) {
        animationRef.current?.play();
        setTimeout(() => {
            onAnimationStart();
        }, 100);
    
        setTimeout(() => {
            onAnimationEnd();
        }, 2200);
        setIsPlaying(true);
    }

    return (
        <View style={{width: '100%', height: '100%', flex: 1}}>
        <Lottie
        ref={animationRef}
        style={{aspectRatio: Dimensions.aspectRatio, height: '100%'}}
        source={require('./assets/lottie-super-hq.json')}
        resizeMode='cover'
        loop={false}
        />
        </View>
    )
}
