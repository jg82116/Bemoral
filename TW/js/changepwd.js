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
 * 发送验证码
 * 
 * */
function getphonecode_mm(){
	var phone = $("#phone_m").val();
     if(!phone) {
         alert("請填寫手機號!");
         return;
     }
     var countryCode = $("#countryCode_m").val();
     $.ajax({
        url: "/BeMoralOfficial/user/getphone_code.do",
        type: "POST",
        data:{
            phone_country_code: countryCode,
            phone_num:phone,
	    	phone_num_validate: "Y",
        },
        cache: false,
        dataType:"JSON",
        success: function(data) {
            if(data.status == 0) {
                alert("验证码发送成功：" + data.data);
            } 
        },
        error: function(data) {

        }
     })
}
/*
 * 验证手机号和验证码
 * 
 * */
function getphone_mm(){
	var phone = $("#phone_m").val();
    var countryCode = $("#countryCode_m").val();
    var phone_code = $("#phoneCode_m").val();
    $.ajax({
        url: "/BeMoralOfficial/user/checkPhoneCode.do",
        type: "POST",
        data:{
        	phone_country_code:countryCode,
        	phone_num:phone,
        	phone_code:phone_code,
        },
        cache: false,
        dataType:"JSON",
        success: function (data) {
        	if(data.status==0){
            	$(".change-pwd-step").eq(1).addClass("current").siblings().removeClass("current");
            	$(".change-pwd-step").eq(0).addClass("past");
            	$(".pwd-step1").hide();
            	$(".pwd-step2").show();
        	}else{
        		
        	}
              
        },
        error:function(data){	    	
        }
    });
}

/*
 * 修改密码
 * 
 * */
var resetpwd_m = function(){
    var pwd = $("#newPwd_m").val();
    var phone = $("#phone_m").val();
    var phone_code = $("#phoneCode_m").val();
    $.ajax({
        url: "/BeMoralOfficial/user/saveNewPassword.do",
      type: "POST",
      data:{
          phone_num:phone,
          new_password:$.md5(pwd),
          phone_code:phone_code
          },
      cache: false,
      dataType:"JSON",
      success: function (data) {
          if(data.status==0){
            $(".change-pwd-step").eq(2).addClass("current").siblings().removeClass("current");
            $(".change-pwd-step").eq(1).addClass("past");
            $(".pwd-step1").hide();
            $(".pwd-step2").hide();
            $(".pwd-step3").show();
          }else{
        	  
          }
              
      },
      error:function(data){	    	
      }
    })	
}

$(function(){
    /**
     * common
     */
    var user_id = sessionStorage.getItem('userId');
    if(!user_id) {
        window.location.href="index.html";
    }
    var userInfo = sessionStorage.getItem('userInfo') && JSON.parse(sessionStorage.getItem('userInfo'));
    if (userInfo) {
        $('#phone').val(userInfo.phone_num);
        $('#phone_m').val(userInfo.phone_num);
    }
    
    if(browser.versions.mobile || browser.versions.android || browser.versions.iPhone){ 
    	 $("#getphonecode_m").on("click", function(e){
    		 getphonecode_mm();
    	 })
    	 $("#getPhone_m").on("click", function(){
	         getphone_mm();
	     })
	     $("#getPwdForm").validate({
	        rules: {
	        	password_m: {
	                required: true,
	                minlength: 6,
	                maxlength: 20,
	    		},
	    		confirm_password_m:{
	                required: true,
	                equalTo: "#newPwd_m"
	    		}, 
	    	},
	    	messages:{
	    		password_m: {
	                required: "请输入密码",
	                minlength: "密码长度不能小于 6 个字母",
	                maxlength: "长度大于20",
	    		},
	    		confirm_password_m: {
	    			required: "请再次输入密码",
	    			equalTo: "两次密码输入不一致",
	    		},
	    	},
	    	success:"valid",
	    	submitHandler: function(form) 
	    	{   
	    		$(form).ajaxSubmit(function(){
	    			resetpwd_m();
	            })
	            return false
	    	}, 
	    })
	     
    }else{
	    $(".btn-step-confirm").on("click", function(e){
	        var phone = $("#phone").val();
	        if(!phone) {
	            alert("請填寫手機號");
	            return
	        }
	        var countryCode = $("#countryCode").val();
	        $.ajax({
	            url: "/BeMoralOfficial/user/getphone_code.do",
	            type: "POST",
	            data:{
	                phone_country_code: countryCode,
	                phone_num:phone,
			    	phone_num_validate: "Y",
	            },
	            cache: false,
	            dataType:"JSON",
	            success: function(data) {
	                if(data.status == 0) {
	                    alert("验证码发送成功：" + data.data);
	                } 
	            },
	            error: function(data) {
	
	            }
	        })
	    })
	    $("#sumbitPhone").on("click", function(){
	        var phone = $("#phone").val();
	        var countryCode = $("#countryCode").val();
	        var phone_code = $("#phoneCode").val();
	        $.ajax({
	            url: "/BeMoralOfficial/user/checkPhoneCode.do",
	          type: "POST",
	          data:{
	              phone_country_code:countryCode,
	              phone_num:phone,
	              phone_code:phone_code,
	              },
	          cache: false,
	          dataType:"JSON",
	          success: function (data) {
	              if(data.status==0){
	                  $(".change-pwd-step").eq(1).addClass("current").siblings().removeClass("current");
	                  $(".change-pwd-step").eq(0).addClass("past");
	                  $(".pwd-step1").hide();
	                  $(".pwd-step2").show();
	              }else{
	              }
	                  
	          },
	          error:function(data){	    	
	          }
	        })	
	    })
	    /**
	     * submit pwd
	     */
	    $("#pwdForm").validate({
	        rules: {
	    		password: {
	                required: true,
	                minlength: 6,
	                maxlength: 20,
	    		},
	    		confirm_password:{
	                required: true,
	                equalTo: "#newPwd"
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
	                resetpwd();
	            })
	            return false
	    	}, 
	    })
	    var resetpwd = function(){
	        var pwd = $("#newPwd").val();
	        var phone = $("#phone").val();
	        var phone_code = $("#phoneCode").val();
	        $.ajax({
	            url: "/BeMoralOfficial/user/saveNewPassword.do",
	          type: "POST",
	          data:{
	              phone_num:phone,
	              new_password:$.md5(pwd),
	              phone_code:phone_code
	              },
	          cache: false,
	          dataType:"JSON",
	          success: function (data) {
	              if(data.status==0){
	                $(".change-pwd-step").eq(2).addClass("current").siblings().removeClass("current");
	                $(".change-pwd-step").eq(1).addClass("past");
	                $(".pwd-step1").hide();
	                $(".pwd-step2").hide();
	                $(".pwd-step3").show();
	              }else{
	              }
	                  
	          },
	          error:function(data){	    	
	          }
	        })	
	    }
    }
})