// ----------Inbuilt components and modules----------
import {StyleSheet} from 'react-native';

// ----------Constants----------
import {Colors} from '../../../constants';

// Internal styles
const GlobalStyles = StyleSheet.create({
  titleTxt: {
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.dark,
    marginBottom: 10,
  },
  typeContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    marginVertical: 10,
  },
  imgContainer: {
    width: 180,
    height: 180,
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  btnContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    marginTop: 20,
  },
});

export default GlobalStyles;
