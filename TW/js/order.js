
$(function(){
  /**
   * 公共
   */
  
  var user_id = sessionStorage.getItem('userId');
  if(!user_id) {
    window.location.href="index.html";
  }

  var language = getCookie("language");
  var orderComplete = 'N';
  /**
   * 生成orderNo
   */
  function guid() {    
    function S4() {       
      return (((1+Math.random())*0x10000)|0).toString(16).substring(1);    
    }    
    return (S4()+S4()+S4()+S4()+S4()).substr(0,19);
  }
  var monthStr = ['一月','二月', '三月','四月','五月','六月',
  '七月','八月','九月','十月','十一月','十二月'];
  function getNow() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minutes = date.getMinutes();
    return hour + ':' +minutes + ' ' + month + '-' + day +',' + year;
  }
  var orderNo = guid();
  var log_type = 1;
  if($("#orderInitNo").val()) {
    orderNo = $("#orderInitNo").val();
    $("#linkmapBtn").tab("show");
    $("#addressModal2").modal("show");
    $('#stCate').val($('#orderstCate').val());
    $('#stCode').val($('#orderstCode').val());
    $('#stName').val($('#orderstName').val());
    $('#stAddr').val($('#orderstAddr').val());
    $('#stTel').val($('#orderstTel').val());
    // $(".self-goods").show();
    log_type = 0;
  }
  var nowDate = getNow();
  $('.order-date').html(nowDate);
  $('.order-no span').html(orderNo);
  $("#processID").val(orderNo);
  $("#addrTab a").click(function(e){
    e.preventDefault();
    $(this).tab("show");
    if($(this).attr("id") == "linkmapBtn") {
      log_type = 0;
    } else {
      log_type = 1;
    }
    fetchAllAddress();
  })
  /**
   * 加載商品
   */
  function loadProduct() {
    var clist = localStorage.getItem('checkedList') && JSON.parse(localStorage.getItem('checkedList'));
    if(clist && clist.length) {
      var htmlStr = '';
      var mhtml = '';
      var sum = 0;
      var num = 0;
      for (var i = 0; i< clist.length; i++) {
        htmlStr += '<tr data-id="'+clist[i].cId+'"><td>';
        htmlStr += '<a href="product_details.html?id='+clist[i].cId+'&preview=2&language=tc"><img src="'+clist[i].trade_photo1+'" /></a>';
        htmlStr += '</td>';
        htmlStr += '<td>';
        htmlStr += '<p class="paid-pro_name"><a href="product_details.html?id='+clist[i].cId+'&preview=2&language=tc">' + clist[i].cName + '</a></p>';
        htmlStr += '<p class="paid-pro_sku">' + clist[i].cStandard + '</p>';
        htmlStr += '</td>';
        htmlStr += '<td>';
        htmlStr += '<p class="padi-pro_price">NT$ '+clist[i].cPrice+'<span class="discount-info"></span></p>';
        htmlStr += '</td>';
        htmlStr += '<td>x ';
        htmlStr += ''+clist[i].cNum+'</td>';
        htmlStr += '<td>';
        htmlStr += '<p class="paid-pro_price">NT$ '+(clist[i].cNum * clist[i].cPrice)+'</p>';
        htmlStr += '<p class="paid-origin_price"></p></td>';
        htmlStr += '<tr>';
        sum += (clist[i].cPrice * clist[i].cNum);
        num += 1;
      }
      for (var i = 0; i< clist.length; i++) {
        mhtml += '<div class="morder-cart-item clearfix" data-id="'+clist[i].cId+'">'+
                 '<div class="morder-cart-img">'+
                  '<img src="'+clist[i].trade_photo1+'" alt="" />'+
                 '</div>'+
                 '<div class="morder-cart-info">'+
                  '<p class="morder-pro-name">'+clist[i].cName+'</p>'+
                  '<p class="morder-pro-sku">'+clist[i].cStandard+'</p>'+
                    '<div class="morder-pro-price clearfix">'+
                    '<span>NT$ <em class="morder-single-price">'+clist[i].cPrice+'</em></span>'+
                    '<span class="morder-pro-num">x '+clist[i].cNum+'</span>';
          mhtml += '</div>'+
                  '</div>'+
                '</div>';
      }
      $('.paid-product tbody').html(htmlStr);
      $('.morder-cart-list').html(mhtml);
      $(".cart-total_num span").html(num);
      $("#totalPrice").html('NT$ '+sum);
      $("#mcartTotal").html(sum);
      $("#mActualTotal").html(sum);
      $("#realPrice").html(sum);
    }
  }
  loadProduct();
  /**
   * 全部收货地址
   */
  var fetchAllAddress = function(){
    $.ajax({
      url: '/BeMoralOfficial/address/getAddress.do',
      type: 'POST',
      data: {
        userId: user_id,
        log_type: log_type
      },
      dataType: 'JSON',
      success: function(data) {
        if(data.status == 0) {
          var alist = data.data;
          alist.sort(function(a, b) {
            return b.ressDefault - a.ressDefault;
          })
          var htmlStr = '';
          if(log_type==1){
            for (var i =0; i < alist.length; i++) {
              htmlStr += '<li>';
              htmlStr += i == 0 ?'<div class="address-item active" data-id="'+alist[i].ressId+'">' : '<div class="address-item" data-id="'+alist[i].ressId+'">';
              htmlStr += '<div class="address-item_info">';
              htmlStr += '<p class="address-item_name">'+alist[i].ressName+'</p>';
              htmlStr += '<p class="address-item_phone"><span>886</span>'+alist[i].ressPhoto+'</p>';
              htmlStr += '</div><div  class="address-item_detail">';
              htmlStr += '<p class="addr-detail">'+alist[i].ressAddress+'</p>'+
              '<p class="addr-city">'+alist[i].ressCounty+'</p>'+
              '<p class="addr-county">'+alist[i].ressProvince + alist[i].ressCity +'</p>';
              htmlStr += '</div>';
              htmlStr += '<span class="checked-addr">'+
              '<img src="./images/address_check.png" alt="">'+
              '</span>';
              htmlStr += '</div></li>';
            }
          } else{
            for (var i =0; i < alist.length; i++) {
              htmlStr += '<li>';
              htmlStr += i == 0 ?'<div class="address-item active" data-id="'+alist[i].ressId+'">' : '<div class="address-item" data-id="'+alist[i].ressId+'">';
              htmlStr += '<div class="address-item_info">';
              htmlStr += '<p class="address-item_name">'+alist[i].ressName+'</p>';
              htmlStr += '<p class="address-item_phone"><span>886</span>'+alist[i].ressPhoto+'</p>';            
              htmlStr += '</div><div  class="address-item_detail">';
              // htmlStr += '<p class="addr-stCode">門市代號: '+alist[i].stCode+'</p>'+
              // '<p class="addr-stCate">通路代碼: '+alist[i].stCate+'</p>';
              htmlStr +='<p class="addr-stName">'+alist[i].stName+'</p>';
              htmlStr +='<p class="addr-stTel"><span>886</span>'+alist[i].stTel+'</p>';
              htmlStr += '<p class="addr-detail">'+alist[i].stAddr+'</p>'+
              '<p class="addr-city">'+alist[i].ressCounty+'</p>'+
              '<p class="addr-county">'+alist[i].ressProvince + alist[i].ressCity +'</p>';
              htmlStr += '</div>';
              htmlStr += '<span class="checked-addr">'+
              '<img src="./images/address_check.png" alt="">'+
              '</span>';
              htmlStr += '</div></li>';
            }
          }
          if(log_type == 1) {
            $('#addrList').html(htmlStr);
            $('#addrList').find('li:gt(2)').hide();
          } else {
            $('#linkAddrList').html(htmlStr);
            $('#linkAddrList').find('li:gt(2)').hide();
          }
          if(alist.length > 3) {
            $('.more-address').show();
          } else {
            $('.more-address').hide();
          }
        } else {
          
        }
      },
      error: function() {

      }
    })
  }
  fetchAllAddress()
  $('#moreAddress').on('click', function(){
    if($(this).find('img').hasClass('active')) {
      $(this).parent().find('#addrList').find('li:gt(2)').hide();
      $(this).find('span').html('顯示更多地址信息');
      $(this).find('img').removeClass('active');
    } else {
      $(this).parent().find('#addrList').find('li').show();
      $(this).find('span').html('收起');
      $(this).find('img').addClass('active');
    }
  })
  $('#moreAddress1').on('click', function(){
    if($(this).find('img').hasClass('active')) {
      $(this).parent().find('#linkAddrList').find('li:gt(2)').hide();
      $(this).find('span').html('顯示更多地址信息');
      $(this).find('img').removeClass('active');
    } else {
      $(this).parent().find('#linkAddrList').find('li').show();
      $(this).find('span').html('收起');
      $(this).find('img').addClass('active');
    }
  })
  $('#moreInvoice').on('click', function(){
    if($(this).find('img').hasClass('active')) {
      $(this).parent().find('#invoiceList').find('li:gt(1)').hide();
      $(this).find('span').html('顯示更多發票信息');
      $(this).find('img').removeClass('active');
    } else {
      $(this).parent().find('#invoiceList').find('li').show();
      $(this).find('span').html('收起');
      $(this).find('img').addClass('active');
    }
  });
  /**
   * 選擇地址
   */
  $('#addrList').on('click', '.address-item', function(){
    $(this).addClass('active').parent().siblings().find('.address-item').removeClass('active');
  })
  $('#linkAddrList').on('click', '.address-item', function(){
    $(this).addClass('active').parent().siblings().find('.address-item').removeClass('active');
  })
  /**
     * 選擇
     */
    $('.addr-home').on('click', function(){
      $(this).addClass('active');
      $(this).closest(".form-group").find('.addr-office').removeClass('active');
      $(this).closest(".form-group").find("#addrType").val($(this).html())
  })
  $('.addr-office').on('click', function(){
      $(this).addClass('active');
      $(this).closest(".form-group").find('.addr-home').removeClass('active');
      $(this).closest(".form-group").find("#addrType").val($(this).html())
  })
  /**
   * 新增地址
   */
  var createAddress = function() {
    var city = $('#addrCity').val();
    var county = $('#addrCounty').val();
    var code = $('#addrCode').val();
    var name = $('#addrName').val();
    var addrDetail = $('#addrDetail').val();
    var tel = $('#addrTel').val();
    var addrPhone = $('#addrPhone').val();
    var addrEmail = $('#addrEmail').val();
    var addrType = $('#addrType').val();
    // var stCate = $('#stCate').val();
    // var stCode = $('#stCode').val();
    // var stName = $('#stName').val();
    // var stAddr = $('#stAddr').val();
    // var stTel = $('#stTel').val();
    var phone_country_code = $('#phone_country_code').val();
    var addrDefault = $('#addrDefault').prop('checked');
    $.ajax({
      url: '/BeMoralOfficial/address/addAddress.do',
      type: 'POST',
      data: {
        userId: user_id,
        log_type: '1',
        ressProvince: '台灣',
        ressDeliveryCode: code,
        ressCity: city,
        ressCounty: county,
        ressName: name,
        ressAddress: addrDetail,
        ressSeatPhoto: tel,
        ressPhoto: addrPhone,
        ressEmail: addrEmail,
        ressAddressName: addrType,
        ressDefault: addrDefault ? 1 : 0,
        stCate: '',
        stCode: '',
        stName: '',
        stAddr: '',
        stTel: '',
        phone_country_code: phone_country_code.substr(2)
      },
      dataType: "JSON",
      success: function(data) {
        if (data.status == 0) {
          $('#addressModal').modal('hide');
          $("#addrForm").clearForm();
          fetchAllAddress();
        } else {
          alert(data.msg);
        }
      },
      error: function(data) {
        alert("出錯了")
      }
    })
  }
  $('#addrForm').validate({
    rules: {
      ressCity: "required",
      ressName: "required",
      ressCounty: "required",
      ressPhoto: "required",
      ressAddress: "required",
    },
    messages: {
      ressCity: "請填寫區",
      ressCounty: "請填寫區",
      ressName: "請填寫姓名",
      ressPhoto: "請填寫手機號",
      ressAddress: "請填寫詳細地址"
    },
    success: "valid",
    submitHandler: function(form) {
      console.log("2");
      $(form).ajaxSubmit(function(){
        createAddress();
      })
      return false;
    }
  })
  /**
   * 新增商超地址
   */
  var createSelfAddress = function() {

    var name = $('#self_addrName').val();
    // var addrDetail = $('#addrDetail').val();
    var tel = $('#self_addrTel').val();
    var addrPhone = $('#self_addrPhone').val();
    var addrEmail = $('#self_addrEmail').val();
    var addrType = $('#self_addrType').val();
    var stCate = $('#stCate').val();
    var stCode = $('#stCode').val();
    var stName = $('#stName').val();
    var stAddr = $('#stAddr').val();
    var stTel = $('#stTel').val();
    var phone_country_code = $('#self_phone_country_code').val();
    var addrDefault = $('#self_addrDefault').prop('checked');
    $.ajax({
      url: '/BeMoralOfficial/address/addAddress.do',
      type: 'POST',
      data: {
        userId: user_id,
        // log_type: log_type,
        log_type:'0',
        ressProvince: '台灣',
        ressDeliveryCode: "",
        ressCity: '',
        ressCounty: '',
        ressName: name,
        ressAddress: '',
        ressSeatPhoto: tel,
        ressPhoto: addrPhone,
        ressEmail: addrEmail,
        ressAddressName: addrType,
        ressDefault: addrDefault ? 1 : 0,
        stCate: stCate,
        stCode: stCode,
        stName: stName,
        stAddr: stAddr,
        stTel: stTel,
        phone_country_code: phone_country_code.substr(2)
      },
      dataType: "JSON",
      success: function(data) {
        if (data.status == 0) {
          $('#addressModal2').modal('hide');
          $("#self_addrForm").clearForm();
          fetchAllAddress();
        } else {
          alert(data.msg);
        }
      },
      error: function(data) {
        alert("出錯了")
      }
    })
  }
  $('#self_addrForm').validate({
    rules: { 
      ressName: "required",
      ressPhoto: "required",
    },
    messages: {    
      ressName: "請填寫姓名",
      ressPhoto: "請填寫手機號", 
    },
    success: "valid",
    submitHandler: function(form) {
      console.log("self_adress");
      $(form).ajaxSubmit(function(){
        createSelfAddress();
      })
      //return false;
    }
  })
  
  var urlRes = $("#urlRes").val();
  if(urlRes) {
    cardCheck(urlRes);
  }
  /**
   * 結賬
   */
  var isPc = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
  $('#checkout').on('click', function(){
    if (orderComplete == 'Y'){
      window.location.href="order_detail.html?orderNo="+orderNo ;
      return false;
    }
    var orderNo = $('.order-no span').html();
	sessionStorage.setItem("orderNum",orderNo);
    var addrId = $(".addr-type").find(".tab-pane.active").find('.address-item.active').data('id');
    var orderAmount = $('#realPrice').text();
    var cartList = localStorage.getItem('checkedList');
    var payType = $('input[type=radio]:checked').val();
    var bankType;
    if($('input[type=radio]:checked').parent().hasClass("bank-card")) {
      bankType = "bank";
    }
    if(!cartList || !cartList.length) {
      alert("请添加商品")
      return;
    }
    if(!addrId) {
      alert('請選擇收貨地址')
      return
    }
    if(!payType) {
      alert('請選擇支付方式')
      return
    }
    var checkedInvoice = $('#needInvoice').prop('checked');
    var invoiceId = $('.invoice-item.selected').data('id');
    $.ajax({
      url: '/BeMoralOfficial/order/addOrders.do',
      type: 'POST',
      data: {
        userId: user_id,
        log_type: log_type,
        orderNum: orderNo,
        ressId: addrId,
        invoice: checkedInvoice ? invoiceId : '' ,
        orderAmount: orderAmount,
        pay_type: payType,
        jsoncId: cartList,
        isPC: isPc ? 0 : 1,
        isLand: 1,
        currency_code: language,
      },
      dataType: 'JSON',
      success: function(data) {
        if(data.status == 0) {
          localStorage.removeItem('checkedList')
          orderComplete = 'Y';
          var orderInfo = data.data;
		      if(payType=="5"){
			      cardpay(orderInfo.orderNum,orderInfo.orderAmount);
		      }else if(payType=="4"){
			      bankpay(orderInfo.orderNum,orderInfo.orderAmount);
		      }else{ 
			      window.location.href=`order_sec.jsp?orderNo=${orderInfo.orderNum}&orderAmount=${orderInfo.orderAmount}&pay_type=${orderInfo.pay_type}`;
		      }
		    } else {
          alert(data.msg);
        }
      },
      error: function(data) {

      }
    })
  })
    /**
   * card pay
   */
  function cardpay(orderNo,total) {
   
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
          
        }else{
          alert(data.msg);
          window.location.href="order_detail.html?orderNo="+orderNo ;
        }
      },
      error: function(data) {

      }
    })
  }
  
  /**
   * bank pay
  */
  function bankpay(orderNo,total) {
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
   * 獲取發票
   */
  var needInvoice = $('#needInvoice').prop('checked');
  if(!needInvoice) {
    $('#invoiceContent').hide();
  }
  $('#needInvoice').on('click', function(){
    if($(this).prop('checked')) {
      $('#invoiceContent').fadeIn();
    } else {
      $('#invoiceContent').fadeOut();
    }
  })
  var donateList = ['载具', '捐赠', '纸本'];
  var payList = ['現金', 'ATM', '信用卡', '超商代收', '其他'];
  var fetchInvoice = function(){
    $.ajax({
      url: '/BeMoralOfficial/invoice/qInvoiceInfoByUserId.do',
      type: 'POST',
      data: {
        userId: user_id
      },
      dataType: 'JSON',
      success: function(data) {
        if(data.status == 0) {
          var alist = data.data;
          alist.sort(function(a, b) {
            return a.invoiceDefault - b.invoiceDefault;
          })
          var htmlStr = '';
          for(var i = 0; i< alist.length; i++) {
            htmlStr += '<li>';
            if(i == 0) {
              htmlStr += '<div class="invoice-item selected" data-id="'+alist[i].invoiceCid+'">';
            } else {
              htmlStr += '<div class="invoice-item" data-id="'+alist[i].invoiceCid+'">';
            }
            htmlStr += '<div class="invoice-bd clearfix">'+
                        '<div class="invoice-bd_title pull-left">'+
                        '<div class="invoice-address">'+
                        '<p>買家統編</p>'+
                        '<p>買家姓名</p>'+
                        '<p>買家地址</p>'+
                        '</div>'+
                        '<div class="invoice-bank">'+
                        '<p>買家電話</p>'+
                        '<p>郵箱</p>'+
                        '<p>捐贈註記</p>'+
                        '<p>付款方式</p>'+
                      '</div>'+
                    '</div>'+
                    '<div class="invoice-bd_info pull-left">'+
                    '<div class="invoice-address_con">'+
                    '<p>'+alist[i].buyerIdentifier+'</p>'+
                    '<p>'+alist[i].buyerName+'</p>'+
                    '<p class="invoice-addr">'+
                      '<span>'+alist[i].buyerAddress+'</span>'+
                    '</p>'+
                  '</div>'+
                  '<div class="invoice-bank_con">'+
                    '<p>'+alist[i].buyerTelephoneNumber+'</p>'+
                    '<p>'+alist[i].buyerEmailAddress +'</p>'+
                    '<p>'+donateList[alist[i].donateMark]+'</p>'+
                    '<p>'+payList[parseInt(alist[i].payWay) - 1]+'</p>'+
                  '</div>'+
                '</div>'+
              '</div>'+
              '<span class="checked-invoice">'+
                '<img src="./images/address_check.png" alt="">'+
              '</span>'+
            '</div>'+
          '</li>';
          }
          $('#invoiceList').html(htmlStr);
          $('#invoiceList').find('li:gt(1)').hide();
        } else {
          
        }
      },
      error: function() {

      }
    })
  }
  fetchInvoice();
  /**
   * 選擇發票
   */
  $('#invoiceList').on('click', '.invoice-item', function(){
    $(this).addClass('selected').parent().siblings().find('.invoice-item').removeClass('selected');
  })
  /**
   * 新增發票
   */
  $('#paperInvoice').on('click', function(){
    if(!$(this).hasClass('active')) {
      $('.invoice-type').removeClass('active');
      $(this).addClass('active');
    }
  })
  $('#eletricInvoice').on('click', function(){
    if(!$(this).hasClass('active')) {
      $('.invoice-type').removeClass('active');
      $(this).addClass('active');
    }
  })
  $('.invoice-content-type').on('click', function(){
    if(!$(this).hasClass('active')) {
      $('.invoice-content-type').removeClass('active');
      $(this).addClass('active');
    }
  })
  $('#invoiceForm').validate({
    rules: {
      buyerEmailAddress: "required",
      buyerName: "required"
    },
    message: {
      buyerEmailAddress: "請填寫郵箱",
      buyerName: "請填寫買家姓名"
    },
    success: "valid",
    submitHandler: function(form) {
      $(form).ajaxSubmit(function(){
        createInvoice()
      })
    }
  })
  var createInvoice = function() {
    var buyerIdentifier = $('#buyerIdentifier').val();
    var buyerName = $('#buyerName').val();
    var buyerAddress = $('#buyerAddress').val();
    var buyerTelephoneNumber = $('#buyerTelephoneNumber').val();
    var buyerEmailAddress = $('#buyerEmailAddress').val();
    var donateMark = $('#donateMark').val();
    var payWay = $('#payWay').val();
    $.ajax({
      url: '/BeMoralOfficial/invoice/invoiceInfoTW.do',
      type: 'POST',
      data: {
        userId: user_id || "",
        buyerIdentifier: buyerIdentifier,
        buyerName: buyerName,
        buyerAddress: buyerAddress,
        buyerTelephoneNumber: buyerTelephoneNumber,
        buyerEmailAddress: buyerEmailAddress,
        donateMark: donateMark,
        payWay: payWay,
        invoiceDefault:"1",
      },
      dataType: 'JSON',
      success: function(data) {
        if(data.status == 0) {
          $('#invoiceModal').modal('hide');
          fetchInvoice();
        }
      },
      error: function(data) {

      }
    })
  }
})