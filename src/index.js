import React from 'react';
import { render } from 'react-dom';
import { init, locations } from 'contentful-ui-extensions-sdk';
import Config from './Config';
import FieldEditor from './FieldEditor';
import Dialog from './Dialog';
import '@contentful/forma-36-react-components/dist/styles.css';
import './index.scss';

/**
 * Used to determine which component to render when the app is initialized
 */
init((sdk) => {
  if (sdk.location.is(locations.LOCATION_APP_CONFIG)) {
    render(<Config sdk={sdk} />, document.getElementById('root'));
    sdk.window.startAutoResizer();
  } else if (sdk.location.is(locations.LOCATION_ENTRY_FIELD)) {
    render(<FieldEditor sdk={sdk} />, document.getElementById('root'));
  } else if (sdk.location.is(locations.LOCATION_DIALOG)) {
    render(<Dialog sdk={sdk} />, document.getElementById('root'));
  }
});
