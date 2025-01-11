import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as Yup from 'yup';
import {
  GoogleIcon,
  MailIcon,
  PasswordTextFieldIcon,
  UserTextFieldIcon,
} from '../../assets/images';
import CustomButton from '../../components/CustomButton';
import TextField from '../../components/TextField';
import {Colors} from '../../constants/colors';
import {Fonts} from '../../constants/fonts';
import Toast from 'react-native-toast-message';
import {useDispatch} from 'react-redux';
import useTypedSelector from '../../hooks/useTypedSelector';
import {addUser, selectUsers} from '../../redux/users/userSlice';

// Validation Schema
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const Signup = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const usersList = useTypedSelector(selectUsers);

  const [loading, setLoading] = useState(false);

  const handleSignup = async values => {
    setLoading(true);
    try {
      const payload = {
        name: values.name,
        email: values.email.toLowerCase(),
        password: values.password,
      };

      // find user based on email
      const findUser = usersList.find(
        user => user.email === values.email.toLowerCase(),
      );

      if (findUser) {
        setLoading(false);
        Toast.show({
          type: 'error',
          text1: 'User already exists',
          position: 'top',
        });
        return;
      }

      await dispatch(addUser(payload));

      // Return a promise that resolves after 2 seconds
      await new Promise(resolve => {
        setTimeout(() => {
          Toast.show({
            type: 'success',
            text1: 'Account created successfully',
            position: 'top',
          });
          setLoading(false);
          navigation.navigate('Login');
          resolve();
        }, 2000);
      });
    } catch (error) {
      console.error('Error adding user: ', error);
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
        position: 'top',
      });
      setLoading(false);
    }
  };

  return (
    <GestureHandlerRootView style={styles.gestureHandle}>
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}>
          <View style={styles.headingWrap}>
            <Text style={styles.heading}>Create an</Text>
            <Text style={styles.heading}>account</Text>
          </View>

          <Formik
            initialValues={{
              name: '',
              email: '',
              password: '',
              confirmPassword: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSignup}>
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
                  {/* Name Field */}
                  <View style={styles.fieldContainer}>
                    <TextField
                      placeholder="Name"
                      value={values.name}
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                      error={touched.name && errors.name}
                      leftIcon={<UserTextFieldIcon />}
                    />
                  </View>

                  {/* Email Field */}
                  <View style={styles.fieldContainer}>
                    <TextField
                      placeholder="Email"
                      value={values.email}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      keyboardType="email-address"
                      error={touched.email && errors.email}
                      leftIcon={<MailIcon />}
                    />
                  </View>

                  {/* Password Field */}
                  <View style={styles.fieldContainer}>
                    <TextField
                      placeholder="Password"
                      value={values.password}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      error={touched.password && errors.password}
                      secureTextEntry={true}
                      leftIcon={<PasswordTextFieldIcon />}
                    />
                  </View>

                  {/* Confirm Password Field */}
                  <View style={styles.fieldContainer}>
                    <TextField
                      placeholder="Confirm Password"
                      value={values.confirmPassword}
                      onChangeText={handleChange('confirmPassword')}
                      onBlur={handleBlur('confirmPassword')}
                      error={touched.confirmPassword && errors.confirmPassword}
                      secureTextEntry={true}
                      leftIcon={<PasswordTextFieldIcon />}
                    />
                  </View>

                  {/* Register Agreement */}
                  <View style={styles.agreementContainer}>
                    <Text style={styles.agreementText}>
                      By clicking the{' '}
                      <Text style={styles.registerText}>Create Account</Text>{' '}
                      button, you agree
                    </Text>
                    <Text style={styles.agreementText}>
                      to the public offer
                    </Text>
                  </View>

                  {/* Create Account Button */}
                  <View style={styles.buttonContainer}>
                    <CustomButton
                      name={
                        loading ? (
                          <ActivityIndicator color="#ffffff" />
                        ) : (
                          'Create Account'
                        )
                      }
                      onPress={handleSubmit}
                      disabled={loading}
                    />
                  </View>

                  {/* OR with Google Icon */}
                  <View style={styles.orContainer}>
                    <Text style={styles.orText}>- OR Continue with -</Text>
                    <View style={styles.googleIconContainer}>
                      <Image source={GoogleIcon} style={styles.googleIcon} />
                    </View>
                  </View>

                  {/* Login Link */}
                  <View style={styles.signupContainer}>
                    <Text style={styles.signupText}>
                      I Already Have an Account{' '}
                      <Text
                        style={styles.signupLink}
                        onPress={() => navigation.navigate('Login')}>
                        Login
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
  );
};

export default Signup;

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
  agreementContainer: {
    marginTop: 0,
  },
  agreementText: {
    fontSize: 12,
    color: '#676767',
    fontFamily: Fonts.REGULAR,
  },
  registerText: {
    color: Colors.PRIMARY,
  },
  buttonContainer: {
    marginTop: 50,
  },
  orContainer: {
    marginTop: 40,
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
    marginBottom: 20,
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
