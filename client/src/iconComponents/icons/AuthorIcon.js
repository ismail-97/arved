import * as React from "react";

const SvgAuthoricon = (props) => (
  <svg
    data-name="author icon"
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    {...props}
  >
    <path data-name="Path 210" d="M0 0h24v24H0Z" fill="none" />
    <path
      data-name="Path 211"
      d="M12 6a2 2 0 1 1-2 2 2.006 2.006 0 0 1 2-2m0 10c2.7 0 5.8 1.29 6 2H6c.23-.72 3.31-2 6-2m0-12a4 4 0 1 0 4 4 4 4 0 0 0-4-4Zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4Z"
      fill="#134383"
    />
  </svg>
);

export default SvgAuthoricon;
