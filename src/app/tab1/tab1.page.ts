import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core'; // 1
import { LogicService } from '../../app/services/logic.service'
import { IData } from '../../app/services/logic.service'
import { Observable } from "rxjs";
import{PopoverPage} from '../popover/popover.page'
import { PopoverController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})



export class Tab1Page implements OnInit {

 

  questions$: Observable<IData[]>;
  transData:any=[];
  totalQuestions: number;
  data: any;
  idiomaSeleccionado:any;

  // ../assets/i18n/en1.json

  ngOnInit() {
    this.idiomaSeleccionado = this.route.snapshot.paramMap.get('id');
    
    switch(this.idiomaSeleccionado) { 
      case 'en': { 
        this.array= this.arrayINGLES;
       break; 
      } 
      case 'rus': { 
         this.array= this.arrayRusia;
; 
         break; 
      } 
      default: { 
        this.array= this.arrayINGLES;
         break; 
      } 
   } 

 
  }
  constructor(public modalController: ModalController,public popoverController: PopoverController,private route: ActivatedRoute) { 

  

  }
  
  
  popup() {
this.modalController.create({component:PopoverPage}).then((modalElement)=>{
  modalElement.present();
})

    // const modal = await this.modalController.create({
    //   component: PopoverPage,
    //   cssClass: 'my-custom-class'
    // });
    // return await modal.present();
  }



  // async popup() {
  //   let ev: any
  //   const popover = await this.popoverController.create({
  //     component: PopoverPage,
  //     cssClass: 'my-custom-class',
  //     event: ev,
  //     translucent: true
  //   });
  //   return await popover.present();
  // }

