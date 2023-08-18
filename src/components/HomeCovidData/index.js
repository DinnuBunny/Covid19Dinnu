import {Component} from 'react'
import {Link} from 'react-router-dom'
import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'
import {BiSort} from 'react-icons/bi'
import {FaSortAmountDownAlt, FaSortAmountUp} from 'react-icons/fa'

import IndianStatesList from '../../StatesData'
import './index.css'

const sortConst = {
  ascending: 'ASC',
  descending: 'DESC',
}

const initialSort = {
  stateNameSort: undefined,
  confirmedCaseSort: undefined,
  activeCaseSort: undefined,
  recoveredCaseSort: undefined,
  deceasedCaseSort: undefined,
  populationSort: undefined,
}

class HomeCovidData extends Component {
  state = {
    covidResultList: [],
    sort: {...initialSort},
  }

  componentDidMount() {
    this.getTheDataList()
  }

  getTheDataList = () => {
    const {covidData} = this.props
    const resultListAsc = this.convertObjectsDataIntoListItemsUsingForInMethod(
      covidData,
      IndianStatesList,
    )
    this.setState({covidResultList: resultListAsc})
  }

  onClickAscendingOrder = () => {
    const {sort, covidResultList} = this.state
    if (
      sort.stateNameSort === sortConst.descending ||
      sort.stateNameSort === undefined
    ) {
      const sortedList = covidResultList.reverse()
      this.setState({
        covidResultList: sortedList,
        sort: {...initialSort, stateNameSort: sortConst.ascending},
      })
    }
  }

  onClickDescendingOrder = () => {
    const {sort, covidResultList} = this.state
    if (
      sort.stateNameSort === sortConst.ascending ||
      sort.stateNameSort === undefined
    ) {
      const sortedList = covidResultList.reverse()
      this.setState({
        covidResultList: sortedList,
        sort: {...initialSort, stateNameSort: sortConst.descending},
      })
    }
  }

  onSortConfirmed = () => {
    const {sort, covidResultList} = this.state
    if (
      sort.confirmedCaseSort === undefined ||
      sort.confirmedCaseSort === sortConst.ascending
    ) {
      const sortedList = covidResultList.sort(
        (a, b) => b.confirmed - a.confirmed,
      )
      this.setState({
        covidResultList: sortedList,
        sort: {...initialSort, confirmedCaseSort: sortConst.descending},
      })
    } else {
      const sortedList = covidResultList.sort(
        (a, b) => a.confirmed - b.confirmed,
      )
      this.setState({
        covidResultList: sortedList,
        sort: {...initialSort, confirmedCaseSort: sortConst.ascending},
      })
    }
  }

  onSortActive = () => {
    const {sort, covidResultList} = this.state
    if (
      sort.activeCaseSort === undefined ||
      sort.activeCaseSort === sortConst.ascending
    ) {
      const sortedList = covidResultList.sort((a, b) => b.active - a.active)
      this.setState({
        covidResultList: sortedList,
        sort: {...initialSort, activeCaseSort: sortConst.descending},
      })
    } else {
      const sortedList = covidResultList.sort((a, b) => a.active - b.active)
      this.setState({
        covidResultList: sortedList,
        sort: {...initialSort, activeCaseSort: sortConst.ascending},
      })
    }
  }

  onSortRecovered = () => {
    const {sort, covidResultList} = this.state
    if (
      sort.recoveredCaseSort === undefined ||
      sort.recoveredCaseSort === sortConst.ascending
    ) {
      const sortedList = covidResultList.sort(
        (a, b) => b.recovered - a.recovered,
      )
      this.setState({
        covidResultList: sortedList,
        sort: {...initialSort, recoveredCaseSort: sortConst.descending},
      })
    } else {
      const sortedList = covidResultList.sort(
        (a, b) => a.recovered - b.recovered,
      )
      this.setState({
        covidResultList: sortedList,
        sort: {...initialSort, recoveredCaseSort: sortConst.ascending},
      })
    }
  }

  onSortDeceased = () => {
    const {sort, covidResultList} = this.state
    if (
      sort.deceasedCaseSort === undefined ||
      sort.deceasedCaseSort === sortConst.ascending
    ) {
      const sortedList = covidResultList.sort((a, b) => b.deceased - a.deceased)
      this.setState({
        covidResultList: sortedList,
        sort: {...initialSort, deceasedCaseSort: sortConst.descending},
      })
    } else {
      const sortedList = covidResultList.sort((a, b) => a.deceased - b.deceased)
      this.setState({
        covidResultList: sortedList,
        sort: {...initialSort, deceasedCaseSort: sortConst.ascending},
      })
    }
  }

