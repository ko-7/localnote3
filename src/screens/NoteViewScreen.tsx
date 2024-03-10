import React, { useState, useEffect, useContext, useLayoutEffect } from "react";
import { SafeAreaView, KeyboardAvoidingView, View, Text, Pressable, TextInput } from "react-native";
import { styles } from "../style"   // スタイルの読み込み
import { Footer } from "../components/Footer";

import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";  // 画面遷移に必要
import { StackNavigationProp } from "@react-navigation/stack";                  // 画面遷移に必要
import { RootStackParamList } from "../type";                                   // 画面遷移に必要

import { saveItem, loadOneItem, deleteItem } from "../store";    // DB操作


export const NoteViewScreen: React.FC = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList, "NoteView">>();
    const route = useRoute<RouteProp<RootStackParamList, "NoteView">>();

    // ステートの定義
    const [ id, setId ] = useState<number>(route.params.id);
    const [ note, setNote ] = useState<any>({});
    const [ text, setText ] = useState<string>("");
    const [ parentDirData, setParentDirData ] = useState<any>({});


    // ヘッダー「保存」ボタンの実装
    const onPressSave = async () => {
        await saveItem(id, "note", text, parentDirData.id);
        navigation.navigate("DirView", {id: parentDirData.id});
    };
    useLayoutEffect(() => {

        // Headerタイトルの設定
        navigation.setOptions({
            title: ``,
        });

        // Headerに「編集」ボタンを配置
        navigation.setOptions({
            headerRight: () => (
                <View>
                    <Pressable onPress={() => onPressSave()} >
                        <Text style={styles.headerButton}>保存</Text>
                    </Pressable>
                </View>
            )
        })
    })


    const initialize = async () => {

        // 親ディレクトリのデータ取得（Headerタイトルに表示させるため）
        let parentDirData = await loadOneItem(route.params.parentDirId);
        await setParentDirData(parentDirData);

        // Headerタイトルの表示
        navigation.setOptions({
            title: ``,                       // ⇐タイトル無し
            // title: `${parentDirData.text}`   // ⇐親ディレクトリのタイトルを表示
        })
    }

    // 画面初期化
    useEffect(() => {
        initialize();
    }, [navigation])


    // 既存データの編集の際はデータを取得
    if(id){
        useEffect(() => {
            const initialize = async () => {
                const newNotes = await loadOneItem(id);
                setNote(newNotes);
                setText(newNotes.text);
            }
            const unsubscribe = navigation.addListener("focus", initialize);
            return unsubscribe;
        }, []);
    }


    return (
        <SafeAreaView style={styles.container}>

            <View style={{flex:8}}>
                <KeyboardAvoidingView style={styles.container}>
                    <TextInput
                        style={styles.textArea}
                        onChangeText={(text) => setText(text)}
                        multiline
                        placeholder="メモを入力してください"
                        defaultValue={note.text}
                    />
                </KeyboardAvoidingView>
            </View>


            {/* 広告を表示させる ※表示させるときはFooterをflex:1にする！ */}
            {/* <View style={[{flex:1, backgroundColor:"#555"}]}>
                <Text>広告</Text>
            </View> */}


            {/* Footer：App.tsxで呼び出すとnavigation.pushが正常に動作しないためここに配置する */}
            <View style={{flex:2}}>
                <Footer screen={"NoteView"} />
            </View>

        </SafeAreaView>
    )
}

export default NoteViewScreen