//form validate

var error_phonenum_incorrect = "手機號碼格式不正確，請輸入正確的手機號碼";
var error_phonecode_incorrect = "驗證碼不正確，請重新輸入";
var error_connecttionissue = "系統錯誤，請稍後重試！";
$().ready(function() {
	
/*    $("#regform").validate();*/
    $("#regform").validate({
        rules: {
          gender: "required",
          username: {
            required: true,
            maxlength: 10,           
            number: false,
          },
          birthdate: "required",
          password: {
            required: true,
            minlength: 6,
            maxlength: 12,
          },
          confirm_password: {
            required: true,
            minlength: 6,
            maxlength: 12,
            equalTo: "#password"
          },
          phone_num: "required",
          phone_code:{
        	required: true,
        	minlength: 6,
          },
          email: {
            required: true,
            email: true
          },
          confirm_status1: "required",
        },
        messages: {
          gender: "請選擇性別",
          username: {
            required: "請輸入用戶名",
            maxlength: "用戶昵稱不可以超過10位",
            number: "不能為純數字",
          },
          birthdate: "請輸入生日",
          password: {
            required: "請輸入密碼",
            minlength: "密码长度不能小于 6 个字母"
          },
          confirm_password: {
            required: "请再次输入密码",
            minlength: "密码长度不能小于 6 个字母",
            equalTo: "两次密码输入不一致"
          },
          phone_num: "請輸入手機號碼",
          phone_code: "請輸入驗證碼",
          email: {
        	  required:"請輸入郵箱",
        	  email: "郵箱格式錯誤，請重新輸入",    	  
          },
          confirm_status1: "请閲讀並同意遵守道德準則",
         },
        
         success:"valid",
        submitHandler: function(form) 
        {      
    		/*alert("form submit");*/
        	$(form).ajaxSubmit(function(){    			
    			createaccount();
    		})
/*        	form.submit(),*/
        	/*alert("form submit");*/
        },  
        
/*        debug:true*/
    });
//end of form validate
    
    $("#loginform").validate({
    	rules: {
    		id: "required",
    		password: "required",
    	},
    	messages:{
    		id: "請輸入用戶名",
    		password: "請輸入密碼",
    	},
    	success:"valid",
    	submitHandler: function(form) 
    	{   
//    		alert("form submit");
/*    		login();*/
    		$(form).ajaxSubmit(function(){    			
    			login();
    		})
//    		alert("form submit2");
    	},  
    });

    
    $("#resetpw").validate({
    	rules: {
    		phone_num: "required",
    		phone_code: "required",
    	},
    	messages:{
    		phone_num: "請輸入正確的手機號碼",
    		phone_code: "請輸入驗證碼",
    	},
    	success:"valid",
    	submitHandler: function(form) 
    	{   
    		$(form).ajaxSubmit(function(){
    			var phone_country_code = $("#auth-country-picker option:selected").attr("data-calling-code");
    			var phone_num=$("#phone_num").val();
    			var phone_code=$("#phone_code").val();    			
    			//console.log(phone_num);
    			//console.log(phone_code);
    			checkphonecode(phone_country_code,phone_num,phone_code);
    		})
    	},  
    });
    
    $("#resetpw2").validate({
    	rules: {
    		password: {
                required: true,
                minlength: 6,
                maxlength: 20,
    		},
    		confirm_password:{
                required: true,
                equalTo: "#password"
    		}, 
    	},
    	messages:{
    		password: {
                required: "请输入密码",
                minlength: "密码长度不能小于 6 个字母",
                maxlength: "长度大于20",
    		},
    		confirm_password: {
    			required: "请再次输入密码",
    			equalTo: "两次密码输入不一致",
    		},
    	},
    	success:"valid",
    	submitHandler: function(form) 
    	{   
    		$(form).ajaxSubmit(function(){
    			var phone_num=$("#phone_num").val();
    			/*var password=$("#password").val();*/
    			var password = $.md5($("#password").val());
/*    			console.log("reset password1: ",  $("#password").val() );
    			console.log("reset password2: ", password );*/
    			var phone_code=$("#phone_code").val();
/*    			console.log(phone_num);
    			console.log(phone_code);*/
    			resetpassword(phone_num,password,phone_code);
    		})
    	},  
    });
    
	//login
	var login = function(){
		var id = $("#id").val();
		var password = $.md5($("#password").val());
		var email = null;
		var phone_num = null;
/*		var ip = returnCitySN["cip"];*/
		var rememberme = $("#remember_me").is(":checked");
		var r = /^[0-9]*[1-9][0-9]*$/;
//		r.test(id);
/*		console.log(id);
		console.log(id.length);
		console.log(id.substr(0,2));
		console.log(id.substr(0,1));
		console.log(r.test(id));		
		if (r.test(id) == false){
			//email
			console.log("email");
			email = id;

		} else if ((id.length == 10) & (id.substr(0,2) == "09")) {
			//taiwan
			console.log("taiwan");
			phone_num = id;
		}else if ((id.length == 11) & (id.substr(0,1) == "1")){
			//china
			console.log("china");
			phone_num = id;
		}*/
		
		var phone_country_code = $("#auth-country-picker option:selected").attr("data-country-code");
		if (phone_country_code == "email"){
			email = id;
			phone_country_code=null;
		}else {
			phone_num = id;			
		} 
		
		$.ajax({
	      	   url: "/BeMoralOfficial/user/login.do",
		       type: "POST",
		       data:{
		    	   phone_country_code: phone_country_code,
		    	   phone_num:phone_num,
		    	   email:email,
		    	   password:password,
		    	   ip:getCookie("ip"),
				   isPC:0,
				   isLand:getCookie("isLand"),
		    	   },
		       cache: false,
		       dataType:"JSON",
		       success: function(data){
		    	  //console.log(data);
		    	   $("#errormessage1").text("");
		    	  if(data.status == 0){
					  sessionStorage.setItem('username',data.data.username);
					  sessionStorage.setItem('userId',data.data.id);
					  sessionStorage.setItem('userInfo', JSON.stringify(data.data));
					  sessionStorage.setItem('headImgUrl', data.data.headImgUrl);
		    		  if (rememberme == true){
		    			  setCookie("token",data.data.token,7);
		    			 
		    		  }else{
		    			  setCookie("token",data.data.token,1);
		    		  }
		    		  
		    		  window.location.href="index.html";
		    	  }else{
		    		  $("#errormessage1").text(data.msg);
		    		 // $("#errormessage1").removeClass("valid");
		    	  }
		    	  
		       },
		       error: function(data){
		    	  //console.log(data);
		    	  $("#errormessage1").text(error_connecttionissue);
		    	  //$("#errormessage1").removeClass("valid");
		       },
		           	 
		})
			
	};
   
	 //create account
	var createaccount = function(){
		 var username=$("#username").val();
		 var gender=$("#gender").val();
		 var birthdate=$("#birthdate").val();
		 var phone_country_code = $("#auth-country-picker option:selected").attr("data-calling-code");
		 var phone_num=$("#phone_num").val();
		 var phone_code=$("#phone_code").val();
		 var password=$.md5($("#password").val());
		 console.log("regist password1: ",$("#password").val() );
		 console.log("regist password2: ",password );
		 var email=$("#email").val();
		 var confirm_status1=$("#confirm_status1").is(":checked");
		 var confirm_status2=$("#confirm_status2").is(":checked");
		 $.ajax({
	      	   url: "/BeMoralOfficial/user/register.do",
		       type: "POST",
		       data:{
		    	   username:username,
		    	   gender:gender,
		    	   birthdate:birthdate,
		    	   phone_country_code: phone_country_code,
		    	   phone_num:phone_num,
		    	   phone_code: phone_code,
		    	   password:password,
		    	   email:email,
		    	   confirm_status1:confirm_status1,
		    	   confirm_status2:confirm_status2},
		       cache: false,
		       dataType:"JSON",
		       success: function (data) {
		    	   //console.log(data);
		    	   //console.log("create account");
		    	   $("#errormessage2").text("");
		    	   if (data.status == 0){
		    		   window.location.href="Login.html";
		    		  //to be complete	    		   
		    	   } else {
		    		 //to be complete
						$("#errormessage2").text(data.msg);
		    	   }

		       },
		       error:function(data){
		    	   $("#errormessage2").text(error_connecttionissue);
		    	   //console.log(data);
		    	   //console.log(" create account failed");
		       }	
		       
		 })	 
	 }; 
	 //end of account create
	 
	//get phone code  --response incorrect

	var getphonecode = function(phone_country_code,phone_num,phone_num_validate){
		  //console.log("get phone code");
		  /*var phone_num = $("#phone_num").val();*/
		  var abc = "<label class=\"error\" id=\"phone_num-error\" for=\"phone_num\"></label>";
		 $.ajax({
	      	   url: "/BeMoralOfficial/user/getphone_code.do",
		       type: "POST",
		       data:{
		    	   phone_country_code:phone_country_code,
		    	   phone_num:phone_num,
		    	   phone_num_validate: phone_num_validate,
		    	   },
		       cache: false,
		       dataType:"JSON",
		       success: function (data) {
		    	   if(data.status==0){
		    		   //console.log("message send successfully", data);
		    		   console.log("验证码发送成功：" + data.data);
		    		   $("#getphonecode").disabled=true;
		    	   }else{
		    		   //console.log("message send failed", data);
						if ($("#phone_num-error") == null){
/*							var abc = "<label class=\"error\" id=\"phone_num-error\" for=\"phone_num\"></label>";	*/				
							$(this).after(abc);
						}
						$("#phone_num-error").text(data.msg + data.data);
		    	   }
		    		   
		       },
		       error:function(data){	    	
		    	   //console.log("failed", data);
					if ($("#phone_num-error") == null){
/*						var abc = "<label class=\"error\" id=\"phone_num-error\" for=\"phone_num\"></label>";	*/				
						$(this).after(abc);
					}
					$("#phone_num-error").text(error_connecttionissue);

		       }
		 })	 
		 .done(function(){
			 $.cookie("total",60);
			 timekeeping();
		 })
	 };   
	 //end of account create

	 //check phone code
	 var checkphonecode = function(phone_country_code,phone_num,phone_code){
		 $.ajax({
	      	   url: "/BeMoralOfficial/user/checkPhoneCode.do",
		       type: "POST",
		       data:{
		    	   phone_country_code:phone_country_code,
		    	   phone_num:phone_num,
		    	   phone_code:phone_code,
		    	   },
		       cache: false,
		       dataType:"JSON",
		       success: function (data) {
		    	   //console.log("check phone code", data);
		    	   $("#errormessage1").text("");
		    	   if(data.status==0){
		    		   /*console.log("message send successfully", data.data);*/
		    		   var abc =  "+" + $("#auth-country-picker option:selected").attr("data-calling-code") + " " + $("#phone_num").val().substr(0,3) + "****" + $("#phone_num").val().substr($("#phone_num").length - 5,4);
		    		   $("#phone_num_mask").text(abc);
		    		   $("#step1").hide();
		    		   $("#step2").show();
		    		   $("#step3").hide();
		    		   $("#num2").parent().addClass("line2-a");
		    		   $("#num2").find(".circle_booder").addClass("circle_booder-a");
		    		   
		    	   }else{
		    		   //console.log("message send failed", data.data);
		    		   $("#phone_code-error").text(error_phonecode_incorrect);
		    		   $("#phone_code-error").removeClass("valid");
		    	   }
		    		   
		       },
		       error:function(data){	    	
		    	   //console.log("failed",data);
/*		    	   var error_connecttionissue = "系統錯誤，請稍後重試！";*/
		    	   $("#errormessage1").text(error_connecttionissue);
		       }
		 })	
		 
	 }
	 
	 //reset password
	 var resetpassword = function(phone_num,password,phone_code){
		 $.ajax({
	      	   url: "/BeMoralOfficial/user/saveNewPassword.do",
		       type: "POST",
		       data:{
		    	   phone_num:phone_num,
		    	   new_password:password,
		    	   phone_code:phone_code
		    	   },
		       cache: false,
		       dataType:"JSON",
		       success: function (data) {
		    	   //console.log("reset password", data);
		    	   $("#errormessage2").text("");
		    	   if(data.status==0){
		    		   console.log("reset password successfully", data);
		    		   $("#step1").hide();
		    		   $("#step2").hide();
		    		   $("#step3").show();
		    		   $("#num3").parent().addClass("line2-a");
		    		   $("#num3").find(".circle_booder").addClass("circle_booder-a");
		    	   }else{
		    		   console.log("reset password failed", data);
		    		   $("#errormessage2").text(data.msg);
		    	   }
		    		   
		       },
		       error:function(data){	    	
		    	   //console.log("failed",data);
/*		    	   var error_connecttionissue = "系統錯誤，請稍後重試！";*/
		    	   $("#errormessage2").text(error_connecttionissue);
		       }
		 })	
	 }
	 //phone nbr check
	 var phoneNbrCheck = function(phone_num){
		 var r = /^[0-9]*[1-9][0-9]*$/;
		 if (r.test(phone_num) == false){
			 console.log("invalid phone nbr");
			 return false;
		 }else if (phone_num.length < 6){
			 console.log("invalid phone nbr");
			 return false;
		 }
	 };
	 
	 var timekeeping = function(){
		//把按钮设置为不可以点击
		 $('#getphonecode').attr("disabled", true); 
	    var interval=setInterval(function(){//每秒读取一次cookie
	        //从cookie 中读取剩余倒计时
	        total=$.cookie("total");
	        //在发送按钮显示剩余倒计时
	        $('#getphonecode').html('请等待'+total+'秒'+'<img class = "form_button_img hidden-xs hidden-sm" src="./images/button_small1_border.png">');
	        //把剩余总倒计时减掉1
	        total--;
	        if(total==0){//剩余倒计时为零，则显示 重新发送，可点击
	        //清除定时器
	        clearInterval(interval);
	        //删除cookie
	        total=$.cookie("total",total, { expires: -1 });
	        //显示重新发送
	        $('#getphonecode').html('重新发送'+'<img class = "form_button_img hidden-xs hidden-sm" src="./images/button_small1_border.png">');
	        //把发送按钮设置为可点击
	        $('#getphonecode').attr("disabled", false);
	        }else{//剩余倒计时不为零
	        //重新写入总倒计时
	        $.cookie("total",total);
	        }
	       },1000);
	      
		
	 }
	 //login phone nbr style
	if(browser.versions.mobile || browser.versions.android || browser.versions.iPhone){ 
	 $(".form_country_code").css("width","20%");
	}else{
	 $("#id").css("width",($("#id").parent().width()-89)+'px');
	}
	 //register phone nbr style
	 $(".phone_num_reg").css("width",($(".phone_num_reg").parent().width()*0.6-89)+'px');
	 //forget password phone nbr style
	 $(".fp_phone_num").css("width",($(".fp_phone_num").parent().width()*0.6-89)+'px');

	 
	 $(".form_country_code").val(getCookie("countryCode"));
	 
	 if($.cookie("total")!=undefined&&$.cookie("total")!='NaN'&&$.cookie("total")!='null'){//cookie存在倒计时
		 timekeeping();
	 }else{//cookie 没有倒计时
		 $('#getphonecode').attr("disabled", false);
	 }
	 
	 
	 $("#getphonecode").click(function(){
		var phone_country_code = $("#auth-country-picker option:selected").attr("data-calling-code");
		var phone_num = $("#phone_num").val();
		var phone_num_validate = $("#phone_num").attr("phone_num_validate");
		if (phone_num_validate=="N"){
			
		}else{
			phone_num_validate = "Y";
		}
		if (phoneNbrCheck(phone_num) == false){
			console.log($("#phone_num-error").val());
			if ($("#phone_num-error").val() == null){
				var abc = "<label class=\"error\" id=\"phone_num-error\" for=\"phone_num\"></label>";					
				$(this).after(abc);			
			}
			$("#phone_num-error").text(error_phonenum_incorrect);
			return false;
		}else{
			$("#phone_num-error").text("");
			
			getphonecode(phone_country_code,phone_num,phone_num_validate);
		}
	});

/*	$("#getphonecodefp").click(function(){
		var phone_country_code = $("#auth-country-picker option:selected").attr("data-calling-code");
		var phone_num = $("#phone_num").val();
		if (phoneNbrCheck(phone_num) == false){
			console.log($("#phone_num-error").val());
			if ($("#phone_num-error").val() == null){
				var abc = '<label class="error" id="phone_num-error" for="phone_num"></label>';					
				$(this).after(abc);
				console.log(abc);
			}
			$("#phone_num-error").text(error_phonenum_incorrect);
			return false;
		}else{
			$("#phone_num-error").text("");
			getphonecode(phone_country_code,phone_num);				
		};

	});*/


	

})

//end of form validate


window.onresize = function(){
	
	 //login phone nbr style
	if(browser.versions.mobile || browser.versions.android || browser.versions.iPhone){ 
	 $(".form_country_code").css("width","20%");
	}else{
	 $("#id").css("width",($("#id").parent().width()-89)+'px');
	}
	 //register phone nbr style
	 $(".phone_num_reg").css("width",($(".phone_num_reg").parent().width()*0.6-89)+'px');
	 //forget password phone nbr style
	 $(".fp_phone_num").css("width",($(".fp_phone_num").parent().width()*0.6-89)+'px');
	 
}






