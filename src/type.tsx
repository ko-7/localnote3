//画面遷移用の型
export type RootStackParamList = {
    DirView: undefined;         //パラメータのデータ型を指定する
    NoteView: {noteId: number | null};
}