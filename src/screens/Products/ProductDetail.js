import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
import {useDispatch} from 'react-redux';
import {
  AddToCart,
  CartTwo,
  leftArrow,
  ReturnPolicyIcon,
  SecureIcon,
  WishlistFill,
  WishlistIcon,
} from '../../assets/images';
import RatingStar from '../../components/RatingStar';
import {Colors} from '../../constants/colors';
import {Fonts} from '../../constants/fonts';
import {featuredProducts, imagesData} from '../../constants/index';
import useTypedSelector from '../../hooks/useTypedSelector';
import {
  decrementProductQuantity,
  incrementProductQuantity,
  selectedProducts,
  setCartProducts,
} from '../../redux/products/productsSlice';
import {
  selectWishlistProducts,
  setWishListProducts,
} from '../../redux/wishlist/wishlistsSlice';
import {thousandSeparator} from '../../utils';
import {
  selectProductSize,
  setProductSizeStore,
} from '../../redux/productSize/productSizeSlice';

const ProductDetail = () => {
  const navigation = useNavigation();
  const swiperRef = useRef(null);
  const dispatch = useDispatch();
  const route = useRoute();
  const {item} = route.params;

  const wishListProducts = useTypedSelector(selectWishlistProducts);
  const cartProducts = useTypedSelector(selectedProducts);
  const getProductSize = useTypedSelector(selectProductSize);

  const [selectedProduct, setSelectedProduct] = useState();
  const [productImages, setProductImages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [productSize, setProductSize] = useState(item?.productSize[1]?.size);
  // New
  const [isFavorited, setIsFavorited] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [productQuantity, setProductQuantity] = useState(0);

  useEffect(() => {
    const product = featuredProducts.find(pr => pr.linkId === item.linkId);
    setSelectedProduct(product);

    const findImages = imagesData.find(pr => pr.linkId === item.linkId);
    if (findImages) {
      setProductImages(findImages.images);
    }

    // find product size
    const tempProductSize = getProductSize.find(pr => pr.id === item.id);
    if (tempProductSize) {
      setProductSize(tempProductSize.size);
    }
  }, [getProductSize, item]);

  useEffect(() => {
    const isProductInWishlist = wishListProducts.some(
      product => product.id === item.id,
    );
    setIsFavorited(isProductInWishlist);
  }, [item.id, wishListProducts]);

  useEffect(() => {
    const productInCart = cartProducts.find(product => product.id === item.id);
    if (productInCart) {
      setIsInCart(true);
      setProductQuantity(productInCart.quantity);
    } else {
      setIsInCart(false);
      setProductQuantity(0);
    }
  }, [cartProducts, item.id]);

  const toggleFavorite = () => {
    setIsFavorited(prev => !prev);
    dispatch(setWishListProducts(item));
  };

  const addToCartHandler = () => {
    dispatch(setCartProducts(item));
  };

  const handleProductSize = size => {
    setProductSize(size);
    const newItem = {...item, size};
    dispatch(setProductSizeStore(newItem));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={Colors.PRIMARY_BG}
      />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        {/* Top Bar */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={leftArrow} style={styles.backIcon} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.rightIcons}
            onPress={() => {
              navigation.reset({
                index: 2,
                routes: [{name: 'Cart', params: {comeFromProductDetail: true}}],
              });
            }}>
            <Image source={CartTwo} style={styles.cartIcon} />
          </TouchableOpacity>
          {cartProducts.length > 0 && (
            <TouchableOpacity
              style={styles.badge}
              onPress={() => {
                navigation.reset({
                  index: 2,
                  routes: [
                    {name: 'Cart', params: {comeFromProductDetail: true}},
                  ],
                });
              }}>
              <Text style={styles.badgeText}>{cartProducts.length}</Text>
            </TouchableOpacity>
          )}
        </View>
        {/* Swiper */}
        <View style={styles.imgWrap}>
          <Swiper
            ref={swiperRef}
            loop={false}
            onIndexChanged={index => setActiveIndex(index)}
            showsPagination={false}>
            {productImages.map((image, index) => (
              <View key={index} style={styles.banner}>
                <Image source={image} style={styles.bannerImg} />
              </View>
            ))}
          </Swiper>

          <TouchableOpacity style={styles.wishWrap} onPress={toggleFavorite}>
            <Image
              source={isFavorited ? WishlistFill : WishlistIcon}
              // style={styles.wishlistIcon}
              style={[
                styles.wishlistIcon,
                isFavorited ? styles.activeWishlistIcon : null,
              ]}
            />
          </TouchableOpacity>

          <View style={styles.pagination}>
            {productImages.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  activeIndex === index ? styles.activeDot : styles.inactiveDot,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Product Info */}
        <View style={styles.productInfo}>
          <View style={styles.sizeWrap}>
            <Text style={styles.sizeTitle}>Size:</Text>
            <Text style={styles.sizeTitle}>{productSize}</Text>
          </View>
          <View style={styles.chipWrap}>
            {selectedProduct?.productSize.map((size, index) => {
              return (
                <Text
                  key={index}
                  style={[
                    styles.chip,
                    productSize === size.size ? styles.activeChip : null,
                  ]}
                  onPress={() => {
                    handleProductSize(size.size);
                  }}>
                  {size?.size}
                </Text>
              );
            })}
          </View>

          <Text style={styles.title}>{selectedProduct?.name}</Text>

          <View style={styles.starWrap}>
            <View>
              {/* Rating */}
              <RatingStar rating={selectedProduct?.rating} />
            </View>
            <Text style={styles.count}>
              ({thousandSeparator(selectedProduct?.ratingCount)})
            </Text>
          </View>

          <View style={styles.priceWrap}>
            <Text style={styles.oldPrice}>
              PKR {thousandSeparator(selectedProduct?.oldPrice)}
            </Text>
            <Text style={styles.price}>
              PKR {thousandSeparator(selectedProduct?.price)}
            </Text>

            <Text style={styles.off}>{selectedProduct?.off}</Text>
          </View>

          <Text style={styles.desTitle}>Product Details</Text>
          <Text style={styles.description}>{selectedProduct?.description}</Text>

          <View style={styles.iconWrap}>
            <Image source={SecureIcon} style={styles.secureImg} />
            <Image source={ReturnPolicyIcon} style={styles.secureImgTwo} />
          </View>

          {/* Add to Cart / Quantity Buttons */}
          <View style={styles.cartActionsContainer}>
            <TouchableOpacity onPress={addToCartHandler} disabled={isInCart}>
              <Image
                source={AddToCart}
                style={[styles.addCartImg, isInCart && styles.disabledCartImg]}
              />
            </TouchableOpacity>

            {isInCart && (
              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => {
                    dispatch(decrementProductQuantity(item.id));
                  }}>
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.cartQuantity}>{productQuantity}</Text>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => {
                    dispatch(incrementProductQuantity(item.id));
                  }}>
                  <Text
                    style={[styles.quantityButtonText, styles.plusQuantity]}>
                    +
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View style={styles.delivery}>
            <Text style={styles.deliveryText}>Delivery in</Text>
            <Text style={styles.deliveryText}>
              {selectedProduct?.deliveryDays} days
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY_BG,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  rightIcons: {
    flexDirection: 'row',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 7,
    right: 7,
    backgroundColor: '#F83758',
    width: 17,
    height: 17,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontFamily: Fonts.SEMIBOLD,
  },
  cartIcon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  imgWrap: {
    height: 275,
    justifyContent: 'center',
    width: '100%',
    position: 'relative',
  },
  wishWrap: {
    position: 'absolute',
    top: 22,
    right: 22,
    backgroundColor: '#F9F9F9',
    padding: 8,
    borderRadius: 50,
  },
  wishlistIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    tintColor: '#F83758',
  },
  activeWishlistIcon: {
    tintColor: '#F83758',
  },
  banner: {
    marginHorizontal: 16,
    marginVertical: 16,
    position: 'relative',
  },
  bannerImg: {
    borderRadius: 12,
    width: '100%',
    height: 215,
    resizeMode: 'cover',
  },
  activeDot: {
    backgroundColor: '#F83758',
  },
  inactiveDot: {
    backgroundColor: '#DEDBDB',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  productInfo: {
    marginHorizontal: 16,
  },
  sizeWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  sizeTitle: {
    fontSize: 14,
    color: Colors.BLACK,
    fontFamily: Fonts.SEMIBOLD,
  },
  chipWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 18,
    paddingVertical: 7,
    borderRadius: 4,
    color: '#FA7189',
    fontFamily: Fonts.SEMIBOLD,
    borderColor: '#FA7189',
    borderWidth: 1,
    fontSize: 14,
  },
  activeChip: {
    backgroundColor: '#FA7189',
    color: Colors.WHITE,
  },
  prName: {
    fontSize: 20,
    fontFamily: Fonts.SEMIBOLD,
    color: Colors.BLACK,
    marginTop: 16,
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontFamily: Fonts.SEMIBOLD,
    color: Colors.BLACK,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  price: {
    fontSize: 14,
    fontFamily: Fonts.MEDIUM,
    color: Colors.BLACK,
  },
  priceWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  oldPrice: {
    fontSize: 14,
    color: '#808488',
    textDecorationLine: 'line-through',
    fontFamily: Fonts.REGULAR,
  },
  off: {
    fontSize: 14,
    color: '#FA7189',
    marginLeft: 4,
    fontFamily: Fonts.SEMIBOLD,
  },
  starWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 6,
  },
  count: {
    fontSize: 14,
    color: '#828282',
    fontFamily: Fonts.MEDIUM,
  },
  desTitle: {
    fontSize: 14,
    color: Colors.BLACK,
    fontFamily: Fonts.MEDIUM,
    marginTop: 8,
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: Colors.BLACK,
    fontFamily: Fonts.REGULAR,
  },
  iconWrap: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  secureImg: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
  },
  secureImgTwo: {
    width: 90,
    height: 45,
    resizeMode: 'contain',
  },
  addCartImg: {
    width: 120,
    height: 30,
    resizeMode: 'contain',
  },
  disabledCartImg: {
    opacity: 0.5,
  },
  cartActionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 12,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F83758',
    borderRadius: 4,
    width: 100,
    paddingHorizontal: 8,
  },
  quantityButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButtonText: {
    fontSize: 20,
    color: '#F83758',
    fontFamily: Fonts.SEMIBOLD,
    width: 30,
  },
  plusQuantity: {
    textAlign: 'right',
  },
  cartQuantity: {
    fontSize: 16,
    color: '#F83758',
    fontFamily: Fonts.SEMIBOLD,
    marginHorizontal: 8,
  },
  delivery: {
    backgroundColor: '#FFCCD5',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  deliveryText: {
    fontSize: 14,
    color: Colors.BLACK,
    fontFamily: Fonts.SEMIBOLD,
  },
});
