<script>
	import Grid from '$lib/components/grid.svelte';
	import {posts} from '$lib/data/post.js';
	import BacktoTop from '$lib/components/back2top.svelte'
</script>
  
  <style>
	
	@import url('https://fonts.googleapis.com/css2?family=Vollkorn:ital,wght@0,400..900;1,400..900&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');
  
	.completeright {
	  margin-left: 0.5rem;
	  margin-right: 0.5rem;
  
		@media screen and (min-width: 700px) {
		margin-left: 25%;
		margin-right: 25%;
		}
	}
  
	.intro {
		margin-top: 117px;
		margin-bottom: 4rem;
		max-width: 800px;
	}
  
    h2 {
        @media screen and (max-width: 700px) {
        font-size: 2rem;
        line-height: 2.75rem;
        }
        font-size: 3rem;
        line-height: 4rem;
        font-weight: 500;
        margin: 0;
        font-family: 'Vollkorn';
    }

	.container {
		max-width: 1200px;
		margin: 0 auto;
		font-family: 'Roboto';
  	}

    .article-text {
        margin-top: 0.8em;
        font-family: 'Vollkorn';
        font-size: 1.15rem;
        line-height: 1.82rem;
        display: inline;
    }

	.sidebar-text {
		
		font-size: 0.7rem;
		font-weight: 500;
		color: #808080;
		letter-spacing: 2px;
		line-height: 1.2rem;
		text-decoration: none;
		font-family: 'Roboto';

		a {
			color: #808080;
			text-decoration: none;
		}

		a:hover {
			color: #0084db;
			text-decoration: none;
		}
	}
  
	.category-header   {

		h2 {
			font-size: 2rem;
			line-height: 3rem;
			font-weight: 500;
			margin: 0;
		}
		
        margin-bottom: 4rem;
        margin-top: 3rem;
	}
  
	.blogcontainer {
		margin-bottom: 50px;
		margin-top: 50px;
	}

    hr {
        border: 0;
        height: 2px;
        width: 80px;
        margin-left: 0;
        background: #000;
    }

    ::selection {
        background: #0084db;
        color: #fff;
    }

  </style>
  
	<div class="completeright">
	  <div class="intro">
		<h2>
		  <i>
			Hi, I'm Adhyaksa. This is where I share my collection of short visualization essays—most of which are provoked by everyday events I observe.
		  </i>
		</h2>
		<br />
		<div class="sidebar-text">
		  <a href="#aboutme">GET TO KNOW ME!</a>
		</div>
	  </div>

		<div class="container">
			<Grid {posts} />
		</div>
  
	  <div class="category-header">
		<hr />
		<div id="aboutme">
		  <h2>Here's a bit about me!</h2>
		</div>
  
		<div class="blogcontainer article-text">
		  <p>
			I'm a Business Intelligence Analyst at GovTech Health Indonesia, where I explore, analyze, and visualize public health data to help promote more informed policymaking.
		  </p>
		  <p>
			I'm especially interested in the power of data visualization because I believe it enhances the impact of data. I believe that fully interactive storytelling could do justice to the potential of the data.
		  </p>
		</div>
  
		<br />
  
		<h2> Let's connect! </h2>
		<br />
  
		<div class="sidebar-text">
		  <a href="mailto:hnuradhyaksa@gmail.com">EMAIL</a>&emsp;
		  <a href="https://www.linkedin.com/in/nuradhyaksa/" target="_blank">LINKEDIN</a>&emsp;
		  <a href="https://public.tableau.com/app/profile/nur.adhyaksa.hamid/vizzes" target="_blank">TABLEAU PUBLIC</a>&emsp;
		  <a href="https://bsky.app/profile/nuradhyaksa.bsky.social" target="_blank">BLUESKY</a>&emsp;
		  <a href="https://github.com/hnuradhyaksa" target="_blank">GITHUB</a>&emsp;
		</div>
	  </div>
	</div>
  

	<BacktoTop />