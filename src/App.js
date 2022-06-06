import './App.css';
import Header from './components/Header';
import Country from './components/Country';
import DetailCountry from './components/DetailCountry';
import Error from './components/Error';
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";
import { findByLabelText } from '@testing-library/react';


function App() {
 

  const [Dark, setDark] = useState(false);

  const [countriesData, setCountriesData] = useState( repeatObjects() );
  const [permanentCountriesData, setPermanentSetCountriesData] = useState( repeatObjects() );
  const [ value, setValue ] = useState('');
  const [region, setRegion] = useState('');
  const [countryCode, setCountryCode] = useState(0);


  const changeLighting = () => {
    setDark((prev) => { return !prev })
  }

  const stylesMain = {
    backgroundColor : Dark ? "hsl(207, 26%, 17%)" : "hsl(0, 0%, 98%)",
    transitionDuration: "500ms"
  }

  const stylesElements = {
    color: Dark ? "white" : "black",
    backgroundColor: Dark ? "hsl(209, 23%, 22%)" : "white",
    border: 'none',
    boxShadow:  Dark ? '1px 1px 8px #000000' : '1px 1px 8px #888888',
    transitionDuration: "500ms"
}
  const stylesSearch = {
    color: Dark ? "white" : "black",
    transitionDuration: "500ms"
  }

  //populate default state for countriesData
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
        .then(data => {
          data.map((country, i) => {
            return country["uniqueID"] = i;
          })
          setPermanentSetCountriesData(data);
          setCountriesData(data)})
}, [])

// search
useEffect( () => {
  setCountriesData(permanentCountriesData)
   if(value.length > 0) {
          let tempCountryList = [];
          let searchQuery = value.toLowerCase();
          for (const key in countriesData) {  

            let name = countriesData[key].name.common.toLowerCase();
            if (name.slice(0, searchQuery.length).indexOf(searchQuery) !== -1) {
                 tempCountryList.push(countriesData[key])
             }

          }
          if (tempCountryList.length === 0) {
            const searchField = document.getElementsByClassName('search-field');
            searchField[0].style.outline = "solid 1px red";
          } else {
            const searchField = document.getElementsByClassName('search-field');
            searchField[0].style.outline = "none";
          }
          setCountriesData(tempCountryList)
    }
}, [value])


//FILTER by REGION
useEffect( () => {
if(region.length > 0) {

         let tempCountryList = [];
        let searchQuery = region;

        for (const key in permanentCountriesData) {
          
          let name = permanentCountriesData[key].region;

            if (name.indexOf(searchQuery) !== -1) {

                 tempCountryList.push(permanentCountriesData[key])
             }
         }
         setCountriesData(tempCountryList)
 }
}, [region])

//toggles dropdown region list
const toggleList = () => {
    const continentList = document.getElementsByClassName("continent-list");
   
    if (continentList[0].style.opacity === "1") {
        continentList[0].style.opacity = "0";
        continentList[0].style.pointerEvents = "none";

    } else {
        continentList[0].style.opacity = "1";
        continentList[0].style.pointerEvents = "auto";
    }
}


// detects a change in the window location (url)
const location = useLocation();

// sets countryCode when individual country card is selected
useEffect(() => {
  let index = location.pathname.split('/')
  if (index.length > 2) {
   setCountryCode( index[index.length-1] )
  } 
}, [location])


// iterates through the countriesData making an array of country components
const countryArray = countriesData.map((country, index) => {

  return  <Country 
            isDark={ Dark }
            key={ index }
            listIndex={ country.uniqueID }
            flag={ country.flags.png } 
            name={ country.name.common } 
            population={ country.population }
            region={ country.region }
            capital={ country.capital }
            />
})

// iterates through the countriesData making an array of country components
const permanentCountryArray = permanentCountriesData.map((country, index) => {

  return  <Country 
            isDark={ Dark }
            key={ index }
            listIndex={ country.uniqueID }
            flag={ country.flags.png } 
            name={ country.name.common } 
            population={ country.population }
            region={ country.region }
            capital={ country.capital }
            />
})



// const cardContainer = document.querySelectorAll('.card-container');
// //console.log(cardContainer)

// const options = {
//   root: null,
//   threshold: 0,
//   rootMargin: "0px"
// };

// const observer = new IntersectionObserver(function(entries,observer) {
//   entries.forEach(entry => {
//     if (entry.isIntersecting) {

//       console.log(entry.target)
//       entry.target.classList.add("fade");
//     } else {
//       entry.target.classList.remove("fade");

//     }
//   })
// }, options);

// function backFire(options){
//    entries.forEach(entry => {
//     if (entry.isIntersecting) {

//       console.log(entry.target)
//       entry.target.classList.add("fade");
//     } else {
//       entry.target.classList.remove("fade");

//     }
//   })
// }, options);
// }

// cardContainer.forEach(card => {
//   observer.observe(card);
// })

//observer.observe(cardContainer)

  return (
        <div style={ stylesMain } className={`App ${Dark ? "Dark" : "Light"}`}>
        <Header isDark={ Dark } changeLighting={ changeLighting } />
        <Routes>
          <Route path="/" element={ 
            <main>
                    <div>
                  <div className="search-and-filter-section">
                      <input 
                      style={ stylesElements }
                      className="search-field" 
                      placeholder="Search for a country"
                      onChange={ event => setValue( event.target.value ) }
                      value={ value }    
                      />
                  <i class="fas fa-search" style={ stylesSearch }></i>
                          <div style={stylesElements} className="continent-list-title" onClick={ toggleList } >{ 
                          "Filter by Region " }
                          <i className="fa-solid fa-angle-down"></i>
                      <ul  style={stylesElements} className="continent-list">
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
              </main> }>
          </Route>
          <Route path="/detail/:name" element={
             <main style={ stylesMain }>
               <Link style={ stylesElements } to="/" className='back-button'><i class="fa-solid fa-arrow-left-long"></i> Back</Link>
               <DetailCountry 
               isDark={ Dark } 
               flag={ permanentCountriesData[countryCode].flags.png } 
               name={ permanentCountriesData[countryCode].name.common }
               population={ permanentCountriesData[countryCode].population }
               region={ permanentCountriesData[countryCode].region }
               capital={ permanentCountriesData[countryCode].capital }
               tld={ permanentCountriesData[countryCode].tld  }
               currencies={ permanentCountriesData[countryCode].currencies ? Object.values( permanentCountriesData[countryCode].currencies ).map((obj) => obj.name ) : "No result found" } 
               languages={ permanentCountriesData[countryCode].languages ? Object.values( permanentCountriesData[countryCode].languages ) :  "No result found"  }
               borders={ permanentCountriesData[countryCode].borders }
               
               />
            </main>
          }>
          </Route>
          <Route path="*" element={ <Error /> }/>
        </Routes>
        </div>
  );
}

export default App;
