var link_language = "tc";
var link_preview = 2;
var mySwiper3;
     //官网首页展示 

/*     var banner_img = function(swiper_el){
      $.ajax({
          url: "/BeMoralOfficial/official/getcarousel.do",
          type: "POST",
          data:{language:"tc",preview:2},
          cache: false,
          dataType:"JSON",
          success: function (data) {
              if(data.status==0){
                  console.log('首页展示',data.data)
                  data.data.forEach(function(element){
                    $(".index #swiper1 .swiper-wrapper").append('<div class="swiper-slide">'
            +'<img class="center-block img-responsive" src="'+element.carousel_photo1+'" />'
            // gj add a new to avoid desc override
            +'<span class="big_slogen animated_5">'+element.title1+'</span>'
            +'<span class="sma_slogen animated_5">'+element.title2+'</span>'
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
                    clickable :true,
                  },
                  autoplay: {
                    delay: 5000,
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
                      $(".sma_slogen").css("opacity","0").removeClass("fadeInDown");;
                      $("#swiper1 .swiper-slide-active .big_slogen").addClass("fadeInDown");
                      setTimeout(function(){
                        $("#swiper1 .swiper-slide-active .sma_slogen").addClass("fadeInDown");
                      },300)    
                    },

                  },
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
     }*/
    
      
      
/*    // 主要商品展示区
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
              +'<div class="tab_unit"><i>'+element.trade_kind+'</i></div>'
              +'</div>')
                  });
            console.log(data.data.length);

            data.data.forEach(function(element,index){
              if (index!==0) {
                $(".index #swiper2 .swiper-wrapper").append('<div class="swiper-slide">'
              +'<div class="tab_unit"><i>'+element.trade_kind+'</i></div>'
              +'</div>')
              }
              
                  });
            //swiper_el.update();

          var  mySwiper2 = new Swiper('#swiper2', {
              loop:true,
              slideToClickedSlide:true,
              allowTouchMove : true,
              speed:300,
               loopAdditionalSlides : 3,
              spaceBetween :0,
              slidesPerView : data.data.length,
              loopedSlides:data.data.length,
              centeredSlides : true,
              effect : 'coverflow',
              coverflowEffect: {  
                  rotate: 0,// 旋转的角度  
                  stretch: 130,// 拉伸   图片间左右的间距和密集度  
                  depth: 250,// 深度   切换图片间上下的间距和密集度  
                  modifier: 2,// 修正值 该值越大前面的效果越明显  
                  slideShadows : false// 页面阴影效果  
              },  
              on:{
                init:function(){

                  //$("#swiper2 .swiper-slide.swiper-slide-active").siblings().eq($("#swiper2 .swiper-slide.swiper-slide-active").index()-2).css("opacity","1");
                  $(".tab_unit").append("<span class='shenglue animated fadeOut'>···</span>");
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
                                      +'<div class="product_price">￥'+element.original_price+'</div>'
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
                              if ($(window).width()<=1700) {
                                $("#swiper2 .swiper-slide.swiper-slide-prev .tab_unit").addClass("w_1700");
                                $("#swiper2 .swiper-slide.swiper-slide-next .tab_unit").addClass("w_1700");
                              }else{
                                $("#swiper2 .swiper-slide.swiper-slide-prev .tab_unit").removeClass("w_1700");
                                $("#swiper2 .swiper-slide.swiper-slide-next .tab_unit").removeClass("w_1700");
                              }
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
                    
                  if (mySwiper3) {
                    mySwiper3.removeAllSlides();
                    //mySwiper3.destroy();
                    $.ajax({
                      url: "/BeMoralOfficial/official/gettrade_details.do",
                      type: "POST",
                      data:{language:link_language,preview:link_preview,trade_kind:$(".index #swiper2 .swiper-slide-active .tab_unit i").html()},
                      cache: false,
                      dataType:"JSON",
                      success: function (data) {
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
                                        +'<div class="product_price animated">￥'+element.original_price+'</div>'
                                      +'</div>'
                                    +'</div>'
                                      )
                                  })
                              mySwiper3.update();
                        if (shuju_len1<=4) {
                          loop_state1=false;
                          $(".index .left_jt").hide()r;
                          $(".index .right_jt").hide();
                          slidesPer_num=shuju_len1;
                        }else{
                          $(".index .left_jt").show();
                          $(".index .right_jt").show();
                          loop_state1=true;
                          slidesPer_num=4;
                        }
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

     Index_product_kind();*/

