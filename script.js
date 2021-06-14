const imgInfo = [
  {
    previewImage:
      "https://images.unsplash.com/photo-1561948955-570b270e7c36?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    title: "cat.jpeg",
  },
  {
    previewImage:
      "https://images.unsplash.com/photo-1606787620819-8bdf0c44c293?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    title: "cooking couple shoot portofilio(1).jpg",
  },
  {
    previewImage:
      "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    title: "bali-kelingking-beach-plastic-removal-drive.key",
  },
  {
    previewImage:
      "https://images.unsplash.com/photo-1623206837956-07dab21608f6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    title: "NextByk Investor Pitch 2021.ppt",
  },
  {
    previewImage:
      "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    title: "interns-performance-report-june-2021.key",
  },
];

let mainImg = document.querySelector(".main_image img");
mainImg.setAttribute("id", "main");
mainImg.setAttribute("src", imgInfo[0].previewImage); // initializing the main image to the first image of ImgInfo array.
document.getElementById("mainFigCap").innerHTML = imgInfo[0].title;

let iter = 0; // iterator for marking the current position of the element in ImgInfo array.

let division = document.querySelector(".sideBar"); // select the divison which will contain all the sideBar images and their captions

// for each element contained in the imgInfo Array, adding a Corresponding child divison which will in turn have image tag and paragraph tag as its attribute.
imgInfo.forEach((element) => {
  let sideDiv = document.createElement("div"); //create a new divison
  sideDiv.setAttribute("id", `sideDiv${iter}`);
  sideDiv.classList.add("sideDiv");
  let sideImg = document.createElement("img"); // craete image tag to add image in sideBar
  sideImg.classList.add("thumb");
  sideImg.setAttribute("id", `sideImg${iter}`);
  sideImg.setAttribute("src", element.previewImage);
  sideImg.setAttribute("onclick", "change(this.src,this.id)");
  sideDiv.append(sideImg); // appending image to divison
  let sideCap = document.createElement("p"); // craeting paragraph to decribe the image caption
  sideCap.classList.add("desc");
  sideCap.innerHTML = element.title;
  // let leftTitle = document.createElement("span");
  // let rightTitle = document.createElement("span");
  // leftTitle.innerHTML = element.title.substr(0, element.title.length - 3);
  // rightTitle.innerHTML = element.title.substring(
  //   element.title.length - 3,
  //   element.title.length
  // );
  // leftTitle.classList.add("leftTruncate");
  // rightTitle.classList.add("rightTruncate");
  // sideCap.append(leftTitle);
  // sideCap.append(rightTitle);
  //sideCap.innerHTML = element.title;
  sideDiv.append(sideCap); // appending p tag to divison
  sideDiv.setAttribute(
    "onclick",
    "change(this.firstChild.src, this.firstChild.id)"
  );
  division.append(sideDiv); // appending the new divison to its parent divison.
  iter++;
});

let i = 0; // iterator which Represent  the current selected element. i varries from 0 to 4 representing all the 5 images in sidebar

sideBar = document.querySelectorAll(".sideBar img"); // List of all the image nodes of sidebar
sideBarDiv = document.querySelectorAll(".sideBar div"); // List of all the division tags of sidebar which house images and paragraphs

sideBarDiv[0].classList.add("blue");

//Function for truncating thumbnail title
const clipper = () => {
  let titleNode = document.querySelectorAll(".sideBar p");
  let it = 0; // iterator for determining the index of array
  titleNode.forEach((element) => {
    let imgTitle = imgInfo[it].title;
    element.textContent = imgTitle;
    if (element.scrollWidth > element.clientWidth) {
      let maxAllowed = Math.floor(
        (element.clientWidth * imgTitle.length) / element.scrollWidth // Length of title that will fit inside the given size
      );
      maxAllowed -= 3; // subtracting three characters for putting dots
      let newTitle = imgTitle.substr(0, maxAllowed / 2); // left side of the title
      newTitle += "...";
      newTitle += imgTitle.substr(
        // right side of the title
        imgTitle.length + 1 - maxAllowed / 2,
        maxAllowed / 2
      );
      element.textContent = newTitle;
    }
    it++;
  });
};

clipper(); // calling the clipper function for the first time
window.addEventListener("resize", clipper); // calling this function whenever resizing.

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
  document.getElementById("mainFigCap").innerHTML = imgInfo[i].title;
};

// event listner created for capturing arrow movement on keyboard
window.addEventListener("keydown", (e) => {
  // e is the event
  if (e.code == "ArrowDown" || e.code == "ArrowRight") {
    if (i < 4) {
      document.getElementById("main").src = sideBar[i + 1].src; //add src of next image to the main image src
      sideBarDiv[i + 1].classList.add("blue"); // add background color blue to the next division in sidebar
      sideBarDiv[i].classList.remove("blue"); // remove blue bg color from the current divison
      document.getElementById("mainFigCap").innerHTML = imgInfo[i + 1].title;
      i++;
    }
  }
  if (e.code == "ArrowUp" || e.code == "ArrowLeft") {
    if (i >= 1) {
      document.getElementById("main").src = sideBar[i - 1].src; //add src of previous image to the main image src
      sideBarDiv[i - 1].classList.add("blue"); // add background color blue to the previous division in sidebar
      sideBarDiv[i].classList.remove("blue"); // remove blue bg color from the current divison
      document.getElementById("mainFigCap").innerHTML = imgInfo[i - 1].title;
      i--;
    }
  }
});
