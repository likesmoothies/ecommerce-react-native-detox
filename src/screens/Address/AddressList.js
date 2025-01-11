import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {AddIcon, DeleteIcon, EditTwoIcon, leftArrow} from '../../assets/images';
import {Colors} from '../../constants/colors';
import {Fonts} from '../../constants/fonts';
import useTypedSelector from '../../hooks/useTypedSelector';
import {
  deleteAddress,
  selectAddress,
  setDefaultAddress,
} from '../../redux/address/addressSlice';

const AddressList = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const addressList = useTypedSelector(selectAddress);

  const handleDelete = id => {
    Alert.alert(
      'Delete Address',
      'Are you sure you want to delete this address?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => dispatch(deleteAddress(id)),
          style: 'destructive',
        },
      ],
      {cancelable: true},
    );
  };

  const handleSetDefault = id => {
    dispatch(setDefaultAddress(id));
  };

  const renderItem = ({item}) => (
    <>
      <TouchableOpacity
        style={[styles.addAddress, item.isDefault && styles.defaultCard]}
        onPress={() => handleSetDefault(item.id)}>
        <View style={styles.innerWrap}>
          <Text style={styles.tagTitle}>Address:</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('CreateAddress', {address: item})
            }>
            <Image source={EditTwoIcon} style={styles.editIcon} />
          </TouchableOpacity>
        </View>

        <Text style={styles.cardTitle}>
          {item.addressType ? item.addressType : 'Home'}
        </Text>
        <View style={styles.addressOuter}>
          <Text style={styles.tagTitleTwo}>
            {item.address}, {item.city}, {item.state}, {item.postal}
          </Text>
        </View>

        <View style={styles.deleteWrap}>
          <View style={styles.contactWrap}>
            <Text style={styles.tagTitleTwo}>Contact:</Text>
            <Text style={styles.tagTitleTwo}>{item.phone}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              handleDelete(item.id);
            }}>
            <Image source={DeleteIcon} style={styles.deleteIcon} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Image source={leftArrow} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>Address List</Text>
        <Text style={styles.h}>H</Text>
      </View>

      {addressList.length > 0 && (
        <Text style={styles.cardSubTitle}>
          Click on the card to make it the default delivery
        </Text>
      )}

      <View style={styles.addressWrap}>
        <FlatList
          data={addressList}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('CreateAddress')}>
        <Image source={AddIcon} style={styles.add} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AddressList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY_BG,
  },
  listContainer: {
    paddingBottom: 80,
    marginTop: 15,
  },
  cardSubTitle: {
    fontSize: 11,
    fontFamily: Fonts.REGULAR,
    color: Colors.BLACK,
    marginHorizontal: 16,
    marginTop: 10,
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
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 50,
    padding: 15,
    elevation: 5,
  },
  add: {
    width: 18,
    height: 18,
    tintColor: '#ffffff',
  },
  addAddress: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    borderRadius: 6,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 15,
    // height: 75,
  },
  innerWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  tagTitle: {
    fontSize: 12,
    fontFamily: Fonts.MEDIUM,
    color: Colors.BLACK,
    marginBottom: 6,
  },
  editIcon: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    position: 'absolute',
    right: 0,
    top: -3,
  },
  tagTitleTwo: {
    fontSize: 12,
    fontFamily: Fonts.REGULAR,
    color: Colors.BLACK,
  },
  contactWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  addressWrap: {
    marginHorizontal: 16,
  },
  cardTitle: {
    borderColor: '#44b678',
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 12,
    paddingVertical: 2,
    paddingHorizontal: 5,
    width: 50,
    textAlign: 'center',
    marginBottom: 8,
  },

  deleteWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deleteIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  defaultCard: {
    borderColor: '#44b678',
    borderWidth: 1,
  },
});
