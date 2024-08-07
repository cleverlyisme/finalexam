import { useState, useEffect } from "react";
import { Row, Col } from "reactstrap";
import Chart from "react-apexcharts";
import { toast } from "sonner";

import Block from "../common/Block";
import useAppContext from "../../hooks/useAppContext";
import { getCharts } from "../../services/admin.service";

const AdminChart = (props) => {
  const {
    loadingState: { setIsLoading },
  } = useAppContext();
  const [data, setData] = useState({});

  const loadData = async () => {
    setIsLoading(true);
    try {
      const response = await getCharts();
      const data = response.data;
      setData(data);
      console.log({ data });
    } catch (err) {
      toast.error(err?.response?.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const pieChart = data?.pieChart;
  const columnChart = data?.columnChart;

  const pieState = {
    series: pieChart ? Object.values(pieChart) : [],
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      legend: {
        position: "bottom",
      },
      labels: ["Khối 10", "Khối 11", "Khối 12"],
      responsive: [
        {
          breakpoint: 768,
          options: {
            chart: {
              width: 440,
            },
          },
        },
      ],
    },
  };
  const columnState = {
    series: [
      {
        name: "Học sinh giỏi",
        data: columnChart ? columnChart.map((item) => item.good) : [],
      },
      {
        name: "Học sinh tiên tiến",
        data: columnChart ? columnChart.map((item) => item.medium) : [],
      },
      {
        name: "Học sinh trung bình",
        data: columnChart ? columnChart.map((item) => item.bad) : [],
      },
      {
        name: "Học sinh yếu",
        data: columnChart ? columnChart.map((item) => item.veryBad) : [],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        stackType: "100%",
        toolbar: {
          show: false,
        },
      },
      responsive: [
        {
          breakpoint: 768,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      xaxis: {
        categories: columnChart ? columnChart.map((item) => item.time) : [],
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <Row>
      <Col md={6} className="mb-4">
        <Block
          title="Tỷ lệ học sinh các khối trong trường"
          icon="fas fa-chart-pie"
          height="400px"
        >
          {pieChart && (
            <div className="d-flex justify-content-center align-items-center h-100">
              <Chart
                options={pieState.options}
                series={pieState.series}
                type="pie"
                width={380}
              />
            </div>
          )}
        </Block>
      </Col>

      <Col md={6} className="mb-4">
        <Block
          title="Phân loại học sinh 6 học kỳ gần nhất"
          icon="fas fa-chart-bar"
          height="400px"
        >
          {columnChart && (
            <Chart
              options={columnState.options}
              series={columnState.series}
              type="bar"
              height={350}
            />
          )}
        </Block>
      </Col>
    </Row>
  );
};

export default AdminChart;
