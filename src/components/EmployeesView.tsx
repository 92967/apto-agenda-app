import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  UserCheck,
  Search,
  Plus,
  Mail,
  Calendar,
  Edit,
  Trash2,
  Settings,
  Palette
} from 'lucide-react';

interface Employee {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'employee';
  specialty: string;
  color: string;
  totalAppointments: number;
  weeklyHours: number;
  status: 'active' | 'inactive';
  joinDate: string;
}

export function EmployeesView() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Datos de ejemplo - en producción vendrían de Supabase
  const employees: Employee[] = [
    {
      id: 1,
      name: 'Carlos Mendoza',
      email: 'carlos@estudio.com',
      role: 'admin',
      specialty: 'Tatuajes realistas',
      color: '#3B82F6',
      totalAppointments: 124,
      weeklyHours: 40,
      status: 'active',
      joinDate: '2023-01-15'
    },
    {
      id: 2,
      name: 'Ana García',
      email: 'ana@estudio.com',
      role: 'employee',
      specialty: 'Tatuajes tradicionales',
      color: '#10B981',
      totalAppointments: 98,
      weeklyHours: 35,
      status: 'active',
      joinDate: '2023-03-10'
    },
    {
      id: 3,
      name: 'Sofia López',
      email: 'sofia@estudio.com',
      role: 'employee',
      specialty: 'Piercings y modificaciones',
      color: '#F59E0B',
      totalAppointments: 76,
      weeklyHours: 30,
      status: 'active',
      joinDate: '2023-06-20'
    },
    {
      id: 4,
      name: 'Miguel Torres',
      email: 'miguel@estudio.com',
      role: 'employee',
      specialty: 'Tatuajes geométricos',
      color: '#8B5CF6',
      totalAppointments: 45,
      weeklyHours: 25,
      status: 'inactive',
      joinDate: '2023-09-05'
    }
  ];

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    return status === 'active' 
      ? 'bg-success/10 text-success border-success/20'
      : 'bg-muted/10 text-muted-foreground border-border';
  };

  const getRoleColor = (role: string) => {
    return role === 'admin' 
      ? 'bg-primary/10 text-primary border-primary/20'
      : 'bg-secondary/10 text-secondary-foreground border-secondary/20';
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
            <UserCheck className="w-7 h-7 text-primary" />
            Empleados
          </h1>
          <p className="text-muted-foreground">Gestiona tu equipo de trabajo</p>
        </div>
        <Button className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Empleado
        </Button>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-card backdrop-blur-sm border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Empleados</p>
                <p className="text-2xl font-bold text-foreground">{employees.length}</p>
              </div>
              <UserCheck className="w-8 h-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card backdrop-blur-sm border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Activos</p>
                <p className="text-2xl font-bold text-success">
                  {employees.filter(e => e.status === 'active').length}
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
                <p className="text-sm text-muted-foreground">Administradores</p>
                <p className="text-2xl font-bold text-primary">
                  {employees.filter(e => e.role === 'admin').length}
                </p>
              </div>
              <Settings className="w-8 h-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card backdrop-blur-sm border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Citas Totales</p>
                <p className="text-2xl font-bold text-foreground">
                  {employees.reduce((acc, emp) => acc + emp.totalAppointments, 0)}
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
              placeholder="Buscar por nombre, email o especialidad..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Lista de empleados */}
      <Card className="bg-gradient-card backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Lista de Empleados</span>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {filteredEmployees.length} resultados
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredEmployees.map((employee) => (
              <div
                key={employee.id}
                className="flex items-center justify-between p-4 rounded-lg bg-card/50 border border-border/50 hover:shadow-soft transition-all duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold"
                    style={{ backgroundColor: employee.color }}
                  >
                    {employee.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">{employee.name}</h3>
                      <Badge 
                        variant="outline" 
                        className={getRoleColor(employee.role)}
                      >
                        {employee.role === 'admin' ? 'Administrador' : 'Empleado'}
                      </Badge>
                       <Badge 
                         variant="outline" 
                         className={getStatusColor(employee.status)}
                       >
                         {employee.status === 'active' ? 'Activo' : 'Inactivo'}
                       </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {employee.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Palette className="w-3 h-3" />
                        {employee.specialty}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {employee.totalAppointments} citas completadas
                      </span>
                      <span>📅 {employee.weeklyHours}h/semana</span>
                      <span>Desde: {formatDate(employee.joinDate)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {employee.role !== 'admin' && (
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4 mr-2" />
                      Permisos
                    </Button>
                  )}
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-destructive hover:text-destructive"
                    disabled={employee.role === 'admin'}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}

            {filteredEmployees.length === 0 && (
              <div className="text-center py-12">
                <UserCheck className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No se encontraron empleados
                </h3>
                <p className="text-muted-foreground">
                  {searchTerm ? 'Prueba con otros términos de búsqueda' : 'Comienza agregando tu primer empleado'}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}