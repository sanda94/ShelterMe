// ----------Inbuilt components and modules----------
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  Modal,
} from 'react-native';
import {useState} from 'react';

// ----------Third-party components and modules----------
import axios from 'axios';
import Dialog from 'react-native-dialog';

// ----------Custom components and modules----------
import {TextBox} from '../components/cells';
import {PrimaryButton, TitleImage} from '../components/tissues';

// ----------Custom styles----------
import GlobalStyles from './styles/Global';

// ----------Constants----------
import {Colors, Routes} from '../constants';

const Register = ({navigation}) => {
  // Form inputs
  const [inputs, setInputs] = useState({
    userName: '',
    email: '',
    password: '',
    repassword: '',
  });

  console.log(inputs);

  const [codeOk, setCodeOk] = useState(false);
  const [vCode, setVCode] = useState('');
  console.log(vCode);
  const [showAlert, setShowAlert] = useState(false);
  const [vtCode, setVtCode] = useState('');

  // Input validation
  const validate = values => {
    let error = '';
    const regexe = /^[a-z0-9]+@[a-z0-9]+\.[a-z]{2,3}$/;
    if (!values.email) {
      error = 'Username is required!';
    } else if (!values.email) {
      error = 'Email is required!';
    } else if (!regexe.test(values.email)) {
      error = 'This is not valid email format!';
    } else if (!values.password) {
      error = 'Password is required!';
    } else if (!values.repassword) {
      error = 'Password confirmation is required!';
    } else if (values.password !== values.repassword) {
      error = 'Both password should be matched!!';
    }

    return error;
  };

  // Handle submit
  const handleSubmit = async () => {
    // Validate
    if (validate(inputs)) {
      Alert.alert('Error', validate(inputs));
      return;
    }

    // Create verification code
    let verificationCode = Date.now();
    setVtCode(verificationCode);
    console.log(verificationCode);

    // Email the created verification code
    const result = await handleMailSend(verificationCode);
    if (result) {
      setShowAlert(true);
    } else {
      return;
    }
  };

  // Handle register
  const handleRegister = async () => {
    // Set configuration
    const config = {
      headers: {
        'content-type': 'application/json',
      },
    };

    try {
      const {data} = await axios.post(
        `/auth/create`,
        {
          userName: inputs.userName,
          emailAddress: inputs.email,
          password: inputs.password,
          userType: 'user',
        },
        config,
      );
      if (!data.errors) {
        Alert.alert('Success', 'User sucessfully registered!');
        navigation.navigate(Routes.LOGIN);
      } else {
        Alert.alert('Error', data.errors.message);
      }
    } catch (err) {
      console.log(err);
      Alert.alert('Error', err);
    }
  };

  const handleMailSend = async verificationCode => {
    const config = {
      headers: {
        'content-type': 'application/json',
      },
    };

    try {
      const {data} = await axios.post(
        `/send/email`,
        {
          email: inputs.email,
          verificationCode,
        },
        config,
      );
      if (data.errors) {
        Alert.alert('Error', data.errors.message);
        return false;
      } else {
        return true;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={GlobalStyles.mainContainer}>
      {showAlert ? (
        <View
          style={[
            GlobalStyles.scrollContainer,
            GlobalStyles.scrollContentContainer,
          ]}>
          <View style={GlobalStyles.titleContainer}>
            <Text style={GlobalStyles.titleTxt}>Enter Code</Text>
          </View>
          <TextBox
            password={false}
            placeTxt="Verification Code"
            bgColor={Colors.lightGray}
            txtColor={Colors.dark}
            setInput={txt => setVCode(txt)}
          />
          <PrimaryButton
            bgColor={Colors.primary}
            txtColor={Colors.light}
            fullWidth={true}
            btnTxt="Verify"
            btnFunc={() => {
              if (vCode != '') {
                if (parseInt(vtCode) === parseInt(vCode)) {
                  console.log('Part 1');
                  setShowAlert(false);
                  handleRegister();
                } else {
                  console.log('Part 2');
                  Alert.alert('Error', 'Invalid verification code!');
                  setShowAlert(false);
                }
              }
            }}
          />
        </View>
      ) : (
        <ScrollView
          style={GlobalStyles.scrollContainer}
          contentContainerStyle={GlobalStyles.scrollContentContainer}>
          <View style={GlobalStyles.titleContainer}>
            <Text style={GlobalStyles.titleTxt}>Register</Text>
            <TitleImage />
          </View>
          <TextBox
            password={false}
            placeTxt="Enter Username"
            bgColor={Colors.lightGray}
            txtColor={Colors.dark}
            setInput={txt => setInputs(prev => ({...prev, userName: txt}))}
          />
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
          <TextBox
            password={true}
            placeTxt="Re-Enter Password"
            bgColor={Colors.lightGray}
            txtColor={Colors.dark}
            setInput={txt => setInputs(prev => ({...prev, repassword: txt}))}
          />
          <View style={GlobalStyles.btnContainer}>
            <PrimaryButton
              bgColor={Colors.primary}
              txtColor={Colors.light}
              fullWidth={true}
              btnTxt="Register"
              btnFunc={() => handleSubmit()}
            />
            <PrimaryButton
              bgColor={Colors.secondary}
              txtColor={Colors.light}
              fullWidth={true}
              btnTxt="Login"
              btnFunc={() => navigation.navigate(Routes.LOGIN)}
            />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Register;
