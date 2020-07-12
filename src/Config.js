import React, { useState, useEffect } from 'react';
import {
  Heading,
  Paragraph,
  Typography,
  Select,
  Option,
} from '@contentful/forma-36-react-components';
import get from 'lodash.get';
import PropTypes from 'prop-types';

function createEditorInterface(selectedCt) {
  const targetField = selectedCt.fields.find((field) => field.type === 'Object');

  if (!targetField) {
    return {};
  }

  return { [selectedCt.sys.id]: { controls: [{ fieldId: targetField.id }] } };
}

// /**
//  * destucture app, space off props
//  * @param {*} param0
//  */
// const Config = (props) => {
//   const { app, space } = props.sdk;
//   const [selectedContentTypeId, setSelectedContentTypeId] = useState('');
//   const [contentTypes, setContentTypes] = useState([]);

//   useEffect(() => {
//     console.log('firing');
//     async function configApp() {
//       app.onConfigure(onConfigure);

//       const [ctsRes, parameters] = await Promise.all([
//         space.getContentTypes(),
//         app.getParameters(),
//       ]);

//       const formattedContentTypes = ctsRes ? ctsRes.items : [];

//       // update state
//       setContentTypes(formattedContentTypes);
//       if (parameters) {
//         setSelectedContentTypeId();
//       } else {
//         setSelectedContentTypeId(get(formattedContentTypes, [0, 'sys', 'id'], ''));
//       }

//       () => app.setReady();
//     }
//     configApp();
//   });

//   async function onConfigure() {
//     const selectedContentType = contentTypes.find(
//       (ct) => ct.sys.id === selectedContentTypeId
//     );

//     if (!selectedContentType) {
//       props.sdk.notifier.error('You do not have any content types to select!');
//       return false;
//     }

//     return {
//       parameters: {
//         selectedContentTypeId,
//       },
//       targetState: {
//         EditorInterface: createEditorInterface(selectedContentType),
//       },
//     };
//   }

//   const pickCt = (id) => {
//     setSelectedContentTypeId(id);
//   };

//   let body = (
//     <Typography>
//       <Heading>You do not have any content types!</Heading>
//       <Paragraph>First create a content type with a JSON field to continue.</Paragraph>
//     </Typography>
//   );

//   if (contentTypes.length) {
//     body = (
//       <Select value={selectedContentTypeId} onChange={(e) => pickCt(e.target.value)}>
//         {contentTypes.map((ct) => (
//           <Option key={ct.sys.id} value={ct.sys.id}>
//             {ct.name}
//           </Option>
//         ))}
//       </Select>
//     );
//   }

//   return (
//     <div className="app">
//       <div className="background" />
//       <div className="body">
//         <div className="config">
//           <Typography>
//             <Heading>Unsplash</Heading>
//             <Paragraph>
//               Ayyyy lmao
//               <code> JSON</code> field.
//             </Paragraph>
//           </Typography>
//           {body}
//         </div>
//       </div>
//       <div className="logo" />
//     </div>
//   );
// };

// Config.propTypes = {
//   sdk: PropTypes.object,
// };

// export default Config;
export default class Config extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedContentTypeId: '',
      contentTypes: [],
    };
  }

  async componentDidMount() {
    const { app, space } = this.props.sdk;
    app.onConfigure(this.onConfigure);

    const [ctsRes, parameters] = await Promise.all([
      space.getContentTypes(),
      app.getParameters(),
    ]);

    const formattedContentTypes = ctsRes ? ctsRes.items : [];

    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState(
      {
        contentTypes: formattedContentTypes,
        selectedContentTypeId: parameters
          ? parameters.selectedContentTypeId
          : get(formattedContentTypes, [0, 'sys', 'id'], ''),
      },
      () => app.setReady()
    );
  }

  onConfigure = async () => {
    const { selectedContentTypeId, contentTypes } = this.state;

    const selectedContentType = contentTypes.find(
      (ct) => ct.sys.id === selectedContentTypeId
    );

    if (!selectedContentType) {
      this.props.sdk.notifier.error('You do not have any content types to select!');
      return false;
    }

    return {
      parameters: {
        selectedContentTypeId,
      },
      targetState: {
        EditorInterface: createEditorInterface(selectedContentType),
      },
    };
  };

  pickCt = (id) => {
    this.setState({ selectedContentTypeId: id });
  };

  render() {
    let body = (
      <Typography>
        <Heading>You do not have any content types!</Heading>
        <Paragraph>First create a content type with a JSON field to continue.</Paragraph>
      </Typography>
    );

    if (this.state.contentTypes.length) {
      body = (
        <Select
          value={this.state.selectedContentTypeId}
          onChange={(e) => this.pickCt(e.target.value)}
        >
          {this.state.contentTypes.map((ct) => (
            <Option key={ct.sys.id} value={ct.sys.id}>
              {ct.name}
            </Option>
          ))}
        </Select>
      );
    }

    return (
      <div className="app">
        <div className="background" />
        <div className="body">
          <div className="config">
            <Typography>
              <Heading>Unsplash</Heading>
              <Paragraph>
                Ayyyy lmao
                <code> JSON</code> field.
              </Paragraph>
            </Typography>
            {body}
          </div>
        </div>
        <div className="logo" />
      </div>
    );
  }
}
