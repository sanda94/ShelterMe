// ----------Inbuilt components and modules----------
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {useState, useEffect} from 'react';

// ----------Third-party components and modules----------
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ----------Custom components and modules----------
import {TextBox} from '../components/cells';
import {PrimaryButton, TitleImage} from '../components/tissues';

// ----------Custom styles----------
import GlobalStyles from './styles/Global';

// ----------Constants----------
import {Colors, Routes} from '../constants/';

const Login = ({navigation}) => {
  // Form inputs
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  // Read user data
  // useEffect(() => {
  //   readData().then(data => {
  //     if (data) {
  //       navigation.navigate(Routes.HOME);
  //     }
  //   });
  // }, []);

  // Store user data to async storage
  const storeData = async value => {
    try {
      const userData = JSON.stringify(value);
      await AsyncStorage.setItem('user', userData);
    } catch (err) {
      console.log(err);
    }
  };

  // Input validation
  const validate = values => {
    let error = '';
    const regexe = /^[a-z0-9]+@[a-z0-9]+\.[a-z]{2,3}$/i;
    if (!values.email) {
      error = 'Email is required!';
    } else if (!regexe.test(values.email)) {
      error = 'This is not Valid email format!';
    } else if (!values.password) {
      error = 'Password is required!';
    }

    return error;
  };

  // Handle login
  const handleLogin = async () => {
    // Validate
    if (validate(inputs)) {
      Alert.alert('Error', validate(inputs));
      return;
    }

    // Set configuration
    const config = {
      headers: {
        'content-type': 'application/json',
      },
    };

    try {
      const {data} = await axios.post(`/auth/userLogin`, inputs, config);
      if (!data.errors) {
        // Save user data
        storeData(data);
        navigation.navigate(Routes.HOME);
      } else {
        Alert.alert('Error', data.errors.message);
      }
    } catch (err) {
      console.log(err);
      Alert.alert('Error', err);
    }
  };

  return (
    <SafeAreaView style={GlobalStyles.mainContainer}>
      <ScrollView
        style={GlobalStyles.scrollContainer}
        contentContainerStyle={GlobalStyles.scrollContentContainer}>
        <View style={GlobalStyles.titleContainer}>
          <Text style={GlobalStyles.titleTxt}>Login</Text>
          <TitleImage />
        </View>
        <TextBox
          password={false}
          placeTxt="Enter Email Address"
          bgColor={Colors.lightGray}
          txtColor={Colors.dark}
          setInput={txt => setInputs(prev => ({...prev, email: txt}))}
        />
        <TextBox
          password={true}
          placeTxt="Enter Password"
          bgColor={Colors.lightGray}
          txtColor={Colors.dark}
          setInput={txt => setInputs(prev => ({...prev, password: txt}))}
        />
        <View style={GlobalStyles.btnContainer}>
          <PrimaryButton
            bgColor={Colors.primary}
            txtColor={Colors.light}
            fullWidth={true}
            btnTxt="Login"
            btnFunc={() => handleLogin()}
          />
          <PrimaryButton
            bgColor={Colors.secondary}
            txtColor={Colors.light}
            fullWidth={true}
            btnTxt="Register"
            btnFunc={() => navigation.navigate(Routes.REGISTER)}
          />
        </View>
        <TouchableOpacity
          style={{marginTop: 20}}
          onPress={() => navigation.navigate(Routes.PASSWORD_RESET)}>
          <Text style={Styles.passResetText}>Forgot Password?</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

// Internal styles
const Styles = StyleSheet.create({
  passResetText: {
    fontSize: 14,
    color: Colors.dark,
  },
});

export default Login;
