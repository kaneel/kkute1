const UPDATE_PARAM = 'UPDATE_PARAM'
const UPDATE_PATCHNAME = 'UPDATE_PATCHNAME'
const RECEIVE_PARAMS = 'RECEIVE_PARAMS'

const updateParam = (key, value) => ({
  type: UPDATE_PARAM,
  key,
  value
})

const updatePatchName = value => ({
  type: UPDATE_PATCHNAME,
  value
})

const receiveParams = params => ({
  type: RECEIVE_PARAMS,
  params
})

export { UPDATE_PARAM, UPDATE_PATCHNAME, RECEIVE_PARAMS, updateParam, updatePatchName, receiveParams }
