var Global = Global || {};

//on load function
$().ready(function() {
	$(".left_more_pop").css("height","224px");
	//��ȡ�����˵�
	getsecond_menu("SHOP");
	
	//�����˵�Ч��
	
	  $(".second_menu_ul>li>ul").find("span").addClass('animated').css("opacity","0");

	  $(".second_menu_ul>li>ul").on("click",function(){
	    return false;
	  })
	
	// footer bottom line
    $(".footer_list li ul li a").append("<span class='bottom_line_new'></span>");
    // white botton line 
	$(".bottom_line_white").append("<span class='bottom_line_new' id='bottom_line'></span>");
    // white botton line 
	$(".bottom_line_black").append("<span class='bottom_line' id='bottom_line'></span>");
	
	Global.lang_show_hide=function(show_obj,lang_obj){
		$(show_obj).on("click",function(){
			/*      $(lang_obj).slideToggle();*/
			$(lang_obj).fadeToggle();
			return false;
		})
		
		$(lang_obj).find("li").on("click",function(){
			var this_ = $(this);
			var this_text = this_.text();
			setlanguage(null,this_text);
			$(show_obj).text(this_text);
			$(lang_obj).slideToggle(1,function(){
				$(lang_obj).prepend(this_);
			});
			if (this_text=="TW"){
				window.location.href="/TW/index.html";
			} else if(this_text=="CN"){
				window.location.href="/CN/index.html";
			} else if(this_text=="EN"){
				window.location.href="/EN/index.html";
			}
			
		})
		
		$("body").on("click",function(){
			/*    	$(lang_obj).slideUp("slow");*/
			$(lang_obj).fadeOut();
			second_menu_hide();
			
		})
	}
	
	Global.lang_show_hide(".lang_change",".lang_choose");
	
	Global.div_show_hide = function(trigger_obj,execute_obj){
		
		$(trigger_obj).find("a").on("click",function(){
			
			var this_ = $(this).parent();
			var index_ = this_.index();
			if (index_==0) {
				
			}else if (index_==1) {
				second_menu_hide();
				//window.location.href='product_succession.html?language='+link_language+'&preview='+link_preview+'&trade_kind='+trade_kind+'';
				return false;
			}else if (index_==2) {
				window.location.href='new_list.html?language='+link_language+'&preview='+link_preview+'';
				return false;
			}else if (index_==3) {
				window.location.href='QA.html?language='+link_language+'&preview='+link_preview+'';
				return false;
			}else if (index_==4) {
				second_menu_hide();
				//window.location.href='new_list.html?language='+link_language+'&preview='+link_preview+'';
				return false;
			}
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

	//verify and set Cookie
	//API license may required
	var language = getCookie("language");
	if (language == null || language == ""){
		/*src="http://ip-api.com/json/";*/
/*		$.getJSON("https://ip-api.com/json/",function(data){
			console.log("IP API :",data);
			setlanguage(null,data.countryCode);
			var language = getCookie("language");
			setlanguage(language,null)
			setCookie('ip',data.query,365);
			setCookie('countryCode',data.countryCode,365);
		});*/
		
		$.getJSON("https://api.ipify.org?format=json",function(data){
			console.log("IP API :",data);
			setCookie('ip',data.ip,365);
		});		
			
			
		$.get("https://ipinfo.io?token=e91bf74de6916b", function(response) {
			console.log(response);
			setCookie('ip',response.ip,365);
			setlanguage(null,response.country);
			var language = getCookie("language");
			setlanguage(language,null)
			setCookie('countryCode',response.country,365);
			if (response.country == "TW"){
				setCookie("isLand","0",365);
			}else{
				setCookie("isLand","1",365);
			}
		}, "jsonp");		
		
	}
	
	var language = getCookie("language");
	setlanguage(language,null);
	//once in TW folder, change language to tc
	setlanguage("tc","TW");
  var language = getCookie("language");
	//end of verify and set cookie
	
	
	//login status
	$("#logined").hide();
	$("#notlogined").show();
	var token = getCookie("token");
	var username = sessionStorage.getItem("username");
	var userid = sessionStorage.getItem("userId");
	if (username == null || userid == null){		
		if (token != null && token != ""){
			verifyTokenStatus(token);
		}
	}
	
	var username = sessionStorage.getItem("username");
	if (username != null){
		  $("#notlogined").hide();
		  $(".user_name").text(username);
		  $("#loginp2").hide();
		  $("#logined").show();
		  /*$("#loginp1").addClass("fadeIn");*/
	}else{
		$("#notlogined").show();
		$("#logined").hide();
	}
	// end of login status
	
	$("#logined").on("mouseenter",function(){
		$("#loginp1").hide();
		$("#loginp2").show();
	})
	
	$("#logined").on("mouseleave",function(){
		$("#loginp2").hide();
		$("#loginp1").show();
		/*$("#loginp1").addClass("name_nowrap");*/
	})
	
	//联系我们
/*	$(".contact_us>a").attr('href','contact_us.html');*/
	/**
   * 購物車數量
   */
  var user_id = sessionStorage.getItem('userId');
  var getCartTotalNumer = function() {
    $.ajax({
      url: '/BeMoralOfficial/cart/getCartAll.do',
      type: 'POST',
      data: {
        userId: user_id || ""
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
  getCartTotalNumer();
  $('.cart_box').on('click', function(){
    window.location.href='cart.html';
  })
})

$().ready(function() {
    
    // footer bottom line
    $(".footer_list li ul li a").on("mouseenter",function(){
      var this_ = $(this);
      $(this).find("span").stop().animate({width:this_.width()},200,"linear",function(){});
    });

    $(".footer_list li ul li a").on("click",function(){
      var this_ = $(this);
      $(this).parent("li").siblings().find("a").removeClass("active");
      $(".footer_list li ul li a").find("span").stop().animate({width:"0%"},200,"linear",function(){});
      if ($(this).hasClass('active')) {
        $(this).removeClass('active');
      }else{
        $(this).addClass('active');
        $(this).find("span").stop().animate({width:this_.width()},200,"linear",function(){});
      }
      
    });

    $(".footer_list li ul li a").on("mouseleave",function(){
      if ($(this).hasClass('active')) {

      }else{
        $(this).find("span").stop().animate({width:"0%"},200,"linear",function(){});
      }    
    });
 // white bottom line
    $(".bottom_line_white").on("mouseenter",function(){
/*    	bottom_line_hover();*/
        var this_ = $(this);
        $(this).removeClass("active");
        $(this).find("span").stop().animate({width:this_.width()},200,"linear",function(){});
    });
    
    $(".bottom_line_white").on("click",function(){
    	var this_ = $(this);
        $(this).removeClass("active");
        $(this).find("span").stop().animate({width:"0%"},200,"linear",function(){});
        if ($(this).hasClass('active')) {
          $(this).removeClass('active');
        }else{
          $(this).addClass('active');
          $(this).find("span").stop().animate({width:this_.width()},200,"linear",function(){});
        }
    });

    $(".bottom_line_white").on("mouseleave",function(){
        if ($(this).hasClass('active')) {

        }else{
          $(this).find("span").stop().animate({width:"0%"},200,"linear",function(){});
        } 
    });    
      
 // black bottom line      
    $(".bottom_line_black").on("mouseenter",function(){
        var this_ = $(this);
        $(this).removeClass("active");
        $(this).find("span").stop().animate({width:this_.width()},200,"linear",function(){});
    });

    $(".bottom_line_black").on("click",function(){
    	var this_ = $(this);
        $(this).removeClass("active");
        $(this).find("span").stop().animate({width:"0%"},200,"linear",function(){});
        if ($(this).hasClass('active')) {
          $(this).removeClass('active');
        }else{
          $(this).addClass('active');
          $(this).find("span").stop().animate({width:this_.width()},200,"linear",function(){});
        }
    });

    $(".bottom_line_black").on("mouseleave",function(){
        if ($(this).hasClass('active')) {

        }else{
          $(this).find("span").stop().animate({width:"0%"},200,"linear",function(){});
        } 
    }); 
    
    //�������˻��˳�
    
    //���⵼����������������
    $(".fix_none").addClass('animated');
    var nav_lock = false;
    
    $(".logo").on("click",function(){
        window.location.href="index.html";
      })
    
      /**
       * footer click
       */
    var user_id = sessionStorage.getItem("userId");
    $("#myAccount").on("click", function(e){
      e.preventDefault();
      if(!user_id) {
        alert("請登錄")
        window.location.href="Login.html";
      } else {
        window.location.href="profile.html";
      }
    })
    $("#myCollect").on("click", function(e){
      e.preventDefault();
      if(!user_id) {
        alert("請登錄")
        window.location.href="Login.html";
      } else {
        window.location.href="my_collection.html";
      }
    })
    $("#myHistory").on("click", function(e){
      e.preventDefault();
      if(!user_id) {
        alert("請登錄")
        window.location.href="Login.html";
      } else {
        window.location.href="my_order.html";
      }
    })
    
})

$(window).scroll(function(){
  // footer...
  Global.html_scroll();
})

//Cookie ...
function setCookie(cname,cvalue,exdays){
	var d = new Date();
	d.setTime(d.getTime()+(exdays*24*60*60*1000));
	var expires = "expires="+d.toGMTString();
	document.cookie = cname+"="+cvalue+"; "+expires+"; path=/";
	
}

function getCookie(cname){
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++) {
		var c = ca[i].trim();
		if (c.indexOf(name)==0) { return c.substring(name.length,c.length); }
	}
	return "";
}
// end of Cookie

function bottom_line_hover(){
	console.log("hover ",$(this));
    var this_ = $(this);
    $(this).find("#bottom_line").stop().animate({width:this_.width()},200,"linear",function(){});
}

function bottom_line_click(){
	var this_ = $(this);
    $(this).removeClass("active");
    $(this).find("#bottom_line").stop().animate({width:"0%"},200,"linear",function(){});
    if ($(this).hasClass('active')) {
      $(this).removeClass('active');
    }else{
      $(this).addClass('active');
      $(this).find("#bottom_line").stop().animate({width:this_.width()},200,"linear",function(){});
    }	
}

function bottom_line_leave(){
    if ($(this).hasClass('active')) {

    }else{
      $(this).find("#bottom_line").stop().animate({width:"0%"},200,"linear",function(){});
    } 	
}

function second_menu_hide(){
    $(".second_menu").slideUp();
    $(".second_menu_ul>li>ul").slideUp();
    $("#first_menu a").removeClass("active");
    $(".bottom_line,.bottom_line1").width(0);
    $(".second_menu_ul li a").removeClass("active");
}

//set up language and language cookie
function setlanguage(language,country){
	if (language != null){
		if (language == "sc"){
			$(".lang_change").text("CN");			
			$(".lang_choose").prepend($(".lang_choose").find("li:contains(CN)"));
		}else if (language == "tc"){
			$(".lang_change").text("TW");			
			$(".lang_choose").prepend($(".lang_choose").find("li:contains(TW)"));
		}else if (language == "en"){			
			$(".lang_change").text("EN");			
			$(".lang_choose").prepend($(".lang_choose").find("li:contains(EN)"));
		}
	} 
	if (country != null){
		if (country == "CN"){
			setCookie('language','sc',365);
		} else if(country == "TW"){
			setCookie('language','tc',365);
		} else{
			setCookie('language','en',365);
		}
	}
}




Global.html_scroll=function(){
	  //if (document.body.scrollTop || document.documentElement.scrollTop>=$(".footer").offset().top-$(".footer").height()-300) {
	    $(".copy_right").addClass("fadeInUp");
	    $(".footer_list>li>span").addClass("fadeInUp");
	    $(".footer_list>li>ul>li>a").addClass("fadeInUp");
	    setTimeout(function(){
	      $(".search_box").addClass("fadeIn");
	    },300)
	 // }



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


// API need to review again.
function verifyTokenStatus(token){
	$.ajax({
   	   url: "/BeMoralOfficial/user/check_status.do",
	       type: "POST",
	       data:{
	    	   token:token,
	    	   },
	       cache: false,
	       dataType:"JSON",
	       success: function(data){
	    	  //console.log("token verify",data);
	    	  if(data.status == 0){
	    		  /*$(".user_name").val(data.data.username)*/
	    		  $("#notlogined").hide();
	    		  $(".user_name").text(data.data.username);	
	    		  sessionStorage.setItem('username',data.data.username);	    		  
	    		  sessionStorage.setItem('userId',data.data.id);	    		  
	    		  sessionStorage.setItem('userInfo', JSON.stringify(data.data));
	    		  $("#loginp2").hide();
	    		  $("#logined").show();
	    		  /*$("#loginp1").addClass("fadeIn");*/
/*	    		  $("#loginp1").addClass("fadeIn");
	    		  $("#loginp1").addClass("fadeIn");*/
	    		  
	    	  }else{
	    		  $("#notlogined").show();
	    		  $("#logined").hide();		  
	    	  }
	    	  
	       },
	       error: function(data){
	    		  $("#notlogined").show();
	    		  $("#logined").hide();		
	       },
	           	 
	})
}


//�����˵�չʾ���˲����ܶ�����һ�������£�
//ͨ��һ���˵�(һ���˵��̶�����)��̬��ʾ�����˵�
var trade_kind_new,trade_ser_new;
var link_language = getCookie('language');
var language = getCookie('language');
var link_preview = 2;
var getsecond_menu = function(parent_name){
  $.ajax({
    url: "/BeMoralOfficial/official/getsecond_menu.do",
    type: "POST",
    data:{language:language,preview:2,level:2,parent_name:parent_name},
    cache: false,
    dataType:"JSON",
    success: function (data) {
        if(data.status==0){
            //console.log("�����˵�",data.data);
            $(".collection_ul").empty();
            data.data.forEach(function(element,index){
              $(".second_menu_ul").append(
                '<li><a link='+element.child_name_url+'>'+element.child_name+'</a><ul></ul></li>'
              )
              
              $(".collection_ul").append(
                '<li><a link='+element.child_name_url+'>'+element.child_name+'</a><ul></ul></li>'
                )
             //�Ƅ�                      
             $(".second_menu_ul_sm").append(
                /*'<li class="dropdown-submenu"><a class="dropdown-toggle" href="#" data-toggle="dropdown" link='+element.child_name_url+'>'+element.child_name+'<strong class="caret"></a><ul class="dropdown-menu"></ul></li>'*/
                '<li role="presentation" class="dropdown-header">'+element.child_name+'</li>'
             )
              var index_ = index;

              $.ajax({
                url: "/BeMoralOfficial/official/getsecond_menu.do",
                type: "POST",
                data:{language:language,preview:2,level:3,parent_name:element.child_name},
                cache: false,
                dataType:"JSON",
                success: function (data) {
                    if(data.status==0){
                        //console.log("�����˵�1",data.data);
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
                              //console.log("getseries_byid",data.data);
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
                            //�Ƅ� 
                              $(".second_menu_ul_sm .dropdown-header").eq(index_).append(
                              	'<li role="presentation"><a role="menuitem" tabindex="-1" href='+succession_url+'>'+name_+'</a></li>'
/*                                      '<li><a link='+succession_url+'>'+name_+'</a></li>'*/
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

                     Global.second_menu_show_hide(".second_menu_ul>li>a",".second_menu_ul>li>ul");
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
                      $(this).find("span").stop().animate({width:this_.width()},200,"linear",function(){});
                    });

                    $(".second_menu_ul li a").on("click",function(){
                      var this_ = $(this);
                      $(this).parent("li").siblings().find("a").removeClass("active");
                      $(".second_menu_ul li a").find("span").stop().animate({width:"0%"},200,"linear",function(){});
                      if ($(this).hasClass('active')) {
                        $(this).removeClass('active');
                      }else{
                        $(this).addClass('active');
                        $(this).find("span").stop().animate({width:this_.width()},200,"linear",function(){});
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
                      //console.log(this_.width()-2)
                      $(this).find("span").stop().animate({width:this_.width()},200,"linear",function(){});
                    });

                    $(".collection_ul li a").on("click",function(){
                      var this_ = $(this);
                      $(this).parent("li").siblings().find("a").removeClass("active");
                      $(".collection_ul li a").find("span").stop().animate({width:"0%"},200,"linear",function(){});
                      if ($(this).hasClass('active')) {
                        $(this).removeClass('active');
                      }else{
                        $(this).addClass('active');
                        $(this).find("span").stop().animate({width:this_.width()},200,"linear",function(){});
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
                      console.log(this_.width()-2)
                      $(this).find("span").stop().animate({width:this_.width()},200,"linear",function(){});
                    });

                    $(".collection_ul li ul li a").on("click",function(){
                      var this_ = $(this);
                      $(this).parent("li").siblings().find("a").removeClass("active");
                      $(".collection_ul li ul li a").find("span").stop().animate({width:"0%"},200,"linear",function(){});
                      if ($(this).hasClass('active')) {
                        $(this).removeClass('active');
                      }else{
                        $(this).addClass('active');
                        $(this).find("span").stop().animate({width:this_.width()},200,"linear",function(){});
                      }
                      
                    });

                    $(".collection_ul li ul li a").on("mouseleave",function(){
                      if ($(this).hasClass('active')) {

                      }else{
                        $(this).find("span").stop().animate({width:"0%"},200,"linear",function(){});
                      }
                      
                    });


                    }else{
                        console.log("��������æ")
                    }
                    
                   
                },
                error: function () {
                    //alert(111)
                }
              });
              
            })
            
        }else{
            console.log("��������æ")
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

 Global.second_menu_show_hide = function(second_menu_li,second_menu_li_ul){
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
 
 function logout(){
   setCookie('token',null,0);
   sessionStorage.removeItem('username');
   sessionStorage.removeItem('userId');
   sessionStorage.removeItem('userInfo');
	  $("#notlogined").show();
	  $("#logined").hide();	
    window.location.href='index.html';
 }
 
 function getQueryString(name) {
	    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	    var r = window.location.search.substr(1).match(reg);
	    if (r != null) return unescape(r[2]); return null;
} 

function getStr(string,str){ 
	    var str_before = string.split(str)[0]; 
	    var str_after = string.split(str)[1]; 
	    return str_after; 
} 
	 

//中文字符判断
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

//获取币种
var convertCCY = function(language){
  if (language=='sc'){
    return '￥';
  } else if(language=='tc'){
    return 'NT$';
  }else{
    return 'NT$';
  }
}

