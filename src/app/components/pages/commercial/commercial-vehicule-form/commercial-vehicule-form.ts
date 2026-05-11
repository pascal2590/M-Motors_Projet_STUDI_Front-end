import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { VehiculeService } from '../../../../services/vehicule';

@Component({
  selector: 'app-commercial-vehicule-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './commercial-vehicule-form.html',
  styleUrls: ['./commercial-vehicule-form.css']
})
export class CommercialVehiculeForm
  implements OnInit {

  form!: FormGroup;

  vehiculeId!: number;

  isEdit = false;

  // SERVICES LLD
  servicesLld = [

    {
      id: 1,
      nom: 'Assurance tous risques'
    },

    {
      id: 2,
      nom: 'Assistance dépannage'
    },

    {
      id: 3,
      nom: 'Entretien et SAV'
    },

    {
      id: 4,
      nom: 'Contrôle technique'
    }
  ];

  constructor(
    private fb: FormBuilder,
    private vehiculeService: VehiculeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      marque: ['', Validators.required],
      modele: ['', Validators.required],
      annee: [null],
      kilometrage: [null],
      prix: [null],
      description: [''],
      typeOffre: [
        'vente',
        Validators.required
      ],
      disponible: [true],
      imageUrl: [''],
      servicesLld: [[]]
    });

    const id = this.route
      .snapshot
      .paramMap
      .get('id');

    if (id) {

      this.isEdit = true;
      this.vehiculeId = Number(id);
      this.vehiculeService
        .getVehiculeById(this.vehiculeId)
        .subscribe({

          next: (vehicule) => {

            this.form.patchValue(
              vehicule
            );
          }
        });
    }
  }

  // GESTION DES SERVICES LLD
  onServiceChange(event: any): void {

    const services =
      this.form.value.servicesLld || [];

    const serviceId =
      Number(event.target.value);

    if (event.target.checked) {

      if (!services.includes(serviceId)) {

        services.push(serviceId);
      }

    } else {

      const index =
        services.indexOf(serviceId);

      if (index >= 0) {

        services.splice(index, 1);
      }
    }

    this.form.patchValue({

      servicesLld: services
    });
  }

  submit(): void {

    if (this.form.invalid) {
      return;
    }

    // SI VENTE => PAS DE SERVICES LLD
    if (
      this.form.value.typeOffre === 'vente'
    ) {

      this.form.patchValue({

        servicesLld: []
      });
    }

    if (this.isEdit) {

      this.vehiculeService
        .updateVehicule(
          this.vehiculeId,
          this.form.value
        )
        .subscribe({

          next: () => {

            this.router.navigate([
              '/backoffice/vehicules'
            ]);
          },

          error: () => {

            alert(
              'Erreur lors de la modification.'
            );
          }
        });

    } else {

      this.vehiculeService
        .addVehicule(this.form.value)
        .subscribe({

          next: () => {

            this.router.navigate([
              '/backoffice/vehicules'
            ]);
          },

          error: () => {

            alert(
              'Erreur lors de l’ajout.'
            );
          }
        });
    }
  }

}