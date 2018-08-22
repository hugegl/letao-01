$(function () {
  //将搜索页传递过来的数据渲染到搜索结果页面的搜索框中
  var inputval = getUrl('key');
  $('.search-input').val(inputval);
  render();
  //封装渲染函数,通过input框的值发送ajax数据,向后台拿结果,动态渲染;
  function render() {
    var dataObj = {};
    dataObj.proName = $('.search-input').val();
    dataObj.page = 1;
    dataObj.pageSize = 100;
    var type = $('.searchList a.current').data('type');
    var value = $('.searchList a.current').find('i').hasClass('fa-angle-down') ? 2 : 1;
    dataObj[type] = value;
    $.ajax({
      url: '/product/queryProduct',
      type: 'get',
      data: dataObj,
      dataType: 'json',
      success: function (e) {
        var str = template('result-list', e);
        $('.ltm-products').html(str);
      }
    })
  }
  //注册点击事件动态获取结果页
  $('.search-btn').click(function () {
    var inputVal = $('.search-input').val();
    render();
    $('.search-input').val('');
    var str = localStorage.getItem('search-list');
    var arr = JSON.parse(str);
    var index = arr.indexOf(inputVal);
    if(index===-1){
        arr.unshift(inputVal);
    }else{
      arr.splice(index,1);
      arr.unshift(inputVal);
    }
    localStorage.setItem('search-list',JSON.stringify(arr));
  })
  //排序
  $('.searchList').on('click', 'a', function () {
    if ($(this).hasClass('current')) {
      $(this).find('i').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
    } else {
      $(this).addClass('current').parent().siblings().find('a').removeClass('current');
    }
    render();
  })
})