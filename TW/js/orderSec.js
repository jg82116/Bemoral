$(function(){
  /**
   * common
   */
  var user_id = sessionStorage.getItem('userId');
  if(!user_id) {
    window.location.href="index.html";
  }
  var urlRes = $("#urlRes").val();
  if(urlRes) {
    cardCheck(urlRes);
  }
  /**
   * 訂單信息
   */
  var globalTotal;
  function loadOrderDetail() {
    var orderNo = getQueryString("orderNo");
    if(!orderNo) {
      orderNo = sessionStorage.getItem("orderNum");
    }
    $('.payment-info_no span').html(orderNo);
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
          var cartList = JSON.parse(orderInfo.jsoncId)
          var sum = 0;
          for (var i =0;i<cartList.length;i++) {
            sum += (cartList[i].cPrice * cartList[i].cNum);
          }
          globalTotal = orderInfo.orderAmount;
          $("#cartMoney").text(sum);
          $("#totalMoney").text(orderInfo.orderAmount);
          if(orderInfo.pay_type == 1 || orderInfo.pay_type == 2) {
            pay(orderInfo.orderAmount, orderInfo.pay_type);
          }else if(orderInfo.pay_type == 4){
			bankpay(orderInfo.orderAmount,orderInfo.order_Status);
		  }
		  else {
            $(".payment-totals").css("display","block");
          }
        }
      },
      error: function(data) {

      }
    })
  }
  loadOrderDetail()
  
  /**
   * 支付
   */
  function pay(total,type) {
    var orderNo = getQueryString("orderNo");
    if(!orderNo) {
      orderNo = sessionStorage.getItem("orderNum");
    }
    $.ajax({
      url: '/BeMoralOfficial/pay/pay.do',
      type: 'POST',
      data: {
        orderNum: orderNo,
        userId: user_id,
        orderAmount: total,
        pay_type: type
      },
      dataType: 'JSON',
      success: function(data) {
        if (data.status == 0) {
          if(type == 1) {
            $(".wechat-scan").show();
            $(".alipay-scan").hide();
          }
          if(type == 2) {
            $(".alipay-scan").show();
            $(".wechat-scan").hide();
          }
          $("#payImg").attr("src", data.data);
          fetchOrderDetail();
        }
      },
      error: function(data) {

      }
    })
  }
  /**
   * 查詢是否成功
   */
  var isRequest = true;
  function fetchOrderDetail() {
    var orderNo = getQueryString("orderNo");
    if(!orderNo) {
      orderNo = sessionStorage.getItem("orderNum");
    }
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
          var intervalFetch;
          if(orderInfo.order_Status == 2) {
            clearInterval(intervalFetch);
            window.location.href='order_last.jsp?orderNo='+ orderNo;
          } else {
            if (isRequest) {
              isRequest = false
              intervalFetch = setInterval(function(){
                fetchOrderDetail()
              }, 10000)
            }
          }
        }
      },
      error: function(data) {

      }
    })
  }
  /**
   * card pay
   */
  function cardpay(total,type) {
    var orderNo = getQueryString("orderNo");
    if(!orderNo) {
      orderNo = sessionStorage.getItem("orderNum");
    }
    $.ajax({
      url: '/BeMoralOfficial/pay/URLEnc.do',
      type: 'POST',
      data: {
        "orderNum": orderNo,
        "orderAmount": total
      },
      dataType: 'JSON',
      success: function(data) {
        if (data.status == 0) {
          console.log(data);
          $("#urlData").val(data.data);
          //setTimeout(function(){
            $("#urlForm").submit();
          //}, 3000);
          // if(type == 1) {
          //   $(".wehcat-scan").show();
          // }
          // if(type == 2) {
          //   $(".alipay-scan").show();
          // }
          // $("#payImg").attr("src", data.data);
        }
      },
      error: function(data) {

      }
    })
  }
  /**
   * bank pay
  */
  function bankpay(total,orderStatus) {
	if(orderStatus == 2){
		var lidm = getQueryString("lidm");
		var xid = getQueryString("xid");
		var purchAmt = getQueryString("purchAmt");
		var orderStatus = getQueryString("orderStatus");
		var respCode = getQueryString("respCode");
		var respMsg = getQueryString("respMsg");
		var traceNumber = getQueryString("traceNumber");
		var traceTime = getQueryString("traceTime");
		var qid = getQueryString("qid");
		var settleAmount = getQueryString("settleAmount");
		var settleCurrency = getQueryString("settleCurrency");
		var settleDate = getQueryString("settleDate");
		var exchangeRate = getQueryString("exchangeRate");
		var exchangeDate = getQueryString("exchangeDate");
		var inMac = getQueryString("inMac");
		  
		$.ajax({
		  url: '/BeMoralOfficial/pay/saveCtLand.do',
		  type: 'POST',
		  data: {
			userId: user_id,
			lidm: lidm,
			xid: xid,
			purchAmt: purchAmt,
			orderStatus: orderStatus,
			respCode:respCode,
			respMsg: respMsg,
			traceNumber: traceNumber,
			traceTime: traceTime,
			qid: qid,
			settleAmount: settleAmount,
			settleCurrency:settleCurrency,
			settleDate: settleDate,
			exchangeRate: exchangeRate,
			exchangeDate: exchangeDate,
			inMac: inMac
		  },
		  dataType: 'JSON',
		  success: function(data) {
			if (data.status == 0) {
			  console.log(data);
			}
		  },
		  error: function(data) {

		  }
		})
		
		window.location.href='order_last.jsp?orderNo='+ orderNo;
	}
	else if(orderStatus == 999){
		var orderNo = getQueryString("orderNo");
		if(!orderNo) {
		  orderNo = sessionStorage.getItem("orderNum");
		}
		
		$.ajax({
		  url: '/BeMoralOfficial/pay/getAuthMac.do',
		  type: 'POST',
		  data: {
			"orderNum": orderNo,
			"orderAmount": total
		  },
		  dataType: 'JSON',
		  success: function(data) {
			if (data.status == 0) {
			  console.log(data);

			  postcall('https://testepos.ctbcbank.com/UPOP/unionPayAuth.do', {lidm:orderNo,purchAmt:total,merId:'12131',inMac:data.data});
			}
		  },
		  error: function(data) {

		  }
		})
	}	  
  }
  
  function postcall(url, params, target){ 
	var tempform = document.createElement("form"); 
	 tempform.action = url; 
	 tempform.method = "post"; 
	 tempform.style.display="none"
	if(target) { 
	 tempform.target = target; 
	 } 

	for (var x in params) { 
	var opt = document.createElement("input"); 
	 opt.name = x; 
	 opt.value = params[x]; 
	 tempform.appendChild(opt); 
	 } 

	var opt = document.createElement("input"); 
	 opt.type = "submit"; 
	 tempform.appendChild(opt); 
	 document.body.appendChild(tempform); 
	 tempform.submit(); 
	 document.body.removeChild(tempform); 
  }
  
  function getQueryString(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r!=null) return (r[2]); return null; 
  }
  
  function cardCheck(data) {
    var orderNo = getQueryString("orderNo");
    if(!orderNo) {
      orderNo = sessionStorage.getItem("orderNum");
    }
    $.ajax({
      url: '/BeMoralOfficial/pay/decryption.do',
      type: 'POST',
      data: {
        "urlResEnc": data,
        userId: user_id
      },
      dataType: 'JSON',
      success: function(data) {
        if (data.status == 0) {
          console.log(data);
          window.location.href='order_last.jsp?orderNo='+ data.data.orderNum;
        } else {
          alert(data.msg);
        }
      },
      error: function(data) {
        alert("出錯了")
      }
    })
  }
  /**
   * 修改支付方式
   */
   $("#payment-button").click(function(){
	   var pay_type = $("input[type=radio]:checked").val();
	   if(pay_type != "undefined" && pay_type != null){
		   if(pay_type == 1 || pay_type == 2) {
			  pay(globalTotal,pay_type);
			  
			}
			else if(pay_type == 4){
			  bankpay(globalTotal,999);
			}
			else {
			  cardpay(globalTotal,pay_type);
			}
	   }
   })
  
  $(".other-payment").on("click", function(){
    $(".payment-totals").show();
  })
  getDays();
  function getDays(){
	  $.ajax({
		  url:"/BeMoralOfficial/day/getDays.do",
		  type:"post",
		  dataType:"json",
		  success:function(data){
			  $(".payment-info_time span").text(data.data.dayDelivery);
		  },
		  error:function(){
			  
		  }
	  })
  }
})