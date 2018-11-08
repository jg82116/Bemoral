
$().ready(function() {

	var login_type =getQueryString("login_type");
	var code=getQueryString("code");
	var authcode=getQueryString("auth_code");


	
    if(login_type == "we"){
    	wechatinf(code);
    }
    
    if(login_type == "ali"){
    	aliinf(authcode);
    }
	
    if(login_type == "fb"){
    	facebookinf();
    }   
	
	
	
	
	
    $("#bindacct").validate({
    	rules: {
    		phone_num: "required",
    		phone_code: "required",
    	},
    	messages:{
    		phone_num: "請輸入手機號碼",
    		phone_code: "請輸入驗證碼",
    	},
    	success:"valid",
    	submitHandler: function(form) 
    	{   
    		var phone_country_code = $("#auth-country-picker option:selected").attr("data-calling-code");
    		var phone_num=$("#phone_num").val();
    		var phone_code=$("#phone_code").val();
    		$(form).ajaxSubmit(function(){    			
    			bindacct(phone_country_code,phone_num,phone_code);
    		})

    	},  
    });


    $("#thirdpartylogin").click(function(){
    	
    });

})

    var wechatinf = function(code){
    	$.ajax({
    	   	   url: "/BeMoralOfficial/user/weixin_getOpenid.do",
    		       type: "POST",
    		       data:{
    		    	   code:code,
    		    	   },
    		       cache: false,
    		       dataType:"JSON",
    		       success: function(data){
    		    	  //console.log("wechat: ",data);
    		    	  if (data.status == 1){ //未绑定手机
    		    		  if( data.data.errcode == null){
    		    			  $("#userphoto").attr("src",data.data.headimgurl);
    		    			  $("#username").html(data.data.nickname);
    		    			  sessionStorage.setItem('type','we');
    		    			  sessionStorage.setItem('userid1',data.data.openid);
    		    			  sessionStorage.setItem('username1',data.data.nickname);
    		    			  if(data.data.sex == "1"){    		    				  
    		    				  sessionStorage.setItem('gender',"male");
    		    			  }else {
    		    				  //default female
    		    				  sessionStorage.setItem('gender',"female");
    		    			  }
    		    			  sessionStorage.setItem('headImgUrl',data.data.headimgurl);
    		    			  sessionStorage.setItem('country',data.data.country);
    		    			  sessionStorage.setItem('province',data.data.province);
    		    			  sessionStorage.setItem('city',data.data.city);
    		    			  sessionStorage.setItem('isPC',"0");
    		    			  /*sessionStorage.setItem('headImgUrl',data.data.headimgurl);*/
    		    		  }
    		    		  $("#loadingpic").hide();
    		    		  $("#bindpart").show();
    		    		//bind account phone nbr style
    		    		  $(".bd_phone_num").css("width",($(".bd_phone_num").parent().width()*0.6-89)+'px');
    		       	}else if(data.status == 0){
    		       		//已绑定手机
    		       		//sessionStorage.setItem('username',data.data.nickname);
    		       		sec_login("we",data.data.openid,"0",getCookie("isLand"));
    		       		
    		       	}else if(data.status == 2){
    		       		console.log("系统异常");
    		       	}
    		    	  
    		       },
    		       error: function(data){
    		    	  //console.log("wechat: ",data);

    		       },
    		           	 
    		})
    };

    //支付宝用户信息
    var aliinf = function(code){
    	$.ajax({
 	   	   url: "/BeMoralOfficial/user/thirdLogin.do",
 		       type: "POST",
 		       data:{
 		    	  auth_code:code,
 		    	 login_type: "ali",
 		    	   },
 		       cache: false,
 		       dataType:"JSON",
 		       success: function(data){
 		    	  //console.log("alipay: ",data);
 		    	  var ali =data.data.alipay_user_info_share_response;
 		    	  var nickname = null;
     			  if (ali.nick_name == null){
	    				nickname = "支付宝用户" + ali.user_id;
	    				
	    			 } else{ 		    			  
	    				 nickname = ali.nick_name;
	    				 
	    			 }
 		    	 if (data.status == 1){ //未绑定手机	
 		    		 if(ali.code == "10000"){
 		    			 $("#userphoto").attr("src",ali.avatar);
 		    			$("#username").html(nickname);
/* 		    			 if (ali.nick_name == null){
 		    				 $("#username").html("支付宝用户" + ali.user_id);
 		    				
 		    			 } else{ 		    			  
 		    				 $("#username").html(ali.nick_name);		    				
 		    			 }*/
 		    			  sessionStorage.setItem('usernamea1',nickname);
		    			  sessionStorage.setItem('type','ali');
		    			  sessionStorage.setItem('userid1',ali.user_id);
		    			  if(ali.gender == "m"){    		    				  
		    				  sessionStorage.setItem('gender',"male");
		    			  }else {
		    				  //default female
		    				  sessionStorage.setItem('gender',"female");
		    			  }
		    			  sessionStorage.setItem('headImgUrl',ali.avatar);
		    			  sessionStorage.setItem('country','');
		    			  sessionStorage.setItem('province',ali.province);
		    			  sessionStorage.setItem('city',ali.city);
		    			  sessionStorage.setItem('isPC',"0");
		    			  /*sessionStorage.setItem('headImgUrl',data.data.headimgurl);*/
 		    			 
 		    			 $("#loadingpic").hide();
 		    			 $("#bindpart").show();
 		    			 $(".bd_phone_num").css("width",($(".bd_phone_num").parent().width()*0.6-89)+'px');
 		    		 }
 		    	 }else if(data.status == 0){
 		       		//已绑定手机
 		    		//sessionStorage.setItem('username',nickname);
 		    		sec_login("ali",ali.user_id,"0",getCookie("isLand"));
 		       	}else if(data.status == 2){
 		       		console.log("系统异常");
 		       	}
 		    	  
 		       },
 		       error: function(data){
 		    	  //console.log("alipay: ",data);

 		       },
 		           	 
 		})
    }

    
    //facebook
 var facebookinf = function(){
	 $.ajax({
	   	   url: "/BeMoralOfficial/user/firstLoginCheck.do",
		       type: "POST",
		       data:{
		    	   type:"FB",
		    	   third_id: sessionStorage.getItem('userid1'),
		    	   },
		       cache: false,
		       dataType:"JSON",
		       success: function(data){
		    	  //console.log("facebook: ",data);
		    	  if (data.status == 0){ //未绑定手机
		    		sessionStorage.setItem('type','FB');
		    		$("#username").html(sessionStorage.getItem('username1'));

	    			 $("#loadingpic").hide();
	    			 $("#bindpart").show();
	    			 $(".bd_phone_num").css("width",($(".bd_phone_num").parent().width()*0.6-89)+'px');
	    			 
		       	}else if(data.status == 1){
		       		//再次登录
		       		sec_login("FB",data.data.fb,"0",getCookie("isLand"));		      
		       	}else{
		       		console.log("系统异常");
		       	}
		    	  
		       },
		       error: function(data){
		    	  //console.log("facebook: ",data);

		       },
		           	 
		})
	//end of ajax
 }   
    
