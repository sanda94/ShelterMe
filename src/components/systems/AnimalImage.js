// ----------Inbuilt components and modules----------
import {View, Text, Image, TouchableOpacity, Alert} from 'react-native';
import {useState} from 'react';

// ----------Third-party components and modules----------
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';

// ----------Custom components and modules----------
import {Tag, IconButton} from '../tissues';

// ----------Custom styles----------
import GlobalStyles from './styles/Global';

// ----------Constants----------
import {Colors, Images, Routes} from '../../constants';

const AnimalImage = ({updateStatus, inputs, setInputs}) => {
  console.log(inputs);
  // Handle camera
  const handleCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 250,
      cropping: true,
    })
      .then(image => {
        console.log(image);
        setInputs(image.path, 'camera');
      })
      .catch(err => {
        if (err.code === 'E_PICKER_CANCELLED') {
          // here the solution
          return false;
        }
      });
  };

  // Handle gallery
  const handleGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 250,
      cropping: true,
    })
      .then(image => {
        console.log(image);
        setInputs(image.path, 'gallery');
      })
      .catch(err => {
        if (err.code === 'E_PICKER_CANCELLED') {
          // here the solution
          return false;
        }
      });
  };

  return (
    <>
      <Text style={GlobalStyles.titleTxt}>
        <Icon name="paw" color={Colors.dark} size={35} />
        Animal Image
      </Text>
      <View style={GlobalStyles.typeContainer}>
        <View style={GlobalStyles.imgContainer}>
          <Image style={GlobalStyles.img} source={Images.camera} />
        </View>
        <Tag
          bgColor={
            inputs.imageSrc == 'camera' ? Colors.primary : Colors.secondary
          }
          tagName={inputs.imageSrc == 'camera' ? 'Captured' : 'Capture'}
          tagFunc={() => handleCamera()}
        />
      </View>
      <View style={GlobalStyles.typeContainer}>
        <Tag
          bgColor={
            inputs.imageSrc == 'gallery' ? Colors.primary : Colors.secondary
          }
          tagName={inputs.imageSrc == 'gallery' ? 'Choosed' : 'Gallery'}
          tagFunc={() => handleGallery()}
        />
        <View style={GlobalStyles.imgContainer}>
          <Image style={GlobalStyles.img} source={Images.gallery} />
        </View>
      </View>
      <View style={GlobalStyles.btnContainer}>
        <TouchableOpacity onPress={() => updateStatus(0)}>
          <IconButton
            iconName="arrow-back"
            bgColor={Colors.gray}
            iconColor={Colors.light}
            iconSize={35}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (inputs.image) {
              updateStatus(2);
            } else {
              Alert.alert('Error', 'Please select an animal image!');
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

export default AnimalImage;
