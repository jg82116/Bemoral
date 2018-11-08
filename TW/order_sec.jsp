<%@ page contentType="text/html;charset=utf-8" language="java" import="java.io.*,java.util.*,java.sql.*" %>
<!doctype html>
<html lang="zh-CN">
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" charset="utf-8">
  <title>BeMoral</title>
  <script type="text/javascript">
  if (screen.width<=768)
      document.write('<script type="text/javascript" src="js/viewport.js"><\/script>');
  </script>
  
  <link rel="stylesheet" href="../css/animate.css">
  <link rel="stylesheet" href="../css/swiper-4.2.2.min.css">
  <link rel="stylesheet" href="../css/bootstrap.min.css">
  <link rel="stylesheet" href="../css/style.css">
  <link rel="stylesheet" href="../css/order.css">
  <script src="js/jquery-1.11.min.js" type="text/javascript"></script>
  
  <script type="text/javascript" src="js/swiper.js"></script>

  <script type="text/javascript" src="js/bootstrap.min.js"></script>
  <script type="text/javascript" src="js/jquery.transit.min.js"></script>
<!--   <script type="text/javascript" src="js/easing.js"></script>
  <script type="text/javascript" src="js/round.js"></script> -->
  <script src="js/common.js" type="text/javascript"></script>
  <script src="js/orderSec.js" type="text/javascript"></script>
  <script src="js/commonnew.js" type="text/javascript"></script>
<!-- 移动端   -->
  <script src="js/common_m.js" type="text/javascript"></script>
 <%
  String  URLResEnc=request.getParameter("URLResEnc")==null?"":request.getParameter("URLResEnc");
  
   %>
