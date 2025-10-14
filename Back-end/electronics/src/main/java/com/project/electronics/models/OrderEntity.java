package com.project.electronics.models;


import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "address", length = 255)
    private String address;

    @Column(name = "total", nullable = false)
    private Double total;

    @Column(name = "status", nullable = false)
    private Boolean status;

    @Column(name = "method_delivery", length = 50, nullable = false)
    private String methodDelivery;


    @Column(name = "status_method_delivery", length = 50, nullable = false)
    private String statusMethodDelivery;

    @Column(name = "method_payment", length = 50, nullable = false)
    private String methodPayment;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderDetailEntity> orderDetails = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;
}
