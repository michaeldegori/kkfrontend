import * as Location from 'expo-location';
import * as Permissions  from 'expo-permissions';



class GetUserLocation {
    state = {
      errorMessage: '',
      location: null
    }


    getLocationAsync = async () => {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        this.setState({
          errorMessage: 'Permission to access location was denied',
        });
      }
  
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest
      });
      const { longitude, latitude } = location.coords
      
      this.setState({ location: {longitude, latitude} });
      console.log(location.coords.longitude)
      console.log(location.coords.latitude)
    };

}

const getLocationAsync  = new GetUserLocation();
export default getLocationAsync;

