import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    //共通
    container: {
        flex: 1,
    },
    mainWrapper: { 
        padding: 10,
     },
    textLarge:  { fontSize: 24, },
    textMedium: { fontSize: 16, },
    textSmall:  { fontSize: 12, },

    editButton: {
        marginHorizontal: 10,
        color: "#33f" ,
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
        flex:1,
        // marginHorizontal: "auto",
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#00f',
    },
    footerModalContent: {
        flex:1,
        justifyContent:'flex-start',
        alignItems:'center',
    },
    footerModalTitle: {
        fontSize: 16,
        paddingTop: 50,
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
        color: "#33f",
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
        width: "90%",
        flexDirection: "row",
        alignItems: "center",
    },
    actions: {
        flexDirection: "row"
    },


    //NoteViewScreen
    textArea: {
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "flex-start",
    },
})