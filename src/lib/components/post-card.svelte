<script>
	export let post;
	import { base } from '$app/paths';

	const toolColors = {
		svelte: '#FE3C01',
		d3: '#F9A13B',
		figma2html: '#666666',
		r: '#1A64B8'
	};

	function getColor(toolName) {
		return toolColors[toolName.toLowerCase()] || '#888888';
	}
</script>

<a href={post.link} class="card">
	<div class="meta-top">
		{#if post.client}
			<span class="client">{post.client}</span>
		{:else}
			<span class="client placeholder">Personal</span>
		{/if}

		{#if post.recog}
			<div class="award-badge">
				<img
					src="{base}/icon/award-{post.recog}.svg"
					alt="{post.recog} award"
					width="18"
					height="18"
				/>

				<div class="tooltip">
					{post.recogtext}
				</div>
			</div>
		{/if}
	</div>

	<div class="media-wrapper">
		<img src={post.thumbnail} alt={post.title} />
	</div>

	<h3 class="title">{post.title}</h3>
	<p class="summary">{post.summary}</p>

	<div class="tools">
		{#if post.tools}
			{#each post.tools as tool}
				<span class="tool-tag" style="--tag-color: {getColor(tool)}">
					{tool}
				</span>
			{/each}
		{/if}
	</div>
</a>

<style>
	.card {
		display: flex;
		flex-direction: column;
		width: 100%;
		text-decoration: none;
		color: inherit;
		cursor: pointer;
		border: none;
		outline: none;
	}
	.card:hover {
		border: none;
		text-decoration: none;
		background: transparent;
	}
	.meta-top {
		margin-bottom: 24px;
		min-height: 1.2rem;
		display: flex;
		align-items: center;
		gap: 6px;
	}
	.client {
		font-family: 'Inter', sans-serif;
		font-size: 0.84rem;
		letter-spacing: 0.05rem;
		text-transform: uppercase;
		color: #ababab;
		font-weight: 500;
	}
	.client.placeholder {
		visibility: hidden;
	}
	.award-badge {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 18px;
		height: 18px;
	}

	.award-badge img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	.tooltip {
		position: absolute;
		bottom: 140%;
		left: 50%;
		transform: translateX(-50%) translateY(5px);
		background-color: #333;
		color: #fff;
		font-family: 'Inter', sans-serif;
		font-size: 0.7rem;
		font-weight: 500;
		text-align: center;
		white-space: nowrap;
		padding: 6px 10px;
		border-radius: 4px;
		opacity: 0;
		visibility: hidden;
		pointer-events: none;
		transition:
			opacity 0.2s ease,
			transform 0.2s ease;
		z-index: 10;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
	}

	.tooltip::after {
		content: '';
		position: absolute;
		top: 100%;
		left: 50%;
		margin-left: -4px;
		border-width: 4px;
		border-style: solid;
		border-color: #333 transparent transparent transparent;
	}

	.award-badge:hover .tooltip {
		opacity: 1;
		visibility: visible;
		transform: translateX(-50%) translateY(0);
	}

	.media-wrapper {
		width: 100%;
		aspect-ratio: 16 / 9;
		background-color: #f4f4f4;
		border-radius: 8px;
		overflow: hidden;
		margin-bottom: 16px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;
	}
	.media-wrapper img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}
	.card:hover .media-wrapper {
		transform: translateY(-4px);
		box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
	}
	.title {
		font-family: 'Inter', sans-serif;
		font-size: 1.25rem;
		font-weight: 600;
		color: #111;
		margin: 24px 0 12px 0;
		line-height: 1.3;
	}
	.summary {
		font-family: 'Inter', sans-serif;
		font-size: 0.96rem;
		font-weight: 400;
		color: #a0a0a0;
		margin: 0 0 16px 0;
		line-height: 1.5;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
	.tools {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-top: auto;
	}

	.tool-tag {
		font-family: 'Inter', sans-serif;
		font-size: 0.7rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.02em;
		padding: 4px 10px;
		border-radius: 100px;

		color: var(--tag-color);
		border: 2px solid var(--tag-color);

		background-color: var(--tag-color);

		background-color: color-mix(in srgb, var(--tag-color), transparent 80%);
	}

	@supports not (background: color-mix(in srgb, red, transparent)) {
		.tool-tag {
			background-color: transparent;
		}
	}
</style>
