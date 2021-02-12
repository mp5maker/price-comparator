import get from 'lodash/get'

export default {
  generate: ({ error }) => {
    const inner = get(error, 'inner', [])
    return inner.reduce((allErrors, newError) => {
      const path = get(newError, 'path', '')
      const message = get(newError, 'message', '')
      return {
        ...allErrors,
        [path]: message,
      }
    }, {})
  },
}
