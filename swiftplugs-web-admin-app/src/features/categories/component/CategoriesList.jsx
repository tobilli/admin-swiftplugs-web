import React, { useCallback, useEffect, useState } from 'react';
import "../style/categories.scss";
import { Input, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from 'semantic-ui-react';
import editIcon from "../../../images/editIcon.png";
import deleteIcon from "../../../images/deleteIcon.png";
import { useDeleteCategoryMutation } from '../services/categoriesApi';
import toaster from '../../../common/utils/toaster';

function CategoriesList({ languages, categoryList, refetch }) {
  const langs = languages("category");
  const [filteredData, setFilteredData] = useState([])
  const [deleteCat, deleteCatProps] = useDeleteCategoryMutation()
  const [page, setPage] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const pageNo = 15;

  useEffect(() => {
    if (categoryList) {
      const details = [...categoryList];
      setFilteredData(
        details.filter((item, index) => {
          return (index >= page * pageNo) & (index < (page + 1) * pageNo);
        })
      )
    }
  }, [categoryList, page])

  const onDeleteCategory = async (details) => {
    const payload = {
      id: details?.id
    };
    try {
      const response = await deleteCat(payload).unwrap();
      toaster("success", {
        content: response?.data.message
      })
      refetch();
    } catch (error) {
      toaster("error", {
        content: error?.data?.message
      })
    }
  }

  const tableHeader = [{ name: langs.categoryName, id: "1", key: "name" }, { name: langs.subCategoriesName, id: "2", key: "subCategories" }, { name: langs.action, id: "3", key: "action" },];

  const handleSearchValue = useCallback(({ target: { value } }) => {
    setSearchValue(value);
    const filterParams = [
      "name",
    ];
    if (value.length > 0) {
      const searchTerm = value.toLocaleLowerCase();
      // Filter clients based on search term
      const filterCategory = categoryList?.filter((client) =>
        filterParams.some((prop) =>
          client[prop]?.toString()?.toLocaleLowerCase().includes(searchTerm)
        )
      );
      setFilteredData(
        filterCategory.filter((item, index) => {
          return index >= page * pageNo && index < (page + 1) * pageNo;
        })
      );
    } else {
      const details = [...categoryList];
      setFilteredData(
        details.filter((item, index) => {
          return index >= page * pageNo && index < (page + 1) * pageNo;
        })
      );
    }
  }, [categoryList, page, pageNo]);


  return (
    <div className='category_list'>
      {categoryList ? <div>
        <p>{langs.categoryList}</p>
        <div>
          <div className='search_field'>
            <Input icon='search' placeholder='Category Name' style={{ width: "350px" }} value={searchValue} onChange={handleSearchValue} />
          </div>
        </div>
        <Table basic='very' style={{ marginTop: "50px", tableLayout: "fixed", borderWidth:"4px"}}>
          <TableHeader>
            <TableRow>
              {tableHeader.map((title) => (
                <TableHeaderCell key={title.id} style={title.id !== "2" ? { width: "6rem" } : { width: "15rem" }}>
                  {title.name}
                </TableHeaderCell>
              ))}
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          {filteredData.length ? (
            <TableBody >
              {filteredData.map((details, indx) => (
                <TableRow key={indx} className='row'>
                  {tableHeader.map((header, index) => (
                    <TableCell key={index} textAlign='left'>
                      {Array.isArray(header.key)
                        ? header.key.map((key) => details[key]).join(" ")
                        : header.key === "accountID" ? (
                          <span style={{ cursor: "pointer" }} onClick={() => selectedDetail(details)}>
                            {details[header.key]}
                          </span>
                        ) : header.key === "subCategories" ? (
                          <div className='sub_cat'>
                            {details[header.key]?.map((sub, idx) => (
                              <div className="sub">
                                <p key={idx}>
                                  {sub.name}
                                </p>
                              </div>

                            ))}
                          </div>
                        ) : header.key === "action" ? (
                          <div className='action'>
                            <img src={editIcon} alt='editIcon' width={20} height={20} onClick={() => { }} style={{ cursor: "pointer" }} />
                            <img src={deleteIcon} alt='deleteIcon' width={20} height={20} onClick={() => onDeleteCategory(details)} style={{ cursor: "pointer" }} />
                          </div>
                        ) : (
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
        </Table>
      </div> : <div>

      </div>}

    </div>
  )
}

export default CategoriesList