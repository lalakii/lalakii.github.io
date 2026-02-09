if (location.hostname.indexOf("lalaki.cn") == -1) {
  location.href = "https://lalaki.cn/fw/";
}
let oldSubBtn = document.querySelector(".mysub");
oldSubBtn.onclick = (e) => {
  if (e.target.getAttribute("type") != "submit") {
    alert(
      "请耐心等待页面加载完成... 如果长时间看见此提示，请刷新页面或开启网络代理再访问此页面",
    );
  }
};
window.onload = () => {
  moment.locale("zh-cn");
  let releaseDate = document
    .querySelector("#bios_name")
    .innerHTML.split("MC-")[1]
    .substring(0, 10);
  document.querySelector("#release_date").innerHTML = moment(
    `${releaseDate} 10:29:12`,
  ).fromNow();
  let acceptCbx = document.querySelector("#accept");
  let subBtn = document.querySelector(".mysub");
  acceptCbx.onchange = () => {
    subBtn.className = `mysub btn ${
      acceptCbx.checked ? "btn-success" : "btn-secondary"
    }`;
  };
  subBtn.className = `mysub btn ${
    acceptCbx.checked ? "btn-success" : "btn-secondary"
  }`;
  subBtn.setAttribute("type", "submit");
};
