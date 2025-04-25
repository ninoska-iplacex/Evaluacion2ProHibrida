import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonToast,
  IonButtons,
  IonBackButton,
} from "@ionic/angular/standalone";
import { CrearCitaComponent } from "../../componentes/crear-cita/crear-cita.component";
import { ListaCitasComponent } from "../../componentes/lista-citas/lista-citas.component";
import { Cita } from "src/app/modelo/cita";
import { CitasService } from "src/app/servicios/citas.service";

@Component({
  selector: "app-gestion",
  templateUrl: "./gestion.page.html",
  styleUrls: ["./gestion.page.scss"],
  standalone: true,
  imports: [
    IonBackButton,
    IonButtons,
    IonToast,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    CrearCitaComponent,
    ListaCitasComponent,
  ],
})
export class GestionPage implements OnInit {
  // Arreglo para almecenar las citas cargadas desde el servicio.
  citas: Cita[] = [];

  // Variables usadas por los toast.
  isToastCreacionOpen = false;
  isToastEliminacionOpen = false;

  constructor(private _citasService: CitasService) {}

  async ngOnInit() {
    // Al inicializar la página que se inicialice el plugin del servicio de citas.
    await this._citasService.initPlugin();
    // Luego que cargue el listado de citas.
    await this.ionViewWillEnter();
  }

  async ionViewWillEnter() {
    // Obtiene el listado de citas desde el servicio al momento de entrar a la página.
    // Solamente se llama si el servicio de citas ya fue inicializado.
    if (!this._citasService.inicializado) return;
    await this.loadCitas();
  }

  async loadCitas(): Promise<void> {
    // Función que carga el listado de citas desde el servicio.
    this.citas = await this._citasService.getCitas();
  }

  async onCitaCreada(): Promise<void> {
    // Función que se llama cuándo desde el componente hijo se emite un evento de creación.
    // Esta hace que se muestre el toast correspondiente y luego recarga el listado de citas.
    this.setToastCreacionOpen(true);
    await this.loadCitas();
  }

  async onCitaEliminada(): Promise<void> {
    // Función que se llama cuándo desde el componente hijo se emite un evento de eliminación.
    // Esta hace que se muestre el toast correspondiente y luego recarga el listado de citas.
    this.setToastEliminacionOpen(true);
    await this.loadCitas();
  }

  setToastCreacionOpen(isOpen: boolean): void {
    // Setea si el toast que indica una creación se debe mostrar.
    this.isToastCreacionOpen = isOpen;
  }

  setToastEliminacionOpen(isOpen: boolean): void {
    // Setea si el toast que indica una eliminación se debe mostrar.
    this.isToastEliminacionOpen = isOpen;
  }
}
