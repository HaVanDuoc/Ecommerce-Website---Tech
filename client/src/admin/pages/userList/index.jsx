import "./userList.css";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { DataGrid } from "@mui/x-data-grid";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import { FetchUserList } from "~/helper/fetch";
import axios from "axios";
import { FormatFullName } from "~/helper/format";
import { ButtonCreate, StackButtons } from "~/admin/Styled";

export default function UserList() {
  const [data, setData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [userDelete, setUserDelete] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };

  // Fetch list user
  const response = FetchUserList();
  React.useEffect(() => {
    setData(response);
  }, [response]);
  //

  const handleDelete = (userId, firstName, middleName, lastName) => {
    setOpen(true);
    setUserDelete({
      userId,
      fullName: FormatFullName(firstName, middleName, lastName),
    }); // Transmission userId and fullName for Alert
  };

  const handleAgreeDelete = (userId) => {
    setTimeout(async () => {
      const response = await axios({
        method: "delete",
        url: `/admin/user/${userId}`,
      });

      if (response.data.err === 0) {
        setData(data.filter((item) => item.userId !== userId));
        handleClose(); // Close Delete Box
      }
    }, 1500);
  };

  const columns = [
    { field: "userId", headerName: "ID", width: 110 },
    {
      field: "user",
      headerName: "Name",
      width: 250,
      renderCell: (params) => {
        const firstName = params.row.firstName ? params.row.firstName : "";
        const middleName = params.row.middleName ? params.row.middleName : "";
        const lastName = params.row.lastName ? params.row.lastName : "";
        return (
          <div className="userListUser">
            <Avatar
              alt="avatar"
              src={params.row.avatar}
              className="userListImg"
            />
            {firstName + " " + middleName + " " + lastName}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 180 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "transactionVolume",
      headerName: "Transaction Volume",
      width: 200,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/admin/user/update/" + params.row.userId}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutlineIcon
              className="userListDelete"
              onClick={() =>
                handleDelete(
                  params.row.userId,
                  params.row.firstName,
                  params.row.middleName,
                  params.row.lastName
                )
              }
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <StackButtons>
        <ButtonCreate href="/admin/user/newUser" />
      </StackButtons>

      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={10}
        checkboxSelection
        autoHeight
      />

      {/* Dialog Delete Box */}
      {open && (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"B???n ch???c ch???n mu???n x??a?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Ng?????i d??ng{" "}
              <Typography variant="span" fontWeight={600}>
                {userDelete.fullName}
              </Typography>{" "}
              c?? ID{" "}
              <Typography variant="span" fontWeight={600}>
                {userDelete.userId}
              </Typography>{" "}
              s??? ???????c lo???i b???..!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>H???y</Button>
            <Button
              onClick={() => handleAgreeDelete(userDelete.userId)}
              autoFocus
            >
              X??a
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}
