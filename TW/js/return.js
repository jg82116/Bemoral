$(function(){

    /**
     * common
     */
    var user_id = sessionStorage.getItem('userId');
    if(!user_id) {
        window.location.href="index.html";
    }
    var loadReturn = function(){
        $.ajax({
            url: '/BeMoralOfficial/order/getOrderCancelOrderNum.do',
            type: 'POST',
            data: {
                userId: user_id
            },
            dataType: 'JSON',
            success: function(data) {
                if(data.status == 0) {
                    var htmlStr = "";
                    var orderList = data.data;
                    $(".return-nums").html(orderList.length);
                    for(var i =0;i<orderList.length; i++) {
                        htmlStr += '<div class="return-goods-item">'+
                                    '<div class="return-goods-item_hd">'+
                                    '<div class="return-goods-orderno">'+
                                        '<span>退換貨訂單編號</span>'+orderList[i].tocId+
                            '<em>|</em>'+orderList[i].creatTime+
                            '<em>|</em>'+
                            '<span>訂單編號</span>'+orderList[i].orderNum+
                          '</div>'+
                        '</div>'+
                        '<table class="table">'+
                          '<tbody>'+
                            '<tr>'+
                              '<td>'+
                                '<p class="return-goods-name">'+orderList[i].tocPhoto+'</p>'+
                              '</td>'+
                              '<td>'+
                                '<p class="return-goods-name">'+orderList[i].tocEmail+'</p>'+
                                // '<p class="return-goods-sku">85g</p>'+
                                // '<p class="return-goods-num">x1</p>'+
                              '</td>'+
                              '<td>'+
                                '<div class="return-user-message">'+
                                  '<p class="return-user-text">退貨類型：'+orderList[i].tocGenre+'</p>'+
                                  '<p class="return-user-time"></p>'+
                                  '<div class="return-user-imglist"></div>'+
                                '</div>'+
                              '</td>'+
                            '</tr>'+
                          '</tbody>'+
                        '</table>'+
                      '</div>';
                    }
                    $(".return-goods-bd").html(htmlStr);
                } else {
                    alert(data.msg);
                }
            },
            error: function() {
    
            }
        })
    }
    loadReturn();
})