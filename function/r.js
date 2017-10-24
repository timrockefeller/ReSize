var REMS = {/*
    Data:[],
    ShowList:function(info){
        var cont = document.createElement("section");
        var title = document.createElement("span");
        title.innerHTML="<h3>"+info.title+"</h3>";
        cont.appendChild(title);
        
        //creat persent
        
        for (var i=info.Data.length-1;i>=0;i--){
            
        }
        document.getElementById("lists").appendChild(cont);
    },*/
    TableTheLists : function(){
    	for (var i in OfflineStorage.Lists){
    		console.info(i + " : "+ OfflineStorage.Lists[i].title);
    	}
    },
	questHandle : function(text,callback){
		
		var mask = document.createElement("div");
		mask.setAttribute("class","questMask");
		mask.setAttribute("id","quest");
		
		var cancle = (function(){
			mask.classList.remove("questAcvated");
			setTimeout(function(){
				try{
				document.getElementById("quest").remove();
				}catch(e){}
			},500);
		});
		
		mask.addEventListener("click",cancle);
		var ctn = document.createElement("div");
		ctn.setAttribute("class","questctr");
		ctn.innerHTML="<p class='questTEXT'>"+text+"</p>";
		var confirmBtn = document.createElement("div");
		confirmBtn.setAttribute("class","questButton");
		confirmBtn.innerHTML = "Confirm";
		
		confirmBtn.addEventListener("click",function(){
			setTimeout(callback,500);
			cancle();
		});
		var cancleBtn = document.createElement("div");
		
		cancleBtn.setAttribute("class","questButton");
		
		cancleBtn.innerHTML="Cancle";
		
		cancleBtn.addEventListener("click",cancle);
		
		ctn.appendChild(confirmBtn);
		ctn.appendChild(cancleBtn);
		mask.appendChild(ctn);
		document.body.appendChild(mask);
		//startanimation
		setTimeout(function() {
			mask.classList.add("questAcvated");
		}, 10);
	}
};


var OfflineStorage={
	Lists:[],
	OpenId:""
};

var Network = {
	OnSyncLists : function(data){//data:[{List},]
		//var setListAfter = "";
		for(var i in data){
			if(OfflineStorage.Lists[data[i].ListId]){
				
			}else{
				OfflineStorage.Lists[data[i].ListId]=new List(data[i]);
				OfflineStorage.Lists[data[i].ListId].CallShowList();
			}
		}
		document.getElementById("creatList").classList.remove("hidden-width");
	},
	/*global $*/
	getLists : function(){
		$.ajax({
			type:"get",
			url:"async/getLists.php",
			success:function(DATA){
				//Network.OnSyncLists(eval("("+DATA+")"));
				Network.OnSyncLists(JSON.parse(DATA));
			}
		});
	},
	getListDetail : function(ListId){
		//OfflineStorage.OpenId=ListId;
		$.ajax({
			type:"get",
			url:"async/getListDetail.php",
			data:{ListId:ListId},
			success:function(is){//Here for detail page
				//however the data is no use..
				if(is){
					document.getElementById("detailpage").classList.remove("dethide");
					document.getElementById("dettitle").innerHTML = OfflineStorage.Lists[OfflineStorage.OpenId].title;
					document.getElementById("tasks").innerHTML='';
					for (var m in OfflineStorage.Lists[OfflineStorage.OpenId].Tasks){
						//OfflineStorage.Lists[OfflineStorage.OpenId].Tasks[m].createTaskElement();
						OfflineStorage.Lists[OfflineStorage.OpenId].Tasks[m].onShowElement();
						
					}
				}
			}
		});
	},
	updateList : function(ListData){
		$.ajax({
			type:"post",
			url:"async/updateList.php",
			data:{
				"ListId":ListData.ListId || "",
				"title":ListData.title || "",
				"Tasks":JSON.stringify(ListData.Tasks) || "[]"
			},
			success:Network.OnUpdateSuccess
		});
	},
	deleteList : function(ListId){
		$.ajax({
			type:"get",
			url:"async/deleteList.php",
			data:{ListId:ListId},
		});
	},
	OnUpdateSuccess : function(){
		Network.getLists();
	}
};



