'use client'

import clsx from 'clsx'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {Calendar, Grid, Settings, User} from 'react-feather'

const icons = {Settings, User, Grid, Calendar}

export interface NavigationLink {
  label: string
  icon: 'Settings' | 'User' | 'Grid' | 'Calendar'
  to: string
}

interface SidebarLinkProps {
  link: NavigationLink
}

const SidebarLink = ({link}: SidebarLinkProps) => {
  const pathname = usePathname()
  let isActive = false

  if (pathname === link.to) {
    isActive = true
  }

  const Icon = icons[link.icon]

  return (
    <Link href={link.to} className="flex w-full items-center justify-center">
      <Icon
        size={40}
        className={clsx(
          'stroke-gray-400 transition duration-200 ease-in-out hover:stroke-violet-600',
          isActive && 'stroke-violet-600',
        )}
      />
    </Link>
  )
}

export default SidebarLink
