import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {RightArrow, SummerBannerImg} from '../../../assets/images';
import {Fonts} from '../../../constants/fonts';
import {Colors} from '../../../constants/colors';

const SummerBanner = () => {
  return (
    <View style={styles.wrap}>
      <View>
        <View>
          <Image source={SummerBannerImg} style={styles.banner} />
        </View>
        <View style={styles.card}>
          <View style={styles.sale}>
            <Text style={styles.saleText}>New Arrivals </Text>
            <Text style={styles.saleUpto}>Summer’ 25 Collections</Text>
          </View>

          <View style={styles.buttonWrap}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.visit}>View all</Text>
              <RightArrow style={styles.arrow} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SummerBanner;

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    marginBottom: 16,
  },
  banner: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  card: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    backgroundColor: Colors.WHITE,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 16,
  },
  saleText: {
    fontSize: 20,
    fontFamily: Fonts.MEDIUM,
    color: Colors.BLACK,
    marginBottom: 4,
  },
  saleUpto: {
    fontSize: 16,
    fontFamily: Fonts.REGULAR,
    color: Colors.BLACK,
  },

  buttonWrap: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    backgroundColor: '#F83758',
    paddingVertical: 8,
    gap: 8,
    width: 100,
    marginTop: 6,
  },
  visit: {
    fontSize: 12,
    fontFamily: Fonts.MEDIUM,
    color: Colors.WHITE,
  },
  arrow: {
    marginTop: 2,
  },
});
