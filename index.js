const container = document.querySelector(".container")
const root = document.documentElement;
const input = document.getElementById("size")
const gridButton = document.querySelector('.newGrid')
const colorPicker = document.querySelector(".color-picker")
const grayscale = document.querySelector("#grayscale")
const randomColor = document.querySelector("#randomColor")

let i = 0.1;
let activeColor = colorPicker.value

const paint = (e) => {
    let activeState = document.querySelector(".activeState")
    if (activeState.id == "colorPicker") {
        if (!e.target.classList.contains("painted")) {
            e.target.classList.add("painted")
            e.target.style.background = activeColor;
        }
    } else if (activeState.id == "randomColor") {
        if (!e.target.classList.contains("painted")) {
            e.target.classList.add("painted")
            e.target.style.background = getRandomColor();
        }
    } else if (activeState.id == "grayscale") {
        if (!e.target.classList.contains("painted")) {
            activeColor = `rgba(0,0,0,${i})`
            e.target.classList.add("painted")
            e.target.style.background = activeColor;
            i += 0.1;
        }
    }
}

const fillGrid = (divNumber) => {
    container.textContent = "";
    for (let i = 0; i < Math.pow(divNumber, 2); i++) {
        let div = document.createElement("div")
        div.addEventListener("mouseover", paint)
        div.classList.add("border")
        container.appendChild(div)
    }

}
const newGrid = () => {
    i = 0.1
    root.style.setProperty("--columns", input.value)
    root.style.setProperty("--rows", input.value)
    fillGrid(input.value)
}
newGrid()
gridButton.onclick = newGrid;

colorPicker.addEventListener("input", () => {
    activeColor = colorPicker.value
})

const getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

const switchActive = (node, index, cssClass) => {
    for (let i = 0; i < node.length; i++) {
        node[i].classList.remove(cssClass)
    }
    node[index].classList.add(cssClass)
}

const colorNode = document.querySelector(".color-options").children
for (let i = 0; i < colorNode.length; i++) {
    colorNode[i].onclick = () => switchActive(colorNode, i, "activeState")
}

let paintNode = document.querySelector(".paint-style")
for (let i = 0; i < paintNode.children.length; i++) {
    paintNode.children[i].onclick = () => {
        switchActive(paintNode.children, i, "active")
    }
}
const erase = (e) => {
    e.target.style.background = "#fff"
    e.target.classList.remove("painted")
}
paintNode.addEventListener("click", () => {
    if (paintNode.children[0].classList.contains("active")) {
        for (let i = 0; i < container.children.length; i++) {
            container.children[i].removeEventListener("mouseover", paint)
            container.children[i].removeEventListener("mouseover", erase)
            container.children[i].addEventListener("mouseover", paint)
        }
    } else if (paintNode.children[1].classList.contains("active")) {
        for (let i = 0; i < container.children.length; i++) {
            container.children[i].removeEventListener("mouseover", paint)
            container.children[i].removeEventListener("mouseover", erase)
            container.children[i].addEventListener("click", paint)
        }
    } else if (paintNode.children[2].classList.contains("active")) {
        for (let i = 0; i < container.children.length; i++) {
            container.children[i].removeEventListener("mouseover", paint)
            container.children[i].removeEventListener("click", paint)
            container.children[i].addEventListener("mouseover", erase)

        }
    }
})
