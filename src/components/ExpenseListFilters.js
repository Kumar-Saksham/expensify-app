import React from "react";
import { DateRangePicker } from "react-dates";
import { connect } from "react-redux";

import {
  setTextFilter,
  sortByDate,
  sortByAmount,
  setStartDate,
  setEndDate
} from "../actions/filters";

export class ExpenseListFilters extends React.Component {
  state = {
    calanderFocused: null,
    filterOpen: false
  };

  handlePullonClick = () => {
    if(this.state.filterOpen){
      console.log('closing');
      $('.filter-overlay').removeClass('overlay-open');
      $('.filter-overlay__pull').removeClass('overlay-open__pull');
      //$('.filter-overlay__pull').css('transform', 'rotate(0)');
      this.setState(() => ({ filterOpen: false }));
      
    } else {
      console.log('opening');
      $('.filter-overlay').addClass('overlay-open');
      $('.filter-overlay__pull').addClass('overlay-open__pull');
      //$('.filter-overlay__pull').css('transform', 'rotate(180deg)');
      this.setState(() => ({ filterOpen: true }));
    }
  }

  onDatesChange = ({ startDate, endDate }) => {
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  };

  onFocusChange = calanderFocused => {
    this.setState(() => ({ calanderFocused }));
  };

  onTextChange = e => {
    this.props.setTextFilter({ text: e.target.value });
  };

  onSelectChange = e => {
    if (e.target.value === "date") {
      this.props.sortByDate();
    } else if (e.target.value === "amount") {
      this.props.sortByAmount();
    }
  };

  render() {
    return (
      <div>
        <div className="floaty filter-overlay__pull" onClick={this.handlePullonClick}>
          <img src="/images/arrow.svg"></img>
        </div>
        <div className="filter-overlay">
          <input
            type="text"
            value={this.props.filters.text}
            onChange={this.onTextChange}
            placeholder="Search Expenses"
            className="filter-overlay__search"
          />
          <div className="filter-overlay__select">
            <select
              value={this.props.filters.sortBy}
              onChange={this.onSelectChange}
              className=""
            >
              <option value="date">Date</option>
              <option value="amount">Amount</option>
            </select>
          </div>

          <DateRangePicker
            startDate={this.props.filters.startDate}
            endDate={this.props.filters.endDate}
            onDatesChange={this.onDatesChange}
            focusedInput={this.state.calanderFocused}
            onFocusChange={this.onFocusChange}
            numberOfMonths={1}
            isOutsideRange={() => false}
            showClearDates={true}
          />
        </div>
        
      </div>
    );
  }
}

const mapStateToProps = state => ({
  filters: state.filters
});

const mapDispatchToProps = dispatch => ({
  setTextFilter: text => dispatch(setTextFilter(text)),
  sortByAmount: () => dispatch(sortByAmount()),
  sortByDate: () => dispatch(sortByDate()),
  setStartDate: startDate => dispatch(setStartDate(startDate)),
  setEndDate: endDate => dispatch(setEndDate(endDate))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpenseListFilters);
