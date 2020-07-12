import React from 'react';
import { render } from 'react-dom';
import { init, locations } from 'contentful-ui-extensions-sdk';
import Config from './Config';
import FieldEditor from './FieldEditor';
import Dialog from './Dialog';
import '@contentful/forma-36-react-components/dist/styles.css';
import './index.scss';

function renderAtRoot(component) {
  return render(component, document.getElementById('root'));
}

init((sdk) => {
  if (sdk.location.is(locations.LOCATION_APP_CONFIG)) {
    renderAtRoot(<Config sdk={sdk} />);
  } else if (sdk.location.is(locations.LOCATION_ENTRY_FIELD)) {
    renderAtRoot(<FieldEditor sdk={sdk} />);
  } else if (sdk.location.is(locations.LOCATION_DIALOG)) {
    renderAtRoot(<Dialog sdk={sdk} />);
  }
});
