import { Pagination, Table } from "antd";
import PropTypes from "prop-types";

const TablePagination = ({
  data,
  columns,
  setParams,
  totalElements,
  params,
  loading = false,
  rowKey = "key",
  clientSearch = false,
}) => {
  return (
    <div>
      <Table
        dataSource={data}
        columns={columns}
        loading={loading}
        rowKey={rowKey}
        pagination={
          clientSearch
            ? {
                showPrevNextJumpers: true,
                showSizeChanger: true,
                onChange: (page, pageSize) => {
                  setParams(page, pageSize);
                },
              }
            : false
        }
      />
      {!clientSearch && (
        <div className="d-flex justify-content-end">
          <Pagination
            showPrevNextJumpers
            showSizeChanger
            onChange={setParams}
            defaultCurrent={params.page}
            total={totalElements}
            defaultPageSize={params.size}
            pageSize={params.size}
            current={params.page}
          />
        </div>
      )}
    </div>
  );
};
TablePagination.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  setParams: PropTypes.func.isRequired,
  totalElements: PropTypes.number.isRequired,
  params: PropTypes.shape({
    page: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
  }).isRequired,
  loading: PropTypes.bool,
  rowKey: PropTypes.string,
  clientSearch: PropTypes.bool,
};

export default TablePagination;