/*    var trade_kind_introduce = function(){
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
/*                    $(".video_box").append(data.data.trade_url_link);
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
    */

//其它商品
    var Index_product_details = function(swiper_el){
      var get_language = getQueryString("language");
      var get_preview = getQueryString("preview");
      var get_trade_kind = decodeURI(getQueryString("trade_kind"));
      var get_trade_series = decodeURI(getQueryString("trade_series"));
      console.log(get_language+" "+get_preview+" "+get_trade_kind);
      $.ajax({
          url: "/BeMoralOfficial/official/gettrade_details.do",
          type: "POST",
          data:{language:"tc",preview:2,trade_kind:get_trade_kind},
          cache: false,
          dataType:"JSON",
          success: function (data) {
              if(data.status==0){
                  console.log("主要商品详细",data.data);
                  
                  data.data.forEach(function(element){
                    console.log(element.trade_series+" "+get_trade_series);
                    if (element.trade_series==get_trade_series) {
                      $("#succession #swiper3 .swiper-wrapper").append(
                        '<div class="swiper-slide" data-id='+element.id+' trade_kind='+element.trade_kind+'>'
                        +'<img class="center-block hidden-xs hidden-sm" src='+element.trade_photo1+' />'
                        +'<img class="center-block hidden-md hidden-lg" src='+element.trade_photo1+' />'
                        +'<div class="des_box">'
                          +'<div class="product_name">'+element.title+'</div>'
                          +'<div class="product_weight">'+element.standard+'</div>'
                          +'<div class="product_stars"><img src="images/star.png" /><img src="images/star.png" /><img src="images/star.png" /><img src="images/star.png" /><img src="images/half_star.png" /><span>4.5/5</span></div>'
                          +'<div class="product_price"><span>NT$ '+element.sell_price+'</span><span>NT$ '+element.original_price+'</span></div>'
                        +'</div>'
                      +'</div>')
                    }
                  })
                  // swiper_el.update();
                  var  mySwiper3 = new Swiper('#swiper3', {
                    slidesPerView: 3,//一行显示X个
                    slidesPerColumnFill : 'row',
                    slidesPerColumn: Math.ceil(data.data.length/3),//显示X行
                    centeredSlides : false,
                    allowTouchMove: false,
                    breakpoints: { 
                      // 1600: {
                      //   slidesPerView: 3,
                      //   loopedSlides: 3,
                      // }
                    },
                    on:{
                      init:function(){
                        // Index_product_details(this);
                        $("#succession #swiper3").on("click",".swiper-slide",function(){
                          var this_id = $(this).attr("data-id");
                          var this_kind =  $(this).attr("trade_kind");
                          window.location.href=encodeURI(encodeURI('product_details.html?id='+this_id+'&preview=2&language=tc'+'&trade_kind='+this_kind));
                        })


                        $(".product_banner .swiper-pagination-bullets").css("marginLeft",(-$(".product_banner .swiper-pagination-bullets").width()/2)+"px");
                        $(".product_swiper_box").css("marginTop",-$(".product_swiper_box").height()/2);
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
                          $(".tab_unit").addClass("w_1700");
                          $("#swiper2 .swiper-slide .tab_unit").addClass("w_1700");
                        }else{
                          $("#swiper2 .swiper-slide.swiper-slide-prev .tab_unit").removeClass("w_1700");
                          $("#swiper2 .swiper-slide.swiper-slide-next .tab_unit").removeClass("w_1700");
                          $(".tab_unit").removeClass("w_1700");
                        }
                        
                      },
                      slidePrevTransitionStart:function(){

                      },
                      slideNextTransitionStart:function(){

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

    


    
      
    //点击某商品跳转到商品详情页
    var product_details  = function(){
      var get_language = getQueryString("language");
      var get_preview = getQueryString("preview");
      var get_id = getQueryString("id");
      var get_trade_kind = decodeURI(getQueryString("trade_kind"));
      $.ajax({
          url: "/BeMoralOfficial/official/gettradebyid.do",
          type: "POST",
          data:{language:get_language,preview:get_preview,trade_kind:get_trade_kind,id:get_id},
          cache: false,
          dataType:"JSON",
          success: function (data) {
              if(data.status==0){
                  console.log("跳转到商品详情页",data.data);
                  $("#product_details #swiper1 .swiper-wrapper").append(
                    '<div class="swiper-slide"><img class="center-block img-responsive" src='+data.data.trade_photo1+' /></div>',
                    '<div class="swiper-slide"><img class="center-block img-responsive" src='+data.data.trade_photo2+' /></div>',
                    '<div class="swiper-slide"><img class="center-block img-responsive" src='+data.data.trade_photo3+' /></div>',
                    '<div class="swiper-slide"><img class="center-block img-responsive" src='+data.data.trade_photo4+' /></div>',
                    '<div class="swiper-slide"><img class="center-block img-responsive" src='+data.data.trade_photo5+' /></div>'
                  )
                  var mySwiper = new Swiper('#swiper1', {
                    loop:true,
                    pagination: {
                      el: '.swiper-pagination1',
                      clickable :true,
                    },
                    autoplay: {
                      delay: 5000,
                    },
                    allowTouchMove: false,
                    direction : 'horizontal',
                    on:{
                      init:function(){
                        setTimeout(function(){
                          $(".product_banner .swiper-pagination-bullets").css("marginLeft",(-$(".product_banner .swiper-pagination-bullets").width()/2)+"px");
                          $(".product_swiper_box").css("marginTop",-$(".product_swiper_box").height()/2);
                        },500)
                        
                      },
                      resize: function(){

                      },
                      slideChangeTransitionEnd:function(){
                    
                      },

                    },
                  })

                  $("#product_details .product_title").html(data.data.title);
                  $("#product_details .product_des").html(data.data.standard);
                  $("#product_details .product_trade_title").html(data.data.trade_title);
                  $("#product_details .product_des1").html(data.data.sell_point);
/*                  $("#product_details .price_sale").html('¥'+data.data.original_price);
                  $("#product_details .price_real").html('¥'+data.data.sell_price);*/
                  $("#product_details .price_sale").html("  " + data.data.original_price);
                  $("#product_details .price_real").html("  " + data.data.sell_price);          

                  $("#product_details .left_tu").attr("src",data.data.trade_photo1_left);
                  $("#product_details .details_unit").eq(0).find(".details_unit_words").html('<p>'+data.data.desc1+'</p>');
                  $("#product_details .right_tu").attr("src",data.data.trade_photo1_right);
                  $("#product_details .details_unit").eq(1).find(".details_unit_words").html('<p>'+data.data.desc2+'</p>');

                  $("#product_details .new_details").html(data.data.conten);
              }else{
                  console.log("服务器繁忙")
              }  
          },
          error: function () {
              //alert(111)
          }
      });
    }

    //product_details();
      
      
      
      
      //广告区
      //显示广告区8 张图片

    var Index_getadvertising = function(swiper_el){
      $.ajax({
          url: "/BeMoralOfficial/official/getadvertising.do",
          type: "POST",
          data:{language:"tc",preview:2},
          cache: false,
          dataType:"JSON",
          success: function (data) {
            if(data.status==0){
                console.log("八张图",data.data);
                data.data.forEach(function(element,index){
                  $(".new_pop2_box").eq(index).parent().attr("trade_kind",element.trade_kind);
                  $(".new_pop2_box").eq(index).parent().attr("trade_series",element.trade_series);
                  $(".new_pop2_box").eq(index).find("img").attr("src",element.trade_photo1);
                  $(".show_pop1_right").eq(index).find(".show_box_title").html(element.ad_name);
                  $(".show_pop1_right").eq(index).find(".show_box_des").html(element.ad_introduce);
                });
                swiper_el.update();  
                $("#swiper4 .swiper-slide").addClass("animated").css("opacity","0");
                $("#swiper4").on("click",".swiper-slide",function(){
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

      
      
      
      //新闻区
      //官网首页所有新闻

    var all_news = function(swiper_el){
      $.ajax({
          url: "/BeMoralOfficial/official/getnews.do",
          type: "POST",
          data:{language:"tc",preview:2},
          cache: false,
          dataType:"JSON",
          success: function (data) {
              if(data.status==0){
                  console.log("4组新闻",data.data);
                  data.data.forEach(function(element,index){
                    swiper_el.appendSlide(
                      '<div class="swiper-slide" data-id='+element.news_id+' >'
                +'<div class="show_pop2">'
                  +'<div class="show_img2_mark animated">'+element.news_type+'</div>'
                  +'<div class="new_pop2_box"><img class="center-block img-responsive animated" src='+element.trade_photo1+' /><div class="black1"></div></div>'
                  +'<div class="bottom_des animated">'
           /*         +'<div class="mouse_pop_dibu hidden-xs hidden-sm animated"></div>'*/
                    +'<div class="mouse_pop animated">'
                      +'<div class="icons">'
                        +'<img class="animated" src="images/svg/icons_1.svg" />'
                        +'<img class="animated" src="images/svg/icons_2.svg" />'
                        +'<img class="animated" src="images/svg/icons_3.svg" />'
                        +'<img class="animated" src="images/svg/icons_4.svg" />'
                      +'</div>'
                      +'<span class="date_time animated">'+element.created+'</span>'
                    +'</div>'
                    +'<div class="product_m_title1 hidden-md hidden-lg">'+element.news_title+'</div>'
                    +'<div class="bottom_des1 animated">'
                    +element.news_title
                    +'</div>'
                    +'<div class="bottom_des2 text-overflow-3 animated">'
                    +element.introduce
                    +'</div>'
                  +'</div>'
                +'</div>'
              +'</div>')
                  })
                  swiper_el.update();
                  Global.mouseover_show1("#swiper5");
                  Global.html_scroll();
                  $("#swiper5 .swiper-slide").unbind();
           $("#swiper5 .swiper-slide-active").unbind("mousemove").bind("mousemove",Global.over_move1).unbind("mouseenter").bind("mouseenter",Global.over_start).unbind("mouseleave").bind("mouseleave",Global.over_end1);
           $("#swiper5 .swiper-slide-active").siblings(".swiper-slide").eq($("#swiper5 .swiper-slide-active").index()+2).unbind("mousemove").bind("mousemove",Global.over_move1).unbind("mouseenter").bind("mouseenter",Global.over_start).unbind("mouseleave").bind("mouseleave",Global.over_end1);

          $("#swiper5").on("mouseenter",".swiper-slide",function(){
            $(this).find(".black1").stop().fadeIn(200);
          })

          $("#swiper5").on("mouseleave",".swiper-slide",function(){
            $(this).find(".black1").stop().fadeOut(200);
          })

          $("#swiper5").on("click",".swiper-slide",function(){
            var news_id = $(this).attr("data-id");
            window.location.href=encodeURI(encodeURI('new_details.html?new_id='+news_id+'&language='+link_language+'&preview='+link_preview+''));
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
      
      
      
      //新闻列表页

      var new_list = function(){
        var get_language = getQueryString("language");
        var get_preview = getQueryString("preview");
        var get_news_type = decodeURI(getQueryString("news_type"));
        $.ajax({
            url: "/BeMoralOfficial/official/getnews.do",
            type: "POST",
            data:{language:get_language,preview:get_preview},
            cache: false,
            dataType:"JSON",
            success: function (data) {
                if(data.status==0){
                    console.log("新闻列表",data.data);
                    data.data.forEach(function(element,index){
						var s = "";
						s = s + '<div class="show_pop2" data-id='+element.news_id+' data-language='+element.language+' data-preview='+element.preview+'>';
						
						if(element.news_type == "产品故事" || element.news_type == "產品故事"){
							s = s +'<div class="show_img2_mark animated" style="background: url(images/svg/new_list_yellow.svg);">'+element.news_type+'</div>';
						}
						if(element.news_type == "美人痣" || element.news_type == "美人誌"){
							s = s  +'<div class="show_img2_mark animated" style="background: url(images/svg/new_list_golden.svg);">'+element.news_type+'</div>';
						}
						if(element.news_type == "品牌活动" || element.news_type == "品牌活動"){
							s = s +'<div class="show_img2_mark animated" style="background: url(images/svg/new_list_red.svg);">'+element.news_type+'</div>';
						}
						if(element.news_type == "新品上市" || element.news_type == "新品上市"){
							s = s +'<div class="show_img2_mark animated" style="background: url(images/svg/new_list_blue.svg);">'+element.news_type+'</div>';
						}
						s = s +'<div class="new_pop2_box"><img class="center-block img-responsive animated" src='+element.trade_photo1+' /><div class="black1"></div></div>'
                  +'<div class="bottom_des animated">'
/*                    +'<div class="mouse_pop_dibu hidden-xs hidden-sm animated"></div>'*/
                    +'<div class="mouse_pop animated">'
                      +'<div class="icons">'
                        +'<img class="animated" src="images/icons_1.png" />'
                        +'<img class="animated" src="images/icons_2.png" />'
                        +'<img class="animated" src="images/icons_3.png" />'
                        +'<img class="animated" src="images/svg/icons_4.svg" />'
                      +'</div>'
                      +'<span class="date_time animated">'+element.created+'</span>'
                    +'</div>'
                    +'<div class="product_m_title1 hidden-md hidden-lg">'+element.news_title+'</div>'
                    +'<div class="bottom_des1 animated">'
                    +element.news_title
                    +'</div>'
                    +'<div class="bottom_des2 text-overflow-3 animated">'
                    +element.introduce
                    +'</div>'
                  +'</div>'
                +'</div>';
				console.log(s);
                    $("#new_list_box").append(s);
						
                  })

                  $("#new_list_box").on("click",".show_pop2",function(e){
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
      
      
      
      
      // 新闻详情页
     //查看某一则新闻详情
      //字段有问题
      var new_details = function(){
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
                    $("#news_details .news_title").html(data.data.news_type);
                    $("#news_details .news_name").html(data.data.news_title);
                    $("#news_details .news_sma").html(data.data.introduce);
                      // var ue = UE.getEditor('#news_details .news_words');
                      // ue.ready(function() {
                      //     ue.execCommand('inserthtml', data.data.conten);
                      // });
                    $("#news_details .news_words").html(data.data.conten);
                    //$("#news_details .news_words").html(data.data.conten);
/*                    $(".news_video #example_video_1 source").attr("src",data.data.video_url);
                    $(".news_video #example_video_1").attr("src",data.data.video_url);*/
                    if (data.data.video_url != null && data.data.video_url != ""){
                    	$(".video_box").append(data.data.video_url);
                    	$(".video_box embed").attr("id","example_video_1");
                    	$(".video_box iframe").attr("id","example_video_1");
                    } else {
                    	$(".news_video").hide();
                    }
                    // var myPlayer = videojs('example_video_1');
                    // videojs("example_video_1", {}, function(){
                    //   // Player (this) is initialized and ready.
                    // });

                    // myPlayer.on("pause", function(){
                    //   // $(".vjs-big-button").hide();
                    // });

                    // myPlayer.on("play", function(){
                    //   $(".vjs-big-button").hide();
                    // });
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
                    find_index_prev=index-1;
                    find_index_next=index+1;
                    console.log(find_index_prev,find_index_next)
                  }
                })
                if (find_index_prev>=0) {
                  $(".news_tags_left").show(1,function(){
                    
                  });
 /*                 $(".big_new_infor_left").on("click",function(){*/
                  $(".previouse_news").on("click",function(){
                     window.location.href=encodeURI(encodeURI('new_details.html?new_id='+data.data[find_index_prev].news_id+'&language='+link_language+'&preview='+link_preview+''));
                  })
                  $("#news_details .news_tags_left .news_time").html(data.data[find_index_prev].created);
                  $("#news_details .news_tags_left .news_form").html(data.data[find_index_prev].news_title);
                }
                if (find_index_next<data.data.length) {
                  $(".news_tags_right").show(1,function(){
                    // window.location.href=encodeURI(encodeURI('new_details.html?new_id='+find_index_next+'&language='+link_language+'&preview='+link_preview+''));
                  });
/*                  $(".big_new_infor_right").on("click",function(){*/
                  $(".next_news").on("click",function(){                	  
                     window.location.href=encodeURI(encodeURI('new_details.html?new_id='+data.data[find_index_next].news_id+'&language='+link_language+'&preview='+link_preview+''));
                  })
                  $("#news_details .news_tags_right .news_time").html(data.data[find_index_next].created);
                  $("#news_details .news_tags_right .news_form").html(data.data[find_index_next].news_title);
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
      
      
      //记录邮箱
      var save_mail = function(){
        $.ajax({
          url: "/BeMoralOfficial/official/save_mail.do",
          type: "POST",
          data:{email:"165031871@qq.com"},
          cache: false,
          dataType:"JSON",
          success: function (data) {
              var data = data;
              if(data.status==0){
                  console.log("")
                  console.log("记录成功")
              }else if(data.status==1){
                  console.log("")
                  console.log("记录失败, 邮箱已存在")
              }else{
                  console.log("")
                  console.log("记录失败 网络异常")
              }
              
             
          },
          error: function () {
              //alert(111)
          }
        });
      }
      
      
     //二级菜单展示（此部分周二我们一起讨论下）
      //通过一级菜单(一级菜单固定不变)动态显示二级菜单
      var trade_kind_new,trade_ser_new;
/*      var getsecond_menu = function(parent_name){
        $.ajax({
          url: "/BeMoralOfficial/official/getsecond_menu.do",
          type: "POST",
          data:{language:"tc",preview:2,level:2,parent_name:parent_name},
          cache: false,
          dataType:"JSON",
          success: function (data) {
              if(data.status==0){
                  console.log("二级菜单",data.data);
                  $(".collection_ul").empty();
                  data.data.forEach(function(element,index){
                    $(".second_menu_ul").append(
                      '<li><a link='+element.child_name_url+'>'+element.child_name+'</a><ul></ul></li>'
                    )
                    
                    $(".collection_ul").append(
                      '<li><a link='+element.child_name_url+'>'+element.child_name+'</a><ul></ul></li>'
                      )
                   //移動                      
                   $(".second_menu_ul_sm").append(
                      '<li class="dropdown-submenu"><a class="dropdown-toggle" href="#" data-toggle="dropdown" link='+element.child_name_url+'>'+element.child_name+'<strong class="caret"></a><ul class="dropdown-menu"></ul></li>'
                      '<li role="presentation" class="dropdown-header">'+element.child_name+'</li>'
                   )
                    var index_ = index;

                    $.ajax({
                      url: "/BeMoralOfficial/official/getsecond_menu.do",
                      type: "POST",
                      data:{language:"tc",preview:2,level:3,parent_name:element.child_name},
                      cache: false,
                      dataType:"JSON",
                      success: function (data) {
                          if(data.status==0){
                              console.log("二级菜单1",data.data);
                              data.data.forEach(function(element,index){
                                
                                var name_ = element.child_name;
                                var url_chuan = element.child_name_url;

                                var trade_kind_id_chuan = parseInt(getStr(url_chuan,"trade_kind_id="));
                                console.log(trade_kind_id_chuan);
                                $.ajax({
                                  url: "/BeMoralOfficial/official/getseries_byid.do",
                                  type: "POST",
                                  data:{trade_kind_id:trade_kind_id_chuan},
                                  cache: false,
                                  dataType:"JSON",
                                  success: function (data) {

                                    trade_kind_new = data.data.parent_name;
                                    trade_ser_new =  data.data.trade_kind;
                                    console.log("getseries_byid",data.data);
                                    var succession_url = 'product_succession.html?language='+link_language+'&preview='+link_preview+'&trade_kind='+trade_kind_new+'&trade_series='+trade_ser_new+''
                                    $(".collection_ul li ul").eq(index_).append(
                                      '<li><a link='+succession_url+'>'+name_+'</a></li>'
                                    )

                                    if (!index_==0) {
                                      $(".second_menu_ul li ul").eq(index_).append(
                                        '<li><a style="left:3px" link='+succession_url+'>'+name_+'</a></li>'
                                      );
                                    }else{
                                      $(".second_menu_ul li ul").eq(index_).append(
                                        '<li><a link='+succession_url+'>'+name_+'</a></li>'
                                      );
                                    }
                                  //移動 
                                    $(".second_menu_ul_sm .dropdown-header").eq(index_).append(
                                    	'<li role="presentation"><a role="menuitem" tabindex="-1" href='+succession_url+'>'+name_+'</a></li>'
                                      '<li><a link='+succession_url+'>'+name_+'</a></li>'
                                      );

                                  },
                                  error: function () {
                                      //alert(111)
                                  }
                                });

                                
                                
                              })


                              
                           $("#first_menu li a").on("click",function(){
                             $(".second_menu_ul li ul").hide();
                             $(".second_menu_ul li a").removeClass("active");
                             $(".second_menu_ul li a span").width(0);
                           })
if(browser.versions.mobile || browser.versions.android || browser.versions.iPhone || browser.versions.iPad){ }else{
    Global.second_menu_show_hide(".second_menu_ul>li>a",".second_menu_ul>li>ul");
	
}
                              
                           $(".second_menu_ul").on("click","li ul li",function(){
                            var jump_link = $(this).find("a").attr("link");
                            window.location.href=encodeURI(encodeURI(jump_link));
                           })

                           $(".collection_ul").on("click","li ul li",function(){
                            var jump_link = $(this).find("a").attr("link");
                            window.location.href=encodeURI(encodeURI(jump_link));
                           })

                           $(".second_menu_ul li a").append("<span class='bottom_line1'></span>");                      

                          $(".second_menu_ul li a").on("mouseenter",function(){
                            var this_ = $(this);
                            console.log(this_.width()-2)
                            $(this).find("span").stop().animate({width:this_.width()-2},200,"linear",function(){});
                          });

                          $(".second_menu_ul li a").on("click",function(){
                            var this_ = $(this);
                            $(this).parent("li").siblings().find("a").removeClass("active");
                            $(".second_menu_ul li a").find("span").stop().animate({width:"0%"},200,"linear",function(){});
                            if ($(this).hasClass('active')) {
                              $(this).removeClass('active');
                            }else{
                              $(this).addClass('active');
                              $(this).find("span").stop().animate({width:this_.width()-2},200,"linear",function(){});
                            }
                            
                          });

                          $(".second_menu_ul li a").on("mouseleave",function(){
                            if ($(this).hasClass('active')) {

                            }else{
                              $(this).find("span").stop().animate({width:"0%"},200,"linear",function(){});
                            }
                            
                          });



                          $(".collection_ul li a").append("<span class='bottom_line1'></span>");                      

                          $(".collection_ul li a").on("mouseenter",function(){
                            var this_ = $(this);
                            console.log(this_.width()-2)
                            $(this).find("span").stop().animate({width:this_.width()-2},200,"linear",function(){});
                          });

                          $(".collection_ul li a").on("click",function(){
                            var this_ = $(this);
                            $(this).parent("li").siblings().find("a").removeClass("active");
                            $(".collection_ul li a").find("span").stop().animate({width:"0%"},200,"linear",function(){});
                            if ($(this).hasClass('active')) {
                              $(this).removeClass('active');
                            }else{
                              $(this).addClass('active');
                              $(this).find("span").stop().animate({width:this_.width()-2},200,"linear",function(){});
                            }
                            
                          });

                          $(".collection_ul li a").on("mouseleave",function(){
                            if ($(this).hasClass('active')) {

                            }else{
                              $(this).find("span").stop().animate({width:"0%"},200,"linear",function(){});
                            }
                            
                          });


                          $(".collection_ul li ul li a").append("<span class='bottom_line1'></span>");                      

                          $(".collection_ul li ul li a").on("mouseenter",function(){
                            var this_ = $(this);
                            $(this).find("span").stop().animate({width:this_.width()-2},200,"linear",function(){});
                          });

                          $(".collection_ul li ul li a").on("click",function(){
                            var this_ = $(this);
                            $(this).parent("li").siblings().find("a").removeClass("active");
                            $(".collection_ul li ul li a").find("span").stop().animate({width:"0%"},200,"linear",function(){});
                            if ($(this).hasClass('active')) {
                              $(this).removeClass('active');
                            }else{
                              $(this).addClass('active');
                              $(this).find("span").stop().animate({width:this_.width()-2},200,"linear",function(){});
                            }
                            
                          });

                          $(".collection_ul li ul li a").on("mouseleave",function(){
                            if ($(this).hasClass('active')) {

                            }else{
                              $(this).find("span").stop().animate({width:"0%"},200,"linear",function(){});
                            }
                            
                          });


                          }else{
                              console.log("服务器繁忙")
                          }
                          
                         
                      },
                      error: function () {
                          //alert(111)
                      }
                    });
                    
                  })
                  
              }else{
                  console.log("服务器繁忙")
              }
              
            $(".collection_ul li>a").on("click",function(){
              $(this).parent("li").siblings("li").find("ul").slideUp();
              $(this).siblings("ul").slideToggle();
            })   
          },
          error: function () {
              //alert(111)
          }
        });
      }

      getsecond_menu("SHOP");*/
$(function(){
  // $("#first_menu").each(function(){
  //   var this_ = $(this);
  //   var index_ = this_.index();
  //   if (index_==2) {
  //     this_.attr("href",'new_list.html?language='+link_language+'&preview='+link_preview+'');
  //   }
  // })
})
      

