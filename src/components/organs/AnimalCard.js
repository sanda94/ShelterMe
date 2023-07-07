// ----------Inbuilt components and modules----------
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

// ----------Third-party components and modules----------
import Icon from 'react-native-vector-icons/Ionicons';

// ----------Custom components and modules----------
import {IconButton} from '../tissues';

// ----------Constants----------
import {Colors} from '../../constants';

const AnimalCard = ({imgPath, name, location, type, viewFunc, delFunc}) => {
  return (
    <TouchableOpacity
      style={Styles.animalCardContainer}
      onPress={() => viewFunc()}>
      <Image style={Styles.animalImg} source={imgPath} />
      <View style={Styles.animalTxtContainer}>
        <Text style={Styles.animalName}>{name}</Text>
        <Text style={Styles.animalLocation}>
          <Icon name="location" size={15} color={Colors.dark} />
          {location}
        </Text>
        <TouchableOpacity
          style={Styles.viewAnimalBtn}
          onPress={() => viewFunc()}>
          <IconButton
            iconName="eye"
            bgColor={Colors.primary}
            iconColor={Colors.light}
            iconSize={22}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={Styles.deleteAnimalBtn}
          onPress={() => delFunc()}>
          <IconButton
            iconName="trash"
            bgColor={Colors.red}
            iconColor={Colors.light}
            iconSize={22}
          />
        </TouchableOpacity>
      </View>
      <Text style={Styles.animalType} onTouchStart={() => console.log('hello')}>
        <Icon name="paw" size={14} color={Colors.light} />
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </Text>
    </TouchableOpacity>
  );
};

// Internal styles
const Styles = StyleSheet.create({
  animalCardContainer: {
    position: 'relative',
    width: '100%',
    height: 230,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.lightGray,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
  },
  animalImg: {
    width: '100%',
    height: '70%',
    resizeMode: 'cover',
  },
  animalTxtContainer: {
    position: 'relative',
    width: '100%',
    height: '30%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 15,
  },
  animalName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.dark,
  },
  animalLocation: {
    fontSize: 12,
    color: Colors.dark,
    marginTop: 5,
  },
  viewAnimalBtn: {
    position: 'absolute',
    right: 60,
    bottom: 12,
  },
  deleteAnimalBtn: {
    position: 'absolute',
    right: 15,
    bottom: 12,
  },
  animalType: {
    position: 'absolute',
    top: 10,
    right: 10,
    fontSize: 12,
    backgroundColor: Colors.secondary,
    color: Colors.light,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
});
export default AnimalCard;