</head>
<body>
  <!-- <div class="test_box" style="width: 300px;height: 300px;position: fixed;z-index: 100;background: green;left: 0;top: 0"></div> -->
  <div class="container-fluid index" id="big_big" style="padding: 0;">
    <header>
      <nav class="product black_nav">
        <div class="nav_box hidden-xs hidden-sm">
          <img class="logo" src="images/logo1.png" />
  <!--           <div class="left_button"><a class="search_button animated">SEARCH</a><a class="contact_us animated fix_none">聯繫我們</a></div> -->
          <div class="left_button">
              <a class="search_button animated">SEARCH</a>
              <div class="bottom_line_div contact_us animated"><a class="contact_us animated fix_none bottom_line_white" href="contact_us.html">聯繫我們</a></div>
          </div>
          <input class="search_input" type="text" name="search" placeholder="SEARCH YOU WANT" style="display: none;" />
          <div class="right_button">
            <a class="lang_change fix_none">TW</a>
            <ul class="lang_choose fix_none" style="display: none;">
              <li data="tw">TW</li>
              <li data="en">EN</li>
              <li data="cn">CN</li>
            </ul>
            <!-- <a class="account_button">登錄</a> -->
  <!--             <div class="submit_text">Hi,<span class="user_name">ANNA</span><img src="images/person_icon.png" /></div> -->
            <div class="submit_text" id="logined">
                <div class="animated fadeIn" id="loginp1" style="width:100%">Hi,<span class="user_name"></span><img src="images/person_icon.png" /></div>
                <div class="animated fadeIn" id="loginp2" style="width:100%"><a class="bottom_line_black" href='profile.html' style="padding-right:10px;">賬戶</a><a class="bottom_line_black" href="javascript:;" onclick="logout()">退出</a></div>
            </div>
            <div class="submit_text bottom_line_div" id="notlogined"><a class="bottom_line_black" href='Login.html'>登錄</a></div>            
            <div class="bottom_line_div">
              <a class="chart_button bottom_line_white" href="cart.html">購物車</a>
              <a class="chart_num" id="commonCartNum" href="cart.html">0</a>
            </div>
          </div>
          <div class="first_menu fix_none">
            <ul id="first_menu">
              <li><a>SHOP</a></li>
              <li><a>ABOUT</a></li>
              <li><a href="">動態</a></li>
              <li><a>Q&A</a></li>
              <li><a>禮品</a></li>
              <div id="nav_slider"></div>
            </ul>
          </div>
          <div class="second_menu" style="display: none;">
            <ul class="second_menu_ul">
              <!-- <li><a>hand made soap</a><ul><li><a>collection 1</a></li><li><a>collection 2</a></li><li><a>collection 3</a></li></ul></li>
              <li><a>facial mask</a><ul><li><a>collection 1</a></li><li><a>collection 2</a></li><li><a>collection 3</a></li></ul></li>
              <li><a>hair care</a><ul><li><a>collection 1</a></li><li><a>collection 2</a></li><li><a>collection 3</a></li></ul></li>
              <li><a>skin care</a><ul><li><a>collection 1</a></li><li><a>collection 2</a></li><li><a>collection 3</a></li></ul></li>
              <li><a>BeMoral kits</a><ul><li><a>collection 1</a></li><li><a>collection 2</a></li><li><a>collection 3</a></li></ul></li> -->
              <div id="nav_slider1"></div>
            </ul>
          </div>
        </div>
        <div class="nav_box1 hidden-md hidden-lg">
          <img class="logo_m logo_m1" src="images_m/logo.png" />
          <div class="cart_box cart_box1">
            <span>5</span>
          </div>
          <div class="nav_button_m1">
          </div>
          <div class="nav_button">
            <span class="nav_left"></span>
          </div>
          <div class="nav_button">
            <span class="nav_right"></span>
          </div>
          <div class="nav_list" style="display: none;">
            <img class="logo_m" src="images_m/logo.png" />
            <div class="cart_box">
              <span>5</span>
            </div>
            <ul id="first_menu_m" class="menu_m animated" style="opacity:0;">
              <li class="menu_m_list"><a>SHOP</a>
              <ul class="menum_list1"></ul>
              </li>
              <li><a>ABOUT</a></li>
              <li><a href="/BeMoralOfficial/HTML/new_list.html?language=tc&preview=2">動態</a></li>
              <li><a href="/BeMoralOfficial/HTML/QA.html?language=tc&preview=2">Q&amp;A</a></li>
              <li><a>禮品</a></li>
              <li><a href="/BeMoralOfficial/HTML/Login.html">登錄</a><a id="getInfo"></a><a id="goOut">登出</a></li>
              <li class="change_lang"><a>en</a><a>cn</a><a>tw</a></li>
              <li class="search_input1">
                <div class="search_icon"></div>
                <input type="text" name="" placeholder="SEARCH YOU WANT">
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
    <!-- main -->
    <div class="main" style="margin-top: 300px;">
      <div class="order-wrap">
        <div class="osubmit-item">
          <div class="osubmit-item_title clearfix">
            <div class="pull-left">
                <img src="./images/my_payment.png" />
                <span>我的付款</span>
            </div>
            <div class="pull-right">
            </div>
          </div>
          <div class="osubmit-item_bd submit-payment">
            <div class="submit-payment_hd clearfix">
              <div class="submit-payment_info">
                <p class="payment-info_title">請及時付款，<br> 
                    以便訂單盡快處理</p>
                <p class="payment-info_no">訂單編號： <span></span></p>
                <p class="payment-info_time">請在<span>30</span>分鐘內付款，否則交易將被取消。</p>
              </div>
              <div class="submit-payment_total">
                <div class="pull-left">
                  <p class="cart-sub">購物車總價</p>
                  <p class="discount">優惠金額</p>
                  <p class="payment_total">總金額</p>
                </div>
                <div class="pull-right">
                  <p class="cart-sub_money">NT$ <span id="cartMoney">0</span></p>
                  <p>-NT$ <span id="discountMoney">0</span></p>
                  <p>NT$ <span id="totalMoney">0</span></p>
                </div>
              </div>
            </div>
            <div class="submit-payment_bd">
              <div class="qrcode-wrap">
                <div class="qrcode-bd clearfix">
                  <div class="wechat-img">
                    <!-- <img src="./images/wechat-tip.png" alt=""> -->
                  </div>
                  <div class="qrcode-img">
                    <img src="" alt="" id="payImg">
                    <p class="wechat-scan" style="display:none;">微信掃一掃</p>
                    <p class="alipay-scan" style="display:none;">支付寶掃一掃</p>
                  </div>
                </div>
              </div>
              <form id="urlForm" method="POST" action="https://testepos.ctbcbank.com/auth/SSLAuthUI.jsp">
                <input type="hidden" name="merID" value="12129">
                <input type="hidden" name="URLEnc" value="" id="urlData">
                <!-- <input type="submit" />s -->
              </form>
              <input type="hidden" id="urlRes" value="<%=URLResEnc%>">
			  <div class="payment-totals" style="display:none;">
              <div class="payment-list clearfix">
                <div class="payment-item">
                  <input type="radio" name="payment" id="alipay" value="2" />
                  <label for="">
                    <img src="./images/alipay.png" />
                  </label>
                </div>
                <div class="payment-item">
                  <input type="radio" name="payment" id="wechatPay" value="1" />
                  <label for="">
                    <img src="./images/wechat_pay.png" />
                  </label>
                </div>
                <div class="payment-item bank-card">
                  <input type="radio" name="payment" id="bankPay" value="4" />
                  <label for="">
                    <img src="./images/bank_card.png" />
                  </label>
                </div>
                <div class="payment-item">
                  <input type="radio" name="payment" id="cardPay" value="5" />
                  <label for="">
                    <img src="./images/credit.png" />
                  </label>
                </div>
              </div>
				<button class="payment-button" type="button" id="payment-button">确认支付</button>
				</div>
            </div>
          </div>
          <div class="more-address other-payment">
            選擇更多支付方式
            <img src="./images/circle_arrow_down.png" />
          </div>
        </div>
      </div>
    </div>

    <!-- footer -->
    <footer class="footer hidden-xs hidden-sm">
      <ul class="footer_list clearfix">
        <li>
          <span class="animated">ABOUT BeMoral</span>
          <ul>
            <li><a class="animated" href="#">關於我們</a></li>
            <li><a class="animated" href="#">藝術家合作</a></li>
            <li><a class="animated" href="#">最新產品</a></li>
            <li><a class="animated" href="#">線上條款</a></li>
            <li><a class="animated" href="#">工作機會</a></li>
            <li><a class="animated" href="new_list.html?language=tc&preview=2">新聞資訊</a></li>
          </ul>
        </li>
        <li style="margin-left: 130px;margin-right: 150px;">
          <span class="animated">MY  BeMoral</span>
          <ul>
            <li><a class="animated" href="#">我的賬號</a></li>
            <li><a class="animated" href="#">我的收藏</a></li>
            <li><a class="animated" href="#">歷史訂單</a></li>
          </ul>
        </li>
        <li>
          <span class="animated">HELP&FAQ</span>
          <ul>
            <li><a class="animated" href="#">聯系我們</a></li>
            <li><a class="animated" href="#">客戶服務</a></li>
            <li><a class="animated" href="#">派送信息</a></li>
          </ul>
        </li>

        <div class="search_box animated">
          <input class="search_kuang" type="text" name="search" placeholder="FIND PRODUCT"/>
          <div class="search_button1"></div>
        </div>
        
      </ul>

      <div class="copy_right hidden-xs hidden-sm animated">隱私政策 | 服務條款<span>©2018BeMoral. ALL RIGHTS RESERVED</span></div>
    </footer>
    <footer class="footer hidden-lg hidden-md" style="z-index: 2;position: relative;margin-top: 1px;">
      <div class="nav_list1" style="display: none;">
        <ul id="bottom_menu_m" class="menu_m animated" style="opacity: 0;">
          <li><a>about BeMoral</a><ul><li><a>online exclusives</a></li><li><a>careers</a></li><li><a>events</a></li></ul></li>
          <li><a>help & faq</a></li>
          <li><a>privacy policy</a></li>
          <li><a>trems and conditions</a></li>
        </ul>
      </div>
      <div class="bottom_one">
        <input type="text" name="" class="send_message" placeholder="add email to know more" />
        <div class="send_btn"></div>
        <div class="nav_button1">
          <span class="nav_left1"></span>
        </div>
        <div class="nav_button1">
          <span class="nav_right1"></span>
        </div>
      </div>
      <img class="icons_m" src="images_m/icons.png" />
      <div class="copy_right_m">©2018BeMoral. ALL RIGHTS RESERVED</div>
    </footer>
  </div>
</body>
</html>