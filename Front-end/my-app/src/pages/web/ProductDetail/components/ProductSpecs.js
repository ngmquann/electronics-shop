const ProductSpecs = ({ specs }) => (
  <div className="card">
    <h2>Details</h2>
    <p className="desc">{specs.description}</p>

    <h3>Screen</h3>
    <table>
      <tbody>
        {specs.screen.map(([key, val]) => (
          <tr key={key}>
            <td>{key}</td>
            <td>{val}</td>
          </tr>
        ))}
      </tbody>
    </table>

    <h3>CPU</h3>
    <table>
      <tbody>
        {specs.cpu.map(([key, val]) => (
          <tr key={key}>
            <td>{key}</td>
            <td>{val}</td>
          </tr>
        ))}
      </tbody>
    </table>

    <button className="view-more">View More ▼</button>
  </div>
)

export default ProductSpecs
