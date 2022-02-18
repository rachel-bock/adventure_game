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
        setInventory: {sword: true, money: 50},
        nextPlotPoint: 11
      }, 
      {
        text: 'Buy a shield for 30 coins.', 
        setInventory: {shield: true, money: 70},
        nextPlotPoint: 12
      },
      {
        text: 'Buy full armor for 80 coins.', 
        setInventory: {armor: true, money: 20},
        nextPlotPoint: 13
      }, 
      {
        text: 'Buy a potion for 20 coins.', 
        setInventory: {potion: true, money: 80},
        nextPlotPoint: 15
      }
    ]
  }, 
  {
    id: 11,
    plotDescription: `You decide to purchase a sword.  You find a beautiful, dangerous sword that has a gold handle and appears to be very sharp.  The sword costs you 50 coins.`,
    options: [
      {
        text: 'Buy a shield for 30 coins.', 
        required: (theInventory) => !theInventory.shield,
        setInventory: {shield: true, money: 20},
        nextPlotPoint: 12
      }, 
      {
        text: 'Buy a potion for 20 coins.', 
        required: (theInventory) => !theInventory.potion,
        setInventory: {shield: true, money: 30},
        nextPlotPoint: 15
      }, 
      {
        text: 'Finish shopping for supplies.', 
        nextPlotPoint: 14
      } 
    ]
  }, 
  {
    id: 12,
    plotDescription: `You decide to purchase a shield.  You find a light, large shield that is durable and strong.  The shield costs 30 coins.`,
    options: [
      {
        text: 'Buy a sword for 50 coins.', 
        required: (theInventory) => !theInventory.sword,
        setInventory: {sword: true, money: 20},
        nextPlotPoint: 11
      }, 
      {
        text: 'Buy a potion for 20 coins.', 
        required: (theInventory) => !theInventory.potion,
        setInventory: {potion: true, money: 50},
        nextPlotPoint: 15
      },
      {
        text: `Finish shopping for supplies.`,
        nextPlotPoint: 14
      }
    ]
  }, 
  {
    id: 13,
    plotDescription: 'You decide to buy a full suit of armor.  It includes a helmet, shield, sword, and all the accessories.  The cost is 80 coins.',
    options: [
      {
        text: 'Buy a potion for 20 coins.', 
        required: (theInventory) => !theInventory.potion,
        setInventory: {potion: true},
        nextPlotPoint: 15
      }, 
      {
        text: 'Finish shopping for supplies.', 
        nextPlotPoint: 14
      }
    ]
  }, 
  {
    id: 14,
    plotDescription: `You finish shopping for supplies.  It's now time to hunt a dragon.  You've heard that the dragon is living at the castle just west of town.`,
    options: [
      {
        text: 'Go west to the castle.', 
        nextPlotPoint: 16
      }, 
      {
        text: 'Go to the woods outside the castle and wait for the dragon to fly by.', 
        nextPlotPoint: 16
      }
    ]
  }, 
  {
    id: 15,
    plotDescription: `You decide to purchase a potion that is guaranteed to slay the dragon.  It is an acid like potion that will burn the scales right off the dragon making it vulnerable to your attack.`,
    options: [
      {
        text: 'Buy a sword for 50 coins.', 
        required: (theInventory) => !theInventory.sword && !theInventory.armor,
        setInventory: {sword: true},
        nextPlotPoint: 11
      }, 
      {
        text: 'Buy a shield for 30 coins.', 
        required: (theInventory) => !theInventory.shield && !theInventory.armor,
        setInventory: {shield: true},
        nextPlotPoint: 12
      },
      {
        text: 'Buy a suit of armor for 80 coins.', 
        required: (theInventory) => (!theInventory.sword && !theInventory.armor) || (!theInventory.shield && !theInventory.armor),
        setInventory: {armor: true},
        nextPlotPoint: 13
      },
      {
        text: 'Finish shopping for supplies.', 
        nextPlotPoint: 14
      }
    ]
  }, 
  {
    id: 16,
    plotDescription: `As you travel through the wildnerness to the dragon's castle, you get tired and fall asleep.  When you wake up, you find the dragon staring at you.  You're no longer in the wildnerness.  You look around and see you're in the castle.  The dragon must have found you and brought you here. 16`,
    options: [
      {
        text: `Draw your sword and jump towards the dragon. 18`, 
        required: (theInventory) => theInventory.sword || theInventory.armor,
        setInventory: {sword: false},
        nextPlotPoint: 18
      }, 
      {
        text: `Hide behind your shield. 17`, 
        required: (theInventory) => theInventory.shield || theInventory.armor,
        nextPlotPoint: 17
      }, 
      {
        text: `Throw the potion at the dragon. 19`,
        required: (theInventory) => theInventory.potion,
        setInventory: {potion: false},
        nextPlotPoint: 19
      }, 
      {
        text: `Run from the dragon as fast as you can. 20`, 
        nextPlotPoint: 20
      }
    ]
  }, 
  {
    id: 17,
    plotDescription: `You pull out your sheild and hide behind it just in time.  The dragon takes one breath and blows smoking hot fire directly at you.  The shield warms in the flames as it deflects the majority of the heat away from you. 17`,
    options: [
      {
        text: `Draw your sword and jump towards the dragon. 18`, 
        required: (theInventory) => (theInventory.sword && theInventory.potion)|| (theInventory.armor && theInventory.potion),
        setInventory: {sword: false}, 
        nextPlotPoint: 18
      }, 
      {
        text: `Draw your sword and jump towards the dragon. 21`,
        required: (theInventory) => (theInventory.sword && theInventory.throwPotion)|| (theInventory.armor && theInventory.throwPotion),
        setInventory: {sword: false}, 
        nextPlotPoint: 21
      },
      {
        text: `Throw the potion at the dragon. 19`,
        required: (theInventory) => theInventory.potion,
        setInventory: {potion: false, throwPotion: true},
        nextPlotPoint: 19
      }, 
      {
        text: `Run from the dragon as fast as you can. 20`, 
        nextPlotPoint: 20
      }
    ]
  }, 
  {
    id: 18,
    plotDescription: `You decide to draw your sword and jump towards the dragon.  As you do, the dragon moves ever so slighly and turns to the side as if it heard something.  Just then, you attempt to plunge your sword deep into the dragon's neck and pull it out quickly.  Unfortunately, the sword glances off the dragon's scales and bounces to the floor. 18`,
    options: [
      {
        text: `Grab your sword and run from the dragon as fast as you can. 20`, 
        setInventory: {sword: true}, 
        nextPlotPoint: 20
      }, 
      {
        text: `Grab your sword and hide behind your shield. 17`, 
        required: (theInventory) => theInventory.shield || theInventory.armor,
        setInventory: {sword: true}, 
        nextPlotPoint: 17
      }, 
      {
        text: `Throw the potion at the dragon. 19`, 
        required: (theInventory) => theInventory.potion,
        setInventory: {potion: false},
        nextPlotPoint: 19
      }
    ]
  }, 
  {
    id: 19,
    plotDescription: `With all your might, you throw the potion at the dragon.  It lands square on the dragon's head.  The dragon roars and tosses his head back throwing the potion down it's spine and along the remainder of it's body.  The dragon's scales begin to bubble and melt off as if by magic.  Now is the time to strike at the dragon since it is most vulnerable. 19`,
    options: [
      {
        text: `Stab the dragon's heart. 21`, 
        required: (theInventory) => theInventory.sword || theInventory.armor,
        setInventory: {sword: false, throwPotion: true},
        nextPlotPoint: 21
      }, 
      {
        text: `Throw the shield towards the dragon. 23` ,
        required: (theInventory) => theInventory.shield || theInventory.armor,
        setInventory: {shield: false, throwPotion: true},
        nextPlotPoint: 23
      }
    ]
  }, 
  {
    id: 20,
    plotDescription: `You begin to run away from the dragon as fast as you can.  Without flinching, the dragon reaches out and grabs you.  You're stuck in the dragon's mighty claws.  20`,
    options: [
      {
        text: 'Struggle to get free.', 
        nextPlotPoint: 22
      }, 
      {
        text: `Reach for the potion in your pocket.`, 
        required: (theInventory) => theInventory.potion,
        setInventory: {potion: false}, 
        nextPlotPoint: 19
      }
    ]
  }, 
  {
    id: 21,
    plotDescription: `The potion melted away the dragon's scales.  As you run towards the dragon, you see it's heart beating.  You dive in the direction of the dragon's heart.  Moments later, you back up and look at the dragon.  The sword is protruding from the beast.  Blood is covering the floor.  As if in shock, the dragon rolls back on the floor and lands on it's back.  You've saved the village from the fate of this dangerous dragon. 21`,
    options: [
      {
        text: `Restart game.`, 
        nextPlotPoint: 37
      }, 
    ]
  }, 
  {
    id: 22,
    plotDescription: `You struggle to no avail.  It's useless.  The dragon takes a deep breath and seems to smile.  Then, slowly, the dragon begins to blow flames in your face and on your body.  Moments later, you are charred to a crisp and ready to eat.  The dragon has won a great prize.  Dinner.  22`,
    options: [
      {
        text: 'Restart game.', 
        nextPlotPoint: 37
      }
    ]
  }, 
  {
    id: 23,
    plotDescription: `You throw the shield at the newly descaled dragon.  The shield pierces the skin of the dragon just under its chin.  As the dragon begins to roar, the shield slices deeply into the dragon's throat.  Blood begins covering the floor.  As if in shock, the dragon rolls back and lands on the floor.  You've saved the village from the dangerous dragon. 23`,
    options: [
      {
        text: 'Restart game.', 
        nextPlotPoint: 37
      }, 
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
    plotDescription: 'Welcome to the adventure games.  These choose your own adventure games have been written by Rachel Bock based on a tutorial by WebDevSimplified and are available online.  What game would you like to play?',
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
        text: `The Mystery Adventure Game`,
        nextPlotPoint: 24
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