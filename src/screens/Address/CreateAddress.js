import {useNavigation, useRoute} from '@react-navigation/native';
import {Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import * as Yup from 'yup';
import {leftArrow} from '../../assets/images';
import CustomButton from '../../components/CustomButton';
import TextField from '../../components/TextField';
import {Colors} from '../../constants/colors';
import {Fonts} from '../../constants/fonts';
import {addAddress, updateAddress} from '../../redux/address/addressSlice';

// Validation Schema
const validationSchema = Yup.object().shape({
  state: Yup.string().required('State is required'),
  city: Yup.string().required('City is required'),
  postalCode: Yup.string().required('Postal Code is required'),
  address: Yup.string().required('Address is required'),
  phone: Yup.string().required('Phone is required'),
});

const CreateAddress = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  const [isHome, setIsHome] = useState(true);

  // Get the address from the route params
  const {address, comeFromCart} = route.params || {};

  // Initial values for Formik
  const initialValues = {
    state: address ? address.state : '',
    city: address ? address.city : '',
    postalCode: address ? address.postal : '',
    address: address ? address.address : '',
    phone: address ? address.phone : '',
  };

  const handleSave = values => {
    const addressData = {
      id: address ? address.id : Date.now().toString(), // Use existing ID or generate new
      state: values.state,
      city: values.city,
      postal: values.postalCode,
      address: values.address,
      addressType: isHome ? 'Home' : 'Office',
      phone: values.phone,
    };

    if (address) {
      // Update the existing address
      dispatch(updateAddress({id: address.id, updatedAddress: addressData}));
    } else {
      // Add new address
      dispatch(addAddress(addressData));
    }
    if (comeFromCart) {
      navigation.reset({
        index: 2,
        routes: [{name: 'Cart', params: {comeFromProductDetail: true}}],
      });
    } else {
      navigation.navigate('AddressList');
    }
  };

  useEffect(() => {
    if (address) {
      setIsHome(address.addressType === 'Home');
    }
  }, [address]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => {
            if (comeFromCart) {
              navigation.reset({
                index: 2,
                routes: [{name: 'Cart', params: {comeFromProductDetail: true}}],
              });
            } else {
              navigation.goBack();
            }
          }}>
          <Image source={leftArrow} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>
          {address ? 'Edit Address' : 'Create Address'}
        </Text>
        <Text style={styles.h}>H</Text>
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
            <View style={styles.formContainer}>
              <View style={styles.fieldContainer}>
                <TextField
                  placeholder="State"
                  value={values.state}
                  onChangeText={handleChange('state')}
                  onBlur={handleBlur('state')}
                  error={touched.state && errors.state}
                  inputWrap={{
                    height: 48,
                    backgroundColor: 'transparent',
                    borderRadius: 8,
                  }}
                />
              </View>

              <View style={styles.fieldContainer}>
                <TextField
                  placeholder="City"
                  value={values.city}
                  onChangeText={handleChange('city')}
                  onBlur={handleBlur('city')}
                  error={touched.city && errors.city}
                  inputWrap={{
                    height: 48,
                    backgroundColor: 'transparent',
                    borderRadius: 8,
                  }}
                />
              </View>

              <View style={styles.fieldContainer}>
                <TextField
                  placeholder="Postal Code"
                  value={values.postalCode}
                  onChangeText={handleChange('postalCode')}
                  onBlur={handleBlur('postalCode')}
                  error={touched.postalCode && errors.postalCode}
                  keyboardType="number-pad"
                  inputWrap={{
                    height: 48,
                    backgroundColor: 'transparent',
                    borderRadius: 8,
                  }}
                />
              </View>

              <View style={styles.fieldContainer}>
                <TextField
                  placeholder="Address"
                  value={values.address}
                  onChangeText={handleChange('address')}
                  onBlur={handleBlur('address')}
                  error={touched.address && errors.address}
                  inputWrap={{
                    height: 48,
                    backgroundColor: 'transparent',
                    borderRadius: 8,
                  }}
                />
              </View>

              <View style={styles.fieldContainer}>
                <TextField
                  placeholder="Phone"
                  value={values.phone}
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  error={touched.phone && errors.phone}
                  keyboardType="number-pad"
                  inputWrap={{
                    height: 48,
                    backgroundColor: 'transparent',
                    borderRadius: 8,
                  }}
                />
              </View>

              <View style={styles.toggleContainer}>
                <TouchableOpacity
                  style={[styles.toggleButton, isHome && styles.activeToggle]}
                  onPress={() => setIsHome(true)}>
                  <Text
                    style={[
                      styles.toggleText,
                      isHome && styles.activeToggleText,
                    ]}>
                    Home
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.toggleButton, !isHome && styles.activeToggle]}
                  onPress={() => setIsHome(false)}>
                  <Text
                    style={[
                      styles.toggleText,
                      !isHome && styles.activeToggleText,
                    ]}>
                    Office
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.buttonWrap}>
                <CustomButton
                  name={
                    loading ? (
                      <ActivityIndicator color="#ffffff" />
                    ) : address ? (
                      'Update'
                    ) : (
                      'Create'
                    )
                  }
                  onPress={handleSubmit}
                  disabled={loading}
                />
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateAddress;

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
    marginHorizontal: 16,
  },
  formContainer: {
    marginTop: 25,
  },
  fieldContainer: {
    marginBottom: 15,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  toggleButton: {
    flex: 1,
    padding: 8,
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 5,
  },
  activeToggle: {
    backgroundColor: '#44b678',
  },
  toggleText: {
    fontSize: 14,
    color: '#333',
  },
  activeToggleText: {
    color: '#fff',
  },
  buttonWrap: {
    marginTop: 20,
  },
});
