import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/user/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule',
    canActivate: [AuthGuard],
  },
  { path: 'home/:price', loadChildren: './home/home.module#HomePageModule' },
  {
    path: 'event-create',
    loadChildren:
      './pages/event-create/event-create.module#EventCreatePageModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'event-detail/:id',
    loadChildren:
      './pages/event-detail/event-detail.module#EventDetailPageModule',
    canActivate: [AuthGuard],
  },
  { path: 'event-list', loadChildren: './pages/event-list/event-list.module#EventListPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule' },
  { path: 'reset-password', loadChildren: './pages/reset-password/reset-password.module#ResetPasswordPageModule' },
  { path: 'alta-duenio', loadChildren: './pages/alta-duenio/alta-duenio.module#AltaDuenioPageModule' },
  { path: 'signup', loadChildren: './pages/signup/signup.module#SignupPageModule' },
  { path: 'alta-empleado', loadChildren: './pages/alta-empleado/alta-empleado.module#AltaEmpleadoPageModule' },
  { path: 'alta-mesa', loadChildren: './pages/alta-mesa/alta-mesa.module#AltaMesaPageModule' },
  {
     path: 'comida-create',
     loadChildren: './pages/comida-create/comida-create.module#ComidaCreatePageModule',
     canActivate: [AuthGuard]
   },
  {
    path: 'comida-detail/:id',
    loadChildren: './pages/comida-detail/comida-detail.module#ComidaDetailPageModule',
    canActivate: [AuthGuard]
   },
  { path: 'comida-list', loadChildren: './pages/comida-list/comida-list.module#ComidaListPageModule' },
  { path: 'alta-empleado', loadChildren: './pages/alta-empleado/alta-empleado.module#AltaEmpleadoPageModule' },
  { path: 'cliente-create', loadChildren: './pages/cliente-create/cliente-create.module#ClienteCreatePageModule' },
  { path: 'abrir-mesa', loadChildren: './pages/abrir-mesa/abrir-mesa.module#AbrirMesaPageModule' },
  { path: 'cerrar-mesa', loadChildren: './pages/cerrar-mesa/cerrar-mesa.module#CerrarMesaPageModule' },
  { path: 'qrmesa', loadChildren: './pages/qrmesa/qrmesa.module#QrmesaPageModule' },
  { path: 'alta-pedido', loadChildren: './pages/alta-pedido/alta-pedido.module#AltaPedidoPageModule' },
  {
    path: 'encuesta-empleado',
    loadChildren: './pages/encuesta-empleado-create/encuesta-empleado-create.module#EncuestaEmpleadoCreatePageModule' },
  { path: 'encuesta-graficos', loadChildren: './pages/encuesta-graficos/encuesta-graficos.module#EncuestaGraficosPageModule' },
  { path: 'juego-postre', loadChildren: './pages/juego-postre/juego-postre.module#JuegoPostrePageModule' },
  { path: 'tomarpedidos', loadChildren: './pages/tomarpedidos/tomarpedidos.module#TomarpedidosPageModule' },
  { path: 'reserva-cliente', loadChildren: './pages/reserva-cliente/reserva-cliente.module#ReservaClientePageModule' },
  { path: 'qrpropina', loadChildren: './pages/qrpropina/qrpropina.module#QrpropinaPageModule' },
  { path: 'qringresolocal', loadChildren: './pages/qringresolocal/qringresolocal.module#QringresolocalPageModule' },
  { path: 'lista-espera', loadChildren: './pages/lista-espera/lista-espera.module#ListaEsperaPageModule' },
  { path: 'ingreso', loadChildren: './pages/ingreso/ingreso.module#IngresoPageModule' },
  { path: 'tomarpedidococina', loadChildren: './pages/tomarpedidococina/tomarpedidococina.module#TomarpedidococinaPageModule' },
  { path: 'carta', loadChildren: './pages/carta/carta.module#CartaPageModule' },
  { path: 'cuenta', loadChildren: './pages/cuenta/cuenta.module#CuentaPageModule' },
  { path: 'juego-descuento', loadChildren: './pages/juego-descuento/juego-descuento.module#JuegoDescuentoPageModule' },
  { path: 'adivinar-numero', loadChildren: './pages/adivinar-numero/adivinar-numero.module#AdivinarNumeroPageModule' },
  { path: 'vericarmesapedido', loadChildren: './pages/vericarmesapedido/vericarmesapedido.module#VericarmesapedidoPageModule' },
  { path: 'habilitar-reservas', loadChildren: './pages2/habilitar-reservas/habilitar-reservas.module#HabilitarReservasPageModule' },
  { path: 'qr', loadChildren: './pages2/qr/qr.module#QrPageModule' },
  { path: 'second/:price', loadChildren: './pages2/second/second.module#SecondPageModule' },
  { path: 'tomarpedidosbar', loadChildren: './pages2/tomarpedidosbar/tomarpedidosbar.module#TomarpedidosbarPageModule' },
  { path: 'tipo-registro', loadChildren: './pages/tipo-registro/tipo-registro.module#TipoRegistroPageModule' },
  { path: 'alta-cliente', loadChildren: './pages/alta-cliente/alta-cliente.module#AltaClientePageModule' },
  { path: 'clienteconfirmapedido', loadChildren: './pages2/clienteconfirmapedido/clienteconfirmapedido.module#ClienteconfirmapedidoPageModule' },  { path: 'alta-anonimo', loadChildren: './pages/alta-anonimo/alta-anonimo.module#AltaAnonimoPageModule' },
  { path: 'lista-clientes', loadChildren: './pages/lista-clientes/lista-clientes.module#ListaClientesPageModule' },




];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }