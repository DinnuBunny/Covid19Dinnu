import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Footer from '../Footer'
import MySelect from '../MySelect'
import CovidMetaHome from '../CovidMetaHome'
import HomeCovidData from '../HomeCovidData'
import './index.css'

const apiConst = {
  success: 'SUCCESS',
  loading: 'LOADING',
  initial: 'INITIAL',
}

class Home extends Component {
  state = {apiStatus: apiConst.initial, covidData: {}}

  componentDidMount() {
    this.fetchTheStateWiseData()
  }

  fetchTheStateWiseData = async () => {
    this.setState({apiStatus: apiConst.loading})
    const apiUrl = 'https://apis.ccbp.in/covid19-state-wise-data'
    const response = await fetch(apiUrl)
    if (response.ok) {
      const data = await response.json()
      this.setState({covidData: data, apiStatus: apiConst.success})
    }
  }

  renderLoadingView = () => (
    <div data-testid="homeRouteLoader" className="loading-container">
      <Loader
        type="TailSpin"
        color="#007bff"
        radius={1.5}
        height={80}
        width={80}
      />
    </div>
  )

  renderSuccessView = () => {
    window.scrollTo(0, 0)
    const {covidData} = this.state
    return (
      <div className="home-container">
        <MySelect />
        <CovidMetaHome covidData={covidData} />
        <HomeCovidData covidData={covidData} />
      </div>
    )
  }

  render() {
    const {apiStatus} = this.state
    return (
      <>
        <Header />
        {apiStatus === apiConst.loading && this.renderLoadingView()}
        {apiStatus === apiConst.success && this.renderSuccessView()}
        <Footer />
      </>
    )
  }
}

export default Home
