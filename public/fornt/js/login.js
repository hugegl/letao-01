$(function(){
  $('#login').on('click',function(){
    var username = $('#username').val().trim();
    var password = $('#password').val().trim();
    if(username===''){
      mui.toast('用户名不能为空');
      return;
    }
    if(password===''){
      mui.toast('密码');
      return;
    }
    $.ajax({
      url:'/user/login',
      type:'post',
      data:{
        username:username,
        password:password,
      },
      dataType:'json',
      success:function(e){
        if(e.error===403){
          mui.toast('用户名或密码错误');
          return
        }
        if(e.success){
          if(location.search.indexOf('?retUrl') > -1){
          location.href = location.search.replace('?retUrl=','');            
          }else{
            location.href = 'user.html';
          }
        }
      }
    })
  })
})