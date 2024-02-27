import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    //共通
    container: {
        padding: 10,
        flex: 1,
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
        height: 30,
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
        width: 24,
        height: 24,
        fill: "#11f",
        justifyContent: "center",
        alignItems: "center",
    },

    //DirViewScreen
    list: {
        flex: 1,
    },
    fab: {
        position: "absolute",
        right: 16,
        bottom: 32,
    },
    dataRow: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
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
    }

    
})