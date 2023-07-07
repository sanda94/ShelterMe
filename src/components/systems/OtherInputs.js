// ----------Inbuilt components and modules----------
import {View, Text, TouchableOpacity} from 'react-native';

// ----------Third-party components and modules----------
import Icon from 'react-native-vector-icons/Ionicons';

// ----------Custom components and modules----------
import {TextBox} from '../cells';
import {IconButton} from '../tissues';

// ----------Custom styles----------
import GlobalStyles from './styles/Global';

// ----------Constants----------
import {Colors} from '../../constants';

const OtherInputs = ({updateStatus, inputs, setInputs, addAnimal}) => {
  console.log(inputs);

  return (
    <>
      <Text style={GlobalStyles.titleTxt}>
        <Icon name="paw" color={Colors.dark} size={35} />
        Animal Description
      </Text>
      <TextBox
        password={false}
        placeTxt="Enter Animal Suggestion Name"
        bgColor={Colors.lightGray}
        txtColor={Colors.dark}
        currVal={inputs.name}
        setInput={val => setInputs('name', val)}
      />
      <TextBox
        password={false}
        placeTxt="Enter Animal Suggestion Location"
        bgColor={Colors.lightGray}
        txtColor={Colors.dark}
        currVal={inputs.location}
        setInput={val => setInputs('location', val)}
      />
      <TextBox
        password={false}
        placeTxt="Enter Animal Suggestion Age (Months)"
        bgColor={Colors.lightGray}
        txtColor={Colors.dark}
        keyType="numeric"
        currVal={inputs.age}
        setInput={val => setInputs('age', val)}
      />
      <TextBox
        password={false}
        placeTxt="Enter Phone Number"
        bgColor={Colors.lightGray}
        txtColor={Colors.dark}
        keyType="numeric"
        currVal={inputs.phone}
        setInput={val => setInputs('phone', val)}
      />
      <TextBox
        password={false}
        placeTxt="Enter Animal Description"
        bgColor={Colors.lightGray}
        txtColor={Colors.dark}
        multi={true}
        currVal={inputs.description}
        setInput={val => setInputs('description', val)}
      />
      <View style={GlobalStyles.btnContainer}>
        <TouchableOpacity onPress={() => updateStatus(1)}>
          <IconButton
            iconName="arrow-back"
            bgColor={Colors.gray}
            iconColor={Colors.light}
            iconSize={35}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => addAnimal()}>
          <IconButton
            iconName="arrow-up"
            bgColor={Colors.dark}
            iconColor={Colors.light}
            iconSize={35}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};
export default OtherInputs;
