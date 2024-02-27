import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, SafeAreaView, View, Text, Button, FlatList, TouchableOpacity } from "react-native";

//スタイルの読み込み
import { styles } from "../style";

//画面遷移に必要
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../type";

//画面越しの値共有
import { MyContext } from "./MyContext";


//Footer
export const Footer: React.FC = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    // const route = useRoute<RouteProp<RootStackParamList>>();

    //画面越しの値共有
    const {sharedValue, updateSharedValue} = useContext(MyContext);


    return (
        <SafeAreaView style={styles.footer}>
            <TouchableOpacity style={styles.footerIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    {/* <path d="M19.5 13c-2.483 0-4.5 2.015-4.5 4.5s2.017 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.017-4.5-4.5-4.5zm2.5 5h-2v2h-1v-2h-2v-1h2v-2h1v2h2v1zm-7.18 4h-14.82v-20h7c1.695 1.942 2.371 3 4 3h13v7.82c-.576-.554-1.252-1.006-2-1.319v-4.501h-11c-2.34 0-3.537-1.388-4.916-3h-4.084v16h11.502c.312.749.765 1.424 1.318 2z"/> */}
                    <path d="M19.5 13c-2.483 0-4.5 2.015-4.5 4.5s2.017 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.017-4.5-4.5-4.5zm2.5 5h-2v2h-1v-2h-2v-1h2v-2h1v2h2v1zm-7.18 4h-14.82v-20h7c1.695 1.942 2.371 3 4 3h13v7.82c-1.169-1.124-2.754-1.82-4.5-1.82-3.584 0-6.5 2.916-6.5 6.5 0 1.747.695 3.331 1.82 4.5z"/>
                </svg>
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerIcon} onPress={() => navigation.navigate("NoteView", {noteId: null})}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M6 12h10v1h-10v-1zm7.816-3h-7.816v1h9.047c-.45-.283-.863-.618-1.231-1zm5.184 1.975v2.569c0 4.106-6 2.456-6 2.456s1.518 6-2.638 6h-7.362v-20h9.5c.312-.749.763-1.424 1.316-2h-12.816v24h10.189c3.163 0 9.811-7.223 9.811-9.614v-3.886c-.623.26-1.297.421-2 .475zm-13-3.975h6.5c-.134-.32-.237-.656-.319-1h-6.181v1zm17-2.5c0 2.485-2.017 4.5-4.5 4.5s-4.5-2.015-4.5-4.5 2.017-4.5 4.5-4.5 4.5 2.015 4.5 4.5zm-2-.5h-2v-2h-1v2h-2v1h2v2h1v-2h2v-1z"/>
                </svg>
            </TouchableOpacity>
        </SafeAreaView>
    )
}


