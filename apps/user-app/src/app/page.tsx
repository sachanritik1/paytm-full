"use client";

import { useBalance } from "@repo/store/useBalance";

const page = () => {
  const balance = useBalance();
  return <div className="">user balance : {balance}</div>;
};

export default page;
