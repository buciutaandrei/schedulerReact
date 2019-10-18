import React from "react";
import { hoursArray } from "../DataTables/hoursArray";
import "./TableBackground.css";

const TableBackground = () => {
  const array = hoursArray.map((hours, i) => {
    return (
      <React.Fragment>
        <tr
          key={i}
          className="trBackground"
          style={{
            display: "table",
            width: "100%"
          }}
        >
          <th
            className="tableBackground"
            style={{ width: "10%", height: "2em" }}
          >
            {" "}
          </th>
          <td className="tableBackground" style={{ width: "30%" }}>
            {" "}
          </td>
          <td className="tableBackground" style={{ width: "30%" }}>
            {" "}
          </td>
          <td className="tableBackground" style={{ width: "30%" }}>
            {" "}
          </td>
        </tr>
      </React.Fragment>
    );
  });

  return <React.Fragment>{array}</React.Fragment>;
};
export default TableBackground;
