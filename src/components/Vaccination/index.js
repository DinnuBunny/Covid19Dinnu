import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'

import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const apiConsts = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
}

const initialStateDistrict = {
  stateId: 'selectState',
  districtId: 'selectDistrict',
}

const apiStatus = {
  stateDropdownApi: apiConsts.initial,
  districtDropdownApi: apiConsts.initial,
  vaccinationDataApi: apiConsts.initial,
}

class Vaccination extends Component {
  state = {
    ...initialStateDistrict,
    statesData: [],
    districtsData: [],
    ...apiStatus,
  }

  componentDidMount() {
    this.getTheStateIdsData()
    this.getTheVaccinationData()
  }

  getTheStateIdsData = async () => {
    this.setState({stateDropdownApi: apiConsts.loading})
    const stateIdsApis = 'https://apis.ccbp.in/covid19-state-ids'
    const response = await fetch(stateIdsApis)
    if (response.ok) {
      const data = await response.json()
      this.setState({
        statesData: data.states,
        stateDropdownApi: apiConsts.success,
      })
      //   console.log(data.states)
    }
  }

  getTheVaccinationData = async () => {
    // const vaccinationApiUrl = 'https://apis.ccbp.in/covid19-vaccination-data'
    // const response = await fetch(vaccinationApiUrl)
    // if (response.ok) {
    //   const data = await response.json()
    //   console.log(data)
    // }
  }

  getTheDistrictsData = async () => {
    this.setState({districtsData: [], districtDropdownApi: apiConsts.loading})
    const {stateId} = this.state
    const districtApiURL = `https://apis.ccbp.in/covid19-districts-data/${stateId}`
    const response = await fetch(districtApiURL)
    if (response.ok) {
      const data = await response.json()
      this.setState({
        districtsData: data.districts,
        districtDropdownApi: apiConsts.success,
      })
      //   console.log(data.districts)
    }
  }

  onSelectState = id => this.setState({stateId: id}, this.getTheDistrictsData)

  onSelectDistrict = id => this.setState({districtId: id})

  onClickCountryName = () =>
    this.setState(
      {
        ...initialStateDistrict,
        stateDropdownApi: apiConsts.initial,
        districtDropdownApi: apiConsts.initial,
      },
      this.getTheStateIdsData,
    )

  render() {
    const {
      stateId,
      districtId,
      statesData,
      stateDropdownApi,
      districtsData,
      districtDropdownApi,
    } = this.state

    return (
      <>
        <Header />
        <div className="vaccination-container">
          <HomeIndiaStateName
            stateId={stateId}
            statesData={statesData}
            onClickCountryName={this.onClickCountryName}
          />
          <div className="state-district-dropdown">
            <StatesDropdown
              activeStateId={stateId}
              onSelectState={this.onSelectState}
              statesData={statesData}
              stateDropdownApi={stateDropdownApi}
            />
            <DistrictsDropdown
              activeDistrictId={districtId}
              onSelectDistrict={this.onSelectDistrict}
              districtsData={districtsData}
              districtDropdownApi={districtDropdownApi}
            />
          </div>
        </div>
        <Footer />
      </>
    )
  }
}

export default Vaccination

const HomeIndiaStateName = props => {
  const {stateId, statesData, onClickCountryName} = props
  let stateName

  if (stateId !== 'selectState') {
    stateName = statesData.find(each => each.state_id === parseInt(stateId))
      .state_name
  }

  const onClickIndia = () => onClickCountryName()

  return (
    <ul className="home-india-state">
      <li>
        <Link to="/" className="link">
          <button type="button" className="home-india-state-btn">
            <AiFillHome />
          </button>
        </Link>
      </li>
      <li>
        <button
          type="button"
          className="home-india-state-btn"
          onClick={onClickIndia}
        >
          India
        </button>
      </li>
      <li>
        <button type="button" className="slash-btn">
          /
        </button>
      </li>
      {stateName !== undefined ? (
        <li>
          <button type="button" className="home-india-state-btn">
            {stateName}
          </button>
        </li>
      ) : null}
    </ul>
  )
}

const StatesDropdown = props => {
  const {activeStateId, onSelectState, statesData, stateDropdownApi} = props

  const isStateDisabled = stateDropdownApi !== apiConsts.success

  const onDropDownSelect = event => {
    onSelectState(event.target.value)
  }

  return (
    <div className="loader-select-card">
      {stateDropdownApi === apiConsts.loading ? (
        <RenderDropdownLoadingView />
      ) : (
        <div style={{width: '30px'}} />
      )}
      <select
        value={activeStateId}
        className="state-select"
        onChange={onDropDownSelect}
        disabled={isStateDisabled}
      >
        <option value="selectState">Select State</option>
        {statesData.length === 0
          ? null
          : statesData.map(each => (
              <option key={each.state_id} value={each.state_id}>
                {each.state_name}
              </option>
            ))}
      </select>
    </div>
  )
}

const DistrictsDropdown = props => {
  const {
    activeDistrictId,
    onSelectDistrict,
    districtsData,
    districtDropdownApi,
  } = props

  const isDistrictDisabled = districtDropdownApi !== apiConsts.success

  const onDropDownSelect = event => {
    onSelectDistrict(event.target.value)
  }

  return (
    <div className="loader-select-card">
      {districtDropdownApi === apiConsts.loading ? (
        <RenderDropdownLoadingView />
      ) : (
        <div style={{width: '30px'}} />
      )}
      <select
        value={activeDistrictId}
        className="state-select"
        onChange={onDropDownSelect}
        disabled={isDistrictDisabled}
      >
        <option value="selectDistrict">Select District</option>
        {isDistrictDisabled
          ? null
          : districtsData.map(each => (
              <option key={each.district_id} value={each.district_id}>
                {each.district_name}
              </option>
            ))}
      </select>
    </div>
  )
}

const RenderDropdownLoadingView = () => (
  <div data-testid="routeLoader" className="loading-container-dropdown">
    <Loader
      type="ThreeDots"
      color="#007bff"
      radius={1.5}
      height={30}
      width={30}
    />
  </div>
)
