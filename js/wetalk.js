// 搜索
$(function() {
    var $searchBar = $('#searchBar'),
        $searchResult = $('#searchResult'),
        $searchText = $('#searchText'),
        $searchInput = $('#searchInput'),
        $searchClear = $('#searchClear'),
        $searchCancel = $('#searchCancel');

    function hideSearchResult() {
        $searchResult.hide();
        $searchInput.val('');
    }

    function cancelSearch() {
        hideSearchResult();
        $searchBar.removeClass('weui-search-bar_focusing');
        $searchText.show();
    }

    $searchText.on('click', function() {
        $searchBar.addClass('weui-search-bar_focusing');
        $searchInput.focus();
    });
    $searchInput.on('blur', function() {
            if (!this.value.length) cancelSearch();
        })
        .on('input', function() {
            if (this.value.length) {
                $searchResult.show();
            } else {
                $searchResult.hide();
            }
        });
    $searchClear.on('click', function() {
        hideSearchResult();
        $searchInput.focus();
    });
    $searchCancel.on('click', function() {
        cancelSearch();
        $searchInput.blur();
    });
});


/*显示今日访客、今日话题、话题总数的数量 */

// function getstatistics() {
//     $.ajax({
//         type: "get",
//         url: 'js/topics.json',
//         asunc: false,
//         success: function(data) {
//             if (data.errcode == 0) {
//                 var visitsize = data.content.visitSize;
//                 var allsize = data.content.allSize;
//                 var topicsize = data.content.topicSize;
//                 $("#todayvisitor").text(visitsize);
//                 $("#todayhuati").text(allsize);
//                 $("#huaticount").text(topicsize);
//             }
//         },
//         complete: function() {

//         },
//         error: function() {

//         }

//     });
// }
/* 发表 */
function create() {
    var title = "ლ(′◉❥◉｀ლ)";
    var content = "(#^.^#)";
    var location = 1;
    var addr = "火星";
    var employeeIds = "";
    var departmentIds = "";
    var remindDepartmentIds = "";
    var remindEmployeeIds = "";
    var anonymity = 0;
    $.ajax({
        type: 'post',
        url: HOSTURL + 'topic/create&_dataarea=gongqi',
        dataType: 'json',
        data: {
            title: title,
            content: content,
            location: location,
            addr: addr,
            employeeIds: employeeIds,
            departmentIds: departmentIds,
            remindEmployeeIds: remindEmployeeIds,
            remindDepartmentIds: remindDepartmentIds,
            anonymity: anonymity
        },
        cache: false,
        traditional: true,
        success: function(data) {
            if (data.errcode == 0) {
                console.log("成功");
                window.location.href = "talk.html";
            } else {
                console.log("失败");
            }
        },
        errror: function() {
            console.log("失败");
        }

    });
}


/*收藏操作 */

function collection(tieziId, temp) {
    $.ajax({
        type: 'post',
        URL: HOSTURL + 'topics/collection?topicId=' + tieziId + '&type=0&_dataarea=gongqi',
        async: false,
        success: function(data) {
            if (data.errcode == 0) {
                weui.toast('收藏成功', 3000);
                temp = 1;
            } else {
                weui.dialog({
                    content: '收藏失败',
                    className: 'custom-classname',
                    buttons: [{
                        label: '确定',
                        type: 'primary',
                    }]
                });

                temp = 0;
            }
        },
        error: function() {

        }
    });
}

/*点赞操作*/

function praise(tieziId, temp) {
    $.ajax({
        type: 'post',
        URL: HOSTURL + 'topics/praise?topicId=' + tieziId + '&_dataarea=gongqi',
        async: false,
        success: function(data) {
            if (data.errcode == 0) {
                weui.toast('点赞成功', 3000);
                temp = 1;
            } else {
                weui.dialog({
                    content: '点赞失败',
                    className: 'custom-classname',
                    buttons: [{
                        label: '确定',
                        type: 'primary',
                    }]
                });
                temp = 0;
            }
        },
        error: function() {

        }
    });
}

