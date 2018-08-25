$(function(){
//判断是否登录?登录继续浏览,未登录拦截到登录页
function render(){
    setTimeout(function(){
      $.ajax({
        url:'/cart/queryCart',
        type:'get',
        dataType:'json',
        success:function(info){
          //未登录
          if(info.error===400){
            location.href = 'login.html';
            return;
          }
          console.log(info);
          //已登录,渲染页面
          var str = template('carts',{arr:info});
          $('.carts').html(str);
          //结束下拉刷新
          mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
        }
      })
    },500)
};
render();
//删除购物车内的内容事件
$('.carts').on('tap','.cart-del',function(){
  var id = $(this).parent().data('id');
  $.ajax({
    url:'/cart/deleteCart',
    data:{
      id:[id],
    },
    type:'get',
    success:function(info){
      if(info.success){
        render();
      }
    }
  })
})
//编辑购物车内的内容
$('.carts').on('tap','.cart-update',function(){
  var datas = $(this).parent()[0].dataset;
  //弹出模态框
  var str = template('update-carts',datas);
  //template默认会将回车键出来的空文本节点解析成<br>,所以需要对整个字符串做整体的替换,将\n替换成''
    str = str.replace(/\n/g,'');
  mui.confirm(str,'编辑商品',['确认','取消'],function(e){
    if(e.index===0){
      //修改购物车内容
      var id = datas.id;
      var size = $('.size span.current').text();
      var num = $('.choose-num').val();
      $.ajax({
        url:'/cart/updateCart',
        type:'post',
        data:{
          id:id,
          size:size,
          num:num,
        },
        success:function(info){
            if(info.success){
              render();
            }
        }
      })
    }
  })
  mui('.mui-numbox').numbox();
  $('body').on('click','.size span',function(){
      $(this).addClass('current').siblings().removeClass('current');
  })
})
//下拉刷新
mui.init({
  //配置pullRefresh
  pullRefresh : {
    container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
    down:{
        height:50,//可选,默认50.触发下拉刷新拖动距离,
        auto: true,//可选,默认false.首次加载自动下拉刷新一次
        contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
        contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
        contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
        callback :function(){
          render();
        }
    },
  }
});

})