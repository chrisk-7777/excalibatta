import ClockCount from '../clock-count/clock-count';
import FlourCount from '../flour-count/flour-count';
import InventoryList from '../inventory-list/inventory-list';

import styles from './top-hud.module.css';

export default function TopHud() {
  return (
    <div className={styles.topHud}>
      <div className={styles.topHudLeft}>
        <FlourCount />
        <ClockCount />
        <InventoryList />
      </div>
      <div className={styles.topHudRight} />
    </div>
  );
}
