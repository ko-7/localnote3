import React, { useState, useEffect, useContext } from "react";
import { KeyboardAvoidingView, View, Text, Pressable, TextInput } from "react-native";
import { styles } from "../style"   // スタイルの読み込み

// 画面遷移用のパッケージ＆設定ファイル
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../type";

import { saveItem, loadOneItem, deleteItem } from "../store";    // DB操作


export const FileEditViewScreen: React.FC = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList, "NoteView">>();
    const route = useRoute<RouteProp<RootStackParamList, "NoteView">>();


    // ステートの定義
    const [ id, setId ] = useState<number|null>(route.params.id);
    const [ note, setNote ] = useState<any>({});
    const [ text, setText ] = useState<string>("");
    const [ parentDirData, setParentDirData ] = useState<any>({});

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

    // Headerのタイトルをセット
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
        });
    }

    // 保存処理
    const onPressSave = async () => {
        if(id){
            await saveItem(id, "note", text, parentDirData.id);
        }else{
            await saveItem(Date.now(),"note", text, parentDirData.id);
        }
        navigation.navigate("DirView", {id: parentDirData.id});
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
            <Pressable onPress={onPressSave}>
                <Text>保存</Text>
            </Pressable>
        </KeyboardAvoidingView>
    )
}

export default FileEditViewScreen