// ----------Inbuilt components and modules----------
import {View, Text, Image, TouchableOpacity, Alert} from 'react-native';
import {useState} from 'react';

// ----------Third-party components and modules----------
import Icon from 'react-native-vector-icons/Ionicons';

// ----------Custom components and modules----------
import {Tag, IconButton} from '../tissues';

// ----------Custom styles----------
import GlobalStyles from './styles/Global';

// ----------Constants----------
import {Colors, Images, Routes} from '../../constants';

const AnimalType = ({updateStatus, inputs, setInputs}) => {
  console.log(inputs);

  return (
    <>
      <Text style={GlobalStyles.titleTxt}>
        <Icon name="paw" color={Colors.dark} size={35} />
        Animal Type
      </Text>
      <View style={GlobalStyles.typeContainer}>
        <View style={GlobalStyles.imgContainer}>
          <Image style={GlobalStyles.img} source={Images.dog} />
        </View>
        <Tag
          bgColor={inputs.type == 'dog' ? Colors.primary : Colors.secondary}
          tagName={inputs.type == 'dog' ? 'Selected' : 'Select'}
          tagFunc={() => setInputs('dog')}
        />
      </View>
      <View style={GlobalStyles.typeContainer}>
        <Tag
          bgColor={inputs.type == 'cat' ? Colors.primary : Colors.secondary}
          tagName={inputs.type == 'cat' ? 'Selected' : 'Select'}
          tagFunc={() => setInputs('cat')}
        />
        <View style={GlobalStyles.imgContainer}>
          <Image style={GlobalStyles.img} source={Images.cat} />
        </View>
      </View>
      <View style={GlobalStyles.btnContainer}>
        <TouchableOpacity
          onPress={() => {
            if (inputs.type) {
              updateStatus(1);
            } else {
              Alert.alert('Error', 'Please select an animal type!');
            }
          }}>
          <IconButton
            iconName="arrow-forward"
            bgColor={Colors.dark}
            iconColor={Colors.light}
            iconSize={35}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default AnimalType;
