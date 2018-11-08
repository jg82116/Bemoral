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

var trade_kind_introduce_m = function(){
    var get_language = getQueryString("language");
    var get_preview = getQueryString("preview");
    var get_trade_kind = decodeURI(getQueryString("trade_kind"));
    var get_trade_series = decodeURI(getQueryString("trade_series"));
    $.ajax({
        url: "/BeMoralOfficial/official/trade_kind_introduce.do",
        type: "POST",
        data:{language:get_language,preview:get_preview,trade_kind:get_trade_kind,trade_series:get_trade_series},
        cache: false,
        dataType:"JSON",
        success: function (data) {
        	console.log(data);
            if(data.status==0){
                $(".success_title span").html(data.data.trade_kind);
                if(data.data.trade_photo5 != ""){
                    $(".succession_bg_m .succession_bg img").attr("src",data.data.trade_photo5);
                }else{
                    $(".succession_bg_m .succession_bg img").attr("src",data.data.trade_photo1);
                }
                $(".succession_bg_m .success_title_end p").html(data.data.trade_titile);
                $(".details_box_m .details_box_list").eq(0).find(".details_details_m img").attr("src",data.data.trade_photo4);
                $(".details_box_m .details_box_list").eq(0).find(".details_details_m p").eq(0).html('<p>'+data.data.desc1+'</p>');
                $(".details_box_m .details_box_list").eq(0).find(".details_details_m div").eq(0).html(data.data.story_desc1);
                $(".details_box_m .details_box_list").eq(0).find(".details_details_m div").eq(1).html(data.data.story_desc2);
                $(".details_box_m .details_box_list").eq(1).find(".details_details_m p").html(data.data.story_desc1+data.data.story_desc2);
                if (data.data.trade_url_link!=null) {
//                  $(".video_box_m #example_video_1 source").attr("src",data.data.trade_url_link);
//                  $(".video_box_m #example_video_1").attr("src",data.data.trade_url_link);
                	$(".video_box_m").html(data.data.trade_url_link);
                	$(".video_box_m iframe").attr("id","example_video_m1");
                	localStorage.setItem("trade_url_link",data.data.trade_url_link);
                }else{
                  $(".video_box_m").hide();
                }
            
            var myPlayer = videojs('example_video_1');
            videojs("example_video_1", {}, function(){
              // Player (this) is initialized and ready.
            });

            myPlayer.on("pause", function(){
              // $(".vjs-big-button").hide();
            });


            myPlayer.on("play", function(){
              $(".vjs-big-button").hide();
            });
            }else{
                console.log("服务器繁忙")
            }
            
           
        },
        error: function () {
            //alert(111)
        }
    });
  }
var Index_product_details_m = function(swiper_el){
      var get_language = getQueryString("language");
      var get_preview = getQueryString("preview");
      var get_trade_kind = decodeURI(getQueryString("trade_kind"));
      var get_trade_series = decodeURI(getQueryString("trade_series"));
      $.ajax({
          url: "/BeMoralOfficial/official/gettrade_details.do",
          type: "POST",
          data:{language:"tc",preview:2,trade_kind:get_trade_kind},
          cache: false,
          dataType:"JSON",
          success: function (data) {
              if(data.status==0){

              	console.log(data);
                  data.data.forEach(function(element){
                    if (element.trade_series==get_trade_series) {
                      $("#succession .product_box_m .list_sm").append(
                    	'<li data-id='+element.id+' trade_kind='+element.trade_kind+'>'
          		  			+'<img src='+element.trade_photo1+' />'
          		  			+'<div class="list_title">'+element.title+'</div>'
          		  			+'<div class="product_buttons_m hidden-md hidden-lg"><img src="images_m/product_buttons.svg"/></div>'
          		  		+'</li>')
                    }
                  })
                 
              }else{
                  console.log("服务器繁忙")
              }
              
             
          },
          error: function () {
              //alert(111)
          }
      });
    }
