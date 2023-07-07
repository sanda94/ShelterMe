// ----------Inbuilt components and modules----------
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useState, useEffect} from 'react';

// ----------Third-party components and modules----------
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

// ----------Custom styles----------
import GlobalStyles from './styles/Global';

// ----------Constants----------
import {Colors, Routes} from '../constants';

const Animal = ({navigation, route}) => {
  // Animal state
  const [animal, setAnimal] = useState('');

  // Route params
  const {animalId, token} = route.params;

  // Load animal data
  useEffect(() => {
    handleAnimal();
  }, []);

  // Handle animal
  const handleAnimal = async () => {
    // Set configuration
    const config = {
      headers: {
        'content-type': 'application/json',
        token: 'Bearer ' + token,
      },
    };

    try {
      const res = await axios.get(`/animalFound/${animalId}`, config);
      setAnimal(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={Styles.mainContainer}>
        <TouchableOpacity
          style={GlobalStyles.headerContainer}
          onPress={navigation.goBack}>
          <Icon name="arrow-back" size={25} color={Colors.dark} />
          <Text style={GlobalStyles.headerTxt}>Details</Text>
        </TouchableOpacity>
        <ScrollView
          style={GlobalStyles.scrollContainer}
          contentContainerStyle={[
            GlobalStyles.scrollContentContainer,
            {justifyContent: 'flex-start'},
          ]}>
          <View style={Styles.topContainer}>
            <Image
              style={Styles.img}
              source={{
                uri: `http://143.198.141.133:3300/upload/${animal.file}`,
              }}
            />
          </View>
          <View style={Styles.bottomContainer}>
            <Text style={Styles.animalName}>{animal ? animal.name : null}</Text>
            <View style={Styles.animalOtherInfoContainer}>
              <Text style={Styles.animalOtherInfo}>
                <Icon name="location" size={15} color={Colors.light} />
                {animal ? animal.location : null}
              </Text>
              <Text style={Styles.animalOtherInfo}>
                <Icon name="paw" size={15} color={Colors.light} />
                {animal
                  ? animal.type.charAt(0).toUpperCase() + animal.type.slice(1)
                  : null}
              </Text>
              <Text style={Styles.animalOtherInfo}>
                <Icon name="calendar" size={15} color={Colors.light} />
                {animal ? animal.age : null} Months
              </Text>
            </View>
            <Text style={Styles.mobileNumber}>
              <Icon name="call" size={15} color={Colors.dark} />
              {animal ? animal.phoneNumber : null}
            </Text>
            <View style={{marginTop: 10}}>
              <Text style={Styles.animalDesc}>
                {animal ? animal.description : null}
              </Text>
            </View>
          </View>
        </ScrollView>
        {/* <AnimalLocation /> */}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

// Internal styles
const Styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    backgroundColor: Colors.light,
    paddingTop: 15,
  },
  topContainer: {
    width: '100%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 15,
  },
  img: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  bottomContainer: {
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
    backgroundColor: Colors.lightGray,
  },
  animalName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.dark,
  },
  animalOtherInfoContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginTop: 10,
  },
  animalOtherInfo: {
    fontSize: 13,
    backgroundColor: Colors.secondary,
    color: Colors.light,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 5,
    marginRight: 5,
  },
  mobileNumber: {
    fontSize: 14,
    color: Colors.dark,
    marginTop: 15,
  },
  animalDesc: {
    fontSize: 14,
    color: Colors.dark,
    textAlign: 'justify',
  },
});

export default Animal;
