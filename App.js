import React, { useState} from 'react';
import { View, Text, Animated, StyleSheet, TouchableOpacity, StatusBar, Image} from 'react-native'; 
import Reanimated, { withTiming, useSharedValue, useAnimatedStyle,} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';

const localImage = require('./assets/timogan.jpg');

const withActionLogger = (WrappedComponent) => {
  return (props) => {
    const handleClick = () => {
      console.log('Button clicked');
      props.onPress && props.onPress();
    };
    return <WrappedComponent {...props} onPress={handleClick} />;
  };
};

const CustomButton = withActionLogger(({ onPress, label, icon}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
    <Icon name={icon} size ={24} color="#fff" style ={styles.buttonIcon} />
    <Text style ={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
});
const App = () => {
  const [fadeAnim] = useState(new Animated.Value(1));

  const scale = useSharedValue(1);

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
 }).start();
  };
  const fadeIn  = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withTiming(scale.value, { duration: 300})}],
    };
  });
  const  toggleScale = () => {
    scale.value = scale.value === 1? 1.5 : 1; 
  };
    return (
      <View style = { styles.container}>
      <StatusBar barStyle = "light-content"/>
      <Text style={styles.title}>Timogan</Text>

      <Reanimated.View style = {[styles.imageBox, animatedStyle]}>
      <Image
        source={localImage}
        style={styles.image}
        />
        </Reanimated.View>

        <Animated.View style ={[styles.fadingBox, { opacity: fadeAnim}]}>
          <Text style={styles.boxText}>Winston Lloyd B. Timogan</Text>
          <Text style={styles.boxText}>BSIT-3</Text>
          </Animated.View>
          <CustomButton label= "Animate Image" onPress={toggleScale} icon="sync-outline" />

          <CustomButton label= "Fade In " onPress ={fadeIn} icon="eye-outline" />
          <CustomButton label= "Fade In " onPress ={fadeOut} icon="eye-off-outline" />

          </View>
    );
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#000',
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      color: '#ff0000',
      marginBottom: 40,
      textShadowColor: 'rgba(255, 0, 0, 0.5)',
      textShadowOffset: { width: 1, height: 1},
      textShadowRadius: 2, 
    },
    button: {
      flexDirection: 'row',
      backgroundColor: '#ff0000',
      paddingHorizontal: 25,
      paddingVertical: 14,
      borderRadius: 40,
      alignItems: 'center',
      marginVertical: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2},
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5, 
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: '600',
      marginLeft: 12, 
    },
    buttonIcon:{
      marginRight: 12,
    },
    fadingBox:{
      width: 250,
      height: 130,
      backgroundColor: '#333',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 25,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elavation: 7,
    },
    boxText: {
      color: '#ff0000',
      fontSize: 20,
      fontWeight: '700',
      textAlign: 'center',
    },
    imageBox: {
      width: 150,
      height: 150,
      backgroundColor: '#000',
      borderRadius: 80,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 25,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 5},
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 3,
    },
    image: {
      width: 150,
      height: 150,
      borderRadius: 75,
      borderwidth: 4,
      borderColor: '#ff0000',
    },
  });

  export default App;
