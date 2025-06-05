package abhishek.stockviewbackend.service;

import abhishek.stockviewbackend.entity.Stock;
import abhishek.stockviewbackend.entity.User;
import abhishek.stockviewbackend.entity.Watchlist;
import abhishek.stockviewbackend.exception.ResourceNotFoundException;
import abhishek.stockviewbackend.repository.StockRepository;
import abhishek.stockviewbackend.repository.WatchlistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WatchlistService {

    private final WatchlistRepository watchlistRepository;
    private final StockRepository stockRepository;

    @Transactional
    public void addToWatchlist(User user, String symbol) {
        Stock stock = stockRepository.findById(symbol)
                .orElseThrow(() -> new ResourceNotFoundException("Stock not found with symbol: " + symbol));

        // Check if already in watchlist
        if (watchlistRepository.existsByUserAndStock(user, stock)) {
            return;
        }

        Watchlist item = new Watchlist();
        item.setUser(user);
        item.setStock(stock);
        watchlistRepository.save(item);
    }

    @Transactional
    public void removeFromWatchlist(User user, String symbol) {
        Stock stock = stockRepository.findById(symbol)
                .orElseThrow(() -> new ResourceNotFoundException("Stock not found with symbol: " + symbol));

        watchlistRepository.deleteByUserAndStock(user, stock);
    }

    @Transactional(readOnly = true)
    public List<Stock> getWatchlist(User user) {
        List<Watchlist> watchlistItems = watchlistRepository.findByUser(user);
        return watchlistItems.stream()
                .map(Watchlist::getStock)
                .collect(Collectors.toList());
    }
}
