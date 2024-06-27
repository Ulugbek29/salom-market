import { useState } from "react";
import { ArrowRight } from "react-feather";

import { branches } from "./constants";
import cls from "./styles.module.scss";

export default function DeliveryBranches() {
  const [selectedBranchId, setSelectedBranchId] = useState(null);

  return (
    <div className={cls.branchesWrapper}>
      <p className={cls.chooseBranch}>Filialni tanlang</p>
      <div className={cls.branches}>
        {branches.map((branch) => (
          <div
            key={branch.id}
            className={`${cls.branch} ${selectedBranchId === branch.id ? cls.active : ""}`}
            onClick={() => {
              setSelectedBranchId(branch.id);
            }}
          >
            <p className={cls.name}>{branch.name}</p>
            <p className={cls.address}>Bobur ko'ch. 174</p>
            <p className={cls.hours}>10:00 - 22:00</p>
            <ArrowRight className={cls.icon} />
          </div>
        ))}
      </div>
    </div>
  );
}
