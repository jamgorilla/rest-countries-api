import './App.css';
import Header from './components/Header';
import CountryList from './components/CountryList';
import Country from './components/Country';
import Error from './components/Error';
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  const [Dark, setDark] = useState(false);

  const changeLighting = () => {
    setDark((prev) => { return !prev })
  }

  const styles = {
    backgroundColor : Dark ? "hsl(207, 26%, 17%)" : "hsl(0, 0%, 98%)",
    paddingLeft: '4rem',
    paddingRight: '4rem'
  }

  return (
    <Router>
        <div className={`App ${Dark ? "Dark" : "Light"}`}>
        <Header isDark={ Dark } changeLighting={ changeLighting } />
        <Routes>
          <Route path="/" element={ 
            <main style={ styles }>
              <CountryList isDark={ Dark }/>
              </main> }>
          </Route>
          <Route path="/detail" element={
             <main style={ styles }>
               <h1>HI</h1>
               <a href="/">BACK</a>
               <Country population={ "100" } 
               region={"US"} 
               capital={"NY"} 
               isDark={ Dark } 
               flag={ "https://waste4change.com/blog/wp-content/uploads/niko-photos-tGTVxeOr_Rs-unsplash-1024x683.jpg" } 
               name={"georgea"}/>
            </main>
          }>
          </Route>
          <Route path="*" element={ <Error /> }/>
        </Routes>
        </div>
    </Router>
  );
}

export default App;
