import { StyleSheet } from "react-native";

// 共通の値を定義
export const commonVal = {
    textLarge: 24,
    textMedium: 18,
    textSmall: 12,
    actionButtonColor: "#33f",
}

// スタイルを定義
export const styles = StyleSheet.create({
    //共通
    container: {
        flex: 1,
    },
    mainWrapper: { 
        padding: 10,
     },

    headerButton: {
        marginHorizontal: 10,
        color: commonVal.actionButtonColor ,
        fontSize: commonVal.textMedium,
    },
    deleteButton: { color: "#f00" },

    //Footer
    footer: {
        flex: 1,
        backgroundColor: "#555",
        // display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    footerIcon: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    footerModal: {
        // marginHorizontal: "auto",
        justifyContent:'center',
        alignItems:'center',
    },
    footerModalWrapper:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    footerModalContent: {
        width: "90%",
        height: "36%",
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: "#fff",
        borderRadius: 30,
    },
    footerModalTitle: {
        fontSize: 16,
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: 30,
    },
    footerModalTextInput: {
        width: "80%",
        marginBottom: 30,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: "#aaa",
        borderRadius: 10,
        fontSize: 16,
    },
    footerModalActionButtons:{
        flexDirection: "row",
    },
    footerModalActionButton: {
        width: 100,
        marginHorizontal: 10,
        paddingHorizontal: 10,
    },
    footerModalActionButtonText: {
        textAlign: "center",
        color: commonVal.actionButtonColor,
    },

    //DirViewScreen
    list: {
    },
    fab: {
        position: "absolute",
        right: 16,
        bottom: 32,
    },
    dataRow: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        height: 54,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    dataRowItem: {
        width: "70%",
        flexDirection: "row",
        alignItems: "center",
        height: 24,
    },
    dirviewListText: {
        fontSize: commonVal.textMedium
    },
    actions: {
        flex:1,
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    action:{
        marginLeft: 10,
        flexDirection: "row"
    },


    //NoteViewScreen
    textArea: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 20,
        textAlignVertical: "top",
        fontSize: commonVal.textMedium
        // alignItems: "flex-start",
        // justifyContent: "flex-start",
    },
})