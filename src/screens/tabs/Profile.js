import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {leftArrow, Logout, UserTwo} from '../../assets/images';
import TextField from '../../components/TextField';
import {Colors} from '../../constants/colors';
import {Fonts} from '../../constants/fonts';
import useTypedSelector from '../../hooks/useTypedSelector';
import {selectedUser, setUser} from '../../redux/auth/authSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const loginUser = useTypedSelector(selectedUser);

  const handleLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: () => {
            dispatch(setUser(null));
            AsyncStorage.removeItem('user');
            navigation.navigate('Login');
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{name: 'Main'}],
            });
          }}>
          <Image source={leftArrow} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>Setting</Text>
        <Text style={styles.h}>H</Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.userIconWrap}>
          <Image source={UserTwo} style={styles.userIcon} />
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.personal}>Personal Details</Text>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Name</Text>
            <TextField
              placeholder="Name"
              value={loginUser?.name}
              inputWrap={{
                height: 48,
                backgroundColor: 'transparent',
                borderRadius: 8,
              }}
              editable={false}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Email Address</Text>
            <TextField
              placeholder="Email Address"
              value={loginUser?.email}
              inputWrap={{
                height: 48,
                backgroundColor: 'transparent',
                borderRadius: 8,
              }}
              editable={false}
            />
          </View>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ChangePassword');
            }}>
            <Text style={styles.change}>Change Password</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          handleLogout();
        }}>
        <Image source={Logout} style={styles.add} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY_BG,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  backIcon: {
    width: 10,
    height: 19,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 18,
    fontFamily: Fonts.SEMIBOLD,
    color: Colors.BLACK,
  },
  h: {
    opacity: 0,
  },
  userIconWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 31,
  },
  userIcon: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
  },
  scrollContainer: {
    marginHorizontal: 24,
  },
  formContainer: {
    marginTop: 35,
  },
  personal: {
    fontSize: 18,
    fontFamily: Fonts.SEMIBOLD,
    color: Colors.BLACK,
    marginBottom: 15,
  },
  fieldContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 12,
    fontFamily: Fonts.REGULAR,
    color: Colors.BLACK,
    marginBottom: 10,
  },
  change: {
    fontSize: 12,
    fontFamily: Fonts.MEDIUM,
    color: Colors.PRIMARY,
    textDecorationLine: 'underline',
    textAlign: 'right',
  },
  addButton: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 50,
    padding: 15,
    elevation: 5,
  },
  add: {
    width: 20,
    height: 20,
    tintColor: '#ffffff',
  },
});
