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
}) => {
  return (
    <div>
      <Table
        dataSource={data}
        columns={columns}
        loading={loading}
        rowKey={rowKey}
        pagination={false}
        scroll={{ x: true }}
      />
      <Pagination
        onChange={setParams}
        showPrevNextJumpers
        showTotal={totalElements}
        showSizeChanger
        defaultCurrent={params.page}
        total={totalElements}
        defaultPageSize={params.size}
        pageSize={params.size}
        current={params.page}
      />
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
};

export default TablePagination;
