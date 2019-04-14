package com.example.back.Controller;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import com.example.back.exception.ResourceNotFoundException;
import com.example.back.model.Utilisateur;
import com.example.back.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.List;
import org.springframework.transaction.annotation.Transactional;

@RestController
@Transactional
@RequestMapping("/api")
@CrossOrigin(origins = "localhost:3000", maxAge = 3600)
public class UtilisateurController {

    @Autowired
    UtilisateurRepository utilisateurRepository;

    // Get All Utilisateurs
@GetMapping("/utilisateur")
public List<Utilisateur> getUtilisateurs() {
    return (List<Utilisateur>) utilisateurRepository.findAll();
}
// Create a new Utilisateur
@PostMapping("/utilisateurs")
public Utilisateur createUtilisateur(@Valid @RequestBody Utilisateur utilisateur) {
    return utilisateurRepository.save(utilisateur);
}

// Get a Single Utilisateur
@GetMapping("/utilisateurs/{id}")
public Utilisateur getUtilisateurById(@PathVariable(value = "id") Long utilisateurId) {
    return utilisateurRepository.findById(utilisateurId)
            .orElseThrow(() -> new ResourceNotFoundException("Utilisateur", "id", utilisateurId));
}
    // Update a Utilisateur
@PutMapping("/utilisateur/{id}")
public Utilisateur updateUtilisateur(@PathVariable(value = "id") Long utilisateurId,
                                        @Valid @RequestBody Utilisateur utilisateurDetails) {

    Utilisateur utilisateur = utilisateurRepository.findById(utilisateurId)
            .orElseThrow(() -> new ResourceNotFoundException("Utilisateur", "id", utilisateurId));

    utilisateur.setNom(utilisateurDetails.getNom());
    utilisateur.setPrenom(utilisateurDetails.getPrenom());
    
    utilisateur.setMdp(utilisateurDetails.getMdp());
    utilisateur.setEmail(utilisateurDetails.getEmail());
    utilisateur.setGrade(utilisateurDetails.getGrade());
    Utilisateur updatedUtilisateur = utilisateurRepository.save(utilisateur);
    return updatedUtilisateur;
}
// Delete a Utilisateur
@DeleteMapping("/utilisateurs/{id}")
public ResponseEntity<?> deleteUtilisateur(@PathVariable(value = "id") Long utilisateurId) {
    Utilisateur utilisateur = utilisateurRepository.findById(utilisateurId)
            .orElseThrow(() -> new ResourceNotFoundException("Utilisateur", "id", utilisateurId));

    utilisateurRepository.delete(utilisateur);

    return ResponseEntity.ok().build();
}
}