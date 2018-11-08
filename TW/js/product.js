var Global = Global || {};
var arrl = [];
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

var product_detail;
var product_details_m  = function(){
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
                console.log("跳转到商品详情页app",data.data);
								product_detail = data.data;
								
				  getProductAll(product_detail.id);
                $("#product_details_m .success_title span").eq(2).html(data.data.trade_series);
                $("#product_details_m .success_title span").eq(3).html(data.data.title);
                $("#product_details_m #swiper6 .swiper-wrapper").append(
                  '<div class="swiper-slide"><img class="center-block img-responsive" src='+data.data.trade_photo1+' /></div>',
                  '<div class="swiper-slide"><img class="center-block img-responsive" src='+data.data.trade_photo2+' /></div>',
                  '<div class="swiper-slide"><img class="center-block img-responsive" src='+data.data.trade_photo3+' /></div>',
                  '<div class="swiper-slide"><img class="center-block img-responsive" src='+data.data.trade_photo4+' /></div>',
                  '<div class="swiper-slide"><img class="center-block img-responsive" src='+data.data.trade_photo5+' /></div>'
                )
				var mySwiper6 = new Swiper('#swiper6', {
					effect: 'coverflow',
			        slidesPerView: 1,
			        centeredSlides: true,
			        coverflowEffect: {
			            rotate: 0,
			            stretch: 65,
			            depth: 280,
			            modifier: 2,
			            slideShadows: false
			        },
					on:{
						init:function(){
							
						}
					}
				});

                $(".list-details .details_title").html(data.data.title);
                $(".list-details .details_des").html(data.data.standard);
                $(".list-details .details_trade_title").html(data.data.trade_title);
                $(".list-details .details_des1").html(data.data.original_price);
                $(".list-details .price_sum").html(" " + data.data.sell_point);     
                
                $(".details_box_m .details_box_list").eq(0).find(".details_details_m .details_m_text img").attr("src",data.data.trade_photo1_left);
                $(".details_box_m .details_box_list").eq(0).find(".details_details_m .details_m_text p").eq(0).html(''+data.data.desc1+'');
                $(".details_box_m .details_box_list").eq(1).find(".details_details_m .details_m_text p").eq(0).html(''+data.data.desc2+'');
				var producrt_composition = $(".details_box_m .details_box_list").eq(0).find(".details_details_m .details_m_text p p").eq(0).text();
				$(".details_box_m .details_box_list").eq(0).find(".details_details_m .details_m_text p p").eq(0).css("display","none");
				$(".list_sm .details_s_title .box_start").eq(0).html(producrt_composition);
                $.ajax({
                    url: "/BeMoralOfficial/official/trade_kind_introduce.do",
                    type: "POST",
                    data:{language:get_language,preview:get_preview,trade_kind:get_trade_kind,trade_series:data.data.trade_series},
                    cache: false,
                    dataType:"JSON",
                    success: function (data) {
                    	console.log(data);
                        if(data.status==0){
                            if (data.data.trade_url_link!=null) {
                            	$(".video_box_m").html(data.data.trade_url_link);
                            	$(".video_box_m iframe").attr("id","example_video_m1");
                            	localStorage.setItem("trade_url_link",data.data.trade_url_link);
                            }else{
                              $(".video_box_m").hide();
                            }
						}
                    },
                    error: function () {
                        //alert(111)
                    }
                });
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
                  product_detail = data.data;
				  getProductAll(product_detail.id);
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
                $("#product_details .price_sale").html("  " + data.data.sell_price);
                $("#product_details .price_real").html("  " + data.data.original_price);          

                $("#product_details .left_tu").attr("src",data.data.trade_photo1_left);
                $("#product_details .details_unit").eq(0).find(".details_unit_words").html('<p>'+data.data.desc1+'</p>');
                $("#product_details .right_tu").attr("src",data.data.trade_photo1_right);
                $("#product_details .details_unit").eq(1).find(".details_unit_words").html('<p>'+data.data.desc2+'</p>');

                $("#product_details .new_details").html(data.data.conten);
                /*console.log(get_id);*/
                getprodvideo(get_language,get_preview,data.data.trade_kind, data.data.trade_series);
				product_list(data.data.trade_kind);
            }else{
                console.log("服务器繁忙")
            }  
        },
        error: function () {
            //alert(111)
        }
    });
  }

