import { useIsFocused } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, SafeAreaView, TouchableOpacity,Image} from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';

let db = openDatabase({ name: 'tripdatabase1.db' });

const ViewAllUser = ({ navigation }) => {
  let [flatListItems, setFlatListItems] = useState([]);
  const [completedTrips, setCompletedTrips] = useState([]);
  const isFocused = useIsFocused();
  const [imageURL, setImageURL] = useState(null);
  useEffect(() => {
    getData();
  }, [isFocused]);

  const getData = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_user',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setFlatListItems(temp);
        }
      );
    });
  }
  const DeleteTrip = (id) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM table_user WHERE user_id = ?',
        [id],
        (tx, res) => {
          getData();
        }
      );
    });
  }

  const CompleteTrip = (id) => {
    setCompletedTrips([...completedTrips, id]);
  }

  const isEndDateExpired = (endDate) => {
    const currentDate = new Date();
    const tripEndDate = new Date(endDate);
    return tripEndDate < currentDate;
  }

  let listItemView = (item) => {
    const { user_id, trip_name, trip_destination, user_enddate, user_startdate } = item;
    const endDateExpired = isEndDateExpired(new Date(user_enddate));
    const isTripCompleted = completedTrips.includes(user_id);

    return (
      <View
        key={user_id}
        style={{ backgroundColor: 'white', padding: 20 }}>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <View>
           <Text>Trip Name:{trip_name}</Text>
          <Text>Destination: {trip_destination}</Text>
          <Text>Start Date: {user_enddate}</Text>
          <Text>End Date: {user_startdate}</Text>
            </View>
            <View>
        <Image
            source={require('../images/images.jpeg')}
            style={{ width: 150, height: 100,borderRadius:10 }} // Adjust the width and height as needed
          />
        </View>
          </View>
        <View style={{ justifyContent: 'space-around', flexDirection: 'row' ,marginTop:10}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('updateTrip', {
                data: {
                  id: user_id,
                  trip_name,
                  trip_destination,
                  user_enddate,
                  user_startdate,
                }
              })
            }}
            disabled={isTripCompleted}
          >
            <Text style={{ backgroundColor: 'blue', paddingHorizontal: 20, paddingVertical: 5, borderRadius: 10, color: 'white' }}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => DeleteTrip(user_id)}>
            <Text style={{ backgroundColor: 'red', paddingHorizontal: 20, paddingVertical: 5, borderRadius: 10, color: 'white' }}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              style={{
                backgroundColor: isTripCompleted ? 'gray' : endDateExpired ? 'gray' : 'green',
                paddingHorizontal: 20,
                paddingVertical: 5,
                borderRadius: 10,
                color: 'white',
                pointerEvents: isTripCompleted ? 'none' : endDateExpired ? 'none' : 'auto',
              }}
              disabled={isTripCompleted}
              onPress={() => CompleteTrip(user_id)}
            >
              {isTripCompleted ? "Journey Completed" : "Complete"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const allJourneysCompleted = flatListItems.every((item) => isEndDateExpired(item.user_enddate)) && flatListItems.length > 0;
  const completedJourneyMessage = allJourneysCompleted ? "All journeys are completed." : "";

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <FlatList
            data={flatListItems}
            keyExtractor={(item) => item.user_id.toString()}
            renderItem={({ item }) => listItemView(item)}
          />
        </View>
        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            color: 'grey'
          }}>
          {completedJourneyMessage}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default ViewAllUser;
