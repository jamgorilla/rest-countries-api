

const Header = (props) => {


  const styles = {
    background: props.isDark ? "hsl(209, 23%, 22%)" : "hsl(0, 0%, 100%)",
    color: props.isDark ? "hsl(0, 0%, 100%)" : "hsl(200, 15%, 8%)",
    borderBottom: props.isDark ? '3px solid hsl(209, 23%, 22%)' : '3px solid hsl(0, 0%, 90%)',
    transitionDuration: "500ms"
  }
  const btnstyles = {
    color: props.isDark ? "hsl(0, 0%, 100%)" : "hsl(200, 15%, 8%)",
    fontWeight: '500',
    transitionDuration: "500ms"
  }


    return (
        <div className="header-container" style={styles}>
            <h3>Where in the world?</h3>
            <button className="mode-button" style={btnstyles} onClick={ props.changeLighting } >{props.isDark ? <h4><i className="fa-solid fa-moon"></i>  Light Mode</h4> : <h4><i className="fa-solid fa-moon"></i>  Dark Mode</h4> }</button>
        </div>
    )
}

export default Header;