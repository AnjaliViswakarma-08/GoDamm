package com.avaks.inventory.repository;

import com.avaks.inventory.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Optional<Product> findByNameAndUserId(String name, Long userId);
    Optional<Product> findByIdAndUserId(Long id, Long userId);
    List<Product> findAllByUserId(Long userId);
    void deleteAllByUserId(Long userId);

    @Modifying
    @Query("UPDATE Product p SET p.stock = p.stock - :quantity WHERE p.id = :id AND p.user.id = :userId AND p.stock >= :quantity")
    int decrementStockForUser(@Param("id") Long id, @Param("userId") Long userId, @Param("quantity") int quantity);
}