var bindacct = function(phone_country_code,phone_num,phone_code){
	var rememberme = $("#remember_me").is(":checked");
	$.ajax({
	   	   url: "/BeMoralOfficial/user/login3.do",
		       type: "POST",
		       data:{
		    	 type:sessionStorage.getItem('type'),
		    	 phone_country_code:phone_country_code,
		    	 phone_num: phone_num,
		    	 phone_code: phone_code,
		    	 username:sessionStorage.getItem('username1'),
		    	 userid:sessionStorage.getItem('userid1'),
		    	 gender:sessionStorage.getItem('gender'),
		    	 headImgUrl:sessionStorage.getItem('headImgUrl'),
		    	 country:sessionStorage.getItem('country'),
		    	 province:sessionStorage.getItem('province'),
		    	 city:sessionStorage.getItem('city'),
		    	 ip:getCookie('ip'),
		    	 isPC:sessionStorage.getItem('isPC'),
		    	 isLand:getCookie("isLand")		    	 		    	 
		    	   },
		       cache: false,
		       dataType:"JSON",
		       success: function(data){
		    	  //console.log("bind: ",data);
		    	  if (data.status==0){
					sessionStorage.setItem('userInfo', JSON.stringify(data.data));
					sessionStorage.setItem('userId', data.data.id);
					sessionStorage.setItem('username', data.data.username);
		    		  if (rememberme == true){
		    			  setCookie("token",data.data.token,7);		    			 
		    		  }else{
		    			  setCookie("token",data.data.token,1);
		    		  }
		    		  window.location.href="index.html";
		    	  }else{
		    		  $("#errormessage1").text(data.msg);
		    		  $("#errormessage1").show();
		    	  }

		       },
		       error: function(data){
		    	  //console.log("bind: ",data);
		    	  $("#errormessage1").text(error_connecttionissue);
		    	  $("#errormessage1").show();

		       },
		           	 
		})
	
}

var sec_login = function(type,userid,isPC,isLand){
	$.ajax({
	   	   url: "/BeMoralOfficial/user/sec_login3.do",
		   type: "POST",
		       data:{
		    	 type:type,
		    	 userid: userid,
		    	 ip:getCookie('ip'),
		    	 isPC:isPC,
		    	 isLand:isLand		    	 		    	 
		    	   },
		       cache: false,
		       dataType:"JSON",
		       success: function(data1){
		    	  //console.log("2ndtime login ",data1);
		    	  if (data1.status==0){				
		    		  sessionStorage.setItem('userInfo', JSON.stringify(data1.data));
		    		  sessionStorage.setItem('userId', data1.data.id);
		    		  sessionStorage.setItem('username', data1.data.username);
		    		  setCookie("token",data1.data.token,1);
		    		  window.location.href="index.html";
		    	  }else{
		    		  console.log("2nd time login, load user information error");
		    	  }
		    	  
		       },
		       error: function(data1){
		    	  console.log("2ndtime login: failed");

		       },
		           	 
		})
}