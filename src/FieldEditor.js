import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@contentful/forma-36-react-components';
import PropTypes from 'prop-types';

// destructure SDK off props
const FieldEditorHook = ({ sdk }) => {
  const [selectedValue, setSelectedValue] = useState(sdk.field.getValue() || null);

  const [detachExternalChangeHandler, setDetachExternalChangeHandler] = useState(null);

  useEffect(() => {
    sdk.window.startAutoResizer();

    // setDetachExternalChangeHandler(sdk.field.onValueChanged(onExternalChange));

    // // cleanup function that gets invoked when the component unmounts
    // return function cleanup() {
    //   if (detachExternalChangeHandler) {
    //     detachExternalChangeHandler();
    //   }
    // };
  });

  const onExternalChange = (value) => {
    setSelectedValue(value);
  };

  const openSearch = async () => {
    const selectedPhoto = await sdk.dialogs.openCurrentApp({
      title: 'Select a photo',
      minHeight: 768,
      width: 'fullWidth',
      shouldCloseOnEscapePress: true,
      shouldCloseOnOverlayClick: true,
      allowHeightOverflow: true, // TODO: this is a temporary fix to make sure we can infinitely scroll
    });

    if (selectedPhoto) {
      sdk.field.setValue(selectedPhoto); // passes the value to the sdk
      setSelectedValue(selectedPhoto); // used to update local state
      console.log(selectedPhoto);
    }
  };

  return (
    <div>
      <div>
        {!!selectedValue && (
          <>
            <img src={selectedValue.urls.thumb} alt={selectedValue.alt_description} />

            <TextField value={selectedValue.created_at} />
          </>
        )}
      </div>

      <Button onClick={openSearch}>Open Unsplash Search</Button>
    </div>
  );
};

FieldEditorHook.propTypes = {
  sdk: PropTypes.object,
};

export default FieldEditorHook;
// export default class FieldEditor extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       value: props.sdk.field.getValue() || null,
//     };
//   }

//   componentDidMount() {
//     this.props.sdk.window.startAutoResizer();

//     // Handler for external field value changes (e.g. when multiple authors are working on the same entry).
//     this.detachExternalChangeHandler = this.props.sdk.field.onValueChanged(
//       this.onExternalChange
//     );
//   }

//   componentWillUnmount() {
//     if (this.detachExternalChangeHandler) {
//       this.detachExternalChangeHandler();
//     }
//   }

//   onExternalChange = (value) => {
//     this.setState({ value });
//   };

//   openSearch = async () => {
//     const selectedPhoto = await this.props.sdk.dialogs.openCurrentApp({
//       title: 'Select a photo',
//       minHeight: 768,
//       width: 'large',
//     });

//     if (selectedPhoto) {
//       this.props.sdk.field.setValue(selectedPhoto);
//     }
//   };

//   render() {
//     const { value } = this.state;

//     return (
//       <div>
//         <div>
//           {!!value && (
//             <>
//               <img src={value.urls.thumb} alt={value.alt_description} />

//               <TextField value={value.created_at} />
//             </>
//           )}
//         </div>

//         <Button onClick={this.openSearch}>Open Search</Button>
//       </div>
//     );
//   }
// }
