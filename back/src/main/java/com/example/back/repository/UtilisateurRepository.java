/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example.back.repository;

import com.example.back.model.Utilisateur;
import javax.persistence.Id;
import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author khalil
 */
public interface UtilisateurRepository extends CrudRepository<Utilisateur,Long> {
    
}
