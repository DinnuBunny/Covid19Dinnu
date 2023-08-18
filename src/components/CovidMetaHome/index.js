import confirmedIcon from '../../icons/confirmedIcon.svg'
import ActiveIcon from '../../icons/ActiveIcon.svg'
import RecoveredIcon from '../../icons/RecoveredIcon.svg'
import BreathingIcon from '../../icons/BreathingIcon.svg'

import './index.css'

const CovidMetaHome = props => {
  const {covidData} = props
  const homeMetaList = {
    confirmed: 0,
    active: 0,
    recovered: 0,
    deceased: 0,
  }
  Object.keys(covidData).forEach(state => {
    const {total} = covidData[state]
    const {confirmed, deceased, recovered} = total
    const active = confirmed - (recovered + deceased)
    homeMetaList.confirmed += confirmed
    homeMetaList.active += active
    homeMetaList.recovered += recovered
    homeMetaList.deceased += deceased
  })

  return (
    <div className="meta-home-ul">
      <div className="meta-home-list" data-testid="countryWideConfirmedCases">
        <p className="meta-home-title confirmed-color">Confirmed</p>
        <img
          src={confirmedIcon}
          alt="country wide confirmed cases pic"
          className="meta-home-image"
        />
        <p className="meta-home-count confirmed-color">
          {homeMetaList.confirmed}
        </p>
      </div>
      <div className="meta-home-list" data-testid="countryWideActiveCases">
        <p className="meta-home-title active-color">Active</p>
        <img
          src={ActiveIcon}
          alt="country wide active cases pic"
          className="meta-home-image"
        />
        <p className="meta-home-count active-color">{homeMetaList.active}</p>
      </div>
      <div className="meta-home-list" data-testid="countryWideRecoveredCases">
        <p className="meta-home-title recovered-color">Recovered</p>
        <img
          src={RecoveredIcon}
          alt="country wide recovered cases pic"
          className="meta-home-image"
        />
        <p className="meta-home-count recovered-color">
          {homeMetaList.recovered}
        </p>
      </div>
      <div className="meta-home-list" data-testid="countryWideDeceasedCases">
        <p className="meta-home-title deceased-color">Deceased</p>
        <img
          src={BreathingIcon}
          alt="country wide deceaded cases pic"
          className="meta-home-image"
        />
        <p className="meta-home-count deceased-color">
          {homeMetaList.deceased}
        </p>
      </div>
    </div>
  )
}

export default CovidMetaHome
