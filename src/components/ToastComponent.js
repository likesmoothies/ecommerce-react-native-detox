import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Toast from 'react-native-toast-message';
import {Colors} from '../constants/colors';

const toastConfig = {
  success: ({text1}) => (
    <View style={styles.toast}>
      <Text style={styles.toastText}>{text1}</Text>
    </View>
  ),
  error: ({text1}) => (
    <View style={styles.errorToast}>
      <Text style={styles.toastText}>{text1}</Text>
    </View>
  ),
};

const ToastComponent = () => {
  return <Toast config={toastConfig} visibilityTime={2500} />;
};

const styles = StyleSheet.create({
  toast: {
    backgroundColor: '#039694',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  errorToast: {
    backgroundColor: Colors.PRIMARY,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  toastText: {
    color: Colors.WHITE,
  },
});

export default ToastComponent;
