import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'

import './index.css'

const apiConsts = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
}

export const HomeIndiaStateName = props => {
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

export const StatesDropdown = props => {
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

export const DistrictsDropdown = props => {
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

export const RenderDropdownLoadingView = () => (
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
