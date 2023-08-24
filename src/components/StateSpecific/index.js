import {Component} from 'react'
import Loader from 'react-loader-spinner'
import format from 'date-fns/format'

import Header from '../Header'
import Footer from '../Footer'
import CovidMetaState from '../CovidMetaState'
import TopDistricts from '../TopDistricts'
import ReChartBar from '../ReChartBar'
import ReChartLine from '../ReChartLine'

import IndianStatesList from '../../StatesData'

import './index.css'

const apiConst = {
  success: 'SUCCESS',
  loading: 'LOADING',
  initial: 'INITIAL',
}

const metaConst = {
  confirmed: 'CONFIRMED',
  active: 'ACTIVE',
  recovered: 'RECOVERED',
  deceased: 'DECEASED',
}

class StateSpecific extends Component {
  state = {
    apiStatus: apiConst.initial,
    stateCovidData: {},
    stateTimelinesData: {},
    activeMeta: metaConst.confirmed,
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    this.fetchTheStateSpecificData()
    console.log(this.props)
  }

  fetchTheStateSpecificData = async () => {
    this.setState({apiStatus: apiConst.loading})
    const {match} = this.props
    const {stateCode} = match.params
    const isSateCodePresent = IndianStatesList.find(
      each => each.state_code === stateCode,
    )

    if (isSateCodePresent) {
      const apiUrl = 'https://apis.ccbp.in/covid19-state-wise-data'
      const response = await fetch(apiUrl)
      const data = await response.json()

      const apiUrl2 = `https://apis.ccbp.in/covid19-timelines-data/${stateCode}`
      const response2 = await fetch(apiUrl2)
      const data2 = await response2.json()

      if (response.ok && response2.ok) {
        const stateData = data[stateCode]
        const stateTimelinesData = data2[stateCode]
        this.setState({
          stateTimelinesData,
          stateCovidData: stateData,
          apiStatus: apiConst.success,
        })
      }
    } else {
      const {history} = this.props
      history.replace('/not-found')
    }
  }

  onShowMeta = activeId => {
    this.setState({activeMeta: activeId})
  }

  renderLoadingView = () => (
    <div data-testid="stateDetailsLoader" className="loading-container">
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
    const {stateCovidData, stateTimelinesData, activeMeta} = this.state
    const {match} = this.props
    const {stateCode} = match.params
    const index = IndianStatesList.findIndex(
      each => each.state_code === stateCode,
    )

    const stateName = IndianStatesList[index].state_name
    const {imageUrl} = IndianStatesList[index]

    const {population} = stateCovidData.meta
    const lastUpdated = stateCovidData.meta.last_updated
    const newDate = new Date(lastUpdated)
    const formattedDate = format(newDate, 'PPP')
    const asPerFormattedDate = format(newDate, 'dd MMM')
    const {tested} = stateCovidData.total

    return (
      <div className="state-specific-container">
        <div className="name-last-update-tested-card">
          <div className="name-last-updated-card">
            <h1 className="name-card">{stateName}</h1>
            <p className="last-updated">Last update on {formattedDate}</p>
          </div>
          <div className="tested-card">
            <p className="tested-para">
              Tested
              <br />
              <span className="tested-count">{tested}</span>
            </p>
          </div>
        </div>
        <div className="map-population-tested">
          <img src={imageUrl} alt={stateName} className="map-image" />
          <div className="population-tested">
            <h1 className="map-ncp-report">NCP report</h1>
            <div className="population-testes-container">
              <div className="title-count-container">
                <p className="map-title">Population</p>
                <p className="map-count">{population}</p>
              </div>
              <div>
                <p className="map-title">Tested</p>
                <p className="map-count">{tested}</p>
                <p className="as-of-date">
                  (As of {asPerFormattedDate} per source)
                </p>
              </div>
            </div>
          </div>
        </div>
        <CovidMetaState
          stateCovidData={stateCovidData}
          activeMeta={activeMeta}
          onShowMeta={this.onShowMeta}
        />
        <TopDistricts stateCovidData={stateCovidData} activeMeta={activeMeta} />
        <ReChartBar
          stateTimelinesData={stateTimelinesData}
          activeMeta={activeMeta}
        />
        <ReChartLine
          stateTimelinesData={stateTimelinesData}
          activeMeta={activeMeta}
        />
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

export default StateSpecific
