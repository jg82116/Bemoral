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
 * js验证
 * 
 * */
function getVerification(){
    var username = $('#username_m').val();
    var sex = $('#sex').val();
    var birthDate = $('#birthdate_m').val();
    var email = $('#email_m').val();
    var phone = $('#phone_m').val();
    var code = $('#phone_code_m').val();
    var flog = true;
    if(username==null || username==""){
  	    $(".content-name-username .wrong").css("display","block");
    	flog = false;
    }else{
    	$(".content-name-username .wrong").css("display","none");
    }
    if(sex==null || sex==""){
  	    $(".sg-content-sex .wrong").css("display","block");
    	flog = false;
    }else{
  	    $(".sg-content-sex .wrong").css("display","none");
    }
    if(birthDate==null || birthDate==""){
  	    $(".content-info-time .wrong").css("display","block");
    	flog = false;
    }else{
  	    $(".content-info-time .wrong").css("display","none");
    }
    if(email==null || email==""){
  	    $(".content-info-email .wrong").css("display","block");
    	flog = false;
    }else{
  	    $(".content-info-email .wrong").css("display","none");
    }
	var re = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/; 
	if(re.test(email)){
  	    $(".content-info-email .wrong").css("display","none");
	}else{
  	    $(".content-info-email .wrong").css("display","block");
  	    $(".content-info-email .wrong").text("邮箱格式不正确!");
		flog=false;
	}
    if(phone==null || phone==""){
  	    $(".content-info-phone .wrong").css("display","block");
    	flog = false;
    }else{
  	    $(".content-info-phone .wrong").css("display","none");
    }
    if(code==null || code==""){
  	    $(".content-info-phone-code .wrong").css("display","block");
    	flog = false;
    }else{
  	    $(".content-info-phone-code .wrong").css("display","none");
    }
    return flog;
}
/*
 * 获取验证码
 * 
 * */
var getphonecode_m = function(){
    var phone_num = $("#phone_m").val();
	var phone_country_code = $("#phone_country_code option:selected").attr("data-calling-code");
    $.ajax({
          url: "/BeMoralOfficial/user/getphone_code.do",
          type: "POST",
          data:{
            phone_num:phone_num,
			phone_country_code,phone_country_code,
			phone_num_validate: "Y",
		  },
          cache: false,
          dataType:"JSON",
          success: function (data) {
            if(data.status==0){
              alert("验证码发送成功：" + data.data);
              $("#get_phone_code_m").disabled=true;
            }else{
				$(".content-info-phone .wrong_ss").css("display","block");
				$(".content-info-phone .wrong_ss").html(data.msg + data.data);
            }
              
          },
          error:function(data){	    	
			$(".content-info-phone .wrong_ss").css("display","block");
			$(".content-info-phone .wrong_ss").html("服务器内部错误!");
         
          }
    })	 
  }; 


/*
 * mobile端更新
 * 
 * */
var updateForm_m = function(userId,userInfo) {
    var username_m = $('#username_m').val();
    var sex = $('#sex').val();
    var birthDate = $('#birthdate_m').val();
    var email = $('#email_m').val();
    var phone = $('#phone_m').val();
    var code = $('#phone_code_m').val();
    $.ajax({
      url: '/BeMoralOfficial/user/checkPhoneCode.do',
      type: 'POST',
      dataType: "JSON",
      data: {
        phone_num: phone,
        phone_code: code
      },
      success: function (data) {
					console.log(data);
		$(".content-info-phone-code .wrong").css("display","none");
          if (data.status == 0) {
            $.ajax({
				  url: '/BeMoralOfficial/user/updateUserInfo.do',
				  type: 'POST',
				  dataType: "JSON",
				  data: {
					id: userId,
					username: username_m,
					real_name: "",
					gender: sex,
					birthday: birthDate,
					email: email,
					phone_num: phone
				  },
				  success: function(data) {
					  console.log(data);
					if(data.status == 0) {
					  userInfo.birthdate = birthDate;
					  userInfo.gender = sex;
					  userInfo.email = email;
					  userInfo.username = username_m;
					  userInfo.phone_num = phone;
					  sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
					  sessionStorage.setItem('username',username_m);
					  alert('更新成功')
					} else {
					  alert(data.msg && data.msg)
					}
				  },
				  error: function(data) {

				  
				  }
				})
          } else {
			$(".content-info-phone-code .wrong").css("display","block");
			$(".content-info-phone-code .wrong").text(data.msg && data.msg);
          }
      },
      error: function (data) {
      }
    })
  }


