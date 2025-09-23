import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { 
  Settings,
  Building,
  Bell,
  Globe,
  Palette,
  Shield,
  Database
} from 'lucide-react';

export function SettingsView() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Settings className="w-7 h-7 text-primary" />
            Configuración
          </h1>
          <p className="text-muted-foreground">Ajustes generales del negocio</p>
        </div>
      </div>

      {/* Información del negocio */}
      <Card className="bg-gradient-card backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="w-5 h-5 text-primary" />
            Información del Negocio
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="businessName">Nombre del Negocio</Label>
              <Input
                id="businessName"
                defaultValue="Estudio de Tatuajes Pro"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="businessPhone">Teléfono del Negocio</Label>
              <Input
                id="businessPhone"
                defaultValue="+34 912 345 678"
                className="mt-1"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="businessAddress">Dirección</Label>
            <Input
              id="businessAddress"
              defaultValue="Calle Principal 123, Madrid, España"
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="businessDescription">Descripción</Label>
            <Textarea
              id="businessDescription"
              defaultValue="Estudio profesional especializado en tatuajes artísticos y piercings con más de 10 años de experiencia."
              className="mt-1"
            />
          </div>
        </CardContent>
      </Card>

      {/* Configuración regional */}
      <Card className="bg-gradient-card backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            Configuración Regional
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="defaultCountry">País por defecto</Label>
              <Select defaultValue="ES">
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ES">🇪🇸 España (+34)</SelectItem>
                  <SelectItem value="US">🇺🇸 Estados Unidos (+1)</SelectItem>
                  <SelectItem value="FR">🇫🇷 Francia (+33)</SelectItem>
                  <SelectItem value="DE">🇩🇪 Alemania (+49)</SelectItem>
                  <SelectItem value="IT">🇮🇹 Italia (+39)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="timezone">Zona Horaria</Label>
              <Select defaultValue="Europe/Madrid">
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Europe/Madrid">Europa/Madrid (CET)</SelectItem>
                  <SelectItem value="America/New_York">América/Nueva_York (EST)</SelectItem>
                  <SelectItem value="Europe/London">Europa/Londres (GMT)</SelectItem>
                  <SelectItem value="Europe/Paris">Europa/París (CET)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="currency">Moneda</Label>
              <Select defaultValue="EUR">
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EUR">€ Euro</SelectItem>
                  <SelectItem value="USD">$ Dólar</SelectItem>
                  <SelectItem value="GBP">£ Libra</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notificaciones WhatsApp */}
      <Card className="bg-gradient-card backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            Recordatorios por WhatsApp
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-foreground">Habilitar recordatorios automáticos</h4>
              <p className="text-sm text-muted-foreground">
                Enviar mensajes de WhatsApp automáticos a clientes y empleados
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="reminder48h">Recordatorio 48 horas antes</Label>
              <div className="flex items-center space-x-2 mt-1">
                <Switch defaultChecked />
                <span className="text-sm text-muted-foreground">Para clientes</span>
              </div>
            </div>
            
            <div>
              <Label htmlFor="reminder24h">Recordatorio 24 horas antes</Label>
              <div className="flex items-center space-x-2 mt-1">
                <Switch defaultChecked />
                <span className="text-sm text-muted-foreground">Para clientes y empleados</span>
              </div>
            </div>
          </div>
          
          <div>
            <Label htmlFor="whatsappTemplate">Plantilla de mensaje</Label>
            <Textarea
              id="whatsappTemplate"
              defaultValue="¡Hola {nombre}! Te recordamos tu cita en {negocio} el {fecha} a las {hora} con {empleado}. ¿Confirmas tu asistencia? Responde SÍ para confirmar o NO para cancelar."
              className="mt-1"
              rows={3}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Variables disponibles: {'{nombre}'}, {'{negocio}'}, {'{fecha}'}, {'{hora}'}, {'{empleado}'}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Personalización */}
      <Card className="bg-gradient-card backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-primary" />
            Personalización
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="workingHours">Horario de trabajo</Label>
              <div className="grid grid-cols-2 gap-2 mt-1">
                <Input placeholder="09:00" />
                <Input placeholder="18:00" />
              </div>
            </div>
            
            <div>
              <Label htmlFor="appointmentDuration">Duración por defecto (min)</Label>
              <Select defaultValue="60">
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 minutos</SelectItem>
                  <SelectItem value="60">1 hora</SelectItem>
                  <SelectItem value="90">1.5 horas</SelectItem>
                  <SelectItem value="120">2 horas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-foreground">Modo oscuro</h4>
              <p className="text-sm text-muted-foreground">
                Cambiar entre tema claro y oscuro
              </p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Seguridad y privacidad */}
      <Card className="bg-gradient-card backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Seguridad y Privacidad
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-foreground">Autenticación de dos factores</h4>
              <p className="text-sm text-muted-foreground">
                Añade una capa extra de seguridad a tu cuenta
              </p>
            </div>
            <Switch />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-foreground">Copias de seguridad automáticas</h4>
              <p className="text-sm text-muted-foreground">
                Respaldar datos diariamente
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-foreground">Retención de datos</h4>
              <p className="text-sm text-muted-foreground">
                Tiempo que se mantienen los datos de clientes inactivos
              </p>
            </div>
            <Select defaultValue="2years">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1year">1 año</SelectItem>
                <SelectItem value="2years">2 años</SelectItem>
                <SelectItem value="5years">5 años</SelectItem>
                <SelectItem value="indefinite">Indefinido</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Integración con Supabase */}
      <Card className="bg-gradient-card backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5 text-primary" />
            Base de Datos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-foreground">Estado de Supabase</h4>
              <p className="text-sm text-muted-foreground">
                Conexión con la base de datos
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <span className="text-sm text-success">Conectado</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Botones de acción */}
      <div className="flex justify-end gap-3">
        <Button variant="outline">
          Cancelar
        </Button>
        <Button className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
          <Settings className="w-4 h-4 mr-2" />
          Guardar Configuración
        </Button>
      </div>
    </div>
  );
}