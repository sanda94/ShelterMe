// ----------Inbuilt components and modules----------
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  ScrollView,
  Alert,
} from 'react-native';
import {useState} from 'react';

// ----------Third-party components and modules----------
import axios from 'axios';

// ----------Custom components and modules----------
import {TextBox} from '../components/cells';
import {PrimaryButton, TitleImage} from '../components/tissues';

// ----------Custom styles----------
import GlobalStyles from './styles/Global';

// ----------Constants----------
import {Colors, Routes} from '../constants';

const PasswordReset = ({navigation}) => {
  // Form inputs
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  console.log(inputs);

  // Input validation
  const validate = values => {
    let error = '';
    const regexe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      error = 'Email is required!';
    } else if (!regexe.test(values.email)) {
      error = 'This is not Valid email format!';
    } else if (!values.password) {
      error = 'Password is required!';
    }

    return error;
  };

  // Handle password reset
  const handlePasswordReset = async () => {
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
      const {data} = await axios.put(`/auth/updatePassword`, inputs, config);
      if (!data.errors) {
        Alert.alert('Success', 'Password sucessfully updated!');
        navigation.navigate(Routes.LOGIN);
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
          <Text style={GlobalStyles.titleTxt}>Reset</Text>
          <TitleImage />
        </View>
        <TextBox
          password={false}
          placeTxt="Enter Old Email Address"
          bgColor={Colors.lightGray}
          txtColor={Colors.dark}
          setInput={txt => setInputs(prev => ({...prev, email: txt}))}
        />
        <TextBox
          password={true}
          placeTxt="Enter New Password"
          bgColor={Colors.lightGray}
          txtColor={Colors.dark}
          setInput={txt => setInputs(prev => ({...prev, password: txt}))}
        />
        <View style={GlobalStyles.btnContainer}>
          <PrimaryButton
            bgColor={Colors.primary}
            txtColor={Colors.light}
            fullWidth={true}
            btnTxt="Reset"
            btnFunc={() => handlePasswordReset()}
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
    </SafeAreaView>
  );
};

export default PasswordReset;
