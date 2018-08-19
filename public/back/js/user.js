$(function () {
  //申明全局变量储存当前页和获取页面的量
  var currentPage = 1;
  var pageSize = 5;
  //封装渲染函数
  function render() {
    $.ajax({
      url:'/user/queryUser',
      type:'get',
      data:{
        page:currentPage,
        pageSize:pageSize,
      },
      success:function(e){
        //console.log(e);
        var str = template('tbodys',e);
        $('.usertbody').html(str);
        //分页插件
        $('.paginator').bootstrapPaginator({     
          bootstrapMajorVersion:3,//指定bootstrap版本
          totalPages:Math.ceil(e.total/e.size),//指定总页数
          currentPage:e.page,//指定当前页
          //给所有的按钮添加页码点击事件
          onPageClicked:function(a,b,c,page){
            currentPage = page;
            render(currentPage);
          }
      })
      }
    })
  }
  render();
  //申明变量储存id和用户状态
  var id ;
  var isDelete;
  //注册禁用和正常点击事件
  $('.usertbody').on('click','.btn',function(){
    id = $(this).parent().data('id');
    isDelete = $(this).hasClass('btn-danger')?0:1;
    //console.log(id+'-----'+isDelete);
    //模态框显示
    $('#user-modal').modal('show');
  })
  $('.usersure').click(function(){
    //console.log(666);
    $.ajax({
      url:'/user/updateUser',
      type:'post',
      data:{
        id:id,
        isDelete:isDelete,
      },
      success:function(){
        $('#user-modal').modal('hide');
        render();
      }
    })
  })
  

})