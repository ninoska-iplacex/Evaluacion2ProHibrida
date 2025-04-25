import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {IonCard,IonCardContent,IonCardSubtitle,IonCardHeader,IonButton,IonIcon,} from "@ionic/angular/standalone";
import { addIcons } from "ionicons";
import { trashOutline } from "ionicons/icons";
import { CitasService } from "src/app/servicios/citas.service";

@Component({
  selector: "app-cita",
  templateUrl: "./cita.component.html",
  styleUrls: ["./cita.component.scss"],
  standalone: true,
  imports: [IonButton,IonIcon,IonCardHeader,IonCardSubtitle,CommonModule,IonCard,IonCardHeader,IonCardContent,
    IonCardSubtitle,
  ],
})
export class CitaComponent implements OnInit {
 
  @Output() onCitaEliminadaEvent = new EventEmitter();

  // Inputs del componente.
  @Input() permitirBorrarCitasEnInicio: boolean = false;
  @Input() id: number = -1;
  @Input() frase: string = "";
  @Input() autor: string = "";

  constructor(private _citasService: CitasService) {}

  async ngOnInit() {
    // Inicializa los iconos.
    addIcons({ trashOutline });
  }

  async deleteCita() {
    // Elimina una cita y lanza señal para informar al padre.
    await this._citasService.deleteCita(this.id);
    this.onCitaEliminadaEvent.emit();
  }
}
