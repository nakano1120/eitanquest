var lvup = new Audio('se/lvup.mp3');
var win = new Audio('se/win.mp3');
var good = new Audio('se/good.mp3');
var bad = new Audio('se/bad.mp3');
let myname
let lv=0
let job
let param
let metor=[50,50,25,25,0,0]///HP最大、HP現在、MP最大、MP現在、経験値、魔法経験値
let mlv=0
let wid=0
let aid=0
let next=0
let nowenemy
let nowehp
let answer
let nowfight=false
let money=0
let nowplace
let place=["なもなき村","はじまり草原(推奨LV1)","ネクストロード(推奨LV5)"]
let placekind=[1,0,0]
let weapon=["はじめての剣","岩石の剣","マジカルな剣"]
let wp=[3,5,7]
let armor=["はじめての盾","うけみの盾"]
let ap=[1,2]
let enemylist=["ざこくん","パンピー","ガンバレリーナ","こしあん兄貴","つぶあん兄貴"]
let enemyhp=[5,8,10,12,12]
let enemyap=[3,3,5,5,5]
let enemy1=[0,1]
let enemy2=[1,2,3,4]
let eitan1j=["〜について","俳優","実際は","助言者","独りで","すでに","場所、土地","仕事、作業","事実、こと","光、明かり","文化","世紀"]
let eitan1e=["about","actor","actually","adviser","alone","already","place","job","fact","light","culture","century"]
let eisaku1j=["これは日本です。(3)","こちらはマイクです。(3)","あちらはアリスです。(3)","これは腕時計ですか？(4)","あなたは先生です。(4)","あれはあなたのノートです。(4)"]
let eisaku1e=["This is Japan.","This is Mike.","That is Alice.","Is this a watch?","you are a teacher.","That is your notebook."]

