import axios from 'axios'
const API_URL = process.env.NEXT_PUBLIC_API_URL
const API_KEY = process.env.NEXT_PUBLIC_API_KEY

export default function Search () {
console.log('😪', API_KEY)
    
    var options = {
        method: 'GET',
        url: 'https://api.ambeedata.com/latest/by-postal-code',
        params: {postalCode: '95051', countryCode: 'US'},
        headers: {'x-api-key': API_KEY, 'Content-type': 'application/json'}
      };
    //   axios.request(options).then(function (response) {
    //       console.log(response.data);
    //   }).catch(function (error) {
    //       console.error(error);
    //   });
    const apiCall = (e) => { 
        e.preventDefault() 
        axios.request(options).then(function (response) {
            console.log(response.data);
        }).catch(function (error) {
            console.error(error);
        });
        
        // axios.get(API_URL+95051)
        // .then(response => console.log(response))
        // .catch(err => console.log(err))
    } 




    return(
        <div>
            <h1>Check your Area</h1>
            <form>
                <label>Zip code</label>
                <input type="text" ></input>
                <button onClick={(e) => apiCall(e)}>Search</button>
            </form>
        </div>
    )
}