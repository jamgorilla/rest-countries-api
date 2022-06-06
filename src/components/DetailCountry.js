import React, { useState, useEffect } from "react";


const DetailCountry = ({ isDark, countriesData, flag, name, population, region, capital, tld, languages, currencies, borders, onClick }) => {

    const styles = {
        color: isDark ? "white" : "black"
    }
    
    const stylesElements = {
        color: isDark ? "white" : "black",
        backgroundColor: isDark ? "hsl(209, 23%, 22%)" : "white",
        border: 'none',
        boxShadow:  isDark ? '1px 1px 8px #000000' : '1px 1px 8px #888888'
    }

    let bordersArray = [];

 if (borders) {

     console.log(borders, "borderCode")
     bordersArray = borders.map((borderCode) => {
     return <li style={ stylesElements }  className="border-list-item">{borderCode}</li>
 })
 } 


    return (
        <div className="detail-card-container" style={ styles }>
            <img className="country-flag" src={ flag } alt="flag" onClick={ onClick   } ></img>
            <div className='card-content-container'>
                <h2>{ name }</h2>
                <div className="line-container">
                    <h5>Population: <span className="country-details">{ population }</span></h5>
                </div>
                <h5>Region: <span className="country-details">{ region }</span></h5>
                <h5>Capital: <span className="country-details">{ capital ? capital : "unlisted" }</span></h5>
                <h5>Top Level Domain: <span className="country-details">{ tld ? tld : "unlisted" }</span></h5>

                <h5>Currencies: <span className="country-details">{ 
                typeof currencies == "object" ? currencies.length > 1 ? currencies.join(', ') : currencies : currencies
                }</span></h5>
                <h5>Languages: <span className="country-details">{ 
                typeof languages == "object" ? languages.length > 1 ? languages.join(', ') : languages : languages
                }</span></h5>
                <div className="border-line-container">
                <h5 style={{whiteSpace: "nowrap"}}>Border Countries: 
                </h5>
                    <ul className="border-item-list-container">
                       { bordersArray }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default DetailCountry;