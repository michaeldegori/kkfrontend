
class AdvertDataStore{
  
}
const loadAdvertFromApi = async () => {
  try {
    let result = await fetch('http://aj2263.online/acbef-api-v3')
    .then(response => response.json())
    .then(data => {
      // do something with the data here
      console.log(data)
    }); 
    return result;
  } catch (err) {
    console.log(err);
  }
}