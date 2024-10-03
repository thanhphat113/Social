import { forwardRef, useState } from "react";
import noImage from '../../Assets/Images/no-image.svg';
import PropTypes from 'prop-types';

const Image = forwardRef(({ src, alt, fallBack: customFallBack = noImage, ...props }, ref) => {
    const [fallBack, setFallBack] = useState(customFallBack); 

    const handleError = () => {
        setFallBack(customFallBack);
    }

    return (
        <img 
            ref={ref} 
            alt={alt} 
            src={src || fallBack} 
            {...props} 
            onError={handleError} 
        />
    );
});

Image.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    fallBack: PropTypes.string,
};

Image.displayName = 'Image';

export default Image;