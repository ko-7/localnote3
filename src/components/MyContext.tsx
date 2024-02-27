import React, { useState, createContext } from "react";


//画面越しの値共有
export const MyContext = createContext<any>("");
export const MyContextProvider = ({ children }) => {
  const [sharedValue, setSharedValue] = useState({
    currentDirId: null,
    isEdit: false
  });
  const updateSharedValue = (newValue:any) => {
    setSharedValue(newValue);
  }
  return (
    <MyContext.Provider value={{sharedValue, updateSharedValue}}>
      {children}
    </MyContext.Provider>
  )
}