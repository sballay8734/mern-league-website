import { GoTriangleDown } from "react-icons/go"

export default function SeasonalRate() {
  return (
    <div className="picks-by-season">
      <h1 className="header">
        <div className="years">
          <span className="year">2023</span>
          <span className="word">Pick Rate</span>
          <span className="arrow">
            <GoTriangleDown />
          </span>
        </div>
      </h1>
      <table className="at-picks-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Fraction</th>
            <th>Pct.</th>
          </tr>
        </thead>
        <tbody>
          <tr className="active-row">
            <td>Shawn B.</td>
            <td>27/52</td>
            <td className="percentage">43%</td>
          </tr>
          <tr>
            <td>Steve S.</td>
            <td>27/52</td>
            <td className="percentage">37%</td>
          </tr>
          <tr>
            <td>Don I.</td>
            <td>27/52</td>
            <td className="percentage">49%</td>
          </tr>
          <tr>
            <td>Cody Z.</td>
            <td>27/52</td>
            <td className="percentage">31%</td>
          </tr>
          <tr>
            <td>Shawn B.</td>
            <td>27/52</td>
            <td className="percentage">43%</td>
          </tr>
          <tr>
            <td>Steve S.</td>
            <td>27/52</td>
            <td className="percentage">37%</td>
          </tr>
          <tr>
            <td>Don I.</td>
            <td>27/52</td>
            <td className="percentage">49%</td>
          </tr>
          <tr>
            <td>Cody Z.</td>
            <td>27/52</td>
            <td className="percentage">31%</td>
          </tr>
          <tr>
            <td>Shawn B.</td>
            <td>27/52</td>
            <td className="percentage">43%</td>
          </tr>
          <tr>
            <td>Steve S.</td>
            <td>27/52</td>
            <td className="percentage">37%</td>
          </tr>
          <tr>
            <td>Don I.</td>
            <td>27/52</td>
            <td className="percentage">49%</td>
          </tr>
          <tr>
            <td>Cody Z.</td>
            <td>27/52</td>
            <td className="percentage">31%</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
