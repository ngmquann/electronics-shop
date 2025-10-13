const IconText = ({ icon, title, value }) => (
  <li>
    <div className="icon">{icon}</div>
    <div className="text">
      <span className="spec">{title}</span>
      <span className="value">{value}</span>
    </div>
  </li>
);

export default IconText;
