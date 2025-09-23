import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreateAppointmentModal } from '@/components/CreateAppointmentModal';
import { 
  Calendar,
  Users, 
  Clock,
  TrendingUp,
  Plus,
  Phone
} from 'lucide-react';

export function Dashboard() {
  // Datos de ejemplo - en producción vendrían de Supabase
  const stats = [
    {
      title: 'Citas Hoy',
      value: '8',
      description: '2 pendientes de confirmar',
      icon: Calendar,
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Clientes Totales',
      value: '247',
      description: '+12 este mes',
      icon: Users,
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      title: 'Próximas 24h',
      value: '15',
      description: 'recordatorios enviados',
      icon: Clock,
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      title: 'Ingresos Mes',
      value: '€3,240',
      description: '+18% vs mes anterior',
      icon: TrendingUp,
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    }
  ];

  const todayAppointments = [
    {
      id: 1,
      time: '09:00',
      client: 'María González',
      service: 'Tatuaje brazo',
      employee: 'Carlos',
      status: 'confirmed',
      phone: '+34 666 123 456'
    },
    {
      id: 2,
      time: '11:30',
      client: 'Pedro Martín',
      service: 'Retoque color',
      employee: 'Ana',
      status: 'pending',
      phone: '+34 677 987 654'
    },
    {
      id: 3,
      time: '14:00',
      client: 'Laura Ruiz',
      service: 'Diseño personalizado',
      employee: 'Carlos',
      status: 'confirmed',
      phone: '+34 688 456 789'
    },
    {
      id: 4,
      time: '16:30',
      client: 'Javier López',
      service: 'Piercing oreja',
      employee: 'Sofia',
      status: 'confirmed',
      phone: '+34 699 321 654'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-success/10 text-success border-success/20';
      case 'pending':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'cancelled':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return 'bg-muted/10 text-muted-foreground border-border';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmada';
      case 'pending':
        return 'Pendiente';
      case 'cancelled':
        return 'Cancelada';
      default:
        return 'Desconocido';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header con acción rápida */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Resumen de tu negocio</p>
        </div>
        <CreateAppointmentModal />
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-gradient-card backdrop-blur-sm border-border/50 hover:shadow-medium transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Citas de hoy */}
      <Card className="bg-gradient-card backdrop-blur-sm border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Citas de Hoy
            </CardTitle>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {todayAppointments.length} citas
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {todayAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between p-4 rounded-lg bg-card/50 border border-border/50 hover:shadow-soft transition-all duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col items-center">
                    <span className="text-sm font-medium text-primary">
                      {appointment.time}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{appointment.client}</p>
                    <p className="text-sm text-muted-foreground">{appointment.service}</p>
                    <p className="text-xs text-muted-foreground">
                      Empleado: {appointment.employee}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge 
                    variant="outline" 
                    className={getStatusColor(appointment.status)}
                  >
                    {getStatusText(appointment.status)}
                  </Badge>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-muted-foreground hover:text-primary"
                  >
                    <Phone className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}