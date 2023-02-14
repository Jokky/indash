import NextImage, { ImageProps } from 'next/image';
import { FC, useState } from 'react';

interface ImageFallbackProps extends ImageProps {
    fallbackSrc: string;
}

export const ImageFallback: FC<ImageFallbackProps> = ({
    fallbackSrc,
    ...props
}) => {
    const [src, setSrc] = useState(props.src);

    const onError = () => setSrc(fallbackSrc);

    return <NextImage {...props} src={src} onError={onError} />;
};
