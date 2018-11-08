/**
 * 地址管理
 */
$(function () {
    // 公共
    var user_id = sessionStorage.getItem('userId');
    var log_type = 1;

    var phone_country_code = 886;
    var language = getCookie("language");
    if(language=="sc"){
        phone_country_code = 86
    }

    $("#addrTab a").click(function(e){
        e.preventDefault();
        $(this).tab("show");
        if($(this).attr("id") == "linkmapBtn") {
          log_type = 0;
        } else {
          log_type = 1;
        }
        fetchAllAddress(log_type);
      })

    /**
     * 地址列表
     */
    // var fetchAllAddress = function () {
    //     $.ajax({
    //         url: '/BeMoralOfficial/address/getAddress.do',
    //         type: 'POST',
    //         data: {
    //             userId: user_id,
    //             log_type: ''
    //         },
    //         dataType: 'JSON',
    //         success: function(data) {
    //             if (data.status == 0) {
    //                 var alist = data.data;
    //                 alist.sort(function(a, b) {
    //                     return b.ressDefault - a.ressDefault;
    //                 })
    //                 var htmlStr = '';
    //                 for (var i = 0; i < alist.length; i++) {
    //                     if (alist[i].ressDefault == 1) {
    //                         htmlStr += '<div class="addressbook-item current" data-id="' + alist[i].ressId + '">';
    //                     } else {
    //                         htmlStr += '<div class="addressbook-item" data-id="' + alist[i].ressId + '">';
    //                     }
    //                     htmlStr += '<div class="addressbook-item_name">';
    //                     htmlStr += '<p>' + alist[i].ressName + '</p>';
    //                     htmlStr += '<p>' + alist[i].ressPhoto + '</p>';
    //                     htmlStr += '</div>';
    //                     htmlStr += '<div class="addressbook-item_info">';
    //                     htmlStr += '<p>' + alist[i].ressAddress + '</p>';
    //                     htmlStr += '<p>' + alist[i].ressCounty + ', ' + alist[i].ressCity + '</p>';
    //                     htmlStr += '</div>';
    //                     htmlStr += '<div class="addressbook-item_operation">';
    //                     htmlStr += '<button class="btn bnt-address_edit" data-toggle="modal" data-target="#addressModal" data-id="' + alist[i].ressId + '">編輯地址</button>';
    //                     if (alist[i].ressDefault == 1) {
    //                         // htmlStr += '<button class="btn bnt-address_default" data-ressDefault="0">取消默認</button>';
    //                     } else {
    //                         htmlStr += '<button class="btn bnt-address_default" data-ressDefault="1">設置為默認</button>';
    //                     }
    //                     htmlStr += '</div>';
    //                     htmlStr += '<span class="addressbook-selected">';
    //                     htmlStr += '<img src="./images/address_check.png" />';
    //                     htmlStr += '</span>';
    //                     htmlStr += '<span class="addressbook-del">';
    //                     htmlStr += '<img src="./images/address-del.png" />';
    //                     htmlStr += '</span>';
    //                     htmlStr += '</div>';
    //                 }
    //                 $('#addressList').html(htmlStr);
    //             } else {
    //             }
    //         },
    //         error: function(err) {

    //         }
    //     });
    // }
    //fetchAllAddress();
    /**
     * 地址列表
     */
    var fetchAllAddress = function (log_type) {
        $.ajax({
            url: '/BeMoralOfficial/address/getAddress.do',
            type: 'POST',
            data: {
                userId: user_id,
                log_type: log_type,
            },
            dataType: 'JSON',
            success: function(data) {
                if (data.status == 0) {
                    var alist = data.data;
                    alist.sort(function(a, b) {
                        return b.ressDefault - a.ressDefault;
                    })
                    var htmlStr = '';
                    if (log_type == '1'){
                        for (var i = 0; i < alist.length; i++) {
                            if (alist[i].ressDefault == 1) {
                                htmlStr += '<div class="addressbook-item current" data-id="' + alist[i].ressId + '">';
                            } else {
                                htmlStr += '<div class="addressbook-item" data-id="' + alist[i].ressId + '">';
                            }
                            htmlStr += '<div class="addressbook-item_name">';
                            htmlStr += '<p>' + alist[i].ressName + '</p>';
                            htmlStr += '<p><span>+'+alist[i].phone_country_code +' </span>' + alist[i].ressPhoto + '</p>';
                            htmlStr += '</div>';
                            htmlStr += '<div class="addressbook-item_info">';
                            htmlStr += '<p>' + alist[i].ressAddress + '</p>';
                            htmlStr += '<p>' + alist[i].ressCounty + ', ' + alist[i].ressCity + '</p>';
                            htmlStr += '</div>';
                            htmlStr += '<div class="addressbook-item_operation">';
                            htmlStr += '<button class="btn bnt-address_edit" data-toggle="modal" data-target="#addressModal" data-id="' + alist[i].ressId + '">編輯地址</button>';
                            if (alist[i].ressDefault == 1) {
                                // htmlStr += '<button class="btn bnt-address_default" data-ressDefault="0">取消默認</button>';
                            } else {
                                htmlStr += '<button class="btn bnt-address_default" data-ressDefault="1">設置為默認</button>';
                            }
                            htmlStr += '</div>';
                            htmlStr += '<span class="addressbook-selected">';
                            htmlStr += '<img src="./images/address_check.png" />';
                            htmlStr += '</span>';
                            htmlStr += '<span class="addressbook-del">';
                            htmlStr += '<img src="./images/address-del.png" />';
                            htmlStr += '</span>';
                            htmlStr += '</div>';
                        }
                    }else{
                        for (var i = 0; i < alist.length; i++) {
                            if (alist[i].ressDefault == 1) {
                                htmlStr += '<div class="addressbook-item current" data-id="' + alist[i].ressId + '">';
                            } else {
                                htmlStr += '<div class="addressbook-item" data-id="' + alist[i].ressId + '">';
                            }
                            htmlStr += '<div class="addressbook-item_name">';
                            htmlStr += '<p>' + alist[i].ressName + '</p>';
                            htmlStr += '<p><span>+'+alist[i].phone_country_code +' </span>' + alist[i].ressPhoto + '</p>';
                            htmlStr += '</div>';
                            htmlStr += '<div class="addressbook-item_info">';
                            htmlStr += '<p class="addr-stName">'+alist[i].stName+'</p>' + 
                            '<p class="addr-stTel"><span>+'+alist[i].phone_country_code+' </span>'+alist[i].stTel+'</p>'+
                            '<p class="addr-detail">'+alist[i].stAddr+'</p>'+
                            '<p class="addr-city">'+alist[i].ressProvince+'</p>';
                            htmlStr += '</div>';
                            htmlStr += '<div class="addressbook-item_operation">';
                            // htmlStr += '<button class="btn bnt-address_edit" data-toggle="modal" data-target="#stMapModal" data-id="' + alist[i].stCode + '">门市地图</button>';
                            if (alist[i].ressDefault == 1) {
                                // htmlStr += '<button class="btn bnt-address_default" data-ressDefault="0">取消默認</button>';
                            } else {
                                htmlStr += '<button class="btn bnt-address_default" data-ressDefault="1">設置為默認</button>';
                            }
                            htmlStr += '</div>';
                            htmlStr += '<span class="addressbook-selected">';
                            htmlStr += '<img src="./images/address_check.png" />';
                            htmlStr += '</span>';
                            htmlStr += '<span class="addressbook-del">';
                            htmlStr += '<img src="./images/address-del.png" />';
                            htmlStr += '</span>';
                            htmlStr += '</div>';
                        } 
                    }

                    if (log_type == '1'){
                        $('#addrList').html(htmlStr);    
                    }else{
                        $('#linkAddrList').html(htmlStr);  
                    }                  
                } else {
                }
            },
            error: function(err) {

            }
        });
    }
    fetchAllAddress('1');
    fetchAllAddress('0');

    /**
     * 修改默认地址
     */
    var editDefaultAddress = function () {
        var _self = $(this);
        var ressId = _self.closest('.addressbook-item').data('id');
        var ressDefault = _self.data('ressdefault');
        $.ajax({
            url: '/BeMoralOfficial/address/setAddressDefault.do',
            type: 'POST',
            data: {
                userId: user_id,
                ressId: ressId,
                ressDefault: ressDefault
            },
            dataType: 'JSON',
            success: function (data) {
                if (data.status == 0) {
                    fetchAllAddress(log_type);
                }
            },
            error: function () {

            }
        });
    }
    $("#addressList").on('click', '.bnt-address_default', editDefaultAddress);
    $("#addrList").on('click', '.bnt-address_default', editDefaultAddress);
    $("#linkAddrList").on('click', '.bnt-address_default', editDefaultAddress);
    /**
     * 新增地址
     */
    $('#addrForm').validate({
        rules: {
            City: "required",
            ressName: "required",
            ressPhoto: "required",
            ressAddress: "required",
        },
        message: {
            City: "請填寫城市/區",
            ressName: "請填寫姓名",
            ressPhoto: "請填寫手機號",
            ressAddress: "請填寫詳細地址"
        },
        success: "valid",
        submitHandler: function (form) {
            $(form).ajaxSubmit(function () {
                if (commonAddressId) {
                    editAddress();
                } else {
                    createAddress();
                }
            })
        }
    });
    var createAddress = function () {
        var city = $('#addrCity').val();
        var county = $('#addrCounty').val();
        var code = $('#addrCode').val();
        var name = $('#addrName').val();
        var addrDetail = $('#addrDetail').val();
        var tel = $('#addrTel').val();
        //var phone_country_code = $('.tel-prefix-num').val();
        var addrPhone = $('#addrPhone').val();
        var addrEmail = $('#addrEmail').val();
        var addrType = $('#addrType').val();
        var addrDefault = $('#addrDefault').prop('checked');
        $.ajax({
            url: '/BeMoralOfficial/address/addAddress.do',
            type: 'POST',
            data: {
                userId: user_id,
                log_type: 1,
                ressProvince: '台灣',
                ressDeliveryCode: code,
                ressCity: city,
                ressCounty: county,
                ressName: name,
                ressAddress: addrDetail,
                phone_country_code:phone_country_code,
                ressSeatPhoto: tel,
                ressPhoto: addrPhone,
                ressEmail: addrEmail,
                ressAddressName: addrType,
                ressDefault: addrDefault ? 1 : 0
            },
            dataType: "JSON",
            success: function (data) {
                if (data.status == 0) {
                    fetchAllAddress(log_type);
                    $('#addressModal').modal('hide')
                }
            },
            error: function (data) {
            }
        })
    }
    /**
     * 編輯地址
     */
    var editAddress = function () {
        var city = $('#addrCity').val();
        var county = $('#addrCounty').val();
        var code = $('#addrCode').val();
        var name = $('#addrName').val();
        var addrDetail = $('#addrDetail').val();
        var tel = $('#addrTel').val();
        var addrPhone = $('#addrPhone').val();
        var addrEmail = $('#addrEmail').val();
        var addrType = $('#addrType').val();
        var addrDefault = $('#addrDefault').prop('checked');
        $.ajax({
            url: '/BeMoralOfficial/address/updateAddress.do',
            type: 'POST',
            data: {
                userId: user_id,
                ressId: commonAddressId,
                log_type: log_type,
                ressProvince: '台灣',
                ressDeliveryCode: code,
                ressCity: city,
                ressCounty: county,
                ressName: name,
                ressAddress: addrDetail,
                ressSeatPhoto: tel,
                ressPhoto: addrPhone,
                ressEmail: addrEmail,
                ressAddressName: addrType,
                ressDefault: addrDefault ? 1 : 0
            },
            dataType: "JSON",
            success: function (data) {
                if (data.status == 0) {
                    fetchAllAddress(log_type);
                    $('#addressModal').modal('hide')
                }
            },
            error: function (data) {
            }
        });
    }
    // modal hide時，將modal初始化
    $('#addressModal').on('hide.bs.modal', function() {
        var _self = $(this);
        _self.find('.modal-body input').val("");
        _self.find('#addrDefault').prop('checked',false);
        commonAddressId = null;
    });
    /**
     * 收貨地址詳情
     */
    // 全局收貨地址id
    var commonAddressId ;
    $("#addressModal").on('show.bs.modal', function(event) {
        var _self = $(this);
        var button = $(event.relatedTarget);
        var addressId = button.data('id')
        if (addressId) {
            _self.find('.modal-title').text('編輯地址');
            commonAddressId = addressId;
            $.ajax({
                url: '/BeMoralOfficial/address/getAddressId.do',
                type: 'POST',
                data: {
                    userId: user_id,
                    ressId: addressId
                },
                dataType: 'JSON',
                success: function(data) {
                    if(data.status == 0) {
                        var addressInfo = data.data;
                        _self.find('#addrCity').val(addressInfo.ressCity);
                        _self.find('#addrCounty').val(addressInfo.ressCounty);
                        _self.find('#addrCode').val(addressInfo.ressDeliveryCode);
                        _self.find('#addrName').val(addressInfo.ressName);
                        _self.find('#addrDetail').val(addressInfo.ressAddress);
                        _self.find('#addrTel').val(addressInfo.ressSeatPhoto);
                        _self.find('#addrPhone').val(addressInfo.ressPhoto);
                        _self.find('#addrEmail').val(addressInfo.ressEmail);
                        _self.find('#addrType').val(addressInfo.ressAddressName);
                        _self.find('.tel-prefix-num').html(addressInfo.phone_country_code);
                        _self.find('#addrDefault').prop('checked',addressInfo.ressDefault);
                    }
                },
                error: function() {
                }
            });
        } else {
            _self.find('.modal-title').text('新增收貨地址');
            _self.find('.tel-prefix-num').html(phone_country_code);
        }
    });
    /**
     * 刪除收貨地址
     */
    var deleteAddress = function() {
        var _self = $(this);
        var addressId = _self.closest('.addressbook-item').data('id');
		layer.confirm('你确定要删除该地址吗？', {
		  btn: ['确定','取消'] //按钮
		}, function(index){
			$.ajax({
				url: '/BeMoralOfficial/address/delAddress.do',
				type: 'POST',
				data: {
					userId: user_id,
					ressId: addressId
				},
				dataType: 'JSON',
				success: function(data) {
					if(data.status == 0) {
						fetchAllAddress(log_type);
					}
				},
				error: function(err) {
				}
			});
			
            layer.close(index);
		}, function(){
		  layer.msg("已取消");
		});
        
    }
    // $("#addressList").on('click', '.addressbook-del', deleteAddress);
    $("#addrList").on('click', '.addressbook-del', deleteAddress);
    $("#linkAddrList").on('click', '.addressbook-del', deleteAddress);
    /**
     * 選擇
     */
    $('.addr-home').on('click', function(){
        $(this).addClass('active');
        $('.addr-office').removeClass('active');
        $("#addrType").val($(this).html())
    })
    $('.addr-office').on('click', function(){
        $(this).addClass('active');
        $('.addr-home').removeClass('active');
        $("#addrType").val($(this).html())
    })

        /**
     * 收貨地图詳情
     */
    $("#stMapModal").on('show.bs.modal', function(event) {
        var _self = $(this);        
        var button = $(event.relatedTarget);
        var mapid = button.data('id');
        var map = 'https://map.ezship.com.tw/images/'+ mapid + '.gif';
        _self.find('#stMap').attr('src',map);
    });
})