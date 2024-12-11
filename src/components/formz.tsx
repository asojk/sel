import { motion } from 'motion/react';
import { useState } from 'react';
//import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog'
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';

type Inputs = {
	firstName: string;
	lastName: string;
	email: string;
	mobileNumber: string;
	projectType: string[];
	consentToContact: boolean;
	message: string;
};

export default function ContactForm() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		watch,
		setValue,
	} = useForm<Inputs>({
		defaultValues: {
			projectType: [],
		},
	});

	const onSubmit: SubmitHandler<Inputs> = async data => {
		setIsSubmitting(true);

		// Convert data to FormData
		const formData = new FormData();
		Object.keys(data).forEach(key => {
			if (key === 'projectType') {
				formData.append(key, data[key].join(','));
			} else {
				formData.append(key, String(data[key as keyof Inputs]));
			}
		});

		// Add hidden fields required by formsubmit.co
		formData.append('_captcha', 'false');
		formData.append('_subject', 'New form submission');
		formData.append('_autoresponse', 'Thank you for your submission. We will get back to you soon.');
		formData.append('_next', 'https://www.selynt.com');

		try {
			const response = await fetch('https://formsubmit.co/82120871942c24049c274ba8143a4f61', {
				method: 'POST',
				body: formData,
			});

			if (response.ok) {
				setIsModalOpen(true);
				reset();
			} else {
				console.error('Form submission failed');
			}
		} catch (error) {
			console.error('Error submitting form:', error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Card className='max-w-md md:max-w-lg lg:max-w-xl'>
			<CardContent>
				<form onSubmit={handleSubmit(onSubmit)} className='space-y-4 pt-8'>
					<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
						<div className='space-y-2'>
							<Label htmlFor='firstName'>First Name</Label>
							<Input
								id='firstName'
								{...register('firstName', { required: 'First name is required', maxLength: 80 })}
								placeholder='John'
							/>
							{errors.firstName && <p className='text-sm text-red-500'>{errors.firstName.message}</p>}
						</div>
						<div className='space-y-2'>
							<Label htmlFor='lastName'>Last Name</Label>
							<Input
								id='lastName'
								{...register('lastName', { required: 'Last name is required', maxLength: 100 })}
								placeholder='Doe'
							/>
							{errors.lastName && <p className='text-sm text-red-500'>{errors.lastName.message}</p>}
						</div>
					</div>
					<div className='space-y-2'>
						<Label htmlFor='email'>Email</Label>
						<Input
							id='email'
							type='email'
							{...register('email', {
								required: 'Email is required',
								pattern: {
									value: /^\S+@\S+$/i,
									message: 'Invalid email address',
								},
							})}
							placeholder='john.doe@example.com'
						/>
						{errors.email && <p className='text-sm text-red-500'>{errors.email.message}</p>}
					</div>
					<div className='space-y-2'>
						<Label htmlFor='mobileNumber'>Mobile Number</Label>
						<Input
							id='mobileNumber'
							type='tel'
							{...register('mobileNumber', {
								required: 'Mobile number is required',
								minLength: { value: 6, message: 'Mobile number must be at least 6 digits' },
								maxLength: { value: 12, message: 'Mobile number must not exceed 12 digits' },
								pattern: {
									value: /^[0-9]+$/,
									message: 'Invalid phone number',
								},
							})}
							placeholder='123456789'
						/>
						{errors.mobileNumber && <p className='text-sm text-red-500'>{errors.mobileNumber.message}</p>}
					</div>
					<Label>Project Type</Label>
					<div className='flex flex-wrap justify-center gap-2'>
      {['Website', 'Custom Website', 'Branding', 'Combo', 'Unsure'].map(type => (
        <Button
          key={type}
          type='button'
          variant={watch('projectType', []).includes(type) ? 'selected' : 'default'}
          onClick={() => {
            const currentTypes = watch('projectType', []);
            const newTypes = currentTypes.includes(type)
              ? currentTypes.filter(t => t !== type)
              : [...currentTypes, type];
            setValue('projectType', newTypes, { shouldValidate: true });
          }}
        >
          {type}
        </Button>
      ))}

						{errors.projectType && <p className='text-sm text-red-500'>{errors.projectType.message}</p>}
					</div>
					<div className='space-y-2'>
						<Label htmlFor='message'>Anything else?</Label>
						<Textarea id='message' {...register('message')} placeholder='Your message here...' />
					</div>
				</form>
			</CardContent>
			<CardFooter>
				<motion.button
					onClick={handleSubmit(onSubmit)}
					type='submit'
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.95 }}
					className='mx-auto mb-8 w-48 items-center justify-center rounded-full bg-a px-6 py-3 text-white shadow-lg hover:bg-a-dark focus:outline-none focus:ring-4 focus:ring-a-light dark:bg-a-dark dark:hover:bg-a-darker'
					disabled={isSubmitting}>
					{isSubmitting ? 'Submitting...' : 'Submit'}{' '}
				</motion.button>
			</CardFooter>

			<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Submission Successful</DialogTitle>
						<DialogDescription>Thank you for your submission. We will get back to you soon.</DialogDescription>
					</DialogHeader>
					<Button onClick={() => setIsModalOpen(false)}>Close</Button>
				</DialogContent>
			</Dialog>
		</Card>
	);
}
