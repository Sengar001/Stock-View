package abhishek.stockviewbackend.entity;

import lombok.Data;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Data
@Table(name = "alerts")
public class Alert {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "stock_symbol", nullable = false)
    private Stock stock;

    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal targetPrice;

    private boolean triggered = false;
}