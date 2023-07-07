// ----------Inbuilt components and modules----------
import {StyleSheet} from 'react-native';

// ----------Constants----------
import Colors from '../../constants/Colors';

// Internal styles
const GlobalStyles = StyleSheet.create({
  mainContainer: {
    position: 'relative',
    height: '100%',
    backgroundColor: Colors.light,
    paddingVertical: 15,
  },
  scrollContainer: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 20,
  },
  scrollContentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  titleTxt: {
    fontSize: 35,
    fontWeight: 'bold',
    color: Colors.dark,
    marginHorizontal: 5,
  },
  btnContainer: {
    width: '100%',
  },
  headerContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    backgroundColor: Colors.lightGray,
    borderRadius: 10,
  },
  headerTxt: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 5,
    color: Colors.dark,
  },
});

export default GlobalStyles;
