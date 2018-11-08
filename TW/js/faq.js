var processing = false;
$(document).ready(function () {
	
	$(".faq_question").click(function(){
		if(processing) return false;
		var $btn = $(this).find('.faq_item_btn');
		if ($btn.hasClass('faq_open')){
			processing == true;
			do_faq_close();
		}else{
			processing == true;
			do_faq_close();
			var $faqItem = $(this).parent();
			$faqItem.find('.faq_answer_container').stop(true,false).slideDown(function(){
				processing = false;	
		  	});
			$btn.removeClass('faq_close').addClass('faq_open');
		}
	  });	
    $(".initopen").eq(0).trigger('click').focus();
	});

function do_faq_close(){
	var nowopen = $(".faq_open");
	if(nowopen.is('div')){
		var $faqItem = nowopen.parents('.faq_item');
		$faqItem.find('.faq_answer_container').stop(true,false).slideUp(function(){
			processing = false;	
	  });
		nowopen.removeClass('faq_open').addClass('faq_close');
	}
}

	
$().ready(function() {
	
	//get count all

/*	var getAllCount = function(){*/

/*		 var language = getQueryString("language");*/
		 var language = getCookie("language");
		 var preview = "2";
		 var sendreturn = "發貨及售後";
		 var other = "其他";
		 var all = null;

		 var parent_name = null;

		 /*getAllQACount(language,preview,null,null);*/
		 getAllQACount(language,preview,parent_name,null);
		 getAllQACount(language,preview,sendreturn,null);
		 getAllQACount(language,preview,other,null);
		 
		 getQAdetails(language,preview,null,null,1);	 		 		 		 

		 getQAname(language, preview,null);
		 
		 $("#QAform").validate({
			 rules: {
				 name: "required",
				 email: "required",
				 question_type:"required",
				 desc:{
					 required: true,
					 maxlength:1000,
				 }
			 },
			 messages:{
				 name: "請輸入用戶名",
				 email: "請輸入郵箱",
				 question_type:"請輸入問題種類",
				 desc:{
					 required:"請輸入描述信息",
					 maxlength:"請勿超過1000個字符"
				 }
			 },
			 success:"valid",
			 submitHandler: function(form) 
			 {   

				 subQA(language, preview);			     								 
			 },
		 });
		 
		 
		 $(document).on('click','#page',function(){
			 var page = $(this).html();
			 $("#pagination").find(".faq_page_click").removeClass("faq_page_click");
			 $(this).addClass("faq_page_click");
			 console.log("page click1 ",page);
			 getQAdetails(language,preview,parent_name,null,page);
			 $("#pagination").attr("currpage",page);			 
		 });
		 
		 $("#prevpage").click(function(){
			 var currentpage = $("#pagination").attr("currpage");
			 if (currentpage == 1){
				 return;
			 } else {
				 var curr = $("#pagination").find(".faq_page_click");
				 curr.removeClass("faq_page_click");
				 curr.parent().prev().find("span").addClass("faq_page_click");
				 var page = currentpage - 1;
				 console.log("page prev ", page);
				 getQAdetails(language,preview,parent_name,null,page);
				 $("#pagination").attr("currpage",page);
			 }			 
		 })
		 
		 $("#nextpage").click(function(){
			 var currentpage = parseInt($("#pagination").attr("currpage"));
			 var maxpage = $("#pagination").attr("maxpage");
			 if (currentpage >= maxpage){
				 return false;
			 }  	
			if(currentpage == 1){
				var curr = $("#page").first();
			 } else {
				 var curr = $("#pagination").find(".faq_page_click");
				 curr.removeClass("faq_page_click");
			 }
			
			curr.parent().next().find("span").addClass("faq_page_click");
			var page = currentpage + 1;
			console.log("page next ",page);
			getQAdetails(language,preview,parent_name,null,page);
			$("#pagination").attr("currpage",page);			 			 
		 })
		 
		 $("#faqSR").click(function(){
			 parent_name = sendreturn;
			 getQAdetails(language,preview,parent_name,null,1);	
			 //console.log(parseInt($("#faqCountSR").text()));
			 //console.log($("#faqCountSR").text());
			 pageCount($("#faqCountSR").text()/10);
			 
			 
		 })
		 
		 $("#faqO").click(function(){
			 parent_name = other;
			 getQAdetails(language,preview,parent_name,null,1);	
			 //console.log(parseInt($("#faqCountO").text()));
			 pageCount($("#faqCountO").text()/10);
			 
		 })
		 
		 $("#faqAll").click(function(){
			 parent_name = all;
			 getQAdetails(language,preview,parent_name,null,1);	
			 //console.log(parseInt($("#faqCountAll").text()));
			 pageCount($("#faqCountAll").text()/10);
			 
		 })
		 

		 var maxCount = 1000;  // 最高字数
		 $("#desc").keyup(function(){
			 var len = getStrLength(this.value);
			 $("#count").html(maxCount-len);
		 })
		 
		 


})

