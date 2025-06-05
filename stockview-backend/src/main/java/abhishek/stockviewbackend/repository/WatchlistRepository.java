package abhishek.stockviewbackend.repository;

import abhishek.stockviewbackend.entity.Stock;
import abhishek.stockviewbackend.entity.User;
import abhishek.stockviewbackend.entity.Watchlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WatchlistRepository extends JpaRepository<Watchlist, Long> {
    List<Watchlist> findByUser(User user);
    void deleteByUserAndStock(User user, Stock stock);
    boolean existsByUserAndStock(User user, Stock stock);
}
