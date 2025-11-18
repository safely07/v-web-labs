import type { ReactNode } from "react";

type TSectionProps = {
	title: string,
	children: ReactNode
}

export const Section = ({ title, children }: TSectionProps) => {
	return (
		<section className='flex flex-col gap-6'>
			<h3 className='text-black text-2xl md:text-3xl font-bold text-center mb-8'>{title}</h3>
			{children}
		</section>
	);
};
