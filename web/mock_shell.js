const cmdRaw01 = document.getElementById("cmd_raw");
cmdRaw01.addEventListener("keydown", function (event) {
  if (event.key == "Enter" && (event.ctrlKey || event.shiftKey)) {
    this.value += "\r\n";
  } else if (event.key == "Enter") {
    document.getElementById("my_submit").click();
    event.preventDefault();
  }
});
cmdRaw01.addEventListener("keydown", (event) => {
  if (!Array.isArray(window.cmdLast_01)) {
    return;
  }
  let arrLen = window.cmdLast_01.length;
  if (event.key === "ArrowUp" || event.key === "Up") {
    if (cmdRaw01.value.trim().length == 0) {
      if (arrLen > 0) {
        cmdRaw01.value = window.cmdLast_01[arrLen - 1];
      }
    } else {
      let index = window.cmdLast_01.indexOf(cmdRaw01.value);
      if (index > 0) {
        cmdRaw01.value = window.cmdLast_01[index - 1];
      }
    }
    event.preventDefault();
  } else if (event.key === "ArrowDown" || event.key === "Down") {
    if (cmdRaw01.value.trim().length == 0) {
      return;
    }
    let index = window.cmdLast_01.indexOf(cmdRaw01.value);
    if (index < arrLen - 1) {
      cmdRaw01.value = window.cmdLast_01[index + 1];
    }
    event.preventDefault();
  }
});
function addHistory(cmdText) {
  if (!Array.isArray(window.cmdLast_01)) {
    window.cmdLast_01 = [cmdText];
  } else {
    let index = window.cmdLast_01.indexOf(cmdText);
    if (index != -1) {
      window.cmdLast_01.splice(index, 1);
    }
    window.cmdLast_01.push(cmdText);
  }
}
document.getElementById("my_submit").addEventListener("click", function () {
  const raw = document.getElementById("cmd_raw");
  const cmdText = raw.value.trim();
  if (cmdText.length > 0) {
    if (
      cmdText == "clear" ||
      cmdText == "reset" ||
      cmdText == "history" ||
      cmdText == "history -c"
    ) {
      addHistory(cmdText);
      raw.value = "";
      const resultCmd = document.getElementById("result_all");
      if (cmdText == "history") {
        if (Array.isArray(window.cmdLast_01)) {
          for (let it of window.cmdLast_01) {
            resultCmd.value += `${it}\r\n`;
          }
        }
        resultCmd.scrollTop = resultCmd.scrollHeight;
        return;
      } else if (cmdText == "history -c") {
        window.cmdLast_01 = [];
        return;
      }
      resultCmd.value = "";
      return;
    }
    const baseCmd = Base64.encode(cmdText);
    let myUrl = "?cmd=" + baseCmd;
    if (window.pathDir_01 != null) {
      myUrl += "&dir=" + Base64.encode(window.pathDir_01);
    }
    fetch(myUrl)
      .then((res) => res.json())
      .then((data) => {
        const resultShow = document.getElementById("result_all");
        if (data.code == 0) {
          resultShow.value +=
            Base64.decode(data.cmd) +
            "\r\n" +
            Base64.decode(data.result) +
            "\r\n";
          window.pathDir_01 = data.dir;
        } else {
          resultShow.value += "不支持此命令: " + raw.value + "\r\n";
        }
        addHistory(raw.value);
        raw.value = "";
        resultShow.scrollTop = resultShow.scrollHeight;
      })
      .catch((err) => {
        location.href = "/ala/quit.html";
      });
  } else {
    alert("命令为空");
  }
});
