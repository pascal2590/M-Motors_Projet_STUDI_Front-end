import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
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
      imageUrl: ['']
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

  submit(): void {

    if (this.form.invalid) {
      return;
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
          }
        });
    }
  }

}