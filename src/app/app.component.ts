import { Component } from '@angular/core';
import * as _ from 'underscore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  fulltext = 'Im Sommer war ich oft mit meiner Familie am Meer. Wir sind den ganzen Tag geschwommen. Manchmal hat Papa uns auch ein Eis gekauft.  Am Abend sind wir zusammen in ein Restaurant gegangen und haben viel gegessen. Einmal waren in dem Restaurant sogar Musiker und haben für die Gäste gesungen. Das war ein sehr schöner Abend.'
  text_array = this.getSplitPhrase(this.fulltext, '.')
  random_phrases=[];
  right_answers=[];
  answer_phrase=[];
  active_array = [];
  corrected_text = []
  phrases = {
    indexArray: 0,
    active_array: [],
    right_answer: []
  }
    constructor(){
      
      for (let i of this.text_array) {
        this.right_answers.push(this.getSplitPhrase(i, ' '))
        this.random_phrases.push(this.makeRandom(this.getSplitPhrase(i, ' '))) 
      }
      this.phrases.active_array = this.random_phrases[0]
      this.phrases.right_answer = this.right_answers[0]

    }
  makeRandom(array){
    let randomArray = array.sort(function() {
      return .5 - Math.random();
    })
    return randomArray
  }

  checkRightAnswer(array1,array2, index){
    if( array1.toString() == array2.toString()){
      this.phrases.active_array = this.random_phrases[index+1]
      this.phrases.right_answer = this.right_answers[index+1]
      this.phrases.indexArray = index+1
      this.answer_phrase = []
      this.corrected_text.push(this.text_array[index])
    }
  }
  
  sendttoAnswerPhrase(item){
    this.phrases.active_array = _.without(this.phrases.active_array, item)
    this.answer_phrase.push(item)
    this.checkRightAnswer(this.answer_phrase, this.phrases.right_answer, this.phrases.indexArray)
    console.log(this.answer_phrase, this.phrases.right_answer)
  }

  send_to_current_phrase(item){
    this.answer_phrase = _.without(this.answer_phrase, item)
    this.phrases.active_array.push(item)    
  }
  
  getSplitPhrase(phrase, char){
    return phrase.split(char).filter(Boolean)
  }
}

