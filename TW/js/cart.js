$(function(){
  /**
   * 公共
   */
  var user_id = sessionStorage.getItem('userId')
  console.log(user_id)
  /**
   * all check
   */
  $('.all-check').on('click',function(){
    var checked = $(this).prop('checked')
    $('.all-check').prop('checked', checked)
    $('.single-check').prop('checked', checked)
    calculateTotal();
  })
  $('.cart-bd').on('click', '.single-check',function(){
    if($('.single-check:checked').length < $('.single-check').length) {
      $('.all-check').prop('checked', false);
    }
    calculateTotal();
  })
  /**
   * 獲取數量
   */
  var getCartTotalNum = function() {
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
        } else {
        }
      },
      error: function() {

      }
    })
  }
  /**
   * 计算价格
   */
  function calculateTotal() {
    var tr = $('.cart-bd tbody').find('tr')
    var sum = 0;
    var num = 0;
    tr.each(function(index, val) {
      var input = $(val).find('input[type=checkbox]')
      if (input.prop('checked')) {
        var proNum = $(val).find('.cart-pro_num').html();
        var proPrice = $(val).find('.pro-price').html();
        sum += (proNum * proPrice);
        num += 1;
      }
    });
    $('.cart-subtotal').html('NT$ ' + sum);
    $('.cart-total').html('NT$ ' + sum);
    $('.cart-total_num span').html(num);
  }
  function calculateMobileTotal() {
    var pro = $(".mcart-list").find('.mcart-item');
    var sum = 0;
    pro.each(function(index, val){
      var proNum = $(val).find('.mcart-num').val();
      var proPrice = $(val).find('.mcart-single-price').html();
      sum += (proNum * proPrice);
    })
    $("#mcartTotal").html(sum);
    $('#mActualTotal').html(sum)
  }
  /**
   * 数量改变
   */
  $('.cart-bd').on('click','.cart-minus', function(){
    var product = $(this).parent().find('.cart-pro_num');
    var price = $(this).closest('tr').find('.pro-price');
    var subTotal = $(this).closest('tr').find('.subtotal-price');
    var id = $(this).closest('tr').data('id');
    if ($(this).parent().hasClass('cart-disabled')) {
      return
    }
    var val = product.text();
    if(val > 1) {
      var num1 = parseInt(val) - 1
      product.html(num1);
      subTotal.html((price.text() * num1))
      updateProNum(id, num1)
    }
  })
  $('.cart-bd').on('click','.cart-plus', function(){
    var product = $(this).parent().find('.cart-pro_num');
    var price = $(this).closest('tr').find('.pro-price');
    var subTotal = $(this).closest('tr').find('.subtotal-price');
    var id = $(this).closest('tr').data('id');
    if ($(this).parent().hasClass('cart-disabled')) {
      return
    }
    var val = product.text();
    if(val < 999) {
      var num2 = parseInt(val) + 1
      product.html(num2);
      subTotal.html((price.text() * num2))
      updateProNum(id, num2)
    }    
  })
  /**
   * 更新商品数量
   */
  var updateProNum = function(id, num){
    $.ajax({
      url: '/BeMoralOfficial/cart/updateCartNum.do',
      type: 'POST',
      data: {
        userId: user_id || "",
        cId: id,
        cNum: num
      },
      dataType: 'JSON',
      success: function(data) {
        if(data.status == 0) {
          calculateTotal()
          getCartTotalNum()
        } else {
          
        }
      },
      error: function() {

      }
    })
  }
  /**
   * 购物车商品列表
   */
  var cartList = [];
  var getCartList = function() {
    $.ajax({
      url: '/BeMoralOfficial/cart/getCartAll.do',
      type: 'POST',
      data: {
        userId: user_id || ""
      },
      dataType: 'JSON',
      success: function(data) {
        if(data.status == 0) {
          var htmlStr = '';
          var mhtml = '';
          var clist = data.data;
          cartList = data.data;
          for (var i = 0; i< clist.length; i++) {
            htmlStr += '<tr data-id="'+clist[i].cId+'" data-item="'+clist[i]+'"><td>';
            htmlStr += '<input type="checkbox" class="single-check" checked />';
            htmlStr += '</td>';
            htmlStr += '<td>';
            htmlStr += '<a href="product_details.html?id='+clist[i].cId+'&preview=2&language=tc"><img class="cart-pro-img" src="'+clist[i].trade_photo1+'" /></a>';
            htmlStr += '</td>';
            htmlStr += '<td>';
            htmlStr += '<p class="cart-pro_name"><a href="product_details.html?id='+clist[i].cId+'&preview=2&language=tc">' + clist[i].cName + '</a></p>';
            htmlStr += '<p class="cart-pro_sku">' + clist[i].cStandard + '</p>';
            htmlStr += '</td>';
            htmlStr += '<td>';
            htmlStr += '<p class="cart-pro_price">NT$ <span class="pro-price">'+ clist[i].cPrice +'</span></p>';
            htmlStr += '</td>';
            htmlStr += '<td>';
            htmlStr += '<div class="cart-cal clearfix">'+
                       '<a class="cart-minus">'+
                       '<img src="./images/num_minus_bg.png" />'+
                       '</a>' +
                       '<div class="cart-pro_num">'+clist[i].cNum+'</div>'+
                       '<a class="cart-plus">'+
                       '<img src="./images/cart-plus.png" />'+
                       '</a>'+
                       '</div></td>';
            htmlStr += '<td>';
            htmlStr += '<p class="cart-actual_price">NT$ <span class="subtotal-price">'+(clist[i].cNum * clist[i].cPrice)+'</span></p>';
            htmlStr += '</td>';
            htmlStr += '<td>' +
                       '<p class="cart-control">'+
                       '<a class="cart-remove" data-id="'+clist[i].cId+'">刪除</a>'+
                       '</p>'+
                       '<p class="cart-control">'+
                       '<a class="cart-collect active" data-id="'+clist[i].cId+'">加入收藏夾</a>'+
                       '</p></td><tr>';
            
          }
          for (var i = 0; i< clist.length; i++) {
            mhtml += '<div class="mcart-item clearfix" data-id="'+clist[i].cId+'">'+
                     '<div class="mcart-item-img">'+
                      '<img src="'+clist[i].trade_photo1+'" alt="" />'+
                     '</div>'+
                     '<div class="mcart-item-info">'+
                      '<p class="mcart-pro-name">'+clist[i].cName+'</p>'+
                      '<p class="mcart-pro-sku">'+clist[i].cStandard+'</p>'+
                        '<div class="mcart-pro-price clearfix">'+
                        '<span>NT$ <em class="mcart-single-price">'+clist[i].cPrice+'</em></span>'+
                        '<select class="form-control mcart-num">';
            for (var j = clist[i].cNum; j >= 1; j--) {
              mhtml += '<option value="'+j+'">'+j+'</option>';
            }
              mhtml += '</select>'+
                      '</div>'+
                      '</div>'+
                    '</div>';
          }
          $(".mcart-list").html(mhtml)
          $('.cart-bd tbody').html(htmlStr);
          calculateTotal();
          calculateMobileTotal();
        } else {

        }
      },
      error: function() {

      }
    })
  }
  getCartList()
  /**
   * 删除购物车商品 全部
   */
  var currentProduct = 0;
  function removeProduct(listid) {
    if(currentProduct >= listid.length) {
      getCartTotalNum();
      return
    }
    $('.cart-bd tbody tr[data-id="'+listid[currentProduct]+'"]').remove();
    $.ajax({
      url: '/BeMoralOfficial/cart/delCart.do',
      type: 'POST',
      data: {
        userId: user_id || "",
        cId: listid[currentProduct]
      },
      dataType: 'JSON',
      success: function(data) {
        if(data.status == 0) {
          currentProduct++;
          removeProduct(listid);
          calculateTotal();
        } else {
          alert(data.msg)
        }
      },
      error: function(){
        
      }
    })
    
  }
  $('.cart-allremove').on('click', function(){
    var tr = $('.cart-bd tbody').find('tr')
    var list_id = [];
    tr.each(function(index, val) {
      var input = $(val).find('input[type=checkbox]')
      if (input.prop('checked')) {
        list_id.push($(val).data("id"));
      }
    });
    if(!list_id.length) {
      alert('請選擇要移除的商品');
      return
    }
    removeProduct(list_id);
  })
  /**
   * 删除单个商品
   */
  $('.cart-bd').on('click','.cart-remove', function(){
    var pro_id = $(this).data('id');
    var that = $(this).parents('tr')
    that.remove()
    $.ajax({
      url: '/BeMoralOfficial/cart/delCart.do',
      type: 'POST',
      data: {
        userId: user_id || "",
        cId: pro_id
      },
      dataType: 'JSON',
      success: function(data) {
        if(data.status == 0) {
          that.remove()
          calculateTotal();
          getCartTotalNum();
        } else {
          
        }
      },
      error: function(){
        
      }
    })
  })
  $('.cart-bd').on('click','.cart-collect', function(){
    var $this = $(this);
    var pro_id = $(this).data('id');
    var that = $(this).parents('tr')
    if($(this).hasClass('active')) {
      $.ajax({
        url: '/BeMoralOfficial/favorite/addFavoriteAll.do',
        type: 'POST',
        data: {
          userId: user_id || "",
          cId: pro_id
        },
        dataType: 'JSON',
        success: function(data) {
          if(data.status == 0) {
            $this.removeClass('active');
            $this.html('取消收藏');
            alert('收藏成功')
          } else {
            $this.removeClass('active');
            $this.html('取消收藏');
            alert(data.msg);
          }
        },
        error: function(){
          
        }
      })
    } else {
      $.ajax({
        url: '/BeMoralOfficial/favorite/delFavorite.do',
        type: 'POST',
        data: {
          userId: user_id || "",
          cId: pro_id
        },
        dataType: 'JSON',
        success: function(data) {
          $this.addClass('active');
          $this.html('加入收藏夾');
          if(data.status == 0) {
            
            alert('取消收藏成功')
          } else {
            alert(data.msg)
          }
        },
        error: function(){
          
        }
      })
      
    }
  })
  /**
   * 買單
   */
  $('#checkout').on('click', function(e) {
    var checkList = [];
    var checked = $('.cart-bd tbody').find('input[type=checkbox]:checked');
    if(!checked.length) {
      alert('請選擇要購買的商品')
      return
    }
    var checkedTr = $('.cart-bd tbody').find('input[type=checkbox]:checked').closest('tr');
    checkedTr.each(function(index, val) {
      var id = $(val).data("id");
      var filterResult = cartList.filter(function(item) {
        return item.cId == id
      })
      // checkList.concat()
      checkList = checkList.concat(filterResult)
    });
    localStorage.setItem('checkedList', JSON.stringify(checkList));
    if (!user_id) {
      alert('未登錄')
      return
    }
    window.location.href='order_first.jsp';
  })
  /**
   * 刷新購物車
   */
  $('#refreshCart').on('click', function(){
    getCartList();
  })
  /**
   * 收藏全部
   */
  var currentIndex = 0;
  function collectProduct(items){
    if(currentIndex >= items.length) {
      var checkedTr = $('.cart-bd tbody').find('input[type=checkbox]:checked').closest('tr');
      checkedTr.each(function(index, val) {
        $(val).find('.cart-collect').html('取消收藏')
      });
      alert('收藏成功')
      return
    }
    $.ajax({
      url: '/BeMoralOfficial/favorite/addFavoriteAll.do',
      type: 'POST',
      data: {
        userId: user_id || "",
        cId: items[currentIndex]
      },
      dataType: 'JSON',
      success: function(data) {
        if(data.status == 0) {
          currentIndex++;
          collectProduct(items);
        } else {
          alert(data.msg)
        }
      },
      error: function(){
        
      }
    })
  }
  $('.cart-allwish').on('click', function(){
    var checkList = [];
    var checked = $('.cart-bd tbody').find('input[type=checkbox]:checked');
    if(!checked.length) {
      alert('請選擇要收藏的商品')
      return
    }
    var checkedTr = $('.cart-bd tbody').find('input[type=checkbox]:checked').closest('tr');
    checkedTr.each(function(index, val) {
      var id = $(val).data("id");
      checkList.push(id)
    });
    collectProduct(checkList)
  })
  /**
   * mobile
   */
  $('#mcheckout').on('click', function(){
    var checkList = [];
    var checked = $('.mcart-list').find('.mcart-item');
    if(!checked.length) {
      alert('請選擇要購買的商品')
      return
    }
    // checked.each(function(index, val) {
    //   var id = $(val).data("id");
    //   var filterResult = cartList.filter(function(item) {
    //     return item.cId == id
    //   })
    //   // checkList.concat()
    //   checkList = checkList.concat(filterResult)
    // });
    localStorage.setItem('checkedList', JSON.stringify(cartList));
    if (!user_id) {
      alert('未登錄')
      return
    }
    window.location.href='order_first.jsp';
  })
})