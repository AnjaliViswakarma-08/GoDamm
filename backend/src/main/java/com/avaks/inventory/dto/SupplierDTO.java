package com.avaks.inventory.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class SupplierDTO {
    private Long id;

    @NotBlank(message = "Supplier name is required")
    @Size(max = 120, message = "Supplier name is too long")
    private String name;

    @NotBlank(message = "Contact person is required")
    @Size(max = 120, message = "Contact person name is too long")
    private String contactPerson;

    @NotBlank(message = "Email is required")
    @Email(message = "Email format is invalid")
    private String email;

    @NotBlank(message = "Phone number is required")
    @Size(max = 30, message = "Phone number is too long")
    private String phone;

    @Size(max = 255, message = "Address is too long")
    private String address;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getContactPerson() { return contactPerson; }
    public void setContactPerson(String contactPerson) { this.contactPerson = contactPerson; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
}


