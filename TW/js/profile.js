var browser={  
  versions:function(){   
   var u = navigator.userAgent, app = navigator.appVersion;   
   return {
      trident: u.indexOf('Trident') > -1, //IE内核  
      presto: u.indexOf('Presto') > -1, //opera内核  
      webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核  
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核  
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端  
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端  
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器  
      iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器  
      iPad: u.indexOf('iPad') > -1, //是否iPad    
      webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部  
      weixin: u.indexOf('MicroMessenger') > -1, //是否微信   
      qq: u.match(/\sQQ/i) == " qq" //是否QQ  
    };  
 }(),  
 language:(navigator.browserLanguage || navigator.language).toLowerCase()  
}


/*
 * mobile端查询用户信息
 * 
 * */
function getUserInfo(user_id){
	
}
/*
 * mobile端查询各状态的数量
 * 
 * */
function getOrderCount(userId){
	$.ajax({
		url: '/BeMoralOfficial/order/getCounts.do',
		type: 'POST',
		data: {
			userId: userId
		},
		dataType: 'JSON',
		success: function(data) {
			if(data.status == 0) {
				var orderNum = data.data;
				if(orderNum.gocount != 0){
					$(".menus-status-common").eq(0).find(".common-icon").html(orderNum.gocount);
					$(".menus-status-common").eq(0).find(".common-icon").css("display","flex");
				}
				if(orderNum.incount != 0){
					$(".menus-status-common").eq(1).find(".common-icon").html(orderNum.incount);
					$(".menus-status-common").eq(1).find(".common-icon").css("display","flex");
				}
				if(orderNum.evaluatecount != 0){
					$(".menus-status-common").eq(2).find(".common-icon").html(orderNum.evaluatecount);
					$(".menus-status-common").eq(2).find(".common-icon").css("display","flex");
				}
			} else {
			
			}
		},
		error: function() {

		}
	})
}
/*
 * mobile端查询收藏夹数量
 * 
 * */
function getFavoriteAll(userId){
	$.ajax({
		url: '/BeMoralOfficial/favorite/getFavoriteAll.do',
		type: 'POST',
		data: {
			userId: userId
		},
		dataType: 'JSON',
		success: function(data) {
			if(data.status == 0) {
				if(data.data.length != 0){
					$(".menus-status-common").eq(3).find(".common-icon").css("display","flex");
					$(".menus-status-common").eq(3).find(".common-icon").html(data.data.length);
				}
			} else {
			
			}
		},
		error: function() {

		}
	})
}

/*
 * 跳转管理
 * 
 * */
function skipList(){
	$("#myOrder").click(function(){
		sessionStorage.setItem('orderStatus', 0);
		window.location.href = "my_order.html";
	})
	$(".menus-status-common").eq(0).click(function(){
		sessionStorage.setItem('orderStatus', 1);
		window.location.href = "my_order.html";
	})
	$(".menus-status-common").eq(1).click(function(){
		sessionStorage.setItem('orderStatus', 3);
		window.location.href = "my_order.html";
	})
	$(".menus-status-common").eq(2).click(function(){
		sessionStorage.setItem('orderStatus', 4);
		window.location.href = "my_order.html";
	})
	$(".menus-status-common").eq(3).click(function(){
		window.location.href = "my_collection.html";
	})
	$(".menus-list-ul .menus-list-li").eq(0).click(function(){
		window.location.href = "my_order.html";
	})
	$(".menus-list-ul .menus-list-li").eq(1).click(function(){
		window.location.href = "my_coupon.html";
	})
	$(".menus-list-ul .menus-list-li").eq(2).click(function(){
		window.location.href = "my_message.html";
	})
	$(".menus-list-ul .menus-list-li").eq(3).click(function(){
		window.location.href = "my_invoice.html";
	})
	$(".menus-list-ul .menus-list-li").eq(4).click(function(){
		window.location.href = "my_score.html";
	})
	$(".menus-list-ul .menus-list-li").eq(5).click(function(){
		window.location.href = "return_goods.html";
	})
	$(".menus-list-ul .menus-list-li").eq(6).click(function(){
		window.location.href = "my_info.html";
	})
	$(".menus-list-ul .menus-list-li").eq(7).click(function(){
		window.location.href = "change_pwd.html";
	})
	$(".menus-list-ul .menus-list-li").eq(8).click(function(){
		window.location.href = "my_address.html";
	})
}

