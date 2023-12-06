import "./style.css";
import waves from '@assets/waves.svg'

interface Props {
    text: string
}

const Heading = (props: Props) => {
    return (
        <div className={'itemSectiontionTitle'}>
            <h2>{props.text}</h2>
            <img src={waves} alt={'waves decoration'}></img>
        </div>
    )
}

export default Heading