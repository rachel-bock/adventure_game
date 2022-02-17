const textElement = document.getElementById(`text`);
const optionButtonsElement = document.getElementById(`option-buttons`);

let state = {};

function startGame(){
  state = {}
  displayPlotPoint(1);
}

function displayPlotPoint (pointNumber) {
  // Using pointNumber, find plotPoint with the id equal to pointNumber.
  let myPlotPoint = plotPoints.filter(plotPoint => plotPoint.id === pointNumber);
  console.log(myPlotPoint);

  // Display the plotDescription from the plotPoint with id equal to pointNumber.
  textElement.innerText = myPlotPoint[0].plotDescription;

  // Display the options associated with the plotPoint.
    // Remove the old option buttons.
    // Create the new option buttons.  
  

}

const plotPoints = [
  {
    id: 1,
    plotDescription: 'You wake up in a strange place. Beside you is a note.',
    options: [
      {
        text: 'Read note.', 
        nextPlotPoint: 2
      }, 
      {
        text: 'Shove note in your pocket and walk towards door.', 
        nextPlotPoint: 3
      }
    ]
  }, 
  {
    id: 2,
    plotDescription: 'You read the note.  It says, "Stay clear of the door." ', 
    options: [
      {
        text: 'Congratulations.  Play again.', 
        nextPlotPoint: -1
      }
    ]
  },
  {
    id: 3, 
    plotDescription: 'You git hit by door on your way out.  You died.', 
    options: [
      {
        text: 'Restart game.', 
        nextPlotPoint: -1
      }
    ]
  }
]

startGame();