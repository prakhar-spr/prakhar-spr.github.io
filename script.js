let i = 0; // iterator which Represent  the current selected element

sideBar = document.querySelectorAll(".sideBar img");
sideBarDiv = document.querySelectorAll(".sideBar div");

const change = (src, imgId) => {
  let k = 0;
  for (k = 0; k < 5; k++) {
    if (imgId === sideBar[k].id) {
      i = k;
      break;
    }
  }
  let parent = sideBar[k].parentNode;
  for (k = 0; k < 5; k++) {
    sideBarDiv[k].classList.remove("blue");
  }
  parent.classList.add("blue");
  console.log(parent.id);
  document.getElementById("main").src = src;
};

window.addEventListener("keydown", (e) => {
  if (e.code == "ArrowDown" || e.code == "ArrowRight") {
    if (i < 4) {
      document.getElementById("main").src = sideBar[i + 1].src;
      sideBarDiv[i + 1].classList.add("blue");
      sideBarDiv[i].classList.remove("blue");
      i++;
    }
  }
  if (e.code == "ArrowUp" || e.code == "ArrowLeft") {
    if (i >= 1) {
      document.getElementById("main").src = sideBar[i - 1].src;
      sideBarDiv[i - 1].classList.add("blue");
      sideBarDiv[i].classList.remove("blue");
      i--;
    }
  }
});

// sideBar[i+1].style.box-shadow: "3px 3px 3px 3px rgb(41, 9, 223)";
//       sideBar[i+1].style.box-shadow: "";