  public array:any[];
  public arrayINGLES:any=[{
    "login_titulo_login":"SIGN IN",
    "login_Textoformulario_email":"EMAIL",
    "login_Textoformulario":"PASSWORD",
    "login_PlaceHolder_Ingrese_email":"Enter email",
    "login_PlaceHolder_Ingrese_clave":"Enter password",
    "login_link_CrearUnaNuevaCuenta":"Create a New Account",
    "login_link_olvidaste_tu_clave": "Forgot your password?",
    "________________________________":"",
    "tipo-registro_titulo_tiporegistro":"Registration Type",
    "tipo-registro_btn_clienteRegistrado":"Registered CustomeR",
    "tipo_Registro_btn_clienteAnonimo":"Anonymous Client",
    "_____________________________":"",
    "Alta-Cliente_Titulo":"Load Client ",
    "Alta-Cliente_Formulario_Texto_Nombre":"First name",
    "Alta-Cliente_Formulario_Texto_Apellido":"Last Name",
    "Alta-Cliente_Formulario_Texto_DNI":"DNI",
    "Alta-Cliente_Formulario_Texto_Correo":"Email",
    "Alta-Cliente_Formulario_Texto_Clave":"Password",
    "Alta-Cliente_Formulario_PlaceHolder_Nombre":"Name",
    "Alta-Cliente_Formulario_PlaceHolder_Apellido":"Enter Last Name",
    "Alta-Cliente_Formulario_PlaceHolder_DNI":"Enter DNI",
    "Alta-Cliente_Formulario_PlaceHolder_Correo":"Enter Mail",
    "Alta-Cliente_Formulario_PlaceHolder_Clave":"Enter Password",
    "Alta-Cliente_btn_Scannear_DNI":"Scan DNI",
    "Alta-Cliente_btn_Guardar":"Save",
    "______________________________":"",
    "alta-duenio_Titulo":"Load Owner / Inspector",
    "alta-duenio_Formulario_Nombre":"First Name",
    "alta-duenio_Formulario_Apellido":"Last Name",
    "alta-duenio_Formulario_Cuil":"CUIL",
    "alta-duenio_Formulario_Correo":"Mail",
    "alta-duenio_Formulario_TipoDeEmpleado":"Employee Type",
    "alta-duenio_Formulario_Select_OptionSupervisor":"Inspector",
    "alta-duenio_Formulario_Select_OptionDuenio":"Owner",
    "alta-duenio_Formulario_BTN_ScannerDNI":"Scanner",
    "alta-duenio_Formulario_BTN_Guardar":"Save",
    "alta-duenio_Listado_Perfil":"Profile",
    "alta-duenio_Listado_DNI":"DNI",
    "________________Altaempleado_____________________":"",
    "alta-empleado_Titulo":"Add Employee",
    "alta-empleado_Formulario_Nombre":"First name",
    "alta-empleado_Formulario_Apellido":"Last name",
    "alta-empleado_Formulario_Cuil":"CUIL",
    "alta-empleado_Formulario_Correo":"Mail",
    "Alta-empleado_Formulario_PlaceHolder_IngreseDni":"Enter DNI",
    "Alta-empleado_Formulario_PlaceHolder_IngreseCuil":"Enter CUIL",
    "Alta-empleado_Formulario_PlaceHolder_IngresarCorreo":"Enter Mail",
    "Alta-empleado_Formulario_PlaceHolder_TipoEmpleado":"Employee Type",
    "Alta-empleado_Formulario_PlaceHolder_SeleccioneTipoEmpleado":"Select type of employees",
    "alta-empleado_Formulario_BTN_ScannerDNI":"Scan DNI",
    "alta-empleado_Formulario_BTN_Guardar":"SAVE",
    "Alta-empleado_Formulario_Option_Cocinero":"Cook",
    "Alta-empleado_Formulario_Option_Bartender":"Bartender",
    "Alta-empleado_Formulario_Option_Mozo":"Mozo",
    "Alta-empleado_ListadoFormulario_Perfil":"Profile",
    "Alta-empleado_ListadoFormulario_Empleado":"Employee",

    "_______________________________":"",
    "alta-anonimo_titulo":"Load Anonymous Client",
    "alta-anonimo_TextoFormulario_nombre":"Name ",
    "alta-anonimo_TextoFormularioCorreo":"Mail ",
    "alta-anonimo_PlaceHolderNombre":"Enter Name",
    "alta-anonimo_PlaceHolderCorreo":" Enter Mail",
    "alta-anonimo_PlaceHolderIngreseClave":"Enter Password ",
    "__________________________________":"",
    "alta-mesa_titulo":"Load Table",
    "alta-mesa_TextoFormulario_codigo_de_mesa":"Table Code",
    "alta-mesa_TextoFormulario_cantidad_de_personas":"Number of People",
    "alta-mesa_TextoFormulario_tipo_de_mesa":"Table Type",
    "alta-mesa_TextoFormulario_PlaceholderseleccionartipoDemesa":"Select Table Type",
    "alta-mesa_TextoFormulario_PlaceholderseleccionarCantidadDePersonas":"Select Number of People",
    "alta-mesa_TextoFormulario_PlaceholderCodigoDeMesa":"Enter table code",
    "alta-mesa_TextoFormulario_select_Option_VIP":"VIP",
    "alta-mesa_TextoFormulario_select_Option_Fumadores":"Smokers",
    "alta-mesa_TextoFormulario_select_Option_Discapacitados":"Disabled",
    "alta-mesa_TextoFormulario_select_Option_Normal":"Normal",
    "alta-mesa_btn_Cancelar":"Cancel",
    "alta-mesa_btn_Aceptar":"Aceptar",
    "alta-mesa_Listado_Estado":"State",
    "___________________________________":"",

    "home_btn_CreatuPedido": "CREATE YOUR ORDER",
    "home_btn_ListadoComida":"LIST OF FOODS",
    "home_btn_ReservaCliente":"BOOK CUSTOMER ",
    "home_btn_CargarMesa":"LOAD TABLE",
    "home_btn_ConfirmarLLegadaPedido":"CONFIRM THE ARRIVAL OF YOUR ORDER",
    "home_btn_EscanearCodigo":"SCAN YOUR CODE",
    "home_btn_AltaEmpeado":"EMPLOYEE REGISTRATION",
    "home_btn_CargarCliente":"LOAD CUSTOMER",
    "home_btn_ListadoCliente":"CLIENT LIST",
    "home_btn_AbrirMesa": "OPEN TABLE",
    "home_btn_cerrarMesa": "CLOSE TABLE",
    "home_btn_TomarPedido":"TAKE ORDER",
    "home_btn_TomarPedidoCocina":"TAKE KITCHEN ORDER",
    "home_btn_ListadoIngreso":"ENTRY LISTING",
    "home_btn_HabilitarReservas":"ENABLE RESERVES",
    "home_btn_Hacetudelivery":"MAKE YOUR DELIVERY!",
    "home_btn_Habilitar_Pedido_Delivery":"ENABLE ORDER DELIVERY",
    "home_btn_enviar_Pedido":"SEND ORDER",
    "home_btn_chat":"CHAT",
    "home_btn_encuesta_empleado":"EMPLOYEE SURVEY",
    "home_btn_Cargar_Ciente":"LOAD CUSTOMER",
    "home_btn_tomar_pedido_bar":"TAKE BAR ORDERS",
    "__________________________":"",
    "comida-list_titulo":"TAKE BAR ORDERS",
    "comida-list_subtitulo":"FOOD LETTERS",
    "comida-list_bebidas":"BEVERAGE LETTERS",
    "comida-list_postre":"DESSERT LETTERS",
    "comida-list_Precio":"Price",
    "________________________":"",
    "comida-detail_Titulo":"Description",
    "comida-detail_Descripcion":"Description",
    "comida-detail_Precio":"Price",
    "comida-detail_Tiempo":"Time",
    "________________":"",
    "comida-create_Titulo":"Load Food",
    "comida-create_FormularioTextNombre":"Name",
    "comida-create_FormularioTextCodigo":"Code",
    "comida-create_FormularioTextDescripcion":"Description",
    "comida-create_FormularioTextPrecio":"Price",
    "comida-create_FormularioTextPreparacion":"Preparation",
    "comida-create_FormularioTextTipoDeProducto":"Product Type",
    "comida-create_PlaceHolder_NombreDeComida":"Food name",
    "comida-create_PlaceHolder_Codigo":"Food Code",
    "comida-create_PlaceHolder_Descripcion":"What is it?",
    "comida-create_PlaceHolder_CuantoCuesta":"How much does it cost?",
    "comida-create_PlaceHolder_CuantoTardaenHacerce":"How long does it take to make it?",
    "comida-create_Select_PlaceHolder_SeleccioneElTipo":"Select the type",
    "comida-create_Select_PlaceHolder_Comida":"Food",
    "comida-create_Select_PlaceHolder_Bebida":"Drink",
    "comida-create_Select_PlaceHolder_Postre":"Dessert",
    "comida-create_Select_Boton_Cancelar":"Cancel",
    "comida-create_Select_Boton_Aceptar":"Accept",
    "_______________________":"",
    "listado-cliente_Titulo":"List CLient",
    "listado-cliente_formulario":"Profile",
    "_____________________________________":"",
    "abrir-mesa_titulo":"Open Table",
    "abrir-mesa_btn_limpiarDatos":"Clear Date",
    "abrir-mesa_select_option_estado":"Status",
    "abrir-mesa_select_option_cliente":"Client",
    "abrir-mesa_select_option_ocupado":"Busy",
    "abrir-mesa_select_option_disponible":"Available",
    "abrir-mesa_select_option_reservada":"Reserved",
    "abrir-mesa_btn_cancelar":"Cancel",
    "abrir-mesa_btn_aceptar":"Accept",
    "___________________________________________":"",
    "tomarpedidos_titulo":"Load Order",
    "tomarpedidos_listosParaEntregar":"Ready To Deliver",
    "tomarpedidos_pendientes_de_aprobacion":"Pending Orders Approval",
    "______________________________________--_____":"",
    "ingreso_Titulo ":"Waiting List",
    "ingreso-cliente_en_espera":"Client Waiting",
    "ingreso-estado":"Status",
    "ingreso-btn-confirmarIngreso":"Confirm Entry",
    "ingreso-btn-DenegarAcceso":"Deny Access",
    "______________________________________--__________":"",
    "Habilitar-Reservas_Titulo ":"Enable Reservation",
    "Habilitar-Reservas_Fecha ":"Date",
    "Habilitar-Reservas_Hora ":"Time",
    "Habilitar-Reservas_Usuario ":"User",
    "Habilitar-Reservas_Cantidad_de_Personas ":"Number of People",
    "Habilitar-Reservas_Mesa ":"Table",
    "Habilitar-Btn-Habilitar ":"Enable",
    "Habilitar-Btn-Rechazar ":"Reject",
    "Habilitar-option-Cancelar ":"Cancel",
    "Habilitar-option-Aceptar":"Accep"


 }];



