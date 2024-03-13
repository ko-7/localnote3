// /////////////////////////////////////////////////////////////////////
// 画面越しに値を共有する機能の設定ファイル（Webのセッションのような機能）
// /////////////////////////////////////////////////////////////////////

import React, { useState, useEffect, createContext, ReactNode } from "react";
import { loadOneItem } from "./store";    //DB操作


// グローバル変数の型を定義
interface GlobalValue{
  currentDirData: any;
  isEdit: boolean;
}

// childの型：Reactのコンポーネント
interface GlobalValueProviderProps{
  children: ReactNode;
}


// 画面越しの値共有
export const GlobalValue = createContext<any>("");
export const GlobalValueProvider: React.FC<GlobalValueProviderProps> = ({ children }) => {


  // グローバル変数の作成　※useStateの定義を事前にしておく
  const [globalValue, setGlobalValue] = useState<GlobalValue>({
    currentDirData: {},   // 現在開いているDirのデータ1式  ※形式：{"id":~,"dirOrNote":?,"text":?,"childDir":?,"childNote":?}
    isEdit: false,        // ヘッダー「編集」ボタンOn/Off
  });


  // globalValue初期値で必要なものをDBからとってくる　※DBからデータ取得
  const [currentDirDataInitial, setCurrentDirDataInitial] = useState<any[]>([]);  //必要なデータ　※
  useEffect(() => {
    const fetchData = async () => {
      try{
        const data = await loadOneItem(0);
        setCurrentDirDataInitial(data);
      }catch(error){
        console.error("Error fetching initial data: ", error);
      }
    }
    fetchData();
  }, []);

  // globalValueに初期値を設定　※非同期処理のDB通信完了を待つため、useEffectを分ける
  const setDefaultValueFromDB = async () => {
    let hereGlobalValue = JSON.parse(JSON.stringify(globalValue));
    hereGlobalValue.currentDirData = currentDirDataInitial   // 初期値設定
    await updateGlobalValue(hereGlobalValue);   //globalValueの更新
  }
  useEffect(() => {
    setDefaultValueFromDB();
  }, [currentDirDataInitial])  //⇐これらが更新されたらuseEffect実行


  // グローバルバリュー更新用の関数（Hooksの機能をラップすることで非同期処理の追加など将来的な拡張性を持たせている）
  const updateGlobalValue = (newValue:any) => {
    setGlobalValue(newValue);
  }


  return (
    <GlobalValue.Provider value={{globalValue, updateGlobalValue}}>
      {children}
    </GlobalValue.Provider>
  )
}


