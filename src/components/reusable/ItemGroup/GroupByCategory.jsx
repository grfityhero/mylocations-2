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
          <div className=""> Group&nbsp;
            <i className="fa fa-check" aria-hidden="true"></i>
            
          </div>
        ) : (
          <div className="">Group&nbsp;
          
          </div>
        )}
      </div>
    </div>
  )
}

export default GroupByCategory
