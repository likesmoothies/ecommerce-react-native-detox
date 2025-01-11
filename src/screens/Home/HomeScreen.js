import React, {useEffect, useState} from 'react';
import {
  Image,
  Keyboard,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  BottomSearch,
  CartIcon,
  HomeIcon,
  WishlistIcon,
  SettingIcon,
} from '../../assets/images';
import Home from '../tabs/Home';
import Search from '../tabs/Search';
import Wishlist from '../tabs/WishList';
import Profile from '../tabs/Profile';
import {Colors} from '../../constants/colors';
import {Fonts} from '../../constants/fonts';
import useTypedSelector from '../../hooks/useTypedSelector';
import {selectedProducts} from '../../redux/products/productsSlice';
import Cart from '../Cart/Cart';
import {useDispatch} from 'react-redux';
import {setSearchbarText} from '../../redux/searchbar/searchbarSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const cartProducts = useTypedSelector(selectedProducts);

  const [selectedTab, setSelectedTab] = useState(0);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setIsKeyboardVisible(true),
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setIsKeyboardVisible(false),
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    // Clear search text if tab is changed
    if (selectedTab !== 3) {
      dispatch(setSearchbarText(''));
      AsyncStorage.removeItem('searchbarText');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTab]);

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={Colors.PRIMARY_BG}
      />

      <SafeAreaView style={styles.container}>
        {selectedTab === 0 ? (
          <Home setSelectedTab={setSelectedTab} />
        ) : selectedTab === 1 ? (
          <Wishlist setSelectedTab={setSelectedTab} />
        ) : selectedTab === 2 ? (
          <Cart />
        ) : selectedTab === 3 ? (
          <Search setSelectedTab={setSelectedTab} />
        ) : (
          <Profile />
        )}

        {!isKeyboardVisible && (
          <View style={styles.bottomView}>
            <TouchableOpacity
              style={styles.bottomTab}
              onPress={() => setSelectedTab(0)}>
              <Image
                source={HomeIcon}
                style={[
                  styles.bottomTabIcon,
                  selectedTab === 0 && styles.activeBottomTabIcon,
                ]}
              />
              <Text
                style={[styles.label, selectedTab === 0 && styles.activeLabel]}>
                Home
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.bottomTab}
              onPress={() => setSelectedTab(1)}>
              <Image
                source={WishlistIcon}
                style={[
                  styles.bottomTabIcon,
                  selectedTab === 1 && styles.activeBottomTabIcon,
                ]}
              />
              <Text
                style={[styles.label, selectedTab === 1 && styles.activeLabel]}>
                Wishlist
              </Text>
            </TouchableOpacity>

            {/* Important */}
            <View style={styles.cartContainer}>
              <TouchableOpacity
                style={[
                  styles.cartTab,
                  selectedTab === 2 && styles.activeCartTab,
                ]}
                onPress={() => setSelectedTab(2)}>
                <Image
                  source={CartIcon}
                  style={[
                    styles.bottomTabIcon,
                    selectedTab === 2 && styles.lastActiveBottomTabIcon,
                  ]}
                />
              </TouchableOpacity>
              {cartProducts.length > 0 && (
                <View
                  style={[
                    styles.badge,
                    selectedTab === 2 && styles.activeBadge,
                  ]}>
                  <Text
                    style={[
                      styles.badgeText,
                      selectedTab === 2 && styles.activeBadgeText,
                    ]}>
                    {cartProducts.length}
                  </Text>
                </View>
              )}
            </View>

            <TouchableOpacity
              style={styles.bottomTab}
              onPress={() => setSelectedTab(3)}>
              <Image
                source={BottomSearch}
                style={[
                  styles.bottomTabIcon,
                  selectedTab === 3 && styles.activeBottomTabIcon,
                ]}
              />
              <Text
                style={[styles.label, selectedTab === 3 && styles.activeLabel]}>
                Search
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.bottomTab}
              onPress={() => setSelectedTab(4)}>
              <Image
                source={SettingIcon}
                style={[
                  styles.bottomTabIcon,
                  selectedTab === 4 && styles.activeBottomTabIcon,
                ]}
              />
              <Text
                style={[styles.label, selectedTab === 4 && styles.activeLabel]}>
                Setting
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY_BG,
  },
  bottomView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 65,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopColor: '#DADADA',
    borderTopWidth: 1,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  bottomTab: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomTabIcon: {
    width: 19,
    height: 24,
    resizeMode: 'contain',
  },
  activeBottomTabIcon: {
    tintColor: '#EB3030',
  },
  label: {
    fontSize: 12,
    color: Colors.BLACK,
    fontFamily: Fonts.REGULAR,
  },
  activeLabel: {
    fontSize: 12,
    color: '#EB3030',
    fontFamily: Fonts.MEDIUM,
  },

  cartContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -25,
    right: 10,
    backgroundColor: '#EB3030',
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 10,
    color: Colors.WHITE,
    fontFamily: Fonts.REGULAR,
  },
  activeBadge: {
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderColor: '#EB3030',
  },
  activeBadgeText: {
    color: '#EB3030',
    fontSize: 10,
  },
  cartTab: {
    backgroundColor: Colors.WHITE,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    top: -25,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  activeCartTab: {
    backgroundColor: '#EB3030',
  },
  lastActiveBottomTabIcon: {
    width: 19,
    height: 24,
    resizeMode: 'contain',
    tintColor: Colors.WHITE,
  },
});
