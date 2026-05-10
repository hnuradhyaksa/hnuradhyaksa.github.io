<script>
</script>

<div class="legend">
	<div class="legend-item">
		<div class="legend-box prim-forest"></div>
		<span>Humid Primary Forest</span>
	</div>

	<div class="legend-item">
		<div class="legend-box forest-loss"></div>
		<span>Humid Primary Forest Loss (2001-2024)</span>
	</div>
</div>

<style>
	.legend {
		display: flex;
		gap: 1.5rem;
		align-items: center;
		margin-left: auto;
		margin-right: auto;
		max-width: 64ch;
		margin-top: 2.4rem;
	}

	.legend-box {
		width: 14px;
		height: 14px;
	}

	.legend-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-family: 'Inter', sans-serif;
		font-size: 0.72rem;
		color: #666;
	}

	.legend-box.prim-forest {
		background: #778249;
		opacity: 1;
	}

	.legend-box.forest-loss {
		background: #dc6c9a;
		opacity: 1;
	}
</style>
