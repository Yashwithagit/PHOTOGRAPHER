import React from 'react';
import styled from 'styled-components';

interface ThumbnailProps {
    src: string;
    alt: string;
}

const ThumbnailImage = styled.img`
    width: 150px; /* Adjust as needed */
    height: 150px; /* Adjust as needed */
    margin: 5px;
`;

const Thumbnail: React.FC<ThumbnailProps> = ({ src, alt }) => {
    return <ThumbnailImage src={src} alt={alt} />;
};

export default Thumbnail;
