type TPriceProps = {
	price: number,
	discountPrice: number,
}

export const Price = ({ price, discountPrice }: TPriceProps) => {
	return (
		<div className="text-right text-white">
			{discountPrice && price ? (
				<>
					<p className='text-base font-bold'>{discountPrice}</p>
					<p className='text-xs line-through'>{price}</p>
				</>
			) : (
				<p className='text-base font-semibold'>{price}</p>
			)}
		</div>
	);
};
