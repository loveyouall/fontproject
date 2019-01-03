// 获取cookie、
export function getCookie (Name) {
  var search = Name + '='
  // 查询检索的值
  var returnvalue = ''
  // 返回值
  if (document.cookie.length > 0) {
    let sd = document.cookie.indexOf(search)
    if (sd !== -1) {
      sd += search.length
      let end = document.cookie.indexOf(';', sd)
      if (end === -1) {
        end = document.cookie.length
      }
      // unescape() 函数可对通过 escape() 编码的字符串进行解码。
      returnvalue = unescape(document.cookie.substring(sd, end))
    }
  }
  return returnvalue
}
// 设置cookie,增加到vue实例方便全局调用
export function setCookie (name, value, expiredays) {
  var exdate = new Date()
  exdate.setDate(exdate.getDate() + expiredays)
  document.cookie = name + '=' + escape(value) + ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())
}
// 删除cookie
export function delCookie (name) {
  var exp = new Date()
  exp.setTime(exp.getTime() - 1)
  var cval = getCookie(name)
  if (cval != null) {
    document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
  }
}