var List = function(ListData){/*
NEED .Tasks[] !important
ListData{
	ListId: string,
	title: string,
	persect: double<[0,100)>,
	totalvalue: int,
	Tasks: Task[],
}
*/
    this.ListId = ListData.ListId;												//
	this.title = ListData.title;												//
	if ( ListData.totalvalue ) {
	    this.totalvalue = ListData.totalvalue;									//
	    this.persent = ListData.persent;										//
	    this.Tasks = ListData.Tasks.concat();
	} else {
		var TaskData = (typeof ListData.Tasks=="string")?JSON.parse(ListData.Tasks):ListData.Tasks;
	    if ( typeof TaskData == "object" && TaskData.length!=0 ) {
	        var maxnum=0, donenum=0, TaskContainer = [];
	        for (var i in TaskData){
	        	TaskContainer[i]= new Task(TaskData[i]);
	            maxnum += TaskContainer[i].everyvalue * TaskContainer[i].num;
	            donenum += TaskContainer[i].everyvalue * TaskContainer[i].donenum;
	        }
	        this.totalvalue = maxnum;											//
	        this.persent = donenum / maxnum * 100 || 0;							//
	        this.Tasks = TaskContainer.concat();								//
	    }else {
	        this.totalvalue = 0;												//-
	        this.persent = 0;													//-
	        this.Tasks = [];													//-
	    }
	}
	//functions
	this.getElement = function(){
	    return document.getElementById("List"+this.ListId);
	};
	this.CallShowList= function(parent){
	    if(typeof parent =="object" && parent.appendChild){
	    	parent.appendChild(this.creatListElement());
	    } else {
	    	document.getElementById("lists").appendChild(this.creatListElement());
	    }
	    var that =this;
	    setTimeout(function() {that.getElement().classList.remove("hidden-both");}, 1);
	};
	this.creatListElement = function(){
		var extranum = "";
		while (document.getElementById('List'+this.ListId+extranum)){
			extranum+="-0";
		}
		this.ListId+=extranum;
		var innerHTMLString = (
		"<div id='List" + this.ListId + "' class='hidden-both list-container'>\
		<div class='list-info'><div class='list-persent'><h3>" + (this.persent<10?"0":"") + this.persent.toFixed(2) + "%</h3></div>\
		<div class='list-title'><h3>" + this.title + "</h3></div></div>\
		<div class='list-path'>\
		<div class='list-pathon' style='width:" + this.persent + "%'></div>\
		</div>\
		</div>");
		var lstctnr = document.createElement("section");
		lstctnr.setAttribute('class','lstctnr');
		lstctnr.innerHTML = innerHTMLString;
		var that = this;
		lstctnr.addEventListener("click",function(){
			if(!OfflineStorage.OpenId){	
				Network.getListDetail(that.ListId);
				OfflineStorage.OpenId = that.ListId;
			}
		});
		return lstctnr;
	};
	this.delete = function(){
		this.getElement().classList.add("hidden-both");
		var that = this;
		setTimeout(function(){
			Network.deleteList(that.ListId);
			delete OfflineStorage.Lists[that.ListId];
			try{delete that.self;}catch(er){}
		},1000);
	};
	this.self=this;
};
var Task = function(TaskData){/*
TaskData{
	TaskId: string,
	num: int,
	everyvalue: int,
	donenum: int,
	color: string
}*/
	this.TaskId = TaskData.TaskId;
	this.num = TaskData.num;
	this.donenum = TaskData.donenum;
	this.everyvalue = TaskData.everyvalue;
	this.color = TaskData.color||"000000";//styles
	//In Detail Page
	
	
	this.onShowElement = function(){
		document.getElementById("tasks").appendChild(this.createTaskElement());
	};
	this.createTaskElement = function(){
		var innerHTMLString = "\
		<div id = 'Task"+this.TaskId+"' class='task-container'>\
			<div class='task-value'>"+(this.donenum*this.everyvalue)+" / "+(this.num*this.everyvalue)+"</div>\
			<div class='task-path' style='background:#"+this.color+"40'>\
		    	<div class='task-pathon' style='width:"+(this.donenum/this.num*100)+"%;background:#"+this.color+"ff'></div>\
			</div>\
		</div>";
		var tskctnr = document.createElement('section');
		tskctnr.setAttribute('class','tskctnr');
		tskctnr.innerHTML = innerHTMLString;
		tskctnr.addEventListener("click",function(){
			//add controller
			//!!! Vue.js added
		});
		return tskctnr;
	};
};