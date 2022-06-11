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

var media = function () {
    startCanvas()

    let imageData = context.getImageData(0, 0, canvas.width, canvas.height)
    let img = new MatrixImage(imageData)

    for (var i = 1; i < img.width - 1; i++) {
        for (var j = 1; j < img.height - 1; j++) {
            var target = img.getPixel(i, j)
            p = [
                img.getPixel(i - 1, j - 1),
                img.getPixel(i, j - 1),
                img.getPixel(i + 1, j - 1),
                img.getPixel(i - 1, j),
                img.getPixel(i + 1, j),
                img.getPixel(i - 1, j + 1),
                img.getPixel(i, j + 1),
                img.getPixel(i + 1, j + 1)
            ]

            somaR = target.red
            somaG = target.green
            somaB = target.blue

            for (var k = 0; k < 8; k++) {
                somaR += p[k].red
                somaG += p[k].green
                somaB += p[k].blue
            }

            img.setPixel(i, j, new RGBColor(somaR / 9, somaG / 9, somaB / 9))
        }
    }
    context.putImageData(img.imageData, 0, 0)
}

var mediana = function () {
    startCanvas()
    greyFilter()

    let imageData = context.getImageData(0, 0, canvas.width, canvas.height)
    let img = new MatrixImage(imageData)

    for (var i = 1; i < img.width - 1; i++) {
        for (var j = 1; j < img.height - 1; j++) {
            p = [
                img.getPixel(i, j).red,
                img.getPixel(i - 1, j - 1).red,
                img.getPixel(i, j - 1).red,
                img.getPixel(i + 1, j - 1).red,
                img.getPixel(i - 1, j).red,
                img.getPixel(i + 1, j).red,
                img.getPixel(i - 1, j + 1).red,
                img.getPixel(i, j + 1).red,
                img.getPixel(i + 1, j + 1).red
            ]

            p.sort()

            img.setPixel(i, j, new RGBColor(p[4], p[4], p[4]))
        }
    }
    context.putImageData(img.imageData, 0, 0)
}

var brilho = function () {
    startCanvas()
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height)
    let img = new MatrixImage(imageData)
    const brightness = 1.2

    for (var i = 1; i < img.width; i++) {
        for (var j = 1; j < img.height; j++) {
            var pixel = img.getPixel(i, j)
            newR = pixel.red * brightness
            newG = pixel.green * brightness
            newB = pixel.blue * brightness
            img.setPixel(i, j, new RGBColor(newR, newG, newB))
        }
    }
    context.putImageData(img.imageData, 0, 0)
}

var contraste = function () {
    startCanvas()
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height)
    let img = new MatrixImage(imageData)

    const fator_contraste = 2
    const add = 200

    for (var i = 1; i < img.width; i++) {
        for (var j = 1; j < img.height; j++) {
            var pixel = img.getPixel(i, j)
            newR = fator_contraste * (pixel.red - add) + add
            newG = fator_contraste * (pixel.green - add) + add
            newB = fator_contraste * (pixel.blue - add) + add
            img.setPixel(i, j, new RGBColor(newR, newG, newB))
            img.setPixel(i, j, new RGBColor(newR, newG, newB))
        }
    }
    context.putImageData(img.imageData, 0, 0)
}

function pesoGaussiano(pixel, peso) {
    return new RGBColor(pixel.red * peso, pixel.green * peso, pixel.blue * peso)
}

var gaussiano = function () {
    startCanvas()
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height)
    let img = new MatrixImage(imageData)

    for (var i = 2; i < img.width - 2; i++) {
        for (var j = 2; j < img.height - 2; j++) {
            p = [
                pesoGaussiano(img.getPixel(i, j), 0.1),
                pesoGaussiano(img.getPixel(i - 1, j - 1), 0.025),
                pesoGaussiano(img.getPixel(i, j - 1), 0.2),
                pesoGaussiano(img.getPixel(i + 1, j - 1), 0.025),
                pesoGaussiano(img.getPixel(i - 1, j), 0.2),
                pesoGaussiano(img.getPixel(i + 1, j), 0.2),
                pesoGaussiano(img.getPixel(i - 1, j + 1), 0.025),
                pesoGaussiano(img.getPixel(i, j + 1), 0.2),
                pesoGaussiano(img.getPixel(i + 1, j + 1), 0.025),
                pesoGaussiano(img.getPixel(i, j - 2), 0.1),
                pesoGaussiano(img.getPixel(i, j + 2), 0.1),
                pesoGaussiano(img.getPixel(i + 2, j), 0.1),
                pesoGaussiano(img.getPixel(i - 2, j), 0.1)
            ]

            somaR = 0
            somaG = 0
            somaB = 0
            for (var k = 0; k < 13; k++) {
                somaR += p[k].red
                somaG += p[k].green
                somaB += p[k].blue
            }

            img.setPixel(
                i,
                j,
                new RGBColor(somaR / 1.4, somaG / 1.4, somaB / 1.4)
            )
        }
    }

    context.putImageData(img.imageData, 0, 0)
}

var flip1 = function () {
    startCanvas()

    let imageData = context.getImageData(0, 0, canvas.width, canvas.height)
    let oldImg = new MatrixImage(imageData)
    let newImg = new MatrixImage(imageData)
    let height = canvas.height - 1

    for (var j = 0; j < newImg.width / 2; j++) {
        for (var i = 0; i < newImg.height; i++) {
            var srcPixel = oldImg.getPixel(i, j)
            var tgtPixel = oldImg.getPixel(i, height)

            newImg.setPixel(i, j, tgtPixel)
            newImg.setPixel(i, height, srcPixel)
        }
        height--
    }
    context.putImageData(newImg.imageData, 0, 0)
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
btnMedia = document.getElementById('btnMedia').addEventListener('click', media)
btnMediana = document
    .getElementById('btnMediana')
    .addEventListener('click', mediana)
btnBrilho = document
    .getElementById('btnBrilho')
    .addEventListener('click', brilho)
btnContraste = document
    .getElementById('btnContraste')
    .addEventListener('click', contraste)
btnGaussiano = document
    .getElementById('btnGaussiano')
    .addEventListener('click', gaussiano)
btnHorizontal = document
    .getElementById('btnHorizontal')
    .addEventListener('click', flip1)
