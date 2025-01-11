import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Cash, leftArrow, MasterCard, PayPal, Visa} from '../../assets/images';
import {Colors} from '../../constants/colors';
import {Fonts} from '../../constants/fonts';
import useTypedSelector from '../../hooks/useTypedSelector';
import {selectedProducts} from '../../redux/products/productsSlice';
import {thousandSeparator} from '../../utils';
import CustomButton from '../../components/CustomButton';
import PaymentModal from '../../components/PaymentModal';

const paymentMethods = [
  {
    id: 1,
    image: Visa,
    cardNo: '**** **** **** 1234',
  },
  {
    id: 2,
    image: MasterCard,
    cardNo: '**** **** **** 5678',
  },
  {
    id: 3,
    image: PayPal,
    cardNo: '**** **** **** 9012',
  },

  {
    id: 4,
    image: Cash,
    cardNo: 'Cash on Delivery',
  },
];

const Payment = () => {
  const navigation = useNavigation();
  const cartProducts = useTypedSelector(selectedProducts);

  const [selectPayment, setSelectPayment] = useState(4);
  const [modalVisible, setModalVisible] = useState(false);

  const calculateTotal = () => {
    return cartProducts
      .reduce((total, product) => total + product.price * product.quantity, 0)
      .toFixed(2);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Top Bar */}
        <View style={styles.topBar}>
          <TouchableOpacity
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              } else {
                navigation.navigate('Home');
              }
            }}>
            <Image source={leftArrow} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.title}>Payment</Text>
          <Text style={styles.h}>H</Text>
        </View>
        <View style={styles.line} />

        <View style={styles.totalWrap}>
          <View style={styles.wrap}>
            <Text style={styles.subTotal}>Sub Total</Text>
            <Text style={styles.subPrice}>
              Rs {thousandSeparator(calculateTotal())}
            </Text>
          </View>
          <View style={styles.wrap}>
            <Text style={styles.subTotal}>Shipping</Text>
            <Text style={styles.subPrice}>Free</Text>
          </View>

          <View style={styles.wrap}>
            <Text style={styles.total}> Total</Text>
            <Text style={styles.price}>
              Rs {thousandSeparator(calculateTotal())}
            </Text>
          </View>

          <View style={styles.lineTwo} />
        </View>
        <View>
          <Text style={styles.paymentTitle}>Payment Methods</Text>
          <View style={styles.pWrap}>
            {paymentMethods.map(method => (
              <TouchableOpacity
                key={method.id}
                style={[
                  styles.paymentWrap,
                  selectPayment === method.id && styles.activeBorder,
                  method.id !== 4 && styles.disabledStyle,
                ]}
                onPress={() => {
                  if (method.id === 4) {
                    setSelectPayment(method.id);
                  }
                }}
                activeOpacity={method.id === 4 ? 0.6 : 1}>
                <Image
                  source={method.image}
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={[styles.payment, method.id !== 4 && {opacity: 0.5}]}
                />
                <Text
                  style={[
                    styles.cardNo,
                    // eslint-disable-next-line react-native/no-inline-styles
                    method.id !== 4 && {color: '#A8A8A9'},
                  ]}>
                  {method.cardNo}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.buttonFooter}>
          <CustomButton
            name="Continue"
            onPress={() => {
              if (selectPayment === 4) {
                setModalVisible(true);
              }
            }}
            // eslint-disable-next-line react-native/no-inline-styles
            loginStyle={{
              borderRadius: 10,
              paddingHorizontal: 20,
              paddingVertical: 13,
            }}
          />
        </View>
      </ScrollView>

      {/* Modal */}
      <PaymentModal visible={modalVisible} setModalVisible={setModalVisible} />
    </SafeAreaView>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY_BG,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  backIcon: {
    width: 10,
    height: 19,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 18,
    fontFamily: Fonts.SEMIBOLD,
    color: Colors.BLACK,
  },
  h: {
    opacity: 0,
  },
  line: {
    height: 1,
    backgroundColor: '#C6C6C6',
    marginTop: 6,
    marginBottom: 6,
  },
  totalWrap: {
    paddingHorizontal: 28,
    paddingVertical: 16,
  },
  wrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  subTotal: {
    color: '#A8A8A9',
    fontSize: 18,
    fontFamily: Fonts.MEDIUM,
  },
  subPrice: {
    color: '#A8A8A9',
    fontSize: 16,
    fontFamily: Fonts.MEDIUM,
  },
  total: {
    fontSize: 18,
    fontFamily: Fonts.MEDIUM,
    color: '#4C5059',
  },
  price: {
    fontSize: 16,
    fontFamily: Fonts.MEDIUM,
  },
  lineTwo: {
    height: 1,
    backgroundColor: '#C6C6C6',
  },
  payment: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
  paymentWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: '#F4F4F4',
    borderRadius: 8,
    marginBottom: 15,
    marginTop: 10,
  },
  paymentTitle: {
    fontSize: 18,
    fontFamily: Fonts.SEMIBOLD,
    color: Colors.BLACK,
    paddingHorizontal: 28,
    paddingTop: 16,
  },
  cardNo: {
    fontSize: 15,
    fontFamily: Fonts.MEDIUM,
    color: '#6E7179',
  },
  pWrap: {
    marginTop: 10,
    paddingHorizontal: 28,
  },

  activeBorder: {
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
  },

  disabledStyle: {
    backgroundColor: '#E0E0E0',
    borderColor: '#C6C6C6',
  },

  buttonFooter: {
    paddingHorizontal: 28,
    marginBottom: 20,
    marginTop: 10,
  },
});
