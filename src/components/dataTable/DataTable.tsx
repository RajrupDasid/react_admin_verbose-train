import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import "./dataTable.scss";
import { Link } from "react-router-dom";
// import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  columns: GridColDef[];
  rows: object[];
  slug: string;
};

// TEST THE API

// const queryClient = useQueryClient();
// // const mutation = useMutation({
// //   mutationFn: (id: number) => {
// //     return fetch(`http://localhost:8800/api/${props.slug}/${id}`, {
// //       method: "delete",
// //     });
// //   },
// //   onSuccess: ()=>{
// //     queryClient.invalidateQueries([`all${props.slug}`]);
// //   }
// // });
const DataTable = (props: Props) => {
  const handleDelete = async (octaid: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/${props.slug}/delete`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ octaid }), // assuming the server expects the ID in this format
        }
      );

      if (response.ok) {
        alert("Delete");
        window.location.reload();
      } else {
        console.log("error 2");
      }
    } catch (error) {
      // Handle fetch errors here
      console.error("Error deleting item:", error);
    }
  };

  const actionColumn: GridColDef = {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="action">
          <Link to={`/${props.slug}/${params.row.octaid}`}>
            <img src="/view.svg" alt="editbutton" />
          </Link>
          <div
            className="delete"
            onClick={() => handleDelete(params.row.octaid)}>
            <img src="/delete.svg" alt="" />
          </div>
        </div>
      );
    },
  };

  return (
    <div className="dataTable">
      <DataGrid
        className="dataGrid"
        rows={props.rows}
        columns={[...props.columns, actionColumn]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[5]}
        // checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
      />
    </div>
  );
};

export default DataTable;
