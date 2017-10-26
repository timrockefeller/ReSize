/*
global Vue $
*/

var ctrl = new Vue({
    el:"#tskctrl",
    data:{
        self:{},
        _isSeen:false,
        set isSeen(val){
            if(!val){
                try{
                    document.getElementById("tskctrl").classList.add("ctrlHide");
                    setTimeout(function(){document.getElementById("tskctrl").style.display="none";},500);
                }catch(e){}
            }else{
                try{
                    document.getElementById("tskctrl").style.display="block";
                    setTimeout(function(){document.getElementById("tskctrl").classList.remove("ctrlHide");},2);
                    
                }catch(e){}
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
        Sexit:{
            right: "18px",
            backgroundImage: "url(include/imgs/back.png)",//file list Warning
        },
        get Spersent(){
            return {
                "width":(100*this.donenum/this.num)+"%"
            };
        },
        num__:0,
        donenum__:0,
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
            this.num__ = this.num;
            this.donenum__ = this.donenum;
            this.everyvalue = this.self.everyvalue;
            this.color = this.self.color||"000000";
            this.dots = [0];
            for (var i = 1; i <= this.num; i++) {
                this.dots[i] = i;
            }
            //var that=this;
            //$("#donenumInput").val(that.donenum);
            //$("#numInput").val(that.num);
            this.isSeen=true;
            this.isAdvance=false;
            return this;
        },
    },
    methods:{
        doneNext:function(){
            if(this.donenum<this.num){
                this.donenum++;
                this.donenum__++;
                this.self.donenum++;
            }
            var that=this;
            $("#donenumInput").val(that.donenum);
        },
        /*onSyncNum:function(){
            this.donenum__ = $("#donenumInput").val() || this.donenum__;
            var that=this;
            $("#numInput").val(that.num__);
        },
        onSyncDonenum:function(){
             this.num__ = $("#numInput").val() || this.num__;
             var that=this;
             $("#donenumInput").val(that.donenum__);
        },*/
        submitNum:function(){
            var that=this;
            this.donenum__ = $("#donenumInput").val() || this.donenum__;
            this.num__ = $("#numInput").val() || this.num__;

            if(this.donenum__ > this.num__){
                this.donenum__ = this.num__;
            }
            this.num=this.num__;
            this.self.num=this.num;
            this.dots = [0];
            for (var i = 1; i <= this.num; i++) {//advice: make Jiaoji+Bingji
                this.dots[i] = i;
            }
            this.donenum = this.donenum__;
            this.self.donenum=this.donenum;
            this.donenum--;//refresh vue
            this.donenum++;
        },
        exitPage:function(){
            this.isSeen=false;
            this.self.ctnr.childNodes[1].childNodes[3].childNodes[1].style.width=(100*this.donenum/this.num)+"%";
        }
        
    }
    
});

//_.debounce()
/*/for test begin
ctrl.init({TaskId:"asd",
	        num: 6,
	        everyvalue: 5,
	        donenum: 0,
	        color: "f656ea"}).isAdvance=true;
            
//for test end*/