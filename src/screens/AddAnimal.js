// ----------Inbuilt components and modules----------
import {StyleSheet, SafeAreaView, ScrollView, Alert} from 'react-native';
import {useState, useEffect} from 'react';

// ----------Third-party components and modules----------
import axios from 'axios';
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import mime from 'mime';

// ----------Custom components and modules----------
import {AnimalType, AnimalImage, OtherInputs} from '../components/systems';
import requestLocationPermission from '../helpers/LocationAccess';

// ----------Global styles----------
import GlobalStyles from './styles/Global';

// ----------Constants----------
import {Colors} from '../constants/';

const AddAnimal = () => {
  // Form section status
  const [status, setStatus] = useState(0);

  // Location state
  const [location, setLocation] = useState(false);

  // Form data
  const [inputData, setInputData] = useState({
    type: '',
    image: '',
    imageSrc: '',
    name: '',
    location: '',
    age: 0,
    phone: 0,
    description: '',
  });

  // User state
  const [user, setUser] = useState('');

  // Read user data
  useEffect(() => {
    readData().then(data => setUser(data));
  }, []);

  // Get location
  useEffect(() => {
    getLocation();
  }, []);

  // Input validation
  const validate = values => {
    let error = '';

    if (!values.name) {
      error = 'Animal name is required!';
    } else if (!values.age) {
      error = 'Animal age required!';
    } else if (!values.location) {
      error = 'Animal location is required!';
    } else if (!values.phone) {
      error = 'Your phone number is required!';
    } else if (!values.description) {
      error = 'Animal description is required!';
    }

    return error;
  };

  // Read user data from async storage
  const readData = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      return userData != null ? JSON.parse(userData) : null;
    } catch (err) {
      console.log(err);
    }
  };

  // Check permissions and get Location
  const getLocation = () => {
    const result = requestLocationPermission();
    result.then(res => {
      console.log('res is:', res);
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            console.log(position);
            setLocation(position);
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
            setLocation(false);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!inputData.image) {
      return '';
    }

    // Set configuration
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    try {
      // Setup form data
      const formData = new FormData();
      formData.append('file', {
        uri: inputData.image,
        type: mime.getType(inputData.image),
        name: inputData.image.split('/').pop(),
      });
      const res = await axios.post('/upload', formData, config);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  // Handle animal submission
  const handleAnimalSubmit = async () => {
    // Validate
    if (validate(inputData)) {
      Alert.alert('Error', validate(inputData));
      return;
    }

    // File upload
    const imgUrl = await handleUpload();

    // Set configuration
    const config = {
      headers: {
        'content-type': 'application/json',
        token: 'Bearer ' + user.token,
      },
    };

    try {
      const {data} = await axios.post(
        '/animalFound',
        {
          name: inputData.name,
          description: inputData.description,
          location: inputData.location,
          phoneNumber: inputData.phone,
          age: inputData.age,
          type: inputData.type,
          longitude: location.coords.longitude,
          latitude: location.coords.latitude,
          file: inputData.image ? imgUrl : '',
        },
        config,
      );

      if (!data.errors) {
        Alert.alert('Success', 'Animal sucessfully submitted!');
        setInputData({
          type: '',
          image: '',
          imageSrc: '',
          name: '',
          location: '',
          age: 0,
          phone: 0,
          description: '',
        });
        setStatus(0);
      } else {
        console.log(data.errors.message);
        Alert.alert('Error', 'Animal submission failed');
      }
    } catch (err) {
      console.log(err);
    }

    console.log(inputData);
  };

  return (
    <SafeAreaView style={GlobalStyles.mainContainer}>
      <ScrollView
        style={GlobalStyles.scrollContainer}
        contentContainerStyle={GlobalStyles.scrollContentContainer}>
        {status == 0 ? (
          <AnimalType
            inputs={inputData}
            setInputs={val => setInputData(prev => ({...prev, type: val}))}
            updateStatus={val => setStatus(val)}
          />
        ) : null}
        {status == 1 ? (
          <AnimalImage
            inputs={inputData}
            setInputs={(val1, val2) =>
              setInputData(prev => ({...prev, image: val1, imageSrc: val2}))
            }
            updateStatus={val => setStatus(val)}
          />
        ) : null}
        {status == 2 ? (
          <OtherInputs
            inputs={inputData}
            setInputs={(key, val) =>
              setInputData(prev => ({...prev, [key]: val}))
            }
            updateStatus={val => setStatus(val)}
            addAnimal={() => handleAnimalSubmit()}
          />
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

// Internal styles
const Styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.light,
    paddingHorizontal: 20,
  },
  titleTxt: {
    fontSize: 25,
    fontWeight: 'bold',
    color: Colors.dark,
    marginBottom: 20,
  },
  animalTypeContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    marginVertical: 20,
  },
  imgContainer: {
    width: 200,
    height: 200,
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default AddAnimal;
