$(function(){
  //定义全局变量,当前页数,获取条数
  var currentPage = 1;
  var pageSize = 5;
  //封装渲染函数,一进入页面就开始渲染
  function render(){
    $.ajax({
      url:'/category/queryTopCategoryPaging',
      type:'get',
      data:{
        page:currentPage,
        pageSize:pageSize,
      },
      success:function(e){
        // console.log(e);
        var str = template('firsttbody',e);
        $('.firsttbody').html(str);
        //分页器
        $('.paginator').bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:e.page,
          totalPages:Math.ceil(e.total/e.size),
          onPageClicked:function(a,b,c,page){
            currentPage = page;
            render(currentPage);
            }
        });
      }
    })
  }
  render();//一进入页面就渲染
  //点击添加按钮,模态框出现
  $('.addfirst').click(function(){
    $('#first-modal').modal('show');
  })
  //表单校验Validator初始化
  $('#addform').bootstrapValidator({
    //配置字提示图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //配置字段
    fields:{
      categoryName:{
        validators:{          
          notEmpty:{
            message:'第一级分类不能为空',
          }
        }
      }
    }
  })
  //实例表单校验对象
 $('#addform').on('success.form.bv',function(e){
     e.preventDefault();
     $.ajax({
       url:'/category/addTopCategory',
       type:'post',
       data:$('#addform').serialize(),
       success:function(){
         render();
         $('#first-modal').modal('hide');
         $('#addform').data('bootstrapValidator').resetForm(true);
       }
     })
  }) 

})