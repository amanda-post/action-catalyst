import Link from 'next/link';
import { LogoHeader } from '~/app/login/components/LogoHeader';

import { Container } from '~/components/Container';
import { NavLink } from '~/components/NavLink';
import { GitHubLogo } from '~/components/ui/icons';

export function Footer() {
  return (
    <footer className='bg-slate-50'>
      <Container>
        <div className='py-16'>
          <LogoHeader />
          <nav className='mt-10 text-sm' aria-label='quick links'>
            <div className='-my-1 flex justify-center gap-x-6'>
              <NavLink href='#features'>Features</NavLink>
              <NavLink href='#secondary-features'>Uses</NavLink>
              <NavLink href='#about'>About</NavLink>
            </div>
          </nav>
        </div>
        <div className='flex flex-col items-center border-t border-slate-400/10 py-10 sm:flex-row-reverse sm:justify-between'>
          <Link
            href='https://github.com/amanda-post'
            className='group'
            aria-label='Amanda Post on GitHub'
          >
            <GitHubLogo
              aria-hidden='true'
              className='h-7 w-7 text-slate-500 group-hover:text-slate-700'
            />
          </Link>
          <p className='mt-6 text-sm text-slate-500 sm:mt-0'>
            Copyright &copy; {new Date().getFullYear()} Action Catalyst. All
            rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
