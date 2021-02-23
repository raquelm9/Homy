import { useState, useEffect } from "react";
import MngrEachService from "../MngrEachService/MngrEachService";
import HttpService from "../../services/http-service";
import FilterModal from "../FilterModal/FilterModal";
import {
  NEW,
  VIEWED,
  INPROGRESS,
  DONE,
  VERIFIED,
  ARCHIVED,
  statusTEXT,
} from "../../constants/status";
// import "../DetailModal/DetailModal.css";

import { table } from "react-bootstrap";

function MngrRequestList() {
  const [requests, setRequests] = useState([]);
  const [allRequests, setAllRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  let [typeQuery, setTypeQuery] = useState([
    {
      label: "ELECTRICAL",
      value: "ELECTRICAL",
      selected: true,
    },
    {
      label: "WATER",
      value: "WATER",
      selected: true,
    },
    {
      label: "COMPLAINTS",
      value: "COMPLAINTS",
      selected: true,
    },
    {
      label: "PLUMBING",
      value: "PLUMBING",
      selected: true,
    },
    {
      label: "DOORS OR LOCKS",
      value: "DOORS OR LOCKS",
      selected: true,
    },
    {
      label: "APPLIANCES",
      value: "APPLIANCES",
      selected: true,
    },
    {
      label: "COMMON AREA",
      value: "COMMON AREA",
      selected: true,
    },
    {
      label: "OTHER",
      value: "OTHER",
      selected: true,
    },
  ]);

  let [statusQuery, setStatusQuery] = useState([
    {
      value: NEW,
      label: statusTEXT[NEW],
      selected: true,
    },
    {
      value: VIEWED,
      label: statusTEXT[VIEWED],
      selected: true,
    },
    {
      value: INPROGRESS,
      label: statusTEXT[INPROGRESS],
      selected: true,
    },
    {
      value: DONE,
      label: statusTEXT[DONE],
      selected: true,
    },
    {
      value: VERIFIED,
      label: statusTEXT[VERIFIED],
      selected: true,
    },
  ]);

  useEffect(() => {
    // loadData();
    loadAllData();
    // console.log("useEffect with loadAllData fires");
  }, []);

  // useEffect(() => {
  //   console.warn("REQUEST LIST HAS CHANGED");
  // }, [allRequests]);

  // const loadData = () => {
  // new HttpService().getRequests().then(
  //   (data) => {
  //     setRequests(data);
  //   },
  //   (err) => {}
  // );
  // };

  const loadAllData = () => {
    new HttpService().getAllServiceRequests().then(
      (data) => {
        sortManagerList(data);
        setAllRequests(data); // save all requests in allRequests state variables
        // console.log("data : ", data)
        filterRequestList(data);
      },
      (err) => {}
    );
  };

  const sortManagerList = (data) => {
    data.sort((a, b) => (a.status > b.status ? 1 : -1));
    setAllRequests(data);
  };

  function filterRequestListByType(requestList) {
    // console.log("on entering filterRequestListByType, requestList : ", requestList);
    const queryArray = typeQuery
      .filter((query) => {
        return query.selected;
      })
      .map((query) => {
        return query.value;
      });
    // console.log("In filterRequestListByType, local queryArray : ", queryArray);

    const filteredData = requestList.filter((request) => {
      return queryArray.includes(request.type);
    });
    // console.log("on leaving filterRequestListByType, filteredData : ", filteredData);
    return filteredData;
  }

  function filterRequestListByStatus(requestList) {
    // console.log("on entering filterRequestByStatus, requestList : ", requestList);
    const queryArray = statusQuery
      .filter((query) => {
        return query.selected;
      })
      .map((query) => {
        return query.value;
      });
    const filteredData = requestList.filter((request) => {
      return queryArray.includes(request.status);
    });
    return filteredData;
  }

  function filterRequestList(requestList) {
    // console.log("On entering filterRequestList, filteredRequests : ", filteredRequests);

    let filteredData = filterRequestListByType(requestList);
    filteredData = filterRequestListByStatus(filteredData);
    // console.log("After finishing applying filters, requestList : ", requestList);
    setFilteredRequests(filteredData);

    // console.log("On leaving filterRequestList, filteredRequest : ", filteredRequests);
  }

  function updateRequestListByType(updatedQuery) {
    setTypeQuery((typeQuery = updatedQuery.map((q) => ({ ...q }))));
    filterRequestList(allRequests);
  }

  function updateRequestListByStatus(updatedQuery) {
    setStatusQuery(
      (statusQuery = updatedQuery.map((q) => {
        const value = updatedQuery.indexOf(q);
        return { value, selected: q.selected };
      }))
    );
    // console.log("On leaving updateRequestListByStatus, statusQuery : ", statusQuery);
    filterRequestList(allRequests);
  }

  let dateQuery = {
    startDate: new Date("January 01, 2000 00:00:00"),
    endDate: new Date(Date.now()),
  };

  // console.log("Start date : ", dateQuery.startDate);
  // console.log("End date : ", dateQuery.endDate);

  function filterRequestByDate(requestList) {
    const filteredData = requestList.filter(function (request) {
      // console.log("Request Date : ", request.date);
      // console.log("dateQuery.starDate : ", dateQuery.startDate);
      // console.log("request.date >= dataQuery.startDate", (request.date >= dateQuery.startDate))
      return (
        request.date >= dateQuery.startDate && request.date <= dateQuery.endDate
      );
    });
    return filteredData;
  }

  // const filteredManagerList = (data) => {
  //   const localData = filterRequestByStatus(filterRequestByType(data));
  // const localData = filterRequestByStatus(filterRequestByType(data));
  // Date filtering is not implemented by commenting out the code below
  // const localData = filterRequestByDate(filterRequestByType(data));
  // console.log('ELECTRICAL filtered request list : ', localData);
  //   setFilteredRequests(localData);
  // }

  const listOfServices = (service, i) => {
    return (
      <MngrEachService
        id={service._id}
        key={service._id}
        requestNumber={i}
        type={service.type}
        subject={service.subject}
        status={service.status}
        date={service.date}
        image={service.image}
        unit_num={service.unit_num}
        resident_name={service.resident_name}
        description={service.description}
        comments={service.comments}
        onItemStatusChange={loadAllData}
      />
    );
  };

  return (
    <div>
      <h2>Service Requests</h2>
      <div style={{ display: "flex" }}>
        <FilterModal
          queryLabel={"Type"}
          queryArray={typeQuery}
          onSelectQuery={updateRequestListByType}
        />
        <FilterModal
          queryLabel={"Status"}
          queryArray={statusQuery}
          onSelectQuery={updateRequestListByStatus}
        />
      </div>
      <div className="table-responsive">
        <table className="table table-stripped table-hover table-condensed ">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Date</th>
              <th scope="col">Type</th>
              <th scope="col">Subject</th>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>{filteredRequests.map(listOfServices)}</tbody>
          {/* <tbody>{allRequests.map(listOfServices)}</tbody> */}
        </table>
      </div>
    </div>
  );
}

export default MngrRequestList;
