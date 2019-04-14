import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from '../utilisateur.service';
import { Utilisateur } from '../utilisateur';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
utilisateurs:Utilisateur[];
utilisateur:Utilisateur;

  constructor(private utilisateurservice:UtilisateurService) { }

  ngOnInit() {
    this.getUtilisateurs();
  }
  getUtilisateurs(): void {
    this.utilisateurservice.getUtilisateurs()
        .subscribe(utilisateurs => this.utilisateurs = utilisateurs);
  }
  delete(utilisateur:Utilisateur): void {
    this.utilisateurservice.delete(utilisateur).subscribe();
    window.location.replace('');

  }
}
