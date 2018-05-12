$(document).ready(function() {
	var myChar, opponentChar, choices, enemyArray, haveCharacter, haveAttacker, numEnemies, rounds;	//Set Global Variables
	var wins = 0;
	var loses = 0;

	function varSet() {		//Sets all of the variable values
		myChar;
		opponentChar;

		choices = [];
		enemyArray = [ {
			id: 0,
			name: "Vegeta",
			pic: 'assets/images/vegeta2.png',
			healthPoints: 240,
			attackPower: 16
		}, {
			id: 1,
			name: "Goku",
			pic: 'assets/images/goku2.png',
			healthPoints: 270,
			attackPower: 18, 		
		}, {
			id: 2,
			name: "Cell",
			pic: 'assets/images/cell2.png',
			healthPoints: 255,
			attackPower: 15 
		}, {
			id: 3,
			name: "Piccolo",
			pic: 'assets/images/Piccolo2.png',
			healthPoints: 240,
			attackPower: 13 
		}, {
			id: 4,
			name: "Frieza",
			pic: 'assets/images/frieza2.png',
			healthPoints: 180,
			attackPower: 20 
		}, {
			id: 5,
			name: "Majin Buu",
			pic: 'assets/images/majinbuu2.png',
			healthPoints: 240,
			attackPower: 16
		}];

		haveCharacter = false;
		haveAttacker = false;
		numEnemies = 5;
		rounds = 7;

		for(var i = 0; i < enemyArray.length; i++) {
			choices += "<div id=" + enemyArray[i].id + " class='btn character text-center' value=" + enemyArray[i].id +
			"><img class='fighters' src=" + enemyArray[i].pic + " alt=" + enemyArray[i].name + "><br> HP: " + enemyArray[i].healthPoints +
			"<br> ATK: " + enemyArray[i].attackPower + " </div>";
		}

		$("#picking").html(choices);
		$("#todo").html("Click to choose your fighter");

		$('.hero').remove();
		$('.fighting').remove();
		$('#whathappens').html("");

		attachCharacterOnClick();
	}

	function printCharacters() {
		var hero = "<div id=" + enemyArray[myChar].id + " class='btn character text-center hero' value=" + enemyArray[myChar].id +
			"><img class='fighters' src=" + enemyArray[myChar].pic + " alt=" + enemyArray[myChar].name + "><br> HP: " + enemyArray[myChar].healthPoints +
			"<br> ATK: " + enemyArray[myChar].attackPower + " </div>";
		var badguy = "<div id=" + enemyArray[opponentChar].id + " class='btn character text-center fighting' value=" + enemyArray[opponentChar].id +
			"><img class='fighters' src=" + enemyArray[opponentChar].pic + " alt=" + enemyArray[opponentChar].name + "><br> HP: " + enemyArray[opponentChar].healthPoints +
			"<br> ATK: " + enemyArray[opponentChar].attackPower + " </div>";
		$('#myguy').html(hero);
		$('#enemy').html(badguy);
	}

	function whatHappens() {
		var description = "You attack " + enemyArray[opponentChar].name + " for " + enemyArray[myChar].attackPower + " damage!<br>" +
			enemyArray[opponentChar].name + " counter attacks for " + enemyArray[opponentChar].attackPower + " damage!<br>";
			"Your attack power has increased by " + rounds + "!";
		$('#whathappens').html(description);
	}

	function attachCharacterOnClick() {
		$('.character').on("click", function(){
			if(!haveCharacter) {	//Picking your character
				myChar = $(this).attr('id');
				$("#myguy").append(this);
				$(this).addClass("hero");

				haveCharacter = true;
				$('#whathappens').html("");
				$("#todo").html("Choose your opponent!");
			}
			//You have a character and you're picking your opponent
			else if(!haveAttacker && haveCharacter && myChar !== $(this).attr('id')) {	
				opponentChar = $(this).attr('id');
				$("#enemy").append(this);
				$(this).addClass("fighting");

				haveAttacker = true;
				$('#whathappens').html("");
				$("#todo").html("Keep clicking attack to duel!");
			}
		});
	}

	$('#attack').on("click", function() {
		if(!haveCharacter) {
			$('#whathappens').html("You need to pick a fighter first!");
		}
		else if(!haveAttacker) {
			$('#whathappens').html("Pick who your enemy!");
		}
		else if(haveCharacter && haveAttacker) {
			rounds++;
			enemyArray[opponentChar].healthPoints  = enemyArray[opponentChar].healthPoints - enemyArray[myChar].attackPower;	//Hit Them
			enemyArray[myChar].healthPoints = enemyArray[myChar].healthPoints - enemyArray[opponentChar].attackPower;	//Get Hit
			

			if(enemyArray[opponentChar].healthPoints < 0) {
				numEnemies--;
				if(numEnemies > 0) {
					$(".fighting").remove();
					$('#whathappens').html("");
					$("#todo").html("Who will you fight next?");
					haveAttacker = false;
				}
				else {
					whatHappens();
					alert("Victory!  Play again!");
					wins++;
					$('#winsloses').html("Wins: " + wins + "&nbsp;&nbsp;Loses: " + loses);
					varSet();
				}
				
			}
			else if(enemyArray[myChar].healthPoints < 0) {
				whatHappens();
				alert("Game Over!  Try again!");
				loses++;
				$('#winsloses').html("Wins: " + wins + "&nbsp;&nbsp;Loses: " + loses);
				varSet();
			}
			else {
				whatHappens();
				printCharacters();
			}
			
			enemyArray[myChar].attackPower = enemyArray[myChar].attackPower + rounds;	//Get Stronger
		}
	});

	$('#restart').on("click", function(){
		varSet();
	});

	attachCharacterOnClick();
	varSet();

});