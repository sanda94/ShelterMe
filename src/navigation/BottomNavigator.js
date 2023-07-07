// ----------Inbuilt components and modules----------
import {View} from 'react-native';
import {useState} from 'react';

// ----------Third-party components and modules----------
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useRoute, getFocusedRouteNameFromRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

// ----------Custom components and modules----------
import {AddAnimal, Profile} from '../screens/';
import {IconButton} from '../components/tissues';
import {AnimalNavigator} from './';

// ----------Constants----------
import {Colors, Routes} from '../constants';

// Create bottom tabs navigator
const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  // Add animal state
  const [addAnimal, setAddAnimal] = useState(false);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          position: 'relative',
          height: 60,
          backgroundColor: Colors.light,
          zIndex: 9000,
        },
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.dark,
        presentation: 'card',
        animationTypeForReplace: 'push',
        animation: 'slide_from_right',
        unmountOnBlur: true,
      }}
      initialRouteName={Routes.ANIMAL_NAVIGATOR}>
      <Tab.Screen
        name={Routes.ANIMAL_NAVIGATOR}
        component={AnimalNavigator}
        options={{
          tabBarIcon: ({color}) => <Icon name="home" color={color} size={30} />,
          unmountOnBlur: true,
        }}
        listeners={{
          tabPress: () => setAddAnimal(false),
        }}
      />
      <Tab.Screen
        name={Routes.ADD_ANIMAL}
        component={AddAnimal}
        options={{
          tabBarIcon: () => (
            <View style={{top: -20}}>
              <IconButton
                iconName="add-circle"
                bgColor={addAnimal ? Colors.primary : Colors.dark}
                iconColor={Colors.light}
                iconSize={35}
              />
            </View>
          ),
          tabBarLabelStyle: {
            display: 'none',
          },
          unmountOnBlur: true,
        }}
        listeners={{
          tabPress: () => setAddAnimal(true),
        }}
      />
      <Tab.Screen
        name={Routes.PROFILE}
        component={Profile}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="person" color={color} size={30} />
          ),
          unmountOnBlur: true,
        }}
        listeners={{
          tabPress: () => setAddAnimal(false),
        }}
      />
    </Tab.Navigator>
  );
};
export default BottomNavigator;
