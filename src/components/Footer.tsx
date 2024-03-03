import React, { useState, useContext } from "react";
import { SafeAreaView, View, Text, Pressable, TextInput, Modal } from "react-native";
// import Modal from 'react-native-modal';
import { styles } from "../style";  // スタイルの読み込み

// 画面遷移に必要
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../type";

import { GlobalValue } from "../globalValue";       // 画面越しの値共有
import { saveItem, loadAllItems, loadOneItem } from "../store";  // DB操作
import Svg,  { Path } from 'react-native-svg';      // SVGを使うためのパッケージ


// Footer
export const Footer: React.FC = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    // const route = useRoute<RouteProp<RootStackParamList>>();

    // 画面越しの値共有
    const {globalValue, updateGlobalValue} = useContext(GlobalValue);

    // モーダル用のステート、関数
    const [ isModalVisible, setIsModalVisible ] = useState<boolean>(false);
    const toggleModal = () => {
        setIsModalVisible(!isModalVisible)
    }

    // ディレクトリ作成機能
    const [ dirName, setDirName ] = useState<string>("");  // ⇐モーダルのフォルダ名入力欄で入力する
    const onPressMakeDir = async () => {

        // ディレクトリ作成
        let newId = Date.now()
        await saveItem(newId, "dir", dirName, globalValue.currentDirData.id);

        // 親DirのchildDirに追加する
        let parentDirData = globalValue.currentDirData;
        parentDirData.childDir.push(newId);
        const { id, dirOrNote, text, parentDirId, childDir, childNote } = parentDirData
        saveItem(id, dirOrNote, text, parentDirId, childDir, childNote);

        // グローバル変数の更新　※JSON.parse(JSON.srtingify())でディープコピーする
        let hereGlobalValue = JSON.parse(JSON.stringify(globalValue));
        hereGlobalValue.currentDirData = await loadOneItem(newId);
        await updateGlobalValue(hereGlobalValue);

        // Modalを閉じ、作成したフォルダに移動
        toggleModal();
        navigation.navigate("DirView", {id: newId});
    }


    // ノート作成機能
    const onPressMakeNote = async () => {
        console.log('Note作成機能に入りました！')

        // ノートの作成
        let newId = Date.now()
        await saveItem(newId, "note", null, globalValue.currentDirData.id);

        // 親DirのchildNoteに追加する
        let parentDirData = globalValue.currentDirData;
        parentDirData.childNote.push(newId);
        const { id, dirOrNote, text, parentDirId, childDir, childNote } = parentDirData
        saveItem(id, dirOrNote, text, parentDirId, childDir, childNote);

        // 作成したノートに移動
        navigation.navigate("NoteView", {id: newId});
    }



    return (
        <SafeAreaView style={styles.footer}>

            {/* フォルダ作成ボタン */}
            <View>
                {/* モーダルを表示させるボタン */}
                <Pressable style={styles.footerIcon} onPress={toggleModal}>
                    <Svg width="36" height="80%" viewBox="0 0 24 24">
                        <Path fill="#11f" d="M19.5 13c-2.483 0-4.5 2.015-4.5 4.5s2.017 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.017-4.5-4.5-4.5zm2.5 5h-2v2h-1v-2h-2v-1h2v-2h1v2h2v1zm-7.18 4h-14.82v-20h7c1.695 1.942 2.371 3 4 3h13v7.82c-.576-.554-1.252-1.006-2-1.319v-4.501h-11c-2.34 0-3.537-1.388-4.916-3h-4.084v16h11.502c.312.749.765 1.424 1.318 2z" />
                    </Svg>
                </Pressable>

                {/* モーダル本体 */}
                <Modal visible={isModalVisible} style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
                    <View style={{ flex:1, justifyContent:'center', alignItems:'center', backgroundColor:"#fff", width:300, height: 100 }}>
                        <Text>Modal Content</Text>

                        {/* フォルダ名入力欄 */}
                        <TextInput
                            style={styles.textArea}
                            onChangeText={(text) => setDirName(text)}
                            multiline
                            placeholder="フォルダ名を入力してください"
                        />

                        {/* モーダル内のアクションボタン */}
                        <View style={styles.makeDirModalActions}>
                            <Pressable onPress={toggleModal}>
                                <Text>キャンセル</Text>
                            </Pressable>
                            <Pressable onPress={onPressMakeDir}>
                                <Text>作成</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </View>


            {/* メモ作成ボタン */}
            <View>
                <Pressable style={styles.footerIcon} onPress={() => onPressMakeNote()}>
                    <Svg width="36" height="80%" viewBox="0 0 24 24">
                        <Path fill="#11f" d="M6 12h10v1h-10v-1zm7.816-3h-7.816v1h9.047c-.45-.283-.863-.618-1.231-1zm5.184 1.975v2.569c0 4.106-6 2.456-6 2.456s1.518 6-2.638 6h-7.362v-20h9.5c.312-.749.763-1.424 1.316-2h-12.816v24h10.189c3.163 0 9.811-7.223 9.811-9.614v-3.886c-.623.26-1.297.421-2 .475zm-13-3.975h6.5c-.134-.32-.237-.656-.319-1h-6.181v1zm17-2.5c0 2.485-2.017 4.5-4.5 4.5s-4.5-2.015-4.5-4.5 2.017-4.5 4.5-4.5 4.5 2.015 4.5 4.5zm-2-.5h-2v-2h-1v2h-2v1h2v2h1v-2h2v-1z"/>
                    </Svg>
                </Pressable>
            </View>

        </SafeAreaView>
    )
}


