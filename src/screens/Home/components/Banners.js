import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {ClockIcon, RightArrow} from '../../../assets/images';
import {Colors} from '../../../constants/colors';
import {Fonts} from '../../../constants/fonts';
import Swiper from 'react-native-swiper';
import {bannersData} from '../../../constants';

const Banners = () => {
  const swiperRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(36000); // Initial time in seconds (10 hours)

  // Function to convert seconds to h:m:s format
  const formatTime = seconds => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer); // Clear timer when component unmounts
  }, []);

  return (
    <>
      <View style={styles.swiperContainer}>
        <Swiper
          // autoplay
          // autoplayTimeout={7}
          ref={swiperRef}
          loop={false}
          onIndexChanged={index => setActiveIndex(index)}
          showsPagination={false}>
          {bannersData.map(banner => (
            <View key={banner.id} style={styles.banner}>
              <View>
                <Image source={banner.image} style={styles.bannerImg} />
                <View style={styles.textContainer}>
                  <Text style={styles.discountText}>{banner.textOne}</Text>
                  <Text style={styles.productText}>{banner.textTwo}</Text>
                  <Text style={styles.colorText}>All colors</Text>
                  <TouchableOpacity style={styles.shopNowBtn}>
                    <Text style={styles.shopNowText}>{banner.buttonText}</Text>
                    <View style={styles.rightArrow}>
                      <RightArrow />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </Swiper>

        <View style={styles.pagination}>
          {bannersData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                activeIndex === index ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>
      </View>

      {/*  */}
      <View style={styles.dealWrapper}>
        <View style={styles.dealTextWrapper}>
          <Text style={styles.dealTitle}>Deal of the Day</Text>

          <View style={styles.timerWrapper}>
            <View>
              <Image source={ClockIcon} style={styles.imgClock} />
            </View>
            <Text style={styles.timer}>{formatTime(timeLeft)} remaining</Text>
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

export default Banners;

const styles = StyleSheet.create({
  swiperContainer: {
    height: 250,
    justifyContent: 'center',
    width: '100%',
  },
  banner: {
    marginHorizontal: 5,
    marginVertical: 16,
    position: 'relative',
  },
  bannerImg: {
    borderRadius: 12,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  textContainer: {
    position: 'absolute',
    left: 25,
    bottom: 35,
  },
  discountText: {
    fontSize: 20,
    color: Colors.WHITE,
    fontFamily: Fonts.BOLD,
  },
  productText: {
    fontSize: 12,
    color: Colors.WHITE,
    fontFamily: Fonts.REGULAR,
    marginTop: 5,
    marginBottom: 5,
  },
  colorText: {
    fontSize: 12,
    color: Colors.WHITE,
    fontFamily: Fonts.REGULAR,
    marginBottom: 5,
  },
  shopNowBtn: {
    borderColor: Colors.WHITE,
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  shopNowText: {
    color: Colors.WHITE,
    fontFamily: Fonts.SEMIBOLD,
    fontSize: 12,
  },
  rightArrow: {
    marginTop: 2,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#FFA3B3',
  },
  inactiveDot: {
    backgroundColor: '#DEDBDB',
  },

  dealWrapper: {
    backgroundColor: '#4392F9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 8,
    padding: 8,
    marginBottom: 20,
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
