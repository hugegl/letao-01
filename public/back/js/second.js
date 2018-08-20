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
        console.log(e);
        var str = template('second-lis',e);
        $('.dropdown-menu').html(str);
      }
    })
  })
  //选择一级分类后动态渲染到页面上,并把id值给dropdown-toggle的value
  $('.dropdown-menu').on('click','a',function(){
    var str = $(this).text();
    $('.choosefirst').html(str);
    $('[name="categoryId"]').val($(this).data('id'));
    $('#addform').data('bootstrapValidator').updateStatus('categoryId','VALID');
  })
  //图片动态渲染,并把地址赋值给value
  $('.inputimg').fileupload({
    dataType:'json',
    done:function(e,data){
      // console.log(data);
      $('.secondsrc').attr('src',data.result.picAddr);
      $('[name="brandLogo"]').val(data.result.picAddr);
      $('#addform').data('bootstrapValidator').updateStatus('brandLogo','VALID');
    }
  })
  //表单校验初始化
  $('#addform').bootstrapValidator({
    excluded:[],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh',
    },
    fields:{
      categoryId:{
        validators:{
          notEmpty:{
            message:'一级分类不能为空',
          }
        }
      },
      brandName:{
        validators:{
          notEmpty:{
            message:'二级分类不能为空',
          }
        }
      },
      brandLogo:{
        validators:{
          notEmpty:{
            message:'图片不能为空',
          }
        }
      }
    }
  })
  //监听表单校验成功后的事件,阻止默认发送请求,手动发送ajax到后台
  $('#addform').on('success.form.bv',function(e){
    e.preventDefault();
    $.ajax({
      url:'/category/addSecondCategory',
      type:'post',
      data:$('#addform').serialize(),
      success:function(e){
        if(e.success){
          currentPage = 1;
          render(currentPage);
          $('#second-modal').modal('hide');
          $('#addform').data('bootstrapValidator').resetForm(true);
          $('.choosefirst').html('请选择一级分类');
          $('.secondsrc').attr('src','./images/default.jpg');
        }
      }
    })
  })
})