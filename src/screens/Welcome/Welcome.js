import React, {useRef, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  StatusBar,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
import {onboarding} from '../../constants';
import {ActiveSlide} from '../../assets/images';
import {Fonts} from '../../constants/fonts';
import {Colors} from '../../constants/colors';

const Welcome = () => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === onboarding.length - 1;
  const navigation = useNavigation();

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.replace('Login')}
          style={styles.skipButton}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>

        <Swiper
          ref={swiperRef}
          loop={false}
          onIndexChanged={index => setActiveIndex(index)}
          showsPagination={false}>
          {onboarding.map(item => (
            <View key={item.id} style={styles.slide}>
              <item.image />
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          ))}
        </Swiper>

        <View style={styles.navigationContainer}>
          <TouchableOpacity
            onPress={() => swiperRef.current?.scrollBy(-1)}
            style={[activeIndex === 0 && styles.hidden]}>
            <Text style={styles.prev}>Prev</Text>
          </TouchableOpacity>

          <View style={styles.pagination}>
            {onboarding.map((_, index) => (
              <View key={index} style={styles.dotWrapper}>
                {activeIndex === index ? (
                  <ActiveSlide />
                ) : (
                  <View style={styles.dot} />
                )}
              </View>
            ))}
          </View>

          <TouchableOpacity
            onPress={() => {
              if (isLastSlide) {
                navigation.replace('Login');
              } else {
                swiperRef.current?.scrollBy(1);
              }
            }}>
            <Text style={styles.next}>
              {isLastSlide ? 'Get Started' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skipButton: {
    width: '100%',
    alignItems: 'flex-end',
    padding: 20,
  },
  skipText: {
    fontSize: 16,
    color: Colors.BLACK,
    fontFamily: Fonts.SEMIBOLD,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    marginTop: 20,
    fontSize: 24,
    color: Colors.BLACK,
    textAlign: 'center',
    fontFamily: Fonts.EXTRABOLD,
  },
  description: {
    marginTop: 10,
    fontSize: 14,
    color: Colors.GRAY,
    textAlign: 'center',
    paddingHorizontal: 20,
    fontFamily: Fonts.SEMIBOLD,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    marginBottom: 20,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotWrapper: {
    marginHorizontal: 4,
  },
  dot: {
    width: 12,
    height: 12,
    backgroundColor: '#D1D3D8',
    borderRadius: 6,
  },

  hidden: {
    opacity: 0,
  },
  prev: {
    fontSize: 16,
    color: Colors.LIGHTGREY,
    fontFamily: Fonts.SEMIBOLD,
  },
  next: {
    fontSize: 16,
    color: Colors.PRIMARY,
    fontFamily: Fonts.SEMIBOLD,
  },
});
