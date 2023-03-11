import React, { Fragment } from "react";
import ListProduct from "~/components/ListProduct";
import Nav from "~/components/Nav";

const Laptop = () => {
  return (
    <Fragment>
      <Nav />
      <ListProduct />;
    </Fragment>
  );
};

export default Laptop;