//视频，抓产品系列页视频
function getprodvideo(language, preview, trade_kind,trade_series){
	$.ajax({
      url: "/BeMoralOfficial/official/ trade_kind_introduce.do",
      type: "POST",
      data:{language: language,
      	preview: preview,
      	trade_kind:trade_kind,
      	trade_series: trade_series},
      cache: false,
      dataType:"JSON",
      success: function (data) {
        	if (data.data.trade_url_link != null && data.data.trade_url_link != "" ){
          $("#product_video").append(data.data.trade_url_link);
          $("#product_video embed").attr("id","example_video_1");
          $("#product_video iframe").attr("id","example_video_1");
        	} else {
        		$("#product_video").hide();
        	}
        	
      },
      error:{
      	
      },
      })
}

//其它商品信息pc
var product_list = function(get_trade_kind){
	var get_id = getQueryString("id");
	//var get_trade_kind = decodeURI(getQueryString("trade_kind"));
	var shuju_len,loop_state=true;
	$.ajax({
	  url: "/BeMoralOfficial/official/gettrade_details.do",
	  type: "POST",
	  data:{language:"tc",preview:2,trade_kind:get_trade_kind},
	  cache: false,
	  dataType:"JSON",
	  success: function (data) {
	      if(data.status==0){
	          console.log("主要商品详细",data.data);
	          shuju_len = data.data.length;
	          data.data.forEach(function(element){
	            if (element.id!=get_id) {
	            $("#product_details #swiper3 .swiper-wrapper").append(
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
	if (shuju_len<=5) {
	  loop_state=false;
	  $(".left_jt_product").hide();
	  $(".right_jt_product").hide();
	}else{
	  loop_state=true;
	}
	mySwiper3 = new Swiper('#swiper3', {
	  loop:shuju_len,
	  navigation: {
	    nextEl: '.right_jt_product',
	    prevEl: '.left_jt_product',
	  },
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
	      $("#product_details #swiper3").on("click",".swiper-slide",function(){
	        var this_id = $(this).attr("data-id");
	        var this_kind =  $(this).attr("trade_kind");
        window.location.href=encodeURI(encodeURI('product_details.html?id='+this_id+'&preview=2&language=tc'+'&trade_kind='+this_kind));
	      })

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
//其它商品信息移动
var product_list_m = function(swiper_el){
	var get_id = getQueryString("id");
	var get_trade_kind = decodeURI(getQueryString("trade_kind"));
	var shuju_len,loop_state=true;
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
	            if (element.id!=get_id) {
	            	arrl.push({title:element.title});
	            $("#product_details_m #swiper7 .swiper-wrapper").append(
			      '<div class="swiper-slide" data-id='+element.id+' trade_kind='+element.trade_kind+'>'
			      +'<img class="center-block hidden-xs hidden-sm" src='+element.trade_photo1+' />'
			      +'<img class="center-block hidden-md hidden-lg" src='+element.trade_photo1+' />'
			      +'<div class="des_box">'
			        +'<div class="product_name">'+element.title+'</div>'
			        +'<div class="product_weight">'+element.standard+'</div>'
			        +'<div class="product_stars"><img src="images_m/star.svg" /><img src="images_m/star.svg" /><img src="images_m/star.svg" /><img src="images_m/star.svg" /><img src="images_m/half_star.svg" /><span>4.5/5</span></div>'
			        +'<div class="product_price"><span>NT$ '+element.sell_price+'</span><span>NT$ '+element.original_price+'</span></div>'
			      +'</div>'
			    +'</div>')
	             }
	          })
			
		var mySwiper7 = new Swiper('#swiper7', {
			effect: 'coverflow',
	        slidesPerView: 1,
	        centeredSlides: true,
	        coverflowEffect: {
	            rotate: 0,
	            stretch: 65,
	            depth: 280,
	            modifier: 2,
	            slideShadows: false
	        },
		  on:{
		  	slideChangeTransitionStart:function(){
		  		
			},
			slideChangeTransitionEnd:function(){
				
			},
		    init:function(){
				$("#product_details_m #swiper7").on("click",".swiper-slide",function(){
			        var this_id = $(this).attr("data-id");
			        var this_kind =  $(this).attr("trade_kind");
			        window.location.href=encodeURI(encodeURI('product_details.html?id='+this_id+'&preview=2&language=tc'+'&trade_kind='+this_kind));
			      })
		    }
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
//移动端
/*var Index_getadvertising_ms = function(swiper_el){
    $.ajax({
        url: "/BeMoralOfficial/official/getadvertising.do",
        type: "POST",
        data:{language:"tc",preview:2},
        cache: false,
        dataType:"JSON",
        success: function (data) {
          if(data.status==0){
              data.data.forEach(function(element){
            	$(".container-fluid_m #swiper4_m .swiper-wrapper").append(
            		  '	<div class="swiper-slide" trade_kind='+element.trade_kind+' trade_series='+element.trade_series+' >'
                      +'   <div class="show_pop2" >'
                      +'     <img class="center-block img-responsive" src='+element.trade_photo1+' />'
                      +'     <div class="bottom_des">'
                      +'      <div class="product_m_title1 hidden-md hidden-lg">'+element.trade_series+'</div>'
                      +'      <div class="bottom_des1">'+element.ad_name+'</div>'
                      +'  <div class="bottom_des2">add photo</div>'
                      +'  <div class="bottom_des3">view gallery</div>'
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
	}*/
	var userId = sessionStorage.getItem('userId');
	var getProductAll = function(id) {
		$.ajax({
			url: '/BeMoralOfficial/favorite/getFavoriteAll.do',
			type: 'POST',
			data: {
					userId: userId || ""
			},
			dataType: 'JSON',
			success: function(data) {
				var flog = true;
				for(var i=0;i<data.data.length;i++){
						console.log(data.data[i].id == id);
					if(data.data[i].id == id){
						$(".shoucang_btn").addClass("collect");
						flog = true;
					}else{
						$(".shoucang_btn").removeClass("collect");
						flog = false;
					}
					if(flog){
						return;
					}
				}	
				
			},
			error: function(err) {
			}
		})
	}
	//getProductAll();
	var collectProduct = function() {
		$.ajax({
			url: '/BeMoralOfficial/favorite/addFavoriteAll.do',
			type: 'POST',
			data: {
					userId: userId || "",
					cId: product_detail.id
			},
			dataType: 'JSON',
			success: function(data) {
				if(data.status == 0) {
					layer.msg('收藏成功')
				}
			},
			error: function(err) {
			}
		})
	}
	var cancelProduct = function() {
		$.ajax({
			url: '/BeMoralOfficial/favorite/delFavorite.do',
			type: 'POST',
			data: {
					userId: userId || "",
					cId: product_detail.id
			},
			dataType: 'JSON',
			success: function(data) {
					if(data.status == 0) {
						layer.msg('取消收藏成功')
					}
			},
			error: function(err) {
			}
		})
	}
	var getCurrentCartTotal = function() {
		$.ajax({
			url: '/BeMoralOfficial/cart/getCartAll.do',
			type: 'POST',
			data: {
				userId: userId || ""
			},
			dataType: 'JSON',
			success: function(data) {
				if(data.status == 0) {
					var clist = data.data;
					$('#commonCartNum').html(clist.length);
					$('.cart_box span').html(clist.length);
				} else {
				}
			},
			error: function() {
	
			}
		})
	}
$(function(){
	if(browser.versions.mobile || browser.versions.android || browser.versions.iPhone || browser.versions.iPad){ 
		//官网首页展示 		
		$("#big_big").addClass("container-fluid_m");
		//商品基本信息
		product_details_m();
		product_list_m();
		$(".single_img div").bind("click",function(){
			var imgs = $(this).find("img").attr("src");
			$(".pops_img img").attr("src",imgs);
			$(".pops_img").css("display","block");
		})
		$(".pops_img").click(function(){
			$(".pops_img").css("display","none");
		})
		//展开类型
		$(".comment_end .end_right").click(function(){
			$(".comment_contents").slideToggle();
		})
		//收藏
		
		var iii = 0;
		$(".product_collection").click(function(){
			if(iii%2==0){
				$(".product_collection img").attr("src","images/shoucang1.png");
				collectProduct();
			}else{
				$(".product_collection img").attr("src","images/shoucang.png");
				cancelProduct();
			}
			iii++;
		});
		  $(".details_box_m .details_box_list").eq(1).find(".details_details_m").hide();
		  $(".details_box_m .details_box_list").eq(2).find(".details_details_m").hide();
		var a = 0;
		  $(".details_box_m .details_box_list").eq(0).find(".list_sm .details_s_title p").eq(1).click(function(){
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
		  $(".details_box_m .details_box_list").eq(1).find(".list_sm .details_s_title p").eq(1).click(function(){
			  console.log(b%2);
			  if(b%2!=0){
				  $(".details_box_m .details_box_list").eq(1).find(".details_s_title p").eq(1).html("+"); 
				  $(".details_box_m .details_box_list").eq(1).find(".details_details_m").hide();
			  }else{
				  $(".details_box_m .details_box_list").eq(1).find(".details_s_title p").eq(1).html("-"); 
				  $(".details_box_m .details_box_list").eq(1).find(".details_details_m").show();
			  }
			  b++;
		  });
		//减少数量
		$('.details_button .button_-').click(function(event) {
	        var a = $('.details_button .button-text').html();
	        if(a>1){
	        	$('.details_button .button-text').html(parseInt(a)-1);
	        }else{
	        	return;
	        }
	    });
		//增加数量
		$('.details_button .button_j').click(function(event) {
	        var a = $('.details_button .button-text').html();
	        $('.details_button .button-text').html(parseInt(a)+1);
	    });
			/**
 * mobile 加入購物車
 */
	$(".add_details").on('click', function(){
		var pro_num = $(".button-text").html();
		var pro_id = product_detail.id;
		var cName = product_detail.title;
		var pro_price = product_detail.sell_price;
		var stock_num = product_detail.store_num;
		var pull_num = product_detail.pull_num;
		var pro_sku = product_detail.standard;
		var pro_photo = product_detail.trade_photo1;
		var params = {
			userId: userId || "",
			cId: pro_id,
			cName: cName,
			cNum: pro_num,
			cPrice: pro_price,
			cStandard: pro_sku,
			trade_photo1: pro_photo
		}
		$.ajax({
			url: '/BeMoralOfficial/cart/addCartAll.do',
			type: 'POST',
			data: params,
			dataType: 'JSON',
			success: function(data) {
				if (data.status == 0) {
					getCurrentCartTotal();
					alert('添加成功');
				}
			}
		})
	})
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
		
	}else{
		

$(".product_banner .swiper-pagination-bullets").css("marginLeft",(-$(".product_banner .swiper-pagination-bullets").width()/2)+"px");

$(".product_swiper_box").css("marginTop",-$(".product_swiper_box").height()/2);


/*$(window).scroll(function(){
  // console.log(document.body.scrollTop || document.documentElement.scrollTop);
  Global.html_scroll();
})*/

$(".shoucang_btn").click(function(){
	/*var flog = $(".shoucang_btn").css("background").split("\"")[1].split("/");
	console.log(flog[flog.length-1]);*/
	  var this_ = $(this);
	  if (!this_.hasClass("collect")) {
			this_.addClass("collect");
			collectProduct()
	  } else {
		this_.removeClass("collect")
		cancelProduct()
	}
  
})
$(".reviews_button2").click(function(){
  $(this).find(".choose_skin").slideToggle();
})

$(".choose_skin .choose_skin_unit").click(function(){
  var this_c = $(this).find(".choose_txt").html();
  console.log(this_c)
  $(".reviews_button2>span").html(this_c);
  $(".reviews_button2").find(".choose_skin").slideToggle();
  return false;
})

$(".review_img_box").on("click","img",function(){
  var this_src = $(this).attr('src');
  $(".pops_img").show(1,function(){
    $(".pops_img img").attr('src',this_src);
  });
})


$(".pops_img").click(function(){
  $(this).hide();
})



/*$(".fix_none").addClass('animated');*/
/*var nav_lock = false;*/
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
}*/

/*Global.html_scroll();*/

Global.jiantou(".left_jt_product_banner");
Global.jiantou(".left_jt_product");
Global.jiantou(".right_jt_product");
Global.jiantou(".right_jt_face");
Global.jiantou(".left_jt_face");


product_details();

$(".product_banner .swiper-pagination-bullets").css("marginLeft",(-$(".product_banner .swiper-pagination-bullets").width()/2)+"px");
                        $(".product_swiper_box").css("marginTop",-$(".product_swiper_box").height()/2);

mySwiper = new Swiper('#face_swiper', {
  loop:true,
  // allowTouchMove: false,
  slidesPerView:5,
  navigation: {
    nextEl: '.right_jt_face',
    prevEl: '.left_jt_face',
  },
  direction : 'horizontal',
  on:{
    init:function(){
       
    },
    resize: function(){

    },
    slideChangeTransitionEnd:function(){
  
    },

  },
});

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

$(".read_more").on("click",function(){
	$(this).prev().toggleClass("text-overflow-3");
	
	if ($(this).prev().hasClass("text-overflow-3")){
		$(this).html("查看更多")
	}else{
		$(this).html("收起")
	}
	
});
//setTimeout(getProductAll(),1);


/**
 * 添加购物车
 */


$('.add_bag').on('click', function(){
  var pro_num = $('.bur_num').val();
  var pro_id = product_detail.id;
  var cName = product_detail.title;
  var pro_price = product_detail.sell_price;
  var stock_num = product_detail.store_num;
  var pull_num = product_detail.pull_num;
  var pro_sku = product_detail.standard;
  var pro_photo = product_detail.trade_photo1;
  var params = {
    userId: userId || "",
    cId: pro_id,
    cName: cName,
    cNum: pro_num,
    cPrice: pro_price,
    cStandard: pro_sku,
    trade_photo1: pro_photo
  }
  $.ajax({
    url: '/BeMoralOfficial/cart/addCartAll.do',
    type: 'POST',
    data: params,
    dataType: 'JSON',
    success: function(data) {
      if (data.status == 0) {
        getCurrentCartTotal();
        alert('添加成功');
      }
    }
  })
})

/**
 * 快速購買
 */
$('.buy_button2').on('click', function(){
	if(!userId) {
		alert('請登錄');
	}
	var pro_num = $('.bur_num').val();
  var pro_id = product_detail.id;
  var cName = product_detail.title;
  var pro_price = product_detail.sell_price;
  var stock_num = product_detail.store_num;
  var pull_num = product_detail.pull_num;
  var pro_sku = product_detail.standard;
  var pro_photo = product_detail.trade_photo1;
  var params = {
    userId: userId,
    cId: pro_id,
    cName: cName,
    cNum: pro_num,
    cPrice: pro_price,
    cStandard: pro_sku,
    trade_photo1: pro_photo
	}
	var checkList = [];
	checkList.push(params);
	localStorage.setItem('checkedList', JSON.stringify(checkList));
	window.location.href='order_first.jsp';
})
}
	
})