/*加载左侧用户信息 */
function getuserinfo() {
    $.ajax({
        type: 'get',
        // url: HOSTURL+'topic/topics?startIndex='+ '0' +'&_dataarea=gongqi'
        url: 'js/topics.json',
        async: false,
        success: function(data) {
            if (data.errcode == 0) {
                _data = data.content.userInfo;

                var username = _data.name;
                var userimg = _data.headImg;
                var userquanxian = "体验用户";
                $('head').append("<style>#user-container::before{ background: url(" + userimg + ");background-size:cover; }</style>");
                $("#user-container").html("");
                var userinfocontainer = $("#userinfo-container");
                userinfocontainer.append(
                    "<div id = 'left-panel-hd'> " +
                    "<div id = 'user-container'> " +
                    "<div style='padding-top: 100px;display: inline-block;width: 100%;'>" +
                    "<div class='weui_panel_bd page__bd_spacing'>" +
                    "<div class='weui_media_box weui_media_appmsg' style='padding:5px;'>" +
                    "<div class=w'eui_media_hd'>" +
                    "<div style='width:70px; height:70px;'>" +
                    "<div style='width: 64px; height: 64px; float:left; border-radius: 50%; border: 3px solid #eee; overflow: hidden;'>" +
                    "<img src='" + userimg + "' width='64' height='64' />" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "<div class='weui_media_bd'>" +
                    "<h5 class='weui_media_title'>" + username + "</h5>" +
                    "<div class='weui-flex'>" +
                    "<h5>" + userquanxian + "</h5>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>"
                );

                /*显示今日访客、今日话题、话题总数的数量 */
                var visitsize = data.content.visitSize;
                var allsize = data.content.allSize;
                var topicsize = data.content.topicSize;
                $("#todayvisitor").text(visitsize);
                $("#todayhuati").text(allsize);
                $("#huaticount").text(topicsize);

            }

        },
        complete: function() {

        },
        error: function() {
            alert("连接失败");
        }
    });
}


/* 加载首页帖子列表*/

