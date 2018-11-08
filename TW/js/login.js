
$().ready(function() {

	$("#createaccountpage").click(function(){		
		window.location.href="register.html";
	});
	$("#weibo_login").css("display","none");
	$("#weibo_login").click(function(){
		let weiboAppId = '1031940491';
		let weiboAuthPath = 'https://bemtest.jamapro.com.cn/TW/weibo_login.html';
		window.open(`https://api.weibo.com/oauth2/authorize?client_id=${weiboAppId}&response_type=code&redirect_uri=${encodeURIComponent(weiboAuthPath)}`, '微博登录授权回调页面' ,'height=500, width=700,top=50%, left=50%');
	});
	$("#qq_login").click(function(){
			//以下为按钮点击事件的逻辑。注意这里要重新打开窗口
		   //否则后面跳转到QQ登录，授权页面时会直接缩小当前浏览器的窗口，而不是打开新窗口
		   //var A=window.open("oauth/index.php","TencentLogin", "width=450,height=320,menubar=0,scrollbars=1,resizable=1,status=1,titlebar=0,toolbar=0,location=1");
		/*if(QC.Login.check()){//检查是否已登录
			QC.Login.signOut();退出登录
		}*/
		QC.login({
			btnId:"qq_login",//插入按钮的节点id，必选,可为空字符串
			scope:"all",//用户需要确认的scope授权项，可选，默认all
			size: "A_XL"//按钮尺寸，可用值[A_XL| A_L| A_M| A_S|  B_M| B_S| C_S]，可选，默认B_S
		},function(reqData,opts){
			//登录成功回调方法
			QC.Login.getMe(function(openId,accessToken){
				var args = {
					openid:openId,
					userHeadImg:reqData.figureurl_qq_2,
					access_token:accessToken,
				};
			});
			QC.api('get_user_info',{}).success(function(userdata){
				//可以获得用户的各种相关信息，如用户昵称
				var username = userdata.data.nickname;
				console.log(username);
			});
		},function(opts){
			//注销成功回调方法
		});

	})
	var weappid="wx3388aa6be4a2b7fd";
	var aliappid="2018073160793884";
	var uri="https://bemtest.jamapro.com.cn/TW/bindaccount.html";
	var we="?login_type=we";
	var ali="?login_type=ali";
		
	
	var obj = new WxLogin({
		//true：手机点击确认登录后可以在 iframe 内跳转到 redirect_uri，false：手机点击确认登录后可以在 top window 跳转到 redirect_uri。默认为 false
		self_redirect:false,
		
		id:"wechantQRcon", 
		appid: weappid, 
		scope: "snsapi_login", 
		redirect_uri: encodeURI(uri+we),
		state: "state",
		style: "",
		href: ""
	});
	

	
	$("#wechatlogin").click(function(){
		$("#loginmethod").hide();
		$(".wechatQR").show();
		/*		wechatLogin();*/
	});
	
	$("#alipaylogin").click(function(){
		window.location.href= "https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id="+aliappid+"&scope=auth_user,auth_base&redirect_uri="+encodeURI(uri+ali);
	});

	
})