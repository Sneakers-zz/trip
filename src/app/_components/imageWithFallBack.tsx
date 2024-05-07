import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

interface ImageWithFallbackProps extends ImageProps {
  defaultSrc: string;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  width,
  height,
  defaultSrc,
  ...rest
}) => {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    setImgSrc(''); // Set src to an empty string to prevent further loading attempts
  };

  return (
    <Image
      src={imgSrc || defaultSrc} // Use defaultSrc if imgSrc is falsy
      alt={alt}
      width={width}
      height={height}
      onError={handleError}
      {...rest}
    />
  );
};

export default ImageWithFallback;
