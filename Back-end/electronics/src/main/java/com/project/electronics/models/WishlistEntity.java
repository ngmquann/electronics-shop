package com.project.electronics.models;


import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(
        name = "wishlists",
        uniqueConstraints = @UniqueConstraint(name = "uq_wishlist_user_product", columnNames = {"user_id", "product_id"})
)
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class WishlistEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "wishlist_id")
    private Long id;


    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "product_id", nullable = false)
    private ProductEntity product;
}
