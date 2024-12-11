export const Vision = () => {
	return (
		<section className='flex w-full cursor-default flex-col gap-8 px-4 py-6 antialiased md:flex-row lg:py-12 lg:subpixel-antialiased'>
			<Copy />
		</section>
	);
};

const Copy = () => (
	<div className='mx-auto flex max-w-2xl flex-col items-start py-4 text-left md:px-4 lg:px-0'>
		<div className='font-black tracking-tight pb-8 text-4xl md:text-6xl text-black dark:text-white'>
			<h2 className=''>
				Websites & Branding <br className='md:hidden' />
				<span className='text-a dark:text-s'> Without the BS</span>
			</h2>
		</div>

		<p className='mb-4 text-left text-base text-n-9 dark:text-n-1 md:text-lg lg:text-xl'>
			You are entitled to whichever methods you prefer when working with us, but
			<span className='font-bold italic text-a'> here you will find:</span>
		</p>
		<div className='grid w-full grid-cols-1 gap-4 text-left text-n-900 dark:text-n-1 md:grid-cols-3 md:place-items-center md:gap-0'>
			<ListItem>No Tracking</ListItem>
			<ListItem>No Ads</ListItem>
			<ListItem>No Jargon</ListItem>
		</div>
	</div>
);

const ListItem = ({ children }: { children: React.ReactNode }) => (
	<div className='flex items-center justify-start'>
		<svg
			className='mr-2 h-4 w-4 text-s sm:h-5 sm:w-5'
			fill='none'
			stroke='currentColor'
			viewBox='0 0 24 24'
			xmlns='http://www.w3.org/2000/svg'>
			<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 13l4 4L19 7'></path>
		</svg>
		<span className='text-lg font-semibold tracking-tight text-n-9 dark:text-n-1 sm:text-xl lg:text-2xl'>
			{children}
		</span>
	</div>
);
