import {VscGithubAlt} from 'react-icons/vsc'
import {FiInstagram} from 'react-icons/fi'
import {FaTwitter} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import './index.css'

export default function Footer() {
  return (
    <footer className="footer-container">
      <Link to="/" className="link">
        <h1 className="COVID19">
          COVID19<span className="INDIA">INDIA</span>
        </h1>
      </Link>
      <p className="footer-para">
        we stand with everyone fighting on the front lines
      </p>
      <ul className="follow-us-icons-card">
        <li className="follow-us-icons-list">
          <a
            href="https://github.com/DinnuBunny"
            target="_blank"
            rel="noreferrer"
          >
            <button type="button" className="follow-us-icon-btn">
              <VscGithubAlt className="follow-us-icon" />
            </button>
          </a>
        </li>
        <li className="follow-us-icons-list">
          <a
            href="https://www.instagram.com/dinnubunny/"
            target="_blank"
            rel="noreferrer"
          >
            <button type="button" className="follow-us-icon-btn">
              <FiInstagram className="follow-us-icon" />
            </button>
          </a>
        </li>
        <li className="follow-us-icons-list">
          <a
            href="https://twitter.com/Dinnubunny"
            target="_blank"
            rel="noreferrer"
          >
            <button type="button" className="follow-us-icon-btn">
              <FaTwitter className="follow-us-icon" />
            </button>
          </a>
        </li>
      </ul>
    </footer>
  )
}
