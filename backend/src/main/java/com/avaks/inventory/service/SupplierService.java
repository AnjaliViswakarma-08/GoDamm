package com.avaks.inventory.service;

import com.avaks.inventory.config.cache.CacheNames;
import com.avaks.inventory.dto.SupplierDTO;
import com.avaks.inventory.exception.ResourceNotFoundException;
import com.avaks.inventory.exception.SupplierHasProductsException;
import com.avaks.inventory.model.Supplier;
import com.avaks.inventory.model.User;
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
public class SupplierService {

    @Autowired
    private SupplierRepository supplierRepository;

    @Autowired
    private UserService userService;

    @Caching(evict = {
            @CacheEvict(value = CacheNames.SUPPLIERS_BY_USER, key = "T(com.avaks.inventory.config.cache.CacheKeyUtil).currentUserEmail()"),
            @CacheEvict(value = CacheNames.SUPPLIER_BY_USER_AND_ID, allEntries = true)
    })
    public Supplier createSupplier(SupplierDTO supplierDTO) {
        User currentUser = userService.getCurrentAuthenticatedUser();

        Supplier supplier = new Supplier();
        supplier.setName(supplierDTO.getName());
        supplier.setContactPerson(supplierDTO.getContactPerson());
        supplier.setEmail(supplierDTO.getEmail());
        supplier.setPhone(supplierDTO.getPhone());
        supplier.setAddress(supplierDTO.getAddress());
        supplier.setUser(currentUser);
        return supplierRepository.save(supplier);
    }

    @Cacheable(value = CacheNames.SUPPLIER_BY_USER_AND_ID, key = "T(com.avaks.inventory.config.cache.CacheKeyUtil).forCurrentUserWithId(#id)")
    public Optional<Supplier> getSupplierById(Long id) {
        User currentUser = userService.getCurrentAuthenticatedUser();
        return supplierRepository.findByIdAndUserId(id, currentUser.getId());
    }

    @Cacheable(value = CacheNames.SUPPLIERS_BY_USER, key = "T(com.avaks.inventory.config.cache.CacheKeyUtil).currentUserEmail()")
    public List<Supplier> getAllSuppliers() {
        User currentUser = userService.getCurrentAuthenticatedUser();
        return supplierRepository.findAllByUserId(currentUser.getId());
    }

    @Caching(evict = {
            @CacheEvict(value = CacheNames.SUPPLIERS_BY_USER, key = "T(com.avaks.inventory.config.cache.CacheKeyUtil).currentUserEmail()"),
            @CacheEvict(value = CacheNames.SUPPLIER_BY_USER_AND_ID, key = "T(com.avaks.inventory.config.cache.CacheKeyUtil).forCurrentUserWithId(#id)")
    })
    public Supplier updateSupplier(Long id, SupplierDTO supplierDetails) {
        User currentUser = userService.getCurrentAuthenticatedUser();
        Supplier supplier = supplierRepository.findByIdAndUserId(id, currentUser.getId())
            .orElseThrow(() -> new ResourceNotFoundException("Supplier not found with id " + id));
        supplier.setName(supplierDetails.getName());
        supplier.setContactPerson(supplierDetails.getContactPerson());
        supplier.setEmail(supplierDetails.getEmail());
        supplier.setPhone(supplierDetails.getPhone());
        supplier.setAddress(supplierDetails.getAddress());
        return supplierRepository.save(supplier);
    }

    @Transactional
    @Caching(evict = {
            @CacheEvict(value = CacheNames.SUPPLIERS_BY_USER, key = "T(com.avaks.inventory.config.cache.CacheKeyUtil).currentUserEmail()"),
            @CacheEvict(value = CacheNames.SUPPLIER_BY_USER_AND_ID, key = "T(com.avaks.inventory.config.cache.CacheKeyUtil).forCurrentUserWithId(#id)")
    })
    public void deleteSupplier(Long id) {
        User currentUser = userService.getCurrentAuthenticatedUser();
        Supplier supplier = supplierRepository.findByIdAndUserId(id, currentUser.getId())
            .orElseThrow(() -> new ResourceNotFoundException("Supplier not found with id " + id));
        
        // Check if supplier has any linked products
        if (supplier.getProducts() != null && !supplier.getProducts().isEmpty()) {
            throw new SupplierHasProductsException(
                "Cannot delete supplier. This supplier has " + supplier.getProducts().size() + 
                " product(s) linked to it. Please delete or reassign the products first.");
        }
        
        supplierRepository.deleteById(id);
    }
}


