import { AppRegistry } from "react-native";
// import { name as appName} from '../app.json';
import App from '../App';
import AsyncStorage from "@react-native-async-storage/async-storage";


//保存
export const saveItem = async (dirOrNote:string, text:string, noteId:number=Date.now(), childDir:number[]=[], childNote:number[]=[]) => {
    const key:string = `${noteId}`;
    const value:string = JSON.stringify({
        dirOrNote,
        text,
        noteId,
        childDir,
        childNote,
    });
    await AsyncStorage.setItem(key, value);
}


//１件取得
export const loadItem = async (noteId:number|null) => {
    const key:string = `${noteId}`
    try{
        const item:any = await AsyncStorage.getItem(key);
        return JSON.parse(item);
    }catch(error){
        console.log(error);
    }
}


//全件取得
export const loadAllItems = async () => {
    const keys:any = await AsyncStorage.getAllKeys();
    keys.sort();
    const allRecoads = await AsyncStorage.multiGet(keys);
    return allRecoads.map(recoad => JSON.parse(`${recoad[1]}`));
}


//削除
export const deleteItem = async (noteId:number) => {
    const key:string = `${noteId}`
    try{
        await AsyncStorage.removeItem(key);
    }catch(error){
        console.log(error);
    }
}

//アプリ初回起動時に以下データ作成//////////////////////////
// dirOrNote：dir
// text     ：初期フォルダ
// noteId   ：0
// childDir ：[]
// childNote：[]
const checkIfAppLaunchedBefore = async () => {
    try{
        const launchedBefore = await AsyncStorage.getItem('@MyApp:launchBefore');
        return !!launchedBefore;
    }catch(error){
        console.error('Error checking app launch status:', error);
        return false;
    }
}
const initializeAppData = async () => {
    try{
        const initialData = {
            dirOrNote: 'dir',
            text     : '初期フォルダ',
            noteId   : 0,
            childDir : [],
            childNote: [],
        }

        await AsyncStorage.setItem('@MyApp:launchedBefore', 'true');
        await AsyncStorage.setItem('@MyApp:data', JSON.stringify(initialData));
    }catch(error){
        console.error('Error initializing app data:', error);
    }
}
export const createDefaultData = async () => {
const launchedBefore = await checkIfAppLaunchedBefore();
if(!launchedBefore){
    await initializeAppData();
}
}

  