<script>
	import { posts } from '$lib/data/post.js';
	import PostCard from '$lib/components/post-card.svelte';
	import { fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { cubicOut as ease } from 'svelte/easing';
	import { tick } from 'svelte';

	const sorted = [...posts].sort((a, b) => b.id - a.id);
	let offset = 0;
	const windowSize = 2;

	const fadeDur = 100;
	const slideDur = 200;

	let displayedPosts = [];
	let newIds = [],
		prevWindow = [];

	$: {
		const curr = displayedPosts.map((p) => p.id);
		newIds = curr.filter((id) => !prevWindow.includes(id));
		prevWindow = curr;
	}

	$: if (!displayedPosts.length) {
		displayedPosts = sorted.slice(offset, offset + windowSize);
	}

	async function showNext() {
		if (offset + windowSize >= sorted.length) return;

		const leavingId = displayedPosts[0].id;
		displayedPosts = displayedPosts.filter((p) => p.id !== leavingId);
		await tick();

		setTimeout(async () => {
			offset += 1;
			displayedPosts = sorted.slice(offset, offset + windowSize);
			await tick();
		}, fadeDur);
	}

	async function showPrev() {
		if (offset === 0) return;

		const leavingId = displayedPosts[displayedPosts.length - 1].id;
		displayedPosts = displayedPosts.filter((p) => p.id !== leavingId);
		await tick();

		setTimeout(async () => {
			offset -= 1;
			displayedPosts = sorted.slice(offset, offset + windowSize);
			await tick();
		}, fadeDur);
	}
</script>

<div class="wrapper">
	<header>
		<div class="logo">
			<img src="/icon/logo.svg" alt="Adhyaksa logo" width="32" height="32" />
		</div>
		<div class="cta">MORE ABOUT ME ↗</div>
	</header>

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
					Here you'll find my data visualization projects—some exploration, some competitive, but
					mostly out of my curiosity. Enjoy exploring!
				</p>
			</div>
			<div class="social">
				<a href="mailto:hnuradhyaksa@gmail.com">EMAIL</a>
				<a href="https://www.linkedin.com/in/nuradhyaksa/" target="_blank">LINKEDIN</a>
				<a href="https://bsky.app/profile/nuradhyaksa.bsky.social" target="_blank">BLUESKY</a>
				<a href="https://github.com/hnuradhyaksa" target="_blank">GITHUB</a>
			</div>
		</section>

		<section class="posts-panel">
			<div class="grid-area">
				{#each displayedPosts as post (post.id)}
					<div
						out:fade={{ duration: fadeDur }}
						animate:flip={{ delay: fadeDur, duration: slideDur, easing: ease }}
						in:fade={{
							delay: newIds.includes(post.id) ? fadeDur + slideDur : 0,
							duration: fadeDur
						}}
					>
						<PostCard {post} />
					</div>
				{/each}
			</div>

			<div class="control">
				<div class="control-half recent">
					{#if offset > 0}
						<div class="control-row recent" on:click={showPrev}>
							<div class="icon">↑</div>
							<div class="label">RECENT POST</div>
						</div>
					{/if}
				</div>

				<!-- Bottom half: only when you can go forward -->
				<div class="control-half explore">
					{#if offset + windowSize < sorted.length}
						<div class="control-row explore" on:click={showNext}>
							<div class="icon">↓</div>
							<div class="label">EXPLORE MORE</div>
						</div>
					{/if}
				</div>
			</div>
		</section>
	</main>
</div>

<style>
	:root {
		--header-h: 80px;
	}
	.wrapper {
		margin: 24px 40px 40px 40px;
		display: flex;
		flex-direction: column;
		height: calc(100vh - var(--header-h));
		overflow: hidden;
	}

	header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: var(--header-h);
		flex: 0 0 var(--header-h);
	}
	header .logo {
		width: 80px;
		height: 80px;
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
	}
	header .logo img {
		width: 60%;
		height: 60%;
		display: block;
		object-fit: contain;
	}
	header .cta {
		font-family: Inter;
		font-size: 0.8rem;
		color: #d5d5d5;
		letter-spacing: 0.2rem;
	}

	main {
		flex: 1 1 auto;
		display: flex;
		overflow: hidden;
		margin: 0 20px 80px 80px;
		min-height: 0;
	}

	.greeting {
		flex: 4;
		display: flex;
		flex-direction: column;
		padding-right: 2rem;
		overflow-y: auto;
		padding-left: 1rem;
	}
	.greeting .text {
		flex: 9;
		font-family: Inter;
		font-size: 1.8rem;
		font-weight: 400;
		line-height: 1.4;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
	}
	.greeting .text .name {
		font-family: 'Lora';
		font-style: italic;
		font-size: 2.1rem;
		font-weight: 600;
		line-height: inherit;
	}
	.greeting .social {
		flex: 1;
		display: flex;
		align-items: center;
		font-family: Inter;
		font-size: 0.8rem;
		letter-spacing: 0.2rem;
		gap: 4.8rem;
	}
	.posts-panel {
		flex: 4;
		display: flex;
		flex-direction: row;
		overflow: visible;
		padding-left: 2rem;
		margin-top: 80px;
	}
	.grid-area {
		display: flex;
		flex-direction: column;
	}

	.grid-area > div {
		position: relative;
		min-height: 0;
	}
	.posts-panel .grid-area {
		flex: 7;
		display: grid;
		grid-template-rows: repeat(2, minmax(0, 1fr));
		height: 100%;
		min-height: 0;
		flex-direction: column;
		gap: 1.8rem;
		margin-left: 120px;
		margin-right: 40px;
	}
	.posts-panel .control {
		font-family: Inter;
		font-size: 0.8rem;
		flex: 3;
		display: flex;
		flex-direction: column;
		cursor: pointer;
	}
	.control {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
	}
	.control-row {
		display: flex;
		align-items: center;
		width: 100%;
		max-width: 240px;
	}
	.control-row .icon {
		font-size: 2rem;
		font-weight: 200;
		flex: 0 0 auto;
		margin-right: 0.5rem;
	}
	.control-row .label {
		flex: 0 1 auto;
		font-family: Inter;
		font-size: 0.8rem;
		letter-spacing: 0.2rem;
		align-items: center;
	}
	.control-row.explore .label {
		transform-origin: bottom left;
		transform: translate(50%) rotate(-90deg);
	}
	.control-row.recent .label {
		transform-origin: top left;
		transform: translate(50%) rotate(90deg);
	}
	.control-row:hover .label {
		text-decoration: none;
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

	@keyframes blurOut {
		from {
			filter: blur(8px);
		}
		to {
			filter: blur(0);
		}
	}

	.swap-hover .default {
		opacity: 1;
		filter: blur(0);
	}
	.swap-hover .hovered {
		opacity: 0;
		filter: blur(8px);
		transition:
			opacity 0.2s ease 0s,
			filter 0.3s ease 0.1s;
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
		color: #555;
		text-decoration: none;
		transition: color 0.8s ease;
	}

	.greeting .social a:hover {
		color: rgb(13, 150, 249);
	}
</style>
