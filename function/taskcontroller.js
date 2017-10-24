/*
global Vue
*/

var ctrl = new Vue({
    el:"#tskctrl",
    data:{
        _isSeen:false,
        set isSeen(val){
            if(!val){
                document.getElementById("tskctrl").classList.add("ctrlHide");
            }else{
                document.getElementById("tskctrl").classList.remove("ctrlHide");
            }
            console.info("seted");
            this._isSeen=val?true:false;
        },
        get isSeen(){
            return this._isSeen;
        },
        isAdvance:false,
        num:0,
        donenum:0,
        dots:[0],
        curs:0,

        color:"000000",
        CssHide:"spaceHide",
        tagDone:{
            backgrund:"#"+this.color
        },
        
        init:function(TaskData){/*
        TaskData={
            TaskId: string,
	        num: int,
	        everyvalue: int,
	        donenum: int,
	        color: string
        }
        */
            this.num = TaskData.num;
            this.donenum = TaskData.donenum;
            this.color = TaskData.color;
            this.dots = [0];
            for(var i =1 ;i<=this.num;i++){
                this.dots[i]=i;
            }
        },
    },
    method:{
        doneNext:function(){
            if(this.num<this.donenum){
                this.num++;
            }
        },
        isDone:function(cur){
            return cur<=this.num;
        }
        
    }
    
});

//_.debounce()