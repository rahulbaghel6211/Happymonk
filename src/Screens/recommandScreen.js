import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const GooglePlacesInput = () => {
  return (
    <GooglePlacesAutocomplete
      placeholder='Search'
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      query={{
        key: 'AIzaSyBJ9rQcb3687-88oGHkPOICi4rBanrENZs',
        language: 'en',
      }}
      requestUrl={{
        useOnPlatform: 'web', // or "all"
        url:
          'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api', 
        headers: {
          Authorization: `an auth token`, // if required for your proxy
        },
      }}
    />
  );
};

export default GooglePlacesInput;