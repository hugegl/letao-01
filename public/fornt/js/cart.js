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
    }
  })
})