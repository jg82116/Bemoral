/**
 * 收藏
 */
$(function(){
    var userId = sessionStorage.getItem('userId');
    if(!userId) {
        window.location.href='index.html'
    }
    var result; // 數據列表
    var fetchList = function() {
        $.ajax({
            url: '/BeMoralOfficial/favorite/getFavoriteAll.do',
            type: 'POST',
            data: {
                userId: userId
            },
            dataType: 'JSON',
            success: function(data) {
				console.log(data);
                if(data.status == 0) {
                    var htmlStr = '';
                    result = data.data
                    $('#allwish').html(result.length);
                    for(var i = 0;i< result.length; i++) {
                        htmlStr += '<div class="wishlist-item" data-index="'+i+'">'+
                                    '<span class="wishlist-del"><img src="./images/del.png" alt="" /></span>'+
                                    '<div class="wishlist-item_img">'+
                                        '<a href="product_details.html?id='+result[i].id+'&preview=2&language=tc"><img src="'+result[i].trade_photo1+'" alt=""></a>'+
                                    '</div>'+
                                    '<div class="wishlist-item_bd">'+
                                    '<p class="wishlist-item_name"><a href="product_details.html?id='+result[i].id+'&preview=2&language=tc">'+result[i].title+'</a></p>'+
                                    '<p class="wishlist-item_sku">'+result[i].standard+'</p>'+
                                    '<div class="wishlist-item_rate clearfix">'+
                                    '<div class="wishlist-star">'+
                                    '<img src="./images/star.png" alt="">'+
                                    '<img src="./images/star.png" alt="">'+
                                    '<img src="./images/star.png" alt="">'+
                                    '<img src="./images/star.png" alt="">'+
                                    '<img src="./images/half_star.png" alt="">'+
                                    '</div>'+
                                    '<span>4.5 / 5</span>'+
                                    '</div>'+
                                    '<p class="wishlist-item_price">NT$'+result[i].original_price+'</p>'+
                                '</div>'+
                                '<div class="wishlist-item_ft clearfix">';
                        if (result[i].store_num == 0) {
                            htmlStr += '<button class="btn btn-soldout">商品售罄</button>';
                        } else {
                            htmlStr += '<button class="btn btn-similar">相似商品</button>'+
                                '<button class="btn btn-addbag">加入購物車</button>';
                        }
                        htmlStr+='</div>'+
                            '</div>';
                    }
                    $('.tab-pane.active').find('.wishlist').html(htmlStr);
                }
            },
            error: function(err) {
            }
        })
    }
    fetchList();
    /**
     * 添加購物車
     */
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
            } else {
            }
          },
          error: function() {
      
          }
        })
      }
      $('.wishlist').on('click', '.btn-addbag',function(){
        var pro_num = 1;
        var index = $(this).closest('.wishlist-item').data('index')
        var pro_id = result[index].id;
        var cName = result[index].title;
        var pro_price = result[index].original_price;
        var stock_num = result[index].store_num;
        var pull_num = result[index].pull_num;
        var pro_sku = result[index].standard;
        var pro_photo = result[index].trade_photo1;
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
          },
          error: function(data) {

          }
        })
      })
      /**
       * 刪除
       */
      $('.wishlist').on('click', '.wishlist-del', function(){
          var index = $(this).closest('.wishlist-item').data('index');
          $.ajax({
            url: '/BeMoralOfficial/favorite/delFavorite.do',
            type: 'POST',
            data: {
                userId: userId || "",
                cId: result[index].id
            },
            dataType: 'JSON',
            success: function(data) {
                if (data.status == 0) {
                fetchList();
                alert('取消收藏成功');
                }
            },
            error: function(data) {
                
            }
          })
      })
})