import React from "react";
import ReactToPrint from "react-to-print";
import PoItem from "../../components/Po/PoItem";

class ComponentToPrint extends React.Component {
  render() {
    return <PoItem />;
  }
}

class Example extends React.Component {
  render() {
    return (
      <div style={{ marginTop: 100 }}>
        <ComponentToPrint ref={(el) => (this.componentRef = el)} />
        <ReactToPrint
          trigger={() => <button>Print this out!</button>}
          content={() => this.componentRef}
        />
      </div>
    );
  }
}

export default Example;
