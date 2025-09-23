import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Users,
  Search,
  Plus,
  Phone,
  Mail,
  Calendar,
  Edit,
  Trash2
} from 'lucide-react';
import { CreateAppointmentModal } from '@/components/CreateAppointmentModal';

interface Client {
  id: number;
  name: string;
  phone: string;
  email?: string;
  totalAppointments: number;
  lastVisit: string;
  notes?: string;
  status: 'active' | 'inactive';
}

export function ClientsView() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Datos de ejemplo - en producción vendrían de Supabase
  const clients: Client[] = [
    {
      id: 1,
      name: 'María González',
      phone: '+34 666 123 456',
      email: 'maria@email.com',
      totalAppointments: 8,
      lastVisit: '2024-01-10',
      status: 'active',
      notes: 'Prefiere citas por la mañana'
    },
    {
      id: 2,
      name: 'Pedro Martín',
      phone: '+34 677 987 654',
      email: 'pedro@email.com',
      totalAppointments: 3,
      lastVisit: '2024-01-05',
      status: 'active'
    },
    {
      id: 3,
      name: 'Laura Ruiz',
      phone: '+34 688 456 789',
      totalAppointments: 12,
      lastVisit: '2024-01-08',
      status: 'active',
      notes: 'Alérgica a ciertos pigmentos'
    },
    {
      id: 4,
      name: 'Javier López',
      phone: '+34 699 321 654',
      email: 'javier@email.com',
      totalAppointments: 5,
      lastVisit: '2023-12-15',
      status: 'inactive'
    }
  ];

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm) ||
    (client.email && client.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusColor = (status: string) => {
    return status === 'active' 
      ? 'bg-success/10 text-success border-success/20'
      : 'bg-muted/10 text-muted-foreground border-border';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Users className="w-7 h-7 text-primary" />
            Clientes
          </h1>
          <p className="text-muted-foreground">Gestiona tu base de clientes</p>
        </div>
        <Button className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Cliente
        </Button>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-card backdrop-blur-sm border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Clientes</p>
                <p className="text-2xl font-bold text-foreground">{clients.length}</p>
              </div>
              <Users className="w-8 h-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card backdrop-blur-sm border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Activos</p>
                <p className="text-2xl font-bold text-success">
                  {clients.filter(c => c.status === 'active').length}
                </p>
              </div>
              <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                Activos
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card backdrop-blur-sm border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Nuevos (Mes)</p>
                <p className="text-2xl font-bold text-primary">12</p>
              </div>
              <Plus className="w-8 h-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card backdrop-blur-sm border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Citas Totales</p>
                <p className="text-2xl font-bold text-foreground">
                  {clients.reduce((acc, client) => acc + client.totalAppointments, 0)}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Búsqueda */}
      <Card className="bg-gradient-card backdrop-blur-sm border-border/50">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre, teléfono o email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Lista de clientes */}
      <Card className="bg-gradient-card backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Lista de Clientes</span>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {filteredClients.length} resultados
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredClients.map((client) => (
              <div
                key={client.id}
                className="flex items-center justify-between p-4 rounded-lg bg-card/50 border border-border/50 hover:shadow-soft transition-all duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground font-semibold">
                      {client.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">{client.name}</h3>
                       <Badge 
                         variant="outline" 
                         className={getStatusColor(client.status)}
                       >
                         {client.status === 'active' ? 'Activo' : 'Inactivo'}
                       </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {client.phone}
                      </span>
                      {client.email && (
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {client.email}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {client.totalAppointments} citas
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Última visita: {formatDate(client.lastVisit)}
                    </p>
                    {client.notes && (
                      <p className="text-xs text-muted-foreground mt-1 italic">
                        📝 {client.notes}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <CreateAppointmentModal 
                    trigger={
                      <Button variant="outline" size="sm">
                        <Calendar className="w-4 h-4 mr-2" />
                        Nueva Cita
                      </Button>
                    }
                  />
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}

            {filteredClients.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No se encontraron clientes
                </h3>
                <p className="text-muted-foreground">
                  {searchTerm ? 'Prueba con otros términos de búsqueda' : 'Comienza agregando tu primer cliente'}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}