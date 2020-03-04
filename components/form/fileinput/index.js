import React from 'react';
import PropTypes from 'prop-types';

const FileInput = ({ name, onChange }) => <input type="file" name={name} onChange={onChange} />;

FileInput.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
};

FileInput.defaultProps = {
    onChange: () => null,
};

export default FileInput;
