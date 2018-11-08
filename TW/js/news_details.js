var Global = Global || {};
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

//新闻详情手机端
var new_details_m = function(){
    var get_language = getQueryString("language");
    var get_preview = getQueryString("preview");
    var get_news_id = getQueryString("new_id");
    var find_index_prev,find_index_next;
    $.ajax({
        url: "/BeMoralOfficial/official/getnewsbyid.do",
        type: "POST",
        data:{language:get_language,preview:get_preview,news_id:get_news_id},
        cache: false,
        dataType:"JSON",
        success: function (data) {
            if(data.status==0){
                console.log("新闻详情",data.data);
                $(".news_title_box_m .news_time").html(data.data.created);
                $("#news_details .success_title span").html(data.data.news_type);
                $("#product_details_m .success_title span").eq(1).html(data.data.title);
                $("#news_details .news_name").html(data.data.news_type);
                $("#news_details .news_sma").html(data.data.introduce);
                $(".news_img1").attr("src",data.data.trade_photo1);
                $("#news_details .news_words_m").html(data.data.conten_wap);
                //$(".video_box_m #example_video_1 source").attr("src",data.data.video_url);
                //$(".video_box_m #example_video_1").attr("src",data.data.video_url);
                $('#news_details .news_words_m p').eq(0).html(data.data.news_title);
                if (data.data.video_url!="") {
	            	$(".video_box_m").html(data.data.video_url);
	            	$(".video_box_m iframe").attr("id","example_video_m1");
                }else{
                    $("#news_details .news_video").hide();
                }
            }else{
                console.log("服务器繁忙")
            }
            
           
        },
        error: function () {
            //alert(111)
        }
    });
   $.ajax({
        url: "/BeMoralOfficial/official/getnews.do",
        type: "POST",
        data:{language:get_language,preview:get_preview},
        cache: false,
        dataType:"JSON",
        success: function (data) {
            if(data.status==0){
                console.log("新闻详情所有",data.data);
            data.data.forEach(function(element,index){
              console.log(element.news_id,get_news_id)
              if (element.news_id==get_news_id) {
                find_index_next=index-1;
                find_index_next=index+1;
              }
            })
            if (find_index_next<data.data.length) {
              $(".show_news_next_m").on("click",function(){                	  
                 window.location.href=encodeURI(encodeURI('new_details.html?new_id='+data.data[find_index_next].news_id+'&language='+link_language+'&preview='+link_preview+''));
              })
              $("#news_details .show_news_next_m .news_time").html(data.data[find_index_next].created);
              $("#news_details .show_news_next_m .news_form").html(data.data[find_index_next].news_title);
            }else{
            	$("#news_details .show_news_next_m .next_new_infor_right").html("已無更多新聞");
            }
            
            }else{
                console.log("服务器繁忙")
            }
            
           
        },
        error: function () {
            //alert(111)
        }
    });
  }
  

$(function(){

	if(browser.versions.mobile || browser.versions.android || browser.versions.iPhone || browser.versions.iPad){ 
		//官网首页展示 		
		$("#big_big").addClass("container-fluid_m");
		//移动端
		$("#news_details").css("width","100%");
		$("#news_details").css("margin-top","130px");
		new_details_m();
	}else{

		new_details();//pc端
	}


$(".product_banner .swiper-pagination-bullets").css("marginLeft",(-$(".product_banner .swiper-pagination-bullets").width()/2)+"px");

$(".product_swiper_box").css("marginTop",-$(".product_swiper_box").height()/2);


/*$(window).scroll(function(){
  // console.log(document.body.scrollTop || document.documentElement.scrollTop);
  Global.html_scroll();
})*/

$(".fix_none").addClass('animated');
var nav_lock = false;
/*Global.html_scroll=function(){
  if (document.body.scrollTop || document.documentElement.scrollTop>=$(".footer").offset().top-$(".footer").height()-300) {
    $(".copy_right").addClass("fadeInUp");
    $(".footer_list>li>span").addClass("fadeInUp");
    $(".footer_list>li>ul>li>a").addClass("fadeInUp");
    setTimeout(function(){
      $(".search_box").addClass("fadeIn");
    },300)
  }



  if (document.body.scrollTop || document.documentElement.scrollTop>=20) {
    nav_lock = false;
    setTimeout(function(){
      $(".second_menu").hide();
      $("#first_menu a").removeClass("active");
      $(".bottom_line,.bottom_line1").width(0);
      $(".second_menu_ul li a").removeClass("active");
      $(".fix_none").addClass('fadeOut');
      $(".nav_box").css("position","fixed");
      $(".nav_box").css("top","0px");
      $(".nav_box").stop().animate({height:"80px"},50);
      $(".nav_box").on('mouseenter',function(){
        if (nav_lock==true) {
          return false;
        }
        $(".fix_none").removeClass('fadeOut').addClass('fadeIn');
        $(".nav_box").css("top","0px");
        $(".nav_box").css("position","fixed");
        $(".nav_box").stop().animate({height:"140"},50);
        $(".second_menu").css("position","fixed");
      })
    },1)
  }else if(document.body.scrollTop || document.documentElement.scrollTop<20){
    nav_lock = true;
    setTimeout(function(){
      $(".second_menu").css("position","absolute");
      $(".fix_none").removeClass('fadeOut').addClass('fadeIn');
      $(".nav_box").css("top","40px");
      $(".nav_box").css("position","absolute");
      $(".nav_box").stop().animate({height:"140"},50);
    },1)
    
  }
}

Global.html_scroll();*/

Global.jiantou(".new_jiantou_left");
Global.jiantou(".new_jiantou_right");




mySwiper3 = new Swiper('#swiper3', {
  loop:true,
  navigation: {
    nextEl: '.right_jt_product',
    prevEl: '.left_jt_succession',
  },
  slidesPerView: 3,//一行显示3个
  slidesPerColumn: 3,//显示2行
  centeredSlides : false,
  grabCursor: true,
  breakpoints: { 
    // 1600: {
    //   slidesPerView: 3,
    //   loopedSlides: 3,
    // }
  },
  on:{
    init:function(){
    },
    resize: function(){
      this.updateSize();
      if ($(window).width()<=1600) {
        $(".show_box_title").css("line-height","100%");
      }else{
        $(".show_box_title").css("line-height","150%");
      }

      if ($(window).width()<=1700) {
        $("#swiper2 .swiper-slide.swiper-slide-prev .tab_unit").addClass("w_1700");
        $("#swiper2 .swiper-slide.swiper-slide-next .tab_unit").addClass("w_1700");
      }else{
        $("#swiper2 .swiper-slide.swiper-slide-prev .tab_unit").removeClass("w_1700");
        $("#swiper2 .swiper-slide.swiper-slide-next .tab_unit").removeClass("w_1700");
      }
      
    },
    slidePrevTransitionStart:function(){

    },
    slideNextTransitionStart:function(){

    },
  },
})






  

})