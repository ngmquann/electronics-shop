// const ProductSpecs = ({ specs }) => (
//   <div className="card">
//     <h2>Details</h2>
//     <p className="desc">{specs.description}</p>

//     <h3>Screen</h3>
//     <table>
//       <tbody>
//         {specs.screen.map(([key, val]) => (
//           <tr key={key}>
//             <td>{key}</td>
//             <td>{val}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>

//     <h3>CPU</h3>
//     <table>
//       <tbody>
//         {specs.cpu.map(([key, val]) => (
//           <tr key={key}>
//             <td>{key}</td>
//             <td>{val}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>

//     <button className="view-more">View More ▼</button>
//   </div>
// )

// export default ProductSpecs
import { useState } from "react"

const ProductSpecs = ({ specs }) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="card">
      <h2>Details</h2>
      <p className="desc">{specs.description}</p>

      {specs.screen && specs.screen.length > 0 && (
        <>
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
        </>
      )}

      {specs.cpu && specs.cpu.length > 0 && (
        <>
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
        </>
      )}

      {specs.battery && specs.battery.length > 0 && expanded && (
        <>
          <h3>Battery</h3>
          <table>
            <tbody>
              {specs.battery.map(([key, val]) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{val}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {(specs.battery?.length > 0 || specs.camera?.length > 0) && (
        <button className="view-more" onClick={() => setExpanded(!expanded)}>
          {expanded ? "View Less ▲" : "View More ▼"}
        </button>
      )}
    </div>
  )
}

export default ProductSpecs
