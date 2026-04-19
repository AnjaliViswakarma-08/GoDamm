package com.avaks.inventory.repository;

import com.avaks.inventory.model.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface SupplierRepository extends JpaRepository<Supplier, Long> {
	Optional<Supplier> findByIdAndUserId(Long id, Long userId);
	List<Supplier> findAllByUserId(Long userId);
	void deleteAllByUserId(Long userId);
}


