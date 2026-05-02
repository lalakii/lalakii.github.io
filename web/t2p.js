const myBtns = document.querySelectorAll(".mybtn");
if (myBtns.length != 0) {
  new ClipboardJS(".mybtn");
  var myTimeout = null;
  myBtns[0].addEventListener("click", function (event) {
    if (myTimeout == null) {
      document.querySelector(".toast").style = "display:block";
      document.querySelector(".t-msg").innerHTML = window.lalaki_copy_msg;
      myTimeout = setTimeout(function () {
        document.querySelector(".toast").style = "display:none";
        document.querySelector(".t-msg").innerHTML = "";
        myTimeout = null;
      }, 1200);
    }
  });
}
if (document.querySelectorAll("#qrcode").length > 0) {
  var interval = undefined;
  interval = setInterval(function () {
    if (window.savedUrl != undefined) {
      $("#qrcode").qrcode({
        text: window.savedUrl,
        width: 320,
        height: 320,
        correctLevel: 0,
      });
      clearInterval(interval);
    }
  }, 50);
}
const encryMethod = "AES-GCM";
function text2key(text) {
  const md = forge.md.sha256.create();
  md.update(text, "utf8");
  const hash = md.digest();
  return hash.getBytes();
}
function crypt(text, key) {
  if (key == null) {
    key = forge.util.decode64(window.lalaki_aes_key);
  }
  const iv = forge.random.getBytesSync(12);
  const cipher = forge.cipher.createCipher(encryMethod, key);
  cipher.start({
    iv: iv,
    tagLength: 128,
  });
  cipher.update(forge.util.createBuffer(text, "utf8"));
  cipher.finish();
  const ciphertext = cipher.output.getBytes();
  const tag = cipher.mode.tag.getBytes();
  const result = {
    iv: forge.util.bytesToHex(iv),
    ciphertext: forge.util.encode64(ciphertext),
    tag: forge.util.bytesToHex(tag),
  };
  return JSON.stringify(result);
}
function decrypt(text, key) {
  if (key == null) {
    key = forge.util.decode64(window.lalaki_aes_key);
  }
  let obj = JSON.parse(text);
  const iv = forge.util.hexToBytes(obj.iv);
  const ciphertext = forge.util.decode64(obj.ciphertext);
  const tag = forge.util.hexToBytes(obj.tag);
  const decipher = forge.cipher.createDecipher(encryMethod, key);
  decipher.start({
    iv: iv,
    tagLength: 128,
    tag: forge.util.createBuffer(tag),
  });
  decipher.update(forge.util.createBuffer(ciphertext));
  if (decipher.finish()) {
    return decipher.output.toString("utf8");
  }
  return "";
}
const contents = document.querySelectorAll("#content");
if (contents.length > 0) {
  const myContent = contents[0];
  let jsonText = myContent.value;
  window.la_ciphertext = jsonText;
  let plainText = decrypt(jsonText, null);
  if (plainText == "") {
    for (let it of document.querySelectorAll(".dialog-content")) {
      let className = it.getAttribute("class");
      it.setAttribute("class", className.replace("hide-all", ""));
    }
    document.body.setAttribute("style", "overflow:hidden");
  }
  myContent.value = plainText;
  myContent.setAttribute("class", "textarea");
  document.getElementById("pass_verify").addEventListener("click", function () {
    const passwordValue = document.getElementById("userpwd").value;
    const pwdValue = `${passwordValue}`.trim();
    if (pwdValue.length > 0) {
      let key = text2key(pwdValue);
      let decryptText = decrypt(window.la_ciphertext, key);
      if (decryptText == "") {
        document.querySelector(".red-text").setAttribute("class", "red-text");
      } else {
        document.getElementById("content").value = decryptText;
        for (let it of document.querySelectorAll(".dialog-content")) {
          it.setAttribute("style", "display:none");
        }
        document.body.removeAttribute("style");
      }
    } else {
      document.querySelector(".red-text").setAttribute("class", "red-text");
    }
  });
}
const fakeContents = document.querySelectorAll("#fake_clip");
if (fakeContents.length > 0) {
  const content = fakeContents[0];
  let endDom = document.querySelector(".year");
  let domHeight = document.documentElement.clientHeight;
  let fakeContent = content;
  let oldHeight = fakeContent.offsetHeight;
  while (endDom.offsetTop + endDom.offsetHeight > domHeight) {
    fakeContent.setAttribute("style", `height:${oldHeight}px`);
    oldHeight--;
    if (oldHeight < 50) {
      break;
    }
  }
  const passInput = document.getElementById("clip_pass_data");
  passInput.removeAttribute("readonly");
  fakeContent.removeAttribute("readonly");
  document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault();
    let plainText = `${content.value}`;
    if (plainText.trim().length > 0) {
      const passValue = `${passInput.value}`.trim();
      let key = forge.util.decode64(window.lalaki_aes_key);
      if (passValue.length > 0) {
        key = text2key(passInput.value);
      }
      document.getElementById("real_clip").value = crypt(plainText, key);
      event.target.submit();
    } else {
      document.getElementById("share_tips").removeAttribute("class");
    }
  });
}
const years = document.querySelectorAll(".year");
for (const year of document.querySelectorAll(".year")) {
  year.innerHTML = new Date().getFullYear();
}
