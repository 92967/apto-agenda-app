import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreateAppointmentModal } from '@/components/CreateAppointmentModal';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar,
  Clock,
  User,
  Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';

type CalendarView = 'month' | 'week' | 'day';

export function CalendarView() {
  const [currentView, setCurrentView] = useState<CalendarView>('month');
  const [currentDate, setCurrentDate] = useState(new Date());

  // Datos de ejemplo - en producción vendrían de Supabase
  const appointments = [
    {
      id: 1,
      title: 'María González - Tatuaje brazo',
      time: '09:00',
      duration: 120,
      employee: 'Carlos',
      employeeColor: '#3B82F6',
      status: 'confirmed',
      date: new Date(2024, 0, 15) // 15 enero 2024
    },
    {
      id: 2,
      title: 'Pedro Martín - Retoque color',
      time: '11:30',
      duration: 90,
      employee: 'Ana',
      employeeColor: '#10B981',
      status: 'pending',
      date: new Date(2024, 0, 15)
    },
    {
      id: 3,
      title: 'Laura Ruiz - Diseño personalizado',
      time: '14:00',
      duration: 180,
      employee: 'Carlos',
      employeeColor: '#3B82F6',
      status: 'confirmed',
      date: new Date(2024, 0, 16)
    }
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Días del mes anterior para completar la primera semana
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push({ date: prevDate, isCurrentMonth: false });
    }

    // Días del mes actual
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      days.push({ date, isCurrentMonth: true });
    }

    // Días del mes siguiente para completar la última semana
    const remainingDays = 42 - days.length; // 6 semanas × 7 días
    for (let day = 1; day <= remainingDays; day++) {
      const nextDate = new Date(year, month + 1, day);
      days.push({ date: nextDate, isCurrentMonth: false });
    }

    return days;
  };

  const getAppointmentsForDate = (date: Date) => {
    return appointments.filter(apt => 
      apt.date.toDateString() === date.toDateString()
    );
  };

  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString('es-ES', { 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-success/20 text-success border-success/30';
      case 'pending':
        return 'bg-warning/20 text-warning border-warning/30';
      case 'cancelled':
        return 'bg-destructive/20 text-destructive border-destructive/30';
      default:
        return 'bg-muted/20 text-muted-foreground border-border';
    }
  };

  if (currentView === 'month') {
    const days = getDaysInMonth(currentDate);
    const weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

    return (
      <div className="space-y-6">
        {/* Header del calendario */}
        <Card className="bg-gradient-card backdrop-blur-sm border-border/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-primary" />
                  Calendario
                </CardTitle>
                
                {/* Controles de navegación */}
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigateMonth('prev')}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <span className="text-lg font-semibold min-w-[200px] text-center capitalize">
                    {formatMonthYear(currentDate)}
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigateMonth('next')}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Vista selector y botón nueva cita */}
              <div className="flex items-center gap-3">
                <div className="flex rounded-lg bg-muted/50 p-1">
                  {(['month', 'week', 'day'] as CalendarView[]).map((view) => (
                    <Button
                      key={view}
                      variant={currentView === view ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setCurrentView(view)}
                      className={cn(
                        "capitalize",
                        currentView === view && "bg-primary text-primary-foreground shadow-sm"
                      )}
                    >
                      {view === 'month' ? 'Mes' : view === 'week' ? 'Semana' : 'Día'}
                    </Button>
                  ))}
                </div>
                
                <CreateAppointmentModal 
                  trigger={
                    <Button size="sm" className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
                      <Plus className="w-4 h-4 mr-2" />
                      Nueva Cita
                    </Button>
                  }
                />
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Grid del calendario */}
        <Card className="bg-gradient-card backdrop-blur-sm border-border/50">
          <CardContent className="p-0">
            {/* Header de días de la semana */}
            <div className="grid grid-cols-7 border-b border-border/50">
              {weekDays.map((day) => (
                <div
                  key={day}
                  className="p-3 text-center text-sm font-semibold text-muted-foreground bg-muted/20"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Grid de días */}
            <div className="grid grid-cols-7">
              {days.map((day, index) => {
                const dayAppointments = getAppointmentsForDate(day.date);
                
                return (
                  <div
                    key={index}
                    className={cn(
                      "min-h-[120px] p-2 border-r border-b border-border/30 hover:bg-accent/30 transition-colors",
                      !day.isCurrentMonth && "bg-muted/10 text-muted-foreground",
                      isToday(day.date) && "bg-primary/5 border-primary/30"
                    )}
                  >
                    <div className={cn(
                      "text-sm font-medium mb-2",
                      isToday(day.date) && "text-primary font-bold"
                    )}>
                      {day.date.getDate()}
                    </div>
                    
                    {/* Citas del día */}
                    <div className="space-y-1">
                      {dayAppointments.map((appointment) => (
                        <div
                          key={appointment.id}
                          className={cn(
                            "p-1 rounded text-xs border cursor-pointer hover:shadow-sm transition-all",
                            getStatusColor(appointment.status)
                          )}
                          style={{ 
                            borderLeftColor: appointment.employeeColor,
                            borderLeftWidth: '3px'
                          }}
                        >
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span className="font-medium">{appointment.time}</span>
                          </div>
                          <div className="truncate">{appointment.title}</div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <User className="w-3 h-3" />
                            <span>{appointment.employee}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Para vistas semana y día (implementar después)
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-card backdrop-blur-sm border-border/50">
        <CardContent className="flex items-center justify-center h-40">
          <div className="text-center">
            <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">
              Vista de {currentView === 'week' ? 'semana' : 'día'} próximamente
            </p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => setCurrentView('month')}
            >
              Volver a vista mensual
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}