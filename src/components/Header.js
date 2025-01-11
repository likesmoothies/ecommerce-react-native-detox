import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import useTypedSelector from '../hooks/useTypedSelector';
import {selectedProducts} from '../redux/products/productsSlice';
import {useNavigation} from '@react-navigation/native';

const {height, width} = Dimensions.get('window');

const Header = ({title, leftIcon, rightIcon, leftClick}) => {
  const cartProducts = useTypedSelector(selectedProducts);
  const navigation = useNavigation();

  console.log('height', height);

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.btn} onPress={leftClick}>
        <Image source={leftIcon} style={styles.icon} />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate('Cart')}>
        <View style={styles.cartIconWrapper}>
          <Image source={rightIcon} style={styles.largeIcon} />
          {rightIcon && cartProducts.length > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cartProducts.length}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    width: width,
    height: 55,
    backgroundColor: '#0786DAFD',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  btn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: '#fff',
  },
  largeIcon: {
    width: 22,
    height: 22,
    tintColor: '#fff',
  },
  title: {
    color: '#fff',
    fontSize: 17,
  },
  cartIconWrapper: {
    position: 'relative',
    width: 23,
    height: 23,
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FF0000',
    width: 17,
    height: 17,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
