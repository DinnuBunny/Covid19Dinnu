import {Link, withRouter} from 'react-router-dom'
import React from 'react'
import Select from 'react-select'

import {BiChevronRightSquare} from 'react-icons/bi'
import {BsSearch} from 'react-icons/bs'

import './index.css'
import IndianStatesList from '../../StatesData'

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
    borderBottom: '1px solid #94A3B8',
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
    const formattedStates = IndianStatesList.map(each => ({
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
