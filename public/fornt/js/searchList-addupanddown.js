$(function () {
  //将搜索页传递过来的数据渲染到搜索结果页面的搜索框中
  var inputval = getUrl('key');
  $('.search-input').val(inputval);
var currentPage = 1;
var pageSize = 2;
  //render();
  //封装渲染函数,通过input框的值发送ajax数据,向后台拿结果,动态渲染;
  function render(callback) {
    // $('.ltm-products').html(' <div class="loading"></div>')
    var dataObj = {};
    dataObj.proName = $('.search-input').val().trim();
    dataObj.page = currentPage;
    dataObj.pageSize = pageSize;
    if( $('.searchList a.current').length>0){
      var type = $('.searchList a.current').data('type');
      var value = $('.searchList a.current').find('i').hasClass('fa-angle-down') ? 2 : 1;
      dataObj[type] = value;
    }
    setTimeout(function(){
      $.ajax({
        url: '/product/queryProduct',
        type: 'get',
        data: dataObj,
        dataType: 'json',
        success: function (e) {
          callback&&callback(e);
        }
      })
    },500)
  }
  //注册点击事件动态获取结果页
  $('.search-btn').click(function () {
    var inputVal = $('.search-input').val();
    mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
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
  $('.searchList').on('tap', 'a[data-type]', function () {
    if ($(this).hasClass('current')) {
      $(this).find('i').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
    } else {
      $(this).addClass('current').parent().siblings().find('a').removeClass('current');
    }
    mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
  })





  //优化下拉刷新,上拉加载
  mui.init({
    //配置pullRefresh
    pullRefresh : {
      container:".mui-scroll-wrapper",//下拉刷新容器标识
      down:{
        auto: true,
        callback :function(){
          currentPage = 1;
            render(function(e){
              var str = template('result-list', e);
              $('.ltm-products').html(str);
              mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
              mui('.mui-scroll-wrapper').pullRefresh().refresh(true);
            })
      }
      },
      //上拉加载;
      up:{
        contentdown : "上拉克加载",
        callback :function(){
          currentPage++;
          render(function(e){
            var str = template('result-list', e);
            $('.ltm-products').append(str);
            var flage =  e.data.length === 0 ? true:false;
            mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(flage);
          })
        }
      }
    }
  });
  //点击购买功能
  $('.ltm-products').on('click','.buy',function(){
    var id = $(this).data('id');
    location.href = 'product.html?productId='+id;
  })
})