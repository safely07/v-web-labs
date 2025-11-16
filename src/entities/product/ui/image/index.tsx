type TImageProps = {
	url: string,
	alt: string,
	className?: string,
}

export const Image = ({ url, alt, className="" }: TImageProps) => {
	return <img src={url} alt={alt} className={className}/>;
};
