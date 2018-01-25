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


function getiezilist(params) {
    $.ajax({
        type: 'get',
        // data：{"fileId":file_id},
        // url: HOSTURL + 'file/collection?fileId=' + file_id + '&_dataarea=gongqi',
        async: false,
        success: function(data) {
            $("#tiezi-list").html("");
            var tiezilist = $("#tiezi-list");
            tiezilist.append(
                "<div class='weui-panel weui-panel_access' style='margin:0.5em;'>" +
                "<div class='weui-panel__bd'>" <
                div class = "weui_media_box weui_media_appmsg"
                style = "padding: 5px 15px;" >
                <
                div class = "weui_media_hd"
                style = "width:64px;height:64px;border-radius:64px" >
                <
                div style = "width:70px; height:70px;" >
                <
                div style = "width: 64px; height: 64px; float:left; border-radius: 50%; border: 3px solid #ffffff; overflow: hidden;" >
                <
                img src = "images/user.jpg"
                width = "64"
                height = "64" / >
                <
                /div> <
                /div> <
                /div> <
                div class = "weui_media_bd" >
                <
                div class = "weui-flex" >
                <
                div class = "weui-flex__item" >
                <
                h4 class = "weui_media_title" > 用户名 < /h4> <
                /div> <
                div class = "weui-flex__item"
                style = "color:#adabab;" >
                <
                i class = "iconfont" > & #xe610; < /i> <
                a > 浙江省嘉兴市 < /a> <
                /div> <
                /div> <
                div class = "weui-flex" >
                <
                a > 2018 - 01 - 01 00: 00: 00 < /a> <
                /div> <
                /div> <
                /div> <
                div class = "weui-media-box weui-media-box_text"
                style = "padding: 10px 15px;" >
                <
                h4 class = "weui-media-box__title" > 标题 < /h4> <
                p class = "weui-media-box__desc" > 桌布 * 2（ 正方形、 长方形）; 扫帚簸箕; 清洁球; 拖把; 水桶; 水盆; < /p> <
                img src = "images/ppt.png"
                style = "height: 64px;" >
                <
                /div> <
                div class = "weui-media-box"
                style = "height: 30px;padding: 5px 15px;" >
                <
                div class = "weui_media_bd" >
                <
                div class = "weui-flex" >
                <
                div class = "weui-flex__item"
                style = "text-align: left;" >
                <
                a href = ""
                style = "" > < i class = "iconfont"
                style = "font-size: 18px;" > & #xe815; < /i>收藏</a >
                <
                /div> <
                div class = "weui-flex__item"
                style = "text-align: center;" >
                <
                a style = "" >
                <
                i class = "iconfont"
                style = "font-size: 20px;color: #a3a3a3;" > & #xe79f; < /i>1 <
                /a> <
                /div> <
                div class = "weui-flex__item"
                style = "text-align: right;" >
                <
                a href = ""
                style = "" > < i class = "iconfont"
                style = "font-size: 18px;" > & #xe63a; < /i>收藏</a >
                <
                /div> <
                /div> <
                /div> <
                /div> <
                /div> <
                /div>
            );
        },
        error: function() {
            alert("连接失败");
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