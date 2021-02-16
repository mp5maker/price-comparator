import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../styles/components/layout.module.css";
import { Footer } from "./footer";
import { Navbar } from "./navbar";
import { Button } from "../components/button";
import { useChart } from "../hooks/useChart";
import { faBan, faChartPie } from "@fortawesome/free-solid-svg-icons";

interface LayoutPropsInterface {}

export const Layout: React.FC<LayoutPropsInterface> = ({
  children,
}): JSX.Element => {
  const { setShow: setShowChart, show: showChart }: any = useChart();

  return (
    <div className={styles.pageContainer}>
      <Navbar>
        <Button
          style={{
            height: 40,
            width: 40,
            borderRadius: "50%",
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "transparent",
            border: "1px solid var(--black)",
            outline: "none",
          }}
          onClick={() => {
            if (showChart) setShowChart(false);
            else setShowChart(true);
          }}
        >
          <FontAwesomeIcon
            icon={faChartPie}
            style={{
              color: "var(--black)",
            }}
          />
          {showChart ? (
            <FontAwesomeIcon
              icon={faBan}
              style={{
                color: "var(--firebrick)",
                position: "absolute",
              }}
            />
          ) : (
            <></>
          )}
        </Button>
      </Navbar>
      <main className={styles.mainContainer}>
        <>{children}</>
      </main>
      <Footer />
    </div>
  );
};
