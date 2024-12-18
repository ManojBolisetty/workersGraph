import { Button, Table } from "antd";
import BarChartComp from "./componenets/chart";
import WorkerForm from "./componenets/workerForm";
import { useEffect, useRef, useState } from "react";

const App = () => {
  const tempData = [
    {
      name: "AXA",
      start: 0,
      range: 10,
      portion: 100,
      fill: "#00bfff",
      key: 1,
    },
    {
      name: "AIG",
      start: 10,
      range: 15,
      portion: 100,
      fill: "#007bff",
      key: 2,
    },
    {
      name: "Zurich",
      start: 25,
      range: 20,
      portion: 50,
      fill: "#ffc107",
      key: 3,
    },
    {
      name: "Allianz",
      start: 25,
      range: 20,
      portion: 50,
      fill: "#fff",
      key: 4,
    },
  ];
  const [workerData, setWorkersData] = useState(tempData);
  const [transformedData, setTransformedData] = useState([]);
  const workerFormRef = useRef();
  useEffect(() => {
    setTransformedData(transformData(workerData));
  }, []);

  const transformData = (data) => {
    let max_range = Math.max(...data.map((key) => key.start + key.range));
    let transformedData = Array.from({ length: max_range }, (_, i) => ({
      layer: i + 1,
    }));

    data.map((key) => {
      const name = key.name ?? "";
      for (let i = key.start; i < key.start + key.range; i++) {
        if (!transformedData[i]) transformedData[i] = { layer: i + 1 };
        transformedData[i][name] = key.portion ?? 0;
      }
    });

    return transformedData;
  };

  const cols = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Layer",
      dataIndex: "start",
      key: "start",
      render: (text, record) => (
        <div>
          {record.start}M XS {record.range}M
        </div>
      ),
    },
    {
      title: "Portion",
      dataIndex: "portion",
      key: "portion",
    },
    {
      title: "Color",
      dataIndex: "fill",
      key: "fill",
      render: (text, record) => (
        <div
          style={{
            backgroundColor: record.fill,
            width: "20px",
            height: "20px",
          }}
        ></div>
      ),
    },
  ];
  const addNewWorker = (values) => {
    let newWorker = {
      name: values.name,
      start: parseFloat(values.start ?? 0),
      range: parseFloat(values.range ?? 10),
      portion: parseFloat(values.portion ?? 10),
      fill: values.fill ?? "#000",
      key: workerData.length + 1,
    };
    setWorkersData([...workerData, newWorker]);
    setTransformedData(transformData([...workerData, newWorker]));
  };

  return (
    <>
      <Table
        dataSource={workerData}
        columns={cols}
        pagination={false}
        className="min-w-96 m-5"
        size="small"
        footer={() => (
          <div className="">
            <button
              className="bg-white px-2 py-1 text-black rounded-lg text-sm my-2"
              onClick={() => {
                workerFormRef.current.showModal();
              }}
            >
              Add Row
            </button>
          </div>
        )}
      />
      <BarChartComp data={transformedData} workerData={workerData} />
      <WorkerForm ref={workerFormRef} addNewWorker={addNewWorker} />
    </>
  );
};

export default App;
