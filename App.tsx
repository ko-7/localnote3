import React, { useState, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";

//画面遷移用のパッケージ＆設定ファイル
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "./src/type";    //画面遷移のためのデータ型

//レイアウトコンポーネント
import { HeaderTitle } from "./src/components/Header";
import { Footer } from "./src/components/Footer";

//画面越しの値共有
import { MyContextProvider } from "./src/components/MyContext";

//画面
import DirViewScreen from "./src/screens/DirViewScreen";            //画面１
import NoteViewScreen from "./src/screens/NoteViewScreen";  //画面２
import { styles } from "./src/style";

//画面遷移の準備
const Stack = createStackNavigator<RootStackParamList>();

export default function App(){

  return(
    <MyContextProvider>
      <NavigationContainer>

        <Stack.Navigator initialRouteName="DirView">
          <Stack.Group screenOptions={()=>({headerRight:() => (<HeaderTitle />)})}>
            <Stack.Screen name="DirView" component={DirViewScreen} options={{title: "ディレクトリビュー"}} />
            {/* <Stack.Screen name="DirView" component={DirViewScreen} options={() => ({title: "test", headerRight:() => (<HeaderTitle />)})}  /> */}
            <Stack.Screen name="NoteView" component={NoteViewScreen} options={{title: "ファイルビュー"}} />
          </Stack.Group>
        </Stack.Navigator>

        <Footer />
      </NavigationContainer>
    </MyContextProvider>
  )
}


