var id=document.getElementById('id');
var name2=document.getElementById('name');
var tabId=document.getElementById('tab');
var button2=document.getElementById('button2');
var th=document.getElementsByTagName('th');
var tabId=document.getElementById('tab');
var button3=document.getElementById('button3');
var myId=0;
var mk;
function change(a) {
    console.log(a);
    var b=[0];
    for (let i = 0; i < a.length; i++) {
        if(a[i]+1 != a[i+1]){
            console.log(a[i]);
            b[b.length]=i;
            if(i+1!=a.length){
                b[b.length]=i+1;
            }
        }
    }
    /*console.log(b);*/
    if(a[b[0]]==undefined&&a[b[1]]==undefined)
    {
        return a[b[2]]+'-'+a[b[3]];
    }
    else if(a[b[2]]==undefined&&a[b[3]]==undefined){
        return a[b[0]]+'-'+a[b[1]];
    }
    else {
        return a[b[0]] + '-' + a[b[1]] + '||' + a[b[2]] + '-' + a[b[3]];
    }
}
function getArrEqual(arr1, arr2) {
    let newArr = [];
    for (let i = 0; i < arr2.length; i++) {
        for (let j = 0; j < arr1.length; j++) {
            if(arr1[j] === arr2[i]){
                newArr.push(arr1[j]);
            }
        }
    }
    return newArr;
}

