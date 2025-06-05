package abhishek.stockviewbackend.repository;

import abhishek.stockviewbackend.entity.Alert;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AlertRepository extends JpaRepository<Alert, Long> {
    List<Alert> findByUserId(Long userId);
    List<Alert> findByTriggeredFalse();
}
