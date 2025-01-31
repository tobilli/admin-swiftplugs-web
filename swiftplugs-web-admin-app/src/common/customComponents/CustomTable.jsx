import React from 'react';
import ReactPaginate from 'react-paginate';
import {
  TableRow,
  TableFooter,
  TableHeaderCell,
  TableHeader,
  TableCell,
  TableBody,
  Table,
  MenuItem,
  Menu,
  Icon,
} from 'semantic-ui-react';
import editIcon from "../../images/editIcon.png";

function CustomTable({ filteredData, tableHeader, setPage, totalPage, pageNo, setClientDetail, setShowDetails,setProductDetail,onOpenDetail,onOpenEdit }) {

  const selectedDetail = (details) => {
    setClientDetail(details);
    setShowDetails(true);
  }
  const amountBaseFormat = (amt, currencyCode ) => {
    const amount = amt.toLocaleString("en-US", {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return amount;
  };

  const amountFormat = (amt ) => {
    const amount = amt.toLocaleString("en-NG", {
       style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return amount;
  };

  const countryList = JSON.parse(sessionStorage.getItem('countryCode'));
  const categoryList = JSON.parse(localStorage.getItem('categories'));

  const categories = (id) => {
    for (let cat of categoryList) 
      { if (Number(cat.id) === Number(id)) { return cat.name; } 
    const subCat = cat.subCategories.find(sub => Number(sub.id) === Number(id) || Number(sub.parentId) === Number(id)); 
    if (subCat){ return subCat.name;}}
    return null;
  }

  const countries = (cty) => {
    const country = countryList.find((item) => item.code === cty);
    return country.country
  }

  const onOpenDetails=(details)=>{
    onOpenDetail();
    setProductDetail(details);
  }
  const onEditDetail =(details)=>{
    onOpenEdit();
    setProductDetail(details);
  }

  return (
    <Table striped className="ui striped table" style={{ marginTop: "20px", tableLayout: "fixed" }}>
      {/* Table Header */}
      <TableHeader>
        <TableRow>
          {tableHeader.map((title) => (
            <TableHeaderCell key={title.id} style={{ textAlign: "left", height: "60px" }}>
              {title.name}
            </TableHeaderCell>
          ))}
        </TableRow>
      </TableHeader>

      {/* Table Body */}
      {filteredData.length ? (
        <TableBody>
          {filteredData.map((details, indx) => (
            <TableRow key={indx}>
              {tableHeader.map((header, index) => (
                <TableCell key={index} style={{ textAlign: "left", minWidth: "120px", height: "60px" }}>
                  {Array.isArray(header.key)
                    ? header.key.map((key) => details[key]).join(" ")
                    : header.key === "accountID" ? (
                      <span style={{ cursor: "pointer" }} onClick={() => selectedDetail(details)}>
                        {details[header.key]}
                      </span>
                    ) : header.key === "status" ? (
                      <span className={details?.status === "Active" ? "active_status" : "suspended_status"}>
                        {details?.status === "Active" ? "Active" : "Inactive"}
                      </span>
                    ) : header.key === "subCategories" ? (
                      <div>
                        {details[header.key]?.map((sub, idx) => (
                          <p key={idx} className="sub">
                            {sub.name} {/* Display the name field of each subcategory */}
                          </p>
                        ))}
                      </div>
                    ) : header.key === "images" ? (<div>
                      <img src={import.meta.env.VITE_APP_BACKEND_SERVICE_API + details.images[0]} alt='image' width={80} height={80}/>
                    </div>) : header.key === "price" ? (<div>
                      {amountFormat(details[header.key])}
                    </div>) : header.key ==="name" ? (<div onClick={() => onOpenDetails(details)} style={{cursor:"pointer"}}>
                      <p>{details[header.key]}</p>
                    </div>)
                      : header.key === "countryCode" ? (<div>
                        {countries(details[header.key])}
                      </div>)
                        : header.key === "categoryId" ? (<div>
                          {categories(details[header.key])}
                        </div>)
                          : header.key === "action" ? (<div>
                             <img src={editIcon} alt='editIcon' width={20} height={20} onClick={() => onEditDetail(details)} style={{ cursor: "pointer" }} />
                          </div>)
                            : header.key === "basePrice" ? (<div>
                              {amountBaseFormat(
                               details[header.key],
                                countryList.find((curr) => curr.code === details.countryCode)?.currency
                              )}
                            </div>)
                              :
                              (
                                details[header.key]
                              )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      ) : (
        <TableBody>
          <TableRow>
            <TableCell colSpan={tableHeader.length} style={{ textAlign: "center", height: "400px" }}>
              Search not found
            </TableCell>
          </TableRow>
        </TableBody>
      )}

      {/* Table Footer */}
      <TableFooter>
        <TableRow>
          <TableHeaderCell colSpan={tableHeader.length}>
            <Menu floated="right" pagination>
              <ReactPaginate
                containerClassName="pagination"
                activeClassName="active"
                pageClassName="page-item"
                onPageChange={(e) => setPage(e.selected)}
                breakLabel="..."
                pageCount={Math.ceil(totalPage / pageNo)}
                previousLabel={
                  <Menu.Item as="a" icon className="previous">
                    <Icon name="chevron left" />
                    <span>Previous</span>
                  </Menu.Item>
                }
                nextLabel={
                  <Menu.Item as="a" icon className="next">
                    <span>Next</span>
                    <Icon name="chevron right" />
                  </Menu.Item>
                }
              />
            </Menu>
          </TableHeaderCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}

export default CustomTable