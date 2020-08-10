package com.loja.repository;

import com.loja.domain.Promocao;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PromocaoRepository extends JpaRepository<Promocao, Long> {
    
}