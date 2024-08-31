import * as echarts from "echarts";
import { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";

const calc3n1 = (startNumber: number) => {
  const data: number[] = [];

  let n = startNumber;
  while (n !== 1) {
    data.push(n);
    n = n % 2 === 0 ? n / 2 : n * 3 + 1;
  }
  data.push(1);
  return data;
};

const calcAndReturn3n1 = (startNumber: number): Promise<number[]> => {
  return new Promise((resolve) => {
    resolve(calc3n1(startNumber));
  });
};

function App() {
  const chartDom = useRef(null);
  const myChart = useRef<echarts.ECharts | null>(null);
  const [value, setValue] = useState({
    v1: 100,
    v2: 200,
    v3: 300,
    v4: 400,
  });

  useEffect(() => {
    const chart = echarts.init(chartDom.current);
    myChart.current = chart;

    return () => {
      myChart.current?.dispose();
    };
  }, []);

  const start = async () => {
    const data1 = await calcAndReturn3n1(value.v1);
    const data2 = await calcAndReturn3n1(value.v2);
    const data3 = await calcAndReturn3n1(value.v3);
    const data4 = await calcAndReturn3n1(value.v4);

    myChart.current?.dispose();

    const chart = echarts.init(chartDom.current);
    myChart.current = chart;

    const option = {
      tooltip: {},
      xAxis: {
        type: "category",
        boundaryGap: false,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: data1,
          type: "line",
          endLabel: {
            show: true,
          },
          animationDuration: data1.length * 100,
        },
        {
          data: data2,
          type: "line",
          endLabel: {
            show: true,
          },
          animationDuration: data2.length * 100,
        },
        {
          data: data3,
          type: "line",
          endLabel: {
            show: true,
          },
          animationDuration: data3.length * 100,
        },
        {
          data: data4,
          type: "line",
          endLabel: {
            show: true,
          },
          animationDuration: data4.length * 100,
        },
      ],
    };
    if (myChart.current) {
      myChart.current.setOption(option);
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="absolute right-5 top-5 z-50">
        <Card className="max-w-sm shadow-lg">
          <CardHeader>
            <h1 className="text-2xl font-bold">3n+1 Problem</h1>
            <CardDescription>
              Hi! I'm Temitope. I created this app to help you visualize the
              3n+1 problem. Enter a number and click start. Enjoy!
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="number"
                value={value.v1}
                onChange={(e) => {
                  setValue({ ...value, v1: parseInt(e.target.value) });
                }}
              />
              <Input
                type="number"
                value={value.v2}
                onChange={(e) => {
                  setValue({ ...value, v2: parseInt(e.target.value) });
                }}
              />
              <Input
                type="number"
                value={value.v3}
                onChange={(e) => {
                  setValue({ ...value, v3: parseInt(e.target.value) });
                }}
              />
              <Input
                type="number"
                value={value.v4}
                onChange={(e) => {
                  setValue({ ...value, v4: parseInt(e.target.value) });
                }}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={start}>
              Start
            </Button>
          </CardFooter>
        </Card>
      </div>
      <div ref={chartDom} className="h-screen w-full"></div>;
    </div>
  );
}

export default App;
