$(function(){
//拿到传过来的id
var productId =  getUrl('productId');
  //封装渲染函数
  function render(){
    $.ajax({
      url:'/product/queryProductDetail',
      data:{
        id:productId,
      },
      dataType:'json',
      success:function(info){
        console.log(info);
        var str = template('products',info);
        $('.products').html(str);
        //轮播图初始化
        var gallery = mui('.mui-slider');
        gallery.slider({
          interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
        });
        //数字框初始化
        mui('.mui-numbox').numbox();
      }
    })
  };
  render();
  //尺码选中效果
  $('.products').on('click','.size span',function(){
    $(this).addClass('current').siblings().removeClass('current');
  })
  //加入购物车效果
  $('.add-cart').on('click',function(){
    //判断是否选择尺码
    var size = $('.size span.current').text();
    var num = $('.choose-num').val();
    if(!size){
      mui.toast('请选择尺码');
      return;
    }
    $.ajax({
      url:'/cart/addCart',
      type:'post',
      data:{
        productId:productId,
        num:num,
        size:size,
      },
      success:function(info){
        if(info.error === 400){
          location.href = 'login.html?retUrl='+location.href;
        }
          if(info.success){
            mui.confirm('温馨提示','添加成功',['去购物车','继续浏览'],function(e){
              if(e.index===0){
                location.href = 'cart.html';
              }
            })
          }
      }
    })

  })
})