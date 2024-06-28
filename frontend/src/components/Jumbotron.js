import React, { Children } from "react";

function Jumbotron({ children }) {
   return (
      <div className="jumbotron p-5">
         <div className="d-flex">
            <div className="p-5">
               {children}
            </div>
         </div>
      </div>
   );
}

export default Jumbotron;
