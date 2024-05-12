import "./style.css";


interface Props {
  heading: string,
  watermark: string,
}

const LargeHeading = (props: Props) => {
  return (
    <div className="large-heading">
      <h1 className="large-heading__heading">{props.heading}</h1>
      <h1 className="large-heading__watermark">{props.watermark}</h1>
    </div>
  )
}

export default LargeHeading