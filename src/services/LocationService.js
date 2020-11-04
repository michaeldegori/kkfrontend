import * as Location from 'expo-location';
import * as Permissions  from 'expo-permissions';



async function getLocationAsync() {
  let status  = await Location.requestPermissionsAsync();
  const errorMessage = "permission denied"
  if (!status) {
      console.log(errorMessage)
  }

  const loc = {};
  const response = await Location.getCurrentPositionAsync({});
  const long = response.coords.longitude;
  const lat = response.coords.latitude;

  Object.assign(loc, {"longitude": long, "latitude": lat});

  console.log(loc);
  
  return loc;
};

export { getLocationAsync }; 