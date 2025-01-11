import {
  View,
  Text,
  Modal,
  StyleSheet,
  Dimensions,
  Image,
  StatusBar,
} from 'react-native';
import React from 'react';
import {ThankYou} from '../assets/images';
import {Fonts} from '../constants/fonts';
import CustomButton from './CustomButton';
import {Colors} from '../constants/colors';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {clearCart} from '../redux/products/productsSlice';
import {clearProductSizeStore} from '../redux/productSize/productSizeSlice';

const PaymentModal = ({visible, setModalVisible}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const homeHandler = () => {
    setModalVisible(false);
    navigation.reset({
      index: 0,
      routes: [{name: 'Main'}],
    });
    dispatch(clearCart([]));
    dispatch(clearProductSizeStore([]));
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="rgba(0, 0, 0, 0.5)"
      />
      <View style={styles.modalView}>
        <View style={styles.mainView}>
          <Image source={ThankYou} style={styles.thank} />

          <Text style={styles.payment}>Payment done successfully</Text>

          <View style={styles.buttonContainer}>
            <CustomButton
              name="Go to home"
              loginStyle={styles.homeWrap}
              buttonStyle={styles.homeText}
              onPress={() => {
                homeHandler();
              }}
            />
            <CustomButton
              name="Track Order"
              loginStyle={styles.trackWrap}
              buttonStyle={styles.trackText}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('History');
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PaymentModal;

const styles = StyleSheet.create({
  modalView: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    position: 'absolute',
    top: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainView: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 15,
    alignItems: 'center',
    elevation: 5,
  },
  thank: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginRight: 10,
  },
  payment: {
    fontSize: 14,
    fontFamily: Fonts.SEMIBOLD,
    color: '#222',
    marginBottom: 25,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
    gap: 15,
  },

  homeWrap: {
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 0,
    backgroundColor: 'transparent',
    borderColor: Colors.PRIMARY,
    borderWidth: 1,
  },
  homeText: {
    fontSize: 12,
    color: Colors.PRIMARY,
    fontFamily: Fonts.REGULAR,
  },
  trackWrap: {
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 0,
  },
  trackText: {
    fontSize: 12,
  },
});
