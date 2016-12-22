import _ from "npm:lodash";
import Ember from 'ember';
import ThemeHandlerMixin from 'nullbase-theme-service/mixins/nullbase-theme-handler';

var ThemeHandler = Ember.Object.extend(ThemeHandlerMixin,{

  className:'nb-checkbox',
  _insertedStyles: [],
  properties: {

    'focused-background-color': {
      setGlobalCSSRule( themeProperties ,selectorForThemeContext){
        Ember.assert('The value of themeProperties must be an object with keys for each button type.',_.isObject(themeProperties));
        let self = this;
        _.forIn(themeProperties,function(color,buttonTypeClass){
          let rule = `.nb-button${selectorForThemeContext}.${buttonTypeClass}:focus .inner { 
                      background:${color};
                      }`;
          self.insertRule(rule, self);
        });
      },

      setInstanceCSSRule(){
        this.insertRule('#' + this.get('elementId') + ':focus .inner{ background:' + this.get('attrs.focused-background-color') + ';}', this);
      }

    },



    'background-color': {
      setGlobalCSSRule( themeProperties ,selectorForThemeContext){
        Ember.assert('The value of themeProperties must be an object with keys for each button type.',_.isObject(themeProperties));
        let self = this;
        _.forIn(themeProperties,function(color,buttonTypeClass){
          let rule = `.nb-button${selectorForThemeContext}.${buttonTypeClass} .inner  { 
                      background-color:${color};
                    }`;
          self.insertRule(rule, self);
        });

      },

      setInstanceCSSRule(){
        this.insertRule('#' + this.get('elementId') + ' .inner{ background:' + this.get('attrs.background-color') + ';}', this);
      }
    },


    'text-color': {
      setGlobalCSSRule( themeProperties ,selectorForThemeContext){
        Ember.assert('The value of themeProperties must be an object with keys for each button type.',_.isObject(themeProperties));
        let self = this;
        _.forIn(themeProperties,function(color,buttonTypeClass){
          let rule = `.nb-button${selectorForThemeContext}.${buttonTypeClass} .inner .button-text { 
                      color:${color};
                    }`;

          self.insertRule(rule, self);
        });

      },
      setInstanceCSSRule(){

        let rule = `#${this.get('elementId')} .inner .button-text { 
                      color:${this.get('attrs.text-color')};
                    }`;


        this.insertRule(rule, this);
      }
    },


    'focused-text-color': {
      setGlobalCSSRule( themeProperties ,selectorForThemeContext){
        Ember.assert('The value of themeProperties must be an object with keys for each button type.',_.isObject(themeProperties));
        let self = this;
        _.forIn(themeProperties,function(color,buttonTypeClass){



          let rule = `.nb-button${selectorForThemeContext}.${buttonTypeClass}:focus .inner .button-text { 
                      color:${color};
                    }`;
          self.insertRule(rule, self);
        });

      },
      setInstanceCSSRule(){

        let rule = `#${this.get('elementId')}:focus .inner .button-text { 
                      color:${this.get('attrs.focused-text-color')};
                    }`;
        this.insertRule(rule, this);
      }
    },


    'pressed-background-color': {
      setGlobalCSSRule( themeProperties ,selectorForThemeContext){
        Ember.assert('The value of themeProperties must be an object with keys for each button type.',_.isObject(themeProperties));
        let self = this;
        _.forIn(themeProperties,function(color,buttonTypeClass){
          let rule = `.nb-button${selectorForThemeContext}.${buttonTypeClass}.pressed .inner  { 
                      background-color:${color};
                    }`;
          self.insertRule(rule, self);
        });
      },
      setInstanceCSSRule(){
        this.insertRule('#' + this.get('elementId') + '.pressed .inner { background:' + this.get('attrs.pressed-background-color') + ';}', this);

      }
    },


    'pressed-text-color': {
      setGlobalCSSRule( themeProperties ,selectorForThemeContext){
        Ember.assert('The value of themeProperties must be an object with keys for each button type.',_.isObject(themeProperties));
        let self = this;
        _.forIn(themeProperties,function(color,buttonTypeClass){
          let rule = `.nb-button${selectorForThemeContext}.${buttonTypeClass}.pressed .inner  .button-text { 
                      color:${color};
                    }`;
          self.insertRule(rule, self);
        });
      },
      setInstanceCSSRule(){
        this.insertRule('#' + this.get('elementId') + '.pressed .inner .button-text { color:' + this.get('attrs.pressed-text-color') + ';}', this);

      }
    }
  }
});



export function initialize( application ) {
  console.log('Initializing nb-checkbox-theme-init');
  application.register('nb-checkbox-theme-init:main', ThemeHandler, { instantiate: true });
  application.inject('component:nb-checkbox', '_themeHandler', 'nb-checkbox-theme-init:main');
}

export default {
  after: 'theme-service-initializer',
  name: 'nb-checkbox-theme-init',
  initialize
};
