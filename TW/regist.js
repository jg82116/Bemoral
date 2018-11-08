// user



	// click
	$('.red_button').click(function(){
	 
		  
		  /*$.ajax({
				url:"/BeMoralOfficial/address/addAddress.do",
				type:"post",
				dataType:"json",
				data:{
					"userId":"666",
					"ressProvince":"湖南省",
					"ressCity":"永州市",
					"ressCounty":"祁阳县",
					"ressDeliveryCode":"125636",
					"ressName":"赵云",
					"ressPhoto":"13656255639",
					"ressAddress":"黎家坪镇110号",
					"log_type":"1",
					"ressSeatPhoto":"400-6562-2365",
					"ressEmail":"488998767@qq.com",
					"ressAddressName":"家",
					"ressDefault":"0",
					},
				success:function(result){
					console.log(result);
				},
				error:function(){
					alert("注册失败，请检查网络设置");
				}
			
			});*/
		  /*$.ajax({
				url:"/BeMoralOfficial/order/getCounts.do",
				type:"post",
				dataType:"json",
				data:{
					"userId":"333",
					"order_Status":"0",
					"pageIndex":1,
					"pageSize":5,
					"mailNo":"444006276289"
					},
				success:function(result){
					console.log(result);
				},
				error:function(){
					alert("注册失败，请检查网络设置");
				}
			
			});*/

    	/*var tocPictureObjectString = {
			tocPicture1:"http://pic.jamapro.com.cn/1529738569135.jpg",
			tocPicture2:"http://pic.jamapro.com.cn/1529738569135.jpg",
			tocPicture3:"http://pic.jamapro.com.cn/1529738569135.jpg",
			tocPicture4:"http://pic.jamapro.com.cn/1529738569135.jpg",
			tocPicture5:"http://pic.jamapro.com.cn/1529738569135.jpg",
			tocPicture6:"http://pic.jamapro.com.cn/1529738569135.jpg",
			tocPicture7:"http://pic.jamapro.com.cn/1529738569135.jpg"
    	}
		  $.ajax({
				url:"/BeMoralOfficial/order/createOrderCancel.do",
				type:"post",
				dataType:"json",
				data:{
					"userId":"333",
					"order_Status":6,
					"orderNum":"d9faae9687367cd89999786119dac675",
					"tocEmail":"30430834@qq.com",
					"tocPhoto":"15632656651",
					"tocGenre":"7天无理由退换货",
					"tocPictureObjectString":JSON.stringify(tocPictureObjectString),
					"tocExplain":"对改产品不怎么满意，并没有想象中的那么好用，也没有想象中的效果，故选择7天无理由退换货"
					},
				success:function(result){
					console.log(result);
				},
				error:function(){
					alert("注册失败，请检查网络设置");
				}
			
			});*/
			$.ajax({
				url:"/BeMoralOfficial/address/getAddress.do",
				type:"post",
				dataType:"json",
				data:{
					"userId":"41",
					"log_type":"0",
					},
				success:function(result){
					console.log(result);
				},
				error:function(){
					alert("注册失败，请检查网络设置");
				}
			
			});
			
		/*var cartList = [
		    	        {
		    	        	userId:"333",
		    	        	cId:"22",
		    	        	cName:"高氧精致保濕噴霧",
		    	        	cNum:2,
		    	        	cPrice:0.01,
		    	        	cStandard:"120ml",
		    	        	trade_photo1:"http://pic.jamapro.com.cn/1529738569135.jpg",
		    	        	couponId:"000",
		    	        	couponName:"000"
		    	        },
		    	        {
		    	        	userId:"333",
		    	        	cId:"23",
		    	        	cName:"晶凝療愈霜",
		    	        	cNum:1,
		    	        	cPrice:0.01,
		    	        	cStandard:"120g",
		    	        	trade_photo1:"http://pic.jamapro.com.cn/1529738569135.jpg",
		    	        	couponId:"000",
		    	        	couponName:"000"
		    	        }
		    	        ]
		    	var sum = 0;
		    	for(let i = 0;i<cartList.length;i++){
		    		sum += parseInt(cartList[i].cNum) * parseFloat(cartList[i].cPrice);
		    	}
		    	var address = {
		    			ressName:"赵三",
		    			ressPhoto:"13909303945",
		    			ressAddress:"上海市闵行区春申路1995号",
		    			ressEmail:"1325464@qq.com",
		    			stCate : "TFM",
		    			stCode : "10268",
		    			stName : "全家七堵工明店",
		    			stAddr : "基隆市七堵區工建路1-15號壹樓",
		    			stTel : "02-24519520"
		    	}
		    	$.ajax({
		    		url : "/BeMoralOfficial/order/addOrders.do",
		    		type : "post",
		    		dataType : "json",
		    		data : {
		    			"userId":"333",
		    			"orderNum":GenNonDuplicateID(36),
		    			"ressId":"f9286e89d2144c95acc8d5217455f736",
		    			"orderAmount":sum,
		    			"pay_type":1,
		    			"log_type":1,
		    			"jsoncId":JSON.stringify(cartList),
		    			"invoice":""
		    		},
		    		success : function(result) {
		    			console.log(result);
		    			$.ajax({
		    				url : "/BeMoralOfficial/pay/pay.do",
		    				type : "post",
		    				dataType : "json",
		    				data : {
		    					"userId":result.data.userId,
		    					"orderNum":result.data.orderNum,
		    					"orderAmount":result.data.orderAmount,
		    					"pay_type":result.data.pay_type,
		    				},
		    				success : function(result) {
		    					console.log(result);
		    					$("#bod").html("<img style='-webkit-user-select: none' src='"+result.data+"'>");
		    				},
		    				error : function() {
		    					alert("注册失败，请检查网络设置");
		    				}

		    			});
		    		},
		    		error : function() {
		    			alert("注册失败，请检查网络设置");
		    		}

		    	});  */
		    	/**
		    	 * 生成一个用不重复的ID
		    	 */
		    	function GenNonDuplicateID(randomLength){
		    	  return Number(Math.random().toString().substr(3,randomLength) + Date.now()).toString(36)
		    	}
	})
	  
