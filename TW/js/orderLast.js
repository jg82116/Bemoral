$(function(){
    /**
   * common
   */
  var user_id = sessionStorage.getItem('userId');
  if(!user_id) {
    window.location.href="index.html";
  }

  /**
   * 訂單信息
   */
  function loadOrderDetail() {
    var orderNo = getQueryString("orderNo");
    $('#paymentOrderNo').html(orderNo);
    $.ajax({
      url: '/BeMoralOfficial/order/getOrdersNum.do',
      type: 'POST',
      data: {
        orderNum: orderNo,
        userId: user_id
      },
      dataType: 'JSON',
      success: function(data) {
        if(data.status == 0) {
          var orderInfo = data.data;
          var cartList = JSON.parse(orderInfo.jsoncId);
          var sum = 0;
          for (var i =0;i<cartList.length;i++) {
            sum += (cartList[i].cPrice * cartList[i].cNum);
          }
          $("#cartTotalMoney").text(sum);
          $("#totalPayMoney").text(orderInfo.orderAmount);
          $("#orderDate").html(orderInfo.createTime);
          var addrInfo = JSON.parse(orderInfo.ressCont);
          $("#orderPerson").html(addrInfo.ressName);
          $("#orderPhone").html(addrInfo.ressPhoto);
          $("#orderAddr").html(addrInfo.ressAddress);
          $("#addrProvince").html(addrInfo.ressProvince + addrInfo.ressCity + addrInfo.ressCounty);
        }
      },
      error: function(data) {

      }
    })
  }
  loadOrderDetail();
  $(".btn-check_detail").on('click', function(){
      window.location.href="order_detail.html?orderNo=" + getQueryString("orderNo");
  })
})