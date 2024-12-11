
import { images } from '../../assets/assets'


export const Footer = () => {


	return (
		<footer className="antialiased overflow-x-clip lg:subpixel-antialiased">
								<div className='grid-background-z'></div>
			<div className="max-w-screen-md px-5 mx-auto lg:px-8">
				<div className="py-4 border-t border-p-light">
					<div className="flex flex-col items-center justify-center space-y-4">
						<div className="flex flex-col items-center">
							<div className="block w-20 h-20 mb-2 dark:hidden lg:h-24 lg:w-24">
								<img src={images.logo} alt="Selynt logo" className="object-contain w-full h-full" />
							</div>
							<div className="hidden w-20 h-20 mb-2 dark:block lg:h-24 lg:w-24">
								<img src={images.dlogo} alt="Selynt logo" className="object-contain w-full h-full" />
							</div>
							<p className="text-sm text-center text-n-7 dark:text-n-3">
								&copy; {new Date().getFullYear()}
								<span className="italic text-a"> Selynt </span>
								All rights reserved.
							</p>
						</div>

						<div className="flex flex-col items-center pb-2 space-y-2">
							<a href="mailto:contact@selynt.com" className="text-sm text-n-7 dark:text-n-3 hover:text-a dark:hover:text-white">
								contact@selynt.com
							</a>

							<div className="flex space-x-4">
<a className='text-n-7 hover:text-a dark:text-n-3 dark:hover:text-white text-sm' href="" target="_blank" rel="noopener noreferrer">privacy</a>
<a className='text-n-7 hover:text-a dark:text-n-3 dark:hover:text-white text-sm' href="" target="_blank" rel="noopener noreferrer">terms</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}
