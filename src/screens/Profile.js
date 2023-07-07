// ----------Inbuilt components and modules----------
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import {useState, useEffect} from 'react';

// ----------Third-party components and modules----------
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ----------Custom components and modules----------
import {PrimaryButton} from '../components/tissues';

// ----------Custom styles----------
import GlobalStyles from './styles/Global';

// ----------Constants----------
import {Colors, Images, Routes} from '../constants';

const Profile = ({navigation}) => {
  // User state
  const [user, setUser] = useState('');

  console.log(user);

  // Read user data
  useEffect(() => {
    readData().then(data => setUser(data));
  }, []);

  // Handle logout
  const logOut = async () => {
    try {
      // Remove user data from async storage
      await AsyncStorage.removeItem('user');
      navigation.navigate(Routes.LOGIN);
    } catch (err) {
      console.log(err);
    }
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

  return (
    <SafeAreaView style={GlobalStyles.mainContainer}>
      <ScrollView
        style={GlobalStyles.scrollContainer}
        contentContainerStyle={GlobalStyles.scrollContentContainer}>
        <Text style={Styles.titleTxt}>
          <Icon name="ribbon" color={Colors.dark} size={35} />
          My Profile
        </Text>
        <View style={Styles.topContainer}>
          <Image style={Styles.img} source={Images.user} />
        </View>
        <View style={Styles.bottomContainer}>
          <Text style={Styles.subTitleTxt}>
            <Icon name="person" color={Colors.dark} size={15} />
            {user ? user.data.userName : ''}
          </Text>
          <Text style={Styles.subTitleTxt}>
            <Icon name="mail" color={Colors.dark} size={15} />
            {user ? user.data.emailAddress : ''}
          </Text>
          <View style={{width: '40%'}}>
            <PrimaryButton
              bgColor={Colors.primary}
              txtColor={Colors.light}
              btnTxt="Logout"
              btnFunc={() =>
                Alert.alert('Logout', `You want to logout?`, [
                  {
                    text: 'Cancel',
                    style: 'cancel',
                  },
                  {
                    text: 'OK',
                    onPress: () => logOut(),
                  },
                ])
              }
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Internal styles
const Styles = StyleSheet.create({
  titleTxt: {
    marginTop: 20,
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.dark,
  },
  topContainer: {
    height: 190,
    width: 180,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    overflow: 'hidden',
    borderRadius: 15,
  },
  img: {
    height: '100%',
    width: '100%',
  },
  bottomContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subTitleTxt: {
    marginTop: 20,
    fontSize: 15,
    textAlign: 'center',
    color: Colors.dark,
  },
});

export default Profile;
