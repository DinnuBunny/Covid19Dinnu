import {Link, withRouter} from 'react-router-dom'
import React from 'react'
import Select from 'react-select'

import {BiChevronRightSquare} from 'react-icons/bi'
import {BsSearch} from 'react-icons/bs'

import './index.css'

const statesList = [
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

const colorStyles = {
  input: provided => ({
    ...provided,
    color: '#64748B',
  }),
  menu: provided => ({
    ...provided,
    position: 'absolute',
  }),
  control: styles => ({
    ...styles,
    position: 'unset',
    backgroundColor: '#2f2f43',
    width: '650px',
    height: '72px',
    border: '0',
    outline: 'none',
    '@media (min-width: 576px) and (max-width: 768px)': {
      width: '390px',
    },
    '@media (max-width: 576px)': {
      width: '280px',
    },
  }),
  option: (provided, state) => ({
    ...provided,
    margin: 0,
    padding: '0 10px 0 10px',
    color: state.isSelected ? 'white' : 'black',
    borderBottom: '1px solid #94A3B8', // Option border
    border: state.isFocused
      ? '1px solid var(--light-blue-gray-400, #1F1F30)'
      : 0,
    backgroundColor: state.isFocused ? '#1F1F30' : '#161625',
  }),
  dropdownIndicator: provided => ({
    ...provided,
    display: 'none',
  }),
  indicatorSeparator: provided => ({
    ...provided,
    display: 'none',
  }),
}
class MySelect extends React.Component {
  state = {
    selected: null,
  }

  handleChange = value => {
    this.setState({
      selected: value,
    })
    const {history} = this.props
    history.push(`/state/${value.label}`)
  }

  renderSelectList = option => (
    <Link to={`/state/${option.label}`} className="link">
      <div className="select-each">
        <p className="select-label">{option.value}</p>
        <button type="button" className="select-value-btn">
          {option.label}
          <BiChevronRightSquare width="24px" height="24px" />
        </button>
      </div>
    </Link>
  )

  render() {
    const {selected} = this.state
    const formattedStates = statesList.map(each => ({
      value: each.state_name,
      label: each.state_code,
    }))
    return (
      <div className="select-container">
        <BsSearch className="search-icon" width="24px" height="24px" />
        <Select
          options={formattedStates}
          styles={colorStyles}
          placeholder="Enter the State"
          getOptionLabel={option => this.renderSelectList(option)}
          onChange={this.handleChange}
          value={selected}
          isSearchable="true"
          isClearable="true"
        />
      </div>
    )
  }
}

export default withRouter(MySelect)
