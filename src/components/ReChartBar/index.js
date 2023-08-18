import format from 'date-fns/format'
import {XAxis, YAxis, Tooltip, BarChart, Bar} from 'recharts'

import './index.css'

const metaConst = {
  confirmed: 'CONFIRMED',
  active: 'ACTIVE',
  recovered: 'RECOVERED',
  deceased: 'DECEASED',
}

const formatLabelColor = activeMeta => {
  switch (activeMeta) {
    case metaConst.confirmed:
      return '#9A0E31'
    case metaConst.active:
      return '#0A4FA0'
    case metaConst.recovered:
      return '#216837'
    default:
      return '#474C57'
  }
}

const getTheActiveBarChartData = (stateTimelinesData, activeMeta) => {
  const {dates} = stateTimelinesData
  const resultList = []
  const keyNames = Object.keys(dates)
  const splicedKeyNames = keyNames.reverse().splice(0, 10).reverse()

  splicedKeyNames.forEach(keyName => {
    if (dates[keyName]) {
      const {total} = dates[keyName]
      const confirmed = total.confirmed ? total.confirmed : 0
      const deceased = total.deceased ? total.deceased : 0
      const recovered = total.recovered ? total.recovered : 0

      const date = format(new Date(keyName), 'dd MMM')

      if (activeMeta === metaConst.confirmed) {
        resultList.push({
          date,
          count: confirmed,
        })
      } else if (activeMeta === metaConst.active) {
        resultList.push({
          date,
          count: confirmed - (deceased + recovered),
        })
      } else if (activeMeta === metaConst.recovered) {
        resultList.push({
          date,
          count: recovered,
        })
      } else if (activeMeta === metaConst.deceased) {
        resultList.push({
          date,
          count: deceased,
        })
      }
    }
  })
  return resultList
}

const CustomBar = props => {
  const {x, y, width, height, activeMeta} = props
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={formatLabelColor(activeMeta)}
        rx={10}
      />
    </g>
  )
}

const formatLabel = value => {
  if (value >= 100000) {
    return `${(value / 100000).toFixed(2)}L`
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(2)}K`
  }
  return value
}

const ReChartBar = props => {
  const {stateTimelinesData, activeMeta} = props

  const activeBarChartData = getTheActiveBarChartData(
    stateTimelinesData,
    activeMeta,
  )

  const labelTextColor = formatLabelColor(activeMeta)

  return (
    <div>
      <div className="responsive-bar">
        <BarChart
          width={800}
          height={300}
          data={activeBarChartData}
          margin={{top: 20, right: 0, bottom: 10, left: 0}}
        >
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={false}
            domain={['auto', 'auto']}
          />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            height={20}
            tick={{fill: labelTextColor, fontSize: 16, fontWeight: 'light'}}
          />
          <Tooltip />
          <Bar
            dataKey="count"
            label={{
              position: 'top',
              formatter: value => formatLabel(value),
              fill: labelTextColor,
              fontSize: 16,
            }}
            shape={<CustomBar activeMeta={activeMeta} />}
            barSize={35}
          />
        </BarChart>
      </div>
    </div>
  )
}

export default ReChartBar
