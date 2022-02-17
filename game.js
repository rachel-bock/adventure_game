const textElement = document.getElementById(`text`);
const optionButtonsElement = document.getElementById(`option-buttons`);

let inventory = {};

const plotPoints = [
  {
    id: 1,
    plotDescription: 'You wake up in a strange place. Beside you is a note and a bag.',
    options: [
      {
        text: 'Read note.', 
        setInventory: {note: true},
        nextPlotPoint: 2
      }, 
      {
        text: 'Shove note in your pocket and walk towards door.', 
        setInventory: {note: true},
        nextPlotPoint: 3
      }, 
      {
        text: "Pick up bag and walk towards door",
        setInventory: {bag: true},
        nextPlotPoint: 3
      }, 
      {
        text: "Leave note and bag.  Walk towards door.",
        setInventory: {note: false, bag: false },
        nextPlotPoint: 3
      }
    ]
  }, 
  {
    id: 2,
    plotDescription: 'You read the note.  It says, "Stay clear of the door." You exit through the window.', 
    options: [
      {
        text: 'Go west.', 
        nextPlotPoint: -1
      }, 
      {
        text: 'Go east.',
        nextPlotPoint: 4
      }
    ]
  },
  {
    id: 3, 
    plotDescription: "As you open the door, a bomb explodes throwing you throw the window.", 
    options: [
      {
        text: 'Read note before you die', 
        required: (theInventory) => theInventory.note, 
        nextPlotPoint: 5
      },
      {
        text: 'Mumble something and die. Restart game.', 
        nextPlotPoint: -1
      }
    ]
  }, 
  {
    id: 4,
    plotDescription: "You decide to go east.  As you walk east, you notice a hill with a cottage on it.",
    options: [
      {
        text: "Explore cottage.",
        nextPlotPoint: -1
      }, 
      {
        text: "Continue walking east", 
        nextPlotPoint: -1
      }, 
      {
        text: "Sit down and explore contents of bag",
        required: (theInventory) => theInventory.bag,
        nextPlotPoint: -1
      }, 
      {
        text: "Examine note closer", 
        required: (theInventory) => theInventory.note,
        nextPlotPoint: -1
      }
    ]
  },
  {
    id: 5, 
    plotDescription: "You decide to read the note. It warned to you stay away from the door.  You died.", 
    options: [{
      text: "Restart game", 
      nextPlotPoint: -1
    }]
  },
  {
    id: 1,
    plotDescription: 'You wake up in a strange place. Beside you is a note and a bag.',
    options: [
      {
        text: 'Read note.', 
        nextPlotPoint: 2
      }, 
      {
        text: 'Shove note in your pocket and walk towards door.', 
        setInventory: {note: true},
        nextPlotPoint: 3
      }, 
      {
        text: "Pick up bag.",
        setInventory: {bag: true},
        nextPlotPoint: 2
      }, 
      {
        text: "Leave note and bag.  Walk towards door.",
        setInventory: {note: false, bag: false },
        nextPlotPoint: 3
      }
    ]
  }, 
  {
    id: 1,
    plotDescription: 'You wake up in a strange place. Beside you is a note and a bag.',
    options: [
      {
        text: 'Read note.', 
        nextPlotPoint: 2
      }, 
      {
        text: 'Shove note in your pocket and walk towards door.', 
        setInventory: {note: true},
        nextPlotPoint: 3
      }, 
      {
        text: "Pick up bag.",
        setInventory: {bag: true},
        nextPlotPoint: 2
      }, 
      {
        text: "Leave note and bag.  Walk towards door.",
        setInventory: {note: false, bag: false },
        nextPlotPoint: 3
      }
    ]
  }, 
  {
    id: 1,
    plotDescription: 'You wake up in a strange place. Beside you is a note and a bag.',
    options: [
      {
        text: 'Read note.', 
        nextPlotPoint: 2
      }, 
      {
        text: 'Shove note in your pocket and walk towards door.', 
        setInventory: {note: true},
        nextPlotPoint: 3
      }, 
      {
        text: "Pick up bag.",
        setInventory: {bag: true},
        nextPlotPoint: 2
      }, 
      {
        text: "Leave note and bag.  Walk towards door.",
        setInventory: {note: false, bag: false },
        nextPlotPoint: 3
      }
    ]
  }, 
  {
    id: 1,
    plotDescription: 'You wake up in a strange place. Beside you is a note and a bag.',
    options: [
      {
        text: 'Read note.', 
        nextPlotPoint: 2
      }, 
      {
        text: 'Shove note in your pocket and walk towards door.', 
        setInventory: {note: true},
        nextPlotPoint: 3
      }, 
      {
        text: "Pick up bag.",
        setInventory: {bag: true},
        nextPlotPoint: 2
      }, 
      {
        text: "Leave note and bag.  Walk towards door.",
        setInventory: {note: false, bag: false },
        nextPlotPoint: 3
      }
    ]
  }, 
  {
    id: 1,
    plotDescription: 'You wake up in a strange place. Beside you is a note and a bag.',
    options: [
      {
        text: 'Read note.', 
        nextPlotPoint: 2
      }, 
      {
        text: 'Shove note in your pocket and walk towards door.', 
        setInventory: {note: true},
        nextPlotPoint: 3
      }, 
      {
        text: "Pick up bag.",
        setInventory: {bag: true},
        nextPlotPoint: 2
      }, 
      {
        text: "Leave note and bag.  Walk towards door.",
        setInventory: {note: false, bag: false },
        nextPlotPoint: 3
      }
    ]
  }, 
  {
    id: 1,
    plotDescription: 'You wake up in a strange place. Beside you is a note and a bag.',
    options: [
      {
        text: 'Read note.', 
        nextPlotPoint: 2
      }, 
      {
        text: 'Shove note in your pocket and walk towards door.', 
        setInventory: {note: true},
        nextPlotPoint: 3
      }, 
      {
        text: "Pick up bag.",
        setInventory: {bag: true},
        nextPlotPoint: 2
      }, 
      {
        text: "Leave note and bag.  Walk towards door.",
        setInventory: {note: false, bag: false },
        nextPlotPoint: 3
      }
    ]
  }, 
  {
    id: 1,
    plotDescription: 'You wake up in a strange place. Beside you is a note and a bag.',
    options: [
      {
        text: 'Read note.', 
        nextPlotPoint: 2
      }, 
      {
        text: 'Shove note in your pocket and walk towards door.', 
        setInventory: {note: true},
        nextPlotPoint: 3
      }, 
      {
        text: "Pick up bag.",
        setInventory: {bag: true},
        nextPlotPoint: 2
      }, 
      {
        text: "Leave note and bag.  Walk towards door.",
        setInventory: {note: false, bag: false },
        nextPlotPoint: 3
      }
    ]
  }, 
  {
    id: 1,
    plotDescription: 'You wake up in a strange place. Beside you is a note and a bag.',
    options: [
      {
        text: 'Read note.', 
        nextPlotPoint: 2
      }, 
      {
        text: 'Shove note in your pocket and walk towards door.', 
        setInventory: {note: true},
        nextPlotPoint: 3
      }, 
      {
        text: "Pick up bag.",
        setInventory: {bag: true},
        nextPlotPoint: 2
      }, 
      {
        text: "Leave note and bag.  Walk towards door.",
        setInventory: {note: false, bag: false },
        nextPlotPoint: 3
      }
    ]
  }, 
  {
    id: 1,
    plotDescription: 'You wake up in a strange place. Beside you is a note and a bag.',
    options: [
      {
        text: 'Read note.', 
        nextPlotPoint: 2
      }, 
      {
        text: 'Shove note in your pocket and walk towards door.', 
        setInventory: {note: true},
        nextPlotPoint: 3
      }, 
      {
        text: "Pick up bag.",
        setInventory: {bag: true},
        nextPlotPoint: 2
      }, 
      {
        text: "Leave note and bag.  Walk towards door.",
        setInventory: {note: false, bag: false },
        nextPlotPoint: 3
      }
    ]
  }, 
  {
    id: 1,
    plotDescription: 'You wake up in a strange place. Beside you is a note and a bag.',
    options: [
      {
        text: 'Read note.', 
        nextPlotPoint: 2
      }, 
      {
        text: 'Shove note in your pocket and walk towards door.', 
        setInventory: {note: true},
        nextPlotPoint: 3
      }, 
      {
        text: "Pick up bag.",
        setInventory: {bag: true},
        nextPlotPoint: 2
      }, 
      {
        text: "Leave note and bag.  Walk towards door.",
        setInventory: {note: false, bag: false },
        nextPlotPoint: 3
      }
    ]
  }, 
  {
    id: 1,
    plotDescription: 'You wake up in a strange place. Beside you is a note and a bag.',
    options: [
      {
        text: 'Read note.', 
        nextPlotPoint: 2
      }, 
      {
        text: 'Shove note in your pocket and walk towards door.', 
        setInventory: {note: true},
        nextPlotPoint: 3
      }, 
      {
        text: "Pick up bag.",
        setInventory: {bag: true},
        nextPlotPoint: 2
      }, 
      {
        text: "Leave note and bag.  Walk towards door.",
        setInventory: {note: false, bag: false },
        nextPlotPoint: 3
      }
    ]
  }, 
  {
    id: 1,
    plotDescription: 'You wake up in a strange place. Beside you is a note and a bag.',
    options: [
      {
        text: 'Read note.', 
        nextPlotPoint: 2
      }, 
      {
        text: 'Shove note in your pocket and walk towards door.', 
        setInventory: {note: true},
        nextPlotPoint: 3
      }, 
      {
        text: "Pick up bag.",
        setInventory: {bag: true},
        nextPlotPoint: 2
      }, 
      {
        text: "Leave note and bag.  Walk towards door.",
        setInventory: {note: false, bag: false },
        nextPlotPoint: 3
      }
    ]
  }, 
  {
    id: 1,
    plotDescription: 'You wake up in a strange place. Beside you is a note and a bag.',
    options: [
      {
        text: 'Read note.', 
        nextPlotPoint: 2
      }, 
      {
        text: 'Shove note in your pocket and walk towards door.', 
        setInventory: {note: true},
        nextPlotPoint: 3
      }, 
      {
        text: "Pick up bag.",
        setInventory: {bag: true},
        nextPlotPoint: 2
      }, 
      {
        text: "Leave note and bag.  Walk towards door.",
        setInventory: {note: false, bag: false },
        nextPlotPoint: 3
      }
    ]
  }, 
  {
    id: 1,
    plotDescription: 'You wake up in a strange place. Beside you is a note and a bag.',
    options: [
      {
        text: 'Read note.', 
        nextPlotPoint: 2
      }, 
      {
        text: 'Shove note in your pocket and walk towards door.', 
        setInventory: {note: true},
        nextPlotPoint: 3
      }, 
      {
        text: "Pick up bag.",
        setInventory: {bag: true},
        nextPlotPoint: 2
      }, 
      {
        text: "Leave note and bag.  Walk towards door.",
        setInventory: {note: false, bag: false },
        nextPlotPoint: 3
      }
    ]
  }, 
  {
    id: 1,
    plotDescription: 'You wake up in a strange place. Beside you is a note and a bag.',
    options: [
      {
        text: 'Read note.', 
        nextPlotPoint: 2
      }, 
      {
        text: 'Shove note in your pocket and walk towards door.', 
        setInventory: {note: true},
        nextPlotPoint: 3
      }, 
      {
        text: "Pick up bag.",
        setInventory: {bag: true},
        nextPlotPoint: 2
      }, 
      {
        text: "Leave note and bag.  Walk towards door.",
        setInventory: {note: false, bag: false },
        nextPlotPoint: 3
      }
    ]
  }, 
  {
    id: 1,
    plotDescription: 'You wake up in a strange place. Beside you is a note and a bag.',
    options: [
      {
        text: 'Read note.', 
        nextPlotPoint: 2
      }, 
      {
        text: 'Shove note in your pocket and walk towards door.', 
        setInventory: {note: true},
        nextPlotPoint: 3
      }, 
      {
        text: "Pick up bag.",
        setInventory: {bag: true},
        nextPlotPoint: 2
      }, 
      {
        text: "Leave note and bag.  Walk towards door.",
        setInventory: {note: false, bag: false },
        nextPlotPoint: 3
      }
    ]
  }, 
  {
    id: 1,
    plotDescription: 'You wake up in a strange place. Beside you is a note and a bag.',
    options: [
      {
        text: 'Read note.', 
        nextPlotPoint: 2
      }, 
      {
        text: 'Shove note in your pocket and walk towards door.', 
        setInventory: {note: true},
        nextPlotPoint: 3
      }, 
      {
        text: "Pick up bag.",
        setInventory: {bag: true},
        nextPlotPoint: 2
      }, 
      {
        text: "Leave note and bag.  Walk towards door.",
        setInventory: {note: false, bag: false },
        nextPlotPoint: 3
      }
    ]
  }, 
  {
    id: 1,
    plotDescription: 'You wake up in a strange place. Beside you is a note and a bag.',
    options: [
      {
        text: 'Read note.', 
        nextPlotPoint: 2
      }, 
      {
        text: 'Shove note in your pocket and walk towards door.', 
        setInventory: {note: true},
        nextPlotPoint: 3
      }, 
      {
        text: "Pick up bag.",
        setInventory: {bag: true},
        nextPlotPoint: 2
      }, 
      {
        text: "Leave note and bag.  Walk towards door.",
        setInventory: {note: false, bag: false },
        nextPlotPoint: 3
      }
    ]
  }, 
  {
    id: 1,
    plotDescription: 'You wake up in a strange place. Beside you is a note and a bag.',
    options: [
      {
        text: 'Read note.', 
        nextPlotPoint: 2
      }, 
      {
        text: 'Shove note in your pocket and walk towards door.', 
        setInventory: {note: true},
        nextPlotPoint: 3
      }, 
      {
        text: "Pick up bag.",
        setInventory: {bag: true},
        nextPlotPoint: 2
      }, 
      {
        text: "Leave note and bag.  Walk towards door.",
        setInventory: {note: false, bag: false },
        nextPlotPoint: 3
      }
    ]
  }, 
  {
    id: 1,
    plotDescription: 'You wake up in a strange place. Beside you is a note and a bag.',
    options: [
      {
        text: 'Read note.', 
        nextPlotPoint: 2
      }, 
      {
        text: 'Shove note in your pocket and walk towards door.', 
        setInventory: {note: true},
        nextPlotPoint: 3
      }, 
      {
        text: "Pick up bag.",
        setInventory: {bag: true},
        nextPlotPoint: 2
      }, 
      {
        text: "Leave note and bag.  Walk towards door.",
        setInventory: {note: false, bag: false },
        nextPlotPoint: 3
      }
    ]
  }, 
  {
    id: 1,
    plotDescription: 'You wake up in a strange place. Beside you is a note and a bag.',
    options: [
      {
        text: 'Read note.', 
        nextPlotPoint: 2
      }, 
      {
        text: 'Shove note in your pocket and walk towards door.', 
        setInventory: {note: true},
        nextPlotPoint: 3
      }, 
      {
        text: "Pick up bag.",
        setInventory: {bag: true},
        nextPlotPoint: 2
      }, 
      {
        text: "Leave note and bag.  Walk towards door.",
        setInventory: {note: false, bag: false },
        nextPlotPoint: 3
      }
    ]
  }, 
  {
    id: 1,
    plotDescription: 'You wake up in a strange place. Beside you is a note and a bag.',
    options: [
      {
        text: 'Read note.', 
        nextPlotPoint: 2
      }, 
      {
        text: 'Shove note in your pocket and walk towards door.', 
        setInventory: {note: true},
        nextPlotPoint: 3
      }, 
      {
        text: "Pick up bag.",
        setInventory: {bag: true},
        nextPlotPoint: 2
      }, 
      {
        text: "Leave note and bag.  Walk towards door.",
        setInventory: {note: false, bag: false },
        nextPlotPoint: 3
      }
    ]
  }, 
  {
    id: 1,
    plotDescription: 'You wake up in a strange place. Beside you is a note and a bag.',
    options: [
      {
        text: 'Read note.', 
        nextPlotPoint: 2
      }, 
      {
        text: 'Shove note in your pocket and walk towards door.', 
        setInventory: {note: true},
        nextPlotPoint: 3
      }, 
      {
        text: "Pick up bag.",
        setInventory: {bag: true},
        nextPlotPoint: 2
      }, 
      {
        text: "Leave note and bag.  Walk towards door.",
        setInventory: {note: false, bag: false },
        nextPlotPoint: 3
      }
    ]
  }, 
  {
    id: 1,
    plotDescription: 'You wake up in a strange place. Beside you is a note and a bag.',
    options: [
      {
        text: 'Read note.', 
        nextPlotPoint: 2
      }, 
      {
        text: 'Shove note in your pocket and walk towards door.', 
        setInventory: {note: true},
        nextPlotPoint: 3
      }, 
      {
        text: "Pick up bag.",
        setInventory: {bag: true},
        nextPlotPoint: 2
      }, 
      {
        text: "Leave note and bag.  Walk towards door.",
        setInventory: {note: false, bag: false },
        nextPlotPoint: 3
      }
    ]
  }, 
  {
    id: 1,
    plotDescription: 'You wake up in a strange place. Beside you is a note and a bag.',
    options: [
      {
        text: 'Read note.', 
        nextPlotPoint: 2
      }, 
      {
        text: 'Shove note in your pocket and walk towards door.', 
        setInventory: {note: true},
        nextPlotPoint: 3
      }, 
      {
        text: "Pick up bag.",
        setInventory: {bag: true},
        nextPlotPoint: 2
      }, 
      {
        text: "Leave note and bag.  Walk towards door.",
        setInventory: {note: false, bag: false },
        nextPlotPoint: 3
      }
    ]
  }, 
  {
    id: 1,
    plotDescription: 'You wake up in a strange place. Beside you is a note and a bag.',
    options: [
      {
        text: 'Read note.', 
        nextPlotPoint: 2
      }, 
      {
        text: 'Shove note in your pocket and walk towards door.', 
        setInventory: {note: true},
        nextPlotPoint: 3
      }, 
      {
        text: "Pick up bag.",
        setInventory: {bag: true},
        nextPlotPoint: 2
      }, 
      {
        text: "Leave note and bag.  Walk towards door.",
        setInventory: {note: false, bag: false },
        nextPlotPoint: 3
      }
    ]
  }, 
  {
    id: 1,
    plotDescription: 'You wake up in a strange place. Beside you is a note and a bag.',
    options: [
      {
        text: 'Read note.', 
        nextPlotPoint: 2
      }, 
      {
        text: 'Shove note in your pocket and walk towards door.', 
        setInventory: {note: true},
        nextPlotPoint: 3
      }, 
      {
        text: "Pick up bag.",
        setInventory: {bag: true},
        nextPlotPoint: 2
      }, 
      {
        text: "Leave note and bag.  Walk towards door.",
        setInventory: {note: false, bag: false },
        nextPlotPoint: 3
      }
    ]
  }, 
  {
    id: 1,
    plotDescription: 'You wake up in a strange place. Beside you is a note and a bag.',
    options: [
      {
        text: 'Read note.', 
        nextPlotPoint: 2
      }, 
      {
        text: 'Shove note in your pocket and walk towards door.', 
        setInventory: {note: true},
        nextPlotPoint: 3
      }, 
      {
        text: "Pick up bag.",
        setInventory: {bag: true},
        nextPlotPoint: 2
      }, 
      {
        text: "Leave note and bag.  Walk towards door.",
        setInventory: {note: false, bag: false },
        nextPlotPoint: 3
      }
    ]
  }, 
  {
    id: 1,
    plotDescription: 'You wake up in a strange place. Beside you is a note and a bag.',
    options: [
      {
        text: 'Read note.', 
        nextPlotPoint: 2
      }, 
      {
        text: 'Shove note in your pocket and walk towards door.', 
        setInventory: {note: true},
        nextPlotPoint: 3
      }, 
      {
        text: "Pick up bag.",
        setInventory: {bag: true},
        nextPlotPoint: 2
      }, 
      {
        text: "Leave note and bag.  Walk towards door.",
        setInventory: {note: false, bag: false },
        nextPlotPoint: 3
      }
    ]
  }, 
  {
    id: 1,
    plotDescription: 'You wake up in a strange place. Beside you is a note and a bag.',
    options: [
      {
        text: 'Read note.', 
        nextPlotPoint: 2
      }, 
      {
        text: 'Shove note in your pocket and walk towards door.', 
        setInventory: {note: true},
        nextPlotPoint: 3
      }, 
      {
        text: "Pick up bag.",
        setInventory: {bag: true},
        nextPlotPoint: 2
      }, 
      {
        text: "Leave note and bag.  Walk towards door.",
        setInventory: {note: false, bag: false },
        nextPlotPoint: 3
      }
    ]
  }, 
  {
    id: 1,
    plotDescription: 'You wake up in a strange place. Beside you is a note and a bag.',
    options: [
      {
        text: 'Read note.', 
        nextPlotPoint: 2
      }, 
      {
        text: 'Shove note in your pocket and walk towards door.', 
        setInventory: {note: true},
        nextPlotPoint: 3
      }, 
      {
        text: "Pick up bag.",
        setInventory: {bag: true},
        nextPlotPoint: 2
      }, 
      {
        text: "Leave note and bag.  Walk towards door.",
        setInventory: {note: false, bag: false },
        nextPlotPoint: 3
      }
    ]
  }, 
  {
    id: 1,
    plotDescription: 'You wake up in a strange place. Beside you is a note and a bag.',
    options: [
      {
        text: 'Read note.', 
        nextPlotPoint: 2
      }, 
      {
        text: 'Shove note in your pocket and walk towards door.', 
        setInventory: {note: true},
        nextPlotPoint: 3
      }, 
      {
        text: "Pick up bag.",
        setInventory: {bag: true},
        nextPlotPoint: 2
      }, 
      {
        text: "Leave note and bag.  Walk towards door.",
        setInventory: {note: false, bag: false },
        nextPlotPoint: 3
      }
    ]
  }, 
  {
    id: 1,
    plotDescription: 'You wake up in a strange place. Beside you is a note and a bag.',
    options: [
      {
        text: 'Read note.', 
        nextPlotPoint: 2
      }, 
      {
        text: 'Shove note in your pocket and walk towards door.', 
        setInventory: {note: true},
        nextPlotPoint: 3
      }, 
      {
        text: "Pick up bag.",
        setInventory: {bag: true},
        nextPlotPoint: 2
      }, 
      {
        text: "Leave note and bag.  Walk towards door.",
        setInventory: {note: false, bag: false },
        nextPlotPoint: 3
      }
    ]
  }, 
  {
    id: 1,
    plotDescription: 'You wake up in a strange place. Beside you is a note and a bag.',
    options: [
      {
        text: 'Read note.', 
        nextPlotPoint: 2
      }, 
      {
        text: 'Shove note in your pocket and walk towards door.', 
        setInventory: {note: true},
        nextPlotPoint: 3
      }, 
      {
        text: "Pick up bag.",
        setInventory: {bag: true},
        nextPlotPoint: 2
      }, 
      {
        text: "Leave note and bag.  Walk towards door.",
        setInventory: {note: false, bag: false },
        nextPlotPoint: 3
      }
    ]
  }
 
]

