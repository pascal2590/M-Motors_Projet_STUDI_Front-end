/* ATTENTION : Ce composant n'est plus utilisé */
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms'; // <-- import nécessaire
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/client.model';

@Component({
  selector: 'app-create-client',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-client.html',
  styleUrls: ['./create-client.css'],
})
export class CreateClientComponent {

  constructor(private clientService: ClientService) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      const client: Client = form.value;
      this.clientService.create(client).subscribe({
        next: () => alert('Compte client créé avec succès !'),
        error: err => alert('Erreur lors de la création : ' + err.message)
      });
    }
  }
}
