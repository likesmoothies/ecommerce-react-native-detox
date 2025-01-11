import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {CalendarIcon, FlatHeel, RightArrow} from '../../../assets/images';
import {Fonts} from '../../../constants/fonts';
import {Colors} from '../../../constants/colors';

const FlatBanner = () => {
  return (
    <>
      <View style={styles.wrap}>
        <Image source={FlatHeel} style={styles.banner} />

        {/* Content Overlay */}
        <View style={styles.contentWrap}>
          <Text style={styles.title}>Flat and Heels</Text>
          <Text style={styles.tagline}>Stand a chance to get rewarded</Text>
          <View style={styles.buttonWrap}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.visit}>Visit now</Text>
              <RightArrow style={styles.arrow} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.dealWrapper}>
        <View style={styles.dealTextWrapper}>
          <Text style={styles.dealTitle}>Trending Products</Text>

          <View style={styles.timerWrapper}>
            <View>
              <Image source={CalendarIcon} style={styles.imgClock} />
            </View>
            <Text style={styles.timer}>Last Date 31/10/2024</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>View all</Text>
          <View style={styles.viewAllArrow}>
            <RightArrow />
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default FlatBanner;

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    position: 'relative',
    marginBottom: 16,
  },
  banner: {
    width: '100%',
    height: 170,
    resizeMode: 'cover',
  },
  contentWrap: {
    position: 'absolute',
    left: '50%',
    top: '55%',
    transform: [{translateX: -0}, {translateY: -50}],
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.MEDIUM,
    color: '#232327',
    marginBottom: 2,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 10,
    fontFamily: Fonts.REGULAR,
    color: '#232327',
    marginBottom: 8,
    textAlign: 'center',
  },
  buttonWrap: {
    alignItems: 'flex-end',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderRadius: 4,
    backgroundColor: '#F83758',
    paddingVertical: 6,
    paddingHorizontal: 10,
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

  dealWrapper: {
    backgroundColor: '#FD6E87',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
  },
  dealTextWrapper: {
    flexDirection: 'column',
    gap: 5,
  },
  dealTitle: {
    fontSize: 16,
    fontFamily: Fonts.MEDIUM,
    color: Colors.WHITE,
  },
  timerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 5,
  },
  imgClock: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
  },
  timer: {
    fontSize: 12,
    fontFamily: Fonts.REGULAR,
    color: Colors.WHITE,
  },
  viewAllButton: {
    borderColor: Colors.WHITE,
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  viewAllText: {
    color: Colors.WHITE,
    fontFamily: Fonts.SEMIBOLD,
    fontSize: 12,
  },
  viewAllArrow: {
    marginTop: 2,
  },
});
