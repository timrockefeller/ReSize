/*
global Vue
*/

var ctrl = new Vue({
    el:"#tskctrl",
    data:{
        isSeen:true,
        isAdvance:false,
        num:0,
        donenum:0,
        dots:[],
        curs:0
    },
    method:{
        init:function(TaskData){/*
        TaskData={
            
        }
        */
            
        },
        doneNext:function(){
            if(this.num<this.donenum){
                this.num++;
            }
        },
        isDone:function(cur){
            return cur<=this.curs;
        }
        
    }
    
});

//_.debounce()