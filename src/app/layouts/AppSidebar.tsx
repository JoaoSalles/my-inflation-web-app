import { TrendingUp, Home, Info, ScrollText } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { useUserStore } from '@/store/user'

const navItems = [
  { name: 'Início', url: '/', icon: Home },
  { name: 'Registros', url: '/logs', icon: ScrollText },
  { name: 'Sobre', url: '/about', icon: Info },
]

function UserAvatar({ name }: { name: string }) {
  const initial = name.charAt(0).toUpperCase()
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="7" stroke="var(--border)" strokeWidth="1" />
      <text
        x="8"
        y="8" 
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="8"
        fontFamily="'Inter Variable', system-ui, sans-serif"
        fontWeight="500"
        fill="var(--text)"
      >
        {initial}
      </text>
    </svg>
  )
}

export function AppSidebar() {
  const { pathname } = useLocation()
  const user = useUserStore((state) => state.user)
  const displayName = user?.name ?? 'Usuário'

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex h-8 items-center gap-2 px-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
          <TrendingUp size={16} className="shrink-0" style={{ color: 'var(--text)' }} />
          <span
            className="truncate text-sm font-medium group-data-[collapsible=icon]:hidden"
            style={{ color: 'var(--text-h)' }}
          >
            Meu IBGE
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.name}
                  isActive={pathname === item.url}
                  className="data-[active=true]:bg-background-selected data-[active=true]:text-background"
                >
                  <Link to={item.url}>
                    <item.icon />
                    <span>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip={displayName}>
              <UserAvatar name={displayName} />
              <span>{displayName}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