function gettiezilist(startindex) {
    $.ajax({
        type: 'get',
        // url: HOSTURL+'topic/topics?startIndex='+ '0' +'&_dataarea=gongqi'
        url: 'js/topics.json',
        async: false,
        success: function(data) {
            if (data.errcode == 0) {

                // $("#tiezi-list").html("");
                var tiezilist = $("#tiezi-list");
                var data_ = data.content.topiclist;
                console.log(data.content.topiclist.length);
                for (var i = 0; i < data.content.topiclist.length; i++) {
                    var dianzan = data_[i].praise;
                    var shoucang = data_[i].collect;
                    var tieziId = data_[i].topicId;
                    var userimg = data_[i].headImg;
                    var username = data_[i].name;
                    var dingwei = data_[i].address;
                    var fatietime = data_[i].releaseDate + " " + data_[i].releaseTime;
                    var title = data_[i].title;
                    var tiezitext = data_[i].content;
                    var pinglunnum = data_[i].topicRepliesSize;
                    var imageurl = "";
                    tiezilist.append(
                        "<div class='weui-panel weui-panel_access' style='margin:0.5em;border-radius: 5px;'>" +
                        "<div class='weui-panel__bd'>" +
                        "<div class='weui_media_box weui_media_appmsg' style='padding: 5px 15px;'>" +
                        "<div class='weui_media_hd' style='width:64px;height:64px;border-radius:64px'>" +
                        "<div style='width:70px; height:70px;'>" +
                        "<div style='width: 64px; height: 64px; float:left; border-radius: 50%; border: 3px solid #ffffff; overflow: hidden;'>" +
                        "<img src='" + userimg + "' width='64' height='64' />" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "<div class='weui_media_bd'>" +
                        "<div class='weui-flex'>" +
                        "<div class='weui-flex__item'>" +
                        "<h4 class='weui_media_title'>" + username + "</h4>" +
                        "</div>" +
                        "<div class='weui-flex__item dingweiitem' style='color:#adabab;' id='dingwei-" + tieziId + "' data-dingwei='" + dingwei + "'>" +
                        "<i class='iconfont'>&#xe610; </i>" +
                        "<a>" + dingwei + "</a>" +
                        "</div>" +
                        "</div>" +
                        "<div class='weui-flex'>" +
                        "<a>" + fatietime + "</a>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "<div class='weui-media-box weui-media-box_text tiezicontent'  style='padding: 10px 15px;' id='tiezi-content' data-tieziId ='" + tieziId + "'>" +
                        "<h4 class='weui-media-box__title'>" + title + "</h4>" +
                        "<p class='weui-media-box__desc'>" + tiezitext + "</p>" +
                        "<img src='" + imageurl + "' style='height: 64px;padding: 5px;' id='img-" + tieziId + "'>" +
                        "</div>" +
                        "<div class='weui-media-box' style='height: 30px;padding: 5px 15px;'>" +
                        "<div class='weui_media_bd'>" +
                        "<div class='weui-flex'>" +
                        "<div class='weui-flex__item shoucangitem' style='text-align: left;' id='shoucang-" + tieziId + "' data-shoucang='" + shoucang + "'>" +
                        "<a class='shoucang' style='display:block;'><i class='iconfont' style='font-size: 18px;'>&#xe815;</i>收藏</a>" +
                        "<a class='quxiaoshoucang' style='display:none;'><i class='iconfont' style='font-size: 18px;'>&#xe815;</i>取消收藏</a>" +
                        "</div>" +
                        "<div class='weui-flex__item pingluniten' style='text-align: center;'>" +
                        "<a>" +
                        "<i class='iconfont' style='font-size: 20px;color: #a3a3a3;'>&#xe79f;</i>" + pinglunnum +
                        "</a>" +
                        "</div>" +
                        "<div class='weui-flex__item dianzanitem' style='text-align: right;' id='dianzan-" + tieziId + "' data-dianzan='" + dianzan + "'>" +
                        "<a class='dianzan' style='display:;'><i class='iconfont' style='font-size: 18px;'>&#xe63a;</i>点赞</a>" +
                        "<a class='quxiaodianzan' style='display:block;'><i class='iconfont' style='font-size: 18px;'>&#xe63a;</i>取消点赞</a>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "</div>"
                    );
                    if (imageurl == "") {
                        $("#img-" + tieziId).hide();
                    }
                    if (dingwei == "") {
                        $("#dingwei-" + tieziId).hide();
                    }
                    if (shoucang == true) {
                        $("#shoucang-" + tieziId).find(".shoucang").hide();
                        $("#shoucang-" + tieziId).find(".quxiaoshoucang").show();
                    } else {
                        $("#shoucang-" + tieziId).find(".shoucang").show();
                        $("#shoucang-" + tieziId).find(".quxiaoshoucang").hide();
                    }
                    if (dianzan == true) {
                        $("#dianzan-" + tieziId).find(".dianzan").hide();
                        $("#dianzan-" + tieziId).find(".quxiaodianzan").show();
                    } else {
                        $("#dianzan-" + tieziId).find(".dianzan").show();
                        $("#dianzan-" + tieziId).find(".quxiaodianzan").hide();
                    }
                }
            }

        },
        complete: function() {
            //点击帖子进入帖子详情页
            $(".tiezicontent").bind('click').click(function() {
                tieziid = $(this).attr("data-tieziId");
                window.location.href = 'topicdetails.html?topicId=' + tieziid;
            });
            //点击评论进入帖子详情页
            $(".pingluniten").bind('click').click(function() {
                tieziids = $(this).parents("#tiezi-content").attr("data-tieziId");
                window.location.href = 'topicdetails.html?topicId=' + tieziids;
            });
            //点击收藏、未收藏
            $(".shoucangitem").bind('click').click(function() {
                // console.log("收藏");
                var tieziId = $(this).parents(".weui-panel__bd").find(".tiezicontent").attr("data-tieziId");
                var datashoucang = $(this).attr("data-shoucang");
                if (datashoucang == "false") {
                    var temp = 0;
                } else {
                    var temp = 1;
                }
                collection(tieziId, temp);
                if (temp == 1) {
                    $(this).find(".shoucang").hide();
                    $(this).find(".quxiaoshoucang").show();
                    $(this).attr("data-shoucang", "true");
                } else {
                    $(this).find(".shoucang").show();
                    $(this).find(".quxiaoshoucang").hide();
                    $(this).attr("data-shoucang", "false");
                }
            });
            //点击点赞、取消点赞
            $(".dianzanitem").bind('click').click(function() {
                // console.log("点赞");
                var tieziId = $(this).parents(".weui-panel__bd").find(".tiezicontent").attr("data-tieziId");
                var datadianzan = $(this).attr("data-dianzan");
                if (datadianzan == "false") {
                    var temp = 0;
                } else {
                    var temp = 1;
                }
                praise(tieziId, temp);
                if (temp == 1) {
                    $(this).find(".dianzan").hide();
                    $(this).find(".quxiaodianzan").show();
                    $(this).attr("data-dianzan", "true");
                } else {
                    $(this).find(".dianzan").show();
                    $(this).find(".quxiaodianzan").hide();
                    $(this).attr("data-dianzan", "false");
                }
            });
        },
        error: function() {
            alert("连接失败");
        }
    });
}


