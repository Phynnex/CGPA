(() => {
  let grade = []

  let score = document.getElementById('score');
  let credit = document.getElementById('credit');

  let scoreOutput = document.querySelector('.score')
  let creditOutput = document.querySelector('.credit ')
  let gpaGrade = document.querySelector('.gpa-grade')             //* New line Added
  let gpaOutput = document.querySelector('.gpa')

  // ==================================================================
  // * Converts scoreValue to Grades in Alpha
  const getLetterGrade = (scoreValue) => {
      //return letter grade based on score
      if (scoreValue >= 75) return 'A'
      else if (scoreValue >= 65) return 'B'
      else if (scoreValue >= 55) return 'C'
      else if (scoreValue >= 50) return 'D'
      else if (scoreValue >= 45) return 'E'
      return 'F'
  }

  // ==================================================================
  // * Returns a grade point based on a letter grade
  const getGradePoint = (grade) => {

      switch (grade) {
          case 'A':
              return 5;
          case 'B':
              return 4;
          case 'C':
              return 3;
          case 'D':
              return 2;
          case 'E':
              return 1;
          default:
              return 0;
      }
  }

  // ==================================================================
  const calculateGPA = () => {
      let totalGradePoint = 0;
      let totalCreditValue = 0;
      let gpa = 0.00;

      for (let i = 0; i < grade.length; i++) {

          let letterGrade = getLetterGrade(grade[i].scoreValueNumber);

          let gradePoint = getGradePoint(letterGrade);

          totalCreditValue += grade[i].creditValueNumber;
          //add up all grade points

          totalGradePoint += gradePoint * grade[i].creditValueNumber;

          gpaGrade.innerHTML = `Grade:  ${letterGrade}`
          console.log(letterGrade)
      }
      
      gpa = (totalGradePoint / totalCreditValue).toFixed(2);
      return gpa;
  }

  // ==================================================================
  // * Validate Form On Click
  const validateForm = () => {
      let scoreValue = score.value;
      let creditValue = credit.value;

      let scoreValueNumber = parseInt(scoreValue);
      let creditValueNumber = parseInt(creditValue);

      if (scoreValueNumber <= 100 && scoreValueNumber >= 0 && creditValueNumber > 0) {
          document.querySelector("#error").innerText = "";
          return (true);
      }
      else {
          document.querySelector("#error").innerText = "Ensure score is not less than 0 or more than 100. The Credit unit cannot be left empty too.";
      }
  }

  // ==================================================================
  function reset() {
      grade = []
      score.value = '';
      credit.value = '';
      scoreOutput.innerHTML = '';
      creditOutput.innerHTML = '';
      gpaGrade.innerHTML = '';
      gpaOutput.innerHTML = '';

  }
  // ==================================================================
  // * This function resets and adds new record to the form
  function addRecord() {
      if (validateForm() === true) {
          let scoreValue = score.value;
          let creditValue = credit.value;
          let scoreValueNumber = parseInt(scoreValue);
          let creditValueNumber = parseInt(creditValue);
          obj = { scoreValueNumber, creditValueNumber };
          grade.push(obj);
          scoreValue = '';
          creditValue = '';
          // Display result on browser
          scoreOutput.innerHTML = `Score: ${scoreValueNumber}`
          creditOutput.innerHTML = `Credit: ${creditValueNumber}`
          gpaOutput.innerHTML = `Current GPA: ${calculateGPA()}`
      }
      document.querySelector('form#myForm').reset();
  };

  // ==================================================================

  // * On click of the addAnother Button, it triggers an event Listener with the add record function
  document.querySelector('button.add-another').addEventListener('click', addRecord)


  // ==================================================================

  // * Reset Button
  document.querySelector("button.reset").addEventListener("click", function (e) {
      e.preventDefault();
      reset();
  });
  // ==================================================================


})();