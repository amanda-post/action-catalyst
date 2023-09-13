'use client';

import { Tab } from '@headlessui/react';
import clsx from 'clsx';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { Container } from '~/components/Container';
import PSDMockup from '~/images/psd-mockup.png';

const features = [
  {
    title: 'Tasks',
    description:
      'What do you want to accomplish in life that you keep putting off?',
  },
  {
    title: 'Rewards',
    description:
      "Things that you want, but don't need. Allow yourself to have them, but only after you've earned them.",
  },
  {
    title: 'History',
    description: "View your habits over time and see how far you've come.",
  },
  {
    title: 'COMING SOON - Goals',
    description: 'Add specific goals and track your progress towards them.',
  },
  {
    title: 'COMING SOON - Multi-person support',
    description:
      'Manage your household with your spouse and/or kids with a shared account.',
  },
];

export function PrimaryFeatures() {
  let [tabOrientation, setTabOrientation] = useState<'horizontal' | 'vertical'>(
    'horizontal',
  );

  useEffect(() => {
    let lgMediaQuery = window.matchMedia('(min-width: 1024px)');

    function onMediaQueryChange({ matches }: { matches: boolean }) {
      setTabOrientation(matches ? 'vertical' : 'horizontal');
    }

    onMediaQueryChange(lgMediaQuery);
    lgMediaQuery.addEventListener('change', onMediaQueryChange);

    return () => {
      lgMediaQuery.removeEventListener('change', onMediaQueryChange);
    };
  }, []);

  return (
    <section
      id='features'
      aria-label='Features for running your books'
      className='relative overflow-hidden bg-violet-700 pb-28 pt-20 sm:py-32'
    >
      <Container className='relative'>
        <div className='max-w-2xl md:mx-auto md:text-center xl:max-w-none'>
          <h2 className='font-display text-3xl tracking-tight text-white sm:text-4xl md:text-5xl'>
            Everything you need to <br />
            reach your potential.
          </h2>
          <p className='mt-6 text-lg tracking-tight text-violet-100'>
            Prioritize tasks, and choose your rewards. Experience the power of
            long-term gratification in becoming who you want to be.
          </p>
        </div>
        <Tab.Group
          as='div'
          className='mt-16 grid grid-cols-1 items-center gap-y-2 pt-10 sm:gap-y-6 md:mt-20 lg:grid-cols-12 lg:pt-0'
          vertical={tabOrientation === 'vertical'}
        >
          {({ selectedIndex }) => (
            <>
              <div className='-mx-4 flex overflow-x-auto pb-4 sm:mx-0 sm:overflow-visible sm:pb-0 lg:col-span-5'>
                <div className='relative z-10 flex gap-x-4 whitespace-nowrap px-4 sm:mx-auto sm:px-0 lg:mx-0 lg:block lg:gap-x-0 lg:gap-y-1 lg:whitespace-normal'>
                  {features.map((feature, featureIndex) => (
                    <div
                      key={feature.title}
                      className={clsx(
                        'group relative rounded-full px-4 py-1 lg:rounded-l-xl lg:rounded-r-none lg:p-6',
                        selectedIndex === featureIndex
                          ? 'bg-white lg:bg-white/10 lg:ring-1 lg:ring-inset lg:ring-white/10'
                          : 'hover:bg-white/10 lg:hover:bg-white/5',
                      )}
                    >
                      <h3>
                        <Tab
                          className={clsx(
                            'font-display ui-not-focus-visible:outline-none text-lg',
                            selectedIndex === featureIndex
                              ? 'text-violet-600 lg:text-white'
                              : 'text-violet-100 hover:text-white lg:text-white',
                          )}
                        >
                          <span className='absolute inset-0 rounded-full lg:rounded-l-xl lg:rounded-r-none' />
                          {feature.title}
                        </Tab>
                      </h3>
                      <p
                        className={clsx(
                          'mt-2 hidden text-sm lg:block',
                          selectedIndex === featureIndex
                            ? 'text-white'
                            : 'text-violet-100 group-hover:text-white',
                        )}
                      >
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className='mt-10 w-[45rem] overflow-hidden rounded-xl bg-slate-50 shadow-xl shadow-violet-700/20 sm:w-auto lg:mt-0 lg:w-[67.8125rem]'>
                <Image
                  className='w-full'
                  src={PSDMockup}
                  alt=''
                  priority
                  sizes='(min-width: 1024px) 67.8125rem, (min-width: 640px) 100vw, 45rem'
                />
              </div>
            </>
          )}
        </Tab.Group>
      </Container>
    </section>
  );
}
