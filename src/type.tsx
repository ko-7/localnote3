//画面遷移用の型
export type RootStackParamList = {
    DirView: {
      id: number,   //パラメータのデータ型を指定する
    };         
    NoteView: {
      id: number,
      parentDirId: number,
    };
  }