//话题详情
function gettiezidetailes() {
    var parentId = "";
    var parentId = GetQueryString("topicId"); //这个方法获取当前页面的url参数
    if (parentId == null) {
        parentId = "";
    }
    $.ajax({
        type: 'get',
        // url: HOSTURL+'topic/detail?topicId='+ parentId +'&_dataarea=gongqi',
        url: 'js/tiezidetailes.json',
        dataType: 'json',
        async: false,
        success: function(data) {
            if (data.errcode == 0) {
                var data_ = data.content;
                var topicstext = data_.content;
                var topicsId = data_.topicId;
                var topicstitle = data_.title;
                var userimg = data_.headImg;
                var username = data_.name;
                var topicstime = data_.releaseDate + " " + data_.releaseTime;
                var topicsaddress = data_.address;
                var topicsown = data_.own;
                $("#topics-content").html("");
                var topicscontent = $("#topics-content");
                topicscontent.append(
                    "<div class='weui_media_box weui_media_appmsg'>" +
                    "<div class='weui_media_hd' style='width:64px;height:64px;border-radius:64px'>" +
                    "<div style='width:70px; height:70px;'>" +
                    "<div style='width: 64px; height: 64px; float:left; border-radius: 50%; border: 3px solid #ffffff; overflow: hidden;'>" +
                    "<img src='" + userimg + "' width='64' height='64' />" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "<div class='weui_media_bd'>" +
                    "<div class='weui-flex'>" +
                    "<div class='weui-flex__item'>" +
                    "<h4 class='weui_media_title'>" + username + "</h4>" +
                    "</div>" +
                    "<div class='weui-flex__item' id='topicsaddress-" + topicsId + "'>" +
                    "<i class='iconfont'>&#xe610;</i>" +
                    "<a>" + topicsaddress + "</a>" +
                    "</div>" +
                    "</div>" +
                    "<div class='weui-flex'>" +
                    "<div class='weui-flex__item'>" +
                    "<a>" + topicstime + "</a>" +
                    "</div>" +
                    "<div id='delete-topics' style='display:none;'>" +
                    "<div class='placeholder'>" +
                    "<a style='color:#ff0000'>" + "删除" + "</a>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "<div class='weui-media-box weui-media-box_text'>" +
                    "<h4 class='weui-media-box__title'>" + topicstitle + "</h4>" +
                    "<p class=''>" + topicstext + "</p>" +
                    "</div>" +
                    "<div class='weui-media-box'>" +
                    "<div class='weui_media_bd'>" +
                    " <div class='weui-flex'>" +
                    "<div class='weui-flex__item' style='text-align: right;'>" +
                    "<img src=''>" +
                    "<a href='' style='padding-right: 10%;'>dianzan</a>" +
                    "<img src=''>" +
                    "</div>" +
                    "<div class='weui-flex__item'>" +
                    "<img src=''>" +
                    "<a href='' style='padding-left: 10%;'>shoucang</a>" +
                    "<img src=''>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>"
                );
                if (topicsaddress == "") {
                    $("#topicsaddress-" + topicsId).hide();
                }
                if (topicsown == true) {
                    $("#delete-topics").show();
                }
                $("#reply-content").html("");
                var replycontent = $("#reply-content");
                var _data = data.content.reply;
                for (var i = 0; i < data.content.reply.length; i++) {
                    var replyusername = _data[i].name;
                    var replyuserimg = _data[i].headImg;
                    var replytime = _data[i].releaseDate + " " + _data[i].releaseTime;
                    var replytext = _data[i].content;
                    replycontent.append(
                        "<div class='weui-media-box weui-media-box_appmsg'>" +
                        "<div class='weui-media-box__hd' style='width:60px;height:60px;border-radius:60px'>" +
                        "<div style='width:70px; height:70px;'>" +
                        "<div style='width: 60px; height: 60px; float:left; border-radius: 50%; border: 3px solid #ffffff; overflow: hidden;'>" +
                        "<img src='" + replyuserimg + "' width='64' height='64' />" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "<div class='weui-media-box__bd'>" +
                        "<div class='weui-flex'>" +
                        "<div class='weui-flex__item' style='text-align: left;'>" +
                        "<h4>" + replyusername + "</h4>" +
                        "</div>" +
                        "</div>" +
                        "<a>" + replytime + "</a>" +
                        "<p class='' style='text-align: left;'>" + replytext + "</p>" +
                        "</div>" +
                        "<div class='weui-media-box__ft'>" +
                        "<div class='delete-reply' style='display:none;'><i class='iconfont'>&#xe627;</i></div>" +
                        "<i class='iconfont'>&#xe66f;</i>" +
                        "</div>" +
                        "</div>"
                    );
                    if (topicsown == true) {
                        $(".delete-reply").show();
                    }
                }
            } else {

            }
        },
        complete: function() {
            $("#delete-topics").bind('click').click(function() {
                weui.dialog({
                    // title: 'dialog标题',
                    content: '确认要删除该话题吗？',
                    className: 'custom-classname',
                    buttons: [{
                        label: '取消',
                        type: 'default',
                        onClick: function() { alert('取消删除') }
                    }, {
                        label: '确定',
                        type: 'primary',
                        onClick: function() { alert('确认删除') }
                    }]
                });
            });
            $(".delete-reply").bind('click').click(function() {
                // var replyId = $(this).
                weui.dialog({
                    content: '确认要删除该评论吗？',
                    className: 'custom-classname',
                    buttons: [{
                        label: '取消',
                        type: 'default',
                        onClick: function() { alert('取消删除') }
                    }, {
                        label: '确定',
                        type: 'primary',
                        onClick: function() { alert('确认删除') }
                    }]
                });
            });
        },
        error: function() {

        }

    });
}