var lock_num=false,lock_num1=false;
var nav_num = 0,nav_lock=false,nav_num1 = 0,nav_lock1=false;
	//商品系列页
    var trade_kind_introduce = function(){
        var get_language = getQueryString("language");
        var get_preview = getQueryString("preview");
        var get_trade_kind = decodeURI(getQueryString("trade_kind"));
        var get_trade_series = decodeURI(getQueryString("trade_series"));
        console.log(get_language+" "+get_preview+" "+get_trade_kind+" "+get_trade_series);
        $.ajax({
            url: "/BeMoralOfficial/official/trade_kind_introduce.do",
            type: "POST",
            data:{language:get_language,preview:get_preview,trade_kind:get_trade_kind,trade_series:get_trade_series},
            cache: false,
            dataType:"JSON",
            success: function (data) {
                if(data.status==0){
                    console.log("商品系列页",data.data);
                    //$(".succession_box").html(data.data.conten);
                    $("#succession .tuijian_button").html(get_trade_series);
                    $(".succession_box .left_tu").attr("src",data.data.trade_photo4);
                    $(".succession_box .details_unit").eq(0).find(".details_unit_words").html('<p>'+data.data.desc1+'</p>');
                    $(".succession_box .right_tu").attr("src",data.data.trade_photo4);
                    $(".succession_box .details_unit").eq(1).find(".details_unit_words").html('<p>'+data.data.desc2+'</p>');
                    $(".succession_box .content_left").html(data.data.story_desc1);
                    $(".succession_box .content_right").html(data.data.story_desc2);
                    $(".succession_bg img").attr("src", data.data.trade_photo1);
                    if (data.data.trade_url_link !=null) {
/*                      $("#product_video #example_video_1 source").attr("src",data.data.trade_url_link);
                      $("#product_video #example_video_1").attr("src",data.data.trade_url_link);*/
                      /*$("#example_video_1 source").attr("src",data.data.trade_url_link);*/
                      /*$("#example_video_1").attr("src",data.data.trade_url_link);*/
                      $(".video_box").append(data.data.trade_url_link);
                      $(".video_box embed").attr("id","example_video_1");
                      $(".video_box iframe").attr("id","example_video_1");
                    }else{
                      $(".video_box").hide();
                    }
                    
                    $(".succession_bg>img").addClass("fadeInDown");
                    setTimeout(function(){
                      $(".big_title").addClass("fadeInDown");
                      $(".sma_title").addClass("fadeInDown");
                    },500)
                
/*                var myPlayer = videojs('example_video_1');
                videojs("example_video_1", {}, function(){
                  // Player (this) is initialized and ready.
                });

                myPlayer.on("pause", function(){
                  // $(".vjs-big-button").hide();
                });


                myPlayer.on("play", function(){
                  $(".vjs-big-button").hide();
                });*/
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
	  $(".succession_bg").css("height",$(window).height()*0.7);
	  $('.video_box').css('display','block');
	  $("#succession .succession_bg_m .animated_5").css("opacity", "1");
	  var a = 0;
	  $(".details_box_m .details_box_list").eq(0).find(".details_s_title p").eq(1).click(function(){
		  if(a%2==0){
			  $(".details_box_m .details_box_list").eq(0).find(".details_s_title p").eq(1).html("+"); 
			  $(".details_box_m .details_box_list").eq(0).find(".details_details_m").hide();
		  }else{
			  $(".details_box_m .details_box_list").eq(0).find(".details_s_title p").eq(1).html("-"); 
			  $(".details_box_m .details_box_list").eq(0).find(".details_details_m").show();
		  }
		  a++;
	  });
	  var b = 0;
	  $(".details_box_m .details_box_list").eq(1).find(".details_details_m").hide();
	  $(".details_box_m .details_box_list").eq(1).find(".details_s_title p").eq(1).click(function(){
		  if(b%2==0){
			  $(".details_box_m .details_box_list").eq(1).find(".details_s_title p").eq(1).html("-"); 
			  $(".details_box_m .details_box_list").eq(1).find(".details_details_m").show();
		  }else{
			  $(".details_box_m .details_box_list").eq(1).find(".details_s_title p").eq(1).html("+"); 
			  $(".details_box_m .details_box_list").eq(1).find(".details_details_m").hide();
		  }
		  b++;
	  });
	  //主图
	  trade_kind_introduce_m();
	  //商品区
	  Index_product_details_m();
	  $("#succession .product_box_m .list_sm").on("click","li",function(){
	      var this_id = $(this).attr("data-id");
	      var this_kind =  $(this).attr("trade_kind");
	      window.location.href=encodeURI(encodeURI('product_details.html?id='+this_id+'&preview=2&language=tc'+'&trade_kind='+this_kind));
	    })
	  
}else{
  
Index_product_details();
trade_kind_introduce();
$(".succession_bg>img").addClass("fadeInDown");
setTimeout(function(){
  $(".big_title").addClass("fadeInDown");
  $(".sma_title").addClass("fadeInDown");
},500)




/*$(window).scroll(function(){
  // console.log(document.body.scrollTop || document.documentElement.scrollTop);
  Global.html_scroll();
})

$(".fix_none").addClass('animated');
var nav_lock = false;
Global.html_scroll=function(){
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

Global.jiantou(".left_jt_succession");

}
})