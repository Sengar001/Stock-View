package abhishek.stockviewbackend.controller;

import abhishek.stockviewbackend.dto.AlertRequest;
import abhishek.stockviewbackend.entity.Stock;
import abhishek.stockviewbackend.entity.Alert;
import abhishek.stockviewbackend.entity.User;
import abhishek.stockviewbackend.repository.UserRepository;
import abhishek.stockviewbackend.service.AlertService;
import abhishek.stockviewbackend.service.WatchlistService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final WatchlistService watchlistService;
    private final AlertService alertService;
    private final UserRepository userRepository;

    public UserController(WatchlistService watchlistService,
                          AlertService alertService,
                          UserRepository userRepository) {
        this.watchlistService = watchlistService;
        this.alertService = alertService;
        this.userRepository = userRepository;
    }

    @GetMapping("/watchlist")
    public ResponseEntity<List<Stock>> getWatchlist(Principal principal) {
        User user = getUserFromPrincipal(principal);
        return ResponseEntity.ok(watchlistService.getWatchlist(user));
    }

    @PostMapping("/watchlist/{symbol}")
    public ResponseEntity<?> addToWatchlist(
            Principal principal,
            @PathVariable String symbol) {
        User user = getUserFromPrincipal(principal);
        watchlistService.addToWatchlist(user, symbol);
        return ResponseEntity.ok("Added to watchlist");
    }

    private User getUserFromPrincipal(Principal principal) {
        return userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
