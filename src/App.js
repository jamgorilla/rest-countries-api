import './App.css';
import Header from './components/Header';
import Search from './components/Search';
import Filter from './components/Filter';
import CountryList from './components/CountryList';
import { useState } from "react";

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
    <div className={`App ${Dark ? "Dark" : "Light"}`}>
     <Header isDark={ Dark } changeLighting={ changeLighting } />
     <main style={ styles }>
     <Search />
     <Filter />
     <CountryList isDark={ Dark }/>
     </main>
    </div>
  );
}

export default App;
