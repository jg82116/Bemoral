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
var trade_kind_new,trade_ser_new;
var getsecond_menu_m = function(parent_name){
  $.ajax({
    url: "/BeMoralOfficial/official/getsecond_menu.do",
    type: "POST",
    data:{language:"tc",preview:2,level:2,parent_name:parent_name},
    cache: false,
    dataType:"JSON",
    success: function (data) {
        if(data.status==0){
            console.log("二级菜单app",data.data);
            $(".menum_list1").empty();
            data.data.forEach(function(element,index){
             //移動                      
             $(".menum_list1").append(
                '<li id='+index+'><a id='+index+'>'+element.child_name+'</a><ul id='+index+'></ul></li>'
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

                          var trade_kind_id_chuan = parseInt(getStr(url_chuan,"trade_kind_id="))
                          $.ajax({
                            url: "/BeMoralOfficial/official/getseries_byid.do",
                            type: "POST",
                            data:{trade_kind_id:trade_kind_id_chuan},
                            cache: false,
                            dataType:"JSON",
                            success: function (data) {

                              trade_kind_new = data.data.parent_name;
                              trade_ser_new =  data.data.trade_kind;
                              var succession_url = 'product_succession.html?language='+link_language+'&preview='+link_preview+'&trade_kind='+trade_kind_new+'&trade_series='+trade_ser_new+''
                              
                                $(".menum_list1 li ul").eq(index_).append(
                                  '<li><a link='+succession_url+'>'+name_+'</a></li>'
                                );

                            },
                            error: function () {
                                //alert(111)
                            }
                          });

                        })
                     
                     $("#first_menu_m li a").on("click",function(){
                        $(".menum_list1 li ul").hide();
                     })
                     
                     $(".menum_list1").on("click","li ul li",function(){
                        var jump_link = $(this).find("a").attr("link");
                        window.location.href=encodeURI(encodeURI(jump_link));
                     })
                  
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
        
      $("#first_menu_m li>a").on("click",function(){
        $(this).parent("li").siblings("li").find("ul").slideUp();
      })   
      var a=0;
      var b=0;
      var c=0;
      $(".menum_list1 li").eq(0).on("click",function(){
		  b=0;c=0;
    	  if(a%2==0){
	         $(".menum_list1 li ul").hide();
	         $(".menum_list1 li").find("ul#"+this.id+"").css("display","block");
    	  }else{
 	         $(".menum_list1 li ul").hide();
    	  }
         a++;
      })
      $(".menum_list1 li").eq(1).on("click",function(){
		  a=0;c=0;
    	  if(b%2==0){
 	         $(".menum_list1 li ul").hide();
 	         $(".menum_list1 li").find("ul#"+this.id+"").css("display","block");
     	  }else{
  	         $(".menum_list1 li ul").hide();
     	  }
          b++;
       })
	   $(".menum_list1 li").eq(2).on("click",function(){
		  b=0;a=0;
		   if(c%2==0){
		         $(".menum_list1 li ul").hide();
		         $(".menum_list1 li").find("ul#"+this.id+"").css("display","block");
	    	  }else{
	 	         $(".menum_list1 li ul").hide();
	    	  }
	         c++;
	    })
    },
    error: function () {
    }
  });
}
var lock_num=false,lock_num1=false;
var nav_num = 0,nav_lock=false,nav_num1 = 0,nav_lock1=false;
$(function(){
	if(browser.versions.mobile || browser.versions.android || browser.versions.iPhone || browser.versions.iPad){ 
		//官网首页展示 		
		$("#big_big").addClass("container-fluid_m");
		//点击返回首页
		$(".logo_m").click(function(){
			window.location.href= "index.html";
		});
		//登錄
		const username = sessionStorage.getItem("username");
		if(username!=null){
			$("#first_menu_m li").eq(5).find("a").eq(0).css("display","none");
			$("#first_menu_m li").eq(5).find("a").eq(1).css("display","inline-block");
			$("#first_menu_m li").eq(5).find("a").eq(1).html(username);
		}else{
			$("#first_menu_m li").eq(5).find("a").eq(0).css("display","block");
			$("#first_menu_m li").eq(5).find("a").eq(0).css("width","100%");
			$("#first_menu_m li").eq(5).find("a").eq(1).css("display","none");
			$("#first_menu_m li").eq(5).find("a").eq(2).css("display","none");
		}
		$("#getInfo").click(function(){
			
			window.location.href = "profile.html";
		})
		$("#goOut").click(function(){
			sessionStorage.removeItem("username");
			window.location.href= "index.html";
		})
		//导航栏
		  var  nav_lock = false;
		  $(".nav_button_m1").on("touchend",function(){
		    if (nav_num==0&&nav_lock==false) {
		      nav_num=1;
		      nav_lock=true;
		  /*    $('.nav_button').css("position","fixed");*/
		      $(".logo_m1,.cart_box1").hide();
		      $(".nav_list").slideDown(200);
		      $(".nav_button_m1").css("position","fixed");
		      $(".nav_button").css("position","fixed");
		      $("#first_menu_m").removeClass("fadeOut");
		      $(".nav_button").eq(0).stop().transition({ rotate:90,translate:[0,2] }, 300, 'linear', function(){
		        $("#first_menu_m").addClass("fadeInDown");
		        $(this).find("span").stop().transition({ rotate:45 }, 100, 'linear', function(){
		          nav_lock=false;
		          unScroll();
		          
		        });
		      });
		      $(".nav_button").eq(1).stop().transition({ rotate:-90,translate:[0,2] }, 300, 'linear', function(){
		        $(this).find("span").stop().transition({ rotate:-45 }, 100, 'linear', function(){});
		      });
		      /*$(window).scroll(function() {
	    	      var scrollY = $(document).scrollTop();// 获取垂直滚动的距离，即滚动了多少
	    	      console.log(scrollY);
	    	      if (scrollY > 0){ //如果滚动距离大于550px则隐藏，否则删除隐藏类
	    	        nav_num=0;
			      	nav_lock=true;
				      $(".nav_list").slideUp();
				      $(".nav_button_m1").css("position","absolute");
				      $(".nav_button").css("position","absolute");
				      $(".logo_m1,.cart_box1").show();
				      $("#first_menu_m").removeClass("fadeInDown").addClass("fadeOut").css("opacity","0");
				      $("#first_menu_m>li>ul").slideUp();
				      $(".nav_button").eq(0).find("span").stop().transition({ rotate:0}, 100, 'linear', function(){
				        $(".nav_button").eq(0).stop().transition({ rotate:0,translate:[0,0] }, 300, 'linear', function(){
				          nav_lock=false;
				          reScroll();
				        });
				      });
	
				      $(".nav_button").eq(1).find("span").stop().transition({ rotate:0}, 100, 'linear', function(){
				        $(".nav_button").eq(1).stop().transition({ rotate:0,translate:[0,0] }, 300, 'linear', function(){});
				      });
	    	      }  
    	      });*/
		    }else if (nav_num==1&&nav_lock==false) {
		      nav_num=0;
		      nav_lock=true;
		    /*  $('.nav_button').css("position","absolute");*/
		      $(".nav_list").slideUp();
		      $(".logo_m1,.cart_box1").show();
			  $(".nav_button_m1").css("position","absolute");
			  $(".nav_button").css("position","absolute");
		      $("#first_menu_m").removeClass("fadeInDown").addClass("fadeOut").css("opacity","0");
		      $("#first_menu_m>li>ul").slideUp();
		      $(".nav_button").eq(0).find("span").stop().transition({ rotate:0}, 100, 'linear', function(){
		        $(".nav_button").eq(0).stop().transition({ rotate:0,translate:[0,0] }, 300, 'linear', function(){
		          nav_lock=false;
		          reScroll();
		        });
		      });

		      $(".nav_button").eq(1).find("span").stop().transition({ rotate:0}, 100, 'linear', function(){
		        $(".nav_button").eq(1).stop().transition({ rotate:0,translate:[0,0] }, 300, 'linear', function(){});
		      });
		    }
		  })

		  $("#first_menu_m>li>a").on("touchend",function(){
		    $(this).siblings("ul").slideToggle();
		  })


		//底部导航栏
		  $(".nav_button1").on("touchend",function(){
		    if (nav_num1==0&&nav_lock1==false) {
		      nav_num1=1;
		      nav_lock1=true;
		      $(".nav_list1").slideDown(200);
		      $("#bottom_menu_m").removeClass("fadeOut");
		      $(".nav_button1").eq(0).stop().transition({ rotate:90,translate:[0,2] }, 300, 'linear', function(){
		        //$("#bottom_menu_m").slideDown(200);
		        $("#bottom_menu_m").addClass("fadeInUp");
		        $(this).find("span").stop().transition({ rotate:45 }, 100, 'linear', function(){
		          nav_lock1=false;
		          
		        });
		      });
		      $(".nav_button1").eq(1).stop().transition({ rotate:-90,translate:[0,2] }, 300, 'linear', function(){
		        $(this).find("span").stop().transition({ rotate:-45 }, 100, 'linear', function(){});
		      });
		      var HeigthY = $(document).scrollTop();
		      $(window).scroll(function() {
		    	      var scrollY = $(document).scrollTop();// 获取垂直滚动的距离，即滚动了多少
		    	      if (scrollY < HeigthY){ //如果滚动距离大于550px则隐藏，否则删除隐藏类
		    	        nav_num1=0;
					      nav_lock1=true;
					      $(".nav_list1").slideUp();
					      //$("#bottom_menu_m").hide();
					      $("#bottom_menu_m").removeClass("fadeInUp").addClass("fadeOut").css("opacity","0");
					      $("#bottom_menu_m>li>ul").slideUp();
					      $(".nav_button1").eq(0).find("span").stop().transition({ rotate:0}, 100, 'linear', function(){
					        $(".nav_button1").eq(0).stop().transition({ rotate:0,translate:[0,0] }, 300, 'linear', function(){
					          nav_lock1=false;
					          
					        });
					      });
		
					      $(".nav_button1").eq(1).find("span").stop().transition({ rotate:0}, 100, 'linear', function(){
					        $(".nav_button1").eq(1).stop().transition({ rotate:0,translate:[0,0] }, 300, 'linear', function(){});
					      });
		    	      }  
	    	      });
		    }else if (nav_num1==1&&nav_lock1==false) {
		      nav_num1=0;
		      nav_lock1=true;
		      $(".nav_list1").slideUp();
		      //$("#bottom_menu_m").hide();
		      $("#bottom_menu_m").removeClass("fadeInUp").addClass("fadeOut").css("opacity","0");
		      $("#bottom_menu_m>li>ul").slideUp();
		      $(".nav_button1").eq(0).find("span").stop().transition({ rotate:0}, 100, 'linear', function(){
		        $(".nav_button1").eq(0).stop().transition({ rotate:0,translate:[0,0] }, 300, 'linear', function(){
		          nav_lock1=false;
		          
		        });
		      });

		      $(".nav_button1").eq(1).find("span").stop().transition({ rotate:0}, 100, 'linear', function(){
		        $(".nav_button1").eq(1).stop().transition({ rotate:0,translate:[0,0] }, 300, 'linear', function(){});
		      });
		    }
		  })
var a=0;
		  var b=0;
		  var c=0;
		  $("#bottom_menu_m>li").eq(0).on("touchend","a",function(){
			  b=0;c=0;
			  if(a%2==0){
				    $("#bottom_menu_m>li>ul").hide();
				    $(this).siblings("ul").slideToggle();
			  }else{
				    $("#bottom_menu_m>li>ul").hide();
			  }
		    a++;
		  })
		  $("#bottom_menu_m>li").eq(1).on("touchend","a",function(){
			  a=0;c=0;
			  if(b%2==0){
				    $("#bottom_menu_m>li>ul").hide();
				    $(this).siblings("ul").slideToggle();
			  }else{
				    $("#bottom_menu_m>li>ul").hide();
			  }
		    b++;
		  })
		  $("#bottom_menu_m>li").eq(2).on("touchend","a",function(){
			  b=0;a=0;
			  if(c%2==0){
				    $("#bottom_menu_m>li>ul").hide();
				    $(this).siblings("ul").slideToggle();
			  }else{
				    $("#bottom_menu_m>li>ul").hide();
			  }
		    c++;
		  })
		  getsecond_menu_m("SHOP");
	}
})