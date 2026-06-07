'use client'

import React, { createContext, useEffect, useMemo, useState } from 'react'

export const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
})

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('theme')
    const initialTheme = savedTheme || document.documentElement.dataset.theme || 'light'
    setTheme(initialTheme)
    document.documentElement.dataset.theme = initialTheme
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'))
  }

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
