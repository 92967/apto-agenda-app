import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Calendar, 
  User, 
  Clock,
  DollarSign,
  FileText,
  Image,
  Phone
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface CreateAppointmentModalProps {
  trigger?: React.ReactNode;
}

export function CreateAppointmentModal({ trigger }: CreateAppointmentModalProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    clientName: '',
    clientPhone: '',
    countryCode: '+34',
    employee: '',
    date: '',
    time: '',
    service: '',
    budget: '',
    notes: '',
    image: null as File | null
  });

  // Datos de ejemplo - en producción vendrían de Supabase
  const employees = [
    { id: 1, name: 'Carlos Mendoza', color: '#3B82F6', specialty: 'Tatuajes realistas' },
    { id: 2, name: 'Ana García', color: '#10B981', specialty: 'Tatuajes tradicionales' },
    { id: 3, name: 'Sofia López', color: '#F59E0B', specialty: 'Piercings y modificaciones' },
    { id: 4, name: 'Miguel Torres', color: '#8B5CF6', specialty: 'Tatuajes geométricos' }
  ];

  const countryCodes = [
    { code: '+34', country: 'ES', flag: '🇪🇸' },
    { code: '+1', country: 'US', flag: '🇺🇸' },
    { code: '+33', country: 'FR', flag: '🇫🇷' },
    { code: '+49', country: 'DE', flag: '🇩🇪' },
    { code: '+39', country: 'IT', flag: '🇮🇹' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación básica
    if (!formData.clientName || !formData.employee || !formData.date || !formData.time) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos obligatorios",
        variant: "destructive"
      });
      return;
    }

    // Aquí iría la lógica para guardar en Supabase
    console.log('Guardando reserva:', formData);
    
    toast({
      title: "¡Reserva creada!",
      description: "La cita ha sido guardada exitosamente",
    });
    
    setOpen(false);
    setFormData({
      clientName: '',
      clientPhone: '',
      countryCode: '+34',
      employee: '',
      date: '',
      time: '',
      service: '',
      budget: '',
      notes: '',
      image: null
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
    }
  };

  const defaultTrigger = (
    <Button className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
      <Plus className="w-4 h-4 mr-2" />
      Nueva Reserva
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-card backdrop-blur-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Calendar className="w-6 h-6 text-primary" />
            Nueva Reserva
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Información del cliente */}
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <User className="w-4 h-4 text-primary" />
                Información del Cliente
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="clientName">Nombre del Cliente *</Label>
                <Input
                  id="clientName"
                  value={formData.clientName}
                  onChange={(e) => setFormData(prev => ({ ...prev, clientName: e.target.value }))}
                  placeholder="Ej: María González"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="clientPhone">Teléfono para WhatsApp *</Label>
                <div className="flex gap-2 mt-1">
                  <Select 
                    value={formData.countryCode} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, countryCode: value }))}
                  >
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {countryCodes.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          <span className="flex items-center gap-2">
                            <span>{country.flag}</span>
                            <span>{country.code}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    id="clientPhone"
                    value={formData.clientPhone}
                    onChange={(e) => setFormData(prev => ({ ...prev, clientPhone: e.target.value }))}
                    placeholder="666 123 456"
                    className="flex-1"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Se guardará como: {formData.countryCode} {formData.clientPhone}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Detalles de la cita */}
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-primary" />
                Detalles de la Cita
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="employee">Empleado Asignado *</Label>
                <Select 
                  value={formData.employee} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, employee: value }))}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Seleccionar empleado" />
                  </SelectTrigger>
                  <SelectContent>
                    {employees.map((emp) => (
                      <SelectItem key={emp.id} value={emp.name}>
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: emp.color }}
                          />
                          <div>
                            <span className="font-medium">{emp.name}</span>
                            <p className="text-xs text-muted-foreground">{emp.specialty}</p>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Fecha *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="time">Hora *</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="service">Servicio</Label>
                <Input
                  id="service"
                  value={formData.service}
                  onChange={(e) => setFormData(prev => ({ ...prev, service: e.target.value }))}
                  placeholder="Ej: Tatuaje brazo, Piercing oreja..."
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* Información adicional */}
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <FileText className="w-4 h-4 text-primary" />
                Información Adicional
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="budget">Presupuesto Estimado (€)</Label>
                <Input
                  id="budget"
                  type="number"
                  value={formData.budget}
                  onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                  placeholder="150"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="notes">Notas</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Detalles del diseño, alergias, observaciones..."
                  className="mt-1 min-h-[80px]"
                />
              </div>

              <div>
                <Label htmlFor="image">Imagen de Referencia</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="mt-1"
                />
                {formData.image && (
                  <Badge variant="secondary" className="mt-2">
                    <Image className="w-3 h-3 mr-1" />
                    {formData.image.name}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Botones de acción */}
          <div className="flex justify-end gap-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Crear Reserva
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}