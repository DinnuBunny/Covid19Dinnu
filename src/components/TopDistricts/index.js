import './index.css'

const metaConst = {
  confirmed: 'CONFIRMED',
  active: 'ACTIVE',
  recovered: 'RECOVERED',
  deceased: 'DECEASED',
}

const getTheTopDistrictsData = (stateCovidData, activeMeta) => {
  const {districts} = stateCovidData
  const resultList = []
  const keyNames = Object.keys(districts)

  keyNames.forEach(keyName => {
    if (districts[keyName]) {
      const {total} = districts[keyName]
      const confirmed = total.confirmed ? total.confirmed : 0
      const deceased = total.deceased ? total.deceased : 0
      const recovered = total.recovered ? total.recovered : 0

      if (activeMeta === metaConst.confirmed) {
        resultList.push({
          districtName: keyName,
          count: confirmed,
        })
      } else if (activeMeta === metaConst.active) {
        resultList.push({
          districtName: keyName,
          count: confirmed - (deceased + recovered),
        })
      } else if (activeMeta === metaConst.recovered) {
        resultList.push({
          districtName: keyName,
          count: recovered,
        })
      } else if (activeMeta === metaConst.deceased) {
        resultList.push({
          districtName: keyName,
          count: deceased,
        })
      }
    }
  })
  const sortedList = resultList.sort((a, b) => b.count - a.count)
  return sortedList
}

const TopDistricts = props => {
  const {stateCovidData, activeMeta} = props
  const topDistrictsData = getTheTopDistrictsData(stateCovidData, activeMeta)

  const headingColor = () => {
    switch (activeMeta) {
      case metaConst.confirmed:
        return 'confirmed'
      case metaConst.active:
        return 'active'
      case metaConst.recovered:
        return 'recovered'
      case metaConst.deceased:
        return 'deceased'
      default:
        return ''
    }
  }

  return (
    <div className="top-districts-card">
      <h1 className={`top-district ${headingColor()}`}>Top Districts</h1>
      <ul data-testid="topDistrictUnorderedList" className="top-districts-ul">
        {topDistrictsData.map(district => (
          <TopDistrictsList key={district.districtName} district={district} />
        ))}
      </ul>
    </div>
  )
}

export default TopDistricts

const TopDistrictsList = props => {
  const {district} = props
  const {districtName, count} = district

  return (
    <li className="top-districts-li">
      <p className="top-districts-count">{count}</p>
      <p className="top-districts-name">{districtName}</p>
    </li>
  )
}
