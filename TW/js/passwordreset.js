$(function(){
	
	$("#num1").click(function(){
		$("#step1").css("display","block");
		$("#step2").css("display","none"),
		$("#step3").css("display","none")
	})
	$("#num2").click(function(){
		$("#step1").css("display","none");
		$("#step2").css("display","block");
		$("#step3").css("display","none");
		console.log($("#phone_num").val());
		var abc = "<p>"+ $("#phone_num").val().substr(0,3) + "****" + $("#phone_num").val().substr($("#phone_num").length - 5,4) + "<p>"
		console.log(abc);
/*		$(abc).replaceAll("#phone_num_mask");*/
		$("#phone_num_mask").text($("#phone_num").val().substr(0,3) + "****" + $("#phone_num").val().substr($("#phone_num").length - 5,4));
	/*	$("#phone_num_mask").innerHTML =$("#phone_num").val();*/
	});

	$("#num3").click(function(){
		$("#step1").css("display","none");
		$("#step2").css("display","none");
		$("#step3").css("display","block");
	})
	
	
	


})



