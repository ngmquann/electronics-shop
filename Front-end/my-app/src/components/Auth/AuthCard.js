import styles from "./auth.module.css"

const AuthCard = ({ children }) => {
  return <div className={styles.authCard}>{children}</div>
}

export default AuthCard
