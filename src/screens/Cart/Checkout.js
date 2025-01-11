import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {leftArrow} from '../../assets/images';
import CustomButton from '../../components/CustomButton';
import {Colors} from '../../constants/colors';
import {Fonts} from '../../constants/fonts';
import useTypedSelector from '../../hooks/useTypedSelector';
import {selectedProducts} from '../../redux/products/productsSlice';
import {selectProductSize} from '../../redux/productSize/productSizeSlice';
import {thousandSeparator} from '../../utils';

const Checkout = () => {
  const navigation = useNavigation();
  const cartProducts = useTypedSelector(selectedProducts);
  const productSize = useTypedSelector(selectProductSize);

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
                <View>
                  <Text style={styles.productTitle}>{item?.name}</Text>
                  <View style={styles.variantWrap}>
                    <View style={styles.variantWrap}>
                      <View style={styles.variantInnerWrap}>
                        <View style={styles.variantInnerLeft}>
                          <Text style={styles.variantTitle}>Variations:</Text>
                          <Text style={styles.variantValue}>
                            {findProductSize?.size}
                          </Text>
                        </View>
                        <View style={styles.priceWrap}>
                          <Text style={styles.productPrice}>
                            Rs: {thousandSeparator(item?.price)}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.orderWrap}>
                  <Text style={styles.totalOr}>
                    Total Orders ({item?.quantity}) :
                  </Text>
                  <View style={styles.deleteWrap}>
                    <Text style={styles.totalOrderPrice}>
                      Rs: {thousandSeparator(item?.quantity * item?.price)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={[styles.lineTwo]} />
          </View>
        </View>
      </>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={cartProducts}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={
          <View>
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
              <Text style={styles.title}>Checkout</Text>
              <Text style={styles.h}>H</Text>
            </View>

            <View style={styles.line} />

            <View style={styles.shoppingWrap}>
              <Text style={styles.shoppingTitle}>Shopping Details</Text>
            </View>
            <View style={styles.categories}>
              <FlatList
                data={cartProducts}
                keyExtractor={item => item.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.productList}
                ListEmptyComponent={
                  <Text style={styles.emptyText}>
                    Your shopping bag is empty
                  </Text>
                }
              />
            </View>

            <View style={styles.wrap}>
              <Text style={styles.sectionTitle}>Order Payment Details</Text>

              <View style={styles.detailsContainer}>
                <Text style={styles.detailLabel}>Order Amounts</Text>
                <Text style={styles.detailValue}>
                  Rs. {thousandSeparator(calculateTotal())}
                </Text>
              </View>

              <View style={styles.detailsContainer}>
                <Text style={styles.detailLabel}>Delivery Fee</Text>
                <Text style={styles.free}>Free</Text>
              </View>
            </View>
            <View style={styles.orderTotal}>
              <View style={styles.line} />

              <View style={styles.detailsContainerLast}>
                <Text style={styles.orderLabel}>Order Total</Text>
                <Text style={styles.detailValue}>
                  Rs. {thousandSeparator(calculateTotal())}
                </Text>
              </View>
            </View>
          </View>
        }
        showsVerticalScrollIndicator={false}
        renderItem={null} // Since categories are part of ListHeaderComponent
        contentContainerStyle={styles.contentContainer}
      />

      <View style={styles.addButton}>
        <View style={styles.footer}>
          <View style={styles.innerFooter}>
            <View style={styles.foFirst}>
              <View style={styles.pkrWrap}>
                <Text style={styles.pkr}>PKR</Text>
                <Text style={styles.footerPrice}>
                  {thousandSeparator(calculateTotal())}
                </Text>
              </View>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.footerDetail}>View Details</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.buttonFooter}>
              <CustomButton
                name="Proceed to Payment"
                onPress={() => navigation.navigate('Payment')}
                // eslint-disable-next-line react-native/no-inline-styles
                loginStyle={{marginTop: 0}}
                // eslint-disable-next-line react-native/no-inline-styles
                buttonStyle={{fontSize: 15}}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Checkout;

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
    paddingTop: 12,
    paddingBottom: 12,
  },
  shoppingTitle: {
    fontSize: 17,
    fontFamily: Fonts.MEDIUM,
    color: Colors.BLACK,
  },

  productContainer: {
    paddingHorizontal: 16,
  },

  innerWrapTwo: {
    flexDirection: 'row',
  },
  productImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  productDetails: {
    marginLeft: 12,
    flex: 1,
  },
  productTitle: {
    fontSize: 12,
    fontFamily: Fonts.SEMIBOLD,
    color: Colors.BLACK,
    marginTop: 6,
  },
  variantWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    gap: 6,
  },
  variantTitle: {
    fontSize: 11,
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
    gap: 15,
  },
  productPrice: {
    fontSize: 12,
    fontFamily: Fonts.SEMIBOLD,
    color: Colors.BLACK,
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
    marginTop: 8,
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
  footer: {
    marginTop: 20,
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
    width: 15,
    height: 15,
    resizeMode: 'contain',
  },

  innerFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    paddingTop: 35,
    paddingBottom: 45,
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
    textDecorationLine: 'underline',
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

  variantInnerWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 6,
    flex: 1,
  },
  variantInnerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  wrap: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontFamily: Fonts.SEMIBOLD,
    color: Colors.BLACK,
    marginBottom: 12,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  detailsContainerLast: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    marginBottom: 150,
  },
  detailLabel: {
    fontSize: 16,
    fontFamily: Fonts.REGULAR,
    color: Colors.BLACK,
  },
  detailValue: {
    fontSize: 16,
    fontFamily: Fonts.SEMIBOLD,
    color: Colors.BLACK,
  },
  free: {
    fontSize: 16,
    fontFamily: Fonts.SEMIBOLD,
    color: Colors.PRIMARY,
  },
  orderTotal: {
    paddingHorizontal: 16,
    marginTop: 12,
    marginBottom: 12,
  },
  orderLabel: {
    fontSize: 17,
    fontFamily: Fonts.MEDIUM,
    color: Colors.BLACK,
  },
  addButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  },
});
