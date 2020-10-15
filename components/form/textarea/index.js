import React from 'react';

import TextInput from '../textinput';

const TextArea = props => (
    <TextInput component="textarea" {...props} />
);

TextArea.displayName = 'TextArea';

export default TextArea;
