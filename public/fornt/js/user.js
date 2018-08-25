$(function(){
  //查询用户信息
  $.ajax({
    url:'/user/queryUserMessage',
    type:'get',
    success:function(e){
      console.log(e);
      if(e.error===400){
        location.href = 'login.html';
      }
      var str = template('users',e);
      $('.users').html(str);
    }
  })
  //退出
  $('.logout button').click(function(){
    $.ajax({
      url:'/user/logout',
      type:'get',
      dataType:'json',
      success:function(info){
        if(info.success){
          location.href = 'login.html';
        }
      }
    })
  })
})