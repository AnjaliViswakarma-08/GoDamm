package com.avaks.inventory.repository;

import com.avaks.inventory.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {
	Optional<Order> findByIdAndUserId(Long id, Long userId);
	List<Order> findAllByUserId(Long userId);
	void deleteAllByUserId(Long userId);
}


