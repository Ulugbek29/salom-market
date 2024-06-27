import { tabs } from "./constants";
import cls from "./styles.module.scss";

export default function DeliveryTabs({ setActiveTabId, activeTabId }) {
  return (
    <div className={cls.tabs}>
      <div className={cls.tabs_inner}>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`${cls.tab} ${tab.status ? "" : cls.disabled} ${tab.id === activeTabId ? cls.active : ""}`}
            onClick={() => setActiveTabId(tab.id)}
          >
            <tab.icon />
           <div className={cls.text__container}>
            {tab.text}
            {!tab.status && (
              <span className={cls.soon__text}>Скоро</span>
            )}
           </div>
          </div>
        ))}
      </div>
    </div>
  );
}
