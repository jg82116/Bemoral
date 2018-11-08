<%@ page contentType="text/html;charset=utf-8" language="java" import="java.io.*,java.util.*,java.sql.*" %>
<!doctype html>
<html lang="zh-tc">
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" charset="utf-8">
  <title>BeMoral</title>
  <script type="text/javascript">
  window.history.go(1);
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
  <script type="text/javascript" src="js/jquery.validate.min.js"></script>
  <script type="text/javascript" src="js/jquery.form.js" ></script>
  
  <script type="text/javascript" src="js/messages_zh_TW.js"></script>
<!--   <script type="text/javascript" src="js/easing.js"></script>
  <script type="text/javascript" src="js/round.js"></script> -->
  <script src="js/common.js" type="text/javascript"></script>
  <script src="js/commonnew.js" type="text/javascript"></script>
  <script src="js/order.js" type="text/javascript"></script>
<!-- 移动端   -->
  <script src="js/common_m.js" type="text/javascript"></script>
  
  <%
  // === 接收電子地圖回傳值 ===
  String s_processID = request.getParameter("processID")==null?"":request.getParameter("processID");
  String s_stCate = request.getParameter("stCate")==null?"":request.getParameter("stCate");
  String s_stCode = request.getParameter("stCode")==null?"":request.getParameter("stCode");
  String s_stName = request.getParameter("stName")==null?"":request.getParameter("stName");
  String s_stAddr = request.getParameter("stAddr")==null?"":request.getParameter("stAddr");
  String s_stTel = request.getParameter("stTel")==null?"":request.getParameter("stTel");
  String s_webPara = request.getParameter("webPara")==null?"":request.getParameter("webPara");

  s_stName = new String(s_stName.getBytes("ISO8859_1"),"UTF-8");
  s_stAddr = new String(s_stAddr.getBytes("ISO8859_1"),"UTF-8");
