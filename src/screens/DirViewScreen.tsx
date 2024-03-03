import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView, View, Text, FlatList, ScrollView, Pressable } from "react-native";
import { styles } from "../style"   // スタイルの読み込み

// 画面遷移に必要
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../type";

import { GlobalValue } from "../globalValue";       // 画面越しの値共有
import { UnixTimeFormat } from "../functions";      // 日時データ操作用パッケージ
import { loadOneItem, loadAllItems, deleteItem, deleteAllItems, getAllKeys, loadSomeItems } from "../store";// DB操作
import Svg,  { Path } from 'react-native-svg';      // SVGを使うためのパッケージ

export const DirViewScreen: React.FC = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList, "DirView">>();
    const route = useRoute<RouteProp<RootStackParamList, "DirView">>();

    // 画面越しの値共有
    const {globalValue, updateGlobalValue} = useContext(GlobalValue);


    // ↓↓　開発用コード　↓↓/////////////////////////////////////////////

    // 開発用コード：AsyncStorageのデータ全件削除
    const onPressDeleteAllItems = () => { deleteAllItems(); }

    // 全てのキーを取得
    const [ allKeys, setAllKeys ] = useState<any>();
    useEffect(() => {
        const getAllkeysFunc = async () => {
            const allKeys0 = await getAllKeys();
            setAllKeys(allKeys0);
        }
        getAllkeysFunc()
    }, []);

    // ↑↑　開発用コード　↑↑///////////////////////////////////////////


    // グローバル変数（currentDir）の編集
    const editGlobalValueCurrentDir = async (id: number|null) => {
        let hereGlobalValue = JSON.parse(JSON.stringify(globalValue));
        hereGlobalValue.currentDirData = await loadOneItem(route.params.id);
        await updateGlobalValue(hereGlobalValue);
    }


    // グローバル変数の書き換え
    useEffect( () => {
        console.log(JSON.stringify(route.params))
        editGlobalValueCurrentDir(route.params.id);
    }, [navigation, route.params.id]);


    // 開いているフォルダの子フォルダ、子ファイルを取得する
    const [ currentDirData, setCurrentDirData ] = useState<any>({});
    const [ allItems, setAllItems ] = useState<any>({});    //⇐開発用
    const [ allItemsChildDir, setAllItemsChildDir ] = useState<any>({});
    const [ allItemsChildNote, setAllItemschildNote ] = useState<any>({});
    const initialize = async () => {

        // ↓↓　開発用コード　↓↓　////////////////////////

        // DBの全データ取得
        let currentAllItems = await loadAllItems()
        setAllItems(currentAllItems);

        // ↑↑　開発用コード　↑↑　////////////////////////


        // カレントディレクトリのデータをDBから取得する
        let currentDirData = await loadOneItem(route.params.id);
        await setCurrentDirData(currentDirData);


        // 子フォルダ、子ノートの一覧データ取得
        let currentAllItemsChildDir = await loadSomeItems(currentDirData.childDir);
        await setAllItemsChildDir(currentAllItemsChildDir);
        let currentAllItemsChildNote = await loadSomeItems(currentDirData.childNote);
        await setAllItemschildNote(currentAllItemsChildNote);


        // Headerタイトルの表示
        navigation.setOptions({
            title: `${currentDirData.text}`,
        });
    }
    useEffect(() => {
        initialize();
    }, [])


    // 削除処理
    const onPressDelete = (id: number) => {
        deleteItem(id);
        initialize();
    }


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>


                {/* ↓↓　開発用コード　↓↓　//////////////////////////////////////////////////// */}
                <View>
                    <Pressable onPress={onPressDeleteAllItems}>
                        <Text style={{color: 'rgb(0,0,255)'}}>データ全削除</Text><Text>　</Text>
                    </Pressable>
                    <Text>■globalValue.currentDirData : </Text>
                    <Text>{JSON.stringify(globalValue.currentDirData)}</Text><Text>　</Text>
                    <Text>■currentDirData : </Text>
                    <Text>{JSON.stringify(currentDirData)}</Text><Text>　</Text>
                    <Text>■allKeys : </Text>
                    <Text>{JSON.stringify(allKeys)}</Text><Text>　</Text>
                    <Text>■allItems : </Text>
                    <Text>{JSON.stringify(allItems)}</Text><Text>　</Text>
                    <Text>■allItemsChildDir :  </Text>
                    <Text>{JSON.stringify(allItemsChildDir)}</Text><Text> </Text>
                    <Text>■allItemsChildNote :  </Text>
                    <Text>{JSON.stringify(allItemsChildNote)}</Text><Text> </Text>
                </View>
                {/* ↑↑　開発用コード　↑↑　///////////////////////////////////////////////// */}
                
                

                {/* 子フォルダ一覧 */}
                <FlatList
                    style={styles.list}
                    data={allItemsChildDir}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({ item }) => (
                        <View style={styles.dataRow}>
                            <Pressable style={styles.dataRowItem} onPress={() => {navigation.push("DirView", {id: item.id})}}>
                            {/* <Pressable style={styles.dataRowItem} onPress={() => navigation.navigate("NoteView", {id: item.id})}> */}
                                <Svg fill="#11f" width="32" height="32" viewBox="0 0 24 24"><Path d="M6.083 4c1.38 1.612 2.578 3 4.917 3h11v13h-20v-16h4.083zm.917-2h-7v20h24v-17h-13c-1.629 0-2.305-1.058-4-3z" /></Svg>
                                <View>
                                    <Text style={styles.textMedium}>{item.dirOrNote}　{item.id}　{item.text}</Text>
                                    {/* <Text style={styles.textSmall}>　　作成日時：{UnixTimeFormat(item.id)}</Text> */}
                                </View>
                            </Pressable>

                            {
                                // ヘッダーの編集ボタン押下に応じて「削除」ボタンの表示/非表示を切り替える
                                globalValue.isEdit == true ?
                                <View style={styles.actions}>
                                    <Pressable onPress={() => onPressDelete(item.id)} >
                                        <Text style={styles.deleteButton}>削除</Text>
                                    </Pressable>
                                </View>
                                :
                                null
                            }
                        </View>
                    )}
                />

                {/* 子ノートの一覧 */}
                <FlatList
                    style={styles.list}
                    data={allItemsChildNote}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({ item }) => (
                        <View style={styles.dataRow}>
                            <Pressable style={styles.dataRowItem} onPress={() => {navigation.push("NoteView", {id: item.id, parentDirId: item.parentDirId})}}>
                                <Svg fill="#11f" width="32" height="32" viewBox="0 0 24 24"><Path d="M4 22v-20h16v11.543c0 4.107-6 2.457-6 2.457s1.518 6-2.638 6h-7.362zm18-7.614v-14.386h-20v24h10.189c3.163 0 9.811-7.223 9.811-9.614zm-5-1.386h-10v-1h10v1zm0-4h-10v1h10v-1zm0-3h-10v1h10v-1z" /></Svg>
                                <View>
                                    <Text style={styles.textMedium}>{item.dirOrNote}　{item.id}　{item.text}</Text>
                                    {/* <Text style={styles.textSmall}>　　作成日時：{UnixTimeFormat(item.id)}</Text> */}
                                </View>
                            </Pressable>

                            {
                                // ヘッダーの編集ボタン押下に応じて「削除」ボタンの表示/非表示を切り替える
                                globalValue.isEdit == true ?
                                <View style={styles.actions}>
                                    <Pressable onPress={() => onPressDelete(item.id)} >
                                        <Text style={styles.deleteButton}>削除</Text>
                                    </Pressable>
                                </View>
                                :
                                null
                            }
                        </View>
                    )}
                />


            </ScrollView>
        </SafeAreaView>
    )
}



export default DirViewScreen;