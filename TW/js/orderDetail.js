$(function(){
    /**
     * common
     */
    var user_id = sessionStorage.getItem('userId');
    if(!user_id) {
        window.location.href="index.html";
    }
    var orderNo = getQueryString('orderNo');
    $('#orderNo').html(orderNo);
    $('.order-detail-number').html(orderNo);
    /**
     * 詳情
     */
    var fetchOrderDetail = function() {
        $.ajax({
            url: '/BeMoralOfficial/order/getOrdersNum.do',
            type: 'POST',
            data: {
                orderNum: orderNo,
                userId: user_id
            },
            dataType: 'JSON',
            success: function(data) {
				console.log(data);
                if(data.status == 0) {
                    var detail = data.data;
                    var htmlStr = '';
                    $("#expressNo").html(detail.sn_id);
                    $('.change-pwd-step').eq(0).find('.step-date').html(detail.creatTime.split(' ')[0]);
                    $('.change-pwd-step').eq(0).find('.step-time').html(detail.creatTime.split(' ')[1]);
                    if(detail.pay_time && detail.pay_status == 1) {
                        $('.change-pwd-step').eq(1).find('.step-date').html(detail.pay_time.split(' ')[0]);
                        $('.change-pwd-step').eq(1).find('.step-time').html(detail.pay_time.split(' ')[1]);
                    }
                    if (detail.order_Status == 1) {
                        htmlStr += '<div class="order-detail-status">待支付</div>';
                        htmlStr += '<div class="order-detail-control">'+
                                        '<a href="order_sec.jsp?orderNo='+orderNo+'&orderAmount='+detail.orderAmount+'&pay_type='+detail.pay_type+'">去支付</a>'+
                                    '</div>';
                        $('.change-pwd-step').eq(0).addClass('current');
                    }
                    if (detail.order_Status == 2) {
                        htmlStr += '<div class="order-detail-status">待發貨</div>';
                        $('.change-pwd-step').eq(0).addClass('past');
                        $('.change-pwd-step').eq(1).addClass('current');
                    }
                    if (detail.order_Status == 3) {
                        htmlStr += '<div class="order-detail-status">商品運輸中</div>';
                        $('.change-pwd-step').eq(0).addClass('past');
                        $('.change-pwd-step').eq(1).addClass('past');
                        $('.change-pwd-step').eq(2).addClass('current');
                    }
                    if (detail.order_Status == 4) {
                        htmlStr += '<div class="order-detail-status">待評論</div>';
                        $('.change-pwd-step').eq(0).addClass('past');
                        $('.change-pwd-step').eq(1).addClass('past');
                        $('.change-pwd-step').eq(2).addClass('past');
                        $('.change-pwd-step').eq(3).addClass('current');
                    }
                    if (detail.order_Status == 5) {
                        htmlStr += '<div class="order-detail-status">已完成</div>';
                        htmlStr += '<div class="order-detail-control">'+
                                        '<a href="">查看發票詳情</a>'+
                                        '<a href="">現在去評論</a>'+
                                        '<a href="">退換貨申請</a>'+
                                    '</div>';
                        $('.change-pwd-step').eq(0).addClass('past');
                        $('.change-pwd-step').eq(1).addClass('past');
                        $('.change-pwd-step').eq(2).addClass('past');
                        $('.change-pwd-step').eq(3).addClass('past');
                        $('.change-pwd-step').eq(4).addClass('current');
                    }
                    if (detail.order_Status == 6) {
                        htmlStr += '<div class="order-detail-status">訂單關閉</div>';
                    }
                    $('#orderStatus').html(htmlStr);
                    /**
                     * 收貨人
                     */
                    var addr = JSON.parse(detail.ressCont);
                    $('#ressName').html(addr.ressName);
                    if (detail.log_type == '1' )  //宅配
                        $('#ressAddr').html(addr.ressAddress);
                    else{   //超商
                        $('#ressAddr').html(addr.stAddr + addr.stName);
                    }
                    $('#ressPhone').html(addr.ressPhoto);
                    /**
                     * 付款信息
                     */
                    $('#payment').html('在線支付');
                    $('#paymentTime').html(detail.pay_time);
                    
                    $('#actualMoney').html(convertCCY(detail.currency_code) + ' '+ detail.orderAmount.toFixed(2));

                    /**
                     * 商品
                     */
                    var prohtml = '';
                    var proList = JSON.parse(detail.jsoncId);
                    var sum = 0;
                    for(var i =0;i < proList.length; i ++) {
                      sum += (proList[i].cNum * proList[i].cPrice);
                      prohtml += '<tr>';
                      prohtml += '<td><a href="product_details.html?id='+proList[i].cId+'&preview=2&language=tc"><img src="'+ proList[i].trade_photo1+'" alt="" /></a></td>';
                      prohtml += '<td>'+
                                 '<p class="order-detail-proname"><a href="product_details.html?id='+proList[i].cId+'&preview=2&language=tc">'+proList[i].cName+'</a></p>'+
                                 '<p class="order-detail-prosku">'+proList[i].cStandard+'</p>'+
                                '</td>';
                      prohtml += '<td>'+proList[i].cId+'</td>';
                      prohtml += '<td>'+ convertCCY(detail.currency_code) +' '+proList[i].cPrice.toFixed(2)+'</td>'
                      prohtml += '<td>'+proList[i].cNum+'</td>'
                      prohtml += '<td>'+
                                  '<div class="order-detail-procontrol">'+
                                    '<a class="detail-addcomment">添加評論</a>'+
                                    '<a class="detail-again" href="product_details.html?id='+proList[i].cId+'&preview=2&language=tc">再次購買</a>'+
                                  '</div>'
                                 '</td>';
                      prohtml += '</tr>'
                    }
                    $('#detailPro').html(prohtml);
                    $('#totalMoney').html(convertCCY(detail.currency_code)+ ' ' + sum.toFixed(2));
                    $('.order-detail-total .cart-total_num span').html(proList.length);
                    $('.order-detail-total #realPrice').html(detail.orderAmount.toFixed(2));
                }
            },
            error: function(data) {

            }
        })
    }
    fetchOrderDetail();
})