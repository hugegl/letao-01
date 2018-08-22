$(function(){
   //封装拿到存储在localStorage中的数组的函数
   function  getLocalArr(){
    var arrStr = localStorage.getItem('search-list')||'[]';
    return JSON.parse(arrStr);
  }
  //封装li的渲染方法
  function renderli(){
    var arr = getLocalArr();
    var str = template('search-list',{arr:arr});
    $('.search-list').html(str);
  }
  //一进入页面就渲染搜索历史
  renderli();
//点击搜索增加搜索历史,并且增加localStorage的数据
  $('.search-btn').click(function(){
    var key = $('.search-input').val().trim();
    if(key === ''){
      mui.toast('搜索信息不能为空');
      return;
    }
    var arr = getLocalArr();
    var index = arr.indexOf(key);
    if(index===-1){
      arr.unshift(key);
    }else{
      arr.splice(index,1);
      arr.unshift(key);
    }
    if(arr.length>10){
      arr.pop();
    }
    $('.search-input').val('');
    localStorage.setItem('search-list',JSON.stringify(arr));
    renderli();
      //页面跳转事件,动态传值
      location.href="searchList.html?key="+key;
  })
  //注册单个删除事件
  $('.search-list').on('click','.btn-delete',function(){
    var index = $(this).data('index');
    var arr = getLocalArr();
    arr.splice(index,1);
    localStorage.setItem('search-list',JSON.stringify(arr));
    renderli();
  })
  //删除全部事件
  $('.search-list').on('click','.btn-clear',function(){
   localStorage.removeItem('search-list');
   renderli();
  })
})