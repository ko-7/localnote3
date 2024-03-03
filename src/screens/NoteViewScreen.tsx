import React, { useState, useEffect, useContext } from "react";
import { KeyboardAvoidingView, View, Text, Button, TextInput } from "react-native";
import { styles } from "../style"   // スタイルの読み込み

// 画面遷移用のパッケージ＆設定ファイル
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../type";

import { GlobalValue } from "../globalValue";    // 画面越しの値共有
import { saveItem, loadOneItem, deleteItem } from "../store";    // DB操作


export const FileEditViewScreen: React.FC = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList, "NoteView">>();
    const route = useRoute<RouteProp<RootStackParamList, "NoteView">>();

    // 画面越しの値共有
    const {globalValue, updateGlobalValue} = useContext(GlobalValue);

    // ステートの定義
    const [ id, setId ] = useState<number|null>(route.params.id);
    const [ note, setNote ] = useState<any>({});
    const [ text, setText ] = useState<string>("");

    // Headerのタイトルをセット
    useEffect(() => {

        // Headerタイトルの表示
        navigation.setOptions({
            title: `${globalValue.currentDirData.text}`
        })
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
        });
    }

    // 保存処理
    const onPressSave = async () => {
        if(id){
            await saveItem(id, "note", text, globalValue.currentDirData.id);
        }else{
            await saveItem(Date.now(),"note", text, globalValue.currentDirData.id);
        }
        navigation.navigate("DirView", {id: globalValue.currentDirData.id});
    };


    return (
        <KeyboardAvoidingView style={styles.container}>
            <TextInput
                style={styles.textArea}
                onChangeText={(text) => setText(text)}
                multiline
                placeholder="メモを入力してください"
                defaultValue={note.text}
            />
            <Button title="保存" onPress={onPressSave}></Button>
        </KeyboardAvoidingView>
    )
}

export default FileEditViewScreen