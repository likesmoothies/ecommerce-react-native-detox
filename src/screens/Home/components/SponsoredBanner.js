import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {Fonts} from '../../../constants/fonts';
import {Colors} from '../../../constants/colors';
import {RightBlack, SponsoredImg} from '../../../assets/images';

const SponsoredBanner = () => {
  return (
    <View style={styles.wrap}>
      <View style={styles.banner}>
        <Text style={styles.title}>Sponsored</Text>
        <Image source={SponsoredImg} style={styles.bannerImg} />
        <View style={styles.upWrap}>
          <Text style={styles.up}>up to 50% Off</Text>
          <RightBlack />
        </View>
      </View>
    </View>
  );
};

export default SponsoredBanner;

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    marginBottom: 16,
  },
  banner: {
    backgroundColor: Colors.WHITE,
    paddingVertical: 8,
    borderRadius: 8,
    height: 355,
    paddingLeft: 16,
  },
  title: {
    fontSize: 20,
    fontFamily: Fonts.MEDIUM,
    color: Colors.BLACK,
    marginBottom: 8,
  },
  bannerImg: {
    width: '100%',
    height: '80%',
    resizeMode: 'cover',
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
  },
  upWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 16,
    marginTop: 8,
  },
  up: {
    fontSize: 16,
    fontFamily: Fonts.BOLD,
    color: Colors.BLACK,
  },
});