document.getElementById('button').onclick=function () {  //点击查询

        /* console.log(myid);*/
    var num = id.value;
    for(var i=1;i<=11;i=i+2){
        for(var j=1;j<=7;j++) {
            tabId.rows[i].cells[j].style = 'none';
            tabId.rows[i].cells[j].innerHTML = '';

        }
    }

    request({
        url: ',' + num
    }).then(res => {
        console.log(res);
        for (var i = 0; i <= res.data.length; i++) {
            myId++;
            var m =Number(res.data[i].XQJ) ;//根据接口中星期几和开课时间确定该课程所在表格的位置
            var n = res.data[i].KSSJ;
            tabId.rows[n].cells[m].id=num+myId;
            var q = Number(res.data[i].QSZ);//起始周
            var j = Number(res.data[i].JSZ);//结束周
            var dsz=res.data[i].DSZ;//是否存在单双周
            var kcmc=res.data[i].KCMC;//课程名称
            var dsz3;
            if(dsz !=null){
                if(dsz=="双"){
                    var dsz2="("+'单周无课'+')';
                    dsz3=dsz2;
                }
                else{
                    var dsz2="("+'双周无课'+')';
                    dsz3=dsz2;
                }

            }else {
                dsz3='';
            }
            var arr = [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17];//定义数组2-17，并用slice函数进行分割（根据接口中的起始周和结束周）
            var a = arr.slice(0, q - 2);
            var b = arr.slice(j - 1,16);
            var ab=(a.concat(b));
            var arr2=[];
            for(var z in ab){
                arr2.push(ab[z]);//压入新的入组形成无课的周数
            }
            var sj=arr2;
            var name = document.getElementById('name').value;//将输入的名字进行一个在课表中的展示
            var myname = name;

            if(sj.length==0){//如果分割的数据为空，说明2-17都有课，则创建一个为满课的标签插入table
                var p = document.createElement("p");
                p.setAttribute("id", 'mk');
                tabId.rows[n].cells[m].appendChild(p);
                p.innerText=myname + '（满课）';
            }else{//否则创建新的标签压入table表单中
                var span = document.createElement("span");
                span.setAttribute("id", num+'-'+'i');
                tabId.rows[n].cells[m].appendChild(span);
                var div = document.createElement("div");
                div.setAttribute("id", num+'-'+'data');
                span.appendChild(div);
                var div3=document.createElement("div");
                div3.setAttribute("id", num+'-'+'k');
                tabId.rows[n].cells[m].appendChild(div3);
//切割的数据一共分为三种情况
                if(a[0]==undefined&&a[a.length-1]==undefined)//情况一（例：2-14的课，无课则为15,16，其中a[0]和a[a.length]就为undefined,b为15,16）
                {
                        var obj=document.getElementById(num+myId);
                        var obj2=obj.getElementsByTagName("span");
                        div3.innerText=sj;
                        div3.style.display='none'
                        if (obj2.length >= 2) {
                            var bb=myname+/*kcmc+*/dsz3;
                            div.innerText=bb+b[0]+'--'+b[b.length-1];

                            for(var item=0;item<2;item++) {
                                obj2[item].style.display='none'
                            }
                            var obj3=document.getElementById(num+myId);
                            var obj4=obj3.getElementsByTagName("div");

                            var span4 = document.createElement("span");
                            span4.setAttribute("id", num+'-'+'hx');
                            span4.innerText=myname;
                            tabId.rows[n].cells[m].appendChild(span4);
                            /*console.log(obj4);*/
                            var arrall=[];
                            for(var item1=0;item1<4;item1++) {
                                if(obj4[item1].id==num+'-'+'k'){
                                    obj4[item1].id=num+'jds';
                                    var arra=[];
                                    for (var o in obj4[item1].firstChild) {
                                        arra.push(obj4[item1].firstChild[o]);
                                    }
                                    if(arrall.length==0){
                                        arrall=arra[3];
                                    }
                                    else {
                                        var arra2=arra[3]+'--'+arrall;
                                        console.log(arra[3]);
                                        var stringResult1 = arrall.split(',');
                                        var stringResult2 = arra[3].split(',');
                                        console.log(stringResult1);
                                        console.log(stringResult2);
                                        var newarr=getArrEqual(stringResult1,stringResult2);
                                        console.log(newarr);

                                    }
                                    console.log(arra2);
                                    obj4[item1].style.display='none';
                                    var div2=document.createElement("div");
                                    div2.setAttribute("id", num+'-'+'j');
                                    tabId.rows[n].cells[m].appendChild(div2);
                                    if(newarr.length==0) {
                                        span4.innerText=myname
                                    }
                                        else{
                                        var oo=change(newarr.map(Number));
                                            div2.innerText=oo;
                                        }

                                }
                                newarr='';
                                arra2='';
                            }
                            div3.innerText=sj;
                        }
                        else {
                            var bb=myname+/*kcmc+*/dsz3;
                            div.innerText=bb+b[0]+'--'+b[b.length-1];
                        }
                }
                else if(b[0]==undefined&&b[b.length-1]==undefined){//情况二(列如该学生是10-17周的课，无课则为2-9，则会出现为a为2,9,b[0]和b[b.length]就为undefined)

                        var obj=document.getElementById(num+myId);
                        var obj2=obj.getElementsByTagName("span");
                        div3.innerText=sj;
                    div3.style.display='none'
                        if (obj2.length >= 2) {
                            var bbb=myname+/*kcmc+*/dsz3;
                            div.innerText=bbb+a[0]+'--'+a[a.length-1]
                            for(var item=0;item<2;item++) {
                                obj2[item].style.display='none'
                            }
                            var obj3=document.getElementById(num+myId);
                            var obj4=obj3.getElementsByTagName("div");
                            var span4 = document.createElement("span");
                            span4.setAttribute("id", num+'-'+'hx');
                            span4.innerText=myname;
                            tabId.rows[n].cells[m].appendChild(span4);
                            /*console.log(obj4);*/
                            var arrall=[];
                            for(var item1=0;item1<4;item1++) {
                                if(obj4[item1].id==num+'-'+'k'){
                                    obj4[item1].id=num+'jds';
                                    var arra=[];
                                    for (var o in obj4[item1].firstChild) {
                                        arra.push(obj4[item1].firstChild[o]);
                                    }
                                    if(arrall.length==0){
                                        arrall=arra[3];
                                    }
                                    else {
                                        var arra2=arra[3]+'--'+arrall;
                                        console.log(arra[3]);
                                        var stringResult1 = arrall.split(',');
                                        var stringResult2 = arra[3].split(',');
                                        console.log(stringResult1);
                                        console.log(stringResult2);
                                        var newarr=getArrEqual(stringResult1,stringResult2);
                                        console.log(newarr)
                                        var newarr=getArrEqual(stringResult1,stringResult2);
                                        console.log(newarr.map(Number));
                                    }
                                    console.log(arra2);
                                    obj4[item1].style.display='none';
                                    var div2=document.createElement("div");
                                    div2.setAttribute("id", num+'-'+'j');
                                    tabId.rows[n].cells[m].appendChild(div2);





                                    if(newarr.length==0) {
                                        span4.innerText=myname
                                    }
                                    else{
                                        var oo=change(newarr.map(Number));
                                        div2.innerText=oo;
                                    }
                                }
                                newarr='';
                                arra2='';
                            }
                            div3.innerText=sj;
                        }
                        else {
                            var bbb=myname+/*kcmc+*/dsz3;
                            div.innerText=bbb+a[0]+'--'+a[a.length-1]
                        }
                }
                else{//情况三（列：该学生是2-4和16-17的课，则显示为5-15）
                    var obj=document.getElementById(num+myId);
                    var obj2=obj.getElementsByTagName("span");
                    div3.innerText=sj;
                    div3.style.display='none'
                        if (obj2.length >= 2) {
                            var bbbbb = myname + /*kcmc+*/dsz3;
                            div.innerText = bbbbb + a[0] + '--' + a[a.length - 1] + ' || ' + b[0] + '--' + b[b.length - 1];
                            for(var item=0;item<2;item++) {
                                obj2[item].style.display='none'
                            }
                            var obj3=document.getElementById(num+myId);
                            var obj4=obj3.getElementsByTagName("div");
                            console.log(obj4);
                            var arrall=[];
                            var span4 = document.createElement("span");
                            span4.setAttribute("id", num+'-'+'hx');
                            span4.innerText=myname;
                            tabId.rows[n].cells[m].appendChild(span4);
                            for(var item1=0;item1<4;item1++) {
                                if(obj4[item1].id==num+'-'+'k'){
                                    obj4[item1].id=num+'jds';
                                    var arra=[];
                                    for (var o in obj4[item1].firstChild) {
                                        arra.push(obj4[item1].firstChild[o]);
                                    }
                                    if(arrall.length==0){
                                        arrall=arra[3];
                                    }
                                    else {
                                        var arra2=arra[3]+'--'+arrall;
                                        var stringResult1 = arrall.split(',');
                                        var stringResult2 = arra[3].split(',');
                                        var newarr=getArrEqual(stringResult1,stringResult2);
                                        console.log(newarr.map(Number));
                                    }
                                    obj4[item1].style.display='none';
                                    var h5=document.createElement("h5");
                                    h5.setAttribute("id", num+'-'+'j');
                                    tabId.rows[n].cells[m].appendChild(h5);
                                    if(newarr.length==0) {
                                        span4.innerText=myname
                                    }
                                    else{
                                        console.log(newarr);
                                        var oo=change(newarr.map(Number));
                                        h5.innerText=oo;
                                    }
                                }
                                newarr='';
                                arra2='';
                            }
                        }
                        else {
                            var bbbbbb = myname + /*kcmc+*/dsz3;
                            div.innerText = bbbbbb + a[0] + '--' + a[a.length - 1] + ' || ' + b[0] + '--' + b[b.length - 1];
                        }
                }
            }
            var color = ['palegreen', 'lightpink', 'lightskyblue', 'sandybrown'];
            tabId.rows[n].cells[m].style.backgroundColor = (color[Math.floor(Math.random() * color.length)])
        }
    })

};

button2.onclick=function () {
    id.value='';
    name2.value='';
    for(var i=1;i<=11;i=i+2){
        for(var j=1;j<=7;j++) {
            tabId.rows[i].cells[j].style = 'none';
            tabId.rows[i].cells[j].innerHTML = ''
        }
    }

};


