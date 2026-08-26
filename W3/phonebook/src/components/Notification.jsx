const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="window" style={{ width: 300, marginBottom: 10 }}>
      <div className="title-bar">
        <div className="title-bar-text">Notification</div>
      </div>
      <div className="window-body">
        <p>{message}</p>
      </div>
    </div>
  )
}

export default Notification