//通过类名获取元素的兼容问题
function getClass(selector,father){
father=father||document;
  if(father.getElementsByClassName){
     return father.getElementsByClassName(selector);
  }else{
     var all=father.getElementsByTagName("*");
       var newarr=[];
     for(var i=0;i<all.length;i++){//遍历数组
           if(check(all[i].className,selector)){
              newarr.push(all[i]);
           }
     }return newarr;
  }
}

function check(str,val){
        var arr=str.split(" ");
  for(var i in arr){//将字符串按指定的分隔符分开
        if(arr[i]==val){
           return true;
        }
  }return false;
}

/**************************************************************************************************/
//2.获取样式的兼容函数
/*
getStyle();
ele:为要操作document对象
attr:要获取的属性值
*/
function getStyle(ele,attr){
  if(ele.currentStyle){
       return ele.currentStyle[attr];
  }else{
     return getComputedStyle(ele,null)[attr];
  }
}



//3.获取元素的函数
//正则:(/^[a-z1-6]{1,10}/.test(selector))
//        /^[a-zA-Z][a-zA-Z1-6]{1,10}$/.test(selector)
//去掉字符串前后的空格:(/^\s*|\s*$/g,"")
function $(selector,father){
  console.log(1)
  father=father||document;
    if(typeof selector=="string"){
      selector=selector.replace(/^\s*|\s*$/g,"")
       if(selector.charAt(0)=="."){
          return getClass(selector.slice(1),father);
       }else if(selector.charAt(0)=="#"){
          return father.getElementById(selector.slice(1))
       }else if(/^[a-z1-6]{1,10}/.test(selector)){
          return father.getElementsByTagName(selector)
       }
    }
 else if(typeof selector=="function"){
       addEvent(window,"load",callback);
       delEvent(window,"load",callback);
       /*window.onload=function(){
         selector();
       }*/
    }
 }
//window.onload函数
function addEvent(obj,event,callback){
  if(obj.addEventListener){
       obj.addEventListener(event,callback,false)
  }else{
     obj.attachEvent('on'+event,callback)
  }
}
//注销事件
function delEvent(obj,event,callback){
  if(obj.removeEventListener){
       obj.removeEventListener(event,callback)
  }else{
     obj.detachEvent("on"+load,callback)
  }
}

//4.获取子节点的兼容函数
//元素子节点  nodeType==1;
//元素+文本节点
function getChilds(father,type){
type=type || "a";
var all=father.childNodes;
var arr=[];
  for (var i = 0; i < all.length; i++) {
  if(type=="a"){
       if(all[i].nodeType==1){ 
          arr.push(all[i]);
       }
       }
       else if(type=="b"){
         if(all[i].nodeType==1 || all[i].nodeType==3 && all[i].nodeValue.replace(/^\s*|\s*$/g,"")!=""){
          arr.push(all[i]);
         }
       }
  }
  return arr;
}


//5.第一个子节点
function getFirst(father){
     return getChilds(father)[0];
}

//6.获取最后一个标签
function getLast(father){
     return getChilds(father)[getChilds(father).length-1]
}


//7.获取指定位置的子节点
function getNum(father,num){
     return getChilds(father)[num]
}

//8.获取下一个兄弟节点
//找到一个兄弟节点时，对它判断，如果是空文本或者是注释时，再接着向下找，如果找到的是元素节点时，停止寻找
//ele  表示元素
//while  表示不知道循环多少次
function getNext(ele){
  var next=ele.nextSibling;//先声明一个值
  if(next==null){//如果一开始为这种情况，<div><p></p></div>  ,一开始就为null，那就停止循环，返回false
      return false;
  }
  while(next.nodeType==3 || next.nodeType==8){//判断条件，下一个兄弟节点为空文本或是注释
        next=next.nextSibling;//如果满足条件，那就在基础上继续找,所以用next.nextSibling
        if(next==null){//如果只有一个节点，那下一个就为null，那就停止循环，返回false
           return false;
        }
  }return next;//判断完条件后，如果不符合条件，那就返回给next
}

//9.获取上一个兄弟
function getPer(ele){
  var per=ele.previousSibling;//先声明一个值
  if(per==null){//如果一开始为这种情况，<div><p></p></div>  ,一开始就为null，那就停止循环，返回false
      return false;
  }
  while(previous.nodeType==3 || previous.nodeType==8){//判断条件，下一个兄弟节点为空文本或是注释
        previous=previous.previousSibling;//如果满足条件，那就在基础上继续找,所以用previous.previousSibling
        if(previous==null){//如果只有一个节点，那下一个就为null，那就停止循环，返回false
           return false;
        }
  }return previous;//判断完条件后，如果不符合条件，那就返回给next
}


//10.要在某个对象插入
function insertAfter(father,newNode,node){
  var next=getNext(node);
  if(next){
     father.insertBefore(newNode,next)
  }else{
     father.appendChild(newNode)
  }
}



























