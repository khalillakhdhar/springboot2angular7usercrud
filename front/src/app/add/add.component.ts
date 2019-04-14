import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from '../utilisateur.service';
import { Utilisateur } from '../utilisateur';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  submitted = false;
  utilisateur:Utilisateur;
  utilisateurs:Utilisateur[];
  constructor(private utilisateurService:UtilisateurService) {

  }
  onSubmit() {
    this.submitted = true;
    this.save();
  }
  private save(): void {
    this.utilisateurService.create(this.utilisateur as Utilisateur).subscribe(utilisateur=>{this.utilisateurs.push(utilisateur)});

  }
  ngOnInit() {
    this.submitted = false;
    this.utilisateur=new Utilisateur();

  }
  goBack(): void {
    window.location.replace('');
  }
}
