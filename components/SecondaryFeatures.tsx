'use client';

import {
  ActivityIcon,
  BookOpenIcon,
  CircleDollarSignIcon,
  FerrisWheelIcon,
  HomeIcon,
  Users2Icon,
} from 'lucide-react';
import { ReactElement } from 'react';

import { Container } from '~/components/Container';

interface Feature {
  name: React.ReactNode;
  summary: string;
  description: string;
  icon: ReactElement;
}

const iconStyling = 'h-6 w-6 stroke-white ';

const features: Array<Feature> = [
  {
    name: 'Health & Wellness',
    summary:
      'Take care of yourself and reap the benefits of a healthy lifestyle.',
    description:
      'Exercise for 30 minutes • Drink 8 glasses of water • Cook a healthy meal • Sleep for 8 hours • Take a yoga class • Avoid sugar for a day • Floss your teeth • Write in your journal',
    icon: <ActivityIcon className={iconStyling} />,
  },
  {
    name: 'Career & Education',
    summary: 'Ace your classes, learn new skills and advance your career.',
    description:
      'Apply for a job or internship • Complete one course module • Review class notes • Attend a webinar • Update your resume • Plan a study group session • Read a book on professional development',
    icon: <BookOpenIcon className={iconStyling} />,
  },
  {
    name: 'Home & Organization',
    summary: 'Keep your home organized and running smoothly.',
    description:
      'Declutter one room • Do the laundry • Water the plants • Organize your workspace • Create a meal plan for the week • Create an emergency-preparedness kit  • Deep-clean the bathroom',
    icon: <HomeIcon className={iconStyling} />,
  },
  {
    name: 'Financial Goals',
    summary:
      'Organize your financial life by setting up savings goals, budget plans, and investment milestones.',
    description:
      'Create a budget • Save $20 • Review monthly expenses • Invest in a stock • Research a financial topic • Open a retirement account • Pay off a debt • Set up a recurring savings transfer • Meet with a financial advisor',
    icon: <CircleDollarSignIcon className={iconStyling} />,
  },
  {
    name: 'Hobbies & Fulfillment',
    summary: 'Maximize enjoyment in your free time by pursuing your passions.',
    description:
      'Practice an instrument for 30 minutes • Draw or paint for an hour • Complete a puzzle • Take photographs • Watch a documentary Write a short story or poem • Visit a museum or art gallery • Try a new sport • Cook a dish from a different culture • Complete a DIY project',
    icon: <FerrisWheelIcon className={iconStyling} />,
  },
  {
    name: 'Social & Relationships',
    summary:
      'Strengthen your relationships with friends, family, community, & the world around you',
    description:
      'Call a family member • Plan a date night • Write a thank-you note • Spend quality time with your pet • Compliment someone Help a friend with a task •  Send a "just because" gift • Reconnect with an old friend • Have a vulnerable conversation with someone',
    icon: <Users2Icon className={iconStyling} />,
  },
];

function Feature({
  feature,
  isActive,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'> & {
  feature: Feature;
  isActive: boolean;
}) {
  return (
    <div className={className} {...props}>
      <div className='flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600'>
        {feature.icon}
      </div>
      <h3 className='text-md mt-6 max-w-fit font-medium text-violet-500'>
        {feature.name}
      </h3>
      <p className='font-display mt-2 text-xl text-violet-900'>
        {feature.summary}
      </p>
      <p className='mt-4 text-sm text-black'>{feature.description}</p>
    </div>
  );
}

function FeaturesMobile() {
  return (
    <div className='-mx-4 mt-20 flex flex-col gap-y-10 overflow-hidden px-4 sm:-mx-6 sm:px-6 lg:hidden'>
      {features.map((feature) => (
        <Feature
          key={feature.summary}
          feature={feature}
          className='mx-auto max-w-2xl rounded-sm bg-violet-100 p-4'
          isActive
        />
      ))}
    </div>
  );
}

function FeaturesDesktop() {
  return (
    <div className='grid grid-cols-3 gap-x-8'>
      {features.map((feature) => (
        <Feature
          key={feature.summary}
          feature={feature}
          className='mx-auto mt-10 hidden max-w-2xl rounded-sm bg-violet-100 p-4 lg:block'
          isActive
        />
      ))}
    </div>
  );
}

export function SecondaryFeatures() {
  return (
    <section
      id='secondary-features'
      aria-label='Features for simplifying everyday business tasks'
      className='bg-gradient-to-b from-white to-violet-700 pb-10 pt-20 sm:pb-20 sm:pt-32 lg:pb-32'
    >
      <Container>
        <div className='mx-auto max-w-2xl md:text-center'>
          <h2 className='font-display text-3xl tracking-tight text-slate-900 sm:text-4xl'>
            Benefit across all aspects of your life.
          </h2>
          <p className='mt-4 text-lg tracking-tight text-slate-700'>
            Check out these ideas for inspiration on how to use Action Catalyst!
          </p>
        </div>

        <FeaturesMobile />
        <FeaturesDesktop />
      </Container>
    </section>
  );
}
