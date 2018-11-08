var Global = Global || {};
var arrl=[];
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

//官网首页展示 
var banner_img = function(swiper_el){
	if(browser.versions.mobile || browser.versions.android || browser.versions.iPhone){ 
	    $.ajax({
	        url: "/BeMoralOfficial/official/getcarousel.do",
	        type: "POST",
	        data:{language:"tc",preview:2,isPC:1},
	        cache: false,
	        dataType:"JSON",
	        success: function (data) {
	            if(data.status==0){
                    console.log('首页展示',data.data)
            		data.data.forEach(function(element){
                        $(".index #swiper1 .swiper-wrapper").append('<div class="swiper-slide">'
		                +'<img class="center-block img-responsive" src="'+element.carousel_photo1+'" />'
		                +'<div class="carouselDesc">'
		                +'<p class="big_slogen animated_5">'+element.title1+'</p>'
		                +'<p class="sma_slogen animated_5">'+element.title2+'</p>'
		                +'<a class="shop_now animated_5 hidden-md hidden-lg"><span class="animated">了解詳情</span></a>'
		                +'</div></div>'
		                )
	                  });
                    $(".big_slogen").css('font-size',"50px");
                    $(".sma_slogen").css('font-size',"20px");
                    $(".sma_slogen").css('padding-left',"15%");
                    $(".sma_slogen").css('padding-right',"15%");
                    $(".shop_now").css("display","flex");
                    $(".shop_now").css("justify-content","center");
                    $(".shop_now").css("left","30%");
                    $(".shop_now").css("margin-top","25%");
                    $(".shop_now").css("width","40%");
                    $(".shop_now").css("background-color","#000");
                    $(".shop_now").css("height","55px");
                    $(".shop_now").css("font-size","20px");
                    $(".shop_now").css("line-height","55px");
                    $("#swiper1").css('height', $(window).height());
                    $(".img-responsive").css('height',"100%");
                      setTimeout(function(){
                        var mySwiper = new Swiper('#swiper1', {
                          loop:true,
                          speed:500,
                          nested:true,
                          autoplay: {
                            delay: 5000
                          },
                          on:{
                            init:function(){
                                var H = $(window).height();
                                var W = $(window).width();
                            	if(browser.versions.iPhone){
                            		//H-=119;
                            	}
                              $("#swiper1").css('height', H + 'px');
                              //$("#swiper1 .swiper-slide").css('width', '100%'); 
                              //$("#swiper1 .swiper-slide img").css('width', '100%'); 
                              $("#swiper1 .swiper-slide").css('height', H + 'px');    
                              $("#swiper1 .swiper-wrapper").css('height', H + 'px');
                              $("#swiper1 .swiper-slide-active .big_slogen").addClass("fadeInDown");
                             
                              setTimeout(function(){
                                $("#swiper1 .swiper-slide-active .sma_slogen").addClass("fadeInDown");
                                $("#swiper1 .swiper-slide-active .shop_now").addClass("fadeInDown")
                                $("#swiper1 .swiper-slide-active .shop_now span").addClass("fadeInDown")
                              },500)
                              //banner_img(this);
                            },
                            resize: function(){
                              //窗口变化
                              var H = $(window).height();
                              if(browser.versions.iPhone){
                          		//H-=119;
                          		}
                              //$("#swiper1 .swiper-slide").css('width', '100%'); 
                              $("#swiper1 .swiper-slide img").css('width', '100%'); 
                              $("#swiper1").css('height', H + 'px');
                              $("#swiper1 .swiper-slide").css('height', H + 'px');    
                              $("#swiper1 .swiper-wrapper").css('height', H + 'px');  
                              this.updateSize();
                            },
                            slideChangeTransitionEnd:function(){

            					$(".big_slogen").css("opacity","0").removeClass("fadeInDown");
            					$(".sma_slogen").css("opacity","0").removeClass("fadeInDown");
            					$(".shop_now").css("opacity","0").removeClass("fadeInDown");
            					$(".shop_now span").css("opacity","0").removeClass("fadeInDown");
            					$("#swiper1 .swiper-slide-active .big_slogen").addClass("fadeInDown");
            					setTimeout(function(){
            						$("#swiper1 .swiper-slide-active .sma_slogen").addClass("fadeInDown");
            						setTimeout(function(){
            							$("#swiper1 .swiper-slide-active .shop_now").addClass("fadeInDown");
            							setTimeout(function(){
            								$("#swiper1 .swiper-slide-active .shop_now").addClass("fadeInDown");
            								$("#swiper1 .swiper-slide-active .shop_now span").addClass("fadeInDown");
            							},200)    
            						},200)   
            					},200)    
                            },

                          },
                        })
                        
                      },300)
            	
	            }else{
	                console.log("服务器繁忙")
	            }
	            
	           
	        },
	        error: function () {
	            //alert(111)
	        }
	    });
	}else{
		$.ajax({
	        url: "/BeMoralOfficial/official/getcarousel.do",
	        type: "POST",
	        data:{language:"tc",preview:2,isPC:0},
	        cache: false,
	        dataType:"JSON",
	        success: function (data) {
	            if(data.status==0){
                console.log('首页展示',data.data)
                data.data.forEach(function(element){
                  $(".index #swiper1 .swiper-wrapper").append('<div class="swiper-slide">'
          +'<img class="center-block img-responsive" src="'+element.carousel_photo1+'" />'
          // gj add a new to avoid desc override
/*            +'<span class="big_slogen animated_5">'+element.title1+'</span>'
          +'<span class="sma_slogen animated_5">'+element.title2+'</span>'*/
          +'<div class="carouselDesc">'
          +'<p class="big_slogen animated_5">'+element.title1+'</p>'
          +'<p class="sma_slogen animated_5">'+element.title2+'</p>'
          +'<a class="shop_now animated_5 hidden-md hidden-lg"><span class="animated">shop now</span></a>'
          +'</div></div>'
          )
                });

          var img1 = new Image();
          img1.src=data.data[0].carousel_photo1;
          img1.onload = function(){
            $("#swiper1").css('height', img1.height*($("body").width()/1920));
            console.log(img1.height)
            setTimeout(function(){
              var mySwiper = new Swiper('#swiper1', {
                loop:true,
                pagination: {
                  el: '.swiper-pagination1',
                  clickable :true
                },
                autoplay: {
                  delay: 5000
                },
                direction : 'vertical',
                on:{
                  init:function(){
                    var H = $("#swiper1 img").eq(this.activeIndex).height();
                    $("#swiper1").css('height', H + 'px');
                    $("#swiper1 .swiper-slide").css('height', H + 'px');    
                    $("#swiper1 .swiper-wrapper").css('height', H + 'px');
                    $("#swiper1 .swiper-slide-active .big_slogen").addClass("fadeInDown");
                   
                    setTimeout(function(){
                      $("#swiper1 .swiper-slide-active .sma_slogen").addClass("fadeInDown");
                      $("#swiper1 .swiper-slide-active .shop_now").addClass("fadeInDown")
                      $("#swiper1 .swiper-slide-active .shop_now span").addClass("fadeInDown")
                    },500)
                    //banner_img(this);
                  },
                  resize: function(){
                    //窗口变化
                    var H = $("#swiper1 img").eq(this.activeIndex).height();
                    $("#swiper1").css('height', H + 'px');
                    $("#swiper1 .swiper-slide").css('height', H + 'px');    
                    $("#swiper1 .swiper-wrapper").css('height', H + 'px');  
                    this.updateSize();
                  },
                  slideChangeTransitionEnd:function(){
                    $(".big_slogen").css("opacity","0").removeClass("fadeInDown");
                    $(".sma_slogen").css("opacity","0").removeClass("fadeInDown");
					$(".shop_now").css("opacity","0").removeClass("fadeInDown");
					$(".shop_now span").css("opacity","0").removeClass("fadeInDown");                    
                    $("#swiper1 .swiper-slide-active .big_slogen").addClass("fadeInDown");
                    setTimeout(function(){
                      $("#swiper1 .swiper-slide-active .sma_slogen").addClass("fadeInDown");
                      setTimeout(function(){
							$("#swiper1 .swiper-slide-active .shop_now").addClass("fadeInDown");
							$("#swiper1 .swiper-slide-active .shop_now span").addClass("fadeInDown");
						},200)   
                    },300)    
                  }

                }
              })
              
            },300)
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
}
// 主要商品展示区
//说明：主要商品展示
//获取商品种类

var PrevLock=NextLock=false;
var first_lock=true;
var shuju_len1,loop_state1=true,slidesPer_num;
var Index_product_kind = function(swiper_el){
  $.ajax({
    url: "/BeMoralOfficial/official/gettrade_kind.do",
    type: "POST",
    data:{language:"tc",preview:2,level:1},
    cache: false,
    dataType:"JSON",
    success: function (data) {
        if(data.status==0){
            console.log("主要商品展示种类",data.data);
        data.data.forEach(function(element){
          $(".index #swiper2 .swiper-wrapper").append('<div class="swiper-slide">'
          +'<div class="tab_unit" onclick=""><i>'+element.trade_kind+'</i></div>'
          +'</div>')
              });
        console.log(data.data.length);

        data.data.forEach(function(element,index){
          /*if (index!==0) {*/
            $(".index #swiper2 .swiper-wrapper").append('<div class="swiper-slide">'
          +'<div class="tab_unit" onclick=""><i>'+element.trade_kind+'</i></div>'
          +'</div>')
       /* }*/
          
              });
        //swiper_el.update();

      var  mySwiper2 = new Swiper('#swiper2', {
          loop:true,
          slideToClickedSlide:true,
          allowTouchMove : false,
          speed:300,
           loopAdditionalSlides : 3,
          spaceBetween :0,
          slidesPerView : data.data.length,
          loopedSlides:data.data.length,
          centeredSlides : true,
          effect : 'coverflow',
          coverflowEffect: {  
              rotate: 0,// 旋转的角度  
         //     stretch: 130,// 拉伸   图片间左右的间距和密集度 
              stretch: 100,// 拉伸   图片间左右的间距和密集度 
              depth: 250,// 深度   切换图片间上下的间距和密集度  
              modifier: 2,// 修正值 该值越大前面的效果越明显  
              slideShadows : false// 页面阴影效果  
          },  
          on:{
            init:function(){

              //$("#swiper2 .swiper-slide.swiper-slide-active").siblings().eq($("#swiper2 .swiper-slide.swiper-slide-active").index()-2).css("opacity","1");
              $(".tab_unit").append("<span class='shenglue animated fadeOut'></span>");
              $("#swiper2 .swiper-slide").find(".shenglue").removeClass("fadeIn");
              $("#swiper2 .swiper-slide.swiper-slide-active").addClass("fadeOut");
              $("#swiper2 .swiper-slide.swiper-slide-active").siblings().eq($("#swiper2 .swiper-slide.swiper-slide-active").index()-2).css("opacity","1").find(".shenglue").removeClass("fadeOut").addClass("fadeIn");
              $("#swiper2 .swiper-slide.swiper-slide-active").siblings().eq($("#swiper2 .swiper-slide.swiper-slide-active").index()+1).css("opacity","1").find(".shenglue").removeClass("fadeOut").addClass("fadeIn");
              $.ajax({
                    url: "/BeMoralOfficial/official/gettrade_details.do",
                    type: "POST",
                    data:{language:link_language,preview:link_preview,trade_kind:$(".index #swiper2 .swiper-slide-active .tab_unit i").html()},
                    cache: false,
                    dataType:"JSON",
                    success: function (data) {
                        if(data.status==0){
                            console.log("商品系列页首页",data.data);
                            
                            data.data.forEach(function(element){
                              $(".index #swiper3 .swiper-wrapper").append('<div class="swiper-slide" trade_kind='+element.trade_kind+' id='+element.id+'>'
                                +'<img class="center-block hidden-xs hidden-sm" src='+element.trade_photo1+' />'
                                +'<img class="center-block hidden-md hidden-lg" src='+element.trade_photo1+' />'
                                +'<div class="des_box">'
                                  +'<div class="product_name">'+element.title+'</div>'                                
                                  +'<div class="product_weight">'+element.standard+'</div>'                                    
                                  +'<div class="product_stars"><img src="images/star.png" /><img src="images/star.png" /><img src="images/star.png" /><img src="images/star.png" /><img src="images/half_star.png" /><span>4.5/5</span></div>'
                                  +'<div class="product_price"><span>NT$ '+element.sell_price+'</span><span>NT$ '+element.original_price+'</span></div>'
                                +'</div>'
                              +'</div>'
                                )
                            })


                    mySwiper3 = new Swiper('#swiper3', {
                      loop:true,

                      // navigation: {
                      //   nextEl: '.right_jt',
                      //   prevEl: '.left_jt',
                      // },
                      speed:300,
                      spaceBetween :0,
                      slidesPerView : 4,
                      centeredSlides : false,
                      loopedSlides: 4,
                      breakpoints: { 
                        // 1600: {
                        //   slidesPerView: 3,
                        //   loopedSlides: 3,
                        // }
                      },
                      on:{
                        init:function(){
                          $("#swiper3 .center-block").addClass("animated");
                          $("#swiper3 .product_name").addClass("animated");
                          $("#swiper3 .product_weight").addClass("animated");
                          $("#swiper3 .product_stars").addClass("animated");
                          $("#swiper3 .product_price").addClass("animated");
/*                          if ($(window).width()<=1700) {
                            $("#swiper2 .swiper-slide.swiper-slide-prev .tab_unit").addClass("w_1700");
                            $("#swiper2 .swiper-slide.swiper-slide-next .tab_unit").addClass("w_1700");
                            $("#swiper2 .swiper-slide-prev").addClass("left_move");
                            $("#swiper2 .swiper-slide-next").addClass("right_move");
                            $(".tab_unit").addClass("w_1700");
                          }else{
                            $("#swiper2 .swiper-slide.swiper-slide-prev .tab_unit").removeClass("w_1700");
                            $("#swiper2 .swiper-slide.swiper-slide-next .tab_unit").removeClass("w_1700");
                            $(".tab_unit").removeClass("w_1700");
                          }*/
                          $("#swiper2 .swiper-slide-prev").prev().addClass("left_move");
                          $("#swiper2 .swiper-slide-next").next().addClass("right_move");
                        },
                        resize: function(){
                          this.updateSize();
                          if ($(window).width()<=1600) {
                            $(".show_box_title").css("line-height","100%");
                          }else{
                            $(".show_box_title").css("line-height","150%");
                          }

/*                          if ($(window).width()<=1700) {
                            $("#swiper2 .swiper-slide.swiper-slide-prev .tab_unit").addClass("w_1700");
                            $("#swiper2 .swiper-slide.swiper-slide-next .tab_unit").addClass("w_1700");
                            $("#swiper2 .swiper-slide-prev").addClass("left_move");
                            $("#swiper2 .swiper-slide-next").addClass("right_move");
                            $(".tab_unit").addClass("w_1700");
                          }else{
                            $("#swiper2 .swiper-slide.swiper-slide-prev .tab_unit").removeClass("w_1700");
                            $("#swiper2 .swiper-slide.swiper-slide-next .tab_unit").removeClass("w_1700");
                            $(".tab_unit").removeClass("w_1700");
                          }*/
                          $("#swiper2 .swiper-slide-prev").prev().addClass("left_move");
                          $("#swiper2 .swiper-slide-next").next().addClass("right_move");
                          
                        },
                        slidePrevTransitionStart:function(){
                          setTimeout(function(){
                            $("#swiper3 .swiper-slide.swiper-slide-active").find(".center-block").addClass("fadeInUp1");
                            setTimeout(function(){
                              $("#swiper3 .swiper-slide.swiper-slide-active").find(".center-block").removeClass("fadeInUp1")
                            },501)
                          },100);

                          setTimeout(function(){
                            $("#swiper3 .swiper-slide.swiper-slide-active").find(".product_name").addClass("fadeInDown");
                            setTimeout(function(){
                              $("#swiper3 .swiper-slide.swiper-slide-active").find(".product_name").removeClass("fadeInDown")
                            },501)
                          },100);

                          setTimeout(function(){
                            $("#swiper3 .swiper-slide.swiper-slide-active").find(".product_weight").addClass("fadeInDown");
                            setTimeout(function(){
                              $("#swiper3 .swiper-slide.swiper-slide-active").find(".product_weight").removeClass("fadeInDown")
                            },501)
                          },100);

                          setTimeout(function(){
                            $("#swiper3 .swiper-slide.swiper-slide-active").find(".product_stars").addClass("fadeInDown");
                            setTimeout(function(){
                              $("#swiper3 .swiper-slide.swiper-slide-active").find(".product_stars").removeClass("fadeInDown")
                            },501)
                          },100);

                          setTimeout(function(){
                            $("#swiper3 .swiper-slide.swiper-slide-active").find(".product_price").addClass("fadeInDown");
                            setTimeout(function(){
                              $("#swiper3 .swiper-slide.swiper-slide-active").find(".product_price").removeClass("fadeInDown")
                            },501)
                          },100);

                        },
                        slideNextTransitionStart:function(){
                          if (first_lock==true) {
                            first_lock=false;
                            return false;
                          }else{
                            setTimeout(function(){
                              $("#swiper3 .swiper-slide.swiper-slide-active").siblings().eq($("#swiper3 .swiper-slide.swiper-slide-active").index()+2).find(".center-block").addClass("fadeInUp1");
                              setTimeout(function(){
                                $("#swiper3 .swiper-slide.swiper-slide-active").siblings().eq($("#swiper3 .swiper-slide.swiper-slide-active").index()+2).find(".center-block").removeClass("fadeInUp1")
                              },501)
                            },100);

                            setTimeout(function(){
                              $("#swiper3 .swiper-slide.swiper-slide-active").siblings().eq($("#swiper3 .swiper-slide.swiper-slide-active").index()+2).find(".product_name").addClass("fadeInDown");
                              setTimeout(function(){
                                $("#swiper3 .swiper-slide.swiper-slide-active").siblings().eq($("#swiper3 .swiper-slide.swiper-slide-active").index()+2).find(".product_name").removeClass("fadeInDown")
                              },501)
                            },100);

                            setTimeout(function(){
                              $("#swiper3 .swiper-slide.swiper-slide-active").siblings().eq($("#swiper3 .swiper-slide.swiper-slide-active").index()+2).find(".product_weight").addClass("fadeInDown");
                              setTimeout(function(){
                                $("#swiper3 .swiper-slide.swiper-slide-active").siblings().eq($("#swiper3 .swiper-slide.swiper-slide-active").index()+2).find(".product_weight").removeClass("fadeInDown")
                              },501)
                            },100);

                            setTimeout(function(){
                              $("#swiper3 .swiper-slide.swiper-slide-active").siblings().eq($("#swiper3 .swiper-slide.swiper-slide-active").index()+2).find(".product_stars").addClass("fadeInDown");
                              setTimeout(function(){
                                $("#swiper3 .swiper-slide.swiper-slide-active").siblings().eq($("#swiper3 .swiper-slide.swiper-slide-active").index()+2).find(".product_stars").removeClass("fadeInDown")
                              },501)
                            },100);

                            setTimeout(function(){
                              $("#swiper3 .swiper-slide.swiper-slide-active").siblings().eq($("#swiper3 .swiper-slide.swiper-slide-active").index()+2).find(".product_price").addClass("fadeInDown");
                              setTimeout(function(){
                                $("#swiper3 .swiper-slide.swiper-slide-active").siblings().eq($("#swiper3 .swiper-slide.swiper-slide-active").index()+2).find(".product_price").removeClass("fadeInDown")
                              },501)
                            },100);
                          }


                        },
                      },
                    }) 

                      $(".index #swiper3").on("click",".swiper-slide",function(){
                        var this_kind =$(this).attr("trade_kind");
                        var id =$(this).attr("id");
                        window.location.href=encodeURI(encodeURI('product_details.html?preview=2&language=tc&trade_kind='+this_kind+'&id='+id+''));
                      })



                      $(".index .left_jt").on("click",function(){
                        if (PrevLock==false) {
                          PrevLock=true;
                          setTimeout(function(){
                            PrevLock=false;
                          },600)
                          mySwiper3.slidePrev();
                        }
                        
                      })

                      $(".index .right_jt").on("click",function(){
                        if (NextLock==false) {
                          NextLock=true;
                          setTimeout(function(){
                            NextLock=false;
                          },600)
                           mySwiper3.slideNext();
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


            },
            resize: function(){
              this.updateSize();
            },
            slideChangeTransitionStart:function(){
               $("#swiper2 .swiper-slide").removeClass("black");
              $("#swiper2 .swiper-slide").find(".shenglue").removeClass("fadeIn");
              $("#swiper2 .swiper-slide.swiper-slide-active").siblings().css("opacity","0");
              $("#swiper2 .swiper-slide.swiper-slide-active").css("opacity","1");
              $("#swiper2 .swiper-slide.swiper-slide-active").siblings().eq($("#swiper2 .swiper-slide.swiper-slide-active").index()-2).css("opacity","1").find(".shenglue").removeClass("fadeOut").addClass("fadeIn");
              $("#swiper2 .swiper-slide.swiper-slide-active").siblings().eq($("#swiper2 .swiper-slide.swiper-slide-active").index()-2).addClass("black");
              $("#swiper2 .swiper-slide.swiper-slide-active").siblings().eq($("#swiper2 .swiper-slide.swiper-slide-active").index()-1).css("opacity","1");
              $("#swiper2 .swiper-slide.swiper-slide-active").siblings().eq($("#swiper2 .swiper-slide.swiper-slide-active").index()).css("opacity","1");
              $("#swiper2 .swiper-slide.swiper-slide-active").siblings().eq($("#swiper2 .swiper-slide.swiper-slide-active").index()+1).addClass("black");
              $("#swiper2 .swiper-slide.swiper-slide-active").siblings().eq($("#swiper2 .swiper-slide.swiper-slide-active").index()+1).css("opacity","1").find(".shenglue").removeClass("fadeOut").addClass("fadeIn");
              $("#swiper2 .swiper-slide").removeClass("left_move");
              $("#swiper2 .swiper-slide").removeClass("right_move");
              
/*              if ($(window).width()<=1700) {
            	  $("#swiper2 .swiper-slide-prev").addClass("left_move");
            	  $("#swiper2 .swiper-slide-next").addClass("right_move");
              }*/
              $("#swiper2 .swiper-slide-prev").prev().addClass("left_move");
              $("#swiper2 .swiper-slide-next").next().addClass("right_move");
              
              
              if (mySwiper3) {
                mySwiper3.removeAllSlides();
                //mySwiper3.appendSlide('<div class="swiper-slide" style="height:360px;text-align:center" ><div class="loadding">Loading</div></div>');
                //mySwiper3.appendSlide('<div class="swiper-slide" style="height:360px;text-align:center" ><div class="loadding">Loading</div></div>');
                //mySwiper3.destroy();
                $.ajax({
                  url: "/BeMoralOfficial/official/gettrade_details.do",
                  type: "POST",
                  data:{language:link_language,preview:link_preview,trade_kind:$(".index #swiper2 .swiper-slide-active .tab_unit i").html()},
                  cache: false,
                  dataType:"JSON",
                  success: function (data) {
                	  mySwiper3.removeAllSlides();
                      if(data.status==0){
                          console.log("商品系列页改变",data.data);
                          shuju_len1 = data.data.length;
                            console.log(shuju_len1)
                          data.data.forEach(function(element){
                                mySwiper3.appendSlide('<div class="swiper-slide" trade_kind='+element.trade_kind+' id='+element.id+'>'
                                  +'<img class="center-block hidden-xs hidden-sm animated" src='+element.trade_photo1+' />'
                                  +'<img class="center-block hidden-md hidden-lg animated" src='+element.trade_photo1+' />'
                                  +'<div class="des_box">'
                                    +'<div class="product_name animated">'+element.title+'</div>'
                                    +'<div class="product_weight animated">'+element.standard+'</div>'
                                    +'<div class="product_stars animated"><img src="images/star.png" /><img src="images/star.png" /><img src="images/star.png" /><img src="images/star.png" /><img src="images/half_star.png" /><span>4.5/5</span></div>'
                                    +'<div class="product_price animated"><span>NT$ '+element.original_price+'</span><span>NT$ '+element.sell_price+'</span></div>'
                                  +'</div>'
                                +'</div>'
                                  )
                              })
                          mySwiper3.update();
/*                        if (shuju_len1<=4) {
                      loop_state1=false;
                      $(".index .left_jt").hide();
                      $(".index .right_jt").hide();
                      slidesPer_num=shuju_len1;
                    }else{
                      $(".index .left_jt").show();
                      $(".index .right_jt").show();
                      loop_state1=true;
                      slidesPer_num=4;
                    }*/
                            if (shuju_len1<=4) {
                            	loop_state1=false;
                            	slidesPer_num=shuju_len1;
                            }else{
                            	loop_state1=true;
                            	slidesPer_num=4;
                            }
                            $(".index .left_jt").show();
                            $(".index .right_jt").show();
             //mySwiper3.attachEvents();
                      }else{
                          console.log("服务器繁忙")
                      }
                      
                     
                  },
                  error: function () {
                      //alert(111)
                  }
                });
              }
              
              
            },
          },
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

//主要商品展示区
//说明：主要商品展示
//获取商品种类
//移动

var Index_product_kin_m = function(swiper_el){
	  $.ajax({
	    url: "/BeMoralOfficial/official/gettrade_kind.do",
	    type: "POST",
	    data:{language:"tc",preview:2,level:1},
	    cache: false,
	    dataType:"JSON",
	    success: function (data) {
	        if(data.status==0){
	            console.log("主要商品展示种类m",data.data);
	        data.data.forEach(function(element){
	          $(".index #swiper2 .swiper-wrapper").append('<div class="swiper-slide">'
	          +'<div class="tab_unit"><i>'+element.trade_kind+'</i></div>'
	          +'</div>');
	          
	          $.ajax({
	        	  url: "/BeMoralOfficial/official/gettrade_details.do",
	        	  type: "POST",
	        	  data:{language:link_language,preview:link_preview,trade_kind:element.trade_kind},
	        	  cache: false,
	        	  dataType:"JSON",
	        	  success: function (data) {
	        		  if(data.status==0){
	        			  console.log("商品系列页首页",data.data);
	        			  var ss = 0;
	        			  data.data.forEach(function(element){
	        				  if(ss>=2){return;}
	        				  arrl.push({
	        					 title:element.trade_kind 
	        				  });
	        				  $(".index #swiper3 .swiper-wrapper").append('<div class="swiper-slide" trade_kind='+element.trade_kind+' id='+element.id+'>'
	        						  +'<img class="center-block hidden-xs hidden-sm" src='+element.trade_photo1+' />'
	        						  +'<img class="center-block hidden-md hidden-lg" src='+element.trade_photo1+' />'
	        						  +'<div class="des_box">'
	        						  +'<div class="product_name">'+element.title+'</div>'                                
	        						  +'<div class="product_weight">'+element.standard+'</div>'                                    
	        						  +'<div class="product_stars"><img src="images_m/star.svg" /><img src="images_m/star.svg" /><img src="images_m/star.svg" /><img src="images_m/star.svg" /><img src="images_m/half_star.svg" /><span>4.5/5</span></div>'
	        						  +'<div class="product_price"><span>NT$ '+element.sell_price+'</span><span>NT$ '+element.original_price+'</span></div>'
	        						  +'</div>'
	        						  +'</div>'
	        				  )
	        				  ss++;
	        			  })
	        			  $(".des_box").css('font-size','28px');
	        		  }
	        	  }
	          });
	        
	        })
	        }  

	       
	    },
	    error: function () {
	        //alert(111)
	    }
	  });
	}
//移动端
var Index_getadvertising_m = function(swiper_el){
    $.ajax({
        url: "/BeMoralOfficial/official/getadvertising.do",
        type: "POST",
        data:{language:"tc",preview:2},
        cache: false,
        dataType:"JSON",
        success: function (data) {
          if(data.status==0){
              data.data.forEach(function(element){
            	$("#big_big #swiper4_m .swiper-wrapper").append(
            		  '	<div class="swiper-slide" trade_kind='+element.trade_kind+' trade_series='+element.trade_series+' >'
                      +'   <div class="show_pop2" >'
                      +'     <img class="center-block img-responsive" src='+element.trade_photo2+' />'
                      +'     <div class="bottom_des">'
                      +'      <div class="product_m_title1 hidden-md hidden-lg">'+element.trade_series+'</div>'
                      +'      <div class="bottom_des1">'+element.ad_name+'</div>'
                      +'      <div class="bottom_des2">'+element.ad_introduce+'</div>'
                      +'    </div>'
                      +'  </div>'
                      +'</div>')
              });
              $("#swiper4_m").on("click",".swiper-slide",function(){
                var trade_kind = $(this).attr("trade_kind");
                var trade_series = $(this).attr("trade_series");
                window.location.href=encodeURI(encodeURI('product_succession.html?language='+link_language+'&preview='+link_preview+'&trade_kind='+trade_kind+'&trade_series='+trade_series+''))
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

//新闻列表页首页app

var index_list_m = function(){
  $.ajax({
      url: "/BeMoralOfficial/official/getnews.do",
      type: "POST",
      data:{language:'tc',preview:2},
      cache: false,
      dataType:"JSON",
      success: function (data) {
          if(data.status==0){
              data.data.forEach(function(element){
              $("#swiper5 .swiper-wrapper").append(
            		  '<div class="swiper-slide" data-id='+element.news_id+' data-language='+element.language+' data-preview='+element.preview+'>'
            		  +'    <div class="show_pop2 ">'
                      +'      <div class="show_img2_mark animated">JOURNAL</div>'
                        +'        <div class="new_pop2_box"><img class="center-block img-responsive animated" src='+element.trade_photo1+' /><div class="black1"></div></div>'
                        +'        <div class="bottom_des animated">'
                        +'          <div class="mouse_pop_dibu hidden-xs hidden-sm animated"></div>'
                          +'         <div class="mouse_pop animated">'
                          +'          <div class="icons">'
                            +'            <img class="animated" src="images/icons_1.png" />'
                              +'           <img class="animated" src="images/icons_2.png" />'
                              +'           <img class="animated" src="images/icons_3.png" />'
                              +'         <img class="animated" src="images/icons_4.png" />'
                              +'      </div>'
                            +'      <span class="date_time animated">03 09 2018</span>'
                            +'     </div>'
                          +'     <div class="product_m_title2 hidden-md hidden-lg">'+element.news_type+'</div>'
                          +'     <div class="bottom_des1 animated">'+element.news_title+'</div>'
                          +'     <div class="bottom_des2 animated">'+element.introduce+'  </div>'
                          +'</div>'
                        +'  </div>'
                      +'</div>')
            })
			$("#swiper5 .swiper-slide .new_pop2_box").css("background","none");

            $("#swiper5").on("click",".swiper-slide",function(e){
              var link_id =  $(this).attr("data-id");
              var link_language =  $(this).attr("data-language");
              var link_preview =  $(this).attr("data-preview");
              window.location.href=encodeURI(encodeURI('new_details.html?new_id='+link_id+'&language='+link_language+'&preview='+link_preview+''));
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

function unScroll() {
    var top = $(document).scrollTop();
    $(document).on('scroll.unable', function(e) {
      $(document).scrollTop(top);
    })
}
function reScroll() {
    $(document).off('scroll.unable');
}   


function getStr(string,str){ 
    var str_before = string.split(str)[0]; 
    var str_after = string.split(str)[1]; 
    return str_after; 
} 
 
//微博登录获取用户信息
function getweibouser(){
	var code = GetQueryString("code");
	console.log(code);
	if(code!=null && code!="undefined"){
		$.ajax({
			url:"/BeMoralOfficial/weibo/getAccessToken.do",
			type:"post",
			data:{
				code:code
			},
			dataType:"json",
			success:function(result){
				console.log(result);
			},
			error:function(){
				console.log("请检查网络设置");
			}
		});
		
	}
}
function GetQueryString(name)

{

     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");

     var r = window.location.search.substr(1).match(reg);

     if(r!=null)return  unescape(r[2]); return null;

}
// alert($(window).width()) 


var lock_num=false,lock_num1=false;
var nav_num = 0,nav_lock=false,nav_num1 = 0,nav_lock1=false;
$(function(){
	//getweibouser();
	banner_img();
	
	//移动端
/*	if(browser.versions.mobile || browser.versions.ios || browser.versions.android || browser.versions.iPhone || browser.versions.iPad){*/
	if(browser.versions.mobile || browser.versions.android || browser.versions.iPhone){        

		//官网首页展示 		
		$("#big_big").addClass("container-fluid_m");
		//产品推荐
		Index_product_kin_m();
		//系列
		Index_getadvertising_m();
		//新闻列表
		index_list_m();
		//底部图片
		window.onscroll= function(){
			//$(".test_box").html($("body").scrollTop()+" "+($(".last_part").eq(1).position().top+$(".last_part").eq(1).height()-200 ))
			if ($("body").scrollTop()>=($(".last_part").eq(1).position().top+$(".last_part").eq(1).height()-200 )) {
				$("#last_img").addClass("fadeInDown");
				setTimeout(function(){
					$("#last_word").addClass("fadeInDown");
				},300)
			}
		}


  // var s = ',1,2,3,4,5,6';
  // var ss = s.split(',');
  // ss.splice(0,1);
  // console.log(ss);
		
//產品推薦
		setTimeout(function(){
			var slides_html = document.getElementById('clone_1').innerHTML;
			var slides_1 = slides_html.split('<div class="swiper-slide">');
			slides_1 && slides_1.length > 0 && slides_1.splice(0,1);
			for(var i in slides_1) {
				slides_1[i] = '<div class="swiper-slide">' + slides_1[i];
			}
			mySwiper3 = new Swiper('#swiper3', {
				loop:false,
                nested:true,
				effect : 'coverflow',
				coverflowEffect: {
					rotate: 0,
					stretch: 75,
					depth: 50,
					modifier: 3,
					slideShadows : false
				},
				on:{
					slideNextTransitionStart: function(){
						var product_num = this.activeIndex;
						for(let i=0;i<arrl.length;i++){
							if(product_num==i){
								if(arrl[i].title != arrl[i-1].title){
									$(".product_m_title span").stop().fadeOut(300,function(){
										$(".product_m_title span").text(arrl[i].title);
									})
								}
								
							}
						}
					},
					slidePrevTransitionStart: function(){
						var product_num = this.activeIndex;
						for(let i=0;i<arrl.length;i++){
							if(product_num==i){
								if(arrl[i].title != arrl[i+1].title){
									$(".product_m_title span").stop().fadeOut(300,function(){
										$(".product_m_title span").text(arrl[i].title);
									})
								}
								
							}
						}
					},
					slideChangeTransitionEnd:function(){
						$(".product_m_title span").stop().fadeIn(400);
						if ($("#clone_1 .swiper-slide-active").index()==$("#clone_1 .swiper-slide").length-2) {
							mySwiper3.appendSlide(slides_1);
							// mySwiper3.removeSlide([0, slides_1.length - 1]);
						}else if ($("#clone_1 .swiper-slide-active").index()==0||$("#clone_1 .swiper-slide-active").index()==1) {
							mySwiper3.prependSlide(slides_1);
							// mySwiper3.removeSlide([mySwiper3.slides.length - slides_1.length - 1, mySwiper3.slides.length - 1]);
						}
					},
					init:function() {
						$(".container-fluid_m .product_m_title span").html(arrl[0].title);
						this.prependSlide(slides_1);
					}
				}
			})

			$(".product_m_title span").css("display","block");
			  $(".index #swiper3").on("click",".swiper-slide",function(){
                var this_kind =$(this).attr("trade_kind");
                var id =$(this).attr("id");
                window.location.href=encodeURI(encodeURI('product_details.html?preview=2&language=tc&trade_kind='+this_kind+'&id='+id+''));
              })
		},500)

		setTimeout(function(){
			var slides_html2 = document.getElementById('clone_2').innerHTML;
			var slides_2 = slides_html2.split('<div class="swiper-slide">');
			slides_2 && slides_2.length > 0 && slides_2.splice(0,1);
			for(var i in slides_2) {
				slides_2[i] = '<div class="swiper-slide">' + slides_2[i];
			}
			mySwiper4 = new Swiper('#swiper4_m', {
				loop:true,
				effect : 'coverflow',
				loopAdditionalSlides : 3,
				coverflowEffect: {
					rotate: 0,
					stretch: 100,
					depth: 0,
					modifier: 3,
					slideShadows : false
				},
				on:{
					slideChangeTransitionEnd:function(){
						if ($("#clone_2 .swiper-slide-active").index()==$("#clone_2 .swiper-slide").length-2) {
							mySwiper4.appendSlide(slides_2);
							// mySwiper4.removeSlide([0, slides_1.length - 1]);
						}else if ($("#clone_2 .swiper-slide-active").index()==0||$("#clone_2 .swiper-slide-active").index()==1) {
							mySwiper4.prependSlide(slides_2);
							// mySwiper4.removeSlide([mySwiper4.slides.length - slides_1.length - 1, mySwiper4.slides.length - 1]);
						}
					},
					init:function() {
						this.prependSlide(slides_2);
					}
				}
			})
		},500)
		
		setTimeout(function(){
			var slides_html3 = document.getElementById('clone_3').innerHTML;
			var slides_3 = slides_html3.split('<div class="swiper-slide">');
			slides_3 && slides_3.length > 0 && slides_3.splice(0,1);
			for(var i in slides_3) {
				slides_3[i] = '<div class="swiper-slide">' + slides_3[i];
			}
			mySwiper5 = new Swiper('#swiper5', {
				loop:true,
				effect : 'coverflow',
				loopAdditionalSlides : 3,
				coverflowEffect: {
					rotate: 0,
					stretch: 100,
					depth: 0,
					modifier: 3,
					slideShadows : false
				},
				on:{
					slideChangeTransitionEnd:function(){
						console.log($("#clone_3 .swiper-slide-active").index());
						if ($("#clone_3 .swiper-slide-active").index()==$("#clone_3 .swiper-slide").length-2) {
							mySwiper5.appendSlide(slides_3);
							//mySwiper5.removeSlide([0, 3]);
						}else if ($("#clone_3 .swiper-slide-active").index()==0||$("#clone_3 .swiper-slide-active").index()==1) {
							mySwiper5.prependSlide(slides_3);
							//mySwiper5.removeSlide([$("#clone_3 .swiper-slide").length-4, $("#clone_3 .swiper-slide").length]);
						}
					},
					init:function() {
						this.prependSlide(slides_3);
					}
				}
			})
		},500)


  
}else{
	
//PC端
	
	Index_product_kind();
	
  $("#big_big").addClass("container-fluid_p");
/*  banner_img();*/ /*移到if外层 */
  
  var click_lock = click_lock1 = false;
  $("#first_menu li a").append("<span class='bottom_line'></span>");
  $(".second_menu_ul li a").append("<span class='bottom_line1'></span>");

    $("#first_menu li a").on("mouseenter",function(){
      var this_ = $(this);
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
      
    });

    $("#first_menu li a").on("mouseleave",function(){
      if ($(this).hasClass('active')) {

      }else{
        $(this).find("span").stop().animate({width:"0%"},200,"linear",function(){});
      }
      
    });

    $(".second_menu_ul li a").on("mouseenter",function(){
      $(this).find("span").stop().animate({width:"100%"},200,"linear",function(){});
    });

    $(".second_menu_ul li a").on("click",function(){
      $(this).parent("li").siblings().find("a").removeClass("active");
      $(".second_menu_ul li a").find("span").stop().animate({width:"0%"},200,"linear",function(){});
      if ($(this).hasClass('active')) {
        $(this).removeClass('active');
      }else{
        $(this).addClass('active');
        $(this).find("span").stop().animate({width:"100%"},200,"linear",function(){});
      }
    });

    $(".second_menu_ul li a").on("mouseleave",function(){
      if ($(this).hasClass('active')) {

      }else{
        $(this).find("span").stop().animate({width:"0%"},200,"linear",function(){});
      }
      
    });


    var _this_width = $(".search_box").css("width");
    console.log(_this_width+20);

    $(".search_box").on("mouseenter",function(){
      var _this = $(this);
      _this.css("width",parseInt(_this_width)+20);
    })

    $(".search_box").on("mouseleave",function(){
      var _this = $(this);
      _this.css("width",_this_width);
    })






    




    


    mySwiper4 = new Swiper('#swiper4', {
      slidesPerView: 4,
      slidesPerColumn: 2,
      allowTouchMove : false,
      slidesPerColumnFill : 'row',
      on:{
        init:function(swiper){
          Index_getadvertising(this);
          

        },
        resize:function(){
          $("#swiper4 .new_pop2_box>img").width($("#swiper4 .swiper-slide").width());
        }
      }
    })



    var start_x,start_y,move_x,move_y;

    Global.over_start = function(start_obj,swiper_is){
      start_x = start_obj.offsetX;
      start_y = start_obj.offsetY;
    }

    Global.over_start1 = function(start_obj){
      var _this = $(start_obj.currentTarget);
      console.log(start_obj.currentTarget);
      $("#swiper4 .swiper-slide").css("overflow","hidden");
      _this.css("overflow","visible");
      $("#swiper4 .swiper-slide").css("z-index","1");
      _this.css('z-index',"2");
      if (_this.index()==2||_this.index()==3||_this.index()==6||_this.index()==7) {
        _this.find(".show_pop1").removeClass("fadeInLeft");
        _this.find(".show_pop1").removeClass("fadeOutLeft").addClass("fadeInLeft");
      }else{
        _this.find(".show_pop1").removeClass("fadeInRight");
        _this.find(".show_pop1").removeClass("fadeOutRight").addClass("fadeInRight");
      }

      _this.find(".show_box_title").removeClass("fadeInDown");
      _this.find(".show_box_des").removeClass("fadeInDown");
      _this.find(".rotate_out").removeClass("fadeInDown");
      _this.find(".move_more").removeClass("fadeIn");
      
      setTimeout(function(){
        _this.find(".show_box_title").addClass("fadeInDown");
        _this.find(".show_box_des").addClass("fadeInDown");
        _this.find(".rotate_out").addClass("fadeInDown");
        _this.find(".move_more").addClass("fadeIn");
      },300)

    }
    Global.over_end = function(end_obj){
      $("#swiper4 .swiper-slide").css("overflow","hidden");
      var move_div = $(end_obj.currentTarget).find(".new_pop2_box>img");
      //$(move_div).stop().transition({left:0},10000,"linear",function(){});
      var _this = $(end_obj.currentTarget);
      if (_this.index()==2||_this.index()==3||_this.index()==6||_this.index()==7) {
        _this.find(".show_pop1").removeClass("fadeInLeft").addClass("fadeOutLeft");
      }else{
        _this.find(".show_pop1").removeClass("fadeInRight").addClass("fadeOutRight");
      }
      //_this.find(".show_pop1").removeClass("black");
      //_this.find(".show_pop1").removeClass("fadeIn").addClass("fadeOut");
      _this.find(".show_box_title").removeClass("fadeInDown");
      _this.find(".show_box_des").removeClass("fadeInDown");
      _this.find(".rotate_out").removeClass("fadeInDown");
      _this.find(".move_more").removeClass("fadeIn");
    }

    Global.over_end1 = function(end_obj){
      $("#swiper4 .swiper-slide").css("overflow","hidden");
      $("#swiper4 .swiper-slide").css("z-index","2");
      $(this).css('z-index',"1");
      var move_div = $(end_obj.currentTarget).parent(".swiper-wrapper");
      $(move_div).stop().animate({left:0},500,"linear",function(){});
      var _this = $(end_obj.currentTarget);
      console.log($(move_div));
    }

    Global.over_move=function(move_obj){
      var move_div = $(move_obj.currentTarget).find(".new_pop2_box>img");
      move_x = Math.abs(move_obj.offsetX-move_div.width());
      move_x1 = Math.abs(move_obj.offsetX);
      move_y = move_obj.offsetY;
      console.log($(move_obj.currentTarget).index());
      if ($(move_obj.currentTarget).hasClass("swiper-slide-active")||$(move_obj.currentTarget).index()==0||$(move_obj.currentTarget).index()==4) {
        $(move_div).stop().animate({left:move_x/10},50);
      }else{
        $(move_div).stop().animate({left:-move_x1/10},50);
      }
    }

    Global.over_move1=function(move_obj){
      var move_div = $(move_obj.currentTarget).parent(".swiper-wrapper");
      move_x = Math.abs(move_div.width()-move_obj.offsetX);
      move_x1 = Math.abs(move_obj.offsetX);
      move_y = move_obj.offsetY;
      // console.log($(move_obj.currentTarget).index());
      if ($(move_obj.currentTarget).hasClass("swiper-slide-active")||$(move_obj.currentTarget).index()==0||$(move_obj.currentTarget).index()==4) {
        $(move_div).stop().animate({left:move_x/20},50);
      }else{
        $(move_div).stop().animate({left:-move_x1/5},50);
      }
    }


    mySwiper5 = new Swiper('#swiper5', {
      loop:true,
      navigation: {
        nextEl: '.right_jt1',
        prevEl: '.left_jt1'
      },
      allowTouchMove:true,
      slidesPerView : 4,
      spaceBetween : 20,
      speed:1500,
      on:{
        init:function(){
          all_news(this);
        },
        resize:function(){
          $("#swiper5 .new_pop2_box>img").width($("#swiper5 .swiper-slide").width());
        },
        slideChangeTransitionEnd:function(){
           $("#swiper5 .swiper-slide").unbind();
           $("#swiper5 .swiper-slide-active").unbind("mousemove").bind("mousemove",Global.over_move1).unbind("mouseenter").bind("mouseenter",Global.over_start).unbind("mouseleave").bind("mouseleave",Global.over_end1);
           $("#swiper5 .swiper-slide-active").siblings(".swiper-slide").eq($("#swiper5 .swiper-slide-active").index()+2).unbind("mousemove").bind("mousemove",Global.over_move1).unbind("mouseenter").bind("mouseenter",Global.over_start).unbind("mouseleave").bind("mouseleave",Global.over_end1);
        }
      }
    })


  Global.mouseover_show = function(obj){
    $(obj).on("mouseenter",function(){
      var _this = $(this);
      $("#swiper4 .swiper-slide").css("overflow","hidden");
      _this.css("overflow","visible");
      $("#swiper4 .swiper-slide").css("z-index","1");
      $(this).css('z-index',"2");
      if (_this.index()==2||_this.index()==3||_this.index()==6||_this.index()==7) {
        _this.find(".show_pop1").removeClass("fadeInLeft");
        _this.find(".show_pop1").removeClass("fadeOutLeft").addClass("fadeInLeft");
      }else{
        _this.find(".show_pop1").removeClass("fadeInRight");
        _this.find(".show_pop1").removeClass("fadeOutRight").addClass("fadeInRight");
      }
      // setTimeout(function(){
      //   _this.find(".show_pop1").addClass("black");
      // },500)
      //_this.find(".show_pop1").removeClass("fadeIn");
      
      _this.find(".show_box_title").removeClass("fadeInDown");
      _this.find(".show_box_des").removeClass("fadeInDown");
      _this.find(".rotate_out").removeClass("fadeInDown");
      _this.find(".move_more").removeClass("fadeIn");
      //_this.find(".show_pop1").removeClass("fadeOut").addClass("fadeIn");
      setTimeout(function(){
        _this.find(".show_box_title").addClass("fadeInDown");
        _this.find(".show_box_des").addClass("fadeInDown");
        _this.find(".rotate_out").addClass("fadeInDown");
        _this.find(".move_more").addClass("fadeIn");
      },300)
    })

    $(obj).on("mouseleave",function(){
      var _this = $(this);
      $("#swiper4 .swiper-slide").css("overflow","hidden");
      $("#swiper4 .swiper-slide").css("z-index","2");
      $(this).css('z-index',"1");
      if (_this.index()==2||_this.index()==3||_this.index()==6||_this.index()==7) {
        _this.find(".show_pop1").removeClass("fadeInLeft").addClass("fadeOutLeft");
      }else{
        _this.find(".show_pop1").removeClass("fadeInRight").addClass("fadeOutRight");
      }
      _this.find(".black").hide();
      //_this.find(".show_pop1").removeClass("fadeIn").addClass("fadeOut");
      _this.find(".show_box_title").removeClass("fadeInDown");
      _this.find(".show_box_des").removeClass("fadeInDown");
      _this.find(".rotate_out").removeClass("fadeInDown");
       _this.find(".move_more").removeClass("fadeInDown");
    })
  }

  Global.mouseover_show("#swiper4 .swiper-slide");




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


/*  Global.lang_show_hide=function(show_obj,lang_obj){
    $(show_obj).on("click",function(){
      $(lang_obj).slideToggle();
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
      $(lang_obj).slideUp();

    })
  }

  Global.lang_show_hide(".lang_change",".lang_choose");*/

  // Global.nicenav = function(con,list_obj,nav_slider){
  //   var this_position,this_width;
  //   con = typeof con === 'number' ? con : 400;
  //   var $lis = $(list_obj).find("a"), $h = $(nav_slider);
  //   $lis.click(function(){
  //     $lis.removeClass("active");
  //     $(this).addClass("active");
  //     $h.width($(this).width());
  //     this_width = $(this).width();
  //     this_position=$(this).position().left;
  //     $h.stop().animate({
  //         'left': $(this).position().left,
  //         'opacity':'1'
  //     }, con);
  //   });
  //   $lis.hover(function () {
  //       this_width = $(this).width();
  //       console.log($(this).position().left)
  //       $h.width($(this).width());
  //       console.log(this_width);
  //       console.log($(this).position().left-this_width);
  //       $h.css("left",$(this).position().left-this_width);
  //       $h.stop().animate({
  //           'left': $(this).position().left,
  //           'opacity':'1'
  //       }, con);
  //   }, function () {
  //       if (lock_num==true) {
  //         $h.width(this_width);
  //         $h.stop().animate({
  //           'left': this_position,
  //         }, con);
  //       }else{
  //         $h.stop().animate({
  //           'left': this_position,
  //           'opacity':'0'
  //         }, con);
  //       }
        
  //   })
  // } 


  //   Global.nicenav1 = function(con,list_obj,nav_slider){
  //     var this_position,this_width;
  //     con = typeof con === 'number' ? con : 400;
  //     var $lis = $(list_obj).find("a"), $h = $(nav_slider);
  //     $lis.click(function(){
  //       $lis.removeClass("active");
  //       $(this).addClass("active");
  //       $h.width($(this).width());
  //       this_width = $(this).width();
  //       this_position=$(this).position().left;
  //       $h.stop().animate({
  //           'left': $(this).position().left,
  //           'opacity':'1'
  //       }, con);
  //     });
  //     $lis.hover(function () {
  //         console.log($(this).position().left)
  //         $h.width($(this).width());
  //         $h.stop().animate({
  //             'left': $(this).position().left,
  //             'opacity':'1'
  //         }, con);
  //     }, function () {
  //         if (lock_num1==true) {
  //           $h.width(this_width);
  //           $h.stop().animate({
  //             'left': this_position,
  //           }, con);
  //         }else{
  //           $h.stop().animate({
  //             'left': this_position,
  //             'opacity':'0'
  //           }, con);
  //         }
          
  //     })

  //   } 

  // Global.nicenav("300","#first_menu","#nav_slider");

  // Global.nicenav1("300",".second_menu_ul","#nav_slider1");



/*  Global.div_show_hide = function(trigger_obj,execute_obj){

    $(trigger_obj).on("click",function(){
      $(execute_obj).slideToggle();
      var this_ = $(this);
      var index_ = this_.index();
      if (index_==2) {
        window.location.href='new_list.html?language='+link_language+'&preview='+link_preview+'';
      }
      if(lock_num==true){
        lock_num=false;
        return false;
      }else{
        lock_num=true;
        return false;
      }
    })

  } 

  Global.div_show_hide("#first_menu li",".second_menu");*/



  Global.second_menu_show_hide = function(second_menu_li,second_menu_li_ul){
    $(second_menu_li).on("click",function(){
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

  Global.second_menu_show_hide(".second_menu_ul>li>a",".second_menu_ul>li>ul");

  $(".second_menu_ul>li>ul").find("span").addClass('animated').css("opacity","0");

  $(".second_menu_ul>li>ul").on("click",function(){
    return false;
  })

/*  $("body").on("click",function(){
    $(".second_menu").slideUp();
    $(".second_menu_ul>li>ul").slideUp();
    $("#first_menu a").removeClass("active");
    $(".bottom_line,.bottom_line1").width(0);
    $(".second_menu_ul li a").removeClass("active");
  })*/

  $("#swiper1 .swiper-slide").on("click",function(){
    console.log('dianji')
    $(".second_menu").stop().slideUp();
    // $("#first_menu a").removeClass("active");
  })

  Global.mouseover = function(obj){
    $(obj).on("mouseover",function(){
      $(obj).addClass("focus");
    })

    $(obj).on("mouseout",function(){
      $(obj).removeClass("focus");
    })
  }

  // Global.mouseover(".left_jt");
  // Global.mouseover(".right_jt");
  // Global.mouseover(".left_jt1");
  // Global.mouseover(".right_jt1");

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

  Global.jiantou(".left_jt1");
  Global.jiantou(".right_jt1");

  Global.jiantou(".left_jt");
  Global.jiantou(".right_jt");


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
  Global.rotate(".rotate_box1");




  $("#swiper4 .new_pop2_box>img").width($("#swiper4 .swiper-slide").width());
  $("#swiper5 .new_pop2_box>img").width($("#swiper5 .swiper-slide").width());

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


  Global.mouseover_show1("#swiper5")

  


  function scroll(){
      console.log("开始滚动！");
  }

  // var scrollFunc = function (e) {  
  //     e = e || window.event;  
  //     if (e.wheelDelta) {  //第一步：先判断浏览器IE，谷歌滑轮事件               
  //         if (e.wheelDelta > 0) { //当滑轮向上滚动时  
  //             //console.log("滑轮向上滚动");  
  //         }  
  //         if (e.wheelDelta < 0) { //当滑轮向下滚动时  
  //           Global.html_scroll();
            
  //         }  
  //     } else if (e.detail) {  //Firefox滑轮事件  
  //         if (e.detail> 0) { //当滑轮向上滚动时  
  //             //console.log("滑轮向上滚动");  
  //         }  
  //         if (e.detail< 0) { //当滑轮向下滚动时  
  //           Global.html_scroll();
  //         }  
  //     }  
  // }

  //   //给页面绑定滑轮滚动事件  
  // if (document.addEventListener) {//firefox  
  //     document.addEventListener('DOMMouseScroll', scrollFunc, false);  
  // }  
  // //滚动滑轮触发scrollFunc方法  //ie 谷歌  
  // window.onmousewheel = document.onmousewheel = scrollFunc;

  $(window).scroll(function(){
    //console.log(document.body.scrollTop || document.documentElement.scrollTop);
/*    Global.html_scroll();*/
    Global.swiper()
  })

  var show_pop2_num = 0;
  var _thisIndex;
  Global.show_pop2 = function(obj){
    var this_ = $(obj);
    _thisIndex = this_.index();
    // console.log(this_.find(".new_pop2_box>img"));
    this_.find(".new_pop2_box>img").addClass("fadeInDown");
    setTimeout(function(){
      this_.find(".show_img2_mark").addClass("fadeInLeft");
      this_.find(".bottom_des").addClass("fadeInDown");
      setTimeout(function(){
        this_.find(".bottom_des").css("z-index","3");
        this_.find(".bottom_des1").addClass("fadeInDown");
        this_.find(".bottom_des2").addClass("fadeInDown");
      },500)
    },200)
  }


  Global.show_box1 = function(){
    var show_box_num = 0;
    var a = setInterval(function(){
      $("#swiper4 .swiper-slide").eq(show_box_num).addClass("fadeInDown");
      show_box_num++;
      if (show_box_num>=8) {
        // $("#swiper4 .swiper-slide").eq(0).unbind("mousemove").bind("mousemove",Global.over_move).unbind("mouseenter").bind("mouseenter",Global.over_start1).unbind("mouseleave").bind("mouseleave",Global.over_end);
        // $("#swiper4 .swiper-slide").eq(4).unbind("mousemove").bind("mousemove",Global.over_move).unbind("mouseenter").bind("mouseenter",Global.over_start1).unbind("mouseleave").bind("mouseleave",Global.over_end);
        // $("#swiper4 .swiper-slide").eq(3).unbind("mousemove").bind("mousemove",Global.over_move).unbind("mouseenter").bind("mouseenter",Global.over_start1).unbind("mouseleave").bind("mouseleave",Global.over_end);
        // $("#swiper4 .swiper-slide").eq(7).unbind("mousemove").bind("mousemove",Global.over_move).unbind("mouseenter").bind("mouseenter",Global.over_start1).unbind("mouseleave").bind("mouseleave",Global.over_end);
        clearInterval(a);
      }
    },200);
  }

  

  $(".fix_none").addClass('animated');
  var nav_lock = false;
/*  Global.html_scroll=function(){
    if (document.body.scrollTop || document.documentElement.scrollTop>=$(".last_part").offset().top-$(".last_part").height()-150) {
      $(".last_bg1").addClass("fadeIn");
      $(".last_bg2").addClass("fadeIn");

      setTimeout(function(){
        $(".last_bg1").transition({translate:[0,0]},300,'linear',function(){
          $(".rotate_box1").addClass("fadeIn");
        })
      },100)
      setTimeout(function(){
        $(".last_txt1").addClass("fadeInDown");
        setTimeout(function(){
          $(".last_txt2").addClass("fadeInDown");
          setTimeout(function(){
            $(".last_txt3").addClass("fadeInDown");
          },200)
        },200)
      },300)
      setTimeout(function(){
        $(".about_us_text").addClass("fadeInDown");
        
      },800)
      setTimeout(function(){
        $(".eye1").addClass("fadeIn").css("opacity","1");
        $(".eye2").addClass("fadeIn").css("opacity","1");
        // setTimeout(function(){
        //   $(".eye1").removeClass("fadeIn").addClass("rotateX");
        //   $(".eye2").removeClass("fadeIn").addClass("rotateX");
        //   $(".eye1").removeClass("fadeIn");
        //   $(".eye2").removeClass("fadeIn");
        // },200)
      },1500)
    }
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
      
    } */

// index page only news list and last part
  Global.swiper=function(){
 
	  if (document.body.scrollTop || document.documentElement.scrollTop>=$(".show_box2").offset().top-$(".show_box2").height()+$(".show_box2").height()-300) {
		  console.log("daole")
		  Global.show_pop2("#swiper5 .swiper-slide-active");
		  setTimeout(function(){
			  Global.show_pop2($("#swiper5 .swiper-slide").eq(_thisIndex+2));
			  setTimeout(function(){
				  Global.show_pop2($("#swiper5 .swiper-slide").eq(_thisIndex-1));
				  setTimeout(function(){
					  Global.show_pop2($("#swiper5 .swiper-slide"));
				  },500)
			  },500)
		  },500)
		  
	  }
	  
	  if (document.body.scrollTop || document.documentElement.scrollTop>=$(".show_box1").offset().top-$(".show_box1").height()+$(".show_box1").height()-300) {
		  Global.show_box1();
		  $("#swiper4 .swiper-slide").eq(2).addClass("right_style");
		  $("#swiper4 .swiper-slide").eq(3).addClass("right_style");
		  $("#swiper4 .swiper-slide").eq(6).addClass("right_style");
		  $("#swiper4 .swiper-slide").eq(7).addClass("right_style");
	  }
	

	  if (document.body.scrollTop || document.documentElement.scrollTop>=$(".last_part").offset().top-$(".last_part").height()-150) {
		  $(".last_bg1").addClass("fadeIn");
		  $(".last_bg2").addClass("fadeIn");
		  
		  setTimeout(function(){
			  $(".last_bg1").transition({translate:[0,0]},300,'linear',function(){
				  $(".rotate_box1").addClass("fadeIn");
			  })
		  },100)
		  setTimeout(function(){
			  $(".last_txt1").addClass("fadeInDown");
			  setTimeout(function(){
				  $(".last_txt2").addClass("fadeInDown");
				  setTimeout(function(){
					  $(".last_txt3").addClass("fadeInDown");
				  },200)
			  },200)
		  },300)
		  setTimeout(function(){
			  $(".about_us_text").addClass("fadeInDown");
			  
		  },800)
		  setTimeout(function(){
			  $(".eye1").addClass("fadeIn").css("opacity","1");
			  $(".eye2").addClass("fadeIn").css("opacity","1");
			  // setTimeout(function(){
			  //   $(".eye1").removeClass("fadeIn").addClass("rotateX");
			  //   $(".eye2").removeClass("fadeIn").addClass("rotateX");
			  //   $(".eye1").removeClass("fadeIn");
			  //   $(".eye2").removeClass("fadeIn");
			  // },200)
		  },1500)
		  
		  setTimeout(function(){
			  $(".eyea1").addClass("fadeIn").css("opacity","1");
			  $(".eyea2").addClass("fadeIn").css("opacity","1");
			  // setTimeout(function(){
			  //   $(".eye1").removeClass("fadeIn").addClass("rotateX");
			  //   $(".eye2").removeClass("fadeIn").addClass("rotateX");
			  //   $(".eye1").removeClass("fadeIn");
			  //   $(".eye2").removeClass("fadeIn");
			  // },200)
		  },1500)
		  
	  }	 

  }

  Global.swiper();


}

})