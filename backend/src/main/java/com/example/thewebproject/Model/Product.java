
package com.example.thewebproject.Model;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    @Column(name = "description")
    private String description;

    private String brand;

    private Integer price;

    private String category;

    @Column(name = "release_date")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date releaseDate;

    @Column(name = "productAvailable")
    private boolean productAvailable;

    @Column(name = "stockQuantity")
    private Integer stockQuantity;

    // Storing image data in DB
    private String imageName;

    private String imageType;

    @Lob
    private byte[] imageData;
}
