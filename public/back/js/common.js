$(function () {
  //进度条插件NProgress.方法名
  $(document).ajaxStart(function () {
    NProgress.start();
  })
  $(document).ajaxStop(function () {
    NProgress.done();
  })
  //登录拦截
  if(location.href.indexOf('login.html')===-1){
    $.ajax({
      url: '/employee/checkRootLogin',
      style: 'get',
      success: function (e) {
        if (e.success === true) { }
        if (e.error === 400) {
          location.href = 'login.html';
        }
      }
    })
  }
  //弹出模态框
  $('.logout').click(function () {
    $('#lt-modal').modal('show')
    return false;
  })
  //左边导航栏隐藏
  $('.bsideHidden').click(function () {
    $('.lt-bside').toggleClass('hiddenmenu');
    $('.lt-right').toggleClass('hiddenmenu');
    return false;
  })
  //分类效果显示
  $('.category').click(function () {
    $('.lists .child').stop().slideToggle();
    return false;
  })
  //退出发送ajax请求
  $('.logout-sure').click(function(){  
    $.ajax({
      url:'/employee/employeeLogout',
      type:'get',
      success:function(e){
        if(e.success===true){
          location.href = 'login.html';
        }
        return false;
      }
    })
  })
})