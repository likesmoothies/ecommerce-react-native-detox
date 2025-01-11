import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {
  ClearIcon,
  Logo,
  NavigationIcon,
  SearchIcon,
  UserIcon,
} from '../../assets/images';
import {categoriesData} from '../../constants';
import {Colors} from '../../constants/colors';
import {Fonts} from '../../constants/fonts';
import {setSearchbarText} from '../../redux/searchbar/searchbarSlice';
import Banners from '../Home/components/Banners';
import DiscountedProducts from '../Home/components/DiscountedProducts';
import FeaturedProducts from '../Home/components/FeaturedProducts';
import FlatBanner from '../Home/components/FlatBanner';
import OfferBanner from '../Home/components/OfferBanner';
import SponsoredBanner from '../Home/components/SponsoredBanner';
import SummerBanner from '../Home/components/SummerBanner';

const Home = ({setSelectedTab}) => {
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchText) {
        dispatch(setSearchbarText(searchText));
        AsyncStorage.setItem('searchbarText', JSON.stringify(searchText));
        setSelectedTab(3); // Set the selected tab to Search
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [searchText, dispatch, setSelectedTab]);

  const renderCategoryItem = ({item}) => (
    <TouchableOpacity>
      <View style={styles.categoryWrap}>
        <View>
          <Image source={item.image} style={styles.imgWrap} />
        </View>
        <Text style={styles.categoryName}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={categoriesData}
      keyExtractor={item => item.id.toString()}
      ListHeaderComponent={
        <View style={styles.parentWrap}>
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
          <View style={styles.wrap}>
            <View>
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
                    <Image source={ClearIcon} style={styles.icon} />
                  </TouchableOpacity>
                )}
              </View>
            </View>

            {/* Categories */}
            <Text style={styles.featured}>All Featured</Text>
            <View style={styles.categories}>
              <FlatList
                data={categoriesData}
                keyExtractor={item => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={renderCategoryItem}
              />
            </View>

            {/* Banners */}
            <Banners />

            {/* Featured Products */}
            <FeaturedProducts />

            {/* Offer Banner */}
            <OfferBanner />

            {/* Flat Banner */}
            <FlatBanner />

            {/* Discounted Products */}
            <DiscountedProducts />

            {/* Summer Banner */}
            <SummerBanner />

            {/* Sponsored Banner */}
            <SponsoredBanner />
          </View>
        </View>
      }
      showsVerticalScrollIndicator={false}
      renderItem={null} // Since categories are part of ListHeaderComponent
      ListFooterComponent={<View style={styles.footer} />}
      contentContainerStyle={styles.contentContainer}
    />
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  parentWrap: {
    paddingHorizontal: 16,
  },
  topBar: {
    // paddingVertical: 12,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  wrap: {
    width: '100%',
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
  icon: {
    width: 20,
    height: 20,
    tintColor: '#BBBBBB',
  },
  featured: {
    fontFamily: Fonts.SEMIBOLD,
    fontSize: 18,
    color: Colors.BLACK,
    marginBottom: 10,
  },
  categories: {
    backgroundColor: Colors.WHITE,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 10,
  },
  categoryWrap: {
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 5,
  },
  imgWrap: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  categoryName: {
    color: '#21003D',
    marginTop: 5,
    fontSize: 12,
    fontFamily: Fonts.REGULAR,
  },
  footer: {
    marginBottom: 80,
  },
  contentContainer: {
    paddingTop: 20, // Adjust this value for more or less spacing
  },
});
