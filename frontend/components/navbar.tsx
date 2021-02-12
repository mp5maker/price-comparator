import { Logo } from "./logo"
import styles from '../styles/components/navbar.module.css'

interface NavbarPropsInterface {}

export const Navbar: React.FC<NavbarPropsInterface> = ({
  children
}): JSX.Element => {
  return (
    <nav className={styles.navbarContainer}>
      <Logo />
      { children }
    </nav>
  )
}