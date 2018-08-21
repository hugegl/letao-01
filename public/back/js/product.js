$(function(){
  //申明全局变量,存储当前页数和获取页数
  var currentPage = 1;
  var pageSize = 2;
  //封装渲染函数
  function render(){
    $.ajax({
      url:'/product/queryProductDetailList',
      type:'get',
      data:{
        page:currentPage,
        pageSize:pageSize,
      },
      success:function(e){
        // console.log(e);
        var str = template('productTbody',e);
        $('.productTbody').html(str);
        //初始化分页器
        $('.paginator').bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:e.page,
          totalPages:Math.ceil(e.total/e.size),
          onPageClicked:function(a,b,c,page){
            currentPage = page;
            render();
          },
          itemTexts:function(type,page,current){
            switch(type){
              case 'page':return page;
              case 'next':return '下一页';
              case 'last':return '尾页';
              case 'prev'  :return '上一页';       
              case 'first'  :return '首页';       
            }
          },
          tooltipTitles:function(type,page,current){
            switch(type){
              case 'page':return '前往第'+page+'页';
              case 'next':return '前往下一页';
              case 'last':return '前往尾页';
              case 'prev'  :return '前往上一页';       
              case 'first'  :return '前往首页';       
            }
          },
          useBootstrapTooltip:true,
        })
      }
    })
  };
  //一进入页面就渲染
  render();
  //点击添加商品按钮功能
  $('.addProduct').click(function(){
    //模态框显示
    $('#product-modal').modal('show');
    //动态发送ajax,渲染模态框内的下拉菜单
    $.ajax({
      url:'/category/querySecondCategoryPaging',
      type:'get',
      data:{
        page:1,
        pageSize:100,
      },
      success:function(e){
        // console.log(e);
        var str = template('seconds',e);
        $('.dropdown-menu').html(str);
      }
    })
  })
  //上传图片初始化实例,动态渲染页面
  var fileArr = [];
  $('#file').fileupload({
    dataType:'json',
    done:function(e,data){
      fileArr.unshift(data.result);
      // console.log(data);
      // console.log(fileArr);
      var imgstr = '<img src="'+data.result.picAddr+'"width="100px">';
      $('.imgBox').prepend(imgstr);
      if(fileArr.length>3){
        //删除第一个追加进数组的元素
        fileArr.pop();
        //删除第一个图片
        $('.imgBox img').eq(-1).remove();
      }
      //表单校验图片部分更改后手动改状态
      if(fileArr.length===3){
        $('#addform').data('bootstrapValidator').updateStatus('imgStatus','VALID')
      };
    }
  })
  //表单校验
  $('#addform').bootstrapValidator({
    //校验隐藏元素
    excluded:[],
    //校验图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh',
    },
    //配置校验字段
    fields:{
      brandId:{
        validators:{
          notEmpty:{
            message:'归属品牌不能为空',
          }
        }
      },
      proName:{
        validators:{
          notEmpty:{
            message:'产品名称不能为空',
          }
        }
      },
      oldPrice:{
        validators:{
          notEmpty:{
            message:'原价格不能为空',
          }
        }
      },
      price:{
        validators:{
          notEmpty:{
            message:'价格不能为空',
          }
        }
      },
      proDesc:{
        validators:{
          notEmpty:{
            message:'产品描述不能为空',
          }
        }
      },
      size:{
        validators:{
          notEmpty:{
            message:'产品尺寸不能为空',
          },
          regexp:{
            regexp:/^\d{2}-\d{2}$/,
            message:'必须是以XX-XX的形式的数字,如32-45',
          }
        }
      },
      num:{
        validators:{
          notEmpty:{
            message:'产品库存不能为空',
          },
          regexp:{
            regexp:/^[1-9]\d*$/,
            message:'库存必须是非零开始的数字',
          }
        }
      },
      imgStatus:{
        validators:{
          notEmpty:{
            message:'请上传3张图片',
          }
        }
      }
    }
  })
  //表单校验隐藏域部分更改后手动改状态
  $('.dropdown-menu').on('click','a',function(){
    var str = $(this).text();
    $('.chooseSecond').html(str);
    var id = $(this).data('id');
    $('[name="brandId"]').val(id);
    $('#addform').data('bootstrapValidator').updateStatus('brandId','VALID');
  });
  //拼接参数字符串serialize
  //监听表单验证成功事件,阻止默认跳转,发送ajax请求到后台
  $('#addform').on('success.form.bv',function(e){
    //阻止默认行为,默认页面跳转
    e.preventDefault();
    //需要将图片名称和地址手动拼接一下
    var formStr = $('#addform').serialize();
    formStr += '&picAddr1='+fileArr[0].picAddr+'&picName1='+fileArr[0].picName;
    formStr += '&picAddr2='+fileArr[1].picAddr+'&picName2='+fileArr[1].picName;
    formStr += '&picAddr3='+fileArr[2].picAddr+'&picName3='+fileArr[2].picName;
    //发送ajax请求
    $.ajax({
      url:'/product/addProduct',
      type:'post',
      data:formStr,
      success:function(e){
        if(e.success){
          currentPage = 1;
          render();
          //重置表格
          $('#addform').data('bootstrapValidator').resetForm(true);
          //手动重置选择二级分类
          $('.dropdown-menu').html('请选择二级分类');
          //手动清空图片
          $('.imgBox img').remove();
          //关闭模态框
          $('#product-modal').modal('hide');
        }
      }
    })
  })
  
})
