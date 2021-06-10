let i = 0; // iterator which Represent  the current selected element. i varries from 0 to 4 representing all the 5 images in sidebar

sideBar = document.querySelectorAll(".sideBar img"); // List of all the image nodes of sidebar
sideBarDiv = document.querySelectorAll(".sideBar div"); // List of all the division tags of sidebar which house images and paragraphs

//function triggered on mouse click on image:
const change = (src, imgId) => {
  let k = 0; // iterator to traverse the whole sidebar node list
  for (k = 0; k < 5; k++) {
    if (imgId === sideBar[k].id) {
      // check which of the image id of the sidebar images matches with id of the clicked image
      i = k; // copy the child number to the global iterator
      break;
    }
  }
  let parent = sideBar[k].parentNode; // select parent of the clicked image
  for (k = 0; k < 5; k++) {
    sideBarDiv[k].classList.remove("blue"); // remove blue bg color class from all other nodes in sideBarDiv
  }
  parent.classList.add("blue"); // add blue color class to the clicked image class
  //console.log(parent.id);
  document.getElementById("main").src = src; // replace main image by the clicked image
};

// event listner created for capturing arrow movement on keyboard
window.addEventListener("keydown", (e) => {
  // e is the event
  if (e.code == "ArrowDown" || e.code == "ArrowRight") {
    if (i < 4) {
      document.getElementById("main").src = sideBar[i + 1].src; //add src of next image to the main image src
      sideBarDiv[i + 1].classList.add("blue"); // add background color blue to the next division in sidebar
      sideBarDiv[i].classList.remove("blue"); // remove blue bg color from the current divison
      i++;
    }
  }
  if (e.code == "ArrowUp" || e.code == "ArrowLeft") {
    if (i >= 1) {
      document.getElementById("main").src = sideBar[i - 1].src; //add src of previous image to the main image src
      sideBarDiv[i - 1].classList.add("blue"); // add background color blue to the previous division in sidebar
      sideBarDiv[i].classList.remove("blue"); // remove blue bg color from the current divison
      i--;
    }
  }
});
