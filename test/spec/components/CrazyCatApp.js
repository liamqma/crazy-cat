'use strict';

describe('Main', function () {
  var React = require('react/addons');
  var CrazyCatApp, component;

  beforeEach(function () {
    var container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    CrazyCatApp = require('components/CrazyCatApp.js');
    component = React.createElement(CrazyCatApp);
  });

  it('should create a new instance of CrazyCatApp', function () {
    expect(component).toBeDefined();
  });
});
