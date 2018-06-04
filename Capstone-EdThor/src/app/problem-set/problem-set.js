export var test = function(){
    var text = document.getElementById("text");
    katex.render("c = \\pm\\sqrt{a^2 + b^2}陈思宇", text);
};

export var answerSpan = document.getElementById('answer');
export var answerMathField = MQ.MathField(answerSpan, {
  handlers: {
    edit: function () {
      var enteredMath = answerMathField.latex(); 
    }
  }
});

export function addSymbol(toAdd){
  answerMathField.cmd(toAdd);
}

export var getXposition = function(){
   
};

export var getYposition = function(){

};

export var showSymbolInput = function(){
    $("#symbol-input").fadeIn(1000);
}