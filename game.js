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
        setInventory: {note: true, readNote: true},
        nextPlotPoint: 2
      }, 
      {
        text: "Save the note for later",
        setInventory: {note: true, readNote: false},
        nextPlotPoint: 3
      } 
    ]
  }, 
  {
    id: 2,
    plotDescription: 'You read the note.  It says, "Stay clear of the door." You look around and see a window. You decide to exit through the window when you leave.', 
    options: [
      {
        text: 'Search the room', 
        setInventory: {searchBag: true}, 
        nextPlotPoint: 3
      },
      { 
        text: 'Search the desk',
        required: (theInventory) => !theInventory.searchDesk && theInventory.desk,
        setInventory: {searchDesk: true},
        nextPlotPoint: 6
      },
      {
        text: 'Search the filing cabinet', 
        required: (theInventory) => !theInventory.searchFilingCabinet && theInventory.filingCabinet, 
        setInventory: {searchFilingCabinet: true}, 
        nextPlotPoint: 9
      },
      {
        text: 'Search the briefcase', 
        required: (theInventory) => !theInventory.searchBriefcase && theInventory.bag,
        setInventory: {searchBriefcase: true}, 
        nextPlotPoint: 7
      },
      {
        text: 'Open the folder on the desk', 
        required: (theInventory) => !theInventory.openFolder && theInventory.searchBriefcase,
        setInventory: {openFolder: true}, 
        nextPlotPoint: 8
      }, 
      {
        text: 'Exit through window.',
        required: (theInventory) => theInventory.readNote,
        setInventory: {windowExit: true},
        nextPlotPoint: 40
      }
    ]
  },
  {
    id: 3, 
    plotDescription: "You search through the room and see a bag.  You search through the bag finding food and money.", 
    options: [
      {
        text: 'Eat the food in the bag', 
        setInventory: {ateFood: true, money: true},
        nextPlotPoint: 5
      },
      {
        text: 'Save the food for later.', 
        setInventory: {money: true, food:true},
        nextPlotPoint: 4
      }, 
      {
        text: "Read the note you found earlier", 
        required: (theInventory) => theInventory.note && !theInventory.readNote,
        setInventory: {money: true, food: true, readNote: true},
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
    plotDescription: "You search the room more.  It appears to be an office.  You see a filing cabinet and a desk.",
    options: [
      {
        text: "Search the desk",
        required: (theInventory) => !theInventory.searchDesk,
        setInventory: {desk: true, filingCabinet: true, searchDesk: true},
        nextPlotPoint: 6
      },
      {
        text: "Search the filing cabinet", 
        required: (theInventory) => !theInventory.searchFilingCabinet,
        setInventory: {desk: true, filingCabinet: true, searchFilingCabinet: true},
        nextPlotPoint: 9
      },
      {
        text: "Read the note you found earlier",
        required: (theInventory) => !theInventory.readNote && theInventory.note, 
        setInventory: {readNote: true},
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
    plotDescription: "You ate all the food in the bag.  Now, your stomach is churning. You may be getting food poisoning.", 
    options: [
      {
        text: "Rush to the door to find a place to throw up.", 
        setInventory: {food: false},
        nextPlotPoint: 39
      }, 
      {
        text: "Quickly find a trash can and toss those cookies!",
        setInventory: {food: false},
        nextPlotPoint: 4
      },
      {
        text: "Read the note you found earlier",
        required: (theInventory) => !theInventory.readNote && theInventory.note, 
        setInventory: {readNote: true},
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
    id: 6,
    plotDescription: "You decide to search the desk.  On the top of the desk, there is a briefcase.  The first drawer has pens and paperclips. In the second drawer, there is a map of Wisconsin from 1945.",
    options: [
      {
        text: 'Search briefcase', 
        required: (theInventory) => !theInventory.searchBriefcase,
        setInventory: {searchBriefcase: true},
        nextPlotPoint: 7
      }, 
      {
        text: 'Search filing cabinet', 
        required: (theInventory) => !theInventory.searchFilingCabinet && theInventory.filingCabinet,
        setInventory: {searchFilingCabinet: true},
        nextPlotPoint: 9
      }, 
      {
        text: "Read the note you found earlier",
        required: (theInventory) => !theInventory.readNote && theInventory.note, 
        setInventory: {readNote: true},
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
    id: 7,
    plotDescription: 'You decide to search the briefcase.  You find a folder.',
    options: [
      {
        text: 'Open folder', 
        setInventory: {openFolder: true},
        nextPlotPoint: 8
      },
      {
        text: "Toss folder on the desk.", 
        setInventory: {openFolder: false}, 
        nextPlotPoint: 10
      },
      {
        text: 'Search the filing cabinet', 
        required: (theInventory) => !theInventory.searchFilingCabinet && theInventory.filingCabinet, 
        setInventory: {searchFilingCabinet: true}, 
        nextPlotPoint: 9
      },
      {
        text: 'Read note you found earlier', 
        required: (theInventory) => theInventory.note && !theInventory.readNote,
        setInventory: {readNote: true},
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
    id: 8,
    plotDescription: "You open the folder from the briefcase.  It has financial statements with red numbers.  This can't be right! Something must be wrong or else someone's hiding something.",
    options: [
      {
        text: 'Search the filing cabinet', 
        required: (theInventory) => !theInventory.searchFilingCabinet && theInventory.filingCabinet, 
        setInventory: {searchFilingCabinet: true}, 
        nextPlotPoint: 9
      },
      {
        text: 'Eat the food from the bag you found earlier.', 
        required: (theInventory) => theInventory.food, 
        setInventory: {ateFood: true, food: false},
        nextPlotPoint: 5
      },
      {
        text: 'Read note you found earlier', 
        required: (theInventory) => theInventory.note && !theInventory.readNote,
        setInventory: {readNote: true},
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
    id: 9,
    plotDescription: 'You search the filing cabinet.  In the 5-drawer cabinet, you find multiple folders with financial statements in them.  This office must belong to an Accountant.',
    options: [
      {
        text: 'Search desk',
        required: (theInventory) => !theInventory.searchDesk && theInventory.desk,
        setInventory: {searchDesk: true}, 
        nextPlotPoint: 6
      },
      {
        text: 'Search briefcase', 
        required: (theInventory) => !theInventory.searchBriefcase && theInventory.searchDesk,
        setInventory: {searchBriefcase: true},
        nextPlotPoint: 7
      }, 
      {
        text: 'You get bored searching the room and walk towards the door.', 
        nextPlotPoint: 39
      }, 
      {
        text: 'Read note you found earlier', 
        required: (theInventory) => theInventory.note && !theInventory.readNote,
        setInventory: {readNote: true},
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
    id: 10,
    plotDescription: "You've selected to play 'Fight with a dragon.' You've heard there is a dragon at a local castle.  The dragon has been seen eating sheep and setting fire to the local farms.  You've been enlisted to fight the dragon and save the village.  But, first, you need supplies.  You grab 100 coins and walk to the market.",
    options: [
      {
        text: 'Buy a sword for 50 coins.', 
        nextPlotPoint: 11
      }, 
      {
        text: 'Buy a shield for 30 coins.', 
        nextPlotPoint: 12
      },
      {
        text: 'Buy full armor for 75 coins.', 
        nextPlotPoint: 13
      }, 
      {
        text: 'Buy a potion for 20 coins.', 
        nextPlotPoint: 15
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
        text: 'Fight with a dragon.',
        nextPlotPoint: 10
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
        required: (theInventory) => theInventory.note && !theInventory.readNote,
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