  onSortPopulation = () => {
    const {sort, covidResultList} = this.state
    if (
      sort.populationSort === undefined ||
      sort.populationSort === sortConst.ascending
    ) {
      const sortedList = covidResultList.sort(
        (a, b) => b.population - a.population,
      )
      this.setState({
        covidResultList: sortedList,
        sort: {...initialSort, populationSort: sortConst.descending},
      })
    } else {
      const sortedList = covidResultList.sort(
        (a, b) => a.population - b.population,
      )
      this.setState({
        covidResultList: sortedList,
        sort: {...initialSort, populationSort: sortConst.ascending},
      })
    }
  }

  convertObjectsDataIntoListItemsUsingForInMethod = (data, statesList) => {
    const resultList = []
    const keyNames = Object.keys(data)

    keyNames.forEach(keyName => {
      if (data[keyName] && keyName !== 'TT') {
        const {total} = data[keyName]
        const confirmed = total.confirmed ? total.confirmed : 0
        const deceased = total.deceased ? total.deceased : 0
        const recovered = total.recovered ? total.recovered : 0
        const tested = total.tested ? total.tested : 0
        const population = data[keyName].meta.population
          ? data[keyName].meta.population
          : 0
        const stateIndex = statesList.findIndex(
          state => state.state_code === keyName,
        )
        resultList.push({
          stateCode: keyName,
          name: statesList[stateIndex].state_name,
          confirmed,
          deceased,
          recovered,
          tested,
          population,
          active: confirmed - (deceased + recovered),
        })
      }
    })
    return resultList
  }

  render() {
    const {covidResultList, sort} = this.state
    if (covidResultList.length < 1) {
      return null
    }

    return (
      <div className="table-div">
        <table data-testid="stateWiseCovidDataTable">
          <thead>
            <tr className="table-head">
              <th className="table-head-states-th">
                States/UT
                <div
                  data-testid="stateWiseCovidDataTable"
                  className="sort-button-card"
                >
                  <button
                    type="button"
                    data-testid="ascendingSort"
                    className="sort-btn"
                    onClick={this.onClickAscendingOrder}
                  >
                    <FcGenericSortingAsc
                      style={{color: 'red'}}
                      width="30px"
                      height="30px"
                    />
                  </button>
                  <button
                    type="button"
                    data-testid="descendingSort"
                    className="sort-btn"
                    onClick={this.onClickDescendingOrder}
                  >
                    <FcGenericSortingDesc width="30px" height="30px" />
                  </button>
                </div>
              </th>
              <CovidDataHeader
                header="Confirmed"
                onSortEvent={this.onSortConfirmed}
                activeSort={sort.confirmedCaseSort}
              />
              <CovidDataHeader
                header="Active"
                onSortEvent={this.onSortActive}
                activeSort={sort.activeCaseSort}
              />
              <CovidDataHeader
                header="Recovered"
                onSortEvent={this.onSortRecovered}
                activeSort={sort.recoveredCaseSort}
              />
              <CovidDataHeader
                header="Deceased"
                onSortEvent={this.onSortDeceased}
                activeSort={sort.deceasedCaseSort}
              />
              <CovidDataHeader
                header="Population"
                onSortEvent={this.onSortPopulation}
                activeSort={sort.populationSort}
              />
            </tr>
          </thead>
          <tbody>
            {covidResultList.map(eachState => (
              <CovidDatalist key={eachState.stateCode} eachState={eachState} />
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default HomeCovidData

const CovidDataHeader = props => {
  const {header, onSortEvent, activeSort} = props

  const onClickEvent = () => onSortEvent()

  return (
    <th>
      <button type="button" onClick={onClickEvent} className="th-button">
        {header}
        {activeSort === undefined && <BiSort style={{marginLeft: '1px'}} />}
        {activeSort === sortConst.ascending && (
          <FaSortAmountDownAlt style={{marginLeft: '1px'}} />
        )}
        {activeSort === sortConst.descending && (
          <FaSortAmountUp style={{marginLeft: '1px'}} />
        )}
      </button>
    </th>
  )
}

const CovidDatalist = props => {
  const {eachState} = props
  const {
    stateCode,
    name,
    confirmed,
    deceased,
    recovered,
    population,
    active,
  } = eachState
  return (
    <tr className="tbody-tr">
      <td className="state-name-td">
        <Link to={`/state/${stateCode}`} className="state-name-link">
          {name}
        </Link>
      </td>
      <td className="confirmed-td">{confirmed}</td>
      <td className="active-td">{active}</td>
      <td className="recovered-td">{recovered}</td>
      <td className="deceased-td">{deceased}</td>
      <td className="population-td">{population}</td>
    </tr>
  )
}
