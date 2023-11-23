import scrollToTopBtn from "@assets/icon-scroll-to-top.svg";
import "./style.css";

interface Props {

}

const ScrollTopBtn = (props: Props) => {

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <div className={"scroll-to-top"} onClick={scrollToTop}>
            <img src={scrollToTopBtn} alt="scroll to top image" />
        </div>
    )
}

export default ScrollTopBtn