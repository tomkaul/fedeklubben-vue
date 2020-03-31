//--------  PLOT STUFF  -----------------//
google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawBackgroundColor);

function drawBackgroundColor() {
  var data = new google.visualization.DataTable();
  data.addColumn('number', 'X');
  data.addColumn('number', 'Dogs');

  data.addRows([
    [0, 0],   [1, 10],  [2, 23],  [3, 17],  [4, 18],  [5, 9],
    [6, 11],  [7, 27],  [8, 33],  [9, 40],  [10, 32], [11, 35],
    [12, 30], [13, 40], [14, 42], [15, 47], [16, 44], [17, 48],
    [18, 52], [19, 54], [20, 42], [21, 55], [22, 56], [23, 57],
    [24, 60], [25, 50], [26, 52], [27, 51], [28, 49], [29, 53],
    [30, 55]
  ]);

  var options = {
    hAxis: {
      title: 'Uge nr.'
    },
    vAxis: {
      title: 'Vægt diff'
    },
    // backgroundColor: '#f1f8e9'
  };

  var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
  chart.draw(data, options);
}

//--------  TABLE STUFF  -----------------//
// Misc weight functions
function get_start_weight(key) {
  return data[key].start_weight.toFixed(1);
};
function get_current_weight(key) {
  return (data[key].data[data[key].data.length-1].y).toFixed(1);
};
function get_weight_loss(key) {
  return (data[key].start_weight - data[key].data[data[key].data.length-1].y).toFixed(1);
};

// Vue stuff
Vue.config.devtools = true;
Vue.component('weight-table-component', {
  data: function () {
    return {
      row_cfg: {
            'Startvægt (kg)': get_start_weight,
            'Nuv.vægt (kg)': get_current_weight,
            'Vægttab (kg)': get_weight_loss,
      }
    }
  },
  computed: {
    "columns": function columns() {
      let cols = Object.keys(data);
      cols.unshift(new Date().toISOString().slice(0,10));
      return cols;
    },
    "rows": function rows() {
      let rows = [];
      let i = 0;
      for (hdr in this.row_cfg) {
        let row = [];
        row.push(hdr);
        for (name in data) {
          row.push(this.row_cfg[hdr](name));
        }
        rows.push(row);
      }
      return rows;
    },
  },
  template: `
    <table class="w3-table w3-striped w3-bordered">
    <thead>
      <tr class="w3-theme">
        <th v-for="col in columns">{{col}}</th>
      </tr>
    </thead>
      <tbody>
        <tr v-for="row in rows">
          <td v-for="cell in row">{{cell}}</td>
        </tr>
      </tbody>
    </table>`
});
new Vue({ el: '#weight-table' });