/*我发表的 */

function getowntopics() {
    $.ajax({
        tupe: 'get',
        // url: HOSTURL+'topic/ownTopics?startIndex='+ '0' +'&_dataarea=gongqi'
        url: 'js/topics.json',
        dataType: 'json',
        success: function(data) {
            if (data.errcode == 0) {
                $("#mycollection-content").html("");
                var mycollectioncontent = $("#mycollection-content");
                var collectionnum = "3";
                $("#collention-num").text(collectionnum);
                for (var i = 0; i < collectionnum; i++) {
                    var username = "发起人";
                    var topicstime = "发起时间";
                    var replynum = "回复数量";
                    var topicstitle = "标题二标题二标题二标题二标题二标题二标题二标题二标题二标题二";
                    mycollectioncontent.append(
                        "<a href='" + "http://www.baidu.com" + "' class='weui-media-box weui-media-box_appmsg'>" +
                        "<div class='weui-media-box__hd bianji' style='display: none;width: 10%;'>QAQ</div>" +
                        "<div class='weui-media-box__bd'>" +
                        "<h4 class='title' style='color:#619A4F;font-size: 16px;'>" + topicstitle + "</h4>" +
                        "<div class='weui-flex' style='color:#B7B4AD'>" +
                        "<div class='weui-flex__item'>" + username + "</div>" +
                        "<div class='weui-flex__item' style='float: right;'>" +
                        "<div class='weui-flex' style='text-align: center;'>" +
                        "<div class='weui-flex__item'>" + topicstime + "</div>" +
                        "<div class='weui-flex__item'>" + replynum + "</div>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "</a>"
                    );
                }
            } else {

            }
        },
        complete: function() {
            $(".bianji").unbind('click').click(function(event) {
                console.log("删除该话题");
                event.preventDefault();
            });
        },
        error: function() {

        }

    });
}

