import { Component } from '@angular/core';
import * as _ from 'underscore';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  text_array = []

  germans_texts = []
  english_texts = []
  random_phrases=[];
  right_answers=[];
  answer_phrase=[];
  active_array = [];
  corrected_text = []
  arrBirds=[]
  phrases = {
    indexOfSentence:0,
    indexOfText: 0,
    active_array: [],
    right_answer: [],
    en_active_txt: ''
  }
  constructor(private httpService: HttpClient) {
    
    
  }
  ngOnInit() {
    this.httpService.get('./assets/germanTxT.json').subscribe(
      data => {
        this.germans_texts = data[1].german as string[];
        this.english_texts = data[0].english as string[];
        this.getNewText(this.phrases.indexOfText)

        
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );
  }

  getNewText(index){
    if(index>this.germans_texts.length-1){
      return 
    }
    
    this.text_array = this.getSplitPhrase(this.germans_texts[this.phrases.indexOfText], '.')
    this.right_answers = []
    this.random_phrases = []
    for (let i of this.text_array) {
      this.right_answers.push(this.getSplitPhrase(i, ' '))
      this.random_phrases.push(this.makeRandom(this.getSplitPhrase(i, ' ')))
    }
    this.phrases.active_array = this.random_phrases[0]
    this.phrases.right_answer = this.right_answers[0]
    this.phrases.en_active_txt = this.getSplitPhrase(this.english_texts[index], '.')[0].toString()
    this.phrases.indexOfText = index+1
  }

  makeRandom(array){
    let randomArray = array.sort(function() {
      return .5 - Math.random();
    })
    return randomArray
  }

  checkRightAnswer(array1,array2){
    if( array1.toString() == array2.toString()){
      this.phrases.indexOfSentence = this.phrases.indexOfSentence + 1
      this.getNewSentence()
      
    if(this.phrases.indexOfSentence == this.random_phrases.length-1){
      this.getNewText(this.phrases.indexOfText)
    }
    
    }
  }

  getNewSentence(){
    let index = this.phrases.indexOfSentence
    console.log(index)
    this.corrected_text.push(this.phrases.right_answer.join(' '))
    this.phrases.active_array = this.random_phrases[index]
    this.phrases.right_answer = this.right_answers[index]
    this.phrases.en_active_txt = this.getSplitPhrase(this.english_texts[this.phrases.indexOfText-1], '.')[index].toString()
    this.answer_phrase = []
  }

  sendttoAnswerPhrase(item){
    this.phrases.active_array = _.without(this.phrases.active_array, item)
    this.answer_phrase.push(item)
    this.checkRightAnswer(this.answer_phrase, this.phrases.right_answer)
  }

  send_to_current_phrase(item){
    this.answer_phrase = _.without(this.answer_phrase, item)
    this.phrases.active_array.push(item)    
  }
  
  getSplitPhrase(phrase, char){
    return phrase.split(char).filter(Boolean)
  }
}

