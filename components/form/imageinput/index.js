import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

class ImageInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            preview: null,
        };
    }

    componentWillMount() {
        this.reader = new FileReader();
        this.applyPreview = () => this.setState({ preview: this.reader.result });

        this.reader.addEventListener('load', this.applyPreview, false);
    }

    componentWillUnmount() {
        this.reader.removeEventListener('load', this.applyPreview);
    }

    handleChange(e) {
        const [file] = e.target.files;
        this.reader.readAsDataURL(file);

        this.props.onChange(e);
    }

    render() {
        const { name, media } = this.props;

        return (
            <div className={styles.root}>
                <div className={styles.inner}>
                    {(media || this.state.preview) && (
                        <div
                            className={styles.image}
                            style={
                                { backgroundImage: `url(${this.state.preview || media.url})` }
                            }
                            alt={name}
                        />
                    )}
                    {(!media && !this.state.preview) && (
                        <div className={styles.empty}>
                            Click to upload image
                        </div>
                    )}
                    <input className={styles.control} type="file" name={name} onChange={e => this.handleChange(e)} />
                </div>
            </div>
        );
    }
}

ImageInput.propTypes = {
    name: PropTypes.string.isRequired,
    media: PropTypes.shape({
        url: PropTypes.string.isRequired,
    }),
    onChange: PropTypes.func,
};

ImageInput.defaultProps = {
    media: null,
    onChange: () => null,
};

export default ImageInput;
