import {Link} from 'react-router-dom'
import NotFoundIcon from '../../icons/NotFoundIcon.png'
import './index.css'

export default function NotFound() {
  return (
    <div className="not-found-card">
      <img src={NotFoundIcon} alt="not-found-pic" className="not-found-img" />
      <h1 className="not-found-heading">PAGE NOT FOUND</h1>
      <p className="not-found-para">
        we are sorry, the page you requested could not be found
        <br />
        Please go back to the homepage
      </p>
      <Link to="/" className="link">
        <button type="button" className="not-found-btn-home">
          Home
        </button>
      </Link>
    </div>
  )
}