function getbacktopics() {
    $.ajax({
        tupe: 'get',
        // url: HOSTURL+'topic/backTopics?startIndex='+ '0' +'&_dataarea=gongqi'
        url: 'js/topics.json',
        dataType: 'json',
        success: function(data) {
            if (data.errcode == 0) {
                $("#backtopics-content").html("");
                var backtopicscontent = $("#backtopics-content");
                var backtopicsnum = "3";
                $("#collention-num").text(backtopicsnum);
                for (var i = 0; i < backtopicsnum; i++) {
                    var username = "发起人";
                    var topicstime = "发起时间";
                    var replynum = "回复数量";
                    var topicstitle = "标题二标题二标题二标题二标题二标题二标题二标题二标题二标题二";
                    backtopicscontent.append(
                        "<a href='" + "http://www.baidu.com" + "' class='weui-media-box weui-media-box_appmsg'>" +
                        "<div class='weui-media-box__hd bianji' style='display: none;width: 10%;'>QAQ</div>" +
                        "<div class='weui-media-box__bd'>" +
                        "<h4 class='weui-media-box__title' style='color:#555555;font-size: 16px;'>“" + "大扎好，我系轱天乐，我四渣渣辉，探挽懒月，介四里没有挽过的船新版本，挤需体验三番钟，里造会干我一样，爱象节款游戏。" + "”</h4>" +
                        "<div class='weui-flex' style='color:#B7B4AD'>" +
                        "<p style='font-size: 16px;color:#000000;'>【<strong>" + topicstitle + "</strong>】<P>" +
                        "</div>" +
                        "<div class='weui-flex' style='color:#B7B4AD'>" +
                        "<div class='weui-flex__item'> " + "username" + "</div>" +
                        "<div class='weui-flex__item' style='text-align:right;'> " + "time" + "</div>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "</a>"
                    );
                }
            } else {

            }
        },
        complete: function() {
            $(".bianji").unbind('click').click(function(event) {
                console.log("删除该话题");
                event.preventDefault();
            });
        },
        error: function() {

        }

    });
}

function getbackreplys() {
    $.ajax({
        tupe: 'get',
        // url: HOSTURL+'topic/backReplys?startIndex='+ '0' +'&_dataarea=gongqi'
        url: 'js/topics.json',
        dataType: 'json',
        success: function(data) {
            if (data.errcode == 0) {
                $("#backreplys-content").html("");
                var backreplyscontent = $("#backreplys-content");
                var backreplysnum = "3";
                $("#backreplys-num").text(backreplysnum);
                for (var i = 0; i < backreplysnum; i++) {
                    var username = "回复人";
                    var topicstime = "回复时间";
                    // var replynum = "回复数量";
                    var myreplycontent = "我的评论内容";
                    backreplyscontent.append(
                        "<a href='" + "http://www.baidu.com" + "' class='weui-media-box weui-media-box_appmsg'>" +
                        // "<div class='weui-media-box__hd bianji' style='display: none;width: 10%;'>QAQ</div>" +
                        "<div class='weui-media-box__bd'>" +
                        "<h4 class='weui-media-box__title' style='color:#555555;font-size: 16px;'>“" + "大扎好，我系轱天乐，我四渣渣辉，探挽懒月，介四里没有挽过的船新版本，挤需体验三番钟，里造会干我一样，爱象节款游戏。" + "”</h4>" +
                        "<div class='weui-flex' style='color:#B7B4AD'>" +
                        "<p style='font-size: 16px;color:#000000;'>【<strong>" + myreplycontent + "</strong>】<P>" +
                        "</div>" +
                        "<div class='weui-flex' style='color:#B7B4AD'>" +
                        "<div class='weui-flex__item'> " + "username" + "</div>" +
                        "<div class='weui-flex__item' style='text-align:right;'> " + "time" + "</div>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "</a>"
                    );
                }
            } else {

            }
        },
        complete: function() {
            $(".bianji").unbind('click').click(function(event) {
                console.log("删除该话题");
                event.preventDefault();
            });
        },
        error: function() {

        }

    });
}

/*我评论的*/

