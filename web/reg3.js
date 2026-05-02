window.onload = function () {
  const c_pwd = document.querySelector("#pass1");
  const c_pwd_1 = document.querySelector("#pass0");
  const pwd_tip = document.querySelector(".pwd-err");
  if (c_pwd !== null && c_pwd_1 !== null && pwd_tip !== null) {
    c_pwd.oninput = () => {
      if (c_pwd.value != c_pwd_1.value.trim()) {
        pwd_tip.style.display = "inline";
      } else {
        pwd_tip.style.display = "none";
      }
    };
    c_pwd_1.oninput = () => {
      if (c_pwd.value != c_pwd_1.value.trim()) {
        pwd_tip.style.display = "inline";
      } else {
        pwd_tip.style.display = "none";
      }
    };
  }
};
function laReg(event) {
  try {
    if (window.lalaki_reg_done == true) {
      alert("请勿重复提交");
      return false;
    }
  } catch (e) {}
  const c_pwd = document.querySelector("#pass1");
  const c_pwd_1 = document.querySelector("#pass0");
  if (c_pwd.value.trim() != c_pwd_1.value) {
    alert("密码不一致");
    return false;
  }
  const c_mail = document.getElementById("email");
  if (c_mail.value.trim().length < 1) {
    alert("邮箱不能为空");
    return false;
  }
  const c_name0 = document.getElementById("name0");
  if (c_name0.value.trim().length < 1) {
    alert("用户名不能为空");
    return false;
  }
  document.getElementById("reg_msg").removeAttribute("class");
  window.lalaki_reg_done = true;
  return true;
}
