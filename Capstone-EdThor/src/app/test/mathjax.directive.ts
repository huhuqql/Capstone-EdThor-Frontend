// import {Directive, ElementRef, Input} from '@angular/core';

// @Directive({
//     selector: '[MathJax]'
// })
// export class MathJaxDirective {
//     @Input('MathJax') fractionString: string;

//     constructor(private el: ElementRef) {
//     }

//     ngOnChanges() {
//       console.log('>> ngOnChanges');
//        MathJax.Hub.Queue(["Typeset",MathJax.Hub, document.getElementById("text")]);
//     }
// }