/*

on click add element in div

tehn cant click in that box again

switch between x and o

winning 

3 cross
else tie

new game on lcick clears divs


*/


let playerText = document.getElementById("playerText")
let newGame = document.getElementById("newGame")
let boxes = Array.from(document.getElementsByClassName("box"))
let score = document.getElementById("score")

// console.log(boxes)



let indicator = getComputedStyle(document.body).getPropertyValue("--winning")

const O = "O"
const X = "X"

let currentPlayer = X


let boxSpace = Array(9).fill(null)

console.log(boxSpace)

let winX = 0
let tie = 0
let win0 = 0


const start = () =>{
    boxes.forEach(box => box.addEventListener("click", boxClicked))
}


function boxClicked(event){
    const id = event.target.id

    if(!boxSpace[id]&& win()!=false){
        event.target.innerText = ""

    }

    
    // if not filled in (if its not null at the targted id)
    else if(!boxSpace[id]){
        boxSpace[id] = currentPlayer
        event.target.innerText = currentPlayer

        //currentPlayer = currentPlayer == X ? O: X   another way of doing the if else
        if (boxSpace.includes(null)== false && win() == false){
            playerText.innerText = "RESULT: TIE"
            tie+=1
            score.innerText = `${winX} - ${tie} - ${win0}`

        
         }
        
         if (win()!=false){
            playerText.innerText = `RESULT: ${currentPlayer} WINS`
            if (currentPlayer ==X){
                winX+=1
            }
            else{
                win0 +=1
            }

            console.log(winX)
            score.innerText = `${winX} - ${tie} - ${win0}`
            let blocks = win()
        
            blocks.map(box => boxes[box].style.backgroundColor = indicator)
        
        }
        if(currentPlayer ==X){
            currentPlayer = O
        }
        else{
            currentPlayer = X
        }


        
    }
    // elif (win()!=false){
    //     event.target.innerText = ""
    // }
    
   
}




function win(){

    for (let i = 0; i < boxSpace.length; i++) {
        // i did console log in here to check where the code was reaching due to an error
        // helps to see how many times the console was logged(idk if phrase makes sense)
        // based on that i was able to fix the error
        if(boxSpace[i]!= null && i%3 == 0 && (boxSpace[i] == boxSpace[i+1] && boxSpace[i]== boxSpace[i+2])){
            return [i, i+1, i+2]


        }
        if(boxSpace[i]!= null && i < 3 && (boxSpace[i] == boxSpace[i+3] && boxSpace[i] == boxSpace[i+6])){
            return [i, i+3, i+6]
        }
        if(boxSpace[i]!= null && i == 2 && (boxSpace[i] == boxSpace[i+2] && boxSpace[i] == boxSpace[i+4])){
            return [i, i+2, i+4]
        }
        if(boxSpace[i]!= null && i == 0 && (boxSpace[i] == boxSpace[i+4] && boxSpace[i] == boxSpace[i+8])){
            return [i, i+4, i+8]
        }  
    }
    return false

}

newGame.addEventListener("click", restart)

function restart(){
    boxSpace.fill(null)
    boxes.forEach(box => {
        box.innerText = ""
        box.style.backgroundColor = ""
    })

    playerText.innerText = "RESULT: -"
    currentPlayer = X


}


start()

