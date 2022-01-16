$(function () {
  //从layui中获取form对象
  var form = layui.form
  //通过form.verify()函数定义校验规则
  form.verify({
    //自定义了一个叫做 pwd校验规则
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    //校验两次密码是否一致的规则
    samePwd: function (value) {
      //通过形参拿到的是确认密码框中的内容
      //还需要拿到密码框中的位置
      //然后进行一次等于的判断
      //如果判断失败 ，则return 一个提示消息即可
      if (value === $('[name=oldPwd]').val()) {
        return '新旧密码不能相同！'
      }
    },
    rePwd: function (value) {
      if (value !== $('[name=newPwd]').val()) {
        return '两次密码不一致!'
      }
    }
  })
  $('.layui-form').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/updatepwd',
      data: $(this).serialize(),
      success: function (res) {
        console.log(res);

        if (res.status !== 0) {
          return layui.layer.msg('更新密码失败！')
        }
        layui.layer.msg('更新密码成功！')
        //重置表单
        $('.layui-form')[0].reset()
      }
    })
  })
})