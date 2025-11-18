type TTitleProps = {
	title: string,
}

export const Title = ({ title }: TTitleProps) => {
	return <p className='text-sm font-medium'>{title}</p>;
};
