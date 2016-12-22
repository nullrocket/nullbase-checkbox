import Ember from 'ember';
import NbCheckboxThemeInitInitializer from 'dummy/initializers/nb-checkbox-theme-init';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | nb checkbox theme init', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  NbCheckboxThemeInitInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
