import { Footer } from "./footer";
import { Navbar } from "./navbar";
import styles from '../styles/components/layout.module.css'

interface LayoutPropsInterface {}

export const Layout: React.FC<LayoutPropsInterface> = ({
  children,
}): JSX.Element => {
  return (
    <div className={styles.pageContainer}>
      <Navbar />
      <main className={styles.mainContainer}>
        <>{children}</>
      </main>
      <Footer />
    </div>
  );
};
