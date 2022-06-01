imagem = document.getElementById('srcImg')
canvas = document.getElementById('tagImg')
var context
startCanvas()

function startCanvas() {
    context = canvas.getContext('2d')
    canvas.width = imagem.width
    canvas.height = imagem.height
    context.drawImage(imagem, 0, 0)
}

var redFilter = function () {
    startCanvas()
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height)
    let img = new MatrixImage(imageData)
    for (var i = 0; i < img.width; i++) {
        for (var j = 0; j < img.height; j++) {
            var pixel = img.getPixel(i, j)
            img.setPixel(i, j, new RGBColor(pixel.red, 0, 0))
        }
    }
    context.putImageData(img.imageData, 0, 0)
}

var greenFilter = function () {
    startCanvas()
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height)
    let img = new MatrixImage(imageData)
    for (var i = 0; i < img.width; i++) {
        for (var j = 0; j < img.height; j++) {
            var pixel = img.getPixel(i, j)
            img.setPixel(i, j, new RGBColor(0, pixel.green, 0))
        }
    }
    context.putImageData(img.imageData, 0, 0)
}

var blueFilter = function () {
    startCanvas()
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height)
    let img = new MatrixImage(imageData)
    for (var i = 0; i < img.width; i++) {
        for (var j = 0; j < img.height; j++) {
            var pixel = img.getPixel(i, j)
            img.setPixel(i, j, new RGBColor(0, 0, pixel.blue))
        }
    }
    context.putImageData(img.imageData, 0, 0)
}

var greyFilter = function () {
    startCanvas()
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height)
    let img = new MatrixImage(imageData)
    for (var i = 0; i < img.width; i++) {
        for (var j = 0; j < img.height; j++) {
            var pixel = img.getPixel(i, j)
            var greypixel = (pixel.red + pixel.green + pixel.blue) / 3
            img.setPixel(i, j, new RGBColor(greypixel, greypixel, greypixel))
        }
    }
    context.putImageData(img.imageData, 0, 0)
}

var limiarizar = function () {
    startCanvas()
    greyFilter

    let imageData = context.getImageData(0, 0, canvas.width, canvas.height)
    let img = new MatrixImage(imageData)
    let limite = 230

    for (var i = 0; i < img.width; i++) {
        for (var j = 0; j < img.height; j++) {
            var pixel = img.getPixel(i, j)

            if (pixel.red > limite) {
                img.setPixel(i, j, new RGBColor(255, 255, 255))
            } else {
                img.setPixel(i, j, new RGBColor(0, 0, 0))
            }
        }
    }
    context.putImageData(img.imageData, 0, 0)
}

class RGBColor {
    constructor(r, g, b) {
        this.red = r
        this.green = g
        this.blue = b
    }
}

class MatrixImage {
    constructor(imageData) {
        this.imageData = imageData
        this.height = imageData.height
        this.width = imageData.width
    }

    getPixel(x, y) {
        let position = y * (this.width * 4) + x * 4

        return new RGBColor(
            this.imageData.data[position], //red
            this.imageData.data[position + 1], //green
            this.imageData.data[position + 2] //blue
        )
    }

    setPixel(x, y, color) {
        let position = y * (this.width * 4) + x * 4
        this.imageData.data[position] = color.red
        this.imageData.data[position + 1] = color.green
        this.imageData.data[position + 2] = color.blue
    }
}

btnReset = document
    .getElementById('reset')
    .addEventListener('click', startCanvas)
btnRed = document.getElementById('btnRed').addEventListener('click', redFilter)
btnGreen = document
    .getElementById('btnGreen')
    .addEventListener('click', greenFilter)
btnBlue = document
    .getElementById('btnBlue')
    .addEventListener('click', blueFilter)
btnGrey = document
    .getElementById('btnGrey')
    .addEventListener('click', greyFilter)
btnLimiar = document
    .getElementById('btnLimiar')
    .addEventListener('click', limiarizar)
