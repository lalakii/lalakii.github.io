let inputName = document.querySelector("#inputName");
if (inputName != null) {
  inputName.oninput = () => {
    document.querySelector("#hiddenName").value = base64.encode(
      document.querySelector("#inputName").value,
    );
  };
}
let downBtn = document.querySelector("#downloadBtn");
if (downBtn != null) {
  downBtn.onclick = () => {
    location.href =
      "?f=" + base64.encode(document.querySelector("#getfileName").innerText);
  };
}
