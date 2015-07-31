
//淘宝统计
function TaoBaoTotal(startTime,endTime){
	this.timeArray = new Array();
	this.dataArray = new Array();
	this.startTime = startTime;
	this.endTime = endTime;
	this.date_startTime_time = startTime.ParseDate().getTime();
	this.date_end_time = endTime.ParseDate().getTime();
	//添加数据
	this.add = function(currTime,currName,currPrice,currAmount,currsku){
		//console.log("add "+currTime);
		var date_currTime = currTime.ParseDate();
		if(date_currTime == null ){
			//console.log("date_currTime == null");
			return false;//不用继续
		}
		var date_currTime_time = date_currTime.getTime();
		//小于开始时间，就不用继续了
		if(date_currTime_time < this.date_startTime_time){
			//console.log("date_currTime_time = "+date_currTime_time+",date_startTime_time = "+this.date_startTime_time);
			return false;//不用继续
		}
		//跳过大于结束的时间
		if(date_currTime_time > this.date_end_time){
			//console.log("date_currTime_time = "+date_currTime_time+",date_end_time = "+this.date_end_time);
			return true;//继续
		}
		var add = false;
		for(var i=0;i<this.timeArray.length;i++){
			var timeArray = this.timeArray[i];
			if(timeArray[0] == currTime){
				timeArray[1] = timeArray[1]+1;
				add = true;
				break;
			};
		}
		if(add==false){
			var i = this.timeArray.length;
			this.timeArray[i] = new Array();
			this.timeArray[i][0] = currTime;
			this.timeArray[i][1] = 1;
		}
		//排序
			
		add = false;
		for(var i=0;i<this.dataArray.length;i++){
			var dataArray = this.dataArray[i];
			//按照时间排序
			//console.log("currTime "+currTime+", dataArray[3] = "+dataArray[3]+","+(currTime < dataArray[3]));
			if( currTime < dataArray[0] ){
				var tempArray = new Array();
				tempArray[0] = currTime;
				tempArray[1] = currName;
				tempArray[2] = currPrice;
				tempArray[3] = currAmount;
				tempArray[4] = currsku;
				this.dataArray.splice(i, 0, tempArray);
				add = true;
				break;
			}
		}
		if(add==false){
			var i = this.dataArray.length;
			this.dataArray[i] = new Array();
			this.dataArray[i][0] = currTime;
			this.dataArray[i][1] = currName;
			this.dataArray[i][2] = currPrice;
			this.dataArray[i][3] = currAmount;
			this.dataArray[i][4] = currsku;
		}
		return true;//继续
	};
}
//获取控件左绝对位置
function getLeft(o) {
	var oLeft = o.offsetLeft;
	while (o.offsetParent != null) {
		oParent = o.offsetParent;
		oLeft += oParent.offsetLeft;
		o = oParent;
	}
	return oLeft;
}
//获取控件上绝对位置
function getTop(o) {
	var oTop = o.offsetTop;
	while (o.offsetParent != null) {
		oParent = o.offsetParent;
		oTop += oParent.offsetTop; // Add parent top position
		o = oParent;
	}
	return oTop;
}
//获取控件宽度
function getElementWidth(objectId) {
	var x = document.getElementById(objectId);
	return x.offsetWidth;
}
//创建元素
function createElement(type,id,top,left,width,height){
	var myObj = document.createElement(type);
	myObj.setAttribute("id",id);
	myObj.style.top = top+"px";
	myObj.style.left = left+"px";
	myObj.style.width = width+"px"; 
	myObj.style.height = height+"px";
	return myObj;
}
//关闭淘宝统计
function stopTaoBaoTotal(){
	TaoBaoTotalShowDiv.style.display = "none";
}
//显示淘宝统计
function showTaoBaoTotal(taoBaoTotal){
	if(null == TaoBaoTotalShowDiv){
		return;		
	}
	var html = "<table width='100%'>";
	//html += "<tr align='center'><td colspan='3'>统计中,请耐心等待...<a href='javascript:void(0);' onclick='document.getElementById(\"joy_TaoBaoTotalShowDiv\").style.display=\"none\";'>[关闭]</a></td></tr>";
	html += "<tr align='center'><td colspan='3' id='joy_showTable_Title'>统计中,请耐心等待...</td></tr>";
	html += "<tr align='center'><td colspan='3' id='joy_showTable_output'></td></tr>";
	html += "<tr align='center'><td colspan='3'>"+taoBaoTotal.startTime+" ~ "+taoBaoTotal.endTime+"</td></tr>";
	html += "<tr align='center'><td width='50%'>时间</td><td width='20%'>数量</td><td width='30%'>累计</td></tr>";
	var totalCount = 0;
	var count = 0;
    taoBaoTotal.timeArray.sort();
	for(var i=0;i<taoBaoTotal.timeArray.length;i++){
		var timeArray = taoBaoTotal.timeArray[i];
		if( 0 == timeArray[1]){
			continue;
		}
		//html += "<tr align='center'><td width='50%'>"+timeArray[0]+"</td><td width='50%'>"+timeArray[1]+"</td></tr>";
		totalCount += timeArray[1];
        html += "<tr align='center'><td width='50%'>"+timeArray[0]+"</td><td width='20%'>"+timeArray[1]+"</td><td width='30%'>"+totalCount+"</td></tr>";
		count++;
	}
	html += "<tr align='center'><td colspan='3'>总计："+totalCount+"</td></tr>";
	html += "</table>";
	var height = 120+(count * 20);
	if(height < 200){
		height = 200;
	}
	TaoBaoTotalShowDiv.innerHTML = html;
	TaoBaoTotalShowDiv.style.height = height+"px";
	TaoBaoTotalShowDiv.style.display = "block";
	
	var html2 = "<table width='100%' border='1'>";
	html2 += "<tr><td width='50px'>排序</td><td>买家</td><td>样式和型号</td><td width='50px'>价格</td><td width='50px'>数量</td><td>时间</td></tr>";
	for(var i=0;i<taoBaoTotal.dataArray.length;i++){
		var dataArray = taoBaoTotal.dataArray[i];
		html2 += "<tr><td>"+(i+1)+"</td><td>"+dataArray[1]+"</td><td>"+dataArray[4]+"</td><td>"+dataArray[2]+"</td><td>"+dataArray[3]+"</td><td>"+dataArray[0]+"</td></tr>";
	}
	html2 += "</table>";
	TaoBaoTotalDataDiv.innerHTML = html2;
	TaoBaoTotalDataDiv.style.display = "block";
	
	var joy_showTable_output = document.getElementById("joy_showTable_output");
	var joy_output = createElement("a","joy_output",0,0,100,30);
	joy_output.setAttribute("href", "javascript:void(0);");
	joy_output.innerHTML = "导出数据";
	joy_output.addEventListener("click", function(){
		  var winname = window.open('', '_blank', 'top=10000');
          //获得页面上需要导出的数据内容
          var strHTML = TaoBaoTotalDataDiv.innerHTML; //其中tableExcel是需要导出数据的div的id或者表的id
          winname.document.open('text/html', 'replace');
          winname.document.writeln(strHTML);
	});
	joy_showTable_output.appendChild(joy_output);
}
var joy_count = 0;
//开始统计
function startTotal(taoBaoTotal){
	setTimeout(function(){
		joy_count++;
		if(joy_count > 300){
			alert('统计不到数据...');
			return;
		}
		var joy_showTable_Title = document.getElementById("joy_showTable_Title");
		if(null != joy_showTable_Title){
			joy_showTable_Title.innerHTML = "统计中,请耐心等待...";
		}
		//开始统计数量
		var J_showBuyerList = document.getElementById("J_showBuyerList");
		if(null == J_showBuyerList){
			console.log("no J_showBuyerList...");
			startTotal(taoBaoTotal);
			return;
		}
		var J_showBuyerList_table = J_showBuyerList.getElementsByTagName("table");
		if(null == J_showBuyerList_table || J_showBuyerList_table.length <= 0){
			console.log("no table...");
			startTotal(taoBaoTotal);
			return;
		}
		var J_showBuyerList_table_tbody = J_showBuyerList_table[0].getElementsByTagName("tbody");
		if(J_showBuyerList_table_tbody == null || J_showBuyerList_table_tbody.length <= 0){
			console.log("no tbody...");
			startTotal(taoBaoTotal);
			return;
		}
		var J_showBuyerList_table_tbody_trs = J_showBuyerList_table_tbody[0].getElementsByTagName("tr");
		if(null == J_showBuyerList_table_tbody_trs || J_showBuyerList_table_tbody_trs.length <= 0){
			console.log("no tr...");
			startTotal(taoBaoTotal);
			return;
		}
		joy_count = 0;
		var hasNext = false;
		for(var tr_i = 0;tr_i < J_showBuyerList_table_tbody_trs.length;tr_i++){
			var _tr = J_showBuyerList_table_tbody_trs[tr_i];
			var _tds = _tr.getElementsByTagName("td");
			if(_tds == null || _tds.length==0){
				_tds = _tr.getElementsByTagName("th");
			}
			if(_tds != null && _tds.length > 0){
				if(null == _tds[3]){
					continue;
				}
				var currName;
				var currPrice;
				var currAmount;
				var currTime;
				var currsku;
				if(_tds.length >= 5){
					currName = _tds[0].innerHTML;
					currPrice = _tds[1].innerHTML;
					currAmount = _tds[2].innerHTML;
					currTime = _tds[3].innerHTML;
					currsku = _tds[4].innerHTML;
				}else{
					currName = _tds[0].innerHTML;
					currsku = _tds[1].innerHTML;
					currAmount = _tds[2].innerHTML;
					currTime = _tds[3].innerHTML;
					currPrice = "";
				}
				if("成交时间"==currTime){
					continue;
				}
				currName = currName.replaceAll("<div","<span");
				currName = currName.replaceAll("</div","</span");
				currName = currName.replaceAll("br>","span>");
				currsku = currsku.replaceAll("<div","<span");
				currsku = currsku.replaceAll("</div","</span");
				currsku = currsku.replaceAll("br>","span>");
				// <p class="date">2015-06-03</p> <p class="time">22:45:45</p>  
				if(currTime.indexOf("class") != -1){
					var dataIndex = currTime.indexOf(">")+1;
					var data = currTime.substr(dataIndex,10);
					var timeIndex = currTime.indexOf("time\">")+6;
					var time = currTime.substr(timeIndex,8);
					currTime = data+" "+time;
				}
				//console.log("currTime = "+currTime);
				//添加进去，返回是否继续统计
				var next = taoBaoTotal.add(currTime,currName,currPrice,currAmount,currsku);
				if(hasNext == false){
					hasNext = next;
				};
			};
		}
		showTaoBaoTotal(taoBaoTotal);
		if(hasNext == true){
			console.log("寻找下一页...");
			document.getElementById("joy_showTable_Title").innerHTML = "寻找下一页...";
			var J_showBuyerList_div = J_showBuyerList.getElementsByTagName("div");
			if(null == J_showBuyerList_div || J_showBuyerList_div.length <=1 ){
				console.log("没找到下一页...1");
				document.getElementById("joy_showTable_Title").innerHTML = "没找到下一页...1";
				return;
			}
			var tb_pagination = null;
			for(var i=0;i<J_showBuyerList_div.length;i++){
				if(J_showBuyerList_div[i].className=="tb-pagination" 
					|| J_showBuyerList_div[i].className=="pagination"){
					tb_pagination = J_showBuyerList_div[i];
					break;
				};
			}
			if(null == tb_pagination){
				console.log("没找到下一页...2");
				document.getElementById("joy_showTable_Title").innerHTML = "没找到下一页...2";
				return;
			}
			var aList = tb_pagination.getElementsByTagName("a");
			if(null == aList || aList.length <=0){
				console.log("没找到下一页...3");
				document.getElementById("joy_showTable_Title").innerHTML = "没找到下一页...3";
				return;
			}
			//点击下一页
			var page_next = aList[aList.length-1];
			var page_next_span = page_next.getElementsByTagName("span");
			if(page_next_span!=null && page_next_span.length >0 && page_next_span[0].innerHTML=='下一页'){
				page_next.click();
				//继续统计
				setTimeout(function(){
					startTotal(taoBaoTotal);
				},900);
			}else{
				console.log("统计完成!!!");
				document.getElementById("joy_showTable_Title").innerHTML = "统计完成!!!";
			}
		}else{
			console.log("统计完成!!!");
			document.getElementById("joy_showTable_Title").innerHTML = "统计完成!!!";
		};
	},100);
}
//对Date的扩展，将 Date 转化为指定格式的String 
//月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
//年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
//例子： 
//(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
//(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function(fmt) 
{
	var o = {
	 "M+" : this.getMonth()+1,                 //月份 
	 "d+" : this.getDate(),                    //日 
	 "H+" : this.getHours(),                   //小时 
	 "h+" : this.getHours(),                   //小时 
	 "m+" : this.getMinutes(),                 //分 
	 "s+" : this.getSeconds(),                 //秒 
	 "q+" : Math.floor((this.getMonth()+3)/3), //季度 
	 "S"  : this.getMilliseconds()             //毫秒 
	}; 
	if(/(y+)/.test(fmt)) 
		fmt = fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
	for(var k in o) {
		if(new RegExp("("+ k +")").test(fmt)){
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
		}
	}
	return fmt; 
};
String.prototype.ParseDate = function(){
	//var o = ["-","/",":"];yyyy-MM-dd HH:mm
	var strs = this.split(/-|\/|\:| /);	
	if(strs.length<1){
		alert("String.prototype.Format error ");
		return null;
	}
	var arrays = new Array();
	for(var i=0;i<strs.length;i++){
		arrays[i] = strs[i];
	}
	for(var i=arrays.length;i<7;i++){
		arrays[i] = 0;
	}
	var d = new Date();
	d.setFullYear(arrays[0], arrays[1]-1, arrays[2]);
	d.setHours(arrays[3], arrays[4], arrays[5], arrays[6]);
	return d;
};
String.prototype.replaceAll = function(reallyDo, replaceWith, ignoreCase) {
    if (!RegExp.prototype.isPrototypeOf(reallyDo)) {
        return this.replace(new RegExp(reallyDo, (ignoreCase ? "gi": "g")), replaceWith);
    } else {
        return this.replace(reallyDo, replaceWith);
    }
};
var TaoBaoTotalShowDiv = null;
var TaoBaoTotalDataDiv = null;
window.onload = function() {
	var J_TabBar = document.getElementById("J_TabBar");
	if (null != J_TabBar) {
		var top = getTop(J_TabBar);
		var left = getLeft(J_TabBar);
		console.log("J_TabBar top = "+top+",left = "+left);
		
		
		TaoBaoTotalShowDiv = createElement("div","joy_TaoBaoTotalShowDiv",top-30,left+160,400,200);
		TaoBaoTotalShowDiv.style.position = "absolute";
		TaoBaoTotalShowDiv.style.zIndex = 9999999999;
		TaoBaoTotalShowDiv.style.backgroundColor = "red";
		TaoBaoTotalShowDiv.style.display = "none";
		document.body.appendChild(TaoBaoTotalShowDiv);
		
		//隐藏一个没用的div，用来显示table的数据
		TaoBaoTotalDataDiv = createElement("div","joy_TaoBaoTotalShowDiv",0,0,0,0);
		TaoBaoTotalDataDiv.style.display = "none";
		document.body.appendChild(TaoBaoTotalDataDiv);
		
		var myDiv = createElement("div","joy_myDiv",top-30,left+160,500,30);
		myDiv.style.position = "absolute";
		myDiv.style.zIndex = 999999999;
		document.body.appendChild(myDiv);
		
		var d = new Date();
		d.setMinutes(0, 0, 0);
		//console.log("d.getTime() = "+d.getTime());
		var myStartInput = createElement("input","joy_myStartInput",0,0,130,25); 
		myStartInput.setAttribute("value", d.Format("yyyy-MM-dd HH:mm:ss"));
		myDiv.appendChild(myStartInput);
		
		var myLabel = createElement("label","joy_myLabel",0,0,25,25);
		myLabel.innerHTML="~";
		myDiv.appendChild(myLabel);
		
		d.setSeconds(10, 0);
		var myEndInput = createElement("input","joy_myEndInput",0,0,130,25); 
		myEndInput.setAttribute("value", d.Format("yyyy-MM-dd HH:mm:ss"));
		myDiv.appendChild(myEndInput);
		
		var myButton = createElement("input","joy_myButton",0,0,100,30); 
		myButton.setAttribute("type", "button");
		myButton.setAttribute("value", "统计成交记录");
		myButton.addEventListener("click", function(){
			console.log("开始统计...");
			var startTime = document.getElementById("joy_myStartInput").value;
			var endTime = document.getElementById("joy_myEndInput").value;
			console.log("startTime = "+startTime+",endTime = "+endTime);
			
			var J_TabBar = document.getElementById("J_TabBar");
			var liList = J_TabBar.getElementsByTagName("li");
			var a = liList[2].getElementsByTagName("a");
			a[0].click();
			console.log("点击成交记录...");
			var taoBaoTotal = new TaoBaoTotal(startTime,endTime);
			startTotal(taoBaoTotal);
		});
		myDiv.appendChild(myButton);
	}
};