function startGame(){
  inventory = { }
  displayPlotPoint(1);
}

function displayPlotPoint (pointNumber) {
  // Using pointNumber, find plotPoint with the id equal to pointNumber.
  let myPlotPoint = plotPoints.filter(plotPoint => plotPoint.id === pointNumber)[0];

  // Display the plotDescription from the plotPoint with id equal to pointNumber.
  textElement.innerText = myPlotPoint.plotDescription;

  // Display the options associated with the plotPoint.
    // Remove the old option buttons.
  while(optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild);
  }
    // Create the new option buttons.
  myPlotPoint.options.forEach(option => {
  // Check if the required inventory is available to determine what options to display.
  if ( filterOptionButtons(option) ){
      const button = document.createElement('button');
      button.innerText = option.text;
      button.classList.add('btn');
      button.addEventListener('click', () => optionSelection (option));
      optionButtonsElement.appendChild(button);
    }
  });
}

function filterOptionButtons(option){
  return option.required == null || option.required(inventory);
}

function optionSelection (option){
  // If the option is a valid plot point, display next plot point.  Otherwise, restart game.
  if(option.nextPlotPoint <= 0){
    startGame();
  } else {
    inventory = Object.assign(inventory, option.setInventory);
    displayPlotPoint(option.nextPlotPoint);
  }
}

startGame();