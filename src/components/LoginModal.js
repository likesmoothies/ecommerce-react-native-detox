import {
  View,
  Text,
  Modal,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {LoginImg, ClearIcon} from '../assets/images';

const LoginModal = ({visible, onClose, onLoginPress, onSignupPress}) => {
  return (
    <Modal visible={false} transparent>
      <View style={styles.modalView}>
        <View style={styles.mainView}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <View style={styles.closeIconContainer}>
              <Image source={ClearIcon} style={styles.closeIcon} />
            </View>
          </TouchableOpacity>
          <Image source={LoginImg} style={styles.loginImage} />
          <Text style={styles.loginText}>
            Join us for an amazing shopping experience!
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onLoginPress}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onSignupPress}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LoginModal;

const styles = StyleSheet.create({
  modalView: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    position: 'absolute',
    top: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainView: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 15,
    alignItems: 'center',
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 1,
  },
  closeIconContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 5,
    elevation: 3,
  },
  closeIcon: {
    width: 18,
    height: 18,
  },
  loginImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
    marginBottom: 20,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  loginText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
    paddingHorizontal: 20,
  },
  buttonContainer: {
    flexDirection: 'column',
    width: '100%',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#138ab2',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  footerText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
  },
});