$(function(){
    var user_id = sessionStorage.getItem('userId');
    if(!user_id) {
        window.location.href="index.html";
    }
    var userInfo = sessionStorage.getItem('userInfo') && JSON.parse(sessionStorage.getItem('userInfo'));
	var headImgUrl = sessionStorage.getItem('headImgUrl');
    if(userInfo) {
        $('.account-welcome span').html(userInfo.username);
		$(".nikename-name span").eq(1).html(userInfo.username);
    }
	if(headImgUrl!="null" && headImgUrl != ""){
		$('.title-ig12-image img').attr('src',headImgUrl);
		//$('.account-avatar_img img').attr('src',headImgUrl);
		//$('.account-avatar_img img').css('width',"221px");
	}
	if(browser.versions.mobile || browser.versions.android || browser.versions.iPhone){ 
    	getOrderCount(user_id);
		getFavoriteAll(user_id);
		skipList();
    }else{
		var width = $(".order-report").width();
		var mwidth1 = $(".order-report li").eq(0).width();
		var mwidth2 = $(".order-report li").eq(1).width();
		var mwidth3 = $(".order-report li").eq(2).width();
		var mwidth4 = $(".order-report li").eq(3).width();
		var mwidth5 = $(".order-report li").eq(4).width();
		var marginWidth = (width - mwidth1 - mwidth2 - mwidth3 - mwidth4 - mwidth5) / 5;
		$(".order-report li").css({
			marginRight: marginWidth + 'px'
		})
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
			var month = date.getMonth() + 1;
			var day = date.getDate();
			var hour = date.getHours();
			var minutes = date.getMinutes();
			return hour + ':' + formatNumber(minutes) + ' ' + month + '-' + day +',' + year;
		}
		/**
		 * 查詢數量
		 */
		function fetchNumber() {
			$.ajax({
				url: '/BeMoralOfficial/order/getCounts.do',
				type: 'POST',
				data: {
					userId: user_id
				},
				dataType: 'JSON',
				success: function(data) {
					if(data.status == 0) {
						var orderNum = data.data;
						$('#payNumber').text(orderNum.gocount);
						$('#deliveryNumer').text(orderNum.sendcount);
						$('#receiveNumber').text(orderNum.incount);
						$('#commentNumer').text(orderNum.evaluatecount);
					} else {
					
					}
				},
				error: function() {
		
				}
			})
			$.ajax({
				url: '/BeMoralOfficial/order/getOrdersAll.do',
				type: 'POST',
				data: {
					userId: user_id,
					order_Status: 0,
					pageIndex: 1,
					pageSize: 10
				},
				dataType: 'JSON',
				success: function(data) {
					if(data.status == 0) {
						var orderNum = data.data;
						$('#allNumber').text(orderNum.totalNum);
					} else {
					
					}
				},
				error: function() {
		
				}
			})
		}
		function fetchTotal(status) {
			$.ajax({
				url: '/BeMoralOfficial/order/getOrdersAll.do',
				type: 'POST',
				data: {
					userId: user_id,
					order_Status: status || 0,
					pageIndex: getQueryString("page") || 1,
					pageSize: 10
				},
				dataType: 'JSON',
				success: function(data) {
					if(data.status == 0) {
						var orderNum = data.data;
						// $('#allNumber').text(orderNum.totalNum);
						if ($('#latestOrder').length) {
							var htmlStr = '';
							var orderList = orderNum.data;
							console.log(orderList);
							for (var i =0; i< orderList.length; i++) {
								htmlStr += '<div class="latest-order_item" data-orderno="'+orderList[i].orderNum+'"><div class="latest-order_title clearfix">';
								htmlStr += '<div class="pull-left">訂單編號 '+orderList[i].orderNum+'</div>';
								htmlStr += '<div class="pull-right">'+convertDate(orderList[i].creatTime)+'</div>';
								htmlStr += '</div>';
								htmlStr += '<div class="latest-order_content"><table class="table"><tbody>';
								var proList = JSON.parse(orderList[i].jsoncId);
								for (var j =0; j< proList.length; j++) {
									htmlStr += '<tr>';
									htmlStr += '<td><a href="product_details.html?id='+proList[j].cId+'&preview=2&language=tc"><img src="'+proList[j].trade_photo1+'" alt=""></a></td>';
									htmlStr += '<td><p class="latest-order_name"><a href="product_details.html?id='+proList[j].cId+'&preview=2&language=tc">'+proList[j].cName+'</a></p>'+
												'<p class="latest-order_sku">'+proList[j].cStandard+'</p></td>';
									htmlStr += '<td><p class="latest-order_price">NT$ '+proList[j].cPrice.toFixed(2)+'</p>'+
												'<p class="latest-order_num">x '+proList[j].cNum+'</p>'+
												'</td>';
									if (j == 0) {
										htmlStr += '<td> <span class="latest-order_total">NT$ '+orderList[i].orderAmount.toFixed(2)+'</span>'+
												   '<p class="latest-order_origin"></p>'+
												   '<span class="latest-order_shipping">（郵費 NT$ 0.00）</span></td>';
										htmlStr += '<td><div class="latest-order_control">';
										if (orderList[i].order_Status == 1) {
											htmlStr += '<span class="order-status-text">待支付</span>';
										}
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
										htmlStr += '<a class="check-detail" href="order_detail.html?orderNo='+orderList[i].orderNum+'">查看訂單詳情</a>';
										if (orderList[i].order_Status >= 2 && orderList[i].order_Status < 6 ) {
											htmlStr += '<a class="return-apply">退換貨申請</a>';
										}
										if (orderList[i].order_Status == 1) {
											htmlStr += '<a class="cancel-order">取消訂單</a>';
										}
										if (orderList[i].order_Status == 2) {
											htmlStr += '';
										}
										if (orderList[i].order_Status == 3) {
											htmlStr += '<a class="express-check" href="order_detail.html?orderNo='+orderList[i].orderNum+'">物流查詢</a>';
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
									htmlStr += '<div class="latest-order_operation">';
									htmlStr += '<button class="btn btn-comment">我要評論</button>';
									htmlStr += '</div>';
								}
								if (orderList[i].order_Status == 3) {
									htmlStr += '<div class="latest-order_operation">';
									htmlStr += '<button class="btn confirm-order">確認收貨</button>';
									htmlStr += '</div>';
								}
								htmlStr += '</div>';
							}
							$('#latestOrder').html(htmlStr);
							setPage(10, getQueryString("page") || 1,orderNum.totalNum);
						}
					} else {
					
					}
				},
				error: function() {
		
				}
			})
		}
		fetchNumber();
		fetchTotal();
		/**
		 * 取消訂單
		 */
		$('#latestOrder').on('click', '.cancel-order', function(e){
			e.preventDefault();
			var orderNo = $(this).closest('.latest-order_item').data('orderno');
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
						fetchTotal();
						alert('取消成功');
					}
				},
				error: function() {
				}
			})
		})
		/**
		 * 確認成功
		 */
		$('#latestOrder').on('click', '.confirm-order', function(e){
			e.preventDefault();
			var orderNo = $(this).closest('.latest-order_item').data('orderno');
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
						fetchTotal();
						alert('確認成功');
					}
				},
				error: function() {
				}
			})
		})
		/**
		 * 訂單篩選
		 */
		$('#orderDate').on('change', function(e) {
			var date = $(this).val();

		})
		$('#statusFilter').on('change', function(e){
			var status = $(this).val();
			if($('#latestOrder')) {
				fetchTotal(status)
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
			window.location.href = "profile.html?page=" + page;
		}
		/**
		 * 退貨
		 */
		var selectedNo;
		$("#latestOrder").on("click", ".return-apply", function(){
			$("#returnModal").modal("show");
			selectedNo = $(this).closest(".latest-order_item").data("orderno");
		})
		$("#returnFile").on("change", function(e){
			var file = e.target.files;
			var formData = new FormData();
			if(file && file.length) {
			  formData.append("file",file[0]);
			}
		})
		$('#returnForm').validate({
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
			}
		});
		var submitReturn = function(){
			var tocEmail = $("#tocEmail").val();
			var tocPhoto = $("#tocPhoto").val();
			var tocGenre = $("#tocGenre").val();
			$.ajax({
				url: "/BeMoralOfficial/order/createOrderCancel.do",
				type: "POST",
				data: {
					tocEmail: tocEmail,
					tocPhoto: tocPhoto,
					tocGenre: tocGenre,
					orderNum: selectedNo,
					userId: user_id
				},
				dataType: 'JSON',
				success: function(data) {
					if(data.status == 0) {
						$("#returnModal").modal("hide");
						fetchTotal();
					}
				},
				error: function() {
				}
			})
		}
	}
})