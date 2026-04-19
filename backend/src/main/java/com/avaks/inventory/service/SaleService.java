package com.avaks.inventory.service;

import com.avaks.inventory.config.cache.CacheNames;
import com.avaks.inventory.dto.SaleItemRequest;
import com.avaks.inventory.model.Product;
import com.avaks.inventory.model.ProfitRecord;
import com.avaks.inventory.model.Sale;
import com.avaks.inventory.model.User;
import com.avaks.inventory.repository.ProductRepository;
import com.avaks.inventory.repository.ProfitRecordRepository;
import com.avaks.inventory.repository.SaleRepository;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.ArrayList;
import java.util.HashMap;

@Service
public class SaleService {

    @Autowired
    private SaleRepository saleRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProfitRecordRepository profitRecordRepository;

    @Autowired
    private UserService userService;

    @Transactional
    @Caching(evict = {
            @CacheEvict(value = CacheNames.PRODUCTS_BY_USER, key = "T(com.avaks.inventory.config.cache.CacheKeyUtil).currentUserEmail()"),
            @CacheEvict(value = CacheNames.PRODUCTS_SALE_INFO_BY_USER, key = "T(com.avaks.inventory.config.cache.CacheKeyUtil).currentUserEmail()"),
            @CacheEvict(value = CacheNames.PRODUCT_BY_USER_AND_ID, allEntries = true),
            @CacheEvict(value = CacheNames.TOTAL_PROFIT_BY_USER, key = "T(com.avaks.inventory.config.cache.CacheKeyUtil).currentUserEmail()"),
            @CacheEvict(value = CacheNames.LATEST_PROFIT_BY_USER, key = "T(com.avaks.inventory.config.cache.CacheKeyUtil).currentUserEmail()")
    })
    public Map<String, Object> recordSale(List<SaleItemRequest> productsToSell) {
        User currentUser = userService.getCurrentAuthenticatedUser();
        double batchProfitEarned = 0.0;
        List<Product> updatedProducts = new ArrayList<>();

        for (SaleItemRequest item : productsToSell) {
            Long productId = item.getId();
            Integer quantity = item.getQuantity();

            if (productId == null || quantity == null || quantity <= 0) {
                throw new RuntimeException("Invalid sale request: missing product id or invalid quantity");
            }

            // 1. Fetch current price details (Pricing usually needs a point-in-time
            // snapshot)
            Product product = productRepository.findByIdAndUserId(productId, currentUser.getId())
                    .orElseThrow(() -> new RuntimeException("Product not found: id=" + productId));

            // 2. Perform Atomic Stock Decrement
            int rowsUpdated = productRepository.decrementStockForUser(productId, currentUser.getId(), quantity);
            if (rowsUpdated == 0) {
                // This means either the ID changed (unlikely) or stock became insufficient
                // between fetch and update
                throw new RuntimeException("Insufficient stock or concurrent update for product: " + product.getName());
            }

            // 3. Calculate profit based on the snapshot we took
            double itemSellingPrice = product.getSellingPrice();
            double itemCostPrice = product.getPrice();
            double itemProfit = (itemSellingPrice - itemCostPrice) * quantity;
            batchProfitEarned += itemProfit;

            // 4. Record the specific sale record
            Sale sale = new Sale();
            sale.setProductName(product.getName());
            sale.setQuantitySold(quantity);
            sale.setTotalBillAmount(itemSellingPrice * quantity);
            sale.setProfitEarned(itemProfit);
            sale.setTimestamp(LocalDateTime.now());
            sale.setUser(currentUser);
            saleRepository.save(sale);

            // 5. Get the updated product for the response (optional but good for UI)
            product.setStock(product.getStock() - quantity); // Manually sync for response object
            updatedProducts.add(product);
        }

        // 6. Update global profit record efficiently
        updateTotalProfit(batchProfitEarned, currentUser);

        Map<String, Object> response = new HashMap<>();
        response.put("profit", batchProfitEarned);
        response.put("updatedProducts", updatedProducts);
        return response;
    }

    private void updateTotalProfit(double additionalProfit, User currentUser) {
        ProfitRecord latest = profitRecordRepository.findTopByUserIdOrderByTimestampDesc(currentUser.getId());
        double currentTotal = (latest != null) ? latest.getProfit() : 0.0;

        ProfitRecord newRecord = new ProfitRecord();
        newRecord.setProfit(currentTotal + additionalProfit);
        newRecord.setTimestamp(LocalDateTime.now());
        newRecord.setUser(currentUser);
        profitRecordRepository.save(newRecord);
    }

    @Cacheable(value = CacheNames.TOTAL_PROFIT_BY_USER, key = "T(com.avaks.inventory.config.cache.CacheKeyUtil).currentUserEmail()")
    public double getTotalProfit() {
        User currentUser = userService.getCurrentAuthenticatedUser();
        ProfitRecord latest = profitRecordRepository.findTopByUserIdOrderByTimestampDesc(currentUser.getId());
        return (latest != null) ? latest.getProfit() : 0.0;
    }

    public ProfitRecord getLatestProfitRecord() {
        User currentUser = userService.getCurrentAuthenticatedUser();
        return profitRecordRepository.findTopByUserIdOrderByTimestampDesc(currentUser.getId());
    }

    @Transactional
    @Caching(evict = {
            @CacheEvict(value = CacheNames.TOTAL_PROFIT_BY_USER, key = "T(com.avaks.inventory.config.cache.CacheKeyUtil).currentUserEmail()"),
            @CacheEvict(value = CacheNames.LATEST_PROFIT_BY_USER, key = "T(com.avaks.inventory.config.cache.CacheKeyUtil).currentUserEmail()")
    })
    public LocalDateTime resetSales() {
        User currentUser = userService.getCurrentAuthenticatedUser();
        saleRepository.deleteAllByUserId(currentUser.getId());
        // Also clear profit history if resetting everything
        profitRecordRepository.deleteAllByUserId(currentUser.getId());

        ProfitRecord profitRecord = new ProfitRecord();
        profitRecord.setProfit(0.0);
        profitRecord.setTimestamp(LocalDateTime.now());
        profitRecord.setUser(currentUser);
        profitRecordRepository.save(profitRecord);
        return profitRecord.getTimestamp();
    }
}
