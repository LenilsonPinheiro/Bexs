const PriorityQueue = require('./PriorityQueue');

//class graph matriz adjacent....
module.exports = class Graph {
  constructor() {
    this.points = [];
    this.listAdjacentPoints = {};
  }

  addStartingPoints(point) {
    this.points.push(point);
    this.listAdjacentPoints[point] = [];
  };

  addDestinationPoint(point1, point2, amount) {
    this.listAdjacentPoints[point1].push({point: point2, amount: amount});
    this.listAdjacentPoints[point2].push({point: point1, amount: amount});
  };

  findBestPrice(startNode, endNode) {
    const times = {};
    const backtrace = {};
    const pq = new PriorityQueue();

    times[startNode] = 0;

    this.points.forEach((point) => {
      if (point !== startNode) {
        times[point] = Infinity;
      }
    });

    pq.enqueue([startNode, 0]);

    while (!pq.isEmpty()) {
      const shortestStep = pq.dequeue();
      const currentNode = shortestStep[0];
      this.listAdjacentPoints[currentNode].forEach((neighbor) => {
        const time = times[currentNode] + neighbor.amount;

        if (time < times[neighbor.point]) {
          times[neighbor.point] = time;
          backtrace[neighbor.point] = currentNode;
          pq.enqueue([neighbor.point, time]);
        }
      });
    }

    const path = [endNode];
    let lastStep = endNode;

    while (lastStep !== startNode) {
      path.unshift(backtrace[lastStep]);
      lastStep = backtrace[lastStep];
    }

    return {bestRoute: path, price: times[endNode]};
  };
};
