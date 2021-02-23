import { useState, useEffect } from "react";
import MngrEachService from "../MngrEachService/MngrEachService";
import HttpService from "../../services/http-service";
import FilterModal from "../FilterModal/FilterModal";
import AscendingIcon from "@material-ui/icons/ExpandLess";
import DescendingIcon from "@material-ui/icons/ExpandMore";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
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
  const Ascending = true;
  const Descending = false;
  let [sortArray, setSortArray] = useState([
    {
      label: "Status",
      key: "status",
      direction: Ascending,
      value: (a) => a,
    },
    {
      label: "Type",
      key: "type",
      direction: Ascending,
      value: (a) => a,
    },
    {
      label: "Date",
      key: "date",
      direction: Ascending,
      value: (a) => Date.parse(a),
    },
  ]);

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
    console.log("useEffect with loadAllData fires");
  }, []);

  useEffect(() => {
    console.warn("REQUEST LIST HAS CHANGED");
  }, [allRequests]);

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

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
    },
    formControl: {
      margin: theme.spacing(1),
    },
    dialogDivider: {
      margin: "0px 0px",
      borderWidth: "1px",
      borderStyle: "solid",
    },
    headingButton: {
      href: "#text-buttons",
      underline: "none",
      color: "black",
      size: "medium",
      variant: "text",
      padding: "0",
      textTransform: "capitalize",
      "&:hover": { backgroundColor: "rgb(221,226,231)" },
      "&:focus": { outline: "none" },
      fontSize: "1rem",
    },
  }));

  const classes = useStyles();

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

  // this function find the index of the sort key in the sortArray
  // by knowing the index, we can retrieve the key object in the array which contains the
  // sort button label, the key to sort in the request list object, the direction of sort and
  // the callback value function to process the comparison of the sort
  // the callback function is needed because the date in the requests collection is in string format
  function findKeyIndex(key, keyArray) {
    const isSortKey = (element) => element.key === key;
    const index = keyArray.findIndex(isSortKey);
    return index;
  }

  // this function sort the target array (request list) by the sort keyObject
  // such as date key object, type key object, etc..
  function sortRequestListBy(keyObject, targetArray) {
    const index = findKeyIndex(keyObject.key, targetArray);
    let tempArray = [...targetArray];

    const sortFunction = (a, b) => {
      const x = keyObject.value(a[keyObject.key]);
      const y = keyObject.value(b[keyObject.key]);
      if (x > y) {
        return 1;
      } else {
        return -1;
      }
    };

    tempArray.sort(sortFunction);
    if (keyObject.direction === Descending) {
      tempArray.reverse();
    }

    return tempArray;
  }

  // this function applies the all the sorting based on the entries
  // of sortArray, the index of the entries determines the hierarchy of the sorting
  function sortRequestList(keyArray, targetArray) {
    console.log("keyArray : ", keyArray);
    console.log("targetArray : ", targetArray);

    let tempArray = [...targetArray];
    console.log("tempArray : ", tempArray);

    keyArray.forEach((element) => {
      tempArray = sortRequestListBy(element, tempArray);
    });
    return tempArray;
  }

  // this is the event handler of the Heading Button of the request list
  // it also reverses the sorting direction with every click on the button
  function handleHeadingButton(sortKey) {
    const tempSortArray = [...sortArray];
    const index = findKeyIndex(sortKey, sortArray);
    const element = tempSortArray.splice(index, 1)[0];
    element.direction =
      element.direction === Ascending ? Descending : Ascending;
    tempSortArray.push(element);
    setSortArray((sortArray = [...tempSortArray]));

    const sortedArray = sortRequestList(sortArray, filteredRequests);
    setFilteredRequests([...sortedArray]);
  }

  // this is the HeadingButton react component
  const HeadingButton = (props) => {
    const index = findKeyIndex(props.sortKey, sortArray);
    return (
      <Button
        className={classes.headingButton}
        onClick={() => handleHeadingButton(props.sortKey)}
        endIcon={
          sortArray[index].direction ? <AscendingIcon /> : <DescendingIcon />
        }
      >
        {props.sortKey}
      </Button>
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
              <th scope="col">
                <HeadingButton sortKey="date" />
              </th>
              <th scope="col">
                <HeadingButton sortKey="type" />
              </th>
              <th scope="col">Subject</th>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col">
                <HeadingButton sortKey="status" />
              </th>
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
