import * as React from "react";

const SvgPendingAccountsIcon = (props) => (
  <svg
    data-name="Pending Accounts"
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    {...props}
    
  >
    <title>Pending Account</title>
    <path data-name="Rectangle 1473" fill="none" d="M0 0h18v18H0z" />
    <path
      data-name="Path 258"
      d="M12.75 9a3.75 3.75 0 1 0 3.75 3.75A3.751 3.751 0 0 0 12.75 9Zm1.237 5.513L12.375 12.9v-2.4h.75v2.093l1.388 1.388ZM13.5 2.25h-2.385a2.241 2.241 0 0 0-4.23 0H4.5A1.5 1.5 0 0 0 3 3.75V15a1.5 1.5 0 0 0 1.5 1.5h4.583A5.058 5.058 0 0 1 8.018 15H4.5V3.75H6V6h6V3.75h1.5v3.81a5.273 5.273 0 0 1 1.5.45V3.75a1.5 1.5 0 0 0-1.5-1.5ZM9 3.75A.75.75 0 1 1 9.75 3a.752.752 0 0 1-.75.75Z"
      fill={props.color}
    />
  </svg>
);

//#134383
export default SvgPendingAccountsIcon;
