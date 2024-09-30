import React from 'react'

const Exports = () => {
  
  // const getPnLSegmentZip = async (payload) => {
  //   setIsPnLZipLoading(true);
  //   toast.success("P&L files ZIP are being downloaded...");

  //   try {
  //     const requestPayload = {
  //       client_code: clientCode,
  //       type: "all",
  //       year: payload.year,
  //       download_type: "all",
  //     };


  //     const response = await downloadPnLSegments(requestPayload);
  //     console.log("response", response);
  //     const file_name = `${clientCode?.toUpperCase()}_PNL.zip`;
  //     downloadFile(response.data, file_name);
  //     toast.success("P&L files downloaded successfully");
  //   } catch (error) {
  //     console.error(`Report - PnLZipDownloads - Error::`, error);

  //     handleError(error);
  //   } finally {
  //     setIsPnLZipLoading(false);
  //   }
  // };

//   export const downloadFile = (data, filename) => {
//     const url = window.URL.createObjectURL(data);

//     const link = document.createElement('a');
//     link.href = url;
//     link.setAttribute('download', filename);

//     document.body.appendChild(link);
//     link.click();

//     link.parentNode.removeChild(link);
// };


// export const downloadPnLSegments = async (payload) => {
//   const config = {
//     headers: getHeaders(),
//     responseType: "blob",
//   };

//   const url = `${ACCOUNT_URL}/v1/user/report/pnl?source=connect`;
//   const response = await axios.post(url, payload, config);
//   return response;
// };


  return (
    <div>  
      {/* <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
    <DownloadFiles file={file} onClick={handleDownload} />
  </Grid> */}
  </div>
  )
}

export default Exports  