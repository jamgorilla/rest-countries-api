import { useState, useEffect } from "react";
import Country from "./Country";


const CountryList = ( props ) => {

    const [countriesData, setCountriesData] = useState( repeatObjects() );
    const [ value, setValue ] = useState('');
    const [region, setRegion] = useState('');

    const styles = {
        color: props.isDark ? "white" : "black",
        backgroundColor: props.isDark ? "hsl(209, 23%, 22%)" : "white",
        border: 'none',
        boxShadow:  props.isDark ? '1px 1px 8px #000000' : '1px 1px 8px #888888'
    }


    function repeatObjects(){
        let tempArray = []
        for (let i = 0; i < 250;i++) {
            tempArray.push({
                flags: {png: ''},
                name: {common: ''},
                region: '',
                capital: ['']
            })
        }
        return tempArray
    }


    // fetch all countries data
    useEffect( () => {
        fetch("https://restcountries.com/v3.1/all")
            .then(res => res.json())
            .then(data => setCountriesData(data))
   }, [])

   // search
   useEffect( () => {
       if(value.length > 0) {

           fetch("https://restcountries.com/v3.1/all")
           .then(res => res.json())
           .then(data => {
                let tempCountryList = [];
               let searchQuery = value.toLowerCase();
               for (const key in data) {
                    let name = data[key].name.common.toLowerCase();
                   if (name.slice(0, searchQuery.length).indexOf(searchQuery) !== -1) {

                        // console.log(name, searchQuery, data[key])
                        tempCountryList.push(data[key])
                    }
                }
                setCountriesData(tempCountryList)
            }).catch(error => {
                console.log(error)
            })
           
        }
}, [value])

// filter
// const handleContinent = (region) => {
//     console.log(region)
// }

//FILTER REGION
useEffect( () => {
    console.log('change in region', region)
    if(region.length > 0) {

        fetch("https://restcountries.com/v3.1/all")
        .then(res => res.json())
        .then(data => {
             let tempCountryList = [];
            let searchQuery = region;
            console.log("DATA", data);
            for (const key in data) {
               // console.log(data[key])
                 let name = data[key].region;
                if (name.indexOf(searchQuery) !== -1) {

                     // console.log(name, searchQuery, data[key])
                     tempCountryList.push(data[key])
                 }
             }
             setCountriesData(tempCountryList)
         }).catch(error => {
             console.log(error)
         })
        
     }
}, [region])

    const toggleList = () => {
        const continentList = document.getElementsByClassName("continent-list");
       // console.log(continentList)
        if (continentList[0].style.visibility === "visible") {
            continentList[0].style.visibility = "hidden";
        } else {
            continentList[0].style.visibility = "visible";
        }
    }


    const countryArray = countriesData.map((country, index) => {
      return  <Country 
                isDark={ props.isDark }
                key={ index }
                flag={ country.flags.png } 
                name={ country.name.common } 
                population={ country.population }
                region={ country.region }
                capital={ country.capital }
                />
    })


    return (
        <div>
            <div className="search-and-filter-section">
                <input 
                style={ styles }
                className="search-field" 
                placeholder="Search for a country"
                onChange={ event => setValue( event.target.value ) }
                value={ value }    
                />
                <div style={styles} className="continent-list-title" onClick={ toggleList } >{region === '' ? "Filter by Region" : region }
                <ul  style={styles} className="continent-list">
                    <li value="Africa" onClick={ event => setRegion( "Africa" )  }>Africa</li>
                    <li value="America" onClick={event => setRegion( "America" ) }>America</li>
                    <li value="Asia" onClick={event => setRegion( "Asia" )}>Asia</li>
                    <li value="Europe" onClick={event => setRegion( "Europe" )}>Europe</li>
                    <li value="Oceania" onClick={ event => setRegion( "Oceania" )}>Oceania</li>
                </ul>
                </div>
            </div>
            <ul className="country-list-container">
                { countryArray }
            </ul>

        </div>
    )
}

export default CountryList;