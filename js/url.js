var HOSTURL= "http://weixin.gongqi.info:36008/web/";

function showLoadingToast(){
	var $loadingToast = $('#loadingToast');
	if ($loadingToast.css('display') == 'none') {
		$loadingToast.show();
	}
}
 
function hideLoadingToast()
{
	var $loadingToast = $('#loadingToast');
	if ($loadingToast.css('display') != 'none') {
		$loadingToast.hide();
	}
}

var ajaxErrorFunc = function(XMLHttpRequest, textStatus, errorThrown)
{
	//requestErrorMsg
	hideLoadingToast();
	var $requestErrorMsg = $('#requestErrorMsg');
	var errMsg = "";if(textStatus!=null){errMsg+=textStatus;}if(errorThrown!=null){errMsg+=("  "+errorThrown);}
	$requestErrorMsg.html(errMsg);
	var $requestErrorDialog = $('#requestErrorDialog');
	if ($requestErrorDialog.css('display') == 'none') {
		$requestErrorDialog.show();
		$requestErrorDialog.find('.weui_btn_dialog').one('click', function () {
			$requestErrorDialog.hide();
		});
	}
	
}

function ajaxErrorMsg(errMsg)
{
	var $requestErrorDialog = $('#requestErrorDialog');
	var $requestErrorMsg = $('#requestErrorMsg');
	//$requestErrorMsg.html(data.errMsg);
	$requestErrorMsg.html(errMsg);
	if ($requestErrorDialog.css('display') == 'none') {
		$requestErrorDialog.show();
		$requestErrorDialog.find('.weui_btn_dialog').one('click', function () {
			$requestErrorDialog.hide();
		});
	}
}

function GetQueryString(name)
{
var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
var r = document.location.search.substr(1).match(reg);
	if(r!=null){
		return unescape(r[2]);
	}else{
	return null;	
	} 
}


var now = new Date();
var y=now.getFullYear();
var m=now.getMonth()+1;
var d=now.getDate();
m=m<10?"0"+m:m;
d=d<10?"0"+d:d;
var Nowdate = y+"-"+m+"-"+d;
