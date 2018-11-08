$(function(){
    var user_id = sessionStorage.getItem('userId');
    if(!user_id) {
        window.location.href="index.html";
    }
    /**
     * 轉換時間
     */
    var monthStr = ['一月','二月', '三月','四月','五月','六月',
  '七月','八月','九月','十月','十一月','十二月'];
    function formatNumber(num) {
        var num = num.toString();
        return num[1] ? num : '0' + num
    }
    function convertDate(val) {
        var date = new Date(val);
        var year = date.getFullYear();
        var month = date.getMonth();
        var day = date.getDate();
        var hour = date.getHours();
        var minutes = date.getMinutes();
        return hour + ':' + formatNumber(minutes) + ' ' + monthStr[month] + day +',' + year;
    }
    function fetchTotalOrder(status) {
        $.ajax({
            url: '/BeMoralOfficial/order/getOrdersAll.do',
            type: 'POST',
            data: {
                userId: user_id,
                order_Status: status || 0,
                pageIndex: getQueryString("page") || 1,
                pageSize: 20
            },
            dataType: 'JSON',
            success: function(data) {
                if(data.status == 0) {
                    var orderNum = data.data;
                    $('#allNumber').text(orderNum.totalNum);
                    if ($('#historyOrder').length) {
                        var htmlStr = '';
                        var orderList = orderNum.data;
                        for (var i =0; i< orderList.length; i++) {
                            var addr = JSON.parse(orderList[i].ressCont);
                            var proList = JSON.parse(orderList[i].jsoncId);
                            htmlStr += '<div class="history-order_item" data-orderno="'+orderList[i].orderNum+'"><div class="history-order_title clearfix">';
                            htmlStr += '<div class="pull-left"><p>'+
                                        '<span>訂單編號</span>'+orderList[i].orderNum+'</p>'+
                                        '<p><span>訂單時間</span>'+orderList[i].creatTime+'</p></div>';
                            htmlStr += '<div class="pull-left"><p>'+
                                        '<span>收貨人</span>'+addr.ressName+'</p>'+
                                        '<p><span>數量</span>'+proList.length+'</p>'+
                                        '<p><span>支付方式</span>在線支付</p>'+
                                        '</div>';
                            htmlStr += '</div>';
                            htmlStr += '<div class="history-order_content"><table class="table"><tbody>';
                            for (var j =0; j< proList.length; j++) {
                                htmlStr += '<tr>';
                                htmlStr += '<td><a href="product_details.html?id='+proList[j].cId+'&preview=2&language=tc"><img src="'+proList[j].trade_photo1+'" alt=""></a></td>';
                                htmlStr += '<td><p class="history-order_name"><a href="product_details.html?id='+proList[j].cId+'&preview=2&language=tc">'+proList[j].cName+'</a></p>'+
                                            '<p class="history-order_sku">'+proList[j].cStandard+'</p></td>';
                                htmlStr += '<td><p class="history-order_price">NT$ '+proList[j].cPrice.toFixed(2)+'</p>'+
                                            '<p class="history-order_num">x '+proList[j].cNum+'</p>'+
                                            '</td>';
                                if (j == 0) {
                                    htmlStr += '<td> <span class="history-order_total">NT$ '+orderList[i].orderAmount.toFixed(2)+'</span>'+
                                               '<p class="history-order_origin"></p>'+
                                               '<span class="history-order_shipping">（郵費 NT$ 0.00）</span></td>';
                                    htmlStr += '<td><div class="history-order_control">';
                                    if (orderList[i].order_Status == 1) {
                                        htmlStr += '<span class="order-status-text">待支付</span>';
                                    }
                                    if(orderList[i].order_Cancel_Status) {
                                        if(orderList[i].order_Cancel_Status == 1) {
                                            htmlStr += '<span class="order-status-text">客服介入</span>';
                                        }
                                        if(orderList[i].order_Cancel_Status == 2) {
                                            htmlStr += '<span class="order-status-text">换货中</span>';
                                        }
                                        if(orderList[i].order_Cancel_Status == 3) {
                                            htmlStr += '<span class="order-status-text">换货完成</span>';
                                        }
                                        if(orderList[i].order_Cancel_Status == 4) {
                                            htmlStr += '<span class="order-status-text">拒绝换货</span>';
                                        }
                                        if(orderList[i].order_Cancel_Status == 5) {
                                            htmlStr += '<span class="order-status-text">退货退款</span>';
                                        }
                                    } else {
                                    if (orderList[i].order_Status == 2) {
                                        htmlStr += '<span class="order-status-text">待發貨</span>';
                                    }
                                    if (orderList[i].order_Status == 3) {
                                        htmlStr += '<span class="order-status-text">商品運輸中</span>';
                                    }
                                    if (orderList[i].order_Status == 4) {
                                        htmlStr += '<span class="order-status-text">待評論</span>';
                                    }
                                    if (orderList[i].order_Status == 5) {
                                        htmlStr += '<span class="order-status-text">訂單已完成</span>';
                                    }
                                    if (orderList[i].order_Status == 6) {
                                        htmlStr += '<span class="order-status-text">訂單關閉</span>';
                                    }
                                  }
                                    htmlStr += '<a class="check-detail" href="order_detail.html?orderNo='+orderList[i].orderNum+'">查看訂單詳情</a>';
                                    if(!orderList[i].order_Cancel_Status) {
                                        if (orderList[i].order_Status >= 2 && orderList[i].order_Status < 6 ) {
                                            htmlStr += '<a class="return-apply">退換貨申請</a>';
                                        }
                                    }
                                    if (orderList[i].order_Status == 1) {
                                        htmlStr += '<a class="cancel-order">取消訂單</a>';
                                    }
                                    if (orderList[i].order_Status == 2) {
                                        htmlStr += '';
                                    }
                                    if (orderList[i].order_Status == 3) {
                                        htmlStr += '<a class="express-check">物流查詢</a>';
                                    }
                                    if (orderList[i].order_Status == 4) {
                                        htmlStr += '';
                                    }
                                    if (orderList[i].order_Status == 5) {
                                        htmlStr += '<a class="buy-again">再次購買</a>';
                                        htmlStr += '<a class="invoice-apply">發票申請</a>';
                                    }
                                    if (orderList[i].order_Status == 6) {
                                        htmlStr += '<a class="buy-again" href="product_details.html?id='+proList[j].cId+'&preview=2&language=tc">再次購買</a>';
                                    }
                                    htmlStr += '</div></td>';
                                } else {
                                    htmlStr += '<td></td>';
                                    htmlStr += '<td></td>'
                                }
                                htmlStr += '</tr>';
                            }
                            htmlStr += '</tbody></table></div>';
                            if (orderList[i].order_Status == 4) {
                                htmlStr += '<div class="history-order_operation">';
                                htmlStr += '<button class="btn btn-comment">我要評論</button>';
                                htmlStr += '</div>';
                            }
                            if (orderList[i].order_Status == 3) {
                                htmlStr += '<div class="history-order_operation">';
                                htmlStr += '<button class="btn btn-confirmgoods">確認收貨</button>';
                                htmlStr += '</div>';
                            }
                            htmlStr += '</div>';
                        }
                        $('#historyOrder').html(htmlStr);
                        setPage(20, getQueryString("page") || 1,orderNum.totalNum);
                    }
                } else {
                
                }
            },
            error: function() {
    
            }
        })
    }
    fetchTotalOrder();
    /**
     * 取消訂單
     */
    $('#historyOrder').on('click', '.cancel-order', function(e){
        e.preventDefault();
        var orderNo = $(this).closest('.history-order_item').data('orderno');
        $.ajax({
            url: '/BeMoralOfficial/order/updateStatus.do',
            type: 'POST',
            data: {
                orderNum: orderNo,
                order_Status: 6
            },
            dataType: 'JSON',
            success: function(data) {
                if(data.status == 0) {
                    fetchTotalOrder();
                    alert('取消成功');
                }
            },
            error: function() {
            }
        })
    })
    /**
     * 確認收貨
     */
    $('#historyOrder').on('click', '.btn-confirmgoods', function(e){
        e.preventDefault();
        var orderNo = $(this).closest('.history-order_item').data('orderno');
        $.ajax({
            url: '/BeMoralOfficial/order/updateStatus.do',
            type: 'POST',
            data: {
                orderNum: orderNo,
                order_Status: 4
            },
            dataType: 'JSON',
            success: function(data) {
                if(data.status == 0) {
                    fetchTotalOrder();
                    alert('確認成功');
                }
            },
            error: function() {
            }
        })
    })
    /**
     * filter
     */
    $('#statusFilter1').on('change', function(e){
        var status = $(this).val();
        if($('#historyOrder')) {
            fetchTotalOrder(status)
        }
    })
    /**
     * 分頁
     */
    function setPage(pagesize, pageNo, total) {
        var htmlStr = "";
        var num = total / pagesize;
        if(num > 1) {
            for(var i = 1; i <= (total/pagesize)+1; i++) {
                if (i == Number(pageNo)) {
                    htmlStr += '<li class="active"><a>'+i+'</a></li>';
                } else {
                    htmlStr += '<li><a>'+i+'</a></li>';
                }
            }
            $("#pagination").html(htmlStr);
        } else {
            $(".common-pagination").hide();
        }
    }
    $("#prev").on("click", function(e){
        var current = $("#pagination li.active a").html();
        if(Number(current) > 1) {
            goto(Number(current) - 1);
        }
    })
    $("#next").on("click", function(e){
        var current = $("#pagination li.active a").html();
        var total = $("#pagination li:last-child a").html();
        if(Number(current) < Number(total)) {
            goto(Number(current) + 1);
        }
    })
    $("#pagination").on("click", "a", function(e) {
        if($(this).parent().hasClass("active")) return
        var num = $(this).html();
        goto(Number(num));
    })
    function goto(page) {
        window.location.href = "my_order.html?page=" + page;
    }
    /**
     * 退貨
     */
    var selectedNo;
    $("#historyOrder").on("click", ".return-apply", function(){
        $("#returnModal").modal("show");
        selectedNo = $(this).closest(".history-order_item").data("orderno");
    })
    var imgList = [];
    $("#returnFile").on("change", function(e){
        var formData = new FormData();
        formData.append("file",$(this)[0].files[0]);
        if(imgList.length >= 8) return;
        $.ajax({
            url: "/BeMoralOfficial/official/savePic.do",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            dataType: 'JSON',
            success: function(data) {
                if(data.status == 0) {
                    var key = data.data.key;
                    imgList.push(key);
                    var htmlStr ="";
                    for(var i = 0;i<imgList.length;i++) {
                        htmlStr += "<li style='background-image: url("+imgList[i]+")'></li>"
                    }
                    $("#fileList").html(htmlStr);
                }
            },
            error: function() {
            }
        })
    })
    $('#returnForm1').validate({
        rules: {
            tocEmail: "required",
            tocPhoto: "required",
            tocGenre: "required"
        },
        message: {
            tocEmail: "請填寫郵箱",
            tocPhoto: "請填寫手機號",
            tocGenre: "請填寫退貨類型"
        },
        success: "valid",
        submitHandler: function (form) {
            $(form).ajaxSubmit(function () {
                submitReturn();
            })
            return false;
        }
    });
    var submitReturn = function(){
        var tocEmail = $("#tocEmail").val();
        var tocPhoto = $("#tocPhoto").val();
        var tocGenre = $("#tocGenre").val();
        var tocPictureObjectString ={};
        for(var i =0;i<imgList.length;i++) {
            tocPictureObjectString["tocPicture" + (i+1)] = imgList[i];
        }
        $.ajax({
            url: "/BeMoralOfficial/order/createOrderCancel.do",
            type: "POST",
            data: {
                tocEmail: tocEmail,
                tocPhoto: tocPhoto,
                tocGenre: tocGenre,
                orderNum: selectedNo,
                userId: user_id,
                tocPictureObjectString: tocPictureObjectString
            },
            dataType: 'JSON',
            success: function(data) {
                if(data.status == 0) {
                    $("#returnModal").modal("hide");
                    fetchTotalOrder();
                }
            },
            error: function() {
            }
        })
    }
})