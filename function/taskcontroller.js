/*
global Vue
*/

var ctrl = new Vue({
    el:"#tskctrl",
    data:{
        isSeen:false,
        isAdvance:false,
        num:0,
        donenum:0
    },
    method:{
        doneNext:function(){
            if(this.num<this.donenum){
                this.num++;
            }
        },
        
    }
    
});

//_.debounce()