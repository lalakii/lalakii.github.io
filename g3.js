let token = localStorage.getItem("t");
if (token == null) {
  token = crypto.randomUUID();
  localStorage.setItem("t", token);
}
let inputName = document.querySelector("#inputName");
if (inputName != null) {
  inputName.oninput = () => {
    document.querySelector("#hiddenName").value = base64.encode(
      document.querySelector("#inputName").value,
    );
    document.querySelector("#token").value = localStorage.getItem("t");
  };
}
let downBtn = document.querySelector("#downloadBtn");
if (downBtn != null) {
  downBtn.onclick = () => {
    location.href =
      "?f=" +
      base64.encode(document.querySelector("#getfileName").innerText) +
      "&t=" +
      localStorage.getItem("t");
  };
}
