import "./style.css";
import waves from '@assets/waves.svg'

interface Props {
    text: string
    decor?: boolean
}

const Heading = (props: Props) => {
    return (
        <div className={'itemSectionTitle'}>
            <h2>{props.text}</h2>
            {props.decor && <img src={waves} alt={'waves decoration'}></img>}
        </div>
    )
}

export default Heading