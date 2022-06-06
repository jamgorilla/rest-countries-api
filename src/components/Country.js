import React from "react";
import { Link } from "react-router-dom";

const Country = ({ isDark, flag, name, listIndex, population, region, capital, onClick }) => {


    const styles = {
        color: isDark ? "white" : "black",
        backgroundColor: isDark ? "hsl(209, 23%, 22%)" : "white",
        boxShadow:  isDark ? '1px 1px 8px #000000' : '1px 1px 8px #888888'
    }


    return (
        <Link style={{textDecoration: "none"}} to={`./detail/${ listIndex }`}>
        <div className="card-container" style={ styles }>
            <img className="country-flag" src={ flag } alt="flag" ></img>
            <div className='card-content-container'>
                <h4>{ name.substring(0, 20) }</h4>
                <div className="line-container">
                    <h5>Population: <span className="country-details">{ population }</span></h5>
                </div>
                <h5>Region: <span className="country-details">{ region }</span></h5>
                <h5>Capital: <span className="country-details">{ capital ? capital : "unlisted" }</span></h5>
            </div>
        </div>
        </Link>
    )
}

export default Country;