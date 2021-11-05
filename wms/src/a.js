class Button extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(event) {
    console.log(event);
  }
  render() {
    return (
      <button type="button" onClick={this.handleClick}>
        Click Me
      </button>
    );
  }
}
