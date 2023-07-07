// ----------Inbuilt components and modules----------
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  BackHandler,
  Alert,
} from 'react-native';
import {useState, useEffect} from 'react';

// ----------Third-party components and modules----------
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

// ----------Custom components and modules----------
import {TextBox} from '../components/cells';
import {TitleImage, IconButton, Tag} from '../components/tissues';
import {AnimalCard} from '../components/organs';

// ----------Custom styles----------
import GlobalStyles from './styles/Global';

// ----------Constants----------
import {Colors, Routes} from '../constants/';

const Animals = ({navigation}) => {
  // User state
  const [user, setUser] = useState('');

  // Animals states
  const [animals, setAnimals] = useState([]);
  const [filteredAnimals, setFilteredAnimals] = useState([]);

  // Search and filter states
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');

  // Loading state
  const [loading, setLoading] = useState(false);

  // Disable hardware back button
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    return () => backHandler.remove();
  }, []);

  // Read user data
  useEffect(() => {
    readData().then(data => {
      setUser(data);
    });
  }, []);

  // Load all animals when user data retrieving
  useEffect(() => {
    console.log('Start');
    handleAllAnimals();
  }, [user]);

  // Search animals
  useEffect(() => {
    const result = animals.filter(animal => {
      return (
        animal.type.toLowerCase().match(type.toLowerCase()) &&
        (animal.name.toLowerCase().match(search.toLowerCase()) ||
          animal.location.toLowerCase().match(search.toLowerCase()))
      );
    });
    setFilteredAnimals(result);
  }, [type, search]);

  // Read user data from async storage
  const readData = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      return userData != null ? JSON.parse(userData) : null;
    } catch (err) {
      console.log(err);
    }
  };

  // Delete image file
  const deleteFile = async file => {
    if (!file != '') {
      return;
    }

    try {
      const res = await axios.delete(`/delete/${file}`);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Handle all animals
  const handleAllAnimals = async () => {
    // Set configuration
    const config = {
      headers: {
        'content-type': 'application/json',
        token: 'Bearer ' + user.token,
      },
    };

    setLoading(true);
    try {
      const res = await axios.get(
        `/animalFound/getanimalbyuser?u=${user.data.userId}`,
        config,
      );
      setAnimals(res.data);
      setFilteredAnimals(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  // Handle delete
  const handleDelete = async (id, file) => {
    console.log(id);
    try {
      // Set configuration
      const config = {
        headers: {
          'content-type': 'application/json',
          token: 'Bearer ' + user.token,
        },
      };

      const {data} = await axios.delete(`/animalFound/${id}`, config);

      if (!data.errors) {
        // Delete image
        await deleteFile(file);
        Alert.alert('Success', 'Animal sucessfully deleted!');
        handleAllAnimals();
      } else {
        console.log(data.errors);
        Alert.alert('Error', 'Animal failed to delete!');
      }
    } catch (err) {
      console.log(err);
    }
  };

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

  return (
    <SafeAreaView style={Styles.mainContainer}>
      <View
        style={[GlobalStyles.titleContainer, {justifyContent: 'flex-start'}]}>
        <TitleImage />
        <Text style={[GlobalStyles.titleTxt, {fontSize: 20}]}>My Animals</Text>
        <TouchableOpacity
          style={Styles.iconBtnContainer}
          onPress={() =>
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
          }>
          <IconButton
            iconName="power"
            bgColor={Colors.primary}
            iconColor={Colors.light}
            iconSize={20}
          />
        </TouchableOpacity>
      </View>
      <TextBox
        password={false}
        placeTxt="Search Animals"
        bgColor={Colors.lightGray}
        txtColor={Colors.dark}
        setInput={txt => setSearch(txt)}
      />
      <View style={Styles.categoryContainer}>
        <Tag
          bgColor={type == '' ? Colors.primary : Colors.secondary}
          tagName="All"
          tagFunc={() => setType('')}
        />
        <Tag
          bgColor={type == 'dog' ? Colors.primary : Colors.secondary}
          tagName="Dogs"
          tagFunc={() => setType('dog')}
        />
        <Tag
          bgColor={type == 'cat' ? Colors.primary : Colors.secondary}
          tagName="Cats"
          tagFunc={() => setType('cat')}
        />
      </View>
      <ScrollView
        style={Styles.animalContainer}
        contentContainerStyle={[
          GlobalStyles.scrollContentContainer,
          {justifyContent: 'flex-start'},
        ]}>
        {filteredAnimals.length > 0
          ? filteredAnimals.map((item, index) => (
              <AnimalCard
                imgPath={{
                  uri: `http://143.198.141.133:3300/upload/${item.file}`,
                }}
                name={item.name}
                location={item.location}
                type={item.type}
                viewFunc={() =>
                  navigation.navigate(Routes.ANIMAL, {
                    animalId: item._id,
                    token: user.token,
                  })
                }
                delFunc={() =>
                  Alert.alert('Delete', `You want to delete, ${item.name}?`, [
                    {
                      text: 'Cancel',
                      style: 'cancel',
                    },
                    {
                      text: 'OK',
                      onPress: () => handleDelete(item._id, item.file),
                    },
                  ])
                }
                key={uuid.v4()}
              />
            ))
          : null}
        {filteredAnimals.length == 0 && !loading ? (
          <Text style={{fontSize: 15, color: Colors.dark}}>No Animals...</Text>
        ) : null}
        {loading ? (
          <Text style={{fontSize: 15, color: Colors.dark}}>Loading...</Text>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

// Internal styles
const Styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    backgroundColor: Colors.light,
    paddingTop: 15,
    paddingHorizontal: 20,
  },
  iconBtnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginLeft: 'auto',
  },
  categoryContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginTop: 10,
    borderRadius: 8,
  },
  animalContainer: {
    width: '100%',
    backgroundColor: Colors.light,
    marginTop: 20,
    borderRadius: 15,
  },
});

export default Animals;