%>
</head>
<body>
  <!-- <div class="test_box" style="width: 300px;height: 300px;position: fixed;z-index: 100;background: green;left: 0;top: 0"></div> -->
  <div class="container-fluid index" id="big_big" style="padding: 0;">
    <!-- main -->
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
              <li><a href="new_list.html?language=tc&preview=2">動態</a></li>
              <li><a href="QA.html?language=tc&preview=2">Q&amp;A</a></li>
              <li><a>禮品</a></li>
              <li><a href="Login.html">登錄</a><a id="getInfo"></a><a id="goOut">登出</a></li>
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
    <div class="main hidden-xs hidden-sm" style="margin-top: 300px;">
      <div class="order-wrap">
        <!-- 地址 -->
        <div class="osubmit-item">
          <div class="osubmit-item_title clearfix">
            <div class="pull-left">
                <img src="./images/my_shipping.png" />
                <span>我的收貨信息</span>
            </div>
            <div class="pull-right">
              <button class="btn btn-address" data-toggle="modal" data-target="#addressModal">添加新地址<img src="./images/cart-plus.png" /></button>
            </div>
          </div>
          <div class="osubmit-item_bd">
            <ul class="nav nav-tabs" role="tablist" id="addrTab">
              <li role="presentation" class="active">
                <a href="#home" aria-controls="home" role="tab" data-toggle="tab">宅配</a>
              </li>
              <li role="presentation">
                <a href="#profile" aria-controls="profile" role="tab" id="linkmapBtn" data-toggle="tab">超商取貨</a>
              </li>
            </ul>
            <div class="tab-content addr-type">
                <div role="tabpanel" class="tab-pane active" id="home">
                    <ul class="list-unstyled clearfix" id="addrList">
                    </ul>
                    <div class="more-address" id="moreAddress">
                      <span>顯示更多地址信息</span>
                      <img src="./images/circle_arrow_down.png" />
                    </div>
                </div>
                <div role="tabpanel" class="tab-pane" id="profile">
                  <div class="linkmap">
                    <div class="linkmap-title">連接電子地圖</div>
                    
                    <form method="post" action="https://map.ezship.com.tw/ezship_map_web.jsp">
                      <button class="btn bnt-linkmap" type="submit">選擇門市</button>
                      <input type="hidden" name="suID"  value="bemoral2016@gmail.com"> <!-- 賣家登入ezShip的帳號，需開通網站串接服務 -->
                      <input type="hidden" name="processID" id="processID" value=""> <!-- 處理序號或訂單編號，由購物網站自行提供的編號 -->
                      <input type="hidden" name="stCate" value=""> <!-- 取件門市通路代號。可帶空值 -->
                      <input type="hidden" name="stCode" value=""> <!-- 取件門市代號。可帶空值 -->
                      <input type="hidden" name="rtURL" id="rtURL"  value="https://bemtest.jamapro.com.cn/CN/order_first.jsp"><!-- 回傳網址路徑及程式名稱。請輸入完整網站路徑網址。如  -->
                      <input type="hidden" name="webPara" value="simulationpage">
                    </form>
                    <ul class="list-unstyled clearfix" id="linkAddrList"></ul>
                    <div class="more-address" id="moreAddress1">
                      <span>顯示更多地址信息</span>
                      <img src="./images/circle_arrow_down.png" />
                    </div>
                    <input type="hidden" id="orderInitNo" value="<%=s_processID%>" />
                    <input type="hidden" id="orderstCate" value="<%=s_stCate%>" />
                    <input type="hidden" id="orderstName" value="<%=s_stName%>" />
                    <input type="hidden" id="orderstCode" value="<%=s_stCode%>" />
                    <input type="hidden" id="orderstAddr" value="<%=s_stAddr%>" />
                    <input type="hidden" id="orderstTel" value="<%=s_stTel%>" />
                  </div>
                </div>
            </div>
            
          </div>
        </div>
        <!-- 支付方式 -->
        <div class="osubmit-item osubmit-payment">
          <div class="osubmit-item_title clearfix">
            <div class="pull-left">
                <img src="./images/my_payment.png" />
                <span>我的支付方式</span>
                <span class="payment-tips">
                  <img src="./images/coupon-tip.png" alt="">
                  <em>如有問題可點擊問號了解更多相關信息</em>
                </span>
            </div>
            <div class="pull-right">
            </div>
          </div>
          <div class="osubmit-item_bd">
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
            <div class="bank-list clearfix" style="display:none;">
              <div class="bank-item">
                <img src="./images/comm_bank.png" alt="">
              </div>
              <div class="bank-item">
                <img src="./images/con_bank.png" alt="">
              </div>
              <div class="bank-item">
                <img src="./images/cul_bank.png" alt="">
              </div>
              <div class="bank-item">
                <img src="./images/mer_bank.png" alt="">
              </div>
            </div>
          </div>
        </div>
		<!-- 储蓄卡，信用卡支付 -->
		<form id="urlForm" method="POST" action="https://testepos.ctbcbank.com/auth/SSLAuthUI.jsp">
                <input type="hidden" name="merID" value="12129">
                <input type="hidden" name="URLEnc" value="" id="urlData">
                <!-- <input type="submit" />s -->
              </form>
		<input type="hidden" id="urlRes" value="">
        <!-- 商品列表 -->
        <div class="osubmit-item shopping-list">
          <div class="osubmit-item_title clearfix">
            <div class="pull-left">
                <img src="./images/shop.png" style="width:24px;" />
                <span>我的購物車</span>
            </div>
            <div class="pull-right">
              <div class="order-info">
                <span class="order-no">訂單編號 <span></span></span>
                <span class="order-date"></span>
              </div>
            </div>
          </div>
          <div class="osubmit-item_bd">
            <table class="table paid-product">
              <tbody>
              </tbody>
            </table>
          </div>
        </div>
        <!-- 发票 -->
        <div class="osubmit-item invoice-list">
            <div class="osubmit-item_title clearfix">
              <div class="pull-left">
                  <img src="./images/my_invoice.png" />
                  <span>發票信息</span>
              </div>
              <div class="pull-right">
                  <button class="btn btn-invoice" data-toggle="modal" data-target="#invoiceModal">添加發票信息<img src="./images/cart-plus.png" /></button>
              </div>
            </div>
            <div class="osubmit-item_bd" >
              <div class="invoice-hd clearfix">
                <div class="invoice-hd_item">
                  <input type="checkbox" id="needInvoice" />
                  <span class="need-invoice">我需要發票</span>
                </div>
                <div class="invoice-hd_item">
                    <img src="./images/coupon-tip.png" alt="">
                    <span class="invoice-tips">請點擊這裡了解更多有關發票申請的信息</span>
                </div>
              </div>
              <div class="invoice-bd" id="invoiceContent">
                <ul class="list-unstyled clearfix" id="invoiceList">
                </ul>
                <div class="more-address" id="moreInvoice">
                  <span>顯示更多發票信息</span>
                  <img src="./images/circle_arrow_down.png" />
                </div>
              </div>
            </div>
          </div>
          <!-- 优惠券 -->
          <div class="osubmit-item used-coupon">
              <div class="osubmit-item_title clearfix">
                <div class="pull-left">
                    <img src="./images/my-coupon.png" />
                    <span>我的優惠券</span>
                </div>
                <div class="pull-right">
                </div>
              </div>
              <div class="osubmit-item_bd">
                <div class="used-coupon_list clearfix">
                  <div class="used-coupon_item">
                    <p class="used-coupon_price"><span>$</span>300<span>.00</span></p>
                    <p class="used-coupon_limit">消費金額滿 ¥2300</p>
                    <p class="used-coupon_date">2018.04.24 - 2018.5.25</p>
                  </div>
                  <div class="used-coupon_item">
                    <p class="used-coupon_price">50%<strong>OFF</strong></p>
                    <p class="used-coupon_limit">消費金額滿 ¥2300</p>
                    <p class="used-coupon_date">2018.04.24 - 2018.5.25</p>
                  </div>
                </div>
                <div class="used-coupon_total">優惠金額:  <span>NT$ 0.00</span></div>
              </div>
          </div>
          <div class="cart-control_wrap">
            <div class="cart-total_info">
              <ul class="list-unstyled">
                <li class="clearfix">
                  <div class="cart-total_num">總<span>0</span>件商品</div>
                  <div class="cart-info_text">購物車總價</div>
                  <div class="cart-info_money" id="totalPrice">NT$ 0</div>
                </li>
                <li class="clearfix">
                  <div class="cart-info_text">郵費</div>
                  <div class="cart-info_money">NT$ 0</div>
                </li>
                <li class="clearfix">
                  <div class="cart-info_text">優惠金額</div>
                  <div class="cart-info_money">-NT$ 0</div>
                </li>
                <li class="clearfix">
                  <div class="cart-info_text">總金額</div>
                  <div class="cart-info_money cart-total">NT$<span id="realPrice"></span></div>
                </li>
              </ul>
            </div>
            <div class="cart-next clearfix">
              <button class="btn checkout" id="checkout">立即結賬</button>
            </div>
          </div>
      </div>
    </div>
    <!-- mobile -->
    <div class="mobile-main hidden-md hidden-lg">
      <div class="mobile-breadcrumb">
        <a href="index.html">首頁</a>
        <em>/</em>
        <span>購物車</span>
      </div>
      <div class="morder-step-list">
        <div class="morder-step-item">
          <div class="morder-si-title">我的購物車</div>
          <div class="morder-si-bd">
            <div class="morder-cart-list">
              <div class="morder-cart-item clearfix">
                <div class="morder-cart-img">
                  <img src="./images/show1_1.jpg" alt="">
                </div>
                <div class="morder-cart-info">
                  <p class="morder-pro-name">1111</p>
                  <p class="morder-pro-sku">85g</p>
                  <p class="morder-pro-price">
                    <span>300</span>
                    <span class="morder-pro-num">x 1</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="morder-step-item">
          <div class="morder-si-title">我的收貨信息</div>
          <div class="morder-si-bd">
          </div>
        </div>
        <div class="morder-step-item">
          <div class="morder-si-title">我的支付方式</div>
          <div class="morder-si-bd">
            <div class="morder-pay-list">
              <div class="morder-pay-item clearfix">
                <div class="morder-pay-img">
                  <img src="./images_m/malipay.png" />
                </div>
                <div class="morder-pay-info">
                  <p class="morder-pay-type">支付寶</p>
                </div>
              </div>
              <div class="morder-pay-item clearfix">
                <div class="morder-pay-img">
                  <img src="./images_m/mwechat.png" />
                </div>
                <div class="morder-pay-info">
                  <p class="morder-pay-type">微信</p>
                </div>
              </div>
              <div class="morder-pay-item clearfix">
                <div class="morder-pay-img">
                  <img src="./images_m/unionPay.png" />
                </div>
                <div class="morder-pay-info">
                  <p class="morder-pay-type">儲蓄卡</p>
                </div>
              </div>
              <div class="morder-pay-item clearfix">
                <div class="morder-pay-img">
                  <img src="./images_m/mcredit.png" />
                </div>
                <div class="morder-pay-info">
                  <p class="morder-pay-type">信用卡</p>
                </div>
              </div>
            </div>
          </div>
        </div>
		
        <div class="morder-step-item">
          <div class="morder-si-title">發票信息</div>
          <div class="morder-si-bd">
          </div>
        </div>
        <div class="morder-step-item">
          <div class="morder-si-title">我的優惠券</div>
          <div class="morder-si-bd">
            <div class="morder-couponlist">
                <div class="mselected-coupon-item clearfix">
                  <div class="mselected-coupon-hd">50<span class="mselected-coupon-type">%</span>
                    <span class="mslected-coupon-discount">off</span></div>
                  <div class="mselected-coupon-bd">
                    <p class="mselected-coupon-fit">所有項目</p>
                    <p class="mselected-coupon-date">2018.04.24 - 2018.5.25</p>
                  </div>
                </div>
                <div class="mselected-coupon-item clearfix">
                  <div class="mselected-coupon-hd">NT$ 500</div>
                  <div class="mselected-coupon-bd">
                    <p class="mselected-coupon-fit">所有項目</p>
                    <p class="mselected-coupon-date">2018.04.24 - 2018.5.25</p>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mcart-total">
        <div class="mcart-total-title">訂單總價</div>
        <div class="mcart-total-item clearfix">
          <div class="mcart-tm-title">購物車總價</div>
          <div class="mcart-tm-price">NT$ <span id="mcartTotal">0</span></div>
        </div>
        <div class="mcart-total-item clearfix">
          <div class="mcart-tm-title">郵費</div>
          <div class="mcart-tm-price">NT$ <span>0</span></div>
        </div>
        <div class="mcart-total-item clearfix">
          <div class="mcart-tm-title">優惠金額</div>
          <div class="mcart-tm-price">NT$ <span>0</span></div>
        </div>
        <div class="mcart-total-ft clearfix">
          <div class="mcart-tf-title pull-left">總金額</div>
          <div class="mcart-tm-price pull-right">NT$ <span id="mActualTotal">0</span></div>
        </div>
      </div>
      <div class="mcart-control">
        <button class="btn mbtn-checkout" id="mcheckout">立即結賬</button>
        <div class="button-or">
          <img src="./images_m/or.png" alt="">
        </div>
        <button class="btn mtn-shopping">&lt; 返回購物車</button>
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
              <li><a class="animated" id="myAccount">我的賬號</a></li>
              <li><a class="animated" id="myCollect">我的收藏</a></li>
              <li><a class="animated" id="myHistory">歷史訂單</a></li>
            </ul>
          </li>
          <li>
            <span class="animated">HELP&amp;FAQ</span>
            <ul>
              <li><a class="animated" href="contact_us.html">聯繫我們</a></li>
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
            <li>
                <a>about BeMoral</a>
                <ul>
                  <li><a href="#">關於我們</a></li>
                  <li><a href="#">藝術家合作</a></li>
                  <li><a href="#">最新產品</a></li>
                  <li><a href="#">線上條款</a></li>
                  <li><a href="#">工作機會</a></li>
                  <li><a href="new_list.html?language=tc&preview=2">新聞資訊</a></li>
                </ul>
              </li>
            <li>
                <a>MY BeMoral</a>
                  <ul>
                  <li><a id="myAccount">我的賬號</a></li>
                  <li><a id="myCollect">我的收藏</a></li>
                  <li><a id="myHistory">歷史訂單</a></li>
                </ul>
            </li>
            <li>
                <a>help &amp; faq</a>
                <ul>
                  <li><a href="contact_us.html">聯繫我們</a></li>
                  <li><a href="#">客戶服務</a></li>
                  <li><a href="#">派送信息</a></li>
                </ul>
              </li>
          </ul>
      </div>
      <div class="bottom_one">
          <input type="text" name="" class="send_message" placeholder="輸入你的郵箱可了解更多" />
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
    <div class="modal addr-modal fade" tabindex="-1" role="dialog" id="addressModal">
      <div class="modal-dialog" role="document">
        <form class="form-horizontal" id="addrForm">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">新增收貨地址</h4>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="control-label col-sm-2 col-sm-offset-1">城市/區</label>
              <div class="col-sm-3">
                <input type="text" class="form-control" name="ressCity" id="addrCity" maxlength="20" />
              </div>
              <div class="col-sm-3">
                <input type="text" class="form-control" name="ressCounty" id="addrCounty" maxlength="20" />
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-sm-2 col-sm-offset-1">郵編</label>
              <div class="col-sm-6">
                <input type="text" class="form-control" name="ressDeliveryCode" id="addrCode" maxlength="20" />
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-sm-2 col-sm-offset-1">收件人</label>
              <div class="col-sm-6">
                <input type="text" class="form-control" name="ressName" id="addrName" maxlength="20" />
              </div>
            </div>
            <!-- <div class="self-goods" style="display:none;">
              <div class="form-group">
                <label class="control-label col-sm-2 col-sm-offset-1">通路代碼</label>
                <div class="col-sm-6">
                  <input type="text" class="form-control" name="stCate" maxlength="30"  value="<%=s_stCate%>" id="stCate" />
                </div>
              </div>
              <div class="form-group">
                <label class="control-label col-sm-2 col-sm-offset-1">門市代號</label>
                <div class="col-sm-6">
                  <input type="text" class="form-control" name="stCode" maxlength="20"  value="<%=s_stCode%>" id="stCode" />
                </div>
              </div>
              <div class="form-group">
                <label class="control-label col-sm-2 col-sm-offset-1">門市名稱</label>
                <div class="col-sm-6">
                  <input type="text" class="form-control" name="stName" maxlength="40"  value="<%=s_stName%>" id="stName" />
                </div>
              </div>
              <div class="form-group">
                <label class="control-label col-sm-2 col-sm-offset-1">門市地址</label>
                <div class="col-sm-6">
                  <input type="text" class="form-control" name="stAddr" maxlength="50" value="<%=s_stAddr%>" id="stAddr" />
                </div>
              </div>
              <div class="form-group">
                <label class="control-label col-sm-2 col-sm-offset-1">門市電話</label>
                <div class="col-sm-6">
                  <input type="text" class="form-control" name="stTel" maxlength="20" value="<%=s_stTel%>" id="stTel" />
                </div>
              </div>
            </div> -->
            <div class="form-group">
              <label class="control-label col-sm-2 col-sm-offset-1">地址</label>
              <div class="col-sm-6">
                <input type="text" class="form-control" name="ressAddress" maxlength="50" id="addrDetail" />
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-sm-2 col-sm-offset-1">電話</label>
              <div class="col-sm-2">
                <div class="tel-prefix">
                  <input type="text" class="form-control" value="00886" name="phone_country_code" id="phone_country_code">
                </div>
              </div>
              <span class="tel-split">-</span>
              <div class="col-sm-4">
                <input type="text" class="form-control" name="ressSeatPhoto" maxlength="20" id="addrTel" />
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-sm-2 col-sm-offset-1">手機</label>
              <div class="col-sm-2">
                <div class="tel-prefix">
                    <div class="tel-prefix">
                      <input type="text" class="form-control" value="00886" name="phone_country_code" id="phone_country_code">
                    </div>
                </div>
              </div>
              <span class="tel-split">-</span>
              <div class="col-sm-4">
                <input type="text" class="form-control" name="ressPhoto" maxlength="20" id="addrPhone" />
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-sm-2 col-sm-offset-1">郵箱</label>
              <div class="col-sm-6">
                <input type="email" class="form-control" name="ressEmail" id="addrEmail" maxlength="40" />
                <p class="addr-email-tips">請填寫可接收相關信息的郵箱地址</p>
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-sm-2 col-sm-offset-1">地址類型</label>
              <div class="col-sm-5">
                <input type="text" class="form-control" id="addrType" name="ressAddressName" maxlength="20" />
              </div>
              <div class="col-sm-2">
                <div class="addr-home">家</div>
              </div>
              <div class="col-sm-2">
                <div class="addr-office">公司</div>
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-sm-2">&nbsp;</label>
              <div class="col-sm-6">
                <label for="">
                  <input type="checkbox" name="ressDefault" id="addrDefault" />
                  設為默認地址
                </label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="form-group">
              <label for="" class="control-label col-sm-2 col-sm-offset-1">&nbsp;</label>
              <div class="col-sm-3">
                  <button class="btn btn-primary" type="submit" id="saveAddr">保存</button>
                </div>
                <div class="col-sm-3">
                  <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
              </div>
            </div>
          </div>
        </div><!-- /.modal-content -->
       </form>
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
    <!-- 超商取货 -->
    <div class="modal addr-modal fade" tabindex="-1" role="dialog" id="addressModal2">
      <div class="modal-dialog" role="document">
        <form class="form-horizontal" id="self_addrForm">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">新增超商取货地址</h4>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="control-label col-sm-2 col-sm-offset-1">收件人</label>
              <div class="col-sm-6">
                <input type="text" class="form-control" name="ressName" id="self_addrName" maxlength="20" />
              </div>
            </div>
            <div class="self-goods">
              <div class="form-group">
                <label class="control-label col-sm-2 col-sm-offset-1">通路代碼</label>
                <div class="col-sm-6">
                  <input type="text" class="form-control" name="stCate" maxlength="30"  value="<%=s_stCate%>" id="stCate" />
                </div>
              </div>
              <div class="form-group">
                <label class="control-label col-sm-2 col-sm-offset-1">門市代號</label>
                <div class="col-sm-6">
                  <input type="text" class="form-control" name="stCode" maxlength="20"  value="<%=s_stCode%>" id="stCode" />
                </div>
              </div>
              <div class="form-group">
                <label class="control-label col-sm-2 col-sm-offset-1">門市名稱</label>
                <div class="col-sm-6">
                  <input type="text" class="form-control" name="stName" maxlength="40"  value="<%=s_stName%>" id="stName" />
                </div>
              </div>
              <div class="form-group">
                <label class="control-label col-sm-2 col-sm-offset-1">門市地址</label>
                <div class="col-sm-6">
                  <input type="text" class="form-control" name="stAddr" maxlength="50" value="<%=s_stAddr%>" id="stAddr" />
                </div>
              </div>
              <div class="form-group">
                <label class="control-label col-sm-2 col-sm-offset-1">門市電話</label>
                <div class="col-sm-6">
                  <input type="text" class="form-control" name="stTel" maxlength="20" value="<%=s_stTel%>" id="stTel" />
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-sm-2 col-sm-offset-1">電話</label>
              <div class="col-sm-2">
                <div class="tel-prefix">
                  <input type="text" class="form-control" value="00886" name="phone_country_code" id="self_phone_country_code">
                </div>
              </div>
              <span class="tel-split">-</span>
              <div class="col-sm-4">
                <input type="text" class="form-control" name="ressSeatPhoto" maxlength="20" id="self_addrTel" />
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-sm-2 col-sm-offset-1">手機</label>
              <div class="col-sm-2">
                <div class="tel-prefix">
                    <div class="tel-prefix">
                      <input type="text" class="form-control" value="00886" name="phone_country_code" id="self_phone_country_code">
                    </div>
                </div>
              </div>
              <span class="tel-split">-</span>
              <div class="col-sm-4">
                <input type="text" class="form-control" name="ressPhoto" maxlength="20" id="self_addrPhone" />
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-sm-2 col-sm-offset-1">郵箱</label>
              <div class="col-sm-6">
                <input type="email" class="form-control" name="ressEmail" id="self_addrEmail" maxlength="40" />
                <p class="addr-email-tips">請填寫可接收相關信息的郵箱地址</p>
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-sm-2 col-sm-offset-1">地址類型</label>
              <div class="col-sm-5">
                <input type="text" class="form-control" id="self_addrType" name="ressAddressName" maxlength="20" />
              </div>
              <div class="col-sm-2">
                <div class="addr-home">家</div>
              </div>
              <div class="col-sm-2">
                <div class="addr-office">公司</div>
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-sm-2">&nbsp;</label>
              <div class="col-sm-6">
                <label for="">
                  <input type="checkbox" name="ressDefault" id="self_addrDefault" />
                  設為默認地址
                </label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="form-group">
              <label for="" class="control-label col-sm-2 col-sm-offset-1">&nbsp;</label>
              <div class="col-sm-3">
                  <button class="btn btn-primary" type="submit" id="self_saveAddr">保存</button>
                </div>
                <div class="col-sm-3">
                  <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
              </div>
            </div>
          </div>
        </div><!-- /.modal-content -->
       </form>
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal 超商取货--> 
    <div class="modal invoice-modal fade" tabindex="-1" role="dialog" id="invoiceModal">
      <div class="modal-dialog" role="document">
        <form class="form-horizontal" id="invoiceForm">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">新增開票信息</h4>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="control-label col-sm-2 col-sm-offset-1">買家統編</label>
              <div class="col-sm-8">
                <input type="text" class="form-control" name="buyerIdentifier" id="buyerIdentifier" />
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-sm-2 col-sm-offset-1">買家姓名</label>
              <div class="col-sm-8">
                <input type="text" class="form-control" name="buyerName" id="buyerName" />
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-sm-2 col-sm-offset-1">買家地址</label>
              <div class="col-sm-8">
                <input type="text" class="form-control" name="buyerAddress" id="buyerAddress" />
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-sm-2 col-sm-offset-1">買家電話</label>
              <div class="col-sm-8">
                <input type="text" class="form-control" name="buyerTelephoneNumber" id="buyerTelephoneNumber" />
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-sm-2 col-sm-offset-1">郵箱</label>
              <div class="col-sm-8">
                <input type="email" class="form-control" name="buyerEmailAddress" id="buyerEmailAddress" />
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-sm-2 col-sm-offset-1">捐贈註記</label>
              <div class="col-sm-8">
                  <select class="form-control" id="donateMark">
                    <option value="0">载具</option>
                    <option value="1">捐赠</option>
                    <option value="2">纸本</option>
                  </select>
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-sm-2 col-sm-offset-1">付款方式</label>
              <div class="col-sm-8">
                <select class="form-control" id="payWay">
                  <option value="1">現金</option>
                  <option value="2">ATM</option>
                  <option value="3">信用卡</option>
                  <option value="4">超商代收</option>
                  <option value="5">其他</option>
                </select>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="form-group">
                <label for="" class="control-label col-sm-2 col-sm-offset-1">&nbsp;</label>
                <div class="col-sm-3">
                    <button type="submit"  class="btn btn-primary" id="saveInvoice">保存</button>
                </div>
                <div class="col-sm-3">
                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                </div>
            </div>
          </div>
        </div><!-- /.modal-content -->
        </form>
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
  </div>
  <script type="text/javascript">
  </script>
</body>
</html>