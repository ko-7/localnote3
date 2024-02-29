//画面越しに値を共有する機能の設定ファイル（Webのセッションのような機能）

import React, { useState, createContext, ReactNode } from "react";

interface GlobalValue{
  currentDirId: number;
  isEdit: boolean;
  nowDirData: any;
}

interface GlobalValueProviderProps{
  children: ReactNode;
}

//画面越しの値共有
export const GlobalValue = createContext<any>("");
export const GlobalValueProvider: React.FC<GlobalValueProviderProps> = ({ children }) => {
  const [globalValue, setGlobalValue] = useState<GlobalValue>({
    currentDirId: 0,      //現在開いているDir
    isEdit: false,        //ヘッダー「編集」ボタンOn/Off
    nowDirData: null,     //DirViewに表示するデータ
  });
  const updateGlobalValue = (newValue:any) => {
    setGlobalValue(newValue);
  }

  return (
    <GlobalValue.Provider value={{globalValue, updateGlobalValue}}>
      {children}
    </GlobalValue.Provider>
  )
}