 public arrayRusia:any=[{
  "login_titulo_login":"АВТОРИЗОВАТЬСЯ",
  "login_Textoformulario_email":"ЭЛ. АДРЕС",
  "login_Textoformulario":"MOT DE PASSE",
  "login_PlaceHolder_Ingrese_email":"Введите адрес электронной почты",
  "login_PlaceHolder_Ingrese_clave":"Введите пароль",
  "login_link_CrearUnaNuevaCuenta":"Создать новый аккаунт",
  "login_link_olvidaste_tu_clave": "Забыли Ваш пароль?",
  "________________________________":"",
  "tipo-registro_titulo_tiporegistro":"тип регистра",
  "tipo-registro_btn_clienteRegistrado":"Зарегистрированный клиент",
  "tipo_Registro_btn_clienteAnonimo":"Анонимный клиент",
  "_____________________________":"",
  "Alta-Cliente_Titulo":"Загрузить клиент",
  "Alta-Cliente_Formulario_Texto_Nombre":"название",
  "Alta-Cliente_Formulario_Texto_Apellido":"Фамилия",
  "Alta-Cliente_Formulario_Texto_DNI":"DNI",
  "Alta-Cliente_Formulario_Texto_Correo":"почта",
  "Alta-Cliente_Formulario_Texto_Clave":"ключ",
  "Alta-Cliente_Formulario_PlaceHolder_Nombre":"название",
  "Alta-Cliente_Formulario_PlaceHolder_Apellido":"Введите фамилию",
  "Alta-Cliente_Formulario_PlaceHolder_DNI":"Введите DNI",
  "Alta-Cliente_Formulario_PlaceHolder_Correo":"Введите почту",
  "Alta-Cliente_Formulario_PlaceHolder_Clave":"Введите пароль",
  "Alta-Cliente_btn_Scannear_DNI":"сканирование днни",
  "Alta-Cliente_btn_Guardar":"спасти",
  "______________________________":"",
  "alta-duenio_Titulo":"Загрузить владельца / руководителя",
  "alta-duenio_Formulario_Nombre":"название",
  "alta-duenio_Formulario_Apellido":"Фамилия",
  "alta-duenio_Formulario_Cuil":"CUIL",
  "alta-duenio_Formulario_Correo":"почта",
  "alta-duenio_Formulario_TipoDeEmpleado":"Тип сотрудника",
  "alta-duenio_Formulario_Select_OptionSupervisor":"Руководитель",
  "alta-duenio_Formulario_Select_OptionDuenio":"владелец",
  "alta-duenio_Formulario_BTN_ScannerDNI":"сканирование",
  "alta-duenio_Formulario_BTN_Guardar":"спасти",
  "alta-duenio_Listado_Perfil":"Профиль",
  "alta-duenio_Listado_DNI":"DNI",
  "________________Altaempleado_____________________":"",
  "alta-empleado_Titulo":"Добавить сотрудника",
  "alta-empleado_Formulario_Nombre":"название",
  "alta-empleado_Formulario_Apellido":"Фамилия",
  "alta-empleado_Formulario_Cuil":"CUIL",
  "alta-empleado_Formulario_Correo":"почта",
  "Alta-empleado_Formulario_PlaceHolder_IngreseDni":"Введите DNI",
  "Alta-empleado_Formulario_PlaceHolder_IngreseCuil":"Введите CUIL",
  "Alta-empleado_Formulario_PlaceHolder_IngresarCorreo":"Введите почту",
  "Alta-empleado_Formulario_PlaceHolder_TipoEmpleado":"Тип сотрудника",
  "Alta-empleado_Formulario_PlaceHolder_SeleccioneTipoEmpleado":"Выберите тип сотрудников",
  "alta-empleado_Formulario_BTN_ScannerDNI":"Сканирование DNI",
  "alta-empleado_Formulario_BTN_Guardar":"спасти",
  "Alta-empleado_Formulario_Option_Cocinero":"шеф-повар",
  "Alta-empleado_Formulario_Option_Bartender":"буфетчик",
  "Alta-empleado_Formulario_Option_Mozo":"Официант",
  "Alta-empleado_ListadoFormulario_Perfil":"Профиль",
  "Alta-empleado_ListadoFormulario_Empleado":"Наемный рабочий",

  "_______________________________":"",
  "alta-anonimo_titulo":"Загрузить анонимный клиент",
  "alta-anonimo_TextoFormulario_nombre":"название",
  "alta-anonimo_TextoFormularioCorreo":"почта",
  "alta-anonimo_PlaceHolderNombre":"Введите имя",
  "alta-anonimo_PlaceHolderCorreo":"Введите почту",
  "alta-anonimo_PlaceHolderIngreseClave":"Введите пароль",
  "__________________________________":"",
  "alta-mesa_titulo":"Загрузить таблицу",
  "alta-mesa_TextoFormulario_codigo_de_mesa":"Код таблицы",
  "alta-mesa_TextoFormulario_cantidad_de_personas":"Количество людей",
  "alta-mesa_TextoFormulario_tipo_de_mesa":"Тип таблицы",
  "alta-mesa_TextoFormulario_PlaceholderseleccionartipoDemesa":"Выберите тип таблицы",
  "alta-mesa_TextoFormulario_PlaceholderseleccionarCantidadDePersonas":"Выберите количество людей",
  "alta-mesa_TextoFormulario_PlaceholderCodigoDeMesa":"Введите код таблицы",
  "alta-mesa_TextoFormulario_select_Option_VIP":"VIP",
  "alta-mesa_TextoFormulario_select_Option_Fumadores":"Курильщики",
  "alta-mesa_TextoFormulario_select_Option_Discapacitados":"Отключено",
  "alta-mesa_TextoFormulario_select_Option_Normal":"Нормальный",
  "alta-mesa_btn_Cancelar":"Отмена",
  "alta-mesa_btn_Aceptar":"Принять",
  "alta-mesa_Listado_Estado":"Принять",



  "___________________________________":"",

  "home_btn_CreatuPedido": "СОЗДАЙ СВОЙ ЗАКАЗ",
  "home_btn_ListadoComida":"ПИЩЕВОЙ СПИСОК",
  "home_btn_ReservaCliente":"БРОНИРОВАНИЕ КЛИЕНТА",
  "home_btn_CargarMesa":"ЗАГРУЗИТЬ СТОЛ",
  "home_btn_ConfirmarLLegadaPedido":"ПОДТВЕРЖДАЙТЕ ПРИБЫТИЕ ВАШЕГО ЗАКАЗА",
  "home_btn_EscanearCodigo":"Сканирование вашего кода",
  "home_btn_AltaEmpeado":"Увольнение сотрудника",
  "home_btn_CargarCliente":"ЗАГРУЗИТЬ ЗАКАЗЧИКА",
  "home_btn_ListadoCliente":"СПИСОК КЛИЕНТОВ",
  "home_btn_AbrirMesa": "ОТКРЫТЫЙ СТОЛ",
  "home_btn_cerrarMesa": "ЗАКРЫТЬ СТОЛA",
  "home_btn_TomarPedido":"ПРИНЯТЬ ЗАКАЗ",
  "home_btn_TomarPedidoCocina":"ЗАКАЗАТЬ КУХНЮ",
  "home_btn_ListadoIngreso":"СПИСОК ДОХОДОВ",
  "home_btn_HabilitarReservas":"РАЗРЕШИТЬ БРОНИРОВАНИЕ",
  "home_btn_Hacetudelivery":"ДЕЛАЙ СВОЮ ДОСТАВКУ!",
  "home_btn_Habilitar_Pedido_Delivery":"ВКЛЮЧИТЬ ПОРЯДОК ДОСТАВКИ",
  "home_btn_enviar_Pedido":"ОТПРАВИТЬ ЗАКАЗ ",
  "home_btn_chat":"ЧАТ",
  "home_btn_encuesta_empleado":"ОБСЛУЖИВАНИЕ СОТРУДНИКОВ",
  "home_btn_Cargar_Ciente":"ЗАГРУЗИТЬ ЗАКАЗЧИКА",
  "home_btn_tomar_pedido_bar":"ЗАКАЗАТЬ БАР",
  "__________________________":"",
  "comida-list_titulo":"ЗАКАЗАТЬ БАР",
  "comida-list_subtitulo":"ПИЩЕВЫЕ ПИСЬМА",
  "comida-list_bebidas":"НАПИТКИ",
  "comida-list_postre":"ДЕСЕРТНЫЕ ПИСЬМА",

  "comida-list_Precio":"Цена",
  "________________________":"",
  "comida-detail_Titulo":"Описание",
  "comida-detail_Descripcion":"Описание",
  "comida-detail_Precio":"Цена",
  "comida-detail_Tiempo":"Погода",
  "________________":"",
  "comida-create_Titulo":"Загрузить еду",
  "comida-create_FormularioTextNombre":"название",
  "comida-create_FormularioTextCodigo":"Код",
  "comida-create_FormularioTextDescripcion":"Описание",
  "comida-create_FormularioTextPrecio":"Цена",
  "comida-create_FormularioTextPreparacion":"подготовка",
  "comida-create_FormularioTextTipoDeProducto":"Вид продукта",
  "comida-create_PlaceHolder_NombreDeComida":"Название еды",
  "comida-create_PlaceHolder_Codigo":"Код питания",
  "comida-create_PlaceHolder_Descripcion":"Что это?",
  "comida-create_PlaceHolder_CuantoCuesta":"Сколько?",
  "comida-create_PlaceHolder_CuantoTardaenHacerce":"Сколько времени это занимает?",
  "comida-create_Select_PlaceHolder_SeleccioneElTipo":"Выберите тип ",
  "comida-create_Select_PlaceHolder_Comida":"питание",
  "comida-create_Select_PlaceHolder_Bebida":"Пить",
  "comida-create_Select_PlaceHolder_Postre":"Десерт",
  "comida-create_Select_Boton_Cancelar":"Отмена",
  "comida-create_Select_Boton_Aceptar":"Принять",
  "_______________________":"",
  "listado-cliente_Titulo":"Список клиентов",
  "listado-cliente_formulario":"Профиль",
  "_____________________________________":"",
  "abrir-mesa_titulo":"Открытый стол",
  "abrir-mesa_btn_limpiarDatos":"Чистые данные",
  "abrir-mesa_select_option_estado":"штат",
  "abrir-mesa_select_option_cliente":"клиент",
  "abrir-mesa_select_option_ocupado":"занятый",
  "abrir-mesa_select_option_disponible":"доступный",
  "abrir-mesa_select_option_reservada":"зарезервированный",
  "abrir-mesa_btn_cancelar":"Отмена",
  "abrir-mesa_btn_aceptar":"принять",
  "___________________________________________":"",
  "tomarpedidos_titulo":"Загрузить заказ",
  "tomarpedidos_listosParaEntregar":"Готовы доставить",
  "tomarpedidos_pendientes_de_aprobacion":"Заказы, ожидающие утверждения",
  "______________________________________--_____":"",
  "ingreso_Titulo ":"Лист ожидания",
  "ingreso-cliente_en_espera":"ожидание клиента",
  "ingreso-estado":"штат",
  "ingreso-btn-confirmarIngreso":"Подтвердите логин",
  "ingreso-btn-DenegarAcceso":"Запретить доступ",
  "______________________________________--__________":"",
  "Habilitar-Reservas_Titulo ":"Включить бронирование",
  "Habilitar-Reservas_Fecha ":"Дата",
  "Habilitar-Reservas_Hora ":"Час",
  "Habilitar-Reservas_Usuario ":"пользователь",
  "Habilitar-Reservas_Cantidad_de_Personas ":"Количество людей",
  "Habilitar-Reservas_Mesa ":"Стол",
  "Habilitar-Btn-Habilitar ":"включить",
  "Habilitar-Btn-Rechazar ":"Отказаться",
  "Habilitar-option-Cancelar ":"Отмена",
  "Habilitar-option-Aceptar":"Принять"


}]

}
