import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useRef} from 'react';
import {FillStar, HalfStar, Next} from '../../../assets/images';
import {Fonts} from '../../../constants/fonts';
import {Colors} from '../../../constants/colors';
import {featuredProducts} from '../../../constants';
import {useNavigation} from '@react-navigation/native';
import {thousandSeparator} from '../../../utils';

const FeaturedProducts = () => {
  const navigation = useNavigation();
  const flatListRef = useRef(null);

  const productsPerPage = 2; // Show 2 products at a time
  let currentIndex = 0;

  const handleNextPress = () => {
    if (flatListRef.current) {
      currentIndex += productsPerPage;
      if (currentIndex >= featuredProducts.length) {
        currentIndex = 0; // Reset to the beginning if end is reached
      }
      flatListRef.current.scrollToIndex({index: currentIndex});
    }
  };

  const renderStars = rating => {
    const stars = [];
    const fullStars = Math?.floor(rating);
    const isHalfStar = rating % 1 !== 0;

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FillStar key={i} />);
    }

    // Add half star if necessary
    if (isHalfStar) {
      stars.push(<HalfStar key="half" />);
    }

    return stars;
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
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.price}>PKR {thousandSeparator(item.price)}</Text>

        <View style={styles.priceWrap}>
          <Text style={styles.oldPrice}>
            PKR {thousandSeparator(item.oldPrice)}
          </Text>
          <Text style={styles.off}>{item.off}</Text>
        </View>

        <View style={styles.starWrap}>
          <Text>{renderStars(item.rating)}</Text>
          <Text style={styles.count}>({item.ratingCount})</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.wrap}>
      <FlatList
        ref={flatListRef}
        data={featuredProducts}
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

export default FeaturedProducts;

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  productWrap: {
    backgroundColor: Colors.WHITE,
    width: 170,
    marginHorizontal: 5,
    borderRadius: 4,
  },
  image: {
    width: '100%',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  imgWrap: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
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
  description: {
    fontSize: 10,
    color: Colors.BLACK,
    fontFamily: Fonts.REGULAR,
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
  starWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
  },
  count: {
    fontSize: 10,
    color: '#A4A9B3',
    fontFamily: Fonts.REGULAR,
  },
  nextButton: {
    position: 'absolute',
    right: 10,
    top: '63%',
    transform: [{translateY: -50}],
  },
});
