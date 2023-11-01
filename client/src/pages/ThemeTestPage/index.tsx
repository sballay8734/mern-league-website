import "./ThemeTestPage.scss"

export default function ThemeTestPage() {
  return (
    <div className="page-test">
      <div className="theme eagles-midnight">
        <h1>Eagles Midnight</h1>
        <button className="btn">btn</button>
      </div>
      <div className="theme eagles-kelly">
        <h1>Eagles Kelly</h1>
        <button className="btn">btn</button>
      </div>
      <div className="theme liverpool">
        <h1>Liverpool</h1>
        <button className="btn">btn</button>
      </div>
      <div className="theme phillies">
        <h1>Phillies</h1>
        <button className="btn">btn</button>
      </div>
      <div className="theme union">
        <h1>Union (too dark)</h1>
        <button className="btn">btn</button>
      </div>
      <div className="theme giants">
        <h1>Giants</h1>
        <button className="btn">btn</button>
      </div>
      <div className="theme city">
        <h1>Man City</h1>
        <button className="btn">btn</button>
      </div>
    </div>
  )
}
