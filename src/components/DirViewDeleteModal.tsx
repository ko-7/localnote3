import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, SafeAreaView, View, Text, Pressable, TextInput, Modal } from "react-native";
import { commonVal } from "../style";  // スタイルの読み込み

import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";  // 画面遷移に必要
import { StackNavigationProp } from "@react-navigation/stack";                  // 画面遷移に必要
import { RootStackParamList } from "../type";                                   // 画面遷移に必要

import { saveItem, loadOneItem, deleteItem } from "../store";  // DB操作
import Svg,  { Path } from 'react-native-svg';     // SVGを使うためのパッケージ


export const DirViewDeleteModal: React.FC<{id:number, dirOrNote:string, updateIsDirViewDeleteModalOpened:any}> = ({id, dirOrNote, updateIsDirViewDeleteModalOpened}) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const route = useRoute<RouteProp<RootStackParamList>>();

    // モーダルOn/Offを切り替える
    const [ isModalVisible, setIsModalVisible ] = useState<boolean>(false);
    const toggleModal = () => {
        setIsModalVisible(!isModalVisible)

        // モーダルが閉じたことを親に伝える
        updateIsDirViewDeleteModalOpened();
    }


    // 削除対象のデータと親フォルダのデータを取得する
    const [ targetItem, setTargetItem ] = useState<any>({});
    useEffect(() => {
        const load = async () => {
            let targetItem = await loadOneItem(id);
            setTargetItem(targetItem);
        }
        load();
    }, [])

    
    // フォルダの削除処理
    const makeChildArray =  async (childDir:number[], childArray:number[]) => {
        let thisTimeGotChildDir0:number[] = [];
        let margedChildArray0:number[] = [...childArray];

        // childDirの各Idでループし、childDir,childNoteの配列を取得する
        for(const item of childDir){
            let dirData = await loadOneItem(item);
            thisTimeGotChildDir0 = [...thisTimeGotChildDir0, ...dirData.childDir];
            margedChildArray0 = [...margedChildArray0, ...dirData.childDir, ...dirData.childNote];
        }

        // 今回取得したchildDirを統合した配列、childDir,childNoteを統合した配列を返す
        return {thisTimeGotChildDir: thisTimeGotChildDir0, margedChildArray: margedChildArray0}
    }
    const onPressDirDelete = async () => {
        
        // 子フォルダ、子ノートを削除するため、idを配列にまとめる
        let thisTimeGotChildDir:number[] = [...targetItem.childDir];
        let margedChildArray:number[] = [...targetItem.childDir, ...targetItem.childNote];
        let result:any = {thisTimeGotChildDir: thisTimeGotChildDir, margedChildArray: margedChildArray};
        while(thisTimeGotChildDir.length > 0){
            result = await makeChildArray(thisTimeGotChildDir, margedChildArray);
            thisTimeGotChildDir = await result.thisTimeGotChildDir;
            margedChildArray = await result.margedChildArray;
        }
        console.log("result :" + JSON.stringify(await result.margedChildArray));


        // 対象フォルダ、の子フォルダ、子ノートを一括削除
        let targetItems = [id, ...result.margedChildArray];
        for(const item of targetItems){
            deleteItem(item);
        }


        // 親のchildDirから削除する
        let parentDirData = await loadOneItem(targetItem.parentDirId);
        parentDirData.childDir = parentDirData.childDir.filter((item:number) => item !== id);
        saveItem(parentDirData.id,parentDirData.dirOrnote, parentDirData.text, parentDirData.parentDirId, parentDirData.childDir, parentDirData.childNote)

        await toggleModal();
    }

    const onPressNoteDelete = async () => {
        // 対象ノートのデータ削除
        deleteItem(id);

        // 親のchildNoteから削除する
        let parentDirData = await loadOneItem(targetItem.parentDirId);
        parentDirData.childNote = parentDirData.childNote.filter((item:number) => item !== id);
        saveItem(parentDirData.id,parentDirData.dirOrnote, parentDirData.text, parentDirData.parentDirId, parentDirData.childDir, parentDirData.childNote)
    
        await toggleModal();
    }


    return (
        <View style={{flex:1}}>

            {/* モーダルを表示させるボタン */}
            <Pressable style={styles.displayButton} onPress={toggleModal}>
                <Text style={styles.displayButtonText}>削除</Text>
            </Pressable>


            {/* モーダル本体 */}
            <Modal visible={isModalVisible} transparent={true} style={styles.dirViewDeleteModal}>
                <View style={styles.dirViewDeleteModalWrapper}>
                    <View style={styles.dirViewDeleteModalContent}>
                        {
                            dirOrNote == "dir" 
                            ? <Text style={styles.dirViewDeleteModalTitle}>配下のフォルダ、ノートも全て削除されます</Text>
                            : <Text style={styles.dirViewDeleteModalTitle}></Text>
                        }

                        {/* フォルダ名入力欄 */}
                        <Text style={styles.dirViewDeleteModalText}>「{targetItem.text}」 を削除しますか？</Text>

                        {/* モーダル内のアクションボタン */}
                        <View style={styles.dirViewDeleteModalActionButtons}>
                            <Pressable style={styles.dirViewDeleteModalActionButton} onPress={toggleModal}>
                                <Text style={styles.dirViewDeleteModalActionButtonText}>キャンセル</Text>
                            </Pressable>
                            <Pressable style={styles.dirViewDeleteModalActionButton} onPress={dirOrNote=="dir" ? onPressDirDelete : onPressNoteDelete}>
                                <Text style={styles.dirViewDeleteModalActionButtonText}>削除</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}


const styles = StyleSheet.create({
    displayButton: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-end",
    },
    displayButtonText: {
        color: "#f33",
    },
    dirViewDeleteModal: {
        // marginHorizontal: "auto",
        justifyContent:'center',
        alignItems:'center',
    },
    dirViewDeleteModalWrapper:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    dirViewDeleteModalContent: {
        width: "90%",
        height: "36%",
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: "#fff",
        borderRadius: 30,
    },
    dirViewDeleteModalTitle: {
        fontSize: 16,
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: 30,
    },
    dirViewDeleteModalText: {
        marginBottom: 30,
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: 16,
        justifyContent: 'center',
    },
    dirViewDeleteModalActionButtons:{
        flexDirection: "row",
    },
    dirViewDeleteModalActionButton: {
        width: 100,
        marginHorizontal: 10,
        paddingHorizontal: 10,
    },
    dirViewDeleteModalActionButtonText: {
        textAlign: "center",
        color: commonVal.actionButtonColor,
    },
})