function getreplytopics() {
    $.ajax({
        tupe: 'get',
        // url: HOSTURL+'topic/replyTopics?startIndex='+ '0' +'&_dataarea=gongqi'
        url: 'js/topics.json',
        dataType: 'json',
        success: function(data) {
            if (data.errcode == 0) {
                $("#mycollection-content").html("");
                var mycollectioncontent = $("#mycollection-content");
                var collectionnum = "3";
                $("#collention-num").text(collectionnum);
                for (var i = 0; i < collectionnum; i++) {
                    var username = "发起人";
                    var topicstime = "发起时间";
                    var replynum = "回复数量";
                    var topicstitle = "标题二标题二标题二标题二标题二标题二标题二标题二标题二标题二";
                    mycollectioncontent.append(
                        "<a href='" + "http://www.baidu.com" + "' class='weui-media-box weui-media-box_appmsg'>" +
                        "<div class='weui-media-box__bd'>" +
                        "<h4 class='weui-media-box__title' style='color:#555555;font-size: 16px;'>“" + "大扎好，我系轱天乐，我四渣渣辉，探挽懒月，介四里没有挽过的船新版本，挤需体验三番钟，里造会干我一样，爱象节款游戏。" + "”</h4>" +
                        "<div class='weui-flex' style='color:#B7B4AD'>" +
                        "<p style='font-size: 16px;color:#000000;'>【<strong>" + topicstitle + "</strong>】<P>" +
                        "</div>" +
                        "<div class='weui-flex' style='color:#B7B4AD'>" +
                        "<div class='weui-flex__item'> " + "username" + "</div>" +
                        "<div class='weui-flex__item' style='text-align:right;'> " + "time" + "</div>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "</a>"
                    );
                }
            } else {

            }
        },
        complete: function() {},
        error: function() {

        }

    });
}

/*我的点赞 */

function getpraisetopics() {
    $.ajax({
        tupe: 'get',
        // url: HOSTURL+'topic/praiseTopics?startIndex='+ '0' +'&_dataarea=gongqi',
        url: 'js/topics.json',
        dataType: 'json',
        success: function(data) {
            if (data.errcode == 0) {
                $("#mycollection-content").html("");
                var mycollectioncontent = $("#mycollection-content");
                var collectionnum = "3";
                $("#collention-num").text(collectionnum);
                for (var i = 0; i < collectionnum; i++) {
                    var username = "发起人";
                    var topicstime = "发起时间";
                    var replynum = "回复数量";
                    var topicstitle = "标题二标题二标题二标题二标题二标题二标题二标题二标题二标题二";
                    mycollectioncontent.append(
                        "<a href='" + "http://www.baidu.com" + "' class='weui-media-box weui-media-box_appmsg'>" +
                        "<div class='weui-media-box__hd bianji' style='display: none;width: 10%;'><i class='iconfont'>&#xe601;</i></div>" +
                        "<div class='weui-media-box__bd'>" +
                        "<h4 class='title' style='color:#619A4F;font-size: 16px;'>" + topicstitle + "</h4>" +
                        "<div class='weui-flex' style='color:#B7B4AD'>" +
                        "<div class='weui-flex__item'>" + username + "</div>" +
                        "<div class='weui-flex__item' style='float: right;'>" +
                        "<div class='weui-flex' style='text-align: center;'>" +
                        "<div class='weui-flex__item'>" + topicstime + "</div>" +
                        "<div class='weui-flex__item'>" + replynum + "</div>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "</a>"
                    );
                }
            } else {

            }
        },
        complete: function() {
            $(".bianji").unbind('click').click(function(event) {
                console.log("删除该话题");
                event.preventDefault();
            });
        },
        error: function() {

        }

    });
}

