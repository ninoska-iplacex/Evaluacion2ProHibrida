import { CommonModule } from "@angular/common";
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
  AfterViewInit,
} from "@angular/core";
import { FormsModule, NgModel } from "@angular/forms";
import {
  IonCardHeader,
  IonCardSubtitle,
  IonCard,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonInput,
  IonButton,
  IonList,
  IonIcon,
  IonText,
} from "@ionic/angular/standalone";
import { addIcons } from "ionicons";
import { addOutline } from "ionicons/icons";
import { CitasService } from "src/app/servicios/citas.service";

@Component({
  selector: "app-crear-cita",
  templateUrl: "./crear-cita.component.html",
  styleUrls: ["./crear-cita.component.scss"],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonText,
    IonIcon,
    IonList,
    IonButton,
    IonInput,
    IonItem,
    IonCardHeader,
    IonCardSubtitle,
    IonCard,
    IonCardTitle,
    IonCardContent,
  ],
})
export class CrearCitaComponent implements AfterViewInit {
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onCitaCreadaEvent = new EventEmitter();

  // Variables usadas por el formulario.
  frase: string = "";
  autor: string = "";

  // ngModels del template.
  @ViewChild("fraseInput") fraseInput!: NgModel;
  @ViewChild("autorInput") autorInput!: NgModel;

  constructor(private _citasService: CitasService) {
    // Registrar iconos.
    addIcons({ addOutline });
  }

  ngAfterViewInit() {
    // Se ejecuta después de inicializa la vista.
    // Marca los inputs del formulario como tocados para que se muestren sus errores inmediatamente.
    this.fraseInput.control.markAsTouched();
    this.autorInput.control.markAsTouched();
  }

  async addCita() {
    // Llama al servico para que este agregue la cita segun los datos del formulario.
    await this._citasService.addCita(this.frase, this.autor);
    // Emite una señal para indicarle al padre que se creó una cita.
    this.onCitaCreadaEvent.emit();
    // Limpia los datos del formulario.
    this.frase = "";
    this.autor = "";
  }
}
