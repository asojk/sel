export const Profile = () => {
	return (
		<>
			<section className='relative mr-0 py-4'>
				<div className='grid w-full grid-cols-2 items-start justify-start gap-4'>
					<GridCard>
						<p className='text-sm'>
							Alex has over 10 years of experience in the tech and marketing industry, focusing on creating impactful
							digital solutions. He is a certified React developer and a published researcher, and has degrees with
							honors from the University of Minnesota and the University of Northern Iowa.
						</p>
						<div className='w-full'>
							<div className='flex items-center justify-center px-4'>
								<div className='flex w-full max-w-[250px] items-center justify-between'>
									<img
										src='https://prkm7pjvgapey0vo.public.blob.vercel-storage.com/src/assets/images/umn-BNmo3gXm6WOYlYfHMMGE4vY51DBDH6.webp'
										alt='University of Minnesota'
										className='w-[20%] max-w-[60px] object-contain'
									/>
									<img
										src='https://prkm7pjvgapey0vo.public.blob.vercel-storage.com/src/assets/images/uni-QfCtjbfg33oq4EO8bRsaTRtZ9Ek0ti.webp'
										alt='University of Northern Iowa'
										className='w-[20%] max-w-[60px] rounded-md bg-violet-800 object-contain dark:bg-transparent'
									/>
									<img
										src='https://prkm7pjvgapey0vo.public.blob.vercel-storage.com/src/assets/images/ResearchGate_icon_SVG-n6JxwxaF1wMOrpGMhkIULcVZEG0Txu.svg'
										alt='ResearchGate'
										className='w-[20%] max-w-[60px] object-contain'
									/>
								</div>
							</div>
						</div>
					</GridCard>
					<GridCard>
						<h4 className=''>Certifications</h4>
						<img
							src='https://prkm7pjvgapey0vo.public.blob.vercel-storage.com/src/assets/images/ReactCert-Q2gZzDqhBzQocwjK7yKel57FilzNKK.jpg'
							alt='React Certification'
							className='h-auto w-full rounded-xl border-2 border-B-4 object-contain'
						/>
					</GridCard>
				</div>

				{/* 
								<div className="mt-12 w-full">
									<div className="rounded-xl border border-s-light p-6 dark:border-p">
										<h4 className="H3 mb-4">Hundreds of Creative & Technical Projects</h4>
										<HoverDevCards />
									</div>
								</div>
								*/}
			</section>
		</>
	);
};

import React from 'react';

const GridCard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<div className='inline-flex flex-col items-start justify-start gap-1.5 rounded-xl border border-s-light p-4 dark:border-p'>
			{children}
		</div>
	);
};
