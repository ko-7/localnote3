import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView, View, Text, Button, FlatList, TouchableOpacity } from "react-native";

//スタイルの読み込み
import { styles } from "../style"

//画面越しの値共有
import { MyContext } from "./MyContext";


export const HeaderTitle = () => {
    //画面越しの値共有
    const {sharedValue, updateSharedValue} = useContext(MyContext);

    const changeContext = () => {
        let _copy = JSON.parse(JSON.stringify(sharedValue))
        if(sharedValue.isEdit){
            _copy.isEdit = false;
        }else{
            _copy.isEdit = true;
        }
        updateSharedValue(_copy);
    }

    return(
        <TouchableOpacity onPress={() => changeContext()} >
            <Text style={styles.editButton}>編集</Text>
        </TouchableOpacity>
    );
  }