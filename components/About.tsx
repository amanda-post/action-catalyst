import Image from 'next/image';
import { Container } from '~/components/Container';
import { Column } from '~/components/Flex';
import { Separator } from '~/components/ui/separator';
import ProfilePic from '~/images/profile-pic.jpg';

export function About() {
  return (
    <section
      id='secondary-features'
      aria-label='Features for simplifying your life'
      className='pb-22 relative overflow-hidden bg-violet-700 pt-12 sm:py-32'
    >
      <Container className='relative'>
        <div className='max-w-2xl md:mx-auto md:text-center xl:max-w-none'>
          <h2 className='font-display text-3xl tracking-tight text-white sm:text-4xl md:text-5xl'>
            About Action Catalyst
          </h2>
          <p className='mb-10 mt-6 text-left text-lg tracking-tight text-violet-200'>
            <span className='font-bold'>Action:</span>{' '}
            <span className='italic'>noun</span> The process of doing something
            to achieve an aim; a deed that brings about a result.
            <br />
            <br />
            <span className='font-bold'>Catalyst:</span>{' '}
            <span className='italic'>noun</span> An agent that provokes or
            speeds significant change or action; a spark that ignites
            transformation without being consumed.
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2'>
          <div className='w-5/6 text-right text-white'>
            <p className='italic'>
              The concept of withholding rewards until task completion is rooted
              in behavioral psychology and is often referred to as
              &quot;self-reinforcement&quot; or &quot;contingency
              management.&quot; The idea is to set up a system where you only
              allow yourself to receive a particular reward if and when you
              complete a certain task or goal. This approach leverages several
              psychological principles to improve effectiveness and motivation:
            </p>{' '}
            <br />
            <h2 className='mb-2 mt-6 text-lg font-bold'>
              Delayed Gratification
            </h2>{' '}
            By postponing the reward until after the task is complete,
            you&apos;re practicing delayed gratification. This helps train your
            self-control and focus, making it easier to resist distractions and
            stay on task.
            <h2 className='mb-2 mt-6 text-lg font-bold'>
              Operant Conditioning
            </h2>{' '}
            This is a form of learning where behavior is strengthened or
            weakened by the consequences that follow. In this case, completing a
            task (behavior) is followed by a reward (positive reinforcement),
            which makes it more likely that you&apos;ll complete similar tasks
            in the future.
            <h2 className='mb-2 mt-6 text-lg font-bold'>
              Intrinsic vs Extrinsic Motivation
            </h2>{' '}
            While intrinsic motivation (doing something because it&apos;s
            inherently rewarding) is generally more sustainable, extrinsic
            motivation (doing something for an external reward) can be a
            powerful tool for tasks that you find difficult to engage with. The
            external reward serves as an additional motivator.
            <h2 className='mb-2 mt-6 text-lg font-bold'>
              Goal Setting Theory
            </h2>{' '}
            Setting specific, measurable, achievable, relevant, and time-bound
            (SMART) goals increases the likelihood of achieving them. When these
            goals are tied to rewards, it creates a clear path to success and a
            tangible reason to strive for it.
            <h2 className='mb-2 mt-6 text-lg font-bold'>
              Dopamine and Reward Systems
            </h2>{' '}
            Completing tasks and receiving rewards releases dopamine, a
            neurotransmitter associated with pleasure and satisfaction. This
            creates a positive feedback loop that makes it easier to engage with
            tasks in the future.
            <h2 className='mb-2 mt-6 text-lg font-bold'>
              Tangible vs Intangible Rewards
            </h2>{' '}
            Rewards can be tangible (e.g., a treat, a purchase, time spent on a
            hobby) or intangible (e.g., a sense of accomplishment, time to
            relax). Both types can be effective, but tangible rewards often have
            a more immediate impact on motivation.
          </div>

          <div className='mx-7 my-5 rounded-sm bg-violet-200 p-10 lg:m-0'>
            <Column className='items-center justify-center'>
              <Image
                alt='picture of developer Amanda'
                src={ProfilePic}
                className='h-1/2 w-1/2 rounded-full'
              />
              <h1 className='mb-2 mt-6 text-2xl font-bold'>Amanda</h1>
              <p className='text-lg italic'>Creator of Action Catalyst</p>
            </Column>
            <p className='text-md mt-10 leading-loose text-violet-900'>
              Amanda is a full-stack software engineer with 4+ years of
              experience. She is passionate about creating applications that
              solve problems and make life easier.
              <br />
              <br />
              In her free time, she enjoys spending time with friends & family,
              playing video games, watching anime, and learning new things.
              <br />
              <br />
              <Separator className='bg-violet-900' />
              <br />
              In a world of distractions and instant gratification, it can be
              difficult to stay focused and motivated. Action Catalyst is a tool
              that helps you stay on track by rewarding you for completing tasks
              and achieving goals.
              <br />
              <br />I created Action Catalyst because I wanted to build
              something that would help me stay motivated and focused on my
              goals. I hope you find it useful too!
              <br />
              <br />- Amanda
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
