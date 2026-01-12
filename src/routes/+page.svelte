<script>
	import { posts } from '$lib/data/post.js';
	import PostCard from '$lib/components/post-card.svelte';
	import { fade } from 'svelte/transition';
	import { tick } from 'svelte';

	const sorted = [...posts].sort((a, b) => b.id - a.id);
	let offset = 0;

	const windowSize = 4;

	const fadeDur = 100;
	let displayedPosts = [];

	$: if (!displayedPosts.length) {
		displayedPosts = sorted.slice(offset, offset + windowSize);
	}
</script>

<div class="wrapper">
	<main>
		<section class="greeting">
			<div class="text">
				<p>Hi, I'm <span class="name">Adhyaksa</span></p>
				<p class="swap-hover">
					<span class="default"
						>I create vectors from numbers and do my best not to confuse people</span
					>
					<span class="hovered">A data visualization specialist</span>
				</p>
				<p>
					Here you'll find my data visualization projects—some exploration, some competitive, mostly
					out of my curiosity. Enjoy exploring!
				</p>
			</div>
			<div class="social">
				<a href="mailto:hnuradhyaksa@gmail.com">EMAIL</a>
				<a href="https://www.linkedin.com/in/nuradhyaksa/" target="_blank">LINKEDIN</a>
				<a href="https://github.com/hnuradhyaksa" target="_blank">GITHUB</a>
				<a href="/asset/Nur_Adhyaksa_resume.pdf" target="_blank" rel="noopener noreferrer">RESUME</a
				>
			</div>
		</section>

		<!-- <h2 class="section-title">PROJECTS</h2> -->

		<section class="posts-grid">
			{#each displayedPosts as post (post.id)}
				<div class="grid-item" in:fade={{ duration: 200 }}>
					<PostCard {post} />
				</div>
			{/each}
		</section>
	</main>
	<div class="footer-fence">
		<footer>
			<p>© 2026 Nur Adhyaksa • Built with Svelte</p>
		</footer>
	</div>
</div>

<style>
	.wrapper {
		min-height: 100vh;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 40px 40px 40px;
		box-sizing: border-box;
	}

	main {
		width: 100%;
		max-width: 960px;
		display: flex;
		flex-direction: column;
		align-items: center;
		flex: 1;
	}

	.greeting {
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 540px;
		margin-bottom: 100px;
	}

	.greeting .text {
		font-family: Inter;
		font-size: 1.64rem;
		font-weight: 300;
		line-height: 1.4;
		display: flex;
		flex-direction: column;
		margin-bottom: 3rem;
	}

	.greeting .text .name {
		font-family: 'Lora';
		font-style: italic;
		font-size: 1.86rem;
		font-weight: 600;
	}

	.greeting .social {
		display: flex;
		align-items: center;
		font-family: Inter;
		font-size: 0.8rem;
		letter-spacing: 0.2rem;
		gap: 1.2rem;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	/* .section-title {
		font-family: 'Inter', sans-serif;
		font-size: 1.48rem;
		font-weight: 300;
		letter-spacing: 0.4rem;
		color: #ccc;
		text-transform: uppercase;
		text-align: center;
		margin: 0 0 40px 0;
		width: 100%;
	} */

	.posts-grid {
		width: 100%;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 96px 72px;
	}

	@media (max-width: 768px) {
		.posts-grid {
			grid-template-columns: 1fr;
			gap: 60px;
		}
		.wrapper {
			padding: 40px 24px;
		}
		.greeting {
			margin-bottom: 60px;
		}
	}

	.footer-fence {
		width: 100%;
		display: block;
		margin-top: auto;
	}

	footer {
		width: 100%;
		max-width: 960px;
		display: block;
		text-align: center;
		padding-top: 60px;
		padding-bottom: 40px;
		margin: 0 auto;
	}

	footer p {
		font-family: 'Inter', sans-serif;
		font-size: 0.72rem;
		font-weight: 400;
		color: #ccc;
		margin: 0;
	}

	.swap-hover {
		display: inline-grid;
		grid-template-areas: 'swap';
	}
	.swap-hover .default,
	.swap-hover .hovered {
		grid-area: swap;
		transition:
			opacity 0.2s ease,
			filter 0.2s ease;
	}
	.swap-hover .default {
		opacity: 1;
		filter: blur(0);
	}
	.swap-hover .hovered {
		opacity: 0;
		filter: blur(8px);
	}
	.swap-hover:hover .default {
		opacity: 0;
		filter: blur(8px);
	}
	.swap-hover:hover .hovered {
		opacity: 1;
		filter: blur(0);
	}
	.greeting .social a {
		color: #aaa;
		text-decoration: none;
		transition: color 0.8s ease;
	}
	.greeting .social a:hover {
		color: rgb(13, 150, 249);
	}
</style>
