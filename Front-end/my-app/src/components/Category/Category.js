import { useNavigate } from "react-router-dom"
import * as FaIcons from "react-icons/fa"
import * as MdIcons from "react-icons/md"
import * as AiIcons from "react-icons/ai"
import * as BsIcons from "react-icons/bs"
import * as BiIcons from "react-icons/bi"
import * as IoIcons from "react-icons/io"
import * as Io5Icons from "react-icons/io5"
import * as RiIcons from "react-icons/ri"
import * as GiIcons from "react-icons/gi"
import * as TbIcons from "react-icons/tb"
import * as LuIcons from "react-icons/lu"
import * as FiIcons from "react-icons/fi"
import * as SlIcons from "react-icons/sl"
import * as CgIcons from "react-icons/cg"
import * as TfiIcons from "react-icons/tfi"
import * as PiIcons from "react-icons/pi"
import * as GoIcons from "react-icons/go"
import * as GoIcons6 from "react-icons/fa6"
import * as CiIcons from "react-icons/ci"

function CategoryItem({ icon, label, cateId }) {
  const navigate = useNavigate()

  const getIconByName = (iconName) => {
    const IconComponent = allIcons[iconName]
    return IconComponent ? <IconComponent size={48} /> : <span>{iconName}</span>
  }
  // fontSize: "48px", width: "48px", height: "48px"
  const allIcons = {
    ...FaIcons,
    ...MdIcons,
    ...AiIcons,
    ...BsIcons,
    ...BiIcons,
    ...IoIcons,
    ...Io5Icons,
    ...RiIcons,
    ...GiIcons,
    ...TbIcons,
    ...LuIcons,
    ...FiIcons,
    ...SlIcons,
    ...CgIcons,
    ...TfiIcons,
    ...PiIcons,
    ...GoIcons,
    ...GoIcons6,
    ...CiIcons,
  }

  return (
    <div
      style={{
        width: "160px",
        height: "128px",
        borderRadius: "15px",
        backgroundColor: "#EDEDED",
        // padding: "24px 52px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={() => navigate(`/catalog/${cateId}`)}
    >
      <div style={{ fontSize: "48px", width: "48px", height: "48px" }}>
        {getIconByName(icon)}
      </div>
      <p
        style={{
          fontSize: "16px",
          fontWeight: "500",
          marginTop: "8px",
          marginBottom: "0",
          textAlign: "center",
        }}
      >
        {label}
      </p>
    </div>
  )
}

export default CategoryItem
