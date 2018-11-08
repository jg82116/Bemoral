  // This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log("statusChangeCallback",response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      //window.location.href="bindaccount.html?login_type=fb";
      //testAPI();
    	fblogin();
    } else {
      // The person is not logged into your app or we are unable to tell.
    	FB.login();
    }
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  window.fbAsyncInit = function() {
    FB.init({
      appId      : '912281778969701',
      cookie     : true,  // enable cookies to allow the server to access 
                          // the session
      xfbml      : true,  // parse social plugins on this page
      version    : 'v3.1' // use graph api version 2.8
    });

    // Now that we've initialized the JavaScript SDK, we call 
    // FB.getLoginStatus().  This function gets the state of the
    // person visiting this page and can return one of three states to
    // the callback you provide.  They can be:
    //
    // 1. Logged into your app ('connected')
    // 2. Logged into Facebook, but not your app ('not_authorized')
    // 3. Not logged into Facebook and can't tell if they are logged into
    //    your app or not.
    //
    // These three cases are handled in the callback function.
    $("#fblogin").click(function(){
    	FB.login(function(response) {
    		statusChangeCallback(response);  //登录回调函数
    	},{scope: 'public_profile,email'});  //需要获取的信息scope
    })
/*    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });*/

  };

  
  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    //js.src = "script/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      //登录成功后， 去后台判断是否为首次登录
      //如果是首次登录， 则引导用户去绑定手机号码 调用login3 接口
      //如果是再次登录， 则跳转到商城首页 并执行sec_login3 接口

      console.log(response);
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
    });
  }
  
  function fblogin(){
//	  FB.api('/me?fields=name,email',function(response){
	  FB.api('/me',function(response){
		  console.log("fblogin ",response)
		  sessionStorage.setItem('type','facebook');
		  sessionStorage.setItem('userid1',response.id);
		  sessionStorage.setItem('username1',response.name);
	      window.location.href="bindaccount.html?login_type=fb";		  

	  });
  }