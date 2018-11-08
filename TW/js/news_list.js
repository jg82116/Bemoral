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
var lock_num=false,lock_num1=false;
var nav_num = 0,nav_lock=false,nav_num1 = 0,nav_lock1=false;
//新闻列表页

var new_list_m = function(){
  var get_language = getQueryString("language");
  var get_preview = getQueryString("preview");
  var get_news_type = decodeURI(getQueryString("news_type"));
  console.log(get_language+" "+get_preview+" "+''+get_news_type+'');
  $.ajax({
      url: "/BeMoralOfficial/official/getnews.do",
      type: "POST",
      data:{language:get_language,preview:get_preview},
      cache: false,
      dataType:"JSON",
      success: function (data) {
          if(data.status==0){
              console.log("新闻列表app",data.data);
              data.data.forEach(function(element,index){
              $("#new_list_box").append(
            		  '<div class="show_news" data-id='+element.news_id+' data-language='+element.language+' data-preview='+element.preview+'>'
            		  +'<div class="show_news_list">'
            		  +'<div class="show_img2_mark_m animated">'+element.news_type+'</div>'
            		  +'<div class="new_pop2_box_m">'
            		  +'<img class="new_img" src='+element.trade_photo1+' /></div>'
            		  +'<div class="bottom_new_des">'
            		  +'<div class="bottom_new_des1"> '+element.news_title+'</div>'
            		  +'<div class="bottom_new_des2">'+element.introduce+'</div>'
            		  +'     <div class="mouse_pop_m">'
            		  +'       <div class="icons_sm">'
            		  +'       <img class="animated_m" src="images/news_icons.png" />'
            		  +'      </div>'
            		  +'       <span class="date_time_m">'+element.created+'</span>'
            		  +'     </div>'
            		  +'   </div>'
            		  +'</div>'
            		  +'</div>')
            })

            $("#new_list_box").on("click",".show_news",function(e){
              var link_id =  $(this).attr("data-id");
              var link_language =  $(this).attr("data-language");
              var link_preview =  $(this).attr("data-preview");
              window.location.href=encodeURI(encodeURI('new_details.html?new_id='+link_id+'&language='+link_language+'&preview='+link_preview+''));
            })

            $(".bottom_des2").each(function(){
              if ($(this).text().length>70) {
                $(this).text($(this).text().substring(0,70) + '~');
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


$(function(){
	if(browser.versions.mobile || browser.versions.android || browser.versions.iPhone || browser.versions.iPad){ 
		//官网首页展示 		
		$("#big_big").addClass("container-fluid_m");
		//移动端
		$(".news_list").css("margin-top","130px");
		  new_list_m();
	}else{
		  new_list();//pc端
	}
// var gallery = $('.show_pop2_box').gallerify({
//   margin:0,
//   mode:'bootstrap',
//   lastRow:'adjust'
// }); 

$(".product_banner .swiper-pagination-bullets").css("marginLeft",(-$(".product_banner .swiper-pagination-bullets").width()/2)+"px");

$(".product_swiper_box").css("marginTop",-$(".product_swiper_box").height()/2);


$(window).scroll(function(){
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

Global.html_scroll();

Global.jiantou(".new_jiantou_left");
Global.jiantou(".new_jiantou_right");


  Global.mouseover_show1 = function(obj){
    var _this;
    $(obj).on("mouseenter",".show_pop2",function(){
      img_lock=false;
      img_num=0;
      _this = $(this);
      //_this.find(".black1").fadeIn(300);      
      _this.find(".mouse_pop_dibu").transition({height:340},200,"linear",function(){});
      _this.find(".mouse_pop").removeClass("fadeIn").transition({height:340},200,"linear",function(){});
      _this.find(".icons").removeClass("fadeIn");
      _this.find(".mouse_pop").addClass("fadeIn");
      _this.find(".bottom_des1").css('color',"#fff");
      _this.find(".bottom_des2").css('color',"#fff");
      set_img_show();
      
    })

    var img_num = 0;
    function set_img_show(){
      var c = setInterval(function(){
        if (img_lock==true) {
          clearInterval(c);
          _this.find(".icons img").stop().removeClass("fadeInUp");
          return false;
        }else{
          _this.find(".icons img").eq(img_num).addClass("fadeInUp");
          img_num++;
          if (img_num==5) {
            _this.find(".date_time").stop().addClass("fadeInUp");
            clearInterval(c);
          }
        }
      },200)
    }
    

    $(obj).on("mouseleave",".show_pop2",function(){
      img_lock=true;
      //_this.find(".black1").hide();   
      _this.find(".mouse_pop_dibu").css({height:270});
      _this.find(".bottom_des1").css('color',"#333");
      _this.find(".bottom_des2").css('color',"#333");
      _this.find(".mouse_pop").removeClass("fadeIn").css({height:270});
      _this.find(".icons").removeClass("fadeIn");
      _this.find(".date_time").removeClass("fadeInUp");
      _this.find(".icons img").stop().removeClass("fadeInUp");
    })
  }


  Global.mouseover_show1(".show_pop2_box");





  

})