window.onload=function startup(){///起動時処理
    myname = localStorage.getItem("myName");
    if(myname === null){
        myname = window.prompt("ユーザー名を入力してください", "");
        localStorage.setItem('myName', myname);
        alert(myname+"さん、ようこそ！")
        localStorage.setItem("job", "戦士");
        localStorage.setItem("lv", 1);
        localStorage.setItem("metor", metor);
        localStorage.setItem("magiclevel", 1);
        localStorage.setItem("weaponid", 0);
        localStorage.setItem("armorid", 0);
        localStorage.setItem("money", 0);
        localStorage.setItem("nowplace", 0);
    }
    lv = localStorage.getItem("lv");
    job = localStorage.getItem("job");
    param = localStorage.getItem("metor");
    metor = param.split(',')
    mlv = localStorage.getItem("magiclevel");
    wid = localStorage.getItem("weaponid");
    aid = localStorage.getItem("armorid");
    money = localStorage.getItem("money");
    nowplace = localStorage.getItem("nowplace");
    explevel();
    redraw();
}
function redraw(){///再描画
    if(placekind[nowplace]==0){
        document.getElementById("town").style.display="none"
        document.getElementById("search").style.display="block"
    }else if(placekind[nowplace]==1){
        document.getElementById("town").style.display="block"
        document.getElementById("search").style.display="none"
    }
    document.getElementById("myname").textContent=myname
    document.getElementById("lv").textContent=lv
    document.getElementById("hp").textContent=metor[1]+"/"+metor[0]
    document.getElementById("proghp").max=metor[0]
    document.getElementById("proghp").style.width=metor[0]*3+"px"
    document.getElementById("proghp").value=metor[1]
    document.getElementById("mp").textContent=metor[3]+"/"+metor[2]
    document.getElementById("progmp").style.width=metor[2]*3+"px"
    document.getElementById("progmp").max=metor[2]
    document.getElementById("progmp").value=metor[3]
    document.getElementById("mlv").textContent=mlv
    document.getElementById("weapon").textContent=weapon[wid]+"　攻撃力"+wp[wid]
    document.getElementById("armor").textContent=armor[aid]+"　防御力"+ap[aid]
    document.getElementById("money").textContent=money
    document.getElementById("nowplace").textContent=nowplace+"."+place[nowplace]
    document.getElementById("next").textContent=next
    if(nowfight){
        console.log(enemyhp[nowenemy])
        document.getElementById("proge").max=enemyhp[nowenemy]
        document.getElementById("proge").value=nowehp
    }
}
function fightenemy(){///戦闘開始
    if(nowfight){
        alert("現在戦闘中です。逃げるかもしくは戦ってください。")
    }
    switch(parseInt(nowplace)){
        case 1:
            nowenemy = enemy1[Math.floor(Math.random()*(enemy1.length-1))]
            break;
        case 2:
            console.log("まうす")
            nowenemy = enemy2[Math.floor(Math.random()*(enemy2.length-1))]
            break;
        default:
            nowenemy = 0
            break;
    }
    alert(enemylist[nowenemy]+"が現れた！")
    alert("「戦闘」ボタンを押して出た日本語の英単語訳を小文字で答えてください。")
    nowehp=enemyhp[nowenemy]
    nowfight=true
    document.getElementById("enemy").style.display="block"
    document.getElementById("enemyname").textContent=enemylist[nowenemy]
}
function battle(){///戦闘処理
    if(nowfight == false){
        alert("まず戦闘を開始してください")
        return;
    }
    alert(myname+"の攻撃！")
    let eitanid=Math.floor(Math.random()*eitan1j.length)
    answer = window.prompt(eitan1j[eitanid], "");
    if(eitan1e[eitanid]==answer){
        good.play()
        alert("正解！")
        nowehp-=wp[wid]+Math.floor(Math.random()*lv)
    }else{
        bad.play()
        alert("不正解！正解は"+eitan1e[eitanid])
        let damage = enemyap[nowenemy]+Math.floor(Math.random()*lv)-ap[aid]
        metor[1]-=damage
        alert(myname+"に"+damage+"ダメージ")
    }
    if(nowehp<=0){
        win.play()
        alert(enemylist[nowenemy]+"を倒した！")
        money=parseInt(money)+enemyhp[nowenemy]+enemyap[nowenemy]
        metor[4]=parseInt(metor[4])+parseInt(enemyhp[nowenemy])
        alert("経験値"+enemyhp[nowenemy]+"　お金"+(enemyhp[nowenemy]+enemyap[nowenemy])+"Pを獲得！")
        explevel()
        nowfight=false
        saveparam()
        document.getElementById("enemy").style.display="none"
    }
    if(metor[1]<=0){
        alert(myname+"はたおれた！")
        money=0
        alert("一文無しになってしまった！")
        metor[1]=metor[0]
        metor[3]=metor[2]
        saveparam()
        document.getElementById("enemy").style.display="none"
    }
    redraw()
}
function magic(){
    if(nowfight == false){
        alert("まず戦闘を開始してください")
        return;
    }
    alert(myname+"は魔法を唱えた！")
    alert("魔法は英作文です。次の日本語を英語に訳してください。")
    metor[3]-=2
    metor[5]=parseInt(metor[5])+2
    let eisakuid=Math.floor(Math.random()*eisaku1j.length)
    answer = window.prompt(eisaku1j[eisakuid], "");
    if(eisaku1e[eisakuid]==answer){
        good.play()
        alert("正解！")
        nowehp-=wp[wid]+Math.floor(Math.random()*lv)*(mlv+1)
    }else{
        bad.play()
        alert("不正解！正解は"+eisaku1e[eisakunid])
        let damage = enemyap[nowenemy]+Math.floor(Math.random()*lv)-ap[aid]
        metor[1]-=damage
        alert(myname+"に"+damage+"ダメージ")
    }
    if(nowehp<=0){
        alert(enemylist[nowenemy]+"を倒した！")
        money=parseInt(money)+enemyhp[nowenemy]+enemyap[nowenemy]
        metor[4]=parseInt(metor[4])+parseInt(enemyhp[nowenemy])
        alert("経験値"+enemyhp[nowenemy]+"　お金"+(enemyhp[nowenemy]+enemyap[nowenemy])+"Pを獲得！")
        explevel()
        nowfight=false
        saveparam()
        document.getElementById("enemy").style.display="none"
    }
    if(metor[1]<=0){
        alert(myname+"はたおれた！")
        money=0
        alert("一文無しになってしまった！")
        metor[1]=metor[0]
        metor[3]=metor[2]
        saveparam()
        document.getElementById("enemy").style.display="none"
    }
    redraw()
}
function explevel(){///経験値・レベルアップ処理
    for(let i=lv;i<=100;i++){
        if(metor[4] >= Math.floor(10*Math.pow(1.1,lv))){
            metor[4]-= Math.floor(10*Math.pow(1.1,lv))
            lv=parseInt(lv)+1
            lvup.play()
            alert("レベルが１上がった！")
            metor[0]=parseInt(metor[0])+4
            metor[1]=parseInt(metor[1])+4
            metor[2]=parseInt(metor[2])+2
            metor[3]=parseInt(metor[3])+2
        }else{
            next=(Math.floor(10*Math.pow(1.1,lv))-metor[4])
            break;
        }
    }
    for(let i=mlv;i<=10;i++){
        if(metor[5] >= Math.floor(5*Math.pow(1.1,mlv))){
            metor[5]-= Math.floor(5*Math.pow(1.1,mlv))
            mlv=parseInt(mlv)+1
            lvup.play()
            alert("魔法レベルが１上がった！")
        }else{
            break;
        }
    }
    saveparam()
}
function saveparam(){///パラメータ保存処理
    localStorage.setItem("job", job);
    localStorage.setItem("lv", lv);
    localStorage.setItem("metor", metor);
    localStorage.setItem("magiclevel", mlv);
    localStorage.setItem("weaponid", wid);
    localStorage.setItem("armorid", aid);
    localStorage.setItem("money", money);
    localStorage.setItem("nowplace", nowplace);
}
function forward(){
    if(nowfight){
        alert("現在戦闘中です。逃げるかもしくは戦ってください。")
    }
    if(nowplace>=2){
        alert("ここから先は行き止まりのようだ。")
        return;
    }
    nowplace=parseInt(nowplace)+1
    alert("次のステージ　"+place[nowplace]+"に移動しました")
    redraw();
    saveparam();
}
function back(){
    if(nowfight){
        alert("現在戦闘中です。逃げるかもしくは戦ってください。")
    }
    if(nowplace<=0){
        alert("ここから先は行き止まりのようだ。")
        return;
    }
    nowplace-=1
    alert("一つ前のステージ　"+place[nowplace]+"に移動しました")
    redraw();
    saveparam();
}
function hotel(){
    let yn = window.confirm(lv+'Pを消費して宿で回復します');
    if(yn){
        if(money<lv){
            alert("お金が足りません！")
            return
        }
        money-=lv
        metor[1]=metor[0]
        metor[3]=metor[2]
        alert("HP・MPを全回復した！")
    }else{
        alert("キャンセルしました")
    }
}
function buki(){
    if(nowplace==0){
        let bukiid = window.prompt("購入する武器を番号で選択してください\n1.岩石の剣 10P\n2.マジカルな剣 20P")
        if(bukiid="1"){
            if(money<10){
                alert("お金が足りません！")
                return
            }
            money-=10
            wid=1
            alert("武器を購入しました")
        }else if(bukiid="2"){
            if(money<20){
                alert("お金が足りません！")
                return
            }
            money-=20
            wid=2
            alert("武器を購入しました")
        }else{
            alert("武器を購入できませんでした")
        }
    }
}