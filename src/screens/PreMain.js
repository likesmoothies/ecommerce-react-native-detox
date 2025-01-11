import {View, Text, StyleSheet, StatusBar, Image} from 'react-native';
import React from 'react';
import CustomButton from '../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {GetStartedImg} from '../assets/images';
import {Colors} from '../constants/colors';
import {Fonts} from '../constants/fonts';

const PreMain = () => {
  const navigation = useNavigation();

  return (
    <>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <View style={styles.container}>
        <View style={styles.coverImg}>
          <Image source={GetStartedImg} style={styles.imgWrap} />
        </View>
        <View style={styles.content}>
          <Text style={styles.tagLine}>You want Authentic, here you go!</Text>
          <Text style={styles.findText}>Find it here, buy it now!</Text>
          <View style={styles.buttonText}>
            <CustomButton
              name="Get Started"
              onPress={() => navigation.navigate('Main')}
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default PreMain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 0,
  },
  coverImg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
  },
  imgWrap: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  content: {
    alignItems: 'center',
    marginBottom: 35,
    paddingHorizontal: 25,
  },
  tagLine: {
    fontSize: 34,
    color: Colors.WHITE,
    fontFamily: Fonts.SEMIBOLD,
    textAlign: 'center',
    marginBottom: 15,
  },
  findText: {
    fontSize: 14,
    color: '#F2F2F2',
    fontFamily: Fonts.REGULAR,
    textAlign: 'center',
    marginBottom: 45,
  },
  buttonText: {
    width: '100%',
    paddingHorizontal: 20,
  },
});
