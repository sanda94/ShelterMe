// ----------Inbuilt components and modules----------
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import {useEffect} from 'react';

// ----------Third-party components and modules----------
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

// ----------Constants----------
import {Colors} from '../../constants';

// Get screen height
const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const AnimalLocation = () => {
  const translateY = useSharedValue(0);

  const context = useSharedValue({y: 0});

  const myGestureHandler = useAnimatedGestureHandler({
    onStart: () => {
      context.value = {y: translateY.value};
    },
    onActive: e => {
      translateY.value = e.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, -SCREEN_HEIGHT / 1.5);
    },
    onEnd: () => {
      console.log('On End');
    },
  });

  useEffect(() => {
    translateY.value = withTiming(-SCREEN_HEIGHT / 6);
  }, []);

  const mapStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={myGestureHandler}>
      <Animated.View style={[Styles.mapContainer, mapStyle]}></Animated.View>
    </PanGestureHandler>
  );
};

// Internal styles
const Styles = StyleSheet.create({
  mapContainer: {
    height: SCREEN_HEIGHT / 1.5,
    width: '100%',
    backgroundColor: Colors.dark,
    position: 'absolute',
    top: SCREEN_HEIGHT,
    borderRadius: 20,
  },
});

export default AnimalLocation;
