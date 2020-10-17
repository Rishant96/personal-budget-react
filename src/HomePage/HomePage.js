import React, { useEffect } from "react";
import axios from "axios";
import { Chart } from "chart.js";

import * as d3 from "d3-selection";
import * as d3Scale from "d3-scale";
import * as d3Shape from "d3-shape";

function HomePage() {
  useEffect(() => {
    let dataSource = {
      datasets: [
        {
          data: [],
          backgroundColor: [
            "#ffcd56",
            "#ff6384",
            "#36a2eb",
            "#fd6b19",
            "#2Bf7f5",
            "#9b1365",
            "#23f225",
          ],
        },
      ],
      labels: [],
    };
    let secondData = [];

    let svg;
    const margin = 50;
    const width = 960;
    const height = 450;
    const radius = Math.min(width, height) / 2;

    let arc;
    let labelArc;
    let pie;
    let color;

    function initSvg() {
      color = d3Scale
        .scaleOrdinal()
        .range(dataSource.datasets[0].backgroundColor);
      arc = d3Shape
        .arc()
        .outerRadius(radius - 10)
        .innerRadius(0);
      labelArc = d3Shape
        .arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 40);
      pie = d3Shape
        .pie()
        .sort(null)
        .value((d) => d.budget);
      svg = d3
        .select("svg")
        .append("g")
        .attr(
          "transform",
          "translate(" + width / 2 + "," + height / 2 + ")"
        );
    }

    function drawPie() {
      let g = svg
        .selectAll('.arc')
        .data(pie(secondData))
        .enter()
        .append('g')
        .attr('class', 'arc');
      g.append('path')
        .attr('d', arc)
        .style('fill', (d) => color(d.data.title));
      g.append('text')
        .attr(
          'transform',
          (d) => 'translate(' + labelArc.centroid(d) + ')'
        )
        .attr('dy', '.35em')
        .text((d) => d.data.title);
    }

    const createChart = () => {
      const ctx = document.getElementById("myChart");
      const myPieChart = new Chart(ctx, {
        type: "pie",
        data: dataSource,
      });
    };

    axios.get("http://localhost:3200/budget").then((res) => {
      for (let i = 0; i < res.data.myBudget.length; i++) {
        dataSource.datasets[0].data[i] = res.data.myBudget[i].budget;
        dataSource.labels[i] = res.data.myBudget[i].title;
      }
      secondData = res.data.myBudget;

      createChart();

      initSvg();
      drawPie();
    });
  });

  return (
    <main className="center" id="main">
      <div className="page-area">
        <article>
          <h1>Stay on track</h1>
          <p>
            Do you know where you are spending your money? If you really stop to
            track it down, you would get surprised! Proper budget management
            depends on real data... and this app will help you with that!
          </p>
        </article>

        <article>
          <h1>Alerts</h1>
          <p>
            What if your clothing budget ended? You will get an alert. The goal
            is to never go over the budget.
          </p>
        </article>

        <article>
          <h1>Results</h1>
          <p>
            People who stick to a financial plan, budgeting every expense, get
            out of debt faster! Also, they to live happier lives... since they
            expend without guilt or fear... because they know it is all good and
            accounted for.
          </p>
        </article>

        <article>
          <h1>Free</h1>
          <p>This app is free!!! And you are the only one holding your data!</p>
        </article>

        <article>
          <h1>Stay on track</h1>
          <p>
            Do you know where you are spending your money? If you really stop to
            track it down, you would get surprised! Proper budget management
            depends on real data... and this app will help you with that!
          </p>
        </article>

        <article>
          <h1>Alerts</h1>
          <p>
            What if your clothing budget ended? You will get an alert. The goal
            is to never go over the budget.
          </p>
        </article>

        <article>
          <h1>Results</h1>
          <p>
            People who stick to a financial plan, budgeting every expense, get
            out of debt faster! Also, they to live happier lives... since they
            expend without guilt or fear... because they know it is all good and
            accounted for.
          </p>
        </article>

        <article>
          <h1>Chart</h1>
          <p>
            <canvas id="myChart" width="400" height="400"></canvas>
          </p>
        </article>
      </div>

      <svg width="960" height="500"></svg>
    </main>
  );
}

export default HomePage;
