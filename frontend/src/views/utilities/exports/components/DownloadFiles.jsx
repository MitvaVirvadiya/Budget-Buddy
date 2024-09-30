import React, { useState } from "react";

import { Box, Card, IconButton, Tooltip, Typography, CircularProgress  } from "@mui/material";
import { FaRegFilePdf, FaRegFileExcel } from "react-icons/fa";
// download react-icons

const DownloadFiles = ({ file, onClick, index }) => {
  const { label, name, pdf, excel, isLoading } = file;
  return (
    <Box>
      <Card
        sx={{
          width: "100%",
          backgroundColor: "#fff",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          transition: "box-shadow 0.3s ease-in-out",
          "&:hover": {
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.25)",
          },
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px 12px",
          }}
      
        >
          <Typography
            variant="h4"
            sx={{
              p:1,
              fontWeight: 500,
              flex: 1,
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {name}
          </Typography>
          
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "145px",
            transition: "background-color 0.3s",
            backgroundColor:"#e0e0e0" ,
            cursor: "pointer",
          }}
         
        >
          {!isLoading ? (
            <Box>
              {excel && (
                <Tooltip title="Download Excel" placement="top">
                  <IconButton onClick={() => onClick(label, "Excel")}>
                    <FaRegFileExcel style={{ fontSize: "30px", color: "#6aa84f" }} />
                  </IconButton>
                </Tooltip>
              )}
              {pdf && (
                <Tooltip title="Download PDF" placement="top">
                  <IconButton onClick={() => onClick(label, "PDF")}>
                    <FaRegFilePdf style={{ fontSize: "30px", color: "#cc0000" }} />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          ) : (
           <CircularProgress />
          )}
        </div>
      </Card>
    </Box>
  );
};

export default DownloadFiles;
