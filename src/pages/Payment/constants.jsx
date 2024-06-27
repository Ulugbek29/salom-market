import { Truck, UserCheck } from "react-feather";

export const branches = [
  {
    id: 1,
    name: "Chilonzor",
  },
  {
    id: 2,
    name: "Ahmad Donish",
  },
  {
    id: 3,
    name: "Zenit",
  },
  {
    id: 4,
    name: "Sayram",
  },
  {
    id: 5,
    name: "Universam",
  },
  {
    id: 6,
    name: "Oloy bozori",
  },
  {
    id: 7,
    name: "SamPI",
  },
];

export const tabs = [
  {
    id: 1,
    text: "Yetkazib berish",
    icon: () => <Truck size={16} />,
    status: true
  },
  {
    id: 2,
    text: "Olib ketish",
    icon: () => <UserCheck size={16} />,
    status: false
  },
];
