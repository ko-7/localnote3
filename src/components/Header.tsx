import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView, View, Text, Button, FlatList, Pressable } from "react-native";

import { styles } from "../style"   //スタイルの読み込み
import { GlobalValue } from "../globalValue";   //画面越しの値共有


export const HeaderTitle = () => {
    //画面越しの値共有
    const {globalValue, updateGlobalValue} = useContext(GlobalValue);

    const onPressIsEdit = () => {
        let _copy = JSON.parse(JSON.stringify(globalValue))
        _copy.isEdit = !globalValue.isEdit;
        updateGlobalValue(_copy);
    }



    return(
        <View>
            <Pressable onPress={() => onPressIsEdit()} >
                <Text style={styles.editButton}>編集</Text>
            </Pressable>
        </View>
    );
  }