document.querySelector("#inputName").oninput = () => {
  document.querySelector("#hiddenName").value = base64.encode(
    document.querySelector("#inputName").value,
  );
};
document.querySelector("#downloadBtn").onclick = () => {
  location.href =
    "?f=" + base64.encode(document.querySelector("#getfileName").innerText);
};
