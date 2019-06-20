import React from 'react'

const AttendanceContext = React.createContext({})

export const AttendanceProvider = AttendanceContext.Provider
export const AttendanceConsumer = AttendanceContext.Consumer
export default AttendanceContext