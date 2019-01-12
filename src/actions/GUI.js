const OPEN_SETTINGS = 'OPEN_SETTINGS'
const CLOSE_SETTINGS = 'CLOSE_SETTINGS'

const openSettings = () => ({ type: OPEN_SETTINGS, settings: true })
const closeSettings = () => ({ type: CLOSE_SETTINGS, settings: false })

export { OPEN_SETTINGS, CLOSE_SETTINGS, openSettings, closeSettings }
