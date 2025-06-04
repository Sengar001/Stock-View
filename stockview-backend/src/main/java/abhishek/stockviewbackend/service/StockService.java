package abhishek.stockviewbackend.service;

import abhishek.stockviewbackend.dto.StockDTO;
import abhishek.stockviewbackend.entity.Stock;
import abhishek.stockviewbackend.exception.ResourceNotFoundException;
import abhishek.stockviewbackend.repository.StockRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StockService {

    private final StockRepository stockRepository;

    public StockService(StockRepository stockRepository) {
        this.stockRepository = stockRepository;
    }

    public Stock addStock(StockDTO stockDTO) {
        Stock stock = new Stock();
        stock.setSymbol(stockDTO.symbol().toUpperCase());
        stock.setName(stockDTO.name());
        return stockRepository.save(stock);
    }

    public Stock updateStock(String symbol, StockDTO stockDTO) {
        Stock stock = stockRepository.findById(symbol)
                .orElseThrow(() -> new ResourceNotFoundException("Stock not found"));
        stock.setName(stockDTO.name());
        return stockRepository.save(stock);
    }

    public void deleteStock(String symbol) {
        stockRepository.deleteById(symbol);
    }

    public List<Stock> getAllStocks() {
        return stockRepository.findAll();
    }
}