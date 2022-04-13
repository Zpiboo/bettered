window.addEventListener("load", load);

function load() {
  if (sessionStorage.getItem("ed_token")) return;
  
  alert("no");
}