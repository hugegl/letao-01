$(function(){
  //封装渲染右侧分类栏的函数,会调用两次
  function renderRight(id){
    $.ajax({
      url:'/category/querySecondCategory',
      type:'get',
      data:{
        id:id,
      },
      success:function(e){
        var str = template('categorys2',e);
        $('.categorys2').html(str);
      }
   })
  };
  //一进入页面就要渲染左边的分类栏
  $.ajax({
    url:'/category/queryTopCategory',
    type:'get',
    success:function(e){
      var str = template('categorys1',e);
      $('.categorys1').html(str);
      $('.categorys1 li:nth-of-type(1)').addClass('current');
      renderRight(e.rows[0].id);
    }
  })
  
  //注册事件委托,左边的li
  $('.categorys1').on('click','a',function(){
    $('.categorys1 li').removeClass('current');
    $(this).parent().addClass('current');
    var id = $(this).data('id');
   //发送ajax请求,渲染对应页面
   renderRight(id);
  })
  //封装render函数


})