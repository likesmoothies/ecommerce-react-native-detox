import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {
  AddTwoIcon,
  DeleteIcon,
  EditTwoIcon,
  EmptyCart,
  leftArrow,
  LocationIcon,
} from '../../assets/images';
import CustomButton from '../../components/CustomButton';
import RatingStar from '../../components/RatingStar';
import {Colors} from '../../constants/colors';
import {Fonts} from '../../constants/fonts';
import useTypedSelector from '../../hooks/useTypedSelector';
import {selectAddress} from '../../redux/address/addressSlice';
import {
  removeProduct,
  selectedProducts,
} from '../../redux/products/productsSlice';
import {selectProductSize} from '../../redux/productSize/productSizeSlice';
import {thousandSeparator} from '../../utils';

const Cart = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  const cartProducts = useTypedSelector(selectedProducts);
  const addressList = useTypedSelector(selectAddress);
  const productSize = useTypedSelector(selectProductSize);
  const {comeFromProductDetail} = route.params || {};

  const [address, setAddress] = useState('');

  useEffect(() => {
    if (addressList.length) {
      const defaultAddress = addressList.find(add => add.isDefault);
      setAddress(defaultAddress || {});
    }
  }, [addressList, comeFromProductDetail]);

  const handleRemoveProduct = id => {
    dispatch(removeProduct(id));
  };

  const calculateTotal = () => {
    return cartProducts
      .reduce((total, product) => total + product.price * product.quantity, 0)
      .toFixed(2);
  };

  const renderItem = ({item}) => {
    const findProductSize = productSize.find(prSize => prSize.id === item.id);
    return (
      <>
        <View style={styles.productContainer}>
          <View style={styles.prWrap}>
            <View style={styles.innerWrapTwo}>
              {/* take 30% */}
              <Image source={item?.image} style={styles.productImage} />
              {/* Take 70% */}
              <View style={styles.productDetails}>
                <Text style={styles.productTitle}>{item?.name}</Text>
                <View style={styles.variantWrap}>
                  <Text style={styles.variantTitle}>Variations:</Text>
                  <Text style={styles.variantValue}>
                    {findProductSize?.size}
                  </Text>
                </View>

                <View style={styles.ratingWrap}>
                  <Text style={styles.rating}>{item?.rating}</Text>

                  <RatingStar rating={item?.rating} size={12} />
                </View>

                <View style={styles.priceWrap}>
                  <Text style={styles.productPrice}>
                    Rs: {thousandSeparator(item?.price)}
                  </Text>
                  <View>
                    <Text style={styles.off}>upto {item?.off}</Text>
                    <Text style={styles.offPrice}>
                      {thousandSeparator(item.oldPrice)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={[styles.lineTwo]} />
            <View style={styles.orderWrap}>
              <Text style={styles.totalOr}>
                Total Orders ({item?.quantity}) :
              </Text>
              <View style={styles.deleteWrap}>
                <Text style={styles.totalOrderPrice}>
                  Rs: {thousandSeparator(item?.quantity * item?.price)}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert(
                      'Confirm deletion',
                      'Are you sure you want to delete this product?',
                      [
                        {
                          text: 'Cancel',
                          style: 'cancel',
                        },
                        {
                          text: 'OK',
                          onPress: () => handleRemoveProduct(item.id),
                        },
                      ],
                    );
                  }}>
                  <Image source={DeleteIcon} style={styles.deleteIcon} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </>
    );
  };

  const itItAddress =
    address?.address && address?.city && address?.state && address?.postal;

  return (
    <SafeAreaView
      // eslint-disable-next-line react-native/no-inline-styles
      style={[styles.container, comeFromProductDetail && {marginTop: 24}]}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={Colors.PRIMARY_BG}
      />
      <FlatList
        data={cartProducts}
        keyExtractor={item => item?.id?.toString()}
        ListHeaderComponent={
          <View>
            {/* Top Bar */}
            <View style={styles.topBar}>
              <TouchableOpacity
                onPress={() => {
                  navigation.reset({
                    index: 0,
                    routes: [{name: 'Main'}],
                  });
                }}>
                <Image source={leftArrow} style={styles.backIcon} />
              </TouchableOpacity>
              <Text style={styles.title}>Shopping Bag</Text>
              <Text style={styles.h}>H</Text>
            </View>

            <View style={styles.line} />

            {cartProducts.length > 0 && (
              <View>
                <View style={styles.address}>
                  <Image source={LocationIcon} style={styles.location} />
                  <Text style={styles.addressTitle}>Delivery Address</Text>
                </View>

                <View style={styles.addressWrap}>
                  <View style={styles.addAddress}>
                    <View style={styles.innerWrap}>
                      <Text style={styles.tagTitle}>Address:</Text>
                      {itItAddress && (
                        <TouchableOpacity
                          style={styles.editIconWrap}
                          onPress={() =>
                            navigation.navigate('CreateAddress', {
                              address: address,
                              comeFromCart: true,
                            })
                          }>
                          <Image source={EditTwoIcon} style={styles.editIcon} />
                        </TouchableOpacity>
                      )}
                    </View>

                    {itItAddress && (
                      <Text style={styles.tagTitleTwo}>
                        {address?.address}, {address?.city}, {address?.state},{' '}
                        {address?.postal}
                      </Text>
                    )}
                    <View style={styles.contactWrap}>
                      <Text style={styles.tagTitleTwo}>Contact:</Text>
                      <Text style={styles.tagTitleTwo}>{address?.phone}</Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    style={styles.addressTwo}
                    onPress={() => navigation.navigate('AddressList')}>
                    <Image source={AddTwoIcon} style={styles.addIcon} />
                  </TouchableOpacity>
                </View>

                <View style={styles.shoppingWrap}>
                  <Text style={styles.shoppingTitle}>Shopping List</Text>
                </View>
              </View>
            )}

            <View
              style={[
                styles.categories,
                comeFromProductDetail && styles.activeCategories,
              ]}>
              <FlatList
                data={cartProducts}
                keyExtractor={item => item?.id?.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.productList}
                ListEmptyComponent={
                  <>
                    <Text style={styles.emptyText}>
                      Your shopping bag is empty
                    </Text>
                    <Image source={EmptyCart} style={styles.emptyCart} />
                  </>
                }
              />
            </View>
          </View>
        }
        showsVerticalScrollIndicator={false}
        renderItem={null} // Since categories are part of ListHeaderComponent
        contentContainerStyle={styles.contentContainer}
      />

      {cartProducts.length > 0 && (
        <View
          style={[
            styles.addButton,
            comeFromProductDetail && styles.activeAddButton,
          ]}>
          <View style={styles.footer}>
            <View style={styles.innerFooter}>
              <View style={styles.foFirst}>
                <View style={styles.pkrWrap}>
                  <Text style={styles.pkr}>PKR</Text>
                  <Text style={styles.footerPrice}>
                    {thousandSeparator(calculateTotal())}
                  </Text>
                </View>
                <Text style={styles.footerDetail}> Total</Text>
              </View>

              <View style={styles.buttonFooter}>
                <CustomButton
                  name="Proceed to Checkout"
                  onPress={() => {
                    if (address?.phone) {
                      navigation.navigate('Checkout');
                    } else {
                      Alert.alert(
                        'No Address',
                        'Please add an address to proceed',
                      );
                      return;
                    }
                  }}
                  // eslint-disable-next-line react-native/no-inline-styles
                  loginStyle={{marginTop: 0}}
                  // eslint-disable-next-line react-native/no-inline-styles
                  buttonStyle={{fontSize: 15}}
                />
              </View>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY_BG,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 12,
    paddingHorizontal: 16,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: Fonts.MEDIUM,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  emptyCart: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 20,
    tintColor: Colors.PRIMARY,
  },
  backIcon: {
    width: 10,
    height: 19,
    resizeMode: 'contain',
  },
  categories: {
    paddingBottom: 200,
  },
  activeCategories: {
    paddingBottom: 140,
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
  address: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  location: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
  },
  addressTitle: {
    fontSize: 14,
    fontFamily: Fonts.SEMIBOLD,
    color: Colors.BLACK,
    marginLeft: 6,
  },
  addressWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 15,
    marginTop: 3,
  },
  addAddress: {
    width: '77%',
    backgroundColor: Colors.WHITE,
    borderRadius: 6,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    height: 75,
  },
  innerWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  editIconWrap: {
    position: 'absolute',
    right: 0,
    top: -3,
  },
  editIcon: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
  },
  addressTwo: {
    width: '20%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    borderRadius: 6,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    height: 75,
  },
  addIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  tagTitle: {
    fontSize: 12,
    fontFamily: Fonts.MEDIUM,
    color: Colors.BLACK,
    marginBottom: 6,
  },
  tagTitleTwo: {
    fontSize: 12,
    fontFamily: Fonts.REGULAR,
    color: Colors.BLACK,
  },
  contactWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  shoppingWrap: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 12,
  },
  shoppingTitle: {
    fontSize: 14,
    fontFamily: Fonts.SEMIBOLD,
    color: Colors.BLACK,
  },

  productContainer: {
    paddingHorizontal: 16,
  },
  prWrap: {
    padding: 10,
    backgroundColor: Colors.WHITE,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 12,
  },
  innerWrapTwo: {
    flexDirection: 'row',
  },
  productImage: {
    width: 110,
    height: 120,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  productDetails: {
    marginLeft: 12,
  },
  productTitle: {
    fontSize: 14,
    fontFamily: Fonts.SEMIBOLD,
    color: Colors.BLACK,
    marginTop: 6,
  },
  variantWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 6,
  },
  variantTitle: {
    fontSize: 12,
    fontFamily: Fonts.MEDIUM,
    color: Colors.BLACK,
  },
  variantValue: {
    fontSize: 10,
    fontFamily: Fonts.REGULAR,
    color: Colors.BLACK,
    marginLeft: 6,
    borderWidth: 1,
    borderColor: '#0E0808',
    borderRadius: 2,
    paddingVertical: 2,
    paddingHorizontal: 6,
  },
  priceWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 15,
  },
  productPrice: {
    fontSize: 16,
    fontFamily: Fonts.SEMIBOLD,
    color: Colors.BLACK,
    borderWidth: 1,
    borderColor: '#CACACA',
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },

  off: {
    fontSize: 10,
    fontFamily: Fonts.MEDIUM,
    color: '#EB3030',
  },
  offPrice: {
    fontSize: 12,
    fontFamily: Fonts.MEDIUM,
    color: '#A7A7A7',
    textDecorationLine: 'line-through',
  },
  ratingWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 6,
  },
  rating: {
    fontSize: 12,
    fontFamily: Fonts.MEDIUM,
    color: Colors.BLACK,
  },

  lineTwo: {
    height: 1,
    backgroundColor: '#C6C6C6',
    marginVertical: 12,
  },
  orderWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalOr: {
    fontSize: 12,
    fontFamily: Fonts.MEDIUM,
    color: Colors.BLACK,
  },
  totalOrderPrice: {
    fontSize: 12,
    fontFamily: Fonts.SEMIBOLD,
    color: Colors.BLACK,
  },

  contentContainer: {
    paddingTop: 20,
  },
  deleteWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  deleteIcon: {
    width: 17,
    height: 17,
    resizeMode: 'contain',
  },

  innerFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    paddingTop: 35,
    paddingBottom: 40,
    paddingHorizontal: 22,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  buttonFooter: {
    width: '62%',
  },
  foFirst: {
    width: '35%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerPrice: {
    fontSize: 16,
    fontFamily: Fonts.MEDIUM,
    color: Colors.BLACK,
  },
  footerDetail: {
    fontSize: 12,
    fontFamily: Fonts.SEMIBOLD,
    color: Colors.PRIMARY,
  },
  pkrWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  pkr: {
    fontSize: 13,
    fontFamily: Fonts.MEDIUM,
    color: Colors.BLACK,
  },

  addButton: {
    position: 'absolute',
    bottom: 65,
    right: 0,
    left: 0,
  },
  activeAddButton: {
    bottom: 0,
  },
});
