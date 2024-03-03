import AsyncStorage from "@react-native-async-storage/async-storage";


// 保存
export async function saveItem(id:number, dirOrNote:string, text:string|null, parentDirId:number|null, childDir:number[]=[], childNote:number[]=[]):Promise<void|Error>{
    const key:string = `${id}`;

    //JSON文字列に変換　※AsyncStorageはJSON文字列しか格納できない
    const value:string = JSON.stringify({
        id,
        dirOrNote,
        text,
        parentDirId,
        childDir,
        childNote,
    });

    await AsyncStorage.setItem(key, value);
}


//１件取得
export async function loadOneItem(id:number|null){
    const key:string = `${id}`
    try{
        const item:any = await AsyncStorage.getItem(key);
        return JSON.parse(item);
    }catch(error){
        console.log(error);
    }
}


// 複数件取得
export async function loadSomeItems(ids:any|null){
    const keys:any = ids;
    const someItems = await AsyncStorage.multiGet(keys);
    return someItems?.map(item => JSON.parse(`${item[1]}`));
}





// 削除
export async function deleteItem(id:number):Promise<void|Error>{
    const key:string = `${id}`
    try{
        await AsyncStorage.removeItem(key);
    }catch(error){
        console.log(error);
    }
}


// ↓↓　開発用コード　↓↓///////////////////////////////////////////////

// 全件取得
export async function loadAllItems(){
    const keys:any = await AsyncStorage.getAllKeys();
    keys.sort();
    const allItems = await AsyncStorage.multiGet(keys);
    return allItems?.map(item => JSON.parse(`${item[1]}`));
}

// AsyncStorageのデータ全件削除
export async function deleteAllItems():Promise<void|Error>{
    await AsyncStorage.clear();
}

// AsyncStorageの全キー取得
export async function getAllKeys():Promise<any[]|Error>{
    const keys:any = await AsyncStorage.getAllKeys();
    keys.sort();
    return keys;
}

// ↑↑　開発用コード　↑↑//////////////////////////////////////////////////





//アプリ初回起動時に以下データ作成/////////////////////////////////////////
export async function createInitialData(){
    try {

        //初期データ作成済みかを確認
        const launchedBefore = await AsyncStorage.getItem('isInitialDataCreated');

        // 初期データ未作成なら作成する
        if (!launchedBefore) {

            // 初期データ
            const initialData = {
                id   : 0,
                dirOrNote: 'dir',
                text     : 'ホーム',
                parentDirId: null,
                childDir : [],
                childNote: [],
            }
            const key = initialData.id

            //「初期データ作成済み」の記録をする
            await AsyncStorage.setItem('isInitialDataCreated', 'true');

            // 初期データをAsyncStorageに保存
            await AsyncStorage.setItem(`${key}`, JSON.stringify(initialData));
            
        }
    } catch(error){
        console.error('Error initializing app data:', error);
    }
}