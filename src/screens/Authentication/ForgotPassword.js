import {Formik} from 'formik';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as Yup from 'yup';
import {UserTextFieldIcon} from '../../assets/images';
import CustomButton from '../../components/CustomButton';
import TextField from '../../components/TextField';
import {Colors} from '../../constants/colors';
import {Fonts} from '../../constants/fonts';

// Validation Schema
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
});

const ForgotPassword = () => {
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);

  const handleSignin = async values => {};

  return (
    <GestureHandlerRootView style={styles.gestureHandle}>
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}>
          <View style={styles.headingWrap}>
            <Text style={styles.heading}>Forgot</Text>
            <Text style={styles.heading}>password?</Text>
          </View>

          <Formik
            initialValues={{email: '', password: ''}}
            validationSchema={validationSchema}
            onSubmit={handleSignin}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => {
              return (
                <View style={styles.formContainer}>
                  <View style={styles.fieldContainer}>
                    <TextField
                      placeholder="Enter your email address"
                      value={values.email}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      keyboardType="email-address"
                      error={touched.email && errors.email}
                      leftIcon={<UserTextFieldIcon />}
                    />
                  </View>

                  <View style={styles.forgotPasswordContainer}>
                    <Text style={styles.forgotPasswordText}>
                      <Text style={styles.forgotPasswordStar}>* </Text>
                      We will send you a message to set or reset your new
                      password
                    </Text>
                  </View>

                  <View style={styles.buttonContainer}>
                    <CustomButton
                      name={
                        loading ? (
                          <ActivityIndicator color="#ffffff" />
                        ) : (
                          'Submit'
                        )
                      }
                      onPress={handleSubmit}
                      disabled={loading}
                    />
                  </View>
                </View>
              );
            }}
          </Formik>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  gestureHandle: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  container: {
    flex: 1,
    marginHorizontal: 30,
    marginVertical: 20,
  },

  scrollContainer: {
    paddingBottom: 20,
  },
  headingWrap: {
    marginTop: 20,
  },
  heading: {
    fontSize: 36,
    fontFamily: Fonts.BOLD,
    color: Colors.BLACK,
  },
  formContainer: {
    marginTop: 36,
  },
  fieldContainer: {
    marginBottom: 25,
  },
  forgotPasswordContainer: {
    marginTop: 5,
  },
  forgotPasswordText: {
    color: Colors.SECONDARY_TEXT,
    fontSize: 12,
    fontFamily: Fonts.REGULAR,
  },
  forgotPasswordStar: {
    color: Colors.PRIMARY,
    fontSize: 12,
    fontFamily: Fonts.REGULAR,
  },
  buttonContainer: {
    marginTop: 50,
  },
  orContainer: {
    marginTop: 75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orText: {
    color: Colors.TEXT,
    fontSize: 14,
    fontFamily: Fonts.REGULAR,
  },
  googleIconContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
  googleIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  signupContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    color: Colors.TEXT,
    fontSize: 14,
    fontFamily: Fonts.REGULAR,
  },
  signupLink: {
    color: Colors.PRIMARY,
    fontFamily: Fonts.SEMIBOLD,
    fontSize: 14,
    textDecorationColor: Colors.PRIMARY,
    textDecorationLine: 'underline',
  },
});
