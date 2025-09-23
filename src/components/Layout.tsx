import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Users, 
  UserCheck, 
  Settings, 
  Menu,
  LogOut,
  Bell
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  currentPage?: string;
  userRole?: 'admin' | 'employee';
  onPageChange?: (page: string) => void;
}

export function Layout({ children, currentPage = 'dashboard', userRole = 'admin', onPageChange }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: 'dashboard', icon: Calendar, adminOnly: false },
    { name: 'Calendario', href: 'calendar', icon: Calendar, adminOnly: false },
    { name: 'Clientes', href: 'clients', icon: Users, adminOnly: false },
    { name: 'Empleados', href: 'employees', icon: UserCheck, adminOnly: true },
    { name: 'Configuración', href: 'settings', icon: Settings, adminOnly: true },
  ];

  const visibleNavigation = navigation.filter(item => 
    !item.adminOnly || userRole === 'admin'
  );

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-gradient-card backdrop-blur-md border-r border-border transition-transform duration-300 lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground">ReservasPro</h2>
                <p className="text-sm text-muted-foreground">
                  {userRole === 'admin' ? 'Administrador' : 'Empleado'}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {visibleNavigation.map((item) => (
              <Button
                key={item.name}
                variant={currentPage === item.href ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start text-left transition-all duration-200",
                  currentPage === item.href
                    ? "bg-primary text-primary-foreground shadow-glow"
                    : "hover:bg-accent/50"
                )}
                onClick={() => onPageChange?.(item.href)}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </Button>
            ))}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <UserCheck className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Usuario Demo</p>
                  <p className="text-xs text-muted-foreground">usuario@demo.com</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 lg:ml-64">
        {/* Top bar */}
        <header className="flex items-center justify-between px-6 py-4 bg-card/50 backdrop-blur-sm border-b border-border">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-semibold text-foreground capitalize">
              {currentPage.replace('-', ' ')}
            </h1>
          </div>

          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full"></span>
            </Button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>

      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}