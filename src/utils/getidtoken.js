/**
 * Created by 40249 on 2018/5/11.
 */
/**
 * Created by 40249 on 2018/5/3.
 */
export const getUrlEnd = function () {
  var id = parseInt(getCookie("id"))
  var token = encodeURIComponent(getCookie("token"))
  var end = '?id=' + id + '&token=' + token
  console.log('end:' + end)
  return end
}
export const getIdByCookie = function(){
  return parseInt(getCookie("id"))
}

//获取cookie、
export function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return (arr[2]);
  else
    return null;
}

//设置cookie,增加到vue实例方便全局调用
export function setCookie (c_name, value, expiredays) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
};

//删除cookie
export function delCookie (name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null)
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
};
