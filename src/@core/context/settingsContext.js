// ** React Imports
import { createContext, useState } from 'react'
import dynamic from 'next/dynamic'

// ** ThemeConfig Import
// import themeConfig from '../../../src/configs/themeConfig'
const themeConfig = dynamic(() => import('../../../src/configs/themeConfig'), { loading: () => <p>...</p> })

const initialSettings = {
  themeColor: 'primary',
  mode: themeConfig.mode,
  contentWidth: themeConfig.contentWidth
}

// ** Create Context
export const SettingsContext = createContext({
  saveSettings: () => null,
  settings: initialSettings
})

export const SettingsProvider = ({ children }) => {
  // ** State
  const [settings, setSettings] = useState({ ...initialSettings })

  const saveSettings = updatedSettings => {
    setSettings(updatedSettings)
  }

  return <SettingsContext.Provider value={{ settings, saveSettings }}>{children}</SettingsContext.Provider>
}

export const SettingsConsumer = SettingsContext.Consumer
