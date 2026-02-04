document.querySelector("#inputName").oninput = () => {
  document.querySelector("#hiddenName").value = base64.encode(
    document.querySelector("#inputName").value,
  );
};
