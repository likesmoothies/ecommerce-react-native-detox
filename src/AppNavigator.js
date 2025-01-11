import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {Image, StatusBar, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {LoaderImg} from './assets/images';
import {Colors} from './constants/colors';
import {selectedUser, setUser} from './redux/auth/authSlice'; // Assuming you have setUser action
import AddressList from './screens/Address/AddressList';
import CreateAddress from './screens/Address/CreateAddress';
import ChangePassword from './screens/Authentication/ChangePassword';
import ForgotPassword from './screens/Authentication/ForgotPassword';
import Login from './screens/Authentication/Login';
import Signup from './screens/Authentication/Signup';
import Cart from './screens/Cart/Cart';
import Checkout from './screens/Cart/Checkout';
import History from './screens/History';
import Main from './screens/Main';
import Payment from './screens/Payment/Payment';
import PreMain from './screens/PreMain';
import ProductDetail from './screens/Products/ProductDetail';
import Home from './screens/tabs/Home';
import Welcome from './screens/Welcome/Welcome';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const loginUser = useSelector(selectedUser);

  useEffect(() => {
    // Fetch user from AsyncStorage on app load
    const checkUser = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        if (user) {
          dispatch(setUser(JSON.parse(user)));
        }
      } catch (error) {
        console.error('Error retrieving user from AsyncStorage:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();
  }, [dispatch]);

  // Show loading screen while checking AsyncStorage
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar
          barStyle="dark-content"
          translucent
          backgroundColor={Colors.PRIMARY_BG}
        />
        <Image source={LoaderImg} style={styles.loaderImg} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {loginUser ? (
          <>
            <Stack.Screen
              name="PreMain"
              component={PreMain}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="Main"
              component={Main}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="ProductDetail"
              component={ProductDetail}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="History"
              component={History}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="ChangePassword"
              component={ChangePassword}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="Payment"
              component={Payment}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="Cart"
              component={Cart}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="Checkout"
              component={Checkout}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="AddressList"
              component={AddressList}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="CreateAddress"
              component={CreateAddress}
              options={{
                headerShown: false,
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Welcome"
              component={Welcome}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="Signup"
              component={Signup}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPassword}
              options={{
                headerShown: false,
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderImg: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
});
