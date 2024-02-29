import React, { useEffect } from "react";
// import { StatusBar } from "expo-status-bar";
import { View, AppRegistry } from "react-native";

//画面遷移用のパッケージ＆設定ファイル
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "./src/type";    //画面遷移のためのデータ型

//レイアウトコンポーネント
import { HeaderTitle } from "./src/components/Header";
import { Footer } from "./src/components/Footer";

//画面越しの値共有
import { GlobalValueProvider } from "./src/GlobalValue";

//画面
import DirViewScreen from "./src/screens/DirViewScreen";    //画面１
import NoteViewScreen from "./src/screens/NoteViewScreen";  //画面２
import { styles } from "./src/style";

//初期データの作成
import { createDefaultData } from './src/store';

//画面遷移の準備
const Stack = createStackNavigator<RootStackParamList>();

export default function App(){

  useEffect(() => {
    createDefaultData();
  }, []);

  return(
    <GlobalValueProvider>
      <NavigationContainer>
        <View style={{flex:1}}>

          <View style={{flex:0.9}}>
            <Stack.Navigator initialRouteName="DirView">
              <Stack.Group screenOptions={()=>({headerRight:() => (<HeaderTitle />)})}>
                <Stack.Screen name="DirView" component={DirViewScreen} options={{title: "ディレクトリビュー"}} />
                {/* <Stack.Screen name="DirView" component={DirViewScreen} options={() => ({title: "test", headerRight:() => (<HeaderTitle />)})}  /> */}
                <Stack.Screen name="NoteView" component={NoteViewScreen} options={{title: "ファイルビュー"}} />
              </Stack.Group>
            </Stack.Navigator>
          </View>

          <View style={{flex:0.1}}>
            <Footer />
          </View>

        </View>
      </NavigationContainer>
    </GlobalValueProvider>
  )
}


