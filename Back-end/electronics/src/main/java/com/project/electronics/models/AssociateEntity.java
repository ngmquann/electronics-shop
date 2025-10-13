package com.project.electronics.models;


import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "associates")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AssociateEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false, length = 150)
    private String name;

    @Column(name = "type", nullable = false, length = 50)
    private String type;

    @Column(name = "logo",columnDefinition = "LONGTEXT")
    @Lob
    private String logo;

    @ManyToMany(mappedBy = "associates")
    private List<ProductEntity> products = new ArrayList<>();
}

