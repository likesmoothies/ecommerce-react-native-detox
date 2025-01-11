import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ClearIcon,
  Logo,
  NavigationIcon,
  SearchIcon,
  UserIcon,
} from '../../assets/images';
import RatingStar from '../../components/RatingStar';
import {featuredProducts} from '../../constants';
import {Colors} from '../../constants/colors';
import {Fonts} from '../../constants/fonts';
import useTypedSelector from '../../hooks/useTypedSelector';
import {selectSearchbarText} from '../../redux/searchbar/searchbarSlice';
import {thousandSeparator} from '../../utils';

// Get the screen width
const screenWidth = Dimensions.get('window').width;

const Search = ({setSelectedTab}) => {
  const navigation = useNavigation();
  const flatListRef = useRef(null);
  const getSearchText = useTypedSelector(selectSearchbarText);

  const [searchText, setSearchText] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(featuredProducts);

  useEffect(() => {
    if (getSearchText) {
      setSearchText(getSearchText);
    }
  }, [getSearchText]);

  // Effect to filter products based on search text
  useEffect(() => {
    const filtered = featuredProducts.filter(product =>
      product.name.toLowerCase().includes(searchText.toLowerCase()),
    );
    setFilteredProducts(filtered);
  }, [searchText]);

  const renderProduct = ({item, index}) => {
    // If it's the last item and it's an odd item, give it half width
    const isHalfWidth =
      filteredProducts.length % 2 !== 0 &&
      index === filteredProducts.length - 1;
    const itemWidth = isHalfWidth ? screenWidth / 2.3 : screenWidth / 2.3;

    return (
      <TouchableOpacity
        style={[styles.productWrap, {width: itemWidth}]}
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
            <View>
              <RatingStar rating={item?.rating} size={14} />
            </View>
            <Text style={styles.count}>
              ({thousandSeparator(item?.ratingCount)})
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity
        // onPress={() => navigation.openDrawer()}
        >
          <NavigationIcon />
        </TouchableOpacity>
        <Logo />
        <TouchableOpacity onPress={() => setSelectedTab(4)}>
          <UserIcon />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <SearchIcon />
        <TextInput
          placeholder="Search any product.."
          style={styles.searchInput}
          value={searchText}
          onChangeText={text => setSearchText(text)}
          placeholderTextColor="#BBBBBB"
        />
        {searchText.length > 0 && (
          <TouchableOpacity onPress={() => setSearchText('')}>
            <ImageBackground source={ClearIcon} style={styles.icon} />
          </TouchableOpacity>
        )}
      </View>

      {/* Products */}
      <FlatList
        ref={flatListRef}
        data={filteredProducts} // Use filtered products
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={renderProduct}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyWrap}>
            <Text style={styles.emptyCont}>No products found</Text>
            <Text style={styles.emptyCont}>Try different keywords</Text>
          </View>
        }
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  topBar: {
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchBar: {
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 4,
    elevation: 3,
    height: 45,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    marginTop: 8,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingLeft: 15,
  },
  emptyWrap: {
    marginTop: 20,
  },
  emptyCont: {
    textAlign: 'center',
    // marginTop: 20,
    marginBottom: 10,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: '#BBBBBB',
  },
  productWrap: {
    backgroundColor: Colors.WHITE,
    marginHorizontal: 5,
    borderRadius: 4,
    marginBottom: 10,
  },
  starWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 6,
  },
  count: {
    fontSize: 10,
    color: '#828282',
    fontFamily: Fonts.REGULAR,
  },
  image: {
    width: '100%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  imgWrap: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 4,
  },
  card: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.MEDIUM,
    color: Colors.BLACK,
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
    marginBottom: 4,
  },
  priceWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginBottom: 4,
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
  listContainer: {
    paddingBottom: 100,
  },
});
