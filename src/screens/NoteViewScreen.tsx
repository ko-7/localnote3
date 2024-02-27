import React, { useState, useEffect, useContext } from "react";
import { KeyboardAvoidingView, View, Text, Button, TextInput, TouchableOpacity  } from "react-native";

//スタイルの読み込み
import { styles } from "../style"

//画面遷移用のパッケージ＆設定ファイル
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../type";

//画面越しの値共有
import { MyContext } from "../components/MyContext";

//DB操作
import { saveItem, loadAllItems, loadItem, deleteItem } from "../store";


export const FileEditViewScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList, "NoteView">>();
    const route = useRoute<RouteProp<RootStackParamList, "NoteView">>();

    //画面越しの値共有
    const {sharedValue, updateSharedValue} = useContext(MyContext);

    //ステートの定義
    const [ noteId, setNoteId ] = useState<number|null>(route.params.noteId ? route.params.noteId : null);
    const [ note, setNote ] = useState<any>({});
    const [ text, setText ] = useState<string>("");

    if(route.params.noteId){
        useEffect(() => {
            const initialize = async () => {
                const newNotes = await loadItem(noteId);
                setNote(newNotes);
                setText(newNotes.text);
            }
            const unsubscribe = navigation.addListener("focus", initialize);
            return unsubscribe;
        });
    }
    

    //保存処理
    const onPressSave = async () => {
        if(noteId){
            await saveItem("note", text, noteId);
        }else{
            await saveItem("note", text);
        }
        navigation.goBack();
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