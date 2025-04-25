import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonSelect,
  IonSelectOption,
  IonButtons,
  IonButton,
  IonIcon,
  IonFab,
  IonFabButton,
  IonToast,
} from "@ionic/angular/standalone";
import { settingsOutline, addOutline } from "ionicons/icons";
import { CitaComponent } from "../../componentes/cita/cita.component";
import { CitasService } from "src/app/servicios/citas.service";
import { Cita } from "src/app/modelo/cita";
import { RouterModule } from "@angular/router";
import { addIcons } from "ionicons";
import { ConfiguracionService } from "src/app/servicios/configuracion.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
  standalone: true,
  imports: [
    IonToast,
    IonFab,
    IonFabButton,
    RouterModule,
    IonIcon,
    IonButton,
    IonButtons,
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardContent,
    IonSelect,
    IonSelectOption,
    CitaComponent,
  ],
})
export class HomePage implements OnInit {
  // Acá se almacena la cita aleatoria obtenida.
  randomCita: Cita | null = null;

  // Se almacenan configuraciones.
  permitirBorrarCitasEnInicio: boolean = false;

  // Variables usadas por los toast.
  isToastEliminacionOpen = false;

  constructor(
    private _configuracionService: ConfiguracionService,
    private _citasService: CitasService
  ) {
    // Registrar iconos.
    addIcons({
      settingsOutline,
      addOutline,
    });
  }

  async ngOnInit() {
    // Al momento de inicializar la página se llama al servicio de citas para que se inicialice.
    await this._citasService.initPlugin();
    await this.ionViewWillEnter();
  }

  async ionViewWillEnter() {
    // Obtiene el valor de las configuraciones al momento de entrar a la página.
    this.permitirBorrarCitasEnInicio =
      await this._configuracionService.permitirBorrarCitasEnInicio();
    // Obtiene una cita aleatoria desde el servicio al momento de entrar a la página.
    // Solamente se llama si el servicio de citas ya fue inicializado.
    if (!this._citasService.inicializado) return;
    this.randomCita = await this._citasService.getRandomCita();
  }

  async onCitaElimina(): Promise<void> {
    // Función que se llama cuándo el componente hijo (cita aleatoria) hace eliminación.
    await this.ionViewWillEnter();
    this.setToastEliminacionOpen(true);
  }

  setToastEliminacionOpen(isOpen: boolean): void {
    // Setea si el toast que indica una eliminación se debe mostrar.
    this.isToastEliminacionOpen = isOpen;
  }
}
