import {View, StyleSheet, Image} from 'react-native';
import React from 'react';
import {FillStarTwo, HalfStarTwo} from '../assets/images';

const RatingStar = ({rating, size}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  const starSize = size || 18;

  return (
    <View style={styles.wrap}>
      <View style={styles.starWrap}>
        {Array.from({length: fullStars}, (_, index) => (
          <Image
            key={`full-${index}`}
            source={FillStarTwo}
            style={[styles.img, {width: starSize, height: starSize}]} // Use the dynamic size
          />
        ))}
        {hasHalfStar && (
          <Image
            source={HalfStarTwo}
            style={[styles.img, {width: starSize, height: starSize}]} // Use the dynamic size
          />
        )}
      </View>
    </View>
  );
};

export default RatingStar;

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  starWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 1,
  },
  img: {
    resizeMode: 'contain',
  },
});
