import { Typography } from "antd"
import { Link } from "react-router-dom"
import styles from "./auth.module.css"

const { Text } = Typography

const AuthFormFooter = ({ text, linkText, linkTo }) => {
  return (
    <Text className={styles.footerText}>
      {text} <Link to={linkTo}>{linkText}</Link>
    </Text>
  )
}

export default AuthFormFooter
