
$().ready(function() {

	 var language = getCookie("language");
	 var preview = "2";

	$("#contact_us_form").validate({
		rules:{
			username: "required",
			email:"required",
			phonenbr:"required",
			question_type:"required",
			desc:{
				required:true,
				maxlength:1000,
			},
		},
		messages:{
			username:"請輸入用護名",
			email:"請輸入郵箱",
			phonenbr:"請輸入手機號碼",
			question_type:"請輸入問題種類",
			desc:{
				required:"請輸入描述信息",
				maxlength:"請勿超過1000個字符",
			},
		},
		success:"valid",
    	submitHandler: function(form)
    	{   
    		//console.log("contact us submit!");
    		$(form).ajaxSubmit(function(){
        		//console.log("contact us submit2!");
    			sendmail();
    		})
    	},  
	});

	 //contact us phone nbr style
	 $(".contact_us_phonenbr").css("width",($(".contact_us_phonenbr").parent().width()-89)+'px');
	 
	 $(".form_country_code").val(getCookie("countryCode"));
	
	 getQAname(language, preview,null);
	
	 var maxCount = 1000;  // 最高字数
	 $(".contact_us_desc").keyup(function(){
		 var len = getStrLength(this.value);
		 $(".charcount").html(maxCount-len);
	 })



})


window.onresize = function(){
	
	 //contact us phone nbr style
	 $(".contact_us_phonenbr").css("width",($(".contact_us_phonenbr").parent().width()-89)+'px');
	 
}

//QA type

function getQAname(language, preview,parent_name){		 
	 $.ajax({
		 url: "/BeMoralOfficial/official/getQAKindType.do",
		 type: "post",
		 data:{
			 language:language,
			 preview:preview,
			 parent_name:parent_name,			 
		 },
		 cache: false,
		 dataType: "JSON",
		 success:function(data){
			 console.log("get QA name ",data);
			 if(data.status == 0){
				 data.data.forEach(function(element){
					 $(".contact_us_question_type").append('<option>' + element.qa_name + '</option>');
				 });
				 $(".contact_us_question_type").append('<option> 其他</option>');				 
			 }
			 
		 },
		 error:function(data){
			 //TBC
			 console.log("get QA name failed ",data);
		 },
	 })
	 
}

//

//联系我们 
	 function sendmail(){
		 var name = $(".contact_us_username").val();
		 var email = $(".contact_us_email").val();
		 var phone_country_code = $("#auth-country-picker option:selected").attr("data-calling-code");
		 var phonenbr = $(".contact_us_phonenbr").val();
		 var qa_name = $(".contact_us_question_type").val();
		 var massage = $(".contact_us_desc").val();
		 $.ajax({
			 url: "/BeMoralOfficial/official/save_massage.do",
			 type: "POST",
			 data:{
				 name:name,
				 email:email,
				 phone_country_code:phone_country_code,
				 phonenbr:phonenbr,
				 qa_name:qa_name,
				 massage: massage,
			 },
			 cache: false,
			 dataType:"JSON",
			 success: function(data){
				 //console.log("contact us : ",data);
				 $("#errormessage1").text("");
				 if (data.status == 0){ //更新成功
					 $(".page1a").hide();
					 $(".page1b").hide();
					 $(".page2").show();
				 }else{  //更新失败
					 $("#errormessage1").text("提交失败，稍后重试");
				 }				 
			 },
			 
			 error: function(data){
				 $("#errormessage1").text("提交失败，稍后重试");
				 console.log("contact us error : ",data);				 
			 },
			 
		 })
		 //end of ajax
	 }
//end of 聯繫我們
