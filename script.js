let uploadboxel = document.querySelector(".uploadbox");
let fileboxel = document.querySelector("#filebox");
let widthel = document.querySelector("#width");
let heightel = document.querySelector("#height");
let ratioel = document.querySelector("#lockratio");
let redqualityel = document.querySelector("#redquality");
let btnel = document.querySelector("button");
let resizebox = document.querySelector(".resizebox");

uploadboxel.addEventListener("click", () => {
	fileboxel.click();
});
fileboxel.addEventListener("change", (e) => {
	loadPicture(e);
});
let ogRatio;
let newphoto = document.createElement("img");

const loadPicture = (e) => {
	const pic = e.target.files[0];
	if (!pic) {
		return;
	}
	let existing = uploadboxel.querySelector(".beforeload");
	let existingpic = uploadboxel.querySelector("img");
	if (existing) {
		existing.remove();
	}
	if (existingpic) {
		existingpic.remove();
	}

	console.log(pic);
	newphoto.src = URL.createObjectURL(pic);
	newphoto.classList.add("newpicture");
	uploadboxel.style.border = "none";
	newphoto.onload = function () {
		widthel.value = newphoto.naturalWidth;
		heightel.value = newphoto.naturalHeight;
		ogRatio = newphoto.naturalWidth / newphoto.naturalHeight;
	};
    uploadboxel.append(newphoto);
    resizebox.style.display = "block";
};
widthel.addEventListener("keyup", () => {
	let ht = ratioel.checked ? widthel.value / ogRatio : heightel.value;
	heightel.value = Math.floor(ht);
});
heightel.addEventListener("keyup", () => {
	let wd = ratioel.checked ? heightel.value * ogRatio : widthel.value;
	widthel.value = Math.floor(wd);
});

btnel.addEventListener("click", () => {
	resizeAndDownlaod();
});
const resizeAndDownlaod = () => {
	let canvas = document.createElement("canvas");
	let anchor = document.createElement("a");
    let context = canvas.getContext("2d");
    let imgQuality = redqualityel.checked ? 0.5 : 1;
	canvas.width = widthel.value;
	canvas.height = heightel.value;
	context.drawImage(newphoto, 0, 0, canvas.width, canvas.height);
    anchor.href = canvas.toDataURL("image/jpeg".imgQuality);
    anchor.download = new Date().getTime();
    anchor.click();
};
