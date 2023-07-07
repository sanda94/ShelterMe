// ----------Inbuilt components and modules----------
import {StyleSheet, View} from 'react-native';

// ----------Third-party components and modules----------
import Icon from 'react-native-vector-icons/Ionicons';

const IconButton = ({iconName, bgColor, iconColor, iconSize}) => {
  return (
    <View style={[Styles.iconBtn, {backgroundColor: bgColor}]}>
      <Icon name={iconName} size={iconSize} color={iconColor} />
    </View>
  );
};

// Internal styles
const Styles = StyleSheet.create({
  iconBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderRadius: 5,
  },
});

export default IconButton;
