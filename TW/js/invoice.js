$(function(){
    /**
   * 公共
   */
  var user_id = sessionStorage.getItem('userId');
  if(!user_id) {
    window.location.href="index.html";
  }
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
            if(i == 0) {
              htmlStr += '<div class="invoice-item active" data-id="'+alist[i].invoiceCid+'">';
            } else {
              htmlStr += '<div class="invoice-item" data-id="'+alist[i].invoiceCid+'">';
            }
            htmlStr += '<div class="invoice-item_info clearfix">'+
                        '<div class="pull-left invoice-item_hd">'+
                        '<p>買家統編</p>'+
                        '<p>買家姓名</p>'+
                      '</div>'+
                      '<div class="pull-left invoice-item_bd">'+
                      '<p>'+alist[i].buyerIdentifier+'</p>'+
                      '<p>'+alist[i].buyerName+'</p>'+
                   '</div>'+
                 '</div>'+
                 '<div class="more-info invoice-item_info clearfix">'+
                   '<div class="pull-left invoice-item_hd">'+
                        '<p>買家地址</p>'+
                        '<p>買家電話</p>'+
                        '<p>郵箱</p>'+
                        '<p>捐贈註記</p>'+
                        '<p>付款方式</p>'+
                      '</div>'+
                      '<div class="pull-left invoice-item_bd">'+
                      '<p>'+alist[i].buyerAddress+'</p>'+
                      '<p>'+alist[i].buyerTelephoneNumber+'</p>'+
                      '<p>'+alist[i].buyerEmailAddress+'</p>'+
                      '<p>'+donateList[alist[i].donateMark]+'</p>'+
                      '<p>'+payList[parseInt(alist[i].payWay) - 1]+'</p>'+
                   '</div>'+
                 '</div>'+
                 '<p class="invoice-more">'+
                 '<a class="showMore">點擊查看更多 +</a>'+
                 '<a class="showLess">收起 -</a>'+
                 '</p>'+
                 '<p class="invoice-control"><a class="invoice-edit" data-toggle="modal" data-target="#invoiceModal" data-id="' + alist[i].invoiceCid + '">編輯</a>';
				if (alist[i].invoiceDefault == 1) {
					htmlStr += '&nbsp;&nbsp;&nbsp;&nbsp;<a class="invoice-default" data-id="' + alist[i].invoiceCid + '">設為默認</a></p>';
				}
				 
                htmlStr +=  '<span class="invoice-selected">'+
                 '<img src="./images/address_check.png" />'+
                '</span>'+
                '<span class="addressbook-del">'+
                '<img src="./images/address-del.png" />'+
                '</span>'+
                '</div>';
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
   * show more
   */
  $('#invoiceList').on('click', '.showMore', function(){
    $(this).closest('.invoice-item').find('.more-info').fadeIn();
    $(this).hide();
    $(this).closest('.invoice-item').find('.showLess').show();
  })
  $('#invoiceList').on('click', '.showLess', function(){
    $(this).closest('.invoice-item').find('.more-info').fadeOut();
    $(this).hide();
    $(this).closest('.invoice-item').find('.showMore').show();
  })
  
  $('#invoiceList').on('click', '.invoice-item', function(){
    if(!$(this).hasClass('active')) {
      $('.invoice-item').removeClass('active');
      $(this).addClass('active');
    }
  })
  
  /**
   * 發票设置为默认
   */
  $('#invoiceList').on('click', '.invoice-default' , function(){
	var strInvoiceCid = $(this).attr("data-id");
    $.ajax({
      url: '/BeMoralOfficial/invoice/defaultInvoiceInfoTW.do',
      type: 'POST',
      data: {
		userId: user_id,
        invoiceCid: strInvoiceCid
      },
      dataType: 'JSON',
      success: function(data) {
        if(data.status == 0) {
          //alert("設置成功");
		  fetchInvoice();
        }
      },
      error: function(data) {

      }
    })
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
        if(commonAddressId) {
          editInvoice();
        } else {
          createInvoice();
        }
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
    var invoiceDefault = $('#invoiceDefault').prop('checked');
    $.ajax({
      url: '/BeMoralOfficial/invoice/invoiceInfoTW.do',
      type: 'POST',
      data: {
        userId: user_id || "",
        //buyerIdentifier: buyerIdentifier,
	    buyerIdentifier: "",
        buyerName: buyerName,
        buyerAddress: buyerAddress,
        buyerTelephoneNumber: buyerTelephoneNumber,
        buyerEmailAddress: buyerEmailAddress,
        donateMark: donateMark,
        payWay: payWay,
        invoiceDefault: invoiceDefault ? 0 : 1,
		buyerPersonInCharge:"",
		buyerFacsimileNumber:"",
		buyerCustomerNumber:"",
		invoiceType:"",
		carrierType:"",
		carrierId1:"",
		carrierId2:"",
		NPOBAN:"",
		taxType:"1",
		taxRate:"",
		remark:"",
		mailSend:""
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
  /**
     * 編輯發票
     */
    var editInvoice = function () {
      var buyerIdentifier = $('#buyerIdentifier').val();
      var buyerName = $('#buyerName').val();
      var buyerAddress = $('#buyerAddress').val();
      var buyerTelephoneNumber = $('#buyerTelephoneNumber').val();
      var buyerEmailAddress = $('#buyerEmailAddress').val();
      var donateMark = $('#donateMark').val();
      var payWay = $('#payWay').val();
      var invoiceDefault = $('#invoiceDefault').prop('checked');
      $.ajax({
          url: '/BeMoralOfficial/invoice/updateInvoiceInfoTW.do',
          type: 'POST',
          data: {
            userId: user_id || "",
            invoiceCid: commonAddressId,
            //buyerIdentifier: buyerIdentifier,
			buyerIdentifier:"",
            buyerName: buyerName,
            buyerAddress: buyerAddress,
            buyerTelephoneNumber: buyerTelephoneNumber,
            buyerEmailAddress: buyerEmailAddress,
            donateMark: donateMark,
            payWay: payWay,
            invoiceDefault: invoiceDefault ? 0 : 1,
			buyerPersonInCharge:"",
			buyerFacsimileNumber:"",
			buyerCustomerNumber:"",
			invoiceType:"",
			carrierType:"",
			carrierId1:"",
			carrierId2:"",
			NPOBAN:"",
			taxType:"1",
			taxRate:"",
			remark:"",
			mailSend:""
          },
          dataType: "JSON",
          success: function (data) {
              if (data.status == 0) {
                  $('#invoiceModal').modal('hide');
                  fetchInvoice();
              }
          },
          error: function (data) {
          }
      });
  }
  // modal hide時，將modal初始化
    $('#invoiceModal').on('hide.bs.modal', function() {
        var _self = $(this);
        _self.find('.modal-body input').val("");
        $('#invoiceDefault').prop('checked', false);
        commonAddressId = null;
    });
    var commonAddressId ;
  $("#invoiceModal").on('show.bs.modal', function(event) {
    var _self = $(this);
    var button = $(event.relatedTarget);
    var addressId = button.data('id')
    if (addressId) {
        _self.find('.modal-title').text('編輯發票');
        commonAddressId = addressId;
        $.ajax({
            url: '/BeMoralOfficial/invoice/queryByInvoiceCid.do',
            type: 'POST',
            data: {
                invoiceCid: addressId
            },
            dataType: 'JSON',
            success: function(data) {
                if(data.status == 0) {
                    var addressInfo = data.data;
                    _self.find('#buyerIdentifier').val(addressInfo.buyerIdentifier);
                    _self.find('#buyerName').val(addressInfo.buyerName);
                    _self.find('#buyerAddress').val(addressInfo.buyerAddress);
                    _self.find('#buyerTelephoneNumber').val(addressInfo.buyerTelephoneNumber);
                    _self.find('#buyerEmailAddress').val(addressInfo.buyerEmailAddress);
                    _self.find('#donateMark').val(addressInfo.donateMark);
                    _self.find('#payWay').val(addressInfo.payWay);
                    _self.find('#invoiceDefault').prop('checked',addressInfo.invoiceDefault);
                }
            },
            error: function() {
            }
        });
    } else {
        _self.find('.modal-title').text('新增發票');
    }
  });
  var globalList;
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
                if ($('.invoice-order_list').length) {
                    var htmlStr = '';
                    var orderList = orderNum.data;
                    globalList = orderList;
                    for (var i =0; i< orderList.length; i++) {
                        var addr = JSON.parse(orderList[i].ressCont);
                        var proList = JSON.parse(orderList[i].jsoncId);
                        if(orderList[i].order_Status != 1 || orderList[i].order_Status != 6) {
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
                            htmlStr += '<td><p class="history-order_price">NT$ '+proList[j].cPrice+'</p>'+
                                        '<p class="history-order_num">x '+proList[j].cNum+'</p>'+
                                        '</td>';
                                htmlStr += '<td><span class="after-complaint">普通發票</span></td>';
                                htmlStr += '<td></td>';
                                htmlStr += '<td><div class="history-order_control"><a class="check-detail" href="order_detail.html?orderNo='+orderList[i].orderNum+'">查看訂單詳情</a></div></td>';
                            htmlStr += '</tr>';
                        }
                        htmlStr += '</tbody></table></div>';
                        htmlStr += '<div class="history-order_operation">';
                        htmlStr += '<button class="btn btn-comment" data-index="'+i+'" data-id="'+orderList[i].invoice+'" data-date="'+orderList[i].creatTime+'">申請發票</button>';
                        htmlStr += '</div>';
                        htmlStr += '</div>';
                    }
                  }
                    $('.invoice-order_list').html(htmlStr);
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
 * 申請
 */
$('.invoice-order_list').on('click', '.btn-comment', function(){
  var orderId = $(this).closest('.history-order_item').data('orderno');
  var orderDate = $(this).data('date').split(' ')[0].replace(/-/g,"/");
  //var id = $(this).data('id');
  var id = $('.invoice-item.active').attr('data-id');
  var index = $(this).data('index');
  var pro = JSON.parse(globalList[index].jsoncId);
  var proList = pro.map(function(item){
    return {
      ProductionCode: item.cId,
      Description: item.cName,
      Quantity: item.cNum,
      UnitPrice: item.cPrice,
      DType: 'TN'
    }
  })
  $.ajax({
    url: '/BeMoralOfficial/invoice/createInvoice.do',
    type: 'POST',
    data: {
      OrderId: orderId,
      OrderDate: orderDate,
      invoiceCid: id,
      productDetail: JSON.stringify(proList)
    },
    dataType: 'JSON',
    success: function(data) {
        if(data.status == 0) {
          alert('開票成功')
        } else {
          alert(data.msg)
        }
    },
    error: function() {
      alert('開票失敗')
    }
});
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
      window.location.href = "my_invoice.html?page=" + page;
  }
  /**
     * 刪除發票
     */
    var deleteAddress = function() {
      var _self = $(this);
      var addressId = _self.closest('.invoice-item').data('id');
      $.ajax({
          url: '/BeMoralOfficial/invoice/deleteInvoiceInfoTW.do',
          type: 'POST',
          data: {
              userId: user_id,
              invoiceCid: addressId
          },
          dataType: 'JSON',
          success: function(data) {
              if(data.status == 0) {
                  fetchInvoice();
              }
          },
          error: function(err) {
          }
      });
  }
  $("#invoiceList").on('click', '.addressbook-del', deleteAddress);
})