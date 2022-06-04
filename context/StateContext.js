import React, { createContext, useContext,} from 'react'

const Context = createContext()

export const StateContext = ({children}) => {


  return (
    <Context.Provider
      value={{
        
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context)
