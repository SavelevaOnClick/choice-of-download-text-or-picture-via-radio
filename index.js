const wrapper = document.body.appendChild(document.createElement("div"));
const topBlock = wrapper.appendChild(document.createElement("div"));
const centerBlock = wrapper.appendChild(document.createElement("div"));
const bottomBlock = wrapper.appendChild(document.createElement("div"));
const style = document.head.appendChild(document.createElement("style"));
style.innerText = `
 p {
   max-width: 200px;
   display: inline-block;
 }
 img{
   max-width: 200px;
   display: inline-block;
   margin-right: 20px;
 }
div:first-child{
  width: 1200;
  margin: 0 auto;
}
  div>div {
    padding: 30px 5px;
  }
  div > div > input {
    display: inline-block;
    margin-right: 25px;
  }
`;

const inputRadioImgLoad = document.createElement("input");
const inputRadioTextLoad = document.createElement("input");
const inputLoader = document.createElement("input");

Object.assign(inputLoader, {
  type: "file",
  disabled: true,
});

Object.assign(inputRadioImgLoad, {
  id: "radioImgLoad",
  name: "radioLoad",
  type: "radio",
  value: "readAsDataURL",
  classList: "radioInp",
});
Object.assign(inputRadioTextLoad, {
  id: "radioTextLoad",
  name: "radioLoad",
  type: "radio",
  value: "readAsText",
  classList: "radioInp",
});
const labelForImg = topBlock.appendChild(document.createElement("label"));
labelForImg.setAttribute("for", "radioImgLoad");
topBlock.appendChild(inputRadioImgLoad);
labelForImg.innerText = "load img";

const labelForText = topBlock.appendChild(document.createElement("label"));
labelForText.setAttribute("for", "radioTextLoad");
topBlock.appendChild(inputRadioTextLoad);
labelForText.innerText = "load Text";

centerBlock.appendChild(inputLoader);

const func = (function () {
  let method;
  const reader = new FileReader();
  return function (event) {
    inputLoader.disabled = false;
    let method = event.target.value;

    inputLoader.onchange = function (event) {
      const reader = new FileReader();
      reader[method](event.target.files[0]);
      reader.onload = function (event) {
        if (method === "readAsDataURL") {
          bottomBlock.appendChild(document.createElement("img")).src =
            event.target.result;
        } else {
          bottomBlock.appendChild(document.createElement("p")).innerText =
            event.target.result;
        }
      };
    };
  };
})();

document
  .querySelectorAll(".radioInp")
  .forEach((inp) => inp.addEventListener("change", func));