$(function(){
  /**
   * common
   */
  var userId = sessionStorage.getItem('userId');
  var userInfo = sessionStorage.getItem('userInfo') && JSON.parse(sessionStorage.getItem('userInfo'));
  console.log(userInfo);
  if (userInfo) {
    $('#gender').val(userInfo.gender);
    $('#gender[value='+userInfo.gender+']').prop('checked', true);
    $('#birthdate').val(userInfo.birthdate);
    $('#phone_num').val(userInfo.phone_num);
    $('#email').val(userInfo.email);
    /* $('#prefixName').val(userInfo.real_name && userInfo.real_name.split(',')[0]);
    $('#lastName').val(userInfo.real_name && userInfo.real_name.split(',')[1]); */
	$('#username_p').val(userInfo.username);
	//mobile端
    $('#sex[value='+userInfo.gender+']').prop('checked', true);
    $('#birthdate_m').val(userInfo.birthdate);
    $('#phone_m').val(userInfo.phone_num);
    $('#email_m').val(userInfo.email);
    /*$('#surname').val(userInfo.real_name && userInfo.real_name.split(',')[0]);
    $('#monicker').val(userInfo.real_name && userInfo.real_name.split(',')[1]);*/
	$('#username_m').val(userInfo.username);
  }
  if(browser.versions.mobile || browser.versions.android || browser.versions.iPhone){ 
	  //判断手机号格式
	  var phoneNbrCheck = function(phone_num){
	    var r = /^[0-9]*[1-9][0-9]*$/;
	    if (r.test(phone_num) == false){
	      return false;
	    }else if (phone_num.length < 6){
	      return false;
	    }
	  };
	  //获取验证码
	  $("#get_phone_code_m").on('click',function(e){
	    e.stopPropagation();
			phone_num = $("#phone_m").val();
			if (phoneNbrCheck(phone_num) == false){
				$(".content-info-phone .wrong_ss").css("display","block");
				$(".content-info-phone .wrong_ss").html("请输入正确的手机号!");
				return false;
			}else{
				$(".content-info-phone .wrong_ss").css("display","none");
				$(".content-info-phone .wrong_ss").html("");
				getphonecode_m();
			}
	  });
	  $("#updateUserInfo").click(function(){
		  var flog = getVerification();
		  if(flog){
			  updateForm_m(userId,userInfo);
			  return;
		  }
	  });
	  
  }else{
	  var getphonecode = function(){
		var phone_num = $("#phone_num").val();
	var phone_country_code = $("#phone_country_code option:selected").attr("data-calling-code");
		var abc = "<label class=\"error\" id=\"phone_num-error\" for=\"phone_num\"></label>";
		$.ajax({
			  url: "/BeMoralOfficial/user/getphone_code.do",
			  type: "POST",
			  data:{
				phone_num:phone_num,
				phone_country_code,phone_country_code,
				phone_num_validate: "Y",
			  },
			  cache: false,
			  dataType:"JSON",
			  success: function (data) {
				if(data.status==0){
				  alert("验证码发送成功：" + data.data);
				  $("#getphonecode").disabled=true;
				}else{
				if ($("#phone_num-error") == null){
				  $(this).after(abc);
				}
				$("#phone_num-error").text(data.msg + data.data);
				}
				  
			  },
			  error:function(data){	    	
				console.log("failed", data);
			  if ($("#phone_num-error") == null){
				$(this).after(abc);
			  }
			  // $("#phone_num-error").text(error_connecttionissue);

			  }
		})	 
	  };   
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
	  $("#getphonecode").on('click',function(e){
		e.stopPropagation();
			phone_num = $("#phone_num").val();
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
				getphonecode();
			}
	  });
	  /**
	   * 更新信息
	   */
	  $('#infoForm').validate({
		rules: {
		  username_p: "required",
		  gender: "required",
		  birthdate: "required",
		  phone_num: "required",
		  phone_code:{
			required: true,
			minlength: 6,
		  },
		  email: {
			required: true,
			email: true
		  }
		},
		message: {
		  gender: "請選擇性別",
		  birthdate: "請輸入生日",
		  phone_num: "請輸入手機號碼",
		  phone_code: "請輸入驗證碼",
		  email: {
			required:"請輸入郵箱",
			email: "郵箱格式錯誤，請重新輸入",    	  
		  },
		  username_p: "請填寫用户名"
		},
		success: "valid",
		submitHandler: function (form) {
			$(form).ajaxSubmit(function () {
			  updateForm()
			})
		}
	  });
	  var updateForm = function() {
		//var prefixName = $('#prefixName').val();
		//var lastName = $('#lastName').val();
		var username_p = $('#username_p').val();
		var gender = $('#gender').val();
		var birthDate = $('#birthdate').val();
		var email = $('#email').val();
		var phone = $('#phone_num').val();
		var code = $('#phoneCode').val();
		console.log(birthDate);
		$.ajax({
		  url: '/BeMoralOfficial/user/checkPhoneCode.do',
		  type: 'POST',
		  dataType: "JSON",
		  data: {
			phone_num: phone,
			phone_code: code
		  },
		  success: function (data) {
			  if (data.status == 0) {
				$.ajax({
				  url: '/BeMoralOfficial/user/updateUserInfo.do',
				  type: 'POST',
				  dataType: "JSON",
				  data: {
					id: userId,
					username: username_p,
					real_name: "",
					gender: gender,
					birthday: birthDate,
					email: email,
					phone_num: phone
				  },
				  success: function(data) {
					if(data.status == 0) {
					  //userInfo.real_name = prefixName + ',' +lastName;
					  userInfo.birthdate = birthDate;
					  sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
					  sessionStorage.setItem('username',username_p);
					  alert('更新成功')
					} else {
					  alert(data.msg && data.msg)
					}
				  },
				  error: function(data) {

				  }
				})
			  } else {
				alert(data.msg && data.msg)
			  }
		  },
		  error: function (data) {
		  }
		})
	  }
  }
})