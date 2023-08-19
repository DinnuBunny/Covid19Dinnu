import {useState} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {ImMenu2, ImMenu3} from 'react-icons/im'

// import addToQueue1 from '../../icons/addtoqueue1.svg'
import CloseIcon from '../../icons/CloseIcon.svg'
import './index.css'

function Header(props) {
  const [popup, setPopup] = useState(false)
  const {location} = props
  const {pathname} = location

  const homeClass = `header-btn ${pathname !== '/' ? 'non-active-btn' : ''}`
  const aboutClass = `header-btn ${
    pathname !== '/about' ? 'non-active-btn' : ''
  }`

  const homeClassMd = `header-btn-md ${
    pathname !== '/' ? 'non-active-btn' : ''
  }`
  const aboutClassMd = `header-btn-md ${
    pathname !== '/about' ? 'non-active-btn' : ''
  }`

  const onClickListView = () => {
    setPopup(!popup)
  }

  const closeThePopup = () => {
    setPopup(false)
  }

  const renderMdHomeAbout = () => (
    <div className="popup-container">
      <ul className="popup-ul">
        <li className="popup-li">
          <Link to="/" className="link">
            <button
              type="button"
              className={homeClassMd}
              onClick={closeThePopup}
            >
              Home
            </button>
          </Link>
        </li>
        <li>
          <Link to="/about" className="link">
            <button
              type="button"
              className={aboutClassMd}
              onClick={closeThePopup}
            >
              About
            </button>
          </Link>
        </li>
      </ul>
      <button type="button" className="popup-close-btn" onClick={closeThePopup}>
        <img src={CloseIcon} alt="close button-img" className="close-btn" />
      </button>
    </div>
  )

  const headerHeight = popup ? '125px' : '56px'

  return (
    <>
      <header className="header-container" style={{height: headerHeight}}>
        <div className="header-container-2">
          <ul className="covid19-un">
            <li>
              <Link to="/" className="link">
                <h1 className="COVID19">
                  COVID19<span className="INDIA">INDIA</span>
                </h1>
              </Link>
            </li>
          </ul>
          <ul className="home-about-card-ul-lg">
            <li className="header-li">
              <Link to="/" className="link">
                <button type="button" className={homeClass}>
                  Home
                </button>
              </Link>
            </li>
            <li className="header-li">
              <Link to="/about" className="link">
                <button type="button" className={aboutClass}>
                  About
                </button>
              </Link>
            </li>
          </ul>
          <ul className="home-about-card-ul-md">
            <li>
              <button
                type="button"
                className="header-btn-list"
                onClick={onClickListView}
              >
                {/* <img
                  src={addToQueue1}
                  className="header-list-view"
                  alt="list view"
                /> */}
                {popup ? (
                  <ImMenu3
                    style={{width: '35px', height: '35px', color: '#f8fafc'}}
                  />
                ) : (
                  <ImMenu2
                    style={{width: '35px', height: '35px', color: '#f8fafc'}}
                  />
                )}
              </button>
            </li>
          </ul>
        </div>
        {popup ? renderMdHomeAbout() : null}
      </header>
    </>
  )
}

export default withRouter(Header)
