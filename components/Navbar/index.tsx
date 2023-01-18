import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { useState } from "react";
import { useCookies } from "react-cookie";
import ChatButton from "../ChatButton";
import ContactUsModal from "../ContactUsModal";
import DesktopNav from "../DesktopNav";
import Logo from "../Logo";
import MobileNav from "../MobileNav";
import styles from "./Navbar.module.css";

interface NavbarProps {
  hasMessageButton?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ hasMessageButton }) => {
  const [mobileNavIsOpen, setMobileNavIsOpen] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["user", "applicant"]);
  const [contactModalShowing, setContactModalShowing] = useState(false);
  const router = useRouter();
  return (
    <>
      <nav className={styles.navbarContainer}>
        <Logo />
        <div className={styles.rightBoxContainer}>
          {hasMessageButton && <div className={styles.mobileChatButton}>
            <ChatButton />
          </div>}
          <MobileNav
            mobileNavIsOpen={mobileNavIsOpen}
            setMobileNavIsOpen={setMobileNavIsOpen}
          />
        </div>
        <DesktopNav
          hasMessageButton={hasMessageButton}
          setContactModalShowing={setContactModalShowing}
        />
      </nav>
      <div
        style={{ maxHeight: mobileNavIsOpen ? 120 : 0 }}
        className={styles.navItemsContainer}
      >
        <p
          onClick={() => {
            router.push("/");
            setMobileNavIsOpen(false);
          }}
        >
          Home
        </p>
        {cookies?.applicant && (
          <p
            onClick={() => {
              removeCookie("applicant");
              removeCookie("user");
              router.push("/login");
              setMobileNavIsOpen(false);
            }}
          >
            Logout
          </p>
        )}
        <p onClick={() => router.push("/login")}>Login</p>
        <p
          onClick={() => {
            setMobileNavIsOpen(false);
            setContactModalShowing(true);
          }}
        >
          Contact Us
        </p>
      </div>
      <AnimatePresence>
        {contactModalShowing && (
          <ContactUsModal setShowing={setContactModalShowing} />
        )}
      </AnimatePresence>
    </>
  );
};
export default Navbar;
