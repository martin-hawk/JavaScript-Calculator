$(document).ready(function() {

  var current = "";
  var digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
  var operations = ["+", "-", "×", "÷"];
  var history = [];
  var counter = 0; // count display symbols' length

  function displayHistory() { // forms a string with history entries
    var temp = "";
    if (history.length >= 0) { // if history not empty
      for (var i = 0; i < history.length; i++) {
        if (history[i] == "*") {
          temp += "×";
        } else if (history[i] == "/") {
          temp += "÷";
        } else temp += history[i]; // returns all items in history
      }
      return temp;
    } else { // if no itmes in history makes AC
      current = "";
      history = [];
      $(".entry").text(0);
      $(".entry-history").text("");
    }
  }

  function getResult() { // if result will be used for next operation
    if (history[history.length - 2] == "=") {
      history = [];
    }
  }

  function checkIfNumber() { // if a number is pressed -> new calculation
    if (history[history.length - 2] == "=") {
      history = [];
      current = "";
      $(".entry-history").text("");
    }
  }

  $('button').click(function() { // main function onClick()
    var button = $(this).attr("value"); // get button value

    if (button == "AC") { // All Clear
      current = "";
      history = [];
      $(".entry").text(0);
      $(".entry-history").text("");
    }

    if (button == "CE") { // Clear Element (last digit or operation)
      if (history[history.length - 2] == "=") { // if current is result operation
        history.pop(); // restore history to last number
        history.pop();
        current = history.pop(); // get last number in history
      } else if (operations.indexOf(current) > 0) { // if current is an operation
        history.pop(); // delete last digit/operation in history
        current = history.pop();
      } else { // if current is a number
        if (history.length > 0) {
          history.pop();
          current = history.pop(); // show last history element as current entry
        }
      }
      $(".entry").text(current);
      $(".entry-history").text(displayHistory());
    }

    if (digits.indexOf(button) >= 0) {
      checkIfNumber(); // if number pressed after result operation
      if (operations.indexOf(current) >= 0) { // check if operation button clicked
        current = ""; // clear current
      }
      counter++; // on number key click increment
      if (counter <= 10) { // if less <= 10 symbols on display
        current += button;
        $(".entry").text(current);
        $(".entry-history").append(button);
      }
    }

    if (operations.indexOf(button) >= 0) { // math operation
      if (current != "") { // check if the first is not a math operation
        if (operations.indexOf(current) >= 0) { // check if current is an operation, if it is - change the operation to new operation
          history.pop(); // remove last operation from history
          current = button;
          if (button == "×") { // when display symbol is different
            history.push("*");
          } else if (button == "÷") {
            history.push("/");
          } else {
            history.push(current); // add new operation to history
          }
          $(".entry").text(current);
          $(".entry-history").text(displayHistory());
          console.log(history);
        } else {
          counter = 0; // clear counter
          getResult(); // if result is used after result operation
          history.push(current);
          current = button;
          if (button == "×") { // when display symbol is different
            history.push("*");
          } else if (button == "÷") {
            history.push("/");
          } else {
            history.push(current);
          }
          $(".entry").text(current);
          $(".entry-history").text(displayHistory());
        }
      }
    }

    if (button == "=") { // result operation
      if (current != "") {
        counter = 0;
        history.push(current);
        var calculations = history.join("");
        current = eval(calculations);
        if (current.toString().length > 10) {
          current = current.toExponential(4);
        }
        history.push("=");
        history.push(current);
        $(".entry").text(current);
        $(".entry-history").text(displayHistory());
      }
    }
  });

});