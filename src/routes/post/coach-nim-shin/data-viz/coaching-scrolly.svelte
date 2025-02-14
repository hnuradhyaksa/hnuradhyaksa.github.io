<script>
    import Narrative from "./coaching-narrative.svelte";
    import CoachingPath from "./coaching-path.svelte";
  
    const narratives = [
      {
        title: "The dark period",
        content: "Effective from March 2015, FIFA imposed sanctions on the PSSI due to government interference in football affairs. This was the result of a prolonged dispute over the dual league system in Indonesia. As a consequence, Indonesia was banned from competing in international tournaments, and the local league was disrupted.",
        // fontSize: "18px",
        padding: "20px",
        image: ""
      },
      {
        title: "Alfred Riedl's national team revival",
        content: "When FIFA lifted its sanctions on PSSI in May 2016, the Indonesian national team was at its lowest point on the international stage, ranked 191st. Fortunately, under Riedl's leadership, the team rebounded, reaching the AFF Championship final and climbing 20 places in the rankings. Despite this progress, he was dismissed at the end of 2016 as PSSI sought a younger coach with a long-term vision.",
        // fontSize: "18px",
        padding: "20px",
        image: ""
      },
      {
        title: "The appointment of Luis Milla",
        content: "With a background in coaching Spain's youth national teams, Luis Milla was regarded as the ideal candidate to lead the national footballing scene. Despite making significant progress and delivering the nation's best Asia Games performance, he was dismissed after a relatively short tenure. His departure was primarily due to failing to meet PSSI’s lofty expectations and challenges in sustaining his substantial salary.",
        // fontSize: "18px",
        padding: "20px",
        image: ""
      },
      {
        title: "A shocking dismissal and an unforeseen successor",
        content: "With uncertainty surrounding Luis Milla's contract extension and the AFF Championship fast approaching, PSSI faced urgent pressure to fill the national team's coaching role. In response, Milla's assistant, Bima Sakti, was appointed to lead the squad. The homegrown coach secured friendly victory against Myanmar but endured a disastrous AFF campaign, failing to advance beyond the group stage.",
        // fontSize: "18px",
        padding: "20px",
        image: ""
      },
      {
        title: "The Simon McMenemy era",
        content: "Bima Sakti's failure in the AFF Championship led to his immediate dismissal as head coach of the national team. He was replaced by Simon McMenemy, a coach who had just won Liga 1 and possessed experience in ASEAN football. However, his tenure proved disastrous. Under his leadership, Indonesia struggled in the World Cup qualifiers, suffering four defeats and conceding 14 goals.",
        // fontSize: "18px",
        padding: "20px",
        image: ""
      },
      {
        title: "Yeyen Tumena's brief takeover",
        content: "Yeyen took over after Simon was dismissed midway through the World Cup qualifiers. However, he only led the team for one match, a 2-0 defeat against Malaysia at Bukit Jalil.",
        // fontSize: "18px",
        padding: "20px",
        image: ""
      },
      {
        title: "The Shin-Tae Yong era",
        content: "This is the introduction and background of our narrative.",
        // fontSize: "18px",
        padding: "20px",
        image: ""
      }
    ];
    
    let activeStep = 0;
    
    function handleActiveChange(event) {
      activeStep = event.detail.index;
    }
  </script>
  
  <div class="scrollytelling-container">
    <!-- Left column: Narrative section -->
    <div class="narrative">
      <Narrative {narratives} on:activeChange={handleActiveChange} />
    </div>
  
    <div class="chart">
      <CoachingPath {activeStep}/>
    </div>
  </div>
  
  <style>
    .scrollytelling-container {
      display: flex;
      align-items: flex-start;
    }
    .narrative {
      width: 40%;
      padding: 20px;
    }
    .chart {
      width: 60%;
      padding: 20px;
      position: sticky;
      top: 20px;
      height: calc(100vh - 20px);
    }
  </style>
  