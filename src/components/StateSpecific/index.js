import {Component} from 'react'
import Loader from 'react-loader-spinner'
import format from 'date-fns/format'

import Header from '../Header'
import Footer from '../Footer'
import CovidMetaState from '../CovidMetaState'
import TopDistricts from '../TopDistricts'
import ReChartBar from '../ReChartBar'
import ReChartLine from '../ReChartLine'
import './index.css'

const IndianStatesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

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
  }

  fetchTheStateSpecificData = async () => {
    this.setState({apiStatus: apiConst.loading})
    const {match} = this.props
    const {stateCode} = match.params
    const apiUrl = 'https://apis.ccbp.in/covid19-state-wise-data'
    const response = await fetch(apiUrl)
    const data = await response.json()
    const stateData = data[stateCode]

    const apiUrl2 = `https://apis.ccbp.in/covid19-timelines-data/${stateCode}`
    const response2 = await fetch(apiUrl2)
    const data2 = await response2.json()
    const stateTimelinesData = data2[stateCode]

    if (response.ok && response2.ok) {
      this.setState({
        stateTimelinesData,
        stateCovidData: stateData,
        apiStatus: apiConst.success,
      })
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
    const stateName = IndianStatesList.find(
      each => each.state_code === stateCode,
    ).state_name

    const lastUpdated = stateCovidData.meta.last_updated
    const newDate = new Date(lastUpdated)
    const formattedDate = format(newDate, 'PPP')
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
