import {Link} from 'react-router-dom'

import ThemeContext from '../../context/ThemContext'

import styles from './styles.module.scss'

const Navbar = () => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkTheme, toggleTheme} = value
      return (
        <>
          {!isDarkTheme ? (
            <div className={styles.navbarcontainerlight}>
              <img
                src="https://assets.ccbp.in/frontend/react-js/website-logo-light-theme-img.png"
                className={styles.websitelogo}
                alt="website logo"
              />
              <ul className={styles.middleitems}>
                <li className={styles.listitem} >
                  <Link to="/" className={styles.listlight}>
                    Home
                  </Link>
                </li>
                <li className={styles.listitem} >
                  <Link to="/productos" className={styles.listlight}>
                    Products
                  </Link>
                </li>
                <li className={styles.listitem} >
                  <Link to="/about" className={styles.listlight}>
                    About
                  </Link>
                </li>
              </ul>
              <button
                type="button"
                className={styles.themebutton}
                testid="theme"  
                onClick={toggleTheme}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/dark-theme-img.png"
                  className={styles.themeimg}
                  alt="theme"
                />
              </button>
            </div>
          ) : (
            <div className={styles.navbarcontainerdark}>
              <img
                src="https://assets.ccbp.in/frontend/react-js/website-logo-dark-theme-img.png"
                className="website-logo"
                alt="website logo"
              />
              <ul className={styles.middleitems}>
                <li className={styles.listitem} >
                  <Link to="/" className="link-dark">
                    Home
                  </Link>
                </li>
                <li className={styles.listitem} >
                  <Link to="/productos" className="link-dark">
                    Products
                  </Link>
                </li>
                <li className={styles.listitem} >
                  <Link to="/about" className="link-dark">
                    About
                  </Link>
                </li>
              </ul>
              <button
                type="button"
                className={styles.themebutton}
                testid="theme"
                onClick={toggleTheme}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/light-theme-img.png"
                  className="theme-img"
                  alt="theme"
                />
              </button>
            </div>
          )}
        </>
      )
    }}
  </ThemeContext.Consumer>
)

export default Navbar
