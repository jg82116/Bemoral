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


function unScroll() {
    var top = $(document).scrollTop();
    $(document).on('scroll.unable', function(e) {
      $(document).scrollTop(top);
    })
}
function reScroll() {
    $(document).off('scroll.unable');
}  


/*function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
} 

function getStr(string,str){ 
    var str_before = string.split(str)[0]; 
    var str_after = string.split(str)[1]; 
    return str_after; 
}*/ 
 

// alert($(window).width()) 




var mySwiper,mySwiper2,mySwiper3,mySwiper4,mySwiper5,lock_num=false,lock_num1=false,img_lock = false;
$(function(){
    var click_lock = click_lock1 = false;
    $("#first_menu li a").append("<span class='bottom_line'></span>");
    

/*    $(".footer_list li ul li a").append("<span class='bottom_line_new'></span>");*/
    

/*    $(".nav_box .right_button a").append("<span class='bottom_line'></span>");*/

    $("#first_menu li a").on("mouseenter",function(){
      var this_ = $(this);
      console.log(this_.width()-5);
      $(this).find("span").stop().animate({width:this_.width()},200,"linear",function(){});
    });

    $("#first_menu li a").on("click",function(){
      var this_ = $(this);
      $(this).parent("li").siblings().find("a").removeClass("active");
      $("#first_menu li a").find("span").stop().animate({width:"0%"},200,"linear",function(){});
      if ($(this).hasClass('active')) {
        $(this).removeClass('active');
      }else{
        $(this).addClass('active');
        $(this).find("span").stop().animate({width:this_.width()-5},200,"linear",function(){});
      }

      $(".second_menu_li_ul li ul").slideDown();
      
    });

    $("#first_menu li a").on("mouseleave",function(){
      if ($(this).hasClass('active')) {

      }else{
        $(this).find("span").stop().animate({width:"0%"},200,"linear",function(){});
      }
      
    });




/*    $(".footer_list li ul li a").on("mouseenter",function(){
      var this_ = $(this);
      console.log(this_.width()-5)
      $(this).find("span").stop().animate({width:this_.width()-3},200,"linear",function(){});
    });

    $(".footer_list li ul li a").on("click",function(){
      var this_ = $(this);
      $(this).parent("li").siblings().find("a").removeClass("active");
      $(".footer_list li ul li a").find("span").stop().animate({width:"0%"},200,"linear",function(){});
      if ($(this).hasClass('active')) {
        $(this).removeClass('active');
      }else{
        $(this).addClass('active');
        $(this).find("span").stop().animate({width:this_.width()-3},200,"linear",function(){});
      }
      
    });

    $(".footer_list li ul li a").on("mouseleave",function(){
      if ($(this).hasClass('active')) {

      }else{
        $(this).find("span").stop().animate({width:"0%"},200,"linear",function(){});
      }
      
    });*/

    
 
        

    $(".choose_skin_unit_num span").each(function(){
      if ($(this).text()>=1000) {
        $(this).text("999+");
      }
    })




    var _this_width = $(".search_box").css("width");

    $(".search_box").on("mouseenter",function(){
      var _this = $(this);
      _this.css("width",parseInt(_this_width)+20);
    })

    $(".search_box").on("mouseleave",function(){
      var _this = $(this);
      _this.css("width",_this_width);
    })

    $(window).resize(function() {
      //$(".news_list .show_pop2").height($(".news_list .show_pop2").width()*(869/464));
    });


    $(".reviews_button2").mouseenter(function(){
      $(this).addClass("focus");
    })

    $(".reviews_button2").mouseleave(function(){
      $(this).removeClass("focus");
    })

    $(".buy_button2").mouseenter(function(){
      $(this).addClass("focus");
    })

    $(".buy_button2").mouseleave(function(){
      $(this).removeClass("focus");
    })



    function isNumber(value) {         //验证是否为数字
        var patrn = /^(-)?\d+(\.\d+)?$/;
        if (patrn.exec(value) == null || value == "") {
            return false
        } else {
            return true
        }
    }

    $(".num_add").on("click",function(){
      if ($(".bur_num").val()<999) {
        $(".bur_num").val(parseInt($(".bur_num").val())+1);
      }
    })

    $(".num_minus").on("click",function(){
      if ($(".bur_num").val()>1) {
        $(".bur_num").val(parseInt($(".bur_num").val())-1);
      }
    })

    $(".bur_num").change(function(){
      if (isNumber($(".bur_num").val())) {
        if ($(".bur_num").val()<=0) {
          $(".bur_num").val(1);
        }else if($(".bur_num").val()>=1000){
          $(".bur_num").val(999);
        }
      }else{
        $(".bur_num").val(1);
      }
      
    })

    


    if ($("nav").hasClass("black_nav")) {
      $(".submit_text img").attr("src","images/person_icon1.png");
    }



    Global.input_show_blur=function(show_obj,input_obj){
      $(show_obj).on("click",function(){
        $(show_obj).addClass("fadeOutDown");
        $(show_obj).siblings(".contact_us").addClass("fadeOutDown");
        setTimeout(function(){
          $(input_obj).fadeIn(1000,function(){
            $(input_obj).focus();
          });
          // $(show_obj).siblings(".search_btn").fadeIn();
        },500)
        
      })
      $(input_obj).on("blur",function(){
        $(input_obj).hide();
        $(show_obj).removeClass("fadeOutDown").addClass("fadeInUp");
        $(show_obj).siblings(".contact_us").removeClass("fadeOutDown").addClass("fadeInUp");
        // $(show_obj).siblings(".search_btn").hide();
      })
    }

  Global.input_show_blur(".search_button",".search_input");



    Global.jiantou = function(jt_obj){
    var this_jt = $(jt_obj);
    this_jt.on("mouseenter",function(){
      this_jt.animate({ opacity:"1" }, 250, 'linear', function(){});
      this_jt.find(".top_box_inside").animate({ height:"100%" }, 250, 'linear', function(){
        this_jt.find(".top_box_inside").css("top","0px");
        this_jt.find(".top_box_inside").css("bottom","auto");
      });
      this_jt.find(".bottom_box_inside").animate({ height:"100%" }, 250, 'linear', function(){
        this_jt.find(".bottom_box_inside").css("top","auto");
        this_jt.find(".bottom_box_inside").css("bottom","0px");
      });
    });

    this_jt.on("mouseleave",function(){
      this_jt.animate({ opacity:"1" }, 250, 'linear', function(){});
      this_jt.find(".top_box_inside").animate({ height:"0%" }, 250, 'linear', function(){
        this_jt.find(".top_box_inside").css("top","auto");
        this_jt.find(".top_box_inside").css("bottom","0px");
      });
      this_jt.find(".bottom_box_inside").animate({ height:"0%" }, 250, 'linear', function(){
        this_jt.find(".bottom_box_inside").css("top","0px");
        this_jt.find(".bottom_box_inside").css("bottom","auto");
      });
    });
  }


/*  Global.lang_show_hide=function(show_obj,lang_obj){
    $(show_obj).on("click",function(){
      $(lang_obj).slideToggle();
      $(lang_obj).fadeToggle();
      return false;
    })

    $(lang_obj).find("li").on("click",function(){
      var this_ = $(this);
      var this_text = this_.text();
      $(show_obj).text(this_text);
      $(lang_obj).slideToggle(1,function(){
        $(lang_obj).prepend(this_);
      });

    })

    $("body").on("click",function(){
    	$(lang_obj).slideUp("slow");
    	$(lang_obj).fadeOut();
    })
  }

  Global.lang_show_hide(".lang_change",".lang_choose");
*/
/*  Global.div_show_hide = function(trigger_obj,execute_obj){

    $(trigger_obj).on("click",function(){
      
      var this_ = $(this);
      var index_ = this_.index();
      if (index_==0) {
        
      }else if (index_==1) {
        //window.location.href='product_succession.html?language='+link_language+'&preview='+link_preview+'&trade_kind='+trade_kind+'';
        return false;
      }else if (index_==2) {
        window.location.href='new_list.html?language='+link_language+'&preview='+link_preview+'';
        return false;
      }else if (index_==3) {
        //window.location.href='new_list.html?language='+link_language+'&preview='+link_preview+'';
        return false;
      }else if (index_==4) {
        //window.location.href='new_list.html?language='+link_language+'&preview='+link_preview+'';
        return false;
      }
      console.log("1")
      $(execute_obj).slideToggle();
      if(lock_num==true){
        lock_num=false;
        return false;
      }else{
        lock_num=true;
        return false;
      }


    })

  } 

  Global.div_show_hide("#first_menu li",".second_menu");
*/

/*  Global.second_menu_show_hide = function(second_menu_li,second_menu_li_ul){
    $(second_menu_li).on("click",function(){
      var this_link = $(this).attr("link");
      if (!this_link=="") {
        window.location.href=encodeURI(encodeURI(this_link));
        return false;
      }
      if ($(this).siblings("ul").css("display") == 'block') {
        $(second_menu_li_ul).hide();
      }else{
        $(second_menu_li_ul).hide();
        $(this).siblings(second_menu_li_ul).slideToggle();
        $(this).siblings(second_menu_li_ul).find("span").addClass("fadeInDown");
        setTimeout(function(){
          
        },500)
      }
      if(lock_num1==true){
        lock_num1=false;
        return false;
      }else{
        lock_num1=true;
        return false;
      }
    })
  } 
*/
  

/*  $(".second_menu_ul>li>ul").find("span").addClass('animated').css("opacity","0");

  $(".second_menu_ul>li>ul").on("click",function(){
    return false;
  })*/


/*  $(".logo").on("click",function(){
    window.location.href="index.html";
  })*/

/*  $("body").on("click",function(){
    
    $(".second_menu").slideUp();
    $(".second_menu_ul>li>ul").slideUp();
    $("#first_menu a").removeClass("active");
    $(".bottom_line,.bottom_line1").width(0);
    $(".second_menu_ul li a").removeClass("active");
  })*/

  var start_state=1;
  $(".left_more_pop").on("click",function(){
    if (start_state==1) {
      start_state=2;
      $(".left_more_pop").addClass("white");
      $("body").addClass("white");
      $(".product_menu_pop").stop().animate({width:"40%"},500,function(){
        $(".product_menu").show().removeClass("fadeOutUp").addClass("fadeInDown");
      })
    }else if(start_state==2){
      start_state=1;
      $(".product_menu").hide();
      $("body").removeClass("white");
      $(".left_more_pop").removeClass("white");
      $(".product_menu_pop").stop().animate({width:"0%"},500,function(){
        $(".product_menu").removeClass("fadeInDown");
      })
    }
    
  })

  $(".main").on('click',function(){
    if (start_state==2) {
      $(".left_more_pop").trigger("click");
    }
    
  })


  Global.rotate = function(rotate_obj){
    $(rotate_obj).on("mouseenter",function(){
      var _this1 = $(this);
      _this1.find(".left_cir").css({ rotate: '+=90' });
      _this1.find(".right_cir").css({ rotate: '+=90' });
    })

    $(rotate_obj).on("mouseleave",function(){
      var _this1 = $(this);
      _this1.find(".left_cir").css({ rotate: '-=90' });
      _this1.find(".right_cir").css({ rotate: '-=90' });
    })
  }

  Global.rotate(".rotate_box");

  var _this_width = $(".search_box").css("width");

  $(".search_box").on("mouseenter",function(){
    var _this = $(this);
    _this.css("width",parseInt(_this_width)+20);
  })

  $(".search_box").on("mouseleave",function(){
    var _this = $(this);
    _this.css("width",_this_width);
  })

  
})