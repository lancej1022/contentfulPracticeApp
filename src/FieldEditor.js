import React from 'react';
import { Button } from '@contentful/forma-36-react-components';

export default class FieldEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.sdk.field.getValue() || null,
    };
  }

  componentDidMount() {
    this.props.sdk.window.startAutoResizer();

    // Handler for external field value changes (e.g. when multiple authors are working on the same entry).
    this.detachExternalChangeHandler = this.props.sdk.field.onValueChanged(
      this.onExternalChange
    );
  }

  componentWillUnmount() {
    if (this.detachExternalChangeHandler) {
      this.detachExternalChangeHandler();
    }
  }

  onExternalChange = (value) => {
    this.setState({ value });
  };

  openSearch = async () => {
    const selectedPhoto = await this.props.sdk.dialogs.openCurrentApp({
      title: 'Select a photo',
      minHeight: 768,
      width: 'large',
    });

    if (selectedPhoto) {
      this.props.sdk.field.setValue(selectedPhoto);
    }
  };

  render() {
    const { value } = this.state;

    return (
      <div>
        <div>{!!value && <img src={value.urls.thumb} alt={value.alt_description} />}</div>
        <Button onClick={this.openSearch}>Open Search</Button>
      </div>
    );
  }
}
