import React from 'react'

interface Props {
    onClick: () => void,
    text: string
}

const Button = (props: Props) => {
  return (
    <button className="btn" onClick={props.onClick}>{props.text}</button>
  )
}

export default Button