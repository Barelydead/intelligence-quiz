window.Test = (function() {
    "use strict";

    var mainWrap = document.getElementById("main-wrap"),
        questionIndex = 0,
        sectionIndex = 0,
        questionScore = 0,
        flagScore = 0,
        fizzScore = 0,
        flashScore = 0,
        memoryScore = 0,
        memoryDesc = "<h1>Nästa test är Visuell förmåga och läsförståelse</h1><p>Nästa övning går ut på att du ska klicka på objekten i den ordningen som listan till vänster på skärmen visar. Du har 15 sekunder på dig att slutaföra uppgiften.</p>",
        fizzDesc = "<h1>Nästa test är FizzBuzz</h1><p>Detta spel går ut på att fortsätta sekvensen. Om talet är delbart med 3 så är svart Fizz. Är talet delbart med 5 är svart Buzz. Är talet delbart med både 3 och 5 så är svart FizzBuzz. Annars svarar du med siffran.</p>",
        endDesc = "<p>Du har nu gjort alla övning. Gå vidare för att se ditt resultat.",
        flagDesc = "<h1>Nästa test är Minne.</h1><p>Du kommer att visas 9 stycken flaggor under 5 sekunder. Efter 5 sekunder döljs flaggorna och du ska då klicka på flaggorna i ordningen som visas till vänster på skärmen.</p>",
        flashDesc = "<h1>Nästa test är Uppfattningsförmåga</h1><p>Testat går ut på att ett antal objekt kommer visas under en kort stund på skärmen. Är objektet en kvardrat ska du inte klicka. Är objektet rött ska du inte klicka. Är objektet en röd kvadrat eller övriga färger/former ska du klicka.",
        questions = [
            "Ungefär hur många slag slår ett människo-hjärta per minut?",
            "När kom potatisen till Europa?",
            "I vilken enhet mäts elektrisk spänning?",
        ],
        answer = [
            [
                "30 - 40",
                "110 - 130",
                "60 - 90"
            ],
            [
                "1300-talet",
                "1500-talet",
                "1700-talet"
            ],
            [
                "Volt",
                "Ampere",
                "Watt"
            ],
        ],
        correctAnswer = [
            "60 - 90",
            "1500-talet",
            "Volt"
        ],
        objectList = [
            "redtriangle",
            "red square",
            "red circle",
            "blue square",
            "blue circle",
            "yellowtriangle",
            "yellow square",
            "greentriangle",
            "green square",
            "green circle"
        ],
        match = [
            "red square",
            "blue square",
            "blue circle",
            "yellowtriangle",
            "greentriangle",
            "green circle"
        ],
        countryList = [
            "danmark",
            "finland",
            "sverige",
            "island",
            "danmark",
            "finland",
            "sverige",
            "island",
            "norge"
        ],

        shuffle = function(a) {
            var j, x, i;
            for (i = a.length; i; i--) {
                j = Math.floor(Math.random() * i);
                x = a[i - 1];
                a[i - 1] = a[j];
                a[j] = x;
            }
        },


        test = {

            "button": document.getElementById("start"),

            /**
             * Starts the first Section of the game. (1X2 questions).
             */
            "startQuestions": function() {
                var listElements = [],
                    i = 0,
                    selected = null,
                    answerButton = null,
                    siblings = [];


                mainWrap.innerHTML = "<h2>" + questions[questionIndex] + "</h2>";

                for (i = 0; i < questions.length; i++) {
                    listElements[i] = document.createElement("div");
                    listElements[i].innerHTML = answer[questionIndex][i];
                    mainWrap.appendChild(listElements[i]);
                    listElements[i].className = "answer_holder";
                    listElements[i].addEventListener("click", selectAnswer);
                }

                answerButton = document.createElement("button");
                answerButton.className = "answer_button";
                answerButton.innerHTML = "Svara";
                mainWrap.appendChild(answerButton);

                answerButton.addEventListener("click", checkAnswer);


                function selectAnswer(event) {
                    siblings = event.currentTarget.parentNode.childNodes;

                    for (var i = 0; i < siblings.length; i++) {
                        if (siblings[i] === event.currentTarget) {
                            siblings[i].classList.add("selected");
                            selected = siblings[i].innerHTML;
                        } else {
                            siblings[i].classList.remove("selected");
                        }
                    }
                }


                function checkAnswer() {
                    if (selected === null) {
                        return;
                    }
                    if (selected === correctAnswer[questionIndex]) {
                        mainWrap.append(" " + selected + " är KORREKT");
                        questionScore += 3;
                    } else {
                        mainWrap.append(" " + selected + " är INKORREKT");
                    }

                    answerButton.removeEventListener("click", checkAnswer);
                    questionIndex += 1;

                    var next = document.createElement("button");
                    next.onclick = window.Test.startQuestions;
                    next.classList.add("right");
                    next.innerHTML = "Gå till nästa fråga";
                    mainWrap.appendChild(next);

                    if (questionIndex === questions.length) {
                        // mainWrap.removeChild(button);
                        questionIndex = 0;
                        mainWrap.innerHTML += "<p>Deltest klart. Du skickas vidare om 3 sekunder.</p>";
                        window.setTimeout(window.Test.score, 3000, questionScore, window.Test.startFizzBuzz, fizzDesc);
                    }
                }


            },



            /**
             * Starts the second section of the game. Fizzbuzz
             */
            "startFizzBuzz": function() {
                var res = "",
                    index = 0,
                    start = Math.floor((Math.random() * 100) + 1), //Create random int between 1 and 100
                    stop = start + 10,
                    holder = null,
                    fizz = null,
                    buzz = null,
                    fizzbuzz = null,
                    number = null,
                    list = [];

                sectionIndex = 1;

                mainWrap.classList.add("main-content");
                mainWrap.innerHTML = "<h1>Klicka på nästa nummer är nästa i sekvensen</h1>";

                holder = document.createElement("div");
                fizz = document.createElement("button");
                buzz = document.createElement("button");
                fizzbuzz = document.createElement("button");
                number = document.createElement("button");

                holder.className = "fizz";
                mainWrap.appendChild(holder);
                mainWrap.appendChild(fizz);
                mainWrap.appendChild(buzz);
                mainWrap.appendChild(fizzbuzz);
                mainWrap.appendChild(number);

                fizz.innerHTML = "Fizz";
                buzz.innerHTML = "Buzz";
                fizzbuzz.innerHTML = "FizzBuzz";
                number.innerHTML = stop;

                fizz.addEventListener("click", checkAnswer);
                buzz.addEventListener("click", checkAnswer);
                fizzbuzz.addEventListener("click", checkAnswer);
                number.addEventListener("click", checkAnswer);


                while (start <= stop) {
                    if (start % 3 === 0 && start % 5 === 0) {
                        index = "FizzBuzz";
                    }
                    else if (start % 3 === 0) {
                        index = "Fizz";
                    }
                    else if (start % 5 === 0) {
                        index = "Buzz";
                    } else {
                        index = start;
                    }
                    res = res + index + " ";
                    start++;
                }

                list = res.split(" ");

                holder.innerHTML = list.slice(0, -2);

                function checkAnswer(event) {

                    if (list.slice(-2, -1).toString() === event.currentTarget.innerHTML) {
                        fizzScore += 3;
                    }

                    mainWrap.innerHTML += "<p> " + list.slice(-2, -1).toString() + " är det rätta svaret.</p>";
                    mainWrap.innerHTML += "<p>Deltest klart. Du skickas vidare om 3 sekunder.</p>";

                    window.setTimeout(window.Test.score, 3000, fizzScore, window.Test.startMemory, memoryDesc);
                }

            },


            /**
             * Start the 3:rd section of the game (Visuell förmåga och läsförståelse).
             */
            "startMemory": function() {
                var shapeHolder = null,
                    listHolder = null,
                    shapeList= [],
                    myParagraphs,
                    clickIndex = 0,
                    i = 0,
                    counter = 15;



                sectionIndex = 2;

                //Set the frame

                mainWrap.innerHTML = "<h1>Visuell förmåga och läsförståelse</h1>";

                listHolder = document.createElement("div");
                listHolder.className = "list-holder";
                mainWrap.appendChild(listHolder);

                shapeHolder = document.createElement("div");
                shapeHolder.className = "shape-holder";
                mainWrap.appendChild(shapeHolder);


                //TIMEOUT
                var countDown = window.setInterval(function() {
                    counter -= 1;

                    if (counter === 0) {
                        window.clearInterval(countDown);
                        mainWrap.innerHTML += "<p>Deltest klart. Du skickas vidare om 3 sekunder.</p>";
                        clickIndex = 0;

                        window.setTimeout(window.Test.score, 3000, memoryScore, window.Test.startFlash, flashDesc);
                    }
                }, 1000);

                shuffle(objectList);
                myParagraphs = listHolder.getElementsByTagName("p");

                for (i = 0; i < objectList.length; i++) {
                    listHolder.innerHTML += "<p>" + objectList[i] + "</p>";
                }

                shuffle(objectList);
                for (i = 0; i < objectList.length; i++) {
                    shapeList[i] = document.createElement("div");
                    shapeList[i].className = objectList[i] + " left";
                    shapeHolder.appendChild(shapeList[i]);
                    shapeList[i].addEventListener("click", checkAnswer);
                }


                function checkAnswer(event) {
                    var active = event.currentTarget,
                        className = "";


                    className = active.getAttribute("class");
                    className = className.slice(0, -5); // remove left class;

                    if (className === myParagraphs[clickIndex].innerHTML) {
                        memoryScore += 1;
                        myParagraphs[clickIndex].style.textDecoration = "line-through";
                        myParagraphs[clickIndex].style.color = "green";
                    } else {
                        myParagraphs[clickIndex].style.textDecoration = "line-through";
                        myParagraphs[clickIndex].style.color = "red";
                    }
                    clickIndex += 1;
                    if (clickIndex === objectList.length) {
                        clickIndex = 0;
                        window.clearInterval(countDown);
                        mainWrap.innerHTML += "<p>Deltest klart. Du skickas vidare om 3 sekunder.</p>";

                        window.setTimeout(window.Test.score, 3000, memoryScore, window.Test.startFlash, flashDesc);
                    }
                }



            },

            /**
             * Start the 4:th section of the game (Uppfattningsförmåga).
             */
            "startFlash": function() {
                var shapeHolder = null,
                    shape = null,
                    i = 0,
                    counter = 21;

                sectionIndex = 3;
                mainWrap.innerHTML = "<h1>Uppfattningsförmåga</h1>";

                shapeHolder = document.createElement("div");
                shapeHolder.classList.add("shape-holder");
                mainWrap.appendChild(shapeHolder);

                shapeHolder.style.paddingTop = 200 + "px";
                shapeHolder.style.height = 250 + "px";

                shuffle(objectList);

                var countDown = window.setInterval(function() {
                    counter -= 1;

                    if (counter === 0) {
                        window.clearInterval(countDown);
                        mainWrap.innerHTML += "<p>Deltest klart. Du skickas vidare om 3 sekunder.</p>";

                        window.setTimeout(window.Test.score, 3000, flashScore, window.Test.startFlag, flagDesc);
                        return;
                    }

                    if (counter % 2 === 0) {
                        shape = document.createElement("div");
                        shape.className = objectList[i];
                        shape.addEventListener("click", checkAnswer);
                        shape.style.float = "none";
                        shape.style.margin = "auto";
                        shapeHolder.appendChild(shape);

                        i += 1;
                    }

                    if (counter % 2 === 1) {
                        shapeHolder.removeChild(shape);
                    }



                }, 1000);


                function checkAnswer(event) {
                    var clicked = event.currentTarget;

                    shape.removeEventListener("click", checkAnswer); // removeEventListener so player cant spam click for more points.

                    if (match.indexOf(clicked.className) >= 0) {
                        flashScore += 1;
                    }
                }


            },


            /**
             * Start the 4:th section of the game (Minne).
             */
            "startFlag": function() {
                var listHolder = null,
                    drawn = [],
                    drawnName = [],
                    counter = 5,
                    index = 0,
                    shapeHolder = null;


                sectionIndex = 4;
                mainWrap.innerHTML = "<h1>Minne</h1>";

                listHolder = document.createElement("div");
                listHolder.className = "list-holder";
                mainWrap.appendChild(listHolder);

                shapeHolder = document.createElement("div");
                shapeHolder.className = "shape-holder";
                mainWrap.appendChild(shapeHolder);

                shuffle(countryList);

                for (var i = 0; i < countryList.length; i++) {

                    drawn[i] = document.createElement("img");
                    drawn[i].classList.add("flag");
                    drawn[i].setAttribute("alt", "flag");
                    drawn[i].setAttribute("id", countryList[i]);
                    drawn[i].setAttribute("src", "style/" + countryList[i] + "-flagga.png");
                    shapeHolder.appendChild(drawn[i]);
                }

                shuffle(countryList);

                var countDown = window.setInterval(function() {
                    counter -= 1;

                    if (counter === 0) {
                        window.clearInterval(countDown);

                        for (i = 0; i < drawn.length; i++) {
                            drawn[i].classList.add("hidden");
                            drawn[i].addEventListener("click", checkAnswer);
                            drawnName[i] = document.createElement("p");
                            drawnName[i].innerHTML = countryList[i];
                            listHolder.appendChild(drawnName[i]);

                        }

                    }
                }, 1000);

                function checkAnswer(event) {
                    var clicked = event.currentTarget;

                    clicked.removeEventListener("click", checkAnswer);
                    clicked.classList.remove("hidden");
                    if (clicked.getAttribute("id") === countryList[index]) {
                        flagScore += 1;
                        clicked.style.borderColor = "green";

                        if (index === countryList.length - 1) {
                            mainWrap.innerHTML += "<p>Du skickas vidare om 3 sekunder</p>";
                            window.setTimeout(window.Test.score, 3000, flagScore, window.Test.endScreen, endDesc);
                        }

                        index += 1;
                    } else {
                        clicked.style.borderColor = "red";
                        mainWrap.innerHTML += "<p>Du skickas vidare om 3 sekunder</p>";
                        window.setTimeout(window.Test.score, 3000, flashScore, window.Test.endScreen, endDesc);
                    }
                }


            },


            /**
             * Show the End screen and display testscore.
             */
            "endScreen": function() {
                var totalScore = questionScore + fizzScore + memoryScore + flagScore + flashScore,
                    maxScore = 9 + 3 + 10 + 9 + 5;

                mainWrap.innerHTML = "<h1>Testet avslutas.</h1>";
                mainWrap.innerHTML += "<h3>Totalpoäng</h3>";
                mainWrap.innerHTML += "<p>Totalt: " + totalScore + "/" + maxScore + " poäng<p>";
                mainWrap.innerHTML += "<h3>Utifrån detta så uppskattar vi att du har ett IQ på ungefär: " + totalScore * 6 + "</h3>";
            },


            /**
             * Resets the current sections
             */
            "reset": function() {
                switch (sectionIndex) {
                    case 0:
                        questionIndex = 0;
                        questionScore = 0;
                        this.startQuestions();
                        break;
                    case 1:
                        fizzScore = 0;
                        this.startFizzBuzz();
                        break;
                    case 2:
                        memoryScore = 0;
                        this.startMemory();
                        break;
                    case 3:
                        flashScore = 0;
                        this.startFlash();
                        break;
                    case 4:
                        flagScore = 0;
                        this.startFlash();
                        break;
                    default:
                        break;
                }
            },


            /**
             * Displays the score of a section.
             * @param string score, function nextsection, string nextdesc
             */
            "score": function(score, nextsection, nextdesc) {
                var next_button = null;
                mainWrap.innerHTML = "<h1>Sektionen avklarad.</h1><p>Du fick " + score + " poäng på detta delmoment.</p>";
                mainWrap.innerHTML += nextdesc;

                next_button = document.createElement("div");
                next_button.className = "next_button";
                mainWrap.append(next_button);
                next_button.innerHTML = "Gå vidare till nästa steg";

                next_button.onclick = nextsection;
            },


        };

    return test;

})();

window.Test.button.addEventListener("click", window.Test.startQuestions);
