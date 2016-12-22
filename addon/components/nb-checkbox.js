/*globals $:false */
import Ember from 'ember';
import layout from './template';
import ThemedComponent from 'nullbase-theme-service/mixins/nb-themed-component';


export default Ember.Component.extend(ThemedComponent, {
  layout,
  gestures: Ember.inject.service(),
  tagName: "div",
  classNames: [ 'nb-checkbox' ],
  label: "",
  classNameBindings: [ 'disabled:disabled', 'type', 'labelPosition', 'label::no-label' ],
  attributeBindings: [ 'touchAction:touch-action', 'disabled:disabled', "title:title", 'canFocus:tabindex' ],
  tabindex: 0,
  canFocus: Ember.computed('tabindex', 'disabled', function () {
    return this.get('disabled') ? false : this.get('tabindex');
  }),
  touchAction: 'none',
  labelPosition: 'right',
  disabled: false,
  useNativeClick: false,
  ink: true,
  icon: Ember.observer('checked', function () {
    var self = this;
    if ( this.get('checked') ) {
      requestAnimationFrame(function () {
        self.$('.button-icon').addClass('animate');
      });
    }
    else {
      requestAnimationFrame(function () {
        self.$('.button-icon').removeClass('animate');
      });
    }

  }),
  checkedIcon: "checkbox-marked-grey",
  uncheckedIcon: "checkbox-blank-outline-grey",
  _currentIcon: Ember.computed('uncheckedIcon', 'checkedIcon', 'checked', function() {
    return this.get('checked') ? this.get('checkedIcon') : this.get('uncheckedIcon');
  }),


  init(){
    this._super(...arguments);
  },
  actions: {
    tap(){

      this.sendAction('attrs.on-tap', ...arguments);
    },
    down(){
      this.sendAction('attrs.on-down', ...arguments);
    },
    up(){
      this.sendAction('attrs.on-up', ...arguments);
    }
  },


  willDestroyElement(){
    let element = this.get('element');
    let $element = this.$();
    let removeEventListener = this.get('gestures').removeEventListener;
    removeEventListener(element, 'tap', this._tap);
    removeEventListener(element, 'down', this._down);
    removeEventListener(element, 'up', this._up);
    $element.off('mouseover');
    $element.off('mouseout');
    $element.off('keydown', this._keydown);
    $element.off('keyup', this._keyup);
    this._super(...arguments);
  },


  _themeProperties: [
    'attrs.pressed-background-color',
    'attrs.focused-background-color',
    'attrs.pressed-background-color',
    'attrs.focused-background-color',
    'attrs.focused-text-color',
    'attrs.pressed-text-color',
    'attrs.background-color',
    'attrs.text-color'
  ],
  didInsertElement(){
    this._super(...arguments);
    let gestures = this.get('gestures');
    let self = this;
    let $element = this.$();
    let element = this.get('element');
    let $ink = this.$('.ink');


    /**
     *
     * @param event
     * @private
     */
    this._tap = function ( event ) {
      if ( !self.get('disabled') && ($(event.target).is('label') || $(event.target).is('.inner') || $(event.target).is('.button-icon')) ) {


        self.send("tap", event);
      }
      $ink.removeClass('animate');
    };


    /**
     *
     * @private
     */
    this._bodyUp = function ( /*event*/ ) {
      gestures.removeEventListener(document, 'up', self._bodyUp, true);
      if ( self.get('ink') ) {
        $ink.removeClass('animate');
      }
    };

    /**
     *
     * @param event
     * @private
     */
    this._down = function ( event ) {
      if ( !self.get('disabled') && ($(event.target).is('label') || $(event.target).is('.inner') || $(event.target).is('.button-icon')) ) {
        $element.addClass('pressed');
        if ( self.get('ink') ) {
          $ink.addClass('inkDefaultColor');
          $ink.addClass('animate');
        }
        gestures.addEventListener(document, 'up', self._bodyUp, true);
        self.send("down", event);
      }

    };


    /**
     *
     * @param event
     * @private
     */
    this._up = function ( event ) {
      if ( !self.get('disabled') ) {
        $element.removeClass('pressed');
        self.send("up", event);
      }

    };

    $element.on('mouseover', function () {
      if ( !self.get('disabled') ) {
        $element.addClass('hover');
      }
    });

    $element.on('mouseout', function () {
      if ( !self.get('disabled') ) {
        $element.removeClass('hover');
      }
    });


    if ( self.get('useNativeClick') ) {
      $element.on('click', function ( event ) {
               if ( !self.get('disabled') ) {
          event.preventDefault();
          event.stopPropagation();
          self.send('tap', event);
        }
      });
    }
    else {
      gestures.addEventListener(element, 'tap', this._tap);
    }
    this.keyDown = false;
    this._keydown = function ( event ) {
      if ( (event.keyCode === 32 || event.keyCode === 13) && self.keyDown !== true ) {
        self.keyDown = true;
        if ( !self.get('disabled') ) {
          $element.addClass('pressed');
          if ( self.get('ink') ) {
            $ink.addClass('inkDefaultColor');
            $ink.addClass('animate');
          }
          $(document).on('keyup', self._bodyUp);
          self.send("down", event);
        }
      }
    };
    this._keyup = function ( event ) {
      if ( (event.keyCode === 32 || event.keyCode === 13) && self.keyDown === true ) {
        self.keyDown = false;
        self.send('tap', event);
      }
    };


    $element.on('keydown', this._keydown);
    $element.on('keyup', this._keyup);


    gestures.addEventListener(element, 'down', this._down);
    gestures.addEventListener(element, 'up', this._up);
  }
});
