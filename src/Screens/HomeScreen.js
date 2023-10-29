import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';

let db = openDatabase({ name: 'tripdatabase1.db' });

const HomeScreen = ({ navigation }) => {
  const [tripName, setTripName] = useState('');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [validationError, setValidationError] = useState('');

  const errorHandler = (error) => {
    // console.error('Error:', error);
  };

  const validateInput = () => {
    if (!tripName || !destination || !startDate || !endDate) {
      setValidationError('Please fill in all fields');
      return false;
    }
    setValidationError('');
    return true;
  };

  const saveData = () => {
    if (validateInput()) {
      db.transaction((txn) => {
        txn.executeSql(
          'INSERT INTO table_user(trip_name, trip_destination, user_startdate, user_enddate) VALUES(?,?,?,?)',
          [tripName, destination, startDate, endDate],
          (txn, res) => {
            if (res.rowsAffected === 1) {
              console.log('Data saved successfully.', res);
              navigation.navigate('AllTrip');
            } else {
              errorHandler();
              navigation.navigate('AllTrip');
            }
          }
        );
      });
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={{ fontSize: 24, fontWeight: '800' }}>
          Users can create a new trip here
        </Text>
      </View>
      <Text style={styles.label}>Trip Name:</Text>
      <TextInput
        style={styles.input}
        value={tripName}
        onChangeText={(text) => setTripName(text)}
        placeholder="Enter trip name"
      />

      <Text style={styles.label}>Destination:</Text>
      <TextInput
        style={styles.input}
        value={destination}
        onChangeText={(text) => setDestination(text)}
        placeholder="Enter destination"
      />

      <Text style={styles.label}>Start Date:</Text>
      <TextInput
        style={styles.input}
        value={startDate}
        onChangeText={(text) => setStartDate(text)}
        placeholder="Enter start date"
      />

      <Text style={styles.label}>End Date:</Text>
      <TextInput
        style={styles.input}
        value={endDate}
        onChangeText={(text) => setEndDate(text)}
        placeholder="Enter end date"
      />

      {validationError ? (
        <Text style={styles.validationError}>{validationError}</Text>
      ) : null}

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
        <TouchableOpacity>
          <Text
            style={{ backgroundColor: 'blue', paddingHorizontal: 20, paddingVertical: 5, color: 'white', borderRadius: 10 }}
            onPress={() => saveData()}>
            Create Trip
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={{ backgroundColor: 'blue', paddingHorizontal: 20, paddingVertical: 5, borderRadius: 10, color: 'white' }}
            onPress={() => navigation.navigate('AllTrip')}>
            See All Trip
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity>
          <Text
            style={{ backgroundColor: 'blue', paddingHorizontal: 20, paddingVertical:10, borderRadius: 10, color: 'white',marginTop:30 ,textAlign:'center'}}
            onPress={() => navigation.navigate('google')}>
            recommended Place search
          </Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    marginTop: 10,
    padding: 10,
  },
  validationError: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
};

export default HomeScreen;
