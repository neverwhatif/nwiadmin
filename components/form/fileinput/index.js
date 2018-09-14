import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FileInput extends Component {
    handleChange(e) {
        this.props.onChange(e);
    }

    render() {
        const { name } = this.props;

        return (
            <input type="file" name={name} onChange={e => this.handleChange(e)} />
        );
    }
}

FileInput.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
};

FileInput.defaultProps = {
    onChange: () => null,
};

export default FileInput;
