import React from "react"
import "./GroupByCategory.scss"

function GroupByCategory({ setGroupByCategory, groupByCategory }) {
  return (
    <div>
      <div
        onClick={() => setGroupByCategory(!groupByCategory)}
        className="div-group"
      >
        {groupByCategory ? (
          <div className="">
            <i className="fa fa-check" aria-hidden="true"></i>&nbsp; Grouped By
            Category
          </div>
        ) : (
          <div className="">
            <i className="fa fa-ban" aria-hidden="true"></i>&nbsp; Ungrouped.
          </div>
        )}
      </div>
    </div>
  )
}

export default GroupByCategory
