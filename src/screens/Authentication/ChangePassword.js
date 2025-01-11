import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
import {Colors} from '../../constants/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import {leftArrow, PasswordTextFieldIcon, UserTwo} from '../../assets/images';
import {useNavigation} from '@react-navigation/native';
import {Fonts} from '../../constants/fonts';
import CustomButton from '../../components/CustomButton';
import TextField from '../../components/TextField';
import {Formik} from 'formik';
import * as Yup from 'yup';

// Validation Schema
const validationSchema = Yup.object().shape({
  oldPassword: Yup.string().required('Old Password is required'),
  newPassword: Yup.string()
    .required('New Password is required')
    .min(6, 'New Password must be at least 6 characters'),
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
});

const ChangePassword = () => {
  const navigation = useNavigation();

  // Initial values for Formik
  const initialValues = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  const handleSave = values => {};

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={Colors.PRIMARY_BG}
      />
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Image source={leftArrow} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>Change Password</Text>
        <Text style={styles.h}>H</Text>
      </View>

      <View style={styles.userIconWrap}>
        <Image source={UserTwo} style={styles.userIcon} />
      </View>

      <View style={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.personal}>Password Details</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSave}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View>
              <View style={styles.fieldContainer}>
                <TextField
                  placeholder="Old Password"
                  value={values.oldPassword}
                  onChangeText={handleChange('oldPassword')}
                  onBlur={handleBlur('oldPassword')}
                  error={touched.oldPassword && errors.oldPassword}
                  secureTextEntry={true}
                  leftIcon={<PasswordTextFieldIcon />}
                  inputWrap={{
                    height: 48,
                    backgroundColor: 'transparent',
                    borderRadius: 8,
                  }}
                />

                {errors.oldPassword && (
                  <Text style={styles.errorText}>{errors.oldPassword}</Text>
                )}
              </View>

              <View style={styles.fieldContainer}>
                <TextField
                  placeholder="New Password"
                  value={values.newPassword}
                  onChangeText={handleChange('newPassword')}
                  onBlur={handleBlur('newPassword')}
                  error={touched.newPassword && errors.newPassword}
                  secureTextEntry={true}
                  leftIcon={<PasswordTextFieldIcon />}
                  inputWrap={{
                    height: 48,
                    backgroundColor: 'transparent',
                    borderRadius: 8,
                  }}
                />
                {errors.newPassword && (
                  <Text style={styles.errorText}>{errors.newPassword}</Text>
                )}
              </View>

              <View style={styles.fieldContainer}>
                <TextField
                  placeholder="Confirm Password"
                  value={values.confirmPassword}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  error={touched.confirmPassword && errors.confirmPassword}
                  secureTextEntry={true}
                  leftIcon={<PasswordTextFieldIcon />}
                  inputWrap={{
                    height: 48,
                    backgroundColor: 'transparent',
                    borderRadius: 8,
                  }}
                />
                {errors.confirmPassword && (
                  <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                )}
              </View>

              <View style={styles.buttonWrap}>
                <CustomButton
                  name="Change Password"
                  onPress={handleSubmit}
                  // eslint-disable-next-line react-native/no-inline-styles
                  loginStyle={{
                    borderRadius: 8,
                  }}
                />
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChangePassword;

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
    marginBottom: 25,
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
  fieldContainer: {
    height: 80,
  },
  label: {
    fontSize: 12,
    fontFamily: Fonts.REGULAR,
    color: Colors.BLACK,
    marginBottom: 10,
  },
  errorText: {
    color: Colors.PRIMARY,
    fontSize: 12,
  },
});
