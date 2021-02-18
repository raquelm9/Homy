import React from "react";
import Button from "@material-ui/core/Button";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
// import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";

export default function FilterTypeFormDialog(props) {
  const [open, setOpen] = React.useState(false);
  let [queryArray, setqueryArray] = React.useState(
    props.queryArray.map((q) => ({ ...q }))
  );
  let [localQueryArray, setLocalQueryArray] = React.useState(
    queryArray.map((q) => ({ ...q }))
  );

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
    dialogButton: {
      margin: "0px 5px",
      borderWidth: "1px",
      borderStyle: "solid",
      borderRadius: "16",
      color: "rgb(234,180,0)",
      borderColor: "rgb(234,180,0)",
      textTransform: "capitalize",
      backgroundColor: "black",
      "&:hover": { backgroundColor: "rgb(221,226,231)" },
      fontSize: "1rem",
    },
  }));

  const classes = useStyles();

  // handle check box click
  const handleChange = (event) => {
    console.log("target : ", event.target);
    const index = parseInt(event.target.name);
    const tempQueryArray = [...localQueryArray];
    tempQueryArray[index].selected = event.target.checked;
    setLocalQueryArray([...tempQueryArray]);
  };

  // Checkboxes component
  const CheckBoxComponents = () => {
    const checkBoxComponents = localQueryArray.map((query) => (
      <FormControlLabel
        control={
          <Checkbox
            checked={query.selected}
            onChange={handleChange}
            name={`${localQueryArray.indexOf(query)}`}
          />
        }
        label={`${query.label}`}
        key={`${localQueryArray.indexOf(query)}`}
      />
    ));
    return <>{checkBoxComponents}</>;
  };

  // handle Filter button, it opens the filter dialog modal
  const handleFilterButton = () => {
    setOpen(true);
  };

  // Filter button component
  const FilterButton = () => {
    let selectAll = true;
    localQueryArray.forEach((element) => {
      selectAll = selectAll && element.selected;
    });
    // console.log("selectAll : ", selectAll)
    return (
      <Button
        className={classes.dialogButton}
        variant="contained"
        size="medium"
        color="primary"
        onClick={handleFilterButton}
        endIcon={selectAll ? null : <CheckCircleOutlineIcon />}
      >
        Filter By {props.queryLabel}
      </Button>
    );
  };

  // handle Cancle Button
  const handleCancelButton = () => {
    setLocalQueryArray(queryArray.map((q) => ({ ...q })));
    props.onSelectQuery(queryArray);
    setOpen(false);
  };

  // Cancel button component
  const CancelButton = () => {
    return (
      <Button
        className={classes.dialogButton}
        onClick={handleCancelButton}
        color="primary"
      >
        Cancel
      </Button>
    );
  };

  // handle Continue button
  const handleContinueButton = () => {
    setqueryArray((queryArray = localQueryArray.map((q) => ({ ...q }))));
    props.onSelectQuery(localQueryArray.map((q) => ({ ...q })));
    setOpen(false);
  };

  // Continue button component
  const ContinueButton = () => {
    return (
      <Button
        className={classes.dialogButton}
        onClick={handleContinueButton}
        color="primary"
      >
        Continue
      </Button>
    );
  };

  // set checkboxes to either all checked or all cleared
  const setCheckBoxesTo = (status) => {
    let tempQueryArray = [...localQueryArray];
    tempQueryArray.forEach((query) => {
      query.selected = status;
    });
    setLocalQueryArray(tempQueryArray);
  };

  // Clear check boxes button component
  const ClearAllButton = () => {
    return (
      <Button
        className={classes.dialogButton}
        onClick={() => setCheckBoxesTo(false)}
        color="primary"
      >
        Clear All
      </Button>
    );
  };

  // Set check boxes button component
  const SelectAllButton = () => {
    return (
      <Button
        className={classes.dialogButton}
        onClick={() => setCheckBoxesTo(true)}
        color="primary"
      >
        Select All
      </Button>
    );
  };

  return (
    <div>
      <FilterButton />
      <Dialog
        maxWidth="sm"
        fullWidth={true}
        open={open}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Select {props.queryLabel}{" "}
        </DialogTitle>
        <Divider className={classes.dialogDivider} />
        <DialogContent>
          <FormGroup>
            <CheckBoxComponents />
          </FormGroup>
        </DialogContent>
        <Divider className={classes.dialogDivider} />
        <DialogActions>
          <div style={{ width: "100%" }}>
            <Box
              display="flex"
              justifyContent="space-between"
              m={1}
              p={1}
              bgcolor="backgound.paper"
            >
              <div>
                <ClearAllButton />
                <SelectAllButton />
              </div>
              <div>
                <CancelButton />
                <ContinueButton />
              </div>
            </Box>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}
