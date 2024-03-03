import React, { useEffect, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { View, AppRegistry } from "react-native";
import { styles } from "./src/style";

import { GlobalValueProvider, GlobalValue } from "./src/globalValue";  // 画面越しの値共有

// 画面遷移用のパッケージ＆設定ファイル
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "./src/type";

// AsyncStorageに初期データ作成
import { createInitialData } from './src/store';

// レイアウトコンポーネント
import { HeaderTitle } from "./src/components/Header";
import { Footer } from "./src/components/Footer";

// 画面
import DirViewScreen from "./src/screens/DirViewScreen";    // 画面１
import NoteViewScreen from "./src/screens/NoteViewScreen";  // 画面２


// 画面遷移の準備
const Stack = createStackNavigator<RootStackParamList>();

export default function App(){

  // 画面越しの値共有
  const {globalValue, updateGlobalValue} = useContext(GlobalValue);

  useEffect(() => {

    // AsyncStorageに初期データ作成
    createInitialData();

  }, []);

  return(
    <GlobalValueProvider>
      <NavigationContainer>
        <View style={{flex:1}}>

          {/* メインコンテンツ */}
          <View style={{flex:0.9}}>
            <Stack.Navigator initialRouteName="DirView" screenOptions={{headerTitleAlign:'center'}}>
              <Stack.Group screenOptions={()=>({headerRight:() => (<HeaderTitle />)})}>
                <Stack.Screen name="DirView" component={DirViewScreen} />
                {/* <Stack.Screen name="DirView" component={DirViewScreen} options={{title: "ディレクトリビュー"}} /> */}
                <Stack.Screen name="NoteView" component={NoteViewScreen} />
                {/* <Stack.Screen name="NoteView" component={NoteViewScreen} options={{title: "ファイルビュー"}} /> */}
              </Stack.Group>
            </Stack.Navigator>
          </View>

          {/* フッター */}
          <View style={{flex:0.1}}>
            <Footer />
          </View>

          {/* ステータスバー */}
          <StatusBar style="auto" />

        </View>
      </NavigationContainer>
    </GlobalValueProvider>
  )
}


