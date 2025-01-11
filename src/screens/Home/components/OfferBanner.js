import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {Colors} from '../../../constants/colors';
import {OfferIcon, OopsIcon} from '../../../assets/images';
import {Fonts} from '../../../constants/fonts';

const OfferBanner = () => {
  return (
    <View style={styles.bannerContainer}>
      <View>
        <Image source={OfferIcon} style={styles.offerIcon} />
      </View>

      <View>
        <View style={styles.header}>
          <Text style={styles.title}>Special Offers</Text>
          <Image source={OopsIcon} style={styles.oopsIcon} />
        </View>
        <Text style={styles.subtitle}>We make sure you get the</Text>
        <Text style={styles.subtitle}>offer you need at best prices</Text>
      </View>
    </View>
  );
};

export default OfferBanner;

const styles = StyleSheet.create({
  bannerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    borderRadius: 6,
    shadowRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginBottom: 16,
    gap: 24,
  },
  offerIcon: {
    width: 65,
    height: 65,
    resizeMode: 'contain',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    gap: 7,
  },
  title: {
    fontFamily: Fonts.MEDIUM,
    fontSize: 16,
    color: Colors.BLACK,
  },
  oopsIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  subtitle: {
    fontFamily: Fonts.LIGHT,
    fontSize: 12,
    color: Colors.BLACK,
  },
});
