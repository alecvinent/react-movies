import React from 'react';
import Rating from '@material-ui/lab/Rating';


const SimpleRating = ({rate = 2, isReadOnly = true, handleChange}) => {
    return (
        <Rating name="read-only" size={isReadOnly ? "small" : "medium"} value={rate} precision={isReadOnly ? 0.5 : 1} readOnly={isReadOnly}
                onChange={!isReadOnly ? handleChange : null}/>
    );
};

export default SimpleRating;