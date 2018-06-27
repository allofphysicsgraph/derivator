var data = [
  {
    category: "derivation",
    title: "Example derivation",
    intro: "This information appears before the derivation, it is meant to give few hints and ideas to encourage the reader to go through it.",
    outro: "This paragraph will appear at the end of derivation, and it is meant to give some references and explain the purpose of derived equation.",
    initiation: "We start with definition of action, referenced $(D1)$, $$S[f(t)] = \\int_{t1}^{t2} L[f(t)] dt \\tag{T1.1}$$",
    branches: {
      master: "b1",
      all: ["b1", "b2", "b3"]
    },
    steps: [
      {
        perform: "commit",
        branch: "b1",
        detail: 'We multiply both sides by $\\alpha$, $$\\alpha S[f(t)] = \\alpha \\int_{t1}^{t2} L[f(t)] dt \\tag{T1.2}$$'
      },
      {
        perform: "branch",
        branch: "b2",
        from: "b1"
      },
      {
        perform: "orphan-branch",
        branch: "b3"
      },
      {
        perform: "commit",
        branch: "b3",
        detail: 'Substitute right hand side of definition $\\alpha S[f(t, \\epsilon)] = \\beta$, referenced as $(D4)$ equation to $(T1.2)$, $$\\beta = \\alpha \\int_{t1}^{t2} L[f(t)] dt \\tag{T1.3}$$'
      },
      {
        perform: "merge",
        branch: "b3",
        to: "b2",
        detail: "We divide both sides by $\\alpha$, $$\\frac{\\beta}{\\alpha} = \\int_{t1}^{t2} L[f(t)] dt \\tag{T1.4}$$"
      },
      {
        perform: "merge",
        branch: "b2",
        to: "b1",
        detail: "Substitute left hand side of $(T1.4)$ to right hand side of $(T1.1)$, $$ S[f(t)] = \\frac{\\beta}{\\alpha} \\tag{T1.5}$$"
      },
    ]
  },
  {
    category: "definition",
    title: "Action",
    content: "Definition $$S[f(t)] = \\int_{t1}^{t2} L[f(t)] dt \\tag{D1}$$"
  },
  {
    category: "definition",
    title: "Variation",
    content: "Definition $$\\delta S[f(t, \\epsilon)] = \\frac{d}{d\\epsilon}S[f(t, \\epsilon)] \\tag{D2}$$"
  },
  {
    category: "definition",
    title: "Principle of Least Action",
    content: "Definition $$\\delta S[f(t, \\epsilon)] = 0 \\tag{D3}$$"
  },
  {
    category: "definition",
    title: "Example definition I",
    content: "Definition $$\\alpha S[f(t, \\epsilon)] = \\beta \\tag{D4}$$"
  },
  {
    category: "theorem",
    title: "Fundamental Theorem of Calculus I",
    content: "Given function $f$ that is continuous on the interval $[a, b]$ and such that $$\\int f(x) dx = F(x) \\tag{T1}$$ then following statement is true, $$\\int_a^b f(x) dx = F(x) \\vert_b - F(x) \\vert_a \\tag{T2}$$"
  },
  {
    category: "theorem",
    title: "Fundamental Theorem of Calculus II",
    content: "Given function $f$ that is continuous on the interval $[a, b]$ then following statements are true, $$\\int_a^x f(t) dx = F(x) \\tag{T3}$$ and, $$\\frac{d}{dx} F(x) = f(x) \\tag{T4}$$"
  }
];
var graphstats = {"legend":true,"flat":true,"no_ansi":false,"authors":[{"value":20,"label":"marekyggdrasil"},{"value":1,"label":"zequequiel"}]}
var renderstats = {"legend":true,"flat":true,"no_ansi":false,"authors":[{"value":20,"label":"marekyggdrasil"},{"value":1,"label":"zequequiel"}]}
