import axios from 'axios'
import React, { useState } from 'react'
import Toolbar from '../component/toolbar'
import styles from '../styles/Search.module.css'
const API_URL = process.env.NEXT_PUBLIC_API_URL
const API_KEY = process.env.NEXT_PUBLIC_API_KEY


export default function Search() {
    const [searchQuery, setSearchQuery] = useState('')
    const [country, setCountry] = useState('')
    const [result, setResult] = useState([null])

    var options = {
        method: 'GET',
        url: 'https://api.ambeedata.com/latest/by-postal-code',
        params: { postalCode: searchQuery, countryCode: country},
        headers: { 'x-api-key': API_KEY, 'Content-type': 'application/json' }
    };
    // const options = {
    //     "method": "GET",
    //     "hostname": "api.ambeedata.com",
    //     "port": null,
    //     "path": "/latest/by-city?city="+`${searchQuery}`,
    //     "headers": {
    //         "x-api-key": API_KEY,
    //         "Content-type": "application/json"
    //     }
    // };



    // let result;
    const apiCall = (e) => {
        console.log("💰", searchQuery)
        console.log("⛑", country)

        e.preventDefault()
        axios.request(options).then(function (response) {
            console.log(response.data);
            setResult(response.data)
        }).catch(function (error) {
            console.error(error);
        });       
    }

    // let results = result.stations.map((place, i)=> {
    //     if(place.length > 0) {
    //         return(                        
    //                 <h3 key={i}>PM25:{place.PM25}</h3>                        
    //         )                        
    //         }else {
    //             return(
    //                 <h3>Your results are Loading....</h3>
    //             )}
    // } )
    return (

        <div>
            <Toolbar />
            <h1>Check your Area</h1>
            <form action="/">
            <div>
                <label htmlFor="zipInput" >Zip code</label>
                <input id="zipCode" type="text" name="zipInput" onChange={event => setSearchQuery(event.target.value)} required />
            </div>
            <div>
                <label htmlFor="country">Country</label>
                <select onChange={e => setCountry(e.target.value)}  name="country">
                    <option value="null"></option>
                    <option value="US">United States</option>
                    <option value="IN">India</option>
                </select>
            </div>
            <button onClick={(e) => apiCall(e)}>Search</button>

            </form>
            <div>
                {/* <p>{result}</p> */}
            </div>


        </div>
    )
}