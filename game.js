const textElement = document.getElementById(`text`);
const optionButtonsElement = document.getElementById(`option-buttons`);

let inventory = {};

const plotPoints = [
  {
    id: 1,
    plotDescription: 'You wake up in a strange place. Beside you is a note.',
    options: [
      {
        text: 'Read note.', 
        setInventory: {note: true},
        nextPlotPoint: 2
      }, 
      {
        text: "Save note for later",
        setInventory: {note: true, readNote: false},
        nextPlotPoint: -1
      } 
    ]
  }, 
  {
    id: 2,
    plotDescription: 'You read the note.  It says, "Stay clear of the door." You look around and see a window. You decide to exit through the window when you leave.', 
    options: [
      { 
        text: 'Search the room',
        setInventory: {readNote: true},
        nextPlotPoint: 4
      },
      {
        text: 'Exit through window.',
        required: (theInventory) => theInventory.note,
        setInventory: {readNote: true},
        nextPlotPoint: 40
      }
    ]
  },
  {
    id: 3, 
    plotDescription: "You search through the bag finding food and money.", 
    options: [
      {
        text: 'Eat the food in the bag', 
        setInventory: {ateFood: true, searchBag: true, money: true},
        nextPlotPoint: 5
      },
      {
        text: 'Search the room', 
        setInventory: {money: true, food:true, searchBag: true},
        nextPlotPoint: 4
      }, 
      {
        text: "Read note", 
        required: (theInventory) => theInventory.note,
        setInventory: {searchBag: true},
        nextPlotPoint: 2
      },
      {
        text: 'Exit through window.',
        required: (theInventory) => theInventory.readNote,
        nextPlotPoint: 40
      }
    ]
  }, 
  {
    id: 4,
    plotDescription: "You search the room.  It appears to be an office.  You see a filing cabinet and a desk. ",
    options: [
      {
        text: "Search the desk",
        setInventory: {desk: true, filingCabinet: true, searchDesk: true},
        nextPlotPoint: 6
      },
      {
        text: "Search the filing cabinet", 
        setInventory: {desk: true, filingCabinet: true, searchFilingCabinet: true},
        nextPlotPoint: -1
      },
      {
        text: "Read the note",
        required: (theInventory) => !theInventory.readNote && theInventory.note, 
        nextPlotPoint: 2
      }, 
      {
        text: 'Exit through window.',
        required: (theInventory) => theInventory.readNote,
        nextPlotPoint: 40
      }
    ]
  },
  {
    id: 5, 
    plotDescription: "You ate all the food in the bag.  Now, your stomach is churning.", 
    options: [{
      text: "Rush to the door to find a place to throw up.", 
      nextPlotPoint: 39
    }, 
    {
      text: "Quickly find a trash can and toss those cookies!",
      setInventory: {food: false},
      nextPlotPoint: 7
    }
  ]
  },
  {
    id: 6,
    plotDescription: "You decide to search the desk.  In the second drawer, there is a map of Wisconsin from 1945.",
    options: [
      {
        text: 'Save the map in the bag.', 
        required: (theInventory) => theInventory.bag,
        setInventory: {map: true},
        nextPlotPoint: 8
      }, 
      {
        text: 'Continue searching the desk.', 
        nextPlotPoint: 9
      }, 
      {
        text: 'Exit through window.',
        required: (theInventory) => theInventory.note,
        nextPlotPoint: 40
      }
    ]
  }, 
  {
    id: 7,
    plotDescription: 'You feel better now.',
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
        text: 'Exit through window.',
        required: (theInventory) => theInventory.note,
        nextPlotPoint: 40
      }
    ]
  }, 
  {
    id: 8,
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
      }
    ]
  }, 
  {
    id: 9,
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
      }
    ]
  }, 
  {
    id: 10,
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
      }
    ]
  }, 
  {
    id: 11,
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
      }
    ]
  }, 
  {
    id: 12,
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
      }
    ]
  }, 
  {
    id: 13,
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
      }
    ]
  }, 
  {
    id: 14,
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
      }
    ]
  }, 
  {
    id: 15,
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
      }
    ]
  }, 
  {
    id: 16,
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
      }
    ]
  }, 
  {
    id: 17,
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
      }
    ]
  }, 
  {
    id: 18,
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
      }
    ]
  }, 
  {
    id: 19,
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
      }
    ]
  }, 
  {
    id: 20,
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
      }
    ]
  }, 
  {
    id: 21,
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
      }
    ]
  }, 
  {
    id: 22,
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
      }
    ]
  }, 
  {
    id: 23,
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
      }
    ]
  }, 
  {
    id: 24,
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
      }
    ]
  }, 
  {
    id: 25,
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
      }
    ]
  }, 
  {
    id: 26,
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
      }
    ]
  }, 
  {
    id: 27,
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
      }
    ]
  }, 
  {
    id: 28,
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
      }
    ]
  }, 
  {
    id: 29,
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
      }
    ]
  }, 
  {
    id: 30,
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
      }
    ]
  }, 
  {
    id: 31,
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
      }
    ]
  }, 
  {
    id: 32,
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
      }
    ]
  }, 
  {
    id: 33,
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
      }
    ]
  }, 
  {
    id: 34,
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
      }
    ]
  }, 
  {
    id: 35,
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
      }
    ]
  }, 
  {
    id: 36,
    plotDescription: 'Please choose again.  Other games are under construction and unavailable.  What game would you like to play?',
    options: [
      {
        text: 'Search the room', 
        nextPlotPoint: 1
      }
    ]
  }, 
  {
    id: 37,
    plotDescription: 'Welcome to the adventure games.  What game would you like to play?',
    options: [
      {
        text: 'Search the room.', 
        nextPlotPoint: 1
      }, 
      {
        text: 'Other games (Under construction)', 
        nextPlotPoint: 36
      }
    ]
  }, 
  {
    id: 38,
    plotDescription: 'You read the note.  It warned you to stay away from the door.  You died.',
    options: [
      {
        text: 'Restart the game.', 
        nextPlotPoint: -1
      }
    ]
  }, 
  {
    id: 39,
    plotDescription: 'As you open the door, a bomb explodes.  You are thrown through the window.',
    options: [
      {
        text: 'Read the note before you die.', 
        required: (theInventory) => theInventory.note,
        nextPlotPoint: 38
      }, 
      {
        text: 'Murmur something and die.  Restart the game.', 
        nextPlotPoint: -1
      }
    ]
  },
  {
    id: 40,
    plotDescription: 'Congratulations.  You decided to exit through the window. You see a horse, get on it and ride off into the sunset.',
    options: [
      {
        text: 'Restart the game.', 
        nextPlotPoint: -1
      }
    ]
  }
]

function startGame(){
  inventory = { }
  displayPlotPoint(37);
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