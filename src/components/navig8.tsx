
import { Dispatch, ReactNode, SetStateAction, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { IconBrandInstagram, IconBrandLinkedin, IconBrandGithub } from '@tabler/icons-react'
import { images } from '../assets/assets'



export const Nav = () => {
	const [active, setActive] = useState(false)

	return (
		<>
		<Logo />
			<HamburgerButton active={active} setActive={setActive} />
			<AnimatePresence>{active && <LinksOverlay />}</AnimatePresence>
		</>
	)
}

const LinksOverlay = () => {
	return (
		<nav className="fixed right-4 top-4 z-[9997] h-[calc(100vh_-_32px)] w-[calc(100%_-_32px)] overflow-hidden">
			<LinksContainer />
			<FooterCTAs />
		</nav>
	)
}

const LinksContainer = () => {
  return (
		<motion.div className="flex flex-col justify-between h-full">
			<div className="space-y-8 p-6">

        {LINKS.map((l, idx) => (
          <NavLink key={l.title} to={l.to} idx={idx}>
            {l.title}
          </NavLink>
        ))}

      <div className="flex justify-between items-end mt-0">
        <div className="flex-col gap-4">
          {SOCIAL_CTAS.map((l, idx) => (
            <motion.a
              key={idx}
              href={l.href}
              initial={{ opacity: 0, y: -8 }}
							exit={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0,
                transition: { delay: 1 + idx * 0.125, duration: 0.5, ease: 'easeOut' },
              }}>
            </motion.a>
          ))}
					</div>
				</div>
			</div>
    </motion.div>
  );
};

const NavLink = ({ children, idx }: { children: ReactNode; to: string; idx: number }) => {
	return (
		<motion.a
			variants={itemVariants}
			initial={{ opacity: 0, y: -8 }}
			exit={{ opacity: 0, y: -8 }}
			animate={{ opacity: 1, y: 0,
				transition: { delay: 0.75 + idx * 0.125, duration: 0.5, ease: 'easeInOut' },
			}}
      className="block text-5xl font-semibold text-p-dark hover:text-p-2 dark:text-white transition-colors dark:hover:text-s overflow-hidden cursor-pointer pl-13 justify-center">

				<motion.div whileHover={{ y: -56 }} transition={{ ease: 'backInOut', duration: 0.5 }} className="h-[56px] text-5xl">
					<span className="flex h-[56px] items-center">{children}</span>
					<span className="flex h-[56px] items-center text-p-3 dark:text-a">{children}</span>
				</motion.div>

		</motion.a>
	)
}

const HamburgerButton = ({ active, setActive }: { active: boolean; setActive: Dispatch<SetStateAction<boolean>> }) => {
	return (
		<>

			<motion.div
				initial={false}
				animate={active ? 'open' : 'closed'}
				variants={UNDERLAY_VARIANTS}
				style={{ top: 16, right: 16 }}
				className="fixed z-[9997] rounded-xl bg-gradient-to-br from-p-3 via-p-4 to-p-4 shadow-lg shadow-black/20 dark:shadow-b-4/20 cursor-pointer"
			/>

			<motion.button
				initial={false}
				animate={active ? 'open' : 'closed'}
				onClick={() => setActive((pv) => !pv)}
				className={`group fixed right-6 top-6 z-[9998] h-10 w-10 bg-n-5/0 dark:bg-n-5/0 transition-all cursor-pointer ${
					active ? 'rounded-bl-xl rounded-tr-xl' : 'rounded-xl'
				}`}>
					
				<motion.span
					variants={HAMBURGER_VARIANTS.top}
					className="absolute block h-[0.75px] w-8 bg-n-1"
					style={{ y: '-50%', left: '50%', x: '-50%' }}
				/>
				<motion.span
					variants={HAMBURGER_VARIANTS.middle}
					className="absolute block h-[0.75px] w-8 bg-n-1"
					style={{ left: '50%', x: '-50%', top: '50%', y: '-50%' }}
				/>
				<motion.span
					variants={HAMBURGER_VARIANTS.bottom}
					className="absolute block h-[1px] w-3 bg-n-1"
					style={{ x: '-50%', y: '50%' }}
				/>
			</motion.button>

		</>
	)
}

const FooterCTAs = () => {
	return (
		<>
			<div className="absolute bottom-6 left-6 flex gap-4 md:flex-col">
				{SOCIAL_CTAS.map((l, idx) => {
					return (
						<motion.a
							key={idx}
							href={l.href}
							initial={{ opacity: 0, y: -8 }}
							animate={{
								opacity: 1,
								y: 0,
								transition: {
									delay: 1 + idx * 0.125,
									duration: 0.5,
									ease: 'easeInOut',
								},
							}}
							exit={{ opacity: 0, y: -8 }}>
							<l.Component className="text-xl text-p-4 transition-colors hover:text-p-2" />
						</motion.a>
					)
				})}
			</div>
		</>
	)
}

const Logo = () => {
	return (
    <div className='absolute left-6 top-6 z-[999]'>
		<motion.div
			initial={{ opacity: 0, y: -10 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{
				delay: 0.2,
				duration: 0.6,
				ease: 'easeOut',
			}}>
			<img src={images.logo} alt='logo' className='relative z-[1000] h-12 dark:hidden' />
			<img
				src={images.dlogo}
				alt='logo'
				className='relative z-[1000] hidden h-12 dark:block'
			/>
		</motion.div>
	</div>
	)
}

const LINKS = [
	{
		title: 'home',
		to: '/',
	},
	{
		title: 'about',
		to: '/about',
	},
	{
		title: 'pricing',
		to: '/pricing',
	},
	{
		title: 'careers',
		to: '*',
	},
]

const SOCIAL_CTAS = [
	{
		Component: IconBrandInstagram,
		href: '*',
	},
	{
		Component: IconBrandLinkedin,
		href: 'https://www.linkedin.com/company/selynt',
	},
	{
		Component: IconBrandGithub,
		href: 'https://www.github.com/asojk',
	},
]

const UNDERLAY_VARIANTS = {
	open: {
		width: 'calc(100% - 32px)',
		height: 'calc(100vh - 32px)',
		transition: { type: 'spring', mass: 3, stiffness: 400, damping: 50 },
	},
	closed: {
		width: '60px',
		height: '60px',
		transition: {
			delay: 0.75,
			type: 'spring',
			mass: 3,
			stiffness: 400,
			damping: 50,
		},
	},
}

const HAMBURGER_VARIANTS = {
	top: {
		open: {
			rotate: ['0deg', '0deg', '45deg'],
			top: ['35%', '50%', '50%'],
		},
		closed: {
			rotate: ['45deg', '0deg', '0deg'],
			top: ['50%', '50%', '35%'],
		},
	},
	middle: {
		open: {
			rotate: ['0deg', '0deg', '-45deg'],
		},
		closed: {
			rotate: ['-45deg', '0deg', '0deg'],
		},
	},
	bottom: {
		open: {
			rotate: ['0deg', '0deg', '45deg'],
			bottom: ['35%', '50%', '50%'],
			left: '50%',
		},
		closed: {
			rotate: ['45deg', '0deg', '0deg'],
			bottom: ['50%', '50%', '35%'],
			left: 'calc(50% + 10px)',
		},
	},
}

const itemVariants = {
	expanded: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.3, ease: 'easeOut' },
	},
	collapsed: {
		opacity: 0,
		y: -10,
		transition: { duration: 0.3, ease: 'easeIn' },
	},
}
