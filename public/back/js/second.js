$(function () {
  //定义全局变量
  var currentPage = 1;
  var pageSize = 5;
  //封装渲染函数
  function render() {
    $.ajax({
      url: '/category/querySecondCategoryPaging',
      type: 'get',
      data: {
        page: currentPage,
        pageSize: pageSize,
      },
      success: function (e) {
        // console.log(e);
        var str = template('secondtbody', e);
        $('.secondtbody').html(str);
        //分页器
        $('.paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: e.page,
          totalPages: Math.ceil(e.total / e.size),
          onPageClicked: function (a, b, c, page) {
            currentPage = page;
            render(currentPage);
          }
        })
      }
    })
  }
  render();
  //一进入页面就开始渲染
  //添加按钮功能实现
  $('.addsecond').click(function(){
    $('#second-modal').modal('show');
    //发送ajax请求,动态渲染分类项
    $.ajax({
      url:'/category/queryTopCategoryPaging',
      type:'get',
      data:{
        page:1,
        pageSize:100,
      },
      success:function(e){
        // console.log(e);
        var str = template('second-lis',e);
        $('.dropdown-menu').html(str);
      }
    })
  })
  //选择一级分类后动态渲染到页面上
  $('.dropdown-menu').on('click','a',function(){
    var str = $(this).text();
    $('.choosefirst').html(str);
  })
})