import * as React from "react";

export interface HelloProps { compiler: string; framework: string; }

 const App = ({HelloProps}: props) => {
    return (
         <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>;
    );
}
