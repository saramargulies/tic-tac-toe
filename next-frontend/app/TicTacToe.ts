
export class TicTacToe {
    board: string[];
    winningConditions: number[][]

    constructor(){
        this.board = ["", "", "", "", "", "", "", "", ""]
        this.winningConditions = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [6,4,2]]
    }

    takeTurn(index: number, player: string){
        console.log(index, player)
        this.board[index] = player
        console.log(this.board)
        this.checkForWinner
    }
    checkForWinner(){
        let xSpots = []
        let ySpots = []

        for (let i = 0; i < this.board.length; i++){
            if (this.board[i]==="X"){
                xSpots.push(i)
            } else if (this.board[i]==="Y") {
                ySpots.push(i)
            }
        }
        for (let winningCondition of this.winningConditions){
            if (winningCondition.every((value: number)=>xSpots.includes(value))){
                console.log("X is the winner!")
                return
            }
            if (winningCondition.every((value: number)=>ySpots.includes(value))){
                console.log("Y is the winner")
                return
            }
            console.log(xSpots, xSpots.length)
            console.log(ySpots, ySpots.length)
            if (xSpots.length + ySpots.length<this.board.length){
                console.log("No one has won yet")
                return
            } else {
                console.log("It's a tie")
                return
            }
        }
    }
}

const newBoard = new TicTacToe()
newBoard.takeTurn(0, "X")
newBoard.checkForWinner()