import React, {useState} from 'react';

export const CustomImage = ({src, defaultSrc, ...props}) => {
  const [imageSrc, setImageSrc] = useState(src);

  const handleImageError = () => {
    setImageSrc(defaultSrc);
  };

  return <img {...props} src={imageSrc} onError={handleImageError} />;
};