// 中文字符判断
function getStrLength(str) { 
	var len = str.length; 
	var reLen = 0; 
	for (var i = 0; i < len; i++) {        
		if (str.charCodeAt(i) < 27 || str.charCodeAt(i) > 126) { 
			// 全角    
			reLen += 2; 
		} else { 
			reLen++; 
		} 
	} 
	return reLen;    
}




function pageCount(page){
	$("#pagination").empty();
	for (var i = 0; i<page;i++){
		var li = '<li><span id="page">' + (i+1) + '</span></li>';
		$("#pagination").append(li);
	}
	$("#pagination").attr("maxpage",i);
	$("#pagination").attr("currpage",1);
	
}

function getQAdetails(language,preview,parent_name,qa_name,page){
	//get all QA
	 //console.log("get all QA ",parent_name);
	 $.ajax({
     	   url: "/BeMoralOfficial/official/getAllQA.do",
	       type: "POST",
	       data:{
	    	   language:language,
	    	   preview:preview,
	    	   parent_name: parent_name,
	    	   qa_name: qa_name,
	    	   page:page,
	    	   },
	       cache: true,
	       dataType:"JSON",
	       success: function (data) {
	    	   //console.log("QA data:", data);	    	
	    	   if (data.status == 0){
	    		  /* var qadata = new Array();*/
	    		   for (var i=1; i<=10;i++){
	    			   var faq_question_id = "faq_question_"+i;
	    			   var faq_answer_id = "faq_answer_" + i;
	    			   $("#" + faq_question_id).parents('.faq_item').addClass("faq_hide").removeClass("faq_display"); 
	    		   }
	    			   
	    		   for (var i=1; i<=(data.data.length);i++){
		    		   var faq_question_id = "faq_question_"+i;
		    		   var faq_answer_id = "faq_answer_" + i;
	    			   $("#" + faq_question_id).text(data.data[i-1].question);
	    			   $("#" + faq_answer_id).html(data.data[i-1].answer);
	    			   $("#" + faq_question_id).parents('.faq_item').addClass("faq_display").removeClass("faq_hide");		    			   
	    		   }
	    	   }else{
	    		   //TBC
	    		   console.log("get QA failed", empty)
	    	   }
	    	   		    		   
	       },
	       error:function(data){	    	
	    	   console.log("get QA failed", data);
	    	   /*pageCount(5);*/

	       }
	 })	 
//end 	
}

function getAllQACount(language,preview,parent_name,qa_name){
	 //console.log("get all count");
	 $.ajax({
    	   url: "/BeMoralOfficial/official/getAllQACount.do",
	       type: "POST",
	       data:{
	    	   language:language,
	    	   preview:preview,
	    	   parent_name:parent_name,
	    	   qa_name:qa_name,
/*	    	   parent_name:null,
	    	   qa_name:null,*/
	    	   },
	       cache: false,
	       dataType:"JSON",
	       success: function (data) {
	    	   //console.log("QA Count", data.data);
	    	   if(parent_name == null){
	    		   $("#faqCountAll").text(data.data);
	    		   var page = data.data/10;
	    		   pageCount(page);		    		   	    		   
	    	   }else if(parent_name == "發貨及售後"){
	    		   $("#faqCountSR").text( data.data);
	    		   
	    	   }else if(parent_name == "其他"){
	    		   $("#faqCountO").text(data.data);
	    	   }
	       },
	       error:function(data){	    	
	    	   console.log("get all count failed", data);
	    	   if(parent_name == null){
	    		   $("#faqCountAll").text(0);
	    		   pageCount(1);
	    	   }
	       }
})
}
//end of get count all
	 
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
				 //console.log("get QA name ",data);
				 if(data.status == 0){
					 data.data.forEach(function(element){
						 $("#question_type").append('<option>' + element.qa_name + '</option>');
					 });						 										 
				 }
				 
			 },
			 error:function(data){
				 //TBC
				 console.log("get QA name failed ",data);
			 },
		 })
		 
}

function subQA(language, preview){
	var name = $("#name").val();
	var email = $("#email").val();
	var qa_name = $("#question_type").val();
	var massage = $("#desc").val();
	/*console.log("qa_name: ", qa_name);*/
	$.ajax({
		 url: "/BeMoralOfficial/official/save_massage.do",
		 type: "post",
		 data:{
			 language: language,
			 preview:preview,
			 name: name,
			 email: email,
			 qa_name: qa_name,
			 massage: massage,
		 },
		 cache: false,
		 dataType: "JSON",
		 success:function(data){
			 //console.log("save QA ",data);
			 if(data.status == 0){
				
				 $("#errormessage1").text("更新成功");
				 //$("#errormessage1").show();
			 }else{
				 $("#errormessage1").text("提交失败，稍后重试");
				 //$("#errormessage1").show();
			 }
			 
		 },
		 error:function(data){
			 //TBC
			 $("#errormessage1").text("提交 失败，稍后重试");
			 $("#errormessage1").show();
		 },
	 })
}
	 