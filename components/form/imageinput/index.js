import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

const ImageInput = ({ media, name, onChange }) => {
    const [preview, setPreview] = useState(null);

    const reader = new FileReader();

    const handleChange = (event) => {
        const [file] = event.target.files;
        reader.readAsDataURL(file);

        onChange(event);
    };

    useEffect(() => {
        const applyPreview = () => setPreview(reader.result);
        reader.addEventListener('load', applyPreview, false);

        return () => {
            reader.removeEventListener('load', applyPreview);
        };
    }, []);

    return (
        <div className={styles.root}>
            <div className={styles.inner}>
                {(media || preview) && (
                    <div
                        className={styles.image}
                        style={{ backgroundImage: `url(${preview || media.url})` }}
                        alt={name}
                    />
                )}
                {!media && !preview && <div className={styles.empty}>Click to upload image</div>}
                <input className={styles.control} type="file" name={name} onChange={handleChange} />
            </div>
        </div>
    );
};

ImageInput.displayName = 'ImageInput';

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
