// mengimpor kode html untuk dimasukkan ke js
const numbers = document.querySelectorAll(".number")
const calculatorScreen = document.querySelector('.calculator-screen')
const calculatorScreen2 = document.querySelector('.calculator-screen2')

// membuat variabel untuk membantu perhitungan
let prevNumber = ''
let calculationOperator = ''
let currentNumber = '0'

// menampilkan angka pertama, operator, dan angka kedua ke layar kalkulator
const updateScreen = () => {
  calculatorScreen.value = prevNumber + calculationOperator + currentNumber
}

// menampilkan angka pertama dan operator ke layar kalkulator
const updateScreen2 = () => {
  calculatorScreen.value = prevNumber + calculationOperator
}

// menampilkan output ke layar kalkulator
const updateScreen3 = () => {
  calculatorScreen2.value = currentNumber
}

// menginput angka 
const inputNumber = (number) => {
    // apabila input adalah 0, maka tidak bisa input angka tambahan
    if (currentNumber === '0') { 
      currentNumber = number
    // jika tidak diawali dengan penginputan angka 0, maka dapat melanjutkan input angka lain
    } else {
      currentNumber += number
    }
}

// menginput operasi 
const inputOperator = (operator) => {
    if(calculationOperator === '') {
        prevNumber = currentNumber // menyimpan currentNumber ke prevNumber
    }
    calculationOperator = operator // menyimpan string operator ke variabel calculationOperator
    updateScreen2() // menampilkan output updateScreen2
    currentNumber = '0' // currentNumber diubah menjadi angka 0
}

// untuk menambahkan angka di kalkulator
numbers.forEach((number) => {
    number.addEventListener("click", (event) => {
        inputNumber(event.target.innerText)
        updateScreen() // menampilkan output updateScreen()
    })
})

const operators = document.querySelectorAll(".operator")

operators.forEach((operator) => {
    operator.addEventListener("click", (event) => {
        inputOperator(event.target.value)
    })
})

// operator (=)
const equalSign = document.querySelector('.equal-sign')

equalSign.addEventListener('click', () => {
    calculate()
    // menampilkan hasil saat operator = diklik
    updateScreen3() // menampilkan output updateScreen3
})

// kalkulasi dengan beberapa operator
const calculate = () => {
  let result = '' // variabel result didefinisikan kosong sementara
  switch(calculationOperator) {
    case "+": // operasi penambahan
      result = parseFloat(prevNumber) + parseFloat(currentNumber)
      break
    case "-": // operasi pengurangan 
      result = parseFloat(prevNumber) - parseFloat(currentNumber)
      break
    case "×": // operasi perkalian
      result = parseFloat(prevNumber) * parseFloat(currentNumber)
      break
    case "÷": // operasi pembagian
      result = parseFloat(prevNumber) / parseFloat(currentNumber)
      break
    default:
      return
  }
  currentNumber = result // variabel currentNumber diupdate menjadi result
  calculationOperator = '' // calculationOperator diupdate menjadi kosong
}

// tombol AC untuk menghapus kalkulasi dan meresetnya dari awal
const clearBtn = document.querySelector('.all-clear')

clearBtn.addEventListener('click', () => {
    clearAll() // menghapus prevNumber, calculationOperator, dan mengubah currentNumber menjadi 0
    updateScreen() // menampilkan output updateScreen
    updateScreen3() // menampilkan output updateScreen3
})

const clearAll = () => {
    prevNumber = ''
    calculationOperator = ''
    currentNumber = '0'
}

// menghitung angka desimal
const decimal = document.querySelector('.decimal')

decimal.addEventListener('click', (event) => {
    inputDecimal(event.target.value)
    updateScreen() // menampilkan output updateScreen
})

inputDecimal = (dot) => {
    if(currentNumber.includes('.')) {
        return
    }
    currentNumber += dot
}

// menghitung persen
const percentage = document.querySelector('.percentage')

percentage.addEventListener('click', () => {
    currentNumber = currentNumber * 0.01 // currentNumber dikali 1/100 karena dikenai operasi persen
    updateScreen() // menampilkan output updateScreen
})