import Card from '@components/Card'
import SidebarLink, {NavigationLink} from '@components/SidebarLink'

const links: NavigationLink[] = [
  {
    label: 'Home',
    icon: 'Grid',
    to: '/home',
  },
  {
    label: 'Calendar',
    icon: 'Calendar',
    to: '/calendar',
  },
  {
    label: 'Profile',
    icon: 'User',
    to: 'profile',
  },
  {
    label: 'Settings',
    icon: 'Settings',
    to: '/settings',
  },
]

const Sidebar = () => {
  return (
    <Card className="flex h-full w-40 flex-wrap items-center justify-between">
      {links.map((link) => (
        <SidebarLink link={link} key={link.label} />
      ))}
    </Card>
  )
}

export default Sidebar
