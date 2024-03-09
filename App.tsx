import React, { useEffect, useContext, useState,useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, TextInput, Pressable, AppRegistry } from "react-native";
import { styles } from "./src/style";

// import { GlobalValueProvider, GlobalValue } from "./src/globalValue";  // 画面越しの値共有

// 画面遷移用のパッケージ＆設定ファイル
import { NavigationContainer, useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./src/type";

// AsyncStorageに初期データ作成
import { createInitialData } from './src/store';


// 画面
import DirViewScreen from "./src/screens/DirViewScreen";    // 画面１
import NoteViewScreen from "./src/screens/NoteViewScreen";  // 画面２



// 画面遷移の準備
const Stack = createStackNavigator<RootStackParamList>();

export default function App(){
  


  // 画面越しの値共有
  // const {globalValue, updateGlobalValue} = useContext(GlobalValue);
  
  // 編集ボタンでOn/Offの状態を管理する変数
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const onPressIsEditable = async () => {
    await setIsEditable(!isEditable);
    console.log("onPressIsEditableが実行されました！");
    console.log("isEditable:"+ isEditable);
  }
 

  useEffect(() => {

    // AsyncStorageに初期データ作成
    createInitialData();

  }, []);


  return(
    // <GlobalValueProvider>
      <NavigationContainer>
        <View style={{flex:1}}>


          {/* メインコンテンツ */}
          <View style={{flex:8}}>
            <Stack.Navigator initialRouteName="DirView" screenOptions={{headerTitleAlign:'center'}}>
              <Stack.Group>
                <Stack.Screen name="DirView" component={DirViewScreen} initialParams={{id:0}} />
                {/* <Stack.Screen name="DirView" component={DirViewScreen} options={{title: "ディレクトリビュー"}} /> */}
                <Stack.Screen name="NoteView" component={NoteViewScreen} />
                {/* <Stack.Screen name="NoteView" component={NoteViewScreen} options={{title: "ファイルビュー"}} /> */}
              </Stack.Group>
            </Stack.Navigator>
          </View>


          {/* フッター (App.tsxで呼び出すとnavigation.pushが正常に動作しないため各Screenに配置する)*/}
          {/* <View style={{flex:2}}>
            <Footer screen={"DirView"} />
          </View> */}


          {/* ステータスバー */}
          {/* <StatusBar style="auto" /> */}

        </View>
      </NavigationContainer>
    // </GlobalValueProvider>
  )
}


