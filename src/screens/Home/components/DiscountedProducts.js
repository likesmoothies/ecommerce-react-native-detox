import React, {useRef} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Next} from '../../../assets/images';
import {discountedProducts} from '../../../constants';
import {Colors} from '../../../constants/colors';
import {Fonts} from '../../../constants/fonts';
import {useNavigation} from '@react-navigation/native';

const DiscountedProducts = () => {
  const navigation = useNavigation();
  const flatListRef = useRef(null);

  const productsPerPage = 2; // Show 2 products at a time
  let currentIndex = 0;

  const formatPrice = price => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Thousand separator
  };

  const handleNextPress = () => {
    if (flatListRef.current) {
      currentIndex += productsPerPage;
      if (currentIndex >= discountedProducts.length) {
        currentIndex = 0; // Reset to the beginning if end is reached
      }
      flatListRef.current.scrollToIndex({index: currentIndex});
    }
  };

  const renderProduct = ({item}) => (
    <TouchableOpacity
      style={styles.productWrap}
      onPress={() => {
        navigation.navigate('ProductDetail', {item});
      }}>
      <View style={styles.image}>
        <Image source={item.image} style={styles.imgWrap} />
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.price}>PKR {formatPrice(item.price)}</Text>

        <View style={styles.priceWrap}>
          <Text style={styles.oldPrice}>PKR {formatPrice(item.oldPrice)}</Text>
          <Text style={styles.off}>{item.off}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.wrap}>
      <FlatList
        ref={flatListRef}
        data={discountedProducts}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderProduct}
        pagingEnabled
        snapToAlignment="center"
        decelerationRate="fast"
      />

      {/* Next button to show next set of products */}
      <TouchableOpacity style={styles.nextButton} onPress={handleNextPress}>
        <Next />
      </TouchableOpacity>
    </View>
  );
};

export default DiscountedProducts;

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  productWrap: {
    backgroundColor: Colors.WHITE,
    width: 140,
    marginHorizontal: 7,
    borderRadius: 4,
  },
  image: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  imgWrap: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  card: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  title: {
    fontSize: 12,
    fontFamily: Fonts.MEDIUM,
    color: Colors.BLACK,
    fontWeight: '600',
    marginBottom: 4,
  },
  price: {
    fontSize: 12,
    fontFamily: Fonts.MEDIUM,
    color: Colors.BLACK,
    fontWeight: '600',
  },
  priceWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  oldPrice: {
    fontSize: 12,
    color: '#BBBBBB',
    textDecorationLine: 'line-through',
    fontFamily: Fonts.LIGHT,
  },
  off: {
    fontSize: 10,
    color: '#FE735C',
    marginLeft: 4,
    fontFamily: Fonts.REGULAR,
  },
  nextButton: {
    position: 'absolute',
    right: 10,
    top: '65%',
    transform: [{translateY: -50}],
  },
});
