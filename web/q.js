function stringToUTF8(str) {
  const encoder = new TextEncoder();
  const uint8Array = encoder.encode(str);
  let utf8String = "";
  for (let i = 0; i < uint8Array.length; i++) {
    utf8String += String.fromCharCode(uint8Array[i]);
  }
  return utf8String;
}
const btnGenerate = document.getElementById("btn_generate");
const btnDownload = document.getElementById("btn_download");
const qrContainer = document.getElementById("qr_container");
const inputContent = document.getElementById("input_content");
const pwdContent = document.getElementById("wifi_password");
const selectType = document.getElementById("select_type");
const wifiEncType = document.getElementById("enc_type");
const btnReset = document.getElementById("btn_reset");
const nonTips = document.getElementById("qr_non_tips");
const qrcodeView = document.getElementById("qr_code");
const wifiField = document.getElementById("wifi_fields");
const wifiPassGroup = document.getElementById("wifi-pass-group");
const vCardGroup = document.getElementById("vcard-group");
const vCardRadio = document.getElementById("vcard-radio");
wifiEncType.addEventListener("change", function () {
  const value = this.value;
  if (value == "0") {
    wifiPassGroup.setAttribute("hidden", "hidden");
  } else {
    if (wifiPassGroup.hasAttribute("hidden")) {
      wifiPassGroup.removeAttribute("hidden");
    }
  }
});
selectType.addEventListener("change", function () {
  const value = this.value;
  switch (value) {
    case "0":
      vCardGroup.setAttribute("hidden", "hidden");
      inputContent.setAttribute("placeholder", window.lang9);
      wifiField.setAttribute("hidden", "hidden");
      break;
    case "1":
      vCardGroup.setAttribute("hidden", "hidden");
      inputContent.setAttribute("placeholder", window.lang20);
      wifiField.setAttribute("hidden", "hidden");
      break;
    case "2":
      vCardGroup.setAttribute("hidden", "hidden");
      inputContent.setAttribute("placeholder", window.lang21);
      if (wifiField.hasAttribute("hidden")) {
        wifiField.removeAttribute("hidden");
      }
      break;
    case "3":
      inputContent.setAttribute("placeholder", window.lang22);
      wifiField.setAttribute("hidden", "hidden");
      if (vCardGroup.hasAttribute("hidden")) {
        vCardGroup.removeAttribute("hidden");
      }
      break;
    case "4":
      inputContent.setAttribute("placeholder", window.lang23);
      wifiField.setAttribute("hidden", "hidden");
      if (vCardGroup.hasAttribute("hidden")) {
        vCardGroup.removeAttribute("hidden");
      }
      break;
  }
});
btnGenerate.addEventListener("click", function () {
  let content = inputContent.value.trim();
  if (!content) {
    return;
  }
  switch (selectType.value) {
    case "0": // 网址
      if (content.toLowerCase().indexOf("http") != 0) {
        content = `https://${content}`;
      }
      break;
    case "1": // 纯文本
      break;
    case "2": // wifi
      if (wifiEncType.value == "0") {
        const ssidName = content;
        content = `WIFI:S:${ssidName};T:nopass;P:;H:false;;`;
      } else {
        const ssidName = content;
        content = `WIFI:S:${ssidName};T:WPA;P:${pwdContent.value};H:false;;`;
      }
      break;
    case "3": // 邮箱
      if (vCardRadio.checked) {
        content = `BEGIN:VCARD
VERSION:3.0
FN:${content.split("@")[0]}
EMAIL;PREF;INTERNET:${content}
END:VCARD`;
      } else {
        content = `mailto:${content}`;
      }
      break;
    case "4": // 电话号码
      if (vCardRadio.checked) {
        content = `BEGIN:VCARD
VERSION:3.0
TEL;CELL;VOICE:${content}
END:VCARD`;
      } else {
        content = `tel:${content}`;
      }
      break;
  }

  let element = document.documentElement;
  let side = element.clientWidth;
  let side2 = element.clientHeight;
  if (side2 < side) {
    side = side2;
  }
  side = (side * 3) / 4;
  qrcodeView.innerHTML = "";
  $("#qr_code").qrcode({
    text: stringToUTF8(content),
    width: side,
    height: side,
    correctLevel: 2,
  });
  nonTips.setAttribute("hidden", "hidden");
  btnDownload.disabled = false;
  btnDownload.onclick = function () {
    const canvas = document.querySelector("#qr_code canvas");
    const dataURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "qrcode.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
});
inputContent.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    btnGenerate.click();
  }
});
btnReset.addEventListener("click", function () {
  inputContent.value = "";
  qrcodeView.innerHTML = "";
  nonTips.removeAttribute("hidden");
  btnDownload.setAttribute("disabled", "disabled");
});
