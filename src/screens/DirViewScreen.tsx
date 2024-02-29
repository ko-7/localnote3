import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView, View, Text, FlatList, ScrollView, TouchableOpacity } from "react-native";

import { styles } from "../style"   //スタイルの読み込み

//画面遷移に必要
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../type";

import { GlobalValue } from "../GlobalValue";       //画面越しの値共有
import { UnixTimeFormat } from "../functions";      //日時データ操作用パッケージ
import { loadAllItems, deleteItem } from "../store";//DB操作
import Svg,  { Path } from 'react-native-svg';      //SVGを使うためのパッケージ

const DirViewScreen: React.FC = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList, "DirView">>();

    //画面越しの値共有
    const {globalValue, updateGlobalValue} = useContext(GlobalValue);

    const initialize = async () => {
        let hereglobalValue = JSON.parse(JSON.stringify(globalValue));
        hereglobalValue.nowDirData = await loadAllItems();
        updateGlobalValue(hereglobalValue);
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", initialize);
        return unsubscribe
    }, [navigation]);

    //削除処理
    const onPressDelete = (noteId: number) => {
        deleteItem(noteId);
        initialize();
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <FlatList
                    style={styles.list}
                    data={globalValue.nowDirData}
                    keyExtractor={item => `${item.noteId}`}
                    renderItem={({ item }) => (
                        <View style={styles.dataRow}>
                            <TouchableOpacity style={styles.dataRowItem} onPress={() => navigation.navigate("NoteView", {noteId: item.noteId})}>
                                {
                                    item.dirOrNote == "dir"
                                    ? <Svg fill="#11f" width="32" height="32" viewBox="0 0 24 24"><Path d="M6.083 4c1.38 1.612 2.578 3 4.917 3h11v13h-20v-16h4.083zm.917-2h-7v20h24v-17h-13c-1.629 0-2.305-1.058-4-3z" /></Svg>
                                    : <Svg fill="#11f" width="32" height="32" viewBox="0 0 24 24"><Path d="M4 22v-20h16v11.543c0 4.107-6 2.457-6 2.457s1.518 6-2.638 6h-7.362zm18-7.614v-14.386h-20v24h10.189c3.163 0 9.811-7.223 9.811-9.614zm-5-1.386h-10v-1h10v1zm0-4h-10v1h10v-1zm0-3h-10v1h10v-1z" /></Svg>
                                }
                                
                                <View>
                                    <Text style={styles.textMedium}>{item.dirOrNote}　{item.noteId}　{item.text}</Text>
                                    {/* <Text style={styles.textSmall}>　　作成日時：{UnixTimeFormat(item.noteId)}</Text> */}
                                </View>
                            </TouchableOpacity>

                            {
                                globalValue.isEdit == true ?
                                <View style={styles.actions}>
                                    <TouchableOpacity onPress={() => onPressDelete(item.noteId)} >
                                        <Text style={styles.deleteButton}>削除</Text>
                                    </TouchableOpacity>
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