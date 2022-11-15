const Message = (props) => {
    const { value }= props

    return value.text && <div className={'mt-3 alert alert-' + value.status}>{value.text}</div>
}

export default Message