function getmycollection() {
    $.ajax({
        tupe: 'get',
        // url: HOSTURL+'topic/collectionTopics?startIndex='+ '0' +'&_dataarea=gongqi',
        url: 'js/topics.json',
        dataType: 'json',
        success: function(data) {
            if (data.errcode == 0) {
                $("#mycollection-content").html("");
                var mycollectioncontent = $("#mycollection-content");
                var collectionnum = "3";
                $("#collention-num").text(collectionnum);
                for (var i = 0; i < collectionnum; i++) {
                    var username = "发起人";
                    var topicstime = "发起时间";
                    var replynum = "回复数量";
                    var topicstitle = "标题二标题二标题二标题二标题二标题二标题二标题二标题二标题二";
                    mycollectioncontent.append(
                        "<a href='" + "http://www.baidu.com" + "' class='weui-media-box weui-media-box_appmsg'>" +
                        "<div class='weui-media-box__hd bianji' style='display: none;width: 10%;'>QAQ</div>" +
                        "<div class='weui-media-box__bd'>" +
                        "<h4 class='title' style='color:#619A4F;font-size: 16px;'>" + topicstitle + "</h4>" +
                        "<div class='weui-flex' style='color:#B7B4AD'>" +
                        "<div class='weui-flex__item'>" + username + "</div>" +
                        "<div class='weui-flex__item' style='float: right;'>" +
                        "<div class='weui-flex' style='text-align: center;'>" +
                        "<div class='weui-flex__item'>" + topicstime + "</div>" +
                        "<div class='weui-flex__item'>" + replynum + "</div>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "</a>"
                    );
                }
            } else {

            }
        },
        complete: function() {
            $(".bianji").unbind('click').click(function(event) {
                weui.dialog({
                    // title: 'dialog标题',
                    content: '确认要取消收藏此话题吗？',
                    className: 'custom-classname',
                    buttons: [{
                        label: '取消',
                        type: 'default',
                        onClick: function() { alert('取消操作') }
                    }, {
                        label: '确定',
                        type: 'primary',
                        onClick: function() { alert('取消收藏') }
                    }]
                });
                event.preventDefault();
            });
        },
        error: function() {

        }

    });
}

//上传图片
$.weui = {};
$.weui.alert = function(options) {
    options = $.extend({
        title: '警告',
        text: '警告内容'
    }, options);
    var $alert = $('.weui_dialog_alert');
    $alert.find('.weui_dialog_title').text(options.title);
    $alert.find('.weui_dialog_bd').text(options.text);
    $alert.on('touchend click', '.weui_btn_dialog', function() {
        $alert.hide();
    });
    $alert.show();
};

$(function() {
    // 允许上传的图片类型  
    var allowTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];
    // 1024KB，也就是 1MB  
    var maxSize = 1024 * 1024;
    // 图片最大宽度  
    var maxWidth = 300;
    // 最大上传图片数量  
    var maxCount = 6;
    $('.js_file').on('change', function(event) {
        var files = event.target.files;

        // 如果没有选中文件，直接返回  
        if (files.length === 0) {
            return;
        }

        for (var i = 0, len = files.length; i < len; i++) {
            var file = files[i];
            var reader = new FileReader();

            // 如果类型不在允许的类型范围内  
            if (allowTypes.indexOf(file.type) === -1) {
                $.weui.alert({
                    text: '该类型不允许上传'
                });
                continue;
            }

            if (file.size > maxSize) {
                $.weui.alert({
                    text: '图片太大，不允许上传'
                });
                continue;
            }

            if ($('.weui_uploader_file').length >= maxCount) {
                $.weui.alert({
                    text: '最多只能上传' + maxCount + '张图片'
                });
                return;
            }

            reader.onload = function(e) {
                var img = new Image();
                img.onload = function() {
                    // 不要超出最大宽度  
                    var w = Math.min(maxWidth, img.width);
                    // 高度按比例计算  
                    var h = img.height * (w / img.width);
                    var canvas = document.createElement('canvas');
                    var ctx = canvas.getContext('2d');
                    // 设置 canvas 的宽度和高度  
                    canvas.width = w;
                    canvas.height = h;
                    ctx.drawImage(img, 0, 0, w, h);
                    var base64 = canvas.toDataURL('image/png');

                    // 插入到预览区  
                    var $preview = $('<li class="weui_uploader_file weui_uploader_status" style="background-image:url(' + base64 + ')"><div class="weui_uploader_status_content">0%</div></li>');
                    $('.weui_uploader_files').append($preview);
                    var num = $('.weui_uploader_file').length;
                    $('.js_counter').text(num + '/' + maxCount);

                    // 然后假装在上传，可以post base64格式，也可以构造blob对象上传，也可以用微信JSSDK上传  

                    var progress = 0;

                    function uploading() {
                        $preview.find('.weui_uploader_status_content').text(++progress + '%');
                        if (progress < 100) {
                            setTimeout(uploading, 30);
                        } else {
                            // 如果是失败，塞一个失败图标  
                            //$preview.find('.weui_uploader_status_content').html('<i class="weui_icon_warn"></i>');  
                            $preview.removeClass('weui_uploader_status').find('.weui_uploader_status_content').remove();
                        }
                    }
                    setTimeout(uploading, 30);
                };

                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
});