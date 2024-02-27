//日付の表記変換（unixタイム⇒yyyy/MM/dd）
//引数　：unixタイム
//戻り値：yyyy/MM/dd hh:mm:ss形式の日付
export function UnixTimeFormat(UnixTime: number): string{
    let time = new Date(UnixTime);
    let formatedDate = time.toLocaleDateString();
    return formatedDate;
}


//日付の表記変換（unixタイム⇒yyyy/MM/dd）
//引数　：unixタイム
//戻り値：yyyy/MM/dd hh:mm:ss形式の日付
export function UnixTimeFormat0(UnixTime: number): string{
    let time = new Date(UnixTime);
    let formatedDate = time.toLocaleDateString();
    let formatedTime = time.toLocaleTimeString("it-IT");
    return formatedDate + " " +formatedTime
}