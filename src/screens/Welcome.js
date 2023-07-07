// ----------Inbuilt components and modules----------
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Image,
  Text,
} from 'react-native';

// ----------Third-party components and modules----------
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ----------Custom components and modules----------
import {PrimaryButton} from '../components/tissues';

// ----------Custom styles----------
import GlobalStyles from './styles/Global';

// ----------Constants----------
import {Colors, Images, Routes} from '../constants';

const Welcome = ({navigation}) => {
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
        <View style={Styles.topContainer}>
          <Image style={Styles.img} source={Images.logo} />
        </View>
        <View style={Styles.bottomContainer}>
          <Text style={Styles.titleTxt}>Shelter Me</Text>
          <Text style={Styles.subTitleTxt}>
            <Icon name="paw" size={20} color={Colors.gray} />
            Just giving them a happy life!
          </Text>
          <View style={Styles.btnContainer}>
            <PrimaryButton
              bgColor={Colors.primary}
              txtColor={Colors.light}
              btnTxt="Get Started"
              btnFunc={() =>
                readData().then(data => {
                  if (data) {
                    navigation.navigate(Routes.HOME);
                  } else {
                    navigation.navigate(Routes.LOGIN);
                  }
                })
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
  topContainer: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    height: '100%',
    resizeMode: 'contain',
  },
  bottomContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleTxt: {
    marginTop: 20,
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.dark,
  },
  subTitleTxt: {
    marginTop: 20,
    fontSize: 15,
    textAlign: 'center',
    color: Colors.gray,
  },
  btnContainer: {
    width: '50%',
  },
});

export default Welcome;
