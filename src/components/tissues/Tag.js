// ----------Inbuilt components and modules----------
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

// ----------Constants----------
import {Colors} from '../../constants';

const Tag = ({bgColor, tagName, tagFunc}) => {
  return (
    <TouchableOpacity
      style={[Styles.tagContainer, {backgroundColor: bgColor}]}
      onPress={() => tagFunc()}>
      <Text style={Styles.tagTxt}>{tagName}</Text>
    </TouchableOpacity>
  );
};

// Internal styles
const Styles = StyleSheet.create({
  tagContainer: {
    borderRadius: 5,
    padding: 8,
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  tagTxt: {
    fontSize: 12,
    color: Colors.light,
  },
});

export default Tag;
