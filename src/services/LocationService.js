import * as Location from 'expo-location';
import * as Permissions  from 'expo-permissions';



async function getLocationAsync() {
  let status  = await Location.requestPermissionsAsync();
  let errorMessage = "permission denied"
  if (!status) {
      console.log(errorMessage)
  }

  let loc = {};
    let response = await Location.getCurrentPositionAsync({});
    const long = response.coords.longitude;
    const lat = response.coords.latitude;

    if (!Object.keys(loc).length) {
      Object.assign(loc, {"x": long, "y": lat});
    }
    console.log(loc);
  
  return loc;
};

export { getLocationAsync }; 

