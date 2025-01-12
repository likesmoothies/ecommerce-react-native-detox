import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import {useDispatch} from 'react-redux';
import * as Yup from 'yup';
import {
  GoogleIcon,
  PasswordTextFieldIcon,
  UserTextFieldIcon,
} from '../../assets/images';
import CustomButton from '../../components/CustomButton';
import TextField from '../../components/TextField';
import {Colors} from '../../constants/colors';
import {Fonts} from '../../constants/fonts';
import {setUser} from '../../redux/auth/authSlice';
import useTypedSelector from '../../hooks/useTypedSelector';
import {selectUsers} from '../../redux/users/userSlice';

// Validation Schema
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const usersList = useTypedSelector(selectUsers);

  const [loading, setLoading] = useState(false);

  const handleSignIn = async values => {
    try {
      setLoading(true);

      // Find user based on email
      const findUser = usersList.find(
        user => user.email === values.email.toLowerCase(),
      );

      if (!findUser) {
        throw new Error('User not found');
      }

      if (findUser.password !== values.password) {
        throw new Error('Invalid password');
      }

      setTimeout(async () => {
        setLoading(false);
        // Set user in local storage
        await AsyncStorage.setItem('user', JSON.stringify(findUser));
        dispatch(setUser(findUser));
        // Navigate to home screen
        navigation.navigate('PreMain');

        Toast.show({
          type: 'success',
          text1: 'Logged in successfully',
          position: 'top',
        });
      }, 2000);
    } catch (error) {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: error.message,
        position: 'top',
      });
    }
  };

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />

      <GestureHandlerRootView style={styles.gestureHandle}>
        <SafeAreaView style={styles.container}>
          <ScrollView
            testID="loginScreen"
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}>
            <View style={styles.headingWrap}>
              <Text style={styles.heading}>Welcome</Text>
              <Text style={styles.heading}>Back!</Text>
            </View>

            <Formik
              initialValues={{email: '', password: ''}}
              validationSchema={validationSchema}
              onSubmit={handleSignIn}>
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
                        testID="emailInput"
                        placeholder="Email"
                        value={values.email}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        keyboardType="email-address"
                        error={touched.email && errors.email}
                        leftIcon={<UserTextFieldIcon />}
                      />
                    </View>
                    <TextField
                      testID="passwordInput"
                      placeholder="Password"
                      value={values.password}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      error={touched.password && errors.password}
                      secureTextEntry={true}
                      leftIcon={<PasswordTextFieldIcon />}
                    />
                    <View style={styles.forgotPasswordContainer}>
                      <Text
                        testID="forgotPasswordLink" 
                        style={styles.forgotPasswordText}
                        onPress={() => navigation.navigate('ForgotPassword')}>
                        Forgot Password?
                      </Text>
                    </View>

                    <View style={styles.buttonContainer}>
                      <CustomButton
                        testID="loginButton"
                        name={
                          loading ? (
                            <ActivityIndicator color="#ffffff" />
                          ) : (
                            'Login'
                          )
                        }
                        onPress={handleSubmit}
                        disabled={loading}
                      />
                    </View>

                    <View style={styles.orContainer}>
                      <Text style={styles.orText}>- OR Continue with -</Text>
                      <View style={styles.googleIconContainer}>
                        <Image source={GoogleIcon} style={styles.googleIcon} />
                      </View>
                    </View>

                    <View style={styles.signupContainer}>
                      <Text style={styles.signupText}>
                        Create An Account{' '}
                        <Text
                          testID="signUpLink"
                          style={styles.signupLink}
                          onPress={() => navigation.navigate('Signup')}>
                          Sign Up
                        </Text>
                      </Text>
                    </View>
                  </View>
                );
              }}
            </Formik>
          </ScrollView>
        </SafeAreaView>
      </GestureHandlerRootView>
    </>
  );
};

export default Login;

// Add waitFor() or toBeVisible() to Detox tests.
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
    marginBottom: 30,
  },
  forgotPasswordContainer: {
    marginTop: 5,
    alignItems: 'flex-end',
  },
  forgotPasswordText: {
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
