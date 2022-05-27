

const Header = (props) => {


  const styles = {
    background: props.isDark ? "hsl(209, 23%, 22%)" : "hsl(0, 0%, 100%)",
    color: props.isDark ? "hsl(0, 0%, 100%)" : "hsl(200, 15%, 8%)",
    borderBottom: props.isDark ? '3px solid hsl(209, 23%, 22%)' : '3px solid hsl(0, 0%, 90%)'
  }
  const btnstyles = {
    color: props.isDark ? "hsl(0, 0%, 100%)" : "hsl(200, 15%, 8%)",
    fontWeight: '500'
  }


    return (
        <div className="header-container" style={styles}>
            <h3>Where in the world?</h3>
            <button className="mode-button" style={btnstyles} onClick={ props.changeLighting } >{props.isDark ? <h4><span className="moon-icon"></span> Light Mode</h4> : <h4><span className="moon-icon"></span> Dark Mode</h4> }</button>
        </div>
    )
}

export default Header;