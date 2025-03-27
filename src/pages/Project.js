import {
  DislikeFilled,
  EyeFilled,
  ForwardOutlined,
  LikeFilled,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Pagination,
  Row,
  Table,
  Tag,
  Tooltip
} from "antd";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchAll, setParams } from "../stores/features/project/slice";
import { PROJECT_STATUS_MAPPING } from "../utils/mapping";
import AddContributorModal from "./components/AddContributorModal";
import CreateProjectModal from "./components/CreateProjectModal";

function Project() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const addRef = useRef();

  const history = useHistory();
  const dispatch = useDispatch();
  const { data, params, status, totalElements } = useSelector(
    (state) => state.project
  );
  console.log(data, params, status, totalElements)
  const handleChangePagination = (page, pageSize) => {
    dispatch(setParams({ page: page - 1, size: pageSize }));
  };

  const onClose = () => {
    setIsModalOpen(false);
  };

  const handleCreateNewProject = () => {
    setIsModalOpen(true);
  };
  const handleAccept = (id) => () => {
   
  };
  const handleReject = (id) => () => {
    
  };
  const handleRelease = (id) => () => {
   
  };

  const columns = [
    {
      title: "Action",
      key: "action",
      width: "200px",
      fixed: true,
      render: (_, record) => (
        <div className="d-flex justify-content-center gap-2">
          <div>
            <Tooltip title="View Detail">
              <EyeFilled
                onClick={() => {
                  history.push(`/project/${record.id}`);
                }}
              />
            </Tooltip>
          </div>
          <div>
            <Tooltip title="Approve">
              <LikeFilled onClick={handleAccept(record.id)} />{" "}
            </Tooltip>
          </div>
          <div>
            <Tooltip title="Reject">
              {" "}
              <DislikeFilled onClick={handleReject(record.id)} />{" "}
            </Tooltip>
          </div>
          <div>
            <Tooltip title="Release">
              <ForwardOutlined onClick={handleRelease(record.id)} />
            </Tooltip>
          </div>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const { text, color } = PROJECT_STATUS_MAPPING[status] || {
          text: "Unknown",
          color: "gray",
        };
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
    },

    {
      title: "Blockchain ID",
      dataIndex: "blockchainId",
      key: "blockchainId",
    },
    {
      title: "CID",
      dataIndex: "cid",
      key: "cid",
    },
    {
      title: "Token Address",
      dataIndex: "tokenAddress",
      key: "tokenAddress",
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (totalAmount) => totalAmount / 1e18,
    },
    {
      title: "Pool Address",
      dataIndex: "poolAddress",
      key: "poolAddress",
    },
    {
      title: "Owner",
      dataIndex: "owner",
      key: "owner",
    },
    // {
    //   title: "Accept Off Chain",
    //   dataIndex: "acceptOffChain",
    //   key: "acceptOffChain",
    //   render: (acceptOffChain) => (acceptOffChain ? "Yes" : "No"),
    // },
    // {
    //   title: "Reject Off Chain",
    //   dataIndex: "rejectOffChain",
    //   key: "rejectOffChain",
    //   render: (rejectOffChain) => (rejectOffChain ? "Yes" : "No"),
    // },
    // {
    //   title: "Accept On Chain",
    //   dataIndex: "acceptOnChain",
    //   key: "acceptOnChain",
    //   render: (acceptOnChain) => (acceptOnChain ? "Yes" : "No"),
    // },
    // {
    //   title: "Reject On Chain",
    //   dataIndex: "rejectOnChain",
    //   key: "rejectOnChain",
    //   render: (rejectOnChain) => (rejectOnChain ? "Yes" : "No"),
    // },
    // {
    //   title: "Release Off Chain",
    //   dataIndex: "releaseOffChain",
    //   key: "releaseOffChain",
    //   render: (releaseOffChain) => (releaseOffChain ? "Yes" : "No"),
    // },
    // {
    //   title: "Release On Chain",
    //   dataIndex: "releaseOnChain",
    //   key: "releaseOnChain",
    //   render: (releaseOnChain) => (releaseOnChain ? "Yes" : "No"),
    // },
  ];

  useEffect(() => {
    dispatch(fetchAll());
    // const intervalRef = setInterval(() => {
    //   dispatch(search());
    // }, 1000);
    // return () => clearInterval(intervalRef);
  }, [dispatch]);

  return (
    <div className="tabled">
      <Row gutter={[24, 0]}>
        <Col xs={24} xl={24}>
          <Card
            bordered={false}
            className="criclebox tablespace p-15"
            title="Project manager"
          >
            <Row justify="end">
              <Col>
                <Button type="primary" onClick={handleCreateNewProject}>
                  Create new project
                </Button>
              </Col>
            </Row>
            <div className="table-responsive">
              <Table
                columns={columns}
                dataSource={data}
                loading={status === "loading"}
                pagination={false}
                className="ant-border-space"
              />
              <Pagination
                className="mt-2"
                current={params.page + 1}
                pageSize={params.size}
                total={totalElements}
                onChange={handleChangePagination}
                showSizeChanger
              />
            </div>
          </Card>
        </Col>
      </Row>
      <CreateProjectModal visible={isModalOpen} onClose={onClose} />
      <AddContributorModal ref={addRef} />
    </div>
  );
}

export default Project;
