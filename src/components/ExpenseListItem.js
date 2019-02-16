import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import numeral from "numeral";

const ExpenseListComponent = ({ id, description, amount, createdAt }) => (
  <div className="expense-list__item">
    <div className="expense_list__about">
      <Link to={`/edit/${id}`} className="expense-list__item__about__title">
        <div>{description}</div>
      </Link>
      <div className="expense-list__item__about__date">
        {moment(createdAt).format("MMM Do, YYYY")}
      </div>
    </div>
    <div className="expense-list__item__amount">{`₹${numeral(amount / 100).format(
      "0,0.00"
    )}`}</div>
  </div>
);

export default ExpenseListComponent;
