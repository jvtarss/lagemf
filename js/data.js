// Edite este arquivo para atualizar equipe, publicações, recursos e parceiros.
// Textos com { pt, en } são exibidos conforme o idioma escolhido.

window.DATA = {
  email: "lagemf@uft.edu.br",
  instagram: "https://instagram.com/lagemf.uft",
  instagramHandle: "@lagemf.uft",
  mapQuery: "Universidade Federal do Tocantins Campus Gurupi",

  people: {
    coordination: [
      {
        name: "Kellen Kauanne Pimenta de Oliveira",
        role: { pt: "Coordenadora", en: "Principal Investigator" },
        bio: {
          pt: "Engenheira de Bioprocessos e Biotecnologia e doutora em Biotecnologia Vegetal pela Universidade Federal de Lavras (UFLA).",
          en: "Bioprocess and Biotechnology Engineer with a PhD in Plant Biotechnology from the Federal University of Lavras (UFLA)."
        },
        photo: "assets/img/kauanne.jpg",
        lattes: "http://lattes.cnpq.br/5634437314538770",
        orcid: "https://orcid.org/0000-0001-7505-4482",
        email: ""
      }
    ],
    postgrad: [
      { name: "[Nome Sobrenome]", role: { pt: "Doutorado", en: "PhD student" }, photo: "", lattes: "" },
      { name: "[Nome Sobrenome]", role: { pt: "Mestrado", en: "Master's student" }, photo: "", lattes: "" }
    ],
    undergrad: [
      {
        name: "João Vítor Aires Teixeira",
        role: { pt: "Iniciação científica (2024 - 2026)", en: "Undergraduate researcher (2024 - 2026)" },
        details: {
          pt: "Graduação em Engenharia de Bioprocessos e Biotecnologia (2022 - 2026)",
          en: "BSc in Bioprocess and Biotechnology Engineering (2022 - 2026)"
        },
        photo: "", lattes: "", orcid: ""
      }
    ],
    collaborators: [
      { name: "[Nome Sobrenome]", role: { pt: "[Instituição]", en: "[Institution]" }, photo: "", lattes: "" }
    ]
  },

  // Nomes destacados em negrito nas listas de autores
  labMembers: ["João Vítor Aires-Teixeira", "Kellen Kauanne Pimenta de Oliveira"],

  publications: [
    {
      year: 2026,
      type: { pt: "Preprint", en: "Preprint" },
      title: "Eucalyptus microRNA Archive (EMA): a multi-study and cross-condition curated database of microRNAs in Eucalyptus grandis",
      authors: ["João Vítor Aires-Teixeira", "Thiago Motta Venancio", "Gabriel Quintanilha-Peixoto", "Kellen Kauanne Pimenta de Oliveira"],
      venue: "Preprint, 2026",
      doi: "10.64898/2026.08.29.747619"
    },
    {
      year: 2026,
      type: { pt: "Artigo original", en: "Original research" },
      title: "Bulk RNA-seq datasets analysis integration identifies robust drought-responsive genes and functional networks in Eucalyptus grandis",
      authors: ["João Vítor Aires-Teixeira", "Nivea Maria Pereira Lima", "Renato Almeida Sarmento", "Gabriel Quintanilha-Peixoto", "Kellen Kauanne Pimenta de Oliveira"],
      venue: "Frontiers in Bioinformatics, v. 6, 2026. Genomic Analysis",
      doi: "10.3389/fbinf.2026.1743474"
    }
  ],

  resources: [
    {
      icon: "bi-database",
      type: { pt: "Banco de dados", en: "Database" },
      title: "Eucalyptus microRNA Archive (EMA)",
      text: {
        pt: "Banco de dados curado de microRNAs de Eucalyptus grandis, integrando múltiplos estudos e condições experimentais.",
        en: "Curated database of Eucalyptus grandis microRNAs integrating multiple studies and experimental conditions."
      },
      url: "",
      doi: "10.64898/2026.08.29.747619"
    },
    {
      icon: "bi-github",
      type: { pt: "Código", en: "Code" },
      title: "[Repositório do laboratório]",
      text: { pt: "[Descrição do repositório.]", en: "[Repository description.]" },
      url: ""
    }
  ],

  // height: altura da logo em px no desktop, ajustada para que todas tenham peso visual parecido.
  partners: [
    { name: "CENAPAD", full: { pt: "Centro Nacional de Processamento de Alto Desempenho", en: "National Center for High Performance Computing" }, logo: "assets/img/parceiros/cenapad.png", height: 86, url: "" },
    { name: "UFMG", full: { pt: "Universidade Federal de Minas Gerais", en: "Federal University of Minas Gerais" }, logo: "assets/img/parceiros/ufmg.png", height: 56, url: "" },
    { name: "UENF", full: { pt: "Universidade Estadual do Norte Fluminense Darcy Ribeiro", en: "State University of Norte Fluminense Darcy Ribeiro" }, logo: "assets/img/parceiros/uenf.png", height: 80, url: "" }
  ]
};
