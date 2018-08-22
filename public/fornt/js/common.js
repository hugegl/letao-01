
  mui('.mui-scroll-wrapper').scroll({
    deceleration:0.005,//阻尼系数,值越小越灵敏
      scrollY:true,//滚动方向Y
      indicators:false,//是否显示滚动条;
  });
  var gallery = mui('.mui-slider');
    gallery.slider({
    interval: 1000 //自动轮播周期，若为0则不自动播放，默认为0；
    });
//封装用于解析地址栏参数的函数;
function getUrl(k){
  var str = decodeURI(location.search);
  str = str.slice(1);
  var arr = str.split('&');
  var obj = {};
  arr.forEach(function(v,i){
    var key = v.split('=')[0];
    var value = v.split('=')[1];
    obj[key]=value;
  })
  return obj[k];
}