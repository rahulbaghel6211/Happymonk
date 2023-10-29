import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import { useRoute } from '@react-navigation/native'; // Import the useRoute hook

let db = openDatabase({ name: 'tripdatabase1.db' });

const UpdatedTrip = ({ navigation }) => {
  const route = useRoute(); // Get the route object
  const [tripName, setTripName] = useState('');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    setTripName(route.params.data.trip_name);
    setEndDate(route.params.data.user_enddate);
    setStartDate(route.params.data.user_startdate);
    setDestination(route.params.data.trip_destination)
    console.log("route.params.data", route.params.data);
  }, [route]); // Include route as a dependency

  const UpdateData = () => {
    db.transaction(txn=>{
        txn.executeSql("UPDATE table_user set trip_name=?, trip_destination=? , user_enddate=?, user_startdate=? where user_id=?",
        [tripName, destination, startDate, endDate,route.params.data.id],(txn,res)=>{
            console.log("res",res)
            navigation.goBack()
        })
    })
    // Add your logic for saving data here
  };

  return (
    <View>
      <Text>Trip Name:</Text>
      <TextInput
        style={{ borderWidth: 1, marginTop: 10 }}
        value={tripName}
        onChangeText={(text) => setTripName(text)}
        placeholder="Enter trip name"
      />

      <Text>Destination:</Text>
      <TextInput
        style={{ borderWidth: 1, marginTop: 10 }}
        value={destination}
        onChangeText={(text) => setDestination(text)}
        placeholder="Enter destination"
      />

      <Text>Start Date:</Text>
      <TextInput
        style={{ borderWidth: 1, marginTop: 10 }}
        value={startDate}
        onChangeText={(text) => setStartDate(text)}
        placeholder="Enter start date"
      />

      <Text>End Date:</Text>
      <TextInput
        style={{ borderWidth: 1, marginTop: 10 }}
        value={endDate}
        onChangeText={(text) => setEndDate(text)}
        placeholder="Enter end date"
      />

      <Button title="Update" onPress={() => UpdateData()} />
    </View>
  );
};

export default UpdatedTrip;
