/*
global Vue
*/

var ctrl = new Vue({
    el:"#tskctrl",
    data:{
        self:{},
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
        everyvalue:0,
        dots:[0],
        curs:0,

        color:"000000",
        CssHide:"spaceHide",
        get StagDone(){
            var s="rgb("+parseInt(this.color[0]+this.color[1],16)+","+parseInt(this.color[2]+this.color[3],16)+","+parseInt(this.color[4]+this.color[5],16)+")";
            return {
                "backgroundColor":s
            };
        },
        get StagDoneA(){
            var s="rgba("+parseInt(this.color[0]+this.color[1],16)+","+parseInt(this.color[2]+this.color[3],16)+","+parseInt(this.color[4]+this.color[5],16)+",.25)";
            return {
                "background":s
            };
        },
        get Spersent(){
            return {
                "width":(100*this.donenum/this.num)+"%"
            };
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
            this.self = TaskData;
            this.num = this.self.num;
            this.donenum = this.self.donenum;
            this.everyvalue = this.self.everyvalue;
            this.color = this.self.color||"000000";
            this.dots = [0];
            for (var i = 1; i <= this.num; i++) {
                this.dots[i] = i;
            }
        },
    },
    methods:{
        doneNext:function(){
            if(this.donenum<this.num){
                this.donenum++;
                this.self.donenum++;
            }
        }
        
    }
    
});

//_.debounce()