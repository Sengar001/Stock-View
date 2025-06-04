package abhishek.stockviewbackend.controller;

import abhishek.stockviewbackend.dto.StockDTO;
import abhishek.stockviewbackend.entity.Stock;
import abhishek.stockviewbackend.service.StockService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/stocks")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final StockService stockService;

    public AdminController(StockService stockService) {
        this.stockService = stockService;
    }

    @PostMapping
    public ResponseEntity<Stock> addStock(@Valid @RequestBody StockDTO stockDTO) {
        return ResponseEntity.ok(stockService.addStock(stockDTO));
    }

    @PutMapping("/{symbol}")
    public ResponseEntity<Stock> updateStock(
            @PathVariable String symbol,
            @Valid @RequestBody StockDTO stockDTO) {
        return ResponseEntity.ok(stockService.updateStock(symbol, stockDTO));
    }

    @GetMapping
    public ResponseEntity<List<Stock>> getAllStocks() {
        return ResponseEntity.ok(stockService.getAllStocks());
    }

}