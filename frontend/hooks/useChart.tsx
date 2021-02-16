import * as React from 'react'
import { ChartContext } from '../contexts/ChartContext'

export const useChart = () => {
  const props = React.useContext(ChartContext)
  return props
}