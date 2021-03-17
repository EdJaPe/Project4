import axios from 'axios'
import React, { useState } from 'react'
import Toolbar from '../component/toolbar'
import styles from '../styles/Search.module.css'
const API_URL = process.env.NEXT_PUBLIC_API_URL
const API_KEY = process.env.NEXT_PUBLIC_API_KEY
const API_TWO = process.env.NEXT_PUBLIC_API_TWO

export default function Search() {
    const [searchQuery, setSearchQuery] = useState('')
    const [country, setCountry] = useState('')
    const [results, setResults] = useState([])
    const [searchType, setSearchType] = useState("city")
    // saved cities by using property of useState


    var options = {
        method: 'GET',
        url: API_URL,
        params: { postalCode: searchQuery, countryCode: country },
        headers: { 'x-api-key': API_KEY, 'Content-type': 'application/json' }
    };

    // If url changed to API
    var optionTwo = {
        method: 'GET',
        url: 'https://api.ambeedata.com/latest/by-city',
        params: { city: searchQuery },
        headers: { 'x-api-key': API_KEY, 'Content-type': 'application/json' }
    };



    const apiCall = async (e) => {
        // regex for Zipcode --> ^[0-9]{5}(?:-[0-9]{4})?$
        e.preventDefault()
        await axios.request(options).then(function (response) {
            if (response.data) {
                console.log(response.data);
                setResults(response.data.stations)
                console.log('👏🏼', results)
            }
        }).catch(function (error) {
            console.error(error);
        });
    }
    const apiCallTwo = async (e) => {
        e.preventDefault()
        await axios.request(optionTwo).then(function (response) {
            console.log(response.data);
            setResults(response.data.stations)
        }).catch(function (error) {
            console.error(error);
        });
    }
    // let result = results.stations.map((results, i) => {
    //         return(
    //                 <h4 key={i}>PM25:{results.PM25}</h4>
    //             )
    //         })

    // )


    let respond = results.length > 0 ? results.map((place, i) => {
        return (
            <div key={i}>
                <p>Particulate Matter 25 million<span>{place.PM25}</span></p>
                <p>Sulfuric DiOxide <span>{place.SO2}</span></p>

            </div>
        )
    }) : <h3>Your results will be here </h3>

    const selectedForm = searchType === "zip" ? (<form >
        <div>
            <label htmlFor="zipInput" >Zip code</label>
            <input id="zipCode" type="number" name="zipInput" onChange={event => setSearchQuery(event.target.value)} required />
        </div>
        <div>
            <label htmlFor="country">Country</label>
            <select onChange={e => setCountry(e.target.value)} name="country">
                <option value="null"></option>
                <option value="US">United States</option>
                <option value="IN">India</option>
            </select>
        </div>
        <button onClick={(e) => apiCall(e)}>Search</button>
    </form>) : (<div>
        <form>
            <label htmlFor="city">City</label>
            <input type="text" name="city" onChange={e => setSearchQuery(e.target.value)} required />
            <button onClick={(e) => apiCallTwo(e)}>Search</button>
        </form>
    </div>)

    return (

        <div>
            <Toolbar />
            <h1>Check your Area</h1>

            <div className="searchSelect" onChange={e => setSearchType(e.target.value)}>
                <input type="radio" name="choose" value="zip" />ZipCode Search
                    <input type="radio" name="choose" value="city" />City search
                </div>
            {selectedForm}
            <div>
                {respond}
            </div>

        </div>
    )
}