import styles from "./auth.module.css"

const AuthContainer = ({ children }) => {
  return <div className={styles.authContainer}>{children}</div>
}

export default AuthContainer
