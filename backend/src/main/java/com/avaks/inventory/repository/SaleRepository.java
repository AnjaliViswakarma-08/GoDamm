package com.avaks.inventory.repository;

import com.avaks.inventory.model.Sale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SaleRepository extends JpaRepository<Sale, Long> {
	void deleteAllByUserId(Long userId);
}


