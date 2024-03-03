//画面遷移用の型
export type RootStackParamList = {
    DirView: {id: number | null};         //パラメータのデータ型を指定する
    NoteView: {
      id: number | null,
      parentDirId: number,
    };
  }