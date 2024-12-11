/* eslint-disable @typescript-eslint/no-unused-vars */

import { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useOutsideClick } from '../../hooks/use-outside-click';
import { TimeLine } from './timeline';
import { Profile } from './Profile';
import ContactForm from '../formz';
import { IconInfoCircle, IconMailBolt, IconMap, IconTag } from '@tabler/icons-react';
import React from 'react';
import { Map } from '../Map';

export function ExpandableCardDemo() {
	const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(null);
	const ref = useRef<HTMLDivElement>(null);
	const id = useId();

	useEffect(() => {
		function onKeyDown(event: KeyboardEvent) {
			if (event.key === 'Escape') {
				setActive(false);
			}
		}

		if (active && typeof active === 'object') {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}

		window.addEventListener('keydown', onKeyDown);
		return () => window.removeEventListener('keydown', onKeyDown);
	}, [active]);

	useOutsideClick(ref, () => setActive(null));

	return (
		<>
			<AnimatePresence>
				{active && typeof active === 'object' && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className='fixed inset-0 bg-black/20 h-full w-full z-10'
					/>
				)}
			</AnimatePresence>
			<AnimatePresence>
				{active && typeof active === 'object' ? (
					<div className='fixed inset-0 grid place-items-center z-[100]'>
						<motion.button
							key={`button-${active.title}-${id}`}
							layout
							initial={{
								opacity: 0,
							}}
							animate={{
								opacity: 1,
							}}
							exit={{
								opacity: 0,
								transition: {
									duration: 0.05,
								},
							}}
							className='flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6'
							onClick={() => setActive(null)}>
							<CloseIcon />
						</motion.button>
						<motion.div
							layoutId={`card-${active.title}-${id}`}
							ref={ref}
							className='w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 md:rounded-3xl overflow-hidden'>
							{active.src && (
								<motion.div layoutId={`image-${active.title}-${id}`}>
									<img
										width={200}
										height={200}
										src={active.src}
										alt={active.title}
										className='w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-center'
									/>
								</motion.div>
							)}

							<div>
								<div className='flex justify-between items-start p-4'>
									<div className=''>
										<motion.h3 layoutId={`title-${active.title}-${id}`} className='font-bold text-n-9 dark:text-n-2'>
											{active.title}
										</motion.h3>
										<motion.p layoutId={`description-${active.description}-${id}`} className='text-n-7 dark:text-n-5'>
											{active.description}
										</motion.p>
									</div>
									{active.ctaLink && (
										<motion.a
											layoutId={`button-${active.title}-${id}`}
											href={active.ctaLink}
											target='_blank'
											className='px-4 py-3 text-sm rounded-2xl font-bold bg-a-dark text-white'>
											{active.ctaText}
										</motion.a>
									)}
								</div>
								<div className='pt-4 relative px-4'>
									<motion.div
										layout
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										className='text-n-9 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-n-5 [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]'>
										{typeof active.content === 'function' ? active.content() : active.content}
									</motion.div>
								</div>
							</div>
						</motion.div>
					</div>
				) : null}
			</AnimatePresence>
			<ul className='max-w-2xl mx-auto w-full gap-4'>
  {cards.map((card, _index) => (
    <motion.div
      layoutId={`card-${card.title}-${id}`}
      key={`card-${card.title}-${id}`}
      onClick={() => setActive(card)}
      className='p-4 flex flex-row justify-between items-start sm:items-center hover:bg-n-4 dark:hover:bg-n-900 rounded-xl cursor-pointer'
    >
      <div className='flex gap-4 md:items-start items-center md:w-full w-auto'>
        <motion.div layoutId={`image-${card.title}-${id}`} className='flex-shrink-0'>
          {card.src ? (
            <img
              width={56}
              height={56}
              src={card.src}
              alt={card.title}
              className='h-14 w-14 rounded-lg object-cover object-center'
            />
          ) : card.icon ? (
            <div className='h-14 w-14 rounded-lg bg-p dark:bg-p-3 flex items-center justify-center'>
              {React.createElement(card.icon, { className: 'text-xl text-s stroke-[1.5px]' })}
            </div>
          ) : (
            <div className='h-14 w-14 rounded-lg bg-p dark:bg-p-3 flex items-center justify-center' />
          )}
        </motion.div>
        <div className='flex-grow'>
          <motion.h3
            layoutId={`title-${card.title}-${id}`}
            className='font-medium text-neutral-800 dark:text-neutral-200 text-left'
          >
            {card.title}
          </motion.h3>
          <motion.p
            layoutId={`description-${card.description}-${id}`}
            className='text-neutral-600 dark:text-neutral-400 text-left'
          >
            {card.description}
          </motion.p>
        </div>
      </div>
      <motion.button
        layoutId={`button-${card.title}-${id}`}
        className='px-4 py-2 text-sm rounded-2xl bg-p dark:bg-p-3 hover:bg-p-2 hover:text-black text-n-3 w-auto'
      >
        {card.ctaText}
      </motion.button>
    </motion.div>
  ))}
</ul>
		</>
	);
}

export const CloseIcon = () => {
	return (
		<motion.svg
			initial={{
				opacity: 0,
			}}
			animate={{
				opacity: 1,
			}}
			exit={{
				opacity: 0,
				transition: {
					duration: 0.05,
				},
			}}
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
			className='h-4 w-4 text-black'>
			<path stroke='none' d='M0 0h24v24H0z' fill='none' />
			<path d='M18 6l-12 12' />
			<path d='M6 6l12 12' />
		</motion.svg>
	);
};

type Card = {
	description: string;
	title: string;
	src?: string;
	icon?: React.ComponentType<{ className?: string }>;
	ctaText: string;
	ctaLink: string;
	content: () => React.ReactNode;
};

const cards: Card[] = [
	{
		description: 'Simple & Easy',
		title: 'Our Process',
		icon: IconInfoCircle,
		ctaText: 'View',
		ctaLink: '',
		content: () => <TimeLine />,
	},
	{
		description: 'What we Do & How Much we Cost',
		title: 'Our Services',
		icon: IconTag,
		ctaText: 'Explore',
		ctaLink: '',
		content: () => <TimeLine />,
	},

	{
		description: 'Founder Bio',
		title: 'Founder',
		src: 'https://prkm7pjvgapey0vo.public.blob.vercel-storage.com/src/assets/images/Alex-SzEU7blXzZfyYfDwscptYyqFiVkAbg.jpg',
		ctaText: 'Investigate',
		ctaLink: '',
		content: () => <Profile />,
	},
	{
		description: 'Our Network of Trusted Professionals',
		title: 'Our Work',
		icon: IconMap,
		src: '',
		ctaText: 'Discover',
		ctaLink: '',
		content: () => <Map />,
	},
	{
		description: 'Questions? Ready to Get Started?',
		title: 'Contact',
		icon: IconMailBolt,
		src: '',
		ctaText: 'Begin',
		ctaLink: '',
		content: () => <ContactForm />,
	},
];
