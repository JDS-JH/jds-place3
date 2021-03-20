var excel=document.getElementById('printHtml2');
     excel.onclick=function(){

        var exportFileContent = document.getElementById("tab").outerHTML;

        var blob = new Blob([exportFileContent], {type: "text/plain;charset=utf-8"});         //解决中文乱码问题
        blob =  new Blob([String.fromCharCode(0xFEFF), blob], {type: blob.type});
        //设置链接
        var link = window.URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.download = "无课表.xls";  //设置被下载的超链接目标（文件名）
        a.href = link;                            //设置a标签的链接
        document.body.appendChild(a);            //a标签添加到页面
        a.click();                                //设置a标签触发单击事件
        document.body.removeChild(a);            //移除a标签
    };