import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const apiConst = {
  success: 'SUCCESS',
  loading: 'LOADING',
  initial: 'INITIAL',
}

class About extends Component {
  state = {apiStatus: apiConst.initial, faqList: []}

  componentDidMount() {
    this.getTheAboutData()
  }

  getTheAboutData = async () => {
    this.setState({apiStatus: apiConst.loading})
    const apiUrl = 'https://apis.ccbp.in/covid19-faqs'
    const response = await fetch(apiUrl)
    if (response.ok) {
      const data = await response.json()
      this.setState({faqList: data.faq, apiStatus: apiConst.success})
    }
  }

  renderSuccessView = () => {
    const {faqList} = this.state
    return (
      <>
        <div className="about-container">
          <h1 className="about-heading">About</h1>
          <p className="last-updated-para">Last update on august 15th 2023.</p>
          <p className="about-para">
            COVID-19 vaccines be ready for distribution
          </p>
          <ul className="faq-ul" data-testid="faqsUnorderedList">
            {faqList.map(faq => (
              <AboutList key={faq.qno} faq={faq} />
            ))}
          </ul>
        </div>
        <Footer />
      </>
    )
  }

  renderLoadingView = () => (
    <div data-testid="aboutRouteLoader" className="loading-container-about">
      <Loader
        type="TailSpin"
        color="#007bff"
        radius={1.5}
        height={80}
        width={80}
      />
    </div>
  )

  render() {
    const {apiStatus} = this.state
    return (
      <>
        <Header />
        {apiStatus === apiConst.success
          ? this.renderSuccessView()
          : this.renderLoadingView()}
      </>
    )
  }
}

export default About

const AboutList = props => {
  const {faq} = props
  const {answer, question} = faq

  return (
    <li className="faq-list">
      <p className="question">{question}</p>
      <div
        className="answer"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{__html: answer}}
        key={faq.id}
      />
    </li>
  )
}
