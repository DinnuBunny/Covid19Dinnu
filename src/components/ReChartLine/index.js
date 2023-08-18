import format from 'date-fns/format'
import {XAxis, Tooltip, LineChart, YAxis, Line} from 'recharts'

import './index.css'

const metaConst = {
  confirmed: 'CONFIRMED',
  active: 'ACTIVE',
  recovered: 'RECOVERED',
  deceased: 'DECEASED',
  tested: 'TESTED',
}

const getTheLineChartData = stateTimelinesData => {
  const {dates} = stateTimelinesData
  const resultObject = {
    confirmed: [],
    active: [],
    recovered: [],
    deceased: [],
    tested: [],
  }
  const keyNames = Object.keys(dates)

  keyNames.forEach(keyName => {
    if (dates[keyName]) {
      const {total} = dates[keyName]
      const date = keyName
      const confirmed = total.confirmed ? total.confirmed : 0
      const deceased = total.deceased ? total.deceased : 0
      const recovered = total.recovered ? total.recovered : 0
      const tested = total.tested ? total.tested : 0
      const active = confirmed - (deceased + recovered)

      resultObject.confirmed.push({
        date,
        count: confirmed,
      })
      resultObject.recovered.push({
        date,
        count: recovered,
      })
      resultObject.active.push({
        date,
        count: active,
      })
      resultObject.deceased.push({
        date,
        count: deceased,
      })
      resultObject.tested.push({
        date,
        count: tested,
      })
    }
  })
  return resultObject
}

const getGraphColor = activeMeta => {
  let fillColor
  switch (activeMeta) {
    case metaConst.confirmed:
      fillColor = '#9A0E31'
      break
    case metaConst.active:
      fillColor = '#0A4FA0'
      break
    case metaConst.recovered:
      fillColor = '#216837'
      break
    case metaConst.tested:
      fillColor = '#9673B9'
      break
    default:
      fillColor = '#474C57'
  }
  return fillColor
}

const getGraphBGColor = activeMeta => {
  let BGColor
  switch (activeMeta) {
    case metaConst.confirmed:
      BGColor = '#331427'
      break
    case metaConst.active:
      BGColor = '#132240'
      break
    case metaConst.recovered:
      BGColor = '#182829'
      break
    case metaConst.tested:
      BGColor = '#230F41'
      break
    default:
      BGColor = '#1C1C2B'
  }
  return BGColor
}

const getChartType = activeMeta => {
  let chartType
  switch (activeMeta) {
    case metaConst.confirmed:
      chartType = 'Confirmed'
      break
    case metaConst.active:
      chartType = 'Total Active'
      break
    case metaConst.recovered:
      chartType = 'Recovered'
      break
    case metaConst.tested:
      chartType = 'Tested'
      break
    default:
      chartType = 'Deceased'
  }
  return chartType
}

const CustomYAxisTick = ({x, y, payload, textColor}) => {
  let formattedValue = payload.value
  if (payload.value >= 1000) {
    formattedValue = `${payload.value / 1000}K`
  }
  if (payload.value >= 100000) {
    formattedValue = `${payload.value / 100000}L`
  }
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={-20}
        y={-10}
        dy={16}
        stroke={textColor}
        textAnchor="middle"
        fontSize={16}
      >
        {formattedValue}
      </text>
    </g>
  )
}

const CustomXAxisTick = ({x, y, payload, textColor}) => (
  <g transform={`translate(${x},${y})`}>
    <text
      x={0}
      y={0}
      dy={16}
      textAnchor="left"
      stroke={textColor}
      fontSize={14}
    >
      {payload.value}
    </text>
  </g>
)

const CustomTooltip = ({active, payload, label, data, textColor}) => {
  if (active && payload && payload.length) {
    const currentIndex = data.findIndex(item => item.date === label)
    const currentDotValue = payload[0].value
    const previousDotValue =
      currentIndex > 0 ? data[currentIndex - 1].count : null
    const change =
      previousDotValue !== null ? currentDotValue - previousDotValue : null
    const formattedLabel = format(new Date(label), 'dd MMM')
    return (
      <div className="custom-tooltip">
        <p className="custom-tooltip-date" style={{color: textColor}}>
          {formattedLabel}
        </p>
        <p className="custom-tooltip-count" style={{color: textColor}}>
          {currentDotValue} {'  '}
          {change !== null && (
            <sub className="custom-tooltip-change" style={{color: textColor}}>
              {change >= 0 ? `+${change}` : change}
            </sub>
          )}
        </p>
      </div>
    )
  }
  return null
}

const LineChartBar = props => {
  const {lineChartData, activeMeta} = props

  const textColor = getGraphColor(activeMeta)
  const BGColor = getGraphBGColor(activeMeta)
  const chartType = getChartType(activeMeta)

  return (
    <div className="line-chart-container" style={{background: BGColor}}>
      <p className="chart-type" style={{color: textColor}}>
        {chartType}
      </p>
      <LineChart
        width={1050}
        height={300}
        data={lineChartData}
        margin={{top: 5, right: 20, left: 0, bottom: 5}}
      >
        <XAxis
          dataKey="date"
          stroke={textColor}
          interval={8}
          tick={<CustomXAxisTick textColor={textColor} />}
        />
        <YAxis
          dataKey="count"
          stroke={textColor}
          domain={['auto', 'auto']}
          tick={<CustomYAxisTick textColor={textColor} />}
        />
        <Tooltip
          content={({active, payload, label}) => (
            <CustomTooltip
              active={active}
              payload={payload}
              label={label}
              data={lineChartData}
              textColor={textColor}
            />
          )}
        />
        <Line
          type="monotone"
          dataKey="count"
          stroke={textColor}
          dot={{fill: textColor}}
        />
      </LineChart>
    </div>
  )
}

const ReChartLine = props => {
  const {stateTimelinesData} = props

  const formattedLineChartData = getTheLineChartData(stateTimelinesData)

  return (
    <div className="line-chart-main-container">
      <h1 className="line-chart-heading">Daily Spread Trends</h1>
      {Object.keys(formattedLineChartData).map(lineChart => (
        <LineChartBar
          key={lineChart}
          lineChartData={formattedLineChartData[lineChart]}
          activeMeta={metaConst[lineChart]}
        />
      ))}
    </div>
  )
}

export default ReChartLine
