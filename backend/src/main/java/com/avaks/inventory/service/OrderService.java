package com.avaks.inventory.service;

import com.avaks.inventory.dto.OrderDTO;
import com.avaks.inventory.exception.OutOfStockException;
import com.avaks.inventory.exception.ResourceNotFoundException;
import com.avaks.inventory.model.Order;
import com.avaks.inventory.model.Product;
import com.avaks.inventory.model.User;
import com.avaks.inventory.repository.OrderRepository;
import com.avaks.inventory.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserService userService;

    @Transactional
    public Order createOrder(OrderDTO orderDTO) {
        User currentUser = userService.getCurrentAuthenticatedUser();

        Product product = productRepository.findByIdAndUserId(orderDTO.getProductId(), currentUser.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id " + orderDTO.getProductId()));

        // Perform Atomic Stock Decrement
        int rowsUpdated = productRepository.decrementStockForUser(orderDTO.getProductId(), currentUser.getId(), orderDTO.getQuantity());
        if (rowsUpdated == 0) {
            throw new OutOfStockException("Insufficient stock or concurrent update for product: " + product.getName());
        }

        Order order = new Order();
        order.setProduct(product);
        order.setUser(currentUser);
        order.setQuantity(orderDTO.getQuantity());
        order.setOrderDate(LocalDateTime.now());
        return orderRepository.save(order);
    }

    public Optional<Order> getOrderById(Long id) {
        User currentUser = userService.getCurrentAuthenticatedUser();
        return orderRepository.findByIdAndUserId(id, currentUser.getId());
    }

    public List<Order> getAllOrders() {
        User currentUser = userService.getCurrentAuthenticatedUser();
        return orderRepository.findAllByUserId(currentUser.getId());
    }
}
