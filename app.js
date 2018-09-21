
var taskCounter=1;
var classList=[];
var rear="";
var onload=function(){
}
/*add Task */
var addTask=function(){
    var taskName=document.getElementById("taskName").value;
    if(taskName=="" || taskName==null){
        alert("taskName cannot empty");
        return;
    }
        drawHtml(taskName,function(){taskCounter++;});
}

/*draw the task*/
var drawHtml=function(taskName,callback){
     idTask="task"+taskCounter;
    /*outermostdiv*/
    var outerDiv=document.createElement("div");
    outerDiv.setAttribute("id",idTask);
    outerDiv.classList.add("row", "boxborder","comp_row","box");
    /*innerDiv*/
    var innerDiv=document.createElement("div");
    innerDiv.setAttribute("id",idTask+"_row");
    innerDiv.classList.add("col");
    innerDiv.innerText=taskName;
    /*checkbox*/ 
    var checkBox = document.createElement("INPUT");
    checkBox.setAttribute("type", "checkbox");
    checkBox.setAttribute("id",idTask+"_checkbox");
    checkBox.classList.add("col");
    checkBox.onclick=statusChange;
    /*buttonChangePrevious*/
    var buttonChangePrevious = document.createElement("INPUT");
    buttonChangePrevious.setAttribute("type", "button");
    buttonChangePrevious.setAttribute("id",idTask+"_buttonPrevious");
    buttonChangePrevious.setAttribute("value", "Previous");
    if(lengthOfTask()==0)
    {
        buttonChangePrevious.classList.add("col","hideButtonPrevious","buttonbeauty");
    }
    else{
        buttonChangePrevious.classList.add("col","showButtonPrevious","buttonbeauty");
    }
    buttonChangePrevious.onclick=prevSwap;

    /*buttonChangeNext */
    var buttonChangeNext = document.createElement("INPUT");
    buttonChangeNext.setAttribute("type", "button");
    buttonChangeNext.setAttribute("id",idTask+"_buttonNext");
    buttonChangeNext.setAttribute("value", "Next");
    buttonChangeNext.onclick=nextSwap;
    buttonChangeNext.classList.add("col","hideButtonNext","buttonbeauty");
    var t=document.getElementsByClassName("comp_row");
    if(t.length>0)
    {
        rear=t[t.length-1].id;
        if(rear.indexOf("task")>-1)
            {
                (document.getElementById(rear+"_buttonNext")).classList.remove("hideButtonNext");
                (document.getElementById(rear+"_buttonNext")).classList.add("showButtonNext");
            }
    }   
    
     /*deleteRow */
    var deleteRow = document.createElement("INPUT");
    deleteRow.setAttribute("type", "button");
    deleteRow.setAttribute("id", idTask+"_delete");
    deleteRow.setAttribute("value", "delete");
    deleteRow.classList.add("col","buttonbeauty");
    deleteRow.onclick=deleteRowTask;
    /*append the all the element*/
    outerDiv.appendChild(innerDiv);
    outerDiv.appendChild(checkBox);
    outerDiv.appendChild(buttonChangeNext);
    outerDiv.appendChild(buttonChangePrevious);
    outerDiv.appendChild(deleteRow);
    document.getElementById("TaskList").appendChild(outerDiv);
    
    if(callback)
    {
        callback();
    }
}

var deleteTask=function(){
    var elem = document.getElementsByClassName("text_line");
    while(elem.length>0){
        document.getElementById(elem[0].id).closest(".comp_row").remove();
}
changeButton();
}
var sortTask=function(){
    addClass();
     var doneT=document.getElementsByClassName("text_line");
     var doneTask=[];
     var i=0;
     for(i=0;i<doneT.length;i++)
    doneTask[i]=doneT[i].parentNode;
    var parentNode=document.getElementById("TaskList");
   for(i=0;i<doneTask.length;i++)
   {
    parentNode.appendChild(doneTask[i]);

   }
changeButton();
}
document.getElementById("addTaskToList").onclick=addTask;
document.getElementById("deleteTask").onclick=deleteTask;
document.getElementById("sortTask").onclick=sortTask;


var statusChange=function(){
    if (this.checked) 
    {
        document.getElementById((this.id.split("_"))[0]+"_row").classList.add("text_line");
    }
    else
    {
        document.getElementById((this.id.split("_"))[0]+"_row").classList.remove("text_line");
   
    }
}
var prevSwap=function(){
    addClass();
    var nextElem = this.closest(".comp_row").previousSibling;
    var parentNode=document.getElementById("TaskList");
    parentNode.insertBefore(this.parentNode,nextElem);
    changeButton();
}
var nextSwap=function(){
    addClass();
    var nextElem = this.closest(".comp_row").nextSibling;
    var parentNode=document.getElementById("TaskList");
    parentNode.insertBefore(nextElem,this.parentNode);
    changeButton();

}
var deleteRowTask=function(){
    this.closest(".comp_row").remove();
    changeButton();
}
var lengthOfTask=function(){return(document.getElementsByClassName("comp_row").length);}
var changeButton=function(){
    var elem = document.getElementsByClassName("comp_row");
    if(elem.length>0)
    {
        var show=document.getElementById(elem[0].id).querySelector(".showButtonPrevious");
        if(show!=null)
            {
                //add the class hideButtonPervious in prvious button
                show.classList.add("hideButtonPrevious");
                show.classList.remove("showButtonPrevious");
            }
        show=document.getElementById(elem[elem.length-1].id).querySelector(".showButtonNext");
        if(show!=null) 
            {
                //add the class hideButtonNext in next button
                show.classList.add("hideButtonNext");
                show.classList.remove("showButtonNext");
            } 
   }
}

var addClass=function(){
    var elem = document.getElementsByClassName("comp_row");
    if(elem.length>0)
    {
        var show=document.getElementById(elem[0].id).querySelector(".hideButtonPrevious");
        if(show!=null)
            {
                //add the class hideButtonPervious in prvious button
                show.classList.remove("hideButtonPrevious");
                show.classList.add("showButtonPrevious");
            }
            show=document.getElementById(elem[elem.length-1].id).querySelector(".hideButtonNext");
        if(show!=null) 
            {
                //add the class hideButtonNext in next button
                show.classList.remove("hideButtonNext");
                show.classList.add("showButtonNext");
            } 
   }
}
  
