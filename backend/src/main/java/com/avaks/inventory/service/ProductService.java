package com.avaks.inventory.service;

import com.avaks.inventory.config.cache.CacheNames;
import com.avaks.inventory.dto.ProductDTO;
import com.avaks.inventory.exception.ResourceNotFoundException;
import com.avaks.inventory.model.Product;
import com.avaks.inventory.model.Supplier;
import com.avaks.inventory.model.User;
import com.avaks.inventory.repository.ProductRepository;
import com.avaks.inventory.repository.SupplierRepository;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private SupplierRepository supplierRepository;

    @Autowired
    private UserService userService;

    @Transactional
        @Caching(evict = {
            @CacheEvict(value = CacheNames.PRODUCTS_BY_USER, key = "T(com.avaks.inventory.config.cache.CacheKeyUtil).currentUserEmail()"),
            @CacheEvict(value = CacheNames.PRODUCTS_SALE_INFO_BY_USER, key = "T(com.avaks.inventory.config.cache.CacheKeyUtil).currentUserEmail()"),
            @CacheEvict(value = CacheNames.PRODUCT_BY_USER_AND_ID, allEntries = true)
        })
    public Product createProduct(ProductDTO productDTO) {
    User currentUser = userService.getCurrentAuthenticatedUser();

    Product product = new Product();
    product.setName(productDTO.getName());
    product.setDescription(productDTO.getDescription());
    product.setPrice(productDTO.getPrice());
    product.setSellingPrice(productDTO.getSellingPrice());
    product.setStock(productDTO.getStock());
    product.setUser(currentUser);
    if (productDTO.getSupplierId() != null) {
        Supplier supplier = supplierRepository.findByIdAndUserId(productDTO.getSupplierId(), currentUser.getId())
            .orElseThrow(() -> new ResourceNotFoundException("Supplier not found with id " + productDTO.getSupplierId()));
        product.setSupplier(supplier);
    } else {
        product.setSupplier(null);
    }
    return productRepository.save(product);
    }

    @Cacheable(value = CacheNames.PRODUCT_BY_USER_AND_ID, key = "T(com.avaks.inventory.config.cache.CacheKeyUtil).forCurrentUserWithId(#id)")
    public Optional<Product> getProductById(Long id) {
        User currentUser = userService.getCurrentAuthenticatedUser();
        return productRepository.findByIdAndUserId(id, currentUser.getId());
    }

    @Transactional
    @Caching(evict = {
            @CacheEvict(value = CacheNames.PRODUCTS_BY_USER, key = "T(com.avaks.inventory.config.cache.CacheKeyUtil).currentUserEmail()"),
            @CacheEvict(value = CacheNames.PRODUCTS_SALE_INFO_BY_USER, key = "T(com.avaks.inventory.config.cache.CacheKeyUtil).currentUserEmail()"),
            @CacheEvict(value = CacheNames.PRODUCT_BY_USER_AND_ID, key = "T(com.avaks.inventory.config.cache.CacheKeyUtil).forCurrentUserWithId(#id)")
    })
    public Product updateProduct(Long id, ProductDTO productDetails) {
    User currentUser = userService.getCurrentAuthenticatedUser();
    Product product = productRepository.findByIdAndUserId(id, currentUser.getId())
        .orElseThrow(() -> new ResourceNotFoundException("Product not found with id " + id));
    product.setName(productDetails.getName());
    product.setDescription(productDetails.getDescription());
    product.setPrice(productDetails.getPrice());
    product.setSellingPrice(productDetails.getSellingPrice());
    product.setStock(productDetails.getStock());
    if (productDetails.getSupplierId() != null) {
        Supplier supplier = supplierRepository.findByIdAndUserId(productDetails.getSupplierId(), currentUser.getId())
            .orElseThrow(() -> new ResourceNotFoundException("Supplier not found with id " + productDetails.getSupplierId()));
        product.setSupplier(supplier);
    } else {
        product.setSupplier(null);
    }
    return productRepository.save(product);
    }

    @Transactional
    @Caching(evict = {
            @CacheEvict(value = CacheNames.PRODUCTS_BY_USER, key = "T(com.avaks.inventory.config.cache.CacheKeyUtil).currentUserEmail()"),
            @CacheEvict(value = CacheNames.PRODUCTS_SALE_INFO_BY_USER, key = "T(com.avaks.inventory.config.cache.CacheKeyUtil).currentUserEmail()"),
            @CacheEvict(value = CacheNames.PRODUCT_BY_USER_AND_ID, key = "T(com.avaks.inventory.config.cache.CacheKeyUtil).forCurrentUserWithId(#id)")
    })
    public void deleteProduct(Long id) {
        User currentUser = userService.getCurrentAuthenticatedUser();
        Product product = productRepository.findByIdAndUserId(id, currentUser.getId())
            .orElseThrow(() -> new ResourceNotFoundException("Product not found with id " + id));
        productRepository.delete(product);
    }

    @Cacheable(value = CacheNames.PRODUCTS_BY_USER, key = "T(com.avaks.inventory.config.cache.CacheKeyUtil).currentUserEmail()")
    public List<Product> getAllProducts() {
        User currentUser = userService.getCurrentAuthenticatedUser();
        return productRepository.findAllByUserId(currentUser.getId());
    }

    @Cacheable(value = CacheNames.PRODUCTS_SALE_INFO_BY_USER, key = "T(com.avaks.inventory.config.cache.CacheKeyUtil).currentUserEmail()")
    public List<com.avaks.inventory.dto.ProductSaleDTO> getAllProductsForSale() {
        User currentUser = userService.getCurrentAuthenticatedUser();
        List<Product> products = productRepository.findAllByUserId(currentUser.getId());
        List<com.avaks.inventory.dto.ProductSaleDTO> saleDTOs = new java.util.ArrayList<>();
        for (Product product : products) {
            com.avaks.inventory.dto.ProductSaleDTO dto = new com.avaks.inventory.dto.ProductSaleDTO();
            dto.setId(product.getId());
            dto.setName(product.getName());
            dto.setSellingPrice(product.getSellingPrice());
            dto.setPrice(product.getPrice());
            dto.setQuantity(product.getStock());
            saleDTOs.add(dto);
        }
        return saleDTOs;
    }
}


