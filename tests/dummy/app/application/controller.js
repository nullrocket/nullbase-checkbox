import Ember from 'ember';

export default Ember.Controller.extend({
  appState: Ember.inject.service('app-state'),
  checked:false,
  checked2:false,
  checkedCustomIcons:false,
  checkedCustomColors:false,
  checkedCheckOnLeft:false,
  actions:{
    toggleCheckbox(){

      this.set('checked',!this.get('checked'));
    },
    toggleCheckbox2(){

      this.set('checked2',!this.get('checked2'));
    },
    toggleCheckboxCustomIcons(){
      this.set('checkedCustomIcons',!this.get('checkedCustomIcons'));
    },
    toggleCheckboxCustomColors(){
      this.set('checkedCustomColors',!this.get('checkedCustomColors'));
    },
    toggleCheckboxOnLeft(){
      this.set('checkedCheckOnLeft',!this.get('checkedCheckOnLeft'));
    }
  }
});
