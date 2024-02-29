import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    //共通
    container: {
        flex: 1,
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
        height: "100%",
        width: "100%",
        position: "absolute",
        bottom: 0,
        backgroundColor: "#555",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    footerIcon: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
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
    makeDirModalActions: {
        
    },

    //NoteViewScreen
    textArea: {
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "flex-start",
    },
})