$(function(){
  //表单校验bootstrapValidator
  $('#form').bootstrapValidator({
    //指定提示图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //配置校验字段
    fields:{
      //字段名和name属性值一一对应
      username:{
        validators:{
          notEmpty:{
            message:'用户名不能为空',
          },
          stringLength:{
            min:2,
            max:6,
            message:'用户名长度必须在2-6之间',
          },
          callback:{
            message:'用户名错误',
          }
        }
      },
      password:{
        validators:{
          notEmpty:{
            message:'密码不能为空',
          },
          stringLength:{
            min:2,
            max:6,
            message:'密码必须是2-6位',
          },
          callback:{
            message:'密码错误',
          }
        }
      }
    }
  })
  //实例化表单对象
  var formObject = $('#form').data('bootstrapValidator');
  //监听表单校验事件,阻止浏览器默认行为,发送ajax请求
  $('#form').on('success.form.bv',function(e){
    e.preventDefault();
    $.ajax({
      url:'/employee/employeeLogin',
      type:'post',
      data:$('#form').serialize(),
      success:function(e){
        console.log(e);
        if(e.error===1000){
          //用户名不存在
          formObject.updateStatus('username','INVALID','callback');
        } else if( e.error === 1001){
          //密码错误
          formObject.updateStatus('password','INVALID','callback');
        } else if(e.success === true){
          //登录成功;跳转页面
          location.href = 'index.html';
        }
      }
    })
   
  })
  //重置表单//传不传true,都重置了内容和状态;
  $('[type=reset]').click(function(){
    formObject.resetForm();
  })

})