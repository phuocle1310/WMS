import React from "react";
import ReactToPrint from "react-to-print";

//router

class ComponentToPrint extends React.Component {
  render() {
    return this.props.children;
  }
}

class Print extends React.Component {
  render() {
    return (
      <div style={{ marginTop: 100 }}>
        <ComponentToPrint ref={(el) => (this.componentRef = el)}>
          {this.props.children}
        </ComponentToPrint>
        <ReactToPrint
          trigger={() => <button>Print this out!</button>}
          content={() => this.componentRef}
        />
      </div>
    );
  }
}

export default Print;
