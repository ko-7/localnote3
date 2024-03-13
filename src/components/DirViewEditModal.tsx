import React, { useState, useContext, useEffect } from "react";
import { SafeAreaView, View, Text, Pressable, TextInput, Modal } from "react-native";
import { styles } from "../style";  // スタイルの読み込み

import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";  // 画面遷移に必要
import { StackNavigationProp } from "@react-navigation/stack";                  // 画面遷移に必要
import { RootStackParamList } from "../type";                                   // 画面遷移に必要

import { saveItem, loadOneItem } from "../store";  // DB操作
import Svg,  { Path } from 'react-native-svg';     // SVGを使うためのパッケージ


export const DirViewEditModal: React.FC<{id:number,updateIsDirViewEditModalOpened:any}> = ({id, updateIsDirViewEditModalOpened}) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const route = useRoute<RouteProp<RootStackParamList>>();

    // モーダルOn/Offを切り替える
    const [ isModalVisible, setIsModalVisible ] = useState<boolean>(false);
    const toggleModal = () => {
        setIsModalVisible(!isModalVisible)

        // モーダルが閉じたことを親に伝える
        updateIsDirViewEditModalOpened();
    }

    // フォルダ名の更新後データを格納する
    const [ newText, setNewText ] = useState<string>("");


    // 編集対象フォルダのデータを取得する
    const [ currentDirData, setCurrentDirData ] = useState<any>({});
    useEffect(() => {
        const loadCurrentDirData = async () => {
            let currentDirData = await loadOneItem(id);
            await setCurrentDirData(currentDirData);
        }
        loadCurrentDirData();
    }, [])

    
    const onPressSave = async () => {
        await saveItem(currentDirData.id, currentDirData.dirOrNote, newText, currentDirData.parentDirId, currentDirData.childDir, currentDirData.childNote);
        await console.log("保存ボタンが押されました")
        console.log("id:" + JSON.stringify(id))
        await toggleModal();
    }


    return (
        <View style={{flex:1}}>

            {/* モーダルを表示させるボタン */}
            <Pressable style={styles.footerIcon} onPress={toggleModal}>
                <Svg fill="#11f" width="32" height="32" viewBox="0 0 24 24"><Path d="m11.25 6c.398 0 .75.352.75.75 0 .414-.336.75-.75.75-1.505 0-7.75 0-7.75 0v12h17v-8.75c0-.414.336-.75.75-.75s.75.336.75.75v9.25c0 .621-.522 1-1 1h-18c-.48 0-1-.379-1-1v-13c0-.481.38-1 1-1zm-2.011 6.526c-1.045 3.003-1.238 3.45-1.238 3.84 0 .441.385.626.627.626.272 0 1.108-.301 3.829-1.249zm.888-.889 3.22 3.22 8.408-8.4c.163-.163.245-.377.245-.592 0-.213-.082-.427-.245-.591-.58-.578-1.458-1.457-2.039-2.036-.163-.163-.377-.245-.591-.245-.213 0-.428.082-.592.245z"/></Svg>
            </Pressable>


            {/* モーダル本体 */}
            <Modal visible={isModalVisible} transparent={true} style={styles.footerModal}>
                <View style={styles.footerModalWrapper}>
                    <View style={styles.footerModalContent}>
                        <Text style={styles.footerModalTitle}>フォルダ名を入力してください</Text>

                        {/* フォルダ名入力欄 */}
                        <TextInput
                            style={styles.footerModalTextInput}
                            onChangeText={(text) => setNewText(text)}
                            placeholder="フォルダ名を入力してください"
                            defaultValue={currentDirData.text}
                        />

                        {/* モーダル内のアクションボタン */}
                        <View style={styles.footerModalActionButtons}>
                            <Pressable style={styles.footerModalActionButton} onPress={toggleModal}>
                                <Text style={styles.footerModalActionButtonText}>キャンセル</Text>
                            </Pressable>
                            <Pressable style={styles.footerModalActionButton} onPress={onPressSave}>
                                <Text style={styles.footerModalActionButtonText}>保存</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}