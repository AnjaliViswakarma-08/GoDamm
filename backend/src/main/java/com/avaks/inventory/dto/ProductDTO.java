package com.avaks.inventory.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

public class ProductDTO {
    private Long id;

    @NotBlank(message = "Product name is required")
    @Size(max = 120, message = "Product name is too long")
    private String name;

    @Size(max = 500, message = "Description is too long")
    private String description;

    @PositiveOrZero(message = "Cost price must be zero or positive")
    private double price;

    @PositiveOrZero(message = "Selling price must be zero or positive")
    private double sellingPrice;

    @PositiveOrZero(message = "Stock must be zero or positive")
    private int stock;

    @NotNull(message = "Supplier is required")
    @Positive(message = "Supplier id must be greater than zero")
    private Long supplierId;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public double getSellingPrice() { return sellingPrice; }
    public void setSellingPrice(double sellingPrice) { this.sellingPrice = sellingPrice; }

    public int getStock() { return stock; }
    public void setStock(int stock) { this.stock = stock; }

    public Long getSupplierId() { return supplierId; }
    public void setSupplierId(Long supplierId) { this.supplierId = supplierId; }
}


