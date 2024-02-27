import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView, View, Text, FlatList, ScrollView, TouchableOpacity } from "react-native";

//スタイルの読み込み
import { styles } from "../style"

//画面遷移に必要
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../type";

//画面越しの値共有
import { MyContext } from "../components/MyContext";

//日時データ操作用パッケージ
import { UnixTimeFormat } from "../functions";
import { loadAllItems, deleteItem } from "../store";


const DirViewScreen: React.FC = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList, "DirView">>();
    const [notes, setNotes] = useState<any>([]);


    //画面越しの値共有
    const {sharedValue, updateSharedValue} = useContext(MyContext);

    const initialize = async () => {
        const newNotes = await loadAllItems();
        setNotes(newNotes);
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
                    data={notes}
                    keyExtractor={item => `${item.noteId}`}
                    renderItem={({ item }) => (
                        <View style={styles.dataRow}>
                            <TouchableOpacity style={styles.dataRowItem} onPress={() => navigation.navigate("NoteView", {noteId: item.noteId})}>
                                    {
                                        item.dirOrNote == "dir"
                                        ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6.083 4c1.38 1.612 2.578 3 4.917 3h11v13h-20v-16h4.083zm.917-2h-7v20h24v-17h-13c-1.629 0-2.305-1.058-4-3z"/></svg>
                                        : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M4 22v-20h16v11.543c0 4.107-6 2.457-6 2.457s1.518 6-2.638 6h-7.362zm18-7.614v-14.386h-20v24h10.189c3.163 0 9.811-7.223 9.811-9.614zm-5-1.386h-10v-1h10v1zm0-4h-10v1h10v-1zm0-3h-10v1h10v-1z"/></svg>
                                    }
                                    
                                    <View>
                                        <Text style={styles.textMedium}>{item.dirOrNote}　{item.text}</Text>
                                        {/* <Text style={styles.textSmall}>　　作成日時：{UnixTimeFormat(item.noteId)}</Text> */}
                                    </View>
                            </TouchableOpacity>

                            <View style={styles.actions}>
                                <TouchableOpacity onPress={() => onPressDelete(item.noteId)} >
                                    <Text style={styles.deleteButton}>削除</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    />
            </ScrollView>
        </SafeAreaView>
    )
}



export default DirViewScreen;