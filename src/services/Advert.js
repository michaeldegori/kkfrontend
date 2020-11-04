import { getLocationAsync } from "./LocationService";
import userRepository from "../stores/UserDataStore";
const fetch = require('node-fetch');



async function loadAdvertFromApi() {

  try {
    const { longitude, latitude } = await getLocationAsync();
    const email = userRepository.email;
    console.log(email)
    
    const response = await fetch('http://localhost:8080' + 
    `/advert?latitude=${latitude}&longitude=${longitude}&email=${email}`)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      return data;
      
    }); 
    if (!response) return res.status(404).json({message: "advert not found"})

    // let result = await response.json()
    // console.log(result)
    // return result;
  } catch (err) {
    console.log(err);
  }
}

export { loadAdvertFromApi };