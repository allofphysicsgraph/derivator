var myTemplateConfig = {
  // pallete from http://www.color-hex.com/color-palette/62581
  colors: ["#7a6856", "#a99c8e", "#d3c9c1", "#ded7d0", "#ebe5e4"],
  branch: {
    lineWidth: 10,
    spacingX: 50,
    labelRotation: 0
  },
  commit: {
    spacingY: -80,
    dot: {
      size: 14
    },
    message: {
      displayAuthor: false,
      displayBranch: false,
      displayHash: false,
      font: "normal 12pt Arial"
    }
  }
};
var myTemplate = new GitGraph.Template(myTemplateConfig);
var derivations = document.getElementById("container_derivations");
var definitions = document.getElementById("container_definitions");
var theorems = document.getElementById("container_theorems");
var statistics_graph = document.getElementById("container_stats_graph");
var statistics_website = document.getElementById("container_stats_render");
var renderElement = function(tag, properties, content, parent) {
  var node = document.createElement(tag);
  for (var property in properties) {
    if (properties.hasOwnProperty(property)) {
      node.setAttribute(property, properties[property]);
    }
  }
  if (content != null) {
    cont = document.createTextNode(content);
    node.appendChild(cont);
  }
  if (parent != null) {
    parent.appendChild(node);
  }
  return node;
}
var renderDerivation = function(data, index) {
  // DOM part
  var container = renderElement('div', {'id': 'container_derivation_' + index}, null, derivations);
  renderElement('h4', {}, data.title, container);
  renderElement('p', {'id': 'container_derivation_' + index + '_beginning'}, data.intro, container);
  renderElement('canvas', {'id': 'derivation_' + index + '_canvas'}, null, container);
  step_0_conf = {'id': 'derivation_' + index + '_detail_init', 'class': 'gitgraph-detail'};
  renderElement('div', step_0_conf, data.initiation, container);
  for (var i = 0; i < data.steps.length; i++) {
    step_conf = {'id': 'derivation_' + index + '_detail_' + i, 'class': 'gitgraph-detail'};
    renderElement('div', step_conf, data.steps[i].detail, container);
  }
  renderElement('p', {'id': 'container_derivation_' + index + '_end'}, data.outro, container);
  // graph part
  var config = {
    'elementId': 'derivation_' + index + '_canvas',
    'template': myTemplate,
    'mode': 'extended'
  }
  var branches = {};
  var gitgraph = new GitGraph(config);
  var master = gitgraph.branch(data.branches.master);
  branches[data.branches.master] = master;
  master.commit({message: 'initiate', detailId: 'derivation_' + index + '_detail_init'});
  cnt = 1
  for (var i = 0; i < data.steps.length; i++) {
    var step_name = 'step ' + cnt;
    switch (data.steps[i].perform) {
      case 'orphan-branch':
      var branch = gitgraph.orphanBranch(data.steps[i].branch, data.steps[i].transition);
      branches[data.steps[i].branch] = branch;
      break;
      case 'branch' :
      var from = branches[data.steps[i].from];
      var branch = from.branch(data.steps[i].branch, data.steps[i].transition);
      branches[data.steps[i].branch] = branch;
      break;
      case 'commit' :
      var branch = branches[data.steps[i].branch];
      branch.commit({message: step_name, detailId: 'derivation_' + index + '_detail_' + i});
      cnt += 1;
      break;
      case 'merge' :
      if (branches[data.steps[i].branch] == null) {
        var newbranch = gitgraph.orphanBranch(data.steps[i].branch);
        branches[data.steps[i].branch] = newbranch;
      }
      var branch = branches[data.steps[i].branch];
      var withBranch = branches[data.steps[i].to];
      branch.merge(withBranch, {message: step_name, detailId: 'derivation_' + index + '_detail_' + i});
      cnt += 1;
      break;
    }
  }
  master.commit({message: "complete"});
}
var renderDefinition = function(data, index, into) {
  // DOM part
  var container = renderElement('div', {'id': 'container_definition_' + index}, null, into);
  renderElement('h4', {}, data.title, container);
  var panel = renderElement('div', {'class': 'card'}, null, container);
  renderElement('div', {'id': 'container_definition_' + index + '_content', 'class': 'card-body'}, data.content, panel);
}
var renderTheorem = function(data) {
  console.log("rendering theorem")
}
var renderStatistics = function(data, container) {
  var total = 0;
  for (var i = 0; i < data.authors.length; i++) {
    total += data.authors[i].value
  }
  var table = renderElement('table', {'class': 'table'}, null, container);
  var table_head = renderElement('tr', {}, null, table);
  renderElement('th', {}, 'GitHub', table_head);
  renderElement('th', {}, 'Contribution', table_head);
  for (var i = 0; i < data.authors.length; i++) {
    var contribution = parseFloat(data.authors[i].value / total).toFixed(2) + "%";
    var table_contributor = renderElement('tr', {}, null, table);
    var href = 'https://github.com/' + data.authors[i].label
    var contributor = renderElement('td', {}, null, table_contributor);
    renderElement('a', {'href': href}, data.authors[i].label, contributor);
    renderElement('td', {}, contribution, table_contributor);
  }
}
for (var i = 0; i < data.length; i++) {
  switch(data[i].category) {
    case "derivation": renderDerivation(data[i], i); break;
    case "definition": renderDefinition(data[i], i, definitions); break;
    case "theorem": renderDefinition(data[i], i, theorems); break;
  }
}
// statistics
renderStatistics(graphstats, statistics_graph);
renderStatistics(renderstats, statistics_website);
// render katex
renderMathInElement(
  document.body,
  {
    delimiters: [
      {left: "$$", right: "$$", display: true},
      {left: "\\[", right: "\\]", display: true},
      {left: "$", right: "$", display: false},
      {left: "\\(", right: "\\)", display: false}
    ]
  }
);
