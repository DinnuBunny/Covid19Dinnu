import confirmedIcon from '../../icons/confirmedIcon.svg'
import ActiveIcon from '../../icons/ActiveIcon.svg'
import RecoveredIcon from '../../icons/RecoveredIcon.svg'
import BreathingIcon from '../../icons/BreathingIcon.svg'

import './index.css'

const metaConst = {
  confirmed: 'CONFIRMED',
  active: 'ACTIVE',
  recovered: 'RECOVERED',
  deceased: 'DECEASED',
}

const CovidMetaState = props => {
  const {stateCovidData, activeMeta, onShowMeta} = props

  const onClickConfirmed = () => onShowMeta(metaConst.confirmed)

  const onClickActive = () => onShowMeta(metaConst.active)

  const onClickRecovered = () => onShowMeta(metaConst.recovered)

  const onClickDeceased = () => onShowMeta(metaConst.deceased)

  const {total} = stateCovidData
  const {confirmed, deceased, recovered} = total
  const active = confirmed - (recovered + deceased)

  const confirmedClass = `meta-state-list ${
    activeMeta === metaConst.confirmed ? 'confirmed-color-bg' : ''
  }`

  const activeClass = `meta-state-list ${
    activeMeta === metaConst.active ? 'active-color-bg' : ''
  }`

  const recoveredClass = `meta-state-list ${
    activeMeta === metaConst.recovered ? 'recovered-color-bg' : ''
  }`

  const deceasedClass = `meta-state-list ${
    activeMeta === metaConst.deceased ? 'deceased-color-bg' : ''
  }`

  return (
    <div className="meta-state-ul">
      <div
        className={confirmedClass}
        data-testid="stateSpecificConfirmedCasesContainer"
      >
        <button type="button" onClick={onClickConfirmed} className="meta-btn">
          <p className="meta-state-title confirmed-color">Confirmed</p>
          <img
            src={confirmedIcon}
            alt="state specific confirmed cases pic"
            className="meta-state-image"
          />
          <p className="meta-state-count confirmed-color">{confirmed}</p>
        </button>
      </div>

      <div
        className={activeClass}
        data-testid="stateSpecificActiveCasesContainer"
      >
        <button type="button" onClick={onClickActive} className="meta-btn">
          <p className="meta-state-title active-color">Active</p>
          <img
            src={ActiveIcon}
            alt="state specific active cases pic"
            className="meta-state-image"
          />
          <p className="meta-state-count active-color">{active}</p>
        </button>
      </div>

      <div
        className={recoveredClass}
        data-testid="stateSpecificRecoveredCasesContainer"
      >
        <button type="button" onClick={onClickRecovered} className="meta-btn">
          <p className="meta-state-title recovered-color">Recovered</p>
          <img
            src={RecoveredIcon}
            alt="state specific recovered cases pic"
            className="meta-state-image"
          />
          <p className="meta-state-count recovered-color">{recovered}</p>
        </button>
      </div>

      <div
        className={deceasedClass}
        data-testid="stateSpecificDeceasedCasesContainer"
      >
        <button type="button" onClick={onClickDeceased} className="meta-btn">
          <p className="meta-state-title deceased-color">Deceased</p>
          <img
            src={BreathingIcon}
            alt="state specific deceaded cases pic"
            className="meta-state-image"
          />
          <p className="meta-state-count deceased-color">{deceased}</p>
        </button>
      </div>
    </div>
  )
}

export default CovidMetaState
