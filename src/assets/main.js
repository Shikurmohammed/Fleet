function success() {
  if (document.getElementById("reasonForRejection").value === "") {
    document.getElementById("btn-reject").disabled = true;
  } else {
    document.getElementById("btn-reject").disabled = false;
  }
}
