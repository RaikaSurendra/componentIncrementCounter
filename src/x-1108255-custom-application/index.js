import { createCustomElement } from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import style from './counter.scss';

const view = (state, { updateState }) => {
	const { tally } = state;
	return (
		<div>
			<h2>Click Counter</h2>
			<span>
				<button
					type="button"
					on-click={
						() => updateState({ tally: (tally + 1) })
					}>Increment
				</button>
			</span>
			<span>
				<button
					type="button"
					on-click={
						() => updateState({ tally: 0 })
					}>Clear
				</button>
			</span>
			<div>Value: {tally}</div>
		</div>
	);
};

createCustomElement('x-1108255-custom-application', {
	renderer: { type: snabbdom },
	setInitialState() {
		return { tally: 0 };
	},
	view,
	styles: style,

});
