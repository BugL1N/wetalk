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

/*收藏操作 */

function collection(tieziId, temp) {
    $.ajax({
        type: 'post',
        URL: HOSTURL + 'topics/collection?topicId=' + tieziId + '&_dataarea=gongqi',
        async: false,
        success: function(data) {
            if (data.errcode == 0) {
                alert("收藏成功");
                temp = 1;
            } else {
                alert("收藏失败，请重试");
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
                alert("点赞成功");
                temp = 1;
            } else {
                alert("点赞失败，请重试");
                temp = 0;
            }
        },
        error: function() {

        }
    });
}

/* 加载首页帖子列表和用户信息 */

function gettiezilist() {
    $.ajax({
        type: 'get',
        // url: HOSTURL + ,
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

                $("#tiezi-list").html("");
                var tiezilist = $("#tiezi-list");
                var data_ = data.content.topiclist;
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
                window.location.href = 'tiezidetailes.html?tieziId=' + tieziid;
            });
            //点击评论进入帖子详情页
            $(".pingluniten").bind('click').click(function() {
                tieziids = $(this).parents("#tiezi-content").attr("data-tieziId");
                window.location.href = 'tiezidetailes.html?tieziId=' + tieziids;
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


function gettiezidetailes() {
    $.ajax({
        type: 'get',
        // url: HOSTURL+"",
        url: 'js/gettiezidetailes.json',
        dataType: 'json',
        async: false,
        success: function(data) {
            if (data.errcode == 0) {
                $("")
            } else {

            }
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