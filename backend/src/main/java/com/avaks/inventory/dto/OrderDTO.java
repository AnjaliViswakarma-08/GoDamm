package com.avaks.inventory.dto;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data @Getter @Setter
public class OrderDTO {
    private Long id;
    private java.time.LocalDateTime orderDate;

    @Positive(message = "Order quantity must be greater than zero")
    private int quantity;

    @NotNull(message = "Product id is required")
    @Positive(message = "Product id must be greater than zero")
    private Long productId;

    @Positive(message = "User id must be greater than zero")
    private Long userId;
}


