import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Footer from '../Footer'
import {
  HomeIndiaStateName,
  StatesDropdown,
  DistrictsDropdown,
} from './InnerComponents'
import VaccinesIcon from '../../icons/VaccinesIcon.svg'
import ApartmentIcon from '../../icons/ApartmentIcon.svg'
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
    vaccinationData: {},
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
    this.setState({vaccinationDataApi: apiConsts.loading})
    const vaccinationApiUrl = 'https://apis.ccbp.in/covid19-vaccination-data'
    const response = await fetch(vaccinationApiUrl)
    if (response.ok) {
      const data = await response.json()
      this.setState({
        vaccinationData: data,
        vaccinationDataApi: apiConsts.success,
      })
      console.log(data)
    }
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

  renderTheSiteConducting = () => {
    const {vaccinationData} = this.state
    const {sites} = vaccinationData.topBlock
    const {total, govt, pvt} = sites
    return (
      <>
        <div className="vaccination-icon-total-card">
          <div className="vaccination-icon-card">
            <img
              src={VaccinesIcon}
              alt="Vaccination Icon"
              className="vaccination-icon"
            />
          </div>
          <div className="total-card">
            <h1 className="site-conducting-title">
              Site Conducting Vaccination
            </h1>
            <p className="total-count">{total}</p>
          </div>
        </div>
        <div className="govt-pvt-container">
          <div className="govt-pvt-card">
            <h1 className="govt-pvt-title">Government</h1>
            <p className="govt-pvt-count">{govt}</p>
          </div>
          <div className="govt-pvt-card">
            <h1 className="govt-pvt-title">Private</h1>
            <p className="govt-pvt-count">{pvt}</p>
          </div>
        </div>
      </>
    )
  }

  renderTheTotalVaccinationDoses = () => {
    const {vaccinationData, stateId} = this.state
    let totalVaccinations
    let dose1
    let dose2

    if (stateId === initialStateDistrict.stateId) {
      const {vaccination} = vaccinationData.topBlock
      totalVaccinations = vaccination.total
      dose1 = vaccination.tot_dose_1
      dose2 = vaccination.tot_dose_2
    } else {
      const {getBeneficiariesGroupBy} = vaccinationData
      const stateVaccinationData = getBeneficiariesGroupBy.find(
        each => each.id === stateId,
      )
      totalVaccinations = stateVaccinationData.totally_vaccinated
      dose1 = stateVaccinationData.partial_vaccinated
      dose2 = stateVaccinationData.precaution_dose
    }

    return (
      <>
        <div className="vaccination-icon-total-card">
          <div className="vaccination-icon-card">
            <img
              src={ApartmentIcon}
              alt="Vaccination Icon"
              className="vaccination-icon"
            />
          </div>
          <div className="total-card">
            <h1 className="site-conducting-title">Total Vaccination Doses</h1>
            <p className="total-count">{totalVaccinations}</p>
          </div>
        </div>
        <div className="govt-pvt-container">
          <div className="govt-pvt-card">
            <h1 className="govt-pvt-title">Dose 1</h1>
            <p className="govt-pvt-count">{dose1}</p>
          </div>
          <div className="govt-pvt-card">
            <h1 className="govt-pvt-title">Dose 2</h1>
            <p className="govt-pvt-count">{dose2}</p>
          </div>
        </div>
      </>
    )
  }

  render() {
    const {
      stateId,
      districtId,
      statesData,
      stateDropdownApi,
      districtsData,
      districtDropdownApi,
      vaccinationDataApi,
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
          <div className="site-conducting-total-vaccination-card">
            <div className="site-conducting-card">
              {vaccinationDataApi === apiConsts.success &&
                this.renderTheSiteConducting()}
              {vaccinationDataApi === apiConsts.loading && (
                <RenderDropdownLoadingView />
              )}
            </div>
            <div className="site-conducting-card">
              {vaccinationDataApi === apiConsts.success &&
                this.renderTheTotalVaccinationDoses()}
              {vaccinationDataApi === apiConsts.loading && (
                <RenderDropdownLoadingView />
              )}
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }
}

export default Vaccination

const RenderDropdownLoadingView = () => (
  <div data-testid="routeLoader" className="loading-container-top-block">
    <Loader
      type="ThreeDots"
      color="#007bff"
      radius={1.5}
      height={60}
      width={60}
    />
  </div>
)
