import get from 'lodash/get'
import { RESPONSE_STATUS } from '../constants/settings'
import errorHelper from './errorHelper'

export default {
  success: {
    token: ({ response, token, refreshToken }) => {
      return response.status(RESPONSE_STATUS.OK).json({
        token,
        refreshToken,
      })
    },
  },
  error: {
    unauthorized: ({ response, error }) => {
      return response.status(RESPONSE_STATUS.UNAUTHORIZED).json({
        error: get(error, 'message', ''),
      })
    },
    unknown: ({ response, error }) => {
      return response.status(RESPONSE_STATUS.BAD_REQUEST).json({
        error: get(error, 'message', ''),
      })
    },
    field: ({ response, error }) => {
      return response.status(RESPONSE_STATUS.BAD_REQUEST).json({
        error: {
          ...errorHelper.generate({ error }),
        },
      })
    },
    login: ({ response }) => {
      return response.status(RESPONSE_STATUS.BAD_REQUEST).json({
        error: {
          username: 'CREDENTIALS_DO_NOT_MATCH',
        },
      })
    },
  },
}
