package abhishek.stockviewbackend.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;

@Entity
@Data
@NoArgsConstructor
@Table(name = "stocks")
public class Stock {
    @Id
    private String symbol;

    @Column(nullable = false)
    private String name;
}