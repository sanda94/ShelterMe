// ----------Third-party components and modules----------
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// ----------Custom components and modules----------
import {Animals, Animal} from '../screens';

// ----------Constants----------
import {Colors, Routes} from '../constants';

// Create animal navigation stack
const Stack = createNativeStackNavigator();

const AnimalNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: 'card',
        animationTypeForReplace: 'push',
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name={Routes.ANIMALS} component={Animals} />
      <Stack.Screen name={Routes.ANIMAL} component={Animal} />
    </Stack.Navigator>
  );
};

export default AnimalNavigator;
