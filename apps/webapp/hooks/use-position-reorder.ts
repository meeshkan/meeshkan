import { useState, useRef } from 'react';
import { clamp, distance } from 'popmotion';
import move from 'array-move';
import { Position } from './use-measure-position';
import { ScriptCommand } from '@frontend/meeshkan-types';

const buffer = 30;

export const findIndex = (
	i: number,
	yOffset: number,
	positions: Position[]
) => {
	let target = i;
	const { top, height } = positions[i];
	const bottom = top + height;

	// If moving down
	if (yOffset > 0) {
		const nextItem = positions[i + 1];
		if (nextItem === undefined) return i;

		const swapOffset =
			distance(bottom, nextItem.top + nextItem.height / 2) + buffer;
		if (yOffset > swapOffset) target = i + 1;

		// If moving up
	} else if (yOffset < 0) {
		const prevItem = positions[i - 1];
		if (prevItem === undefined) return i;

		const prevBottom = prevItem.top + prevItem.height;
		const swapOffset = distance(top, prevBottom - prevItem.height / 2) + buffer;
		if (yOffset < -swapOffset) target = i - 1;
	}

	return clamp(0, positions.length, target);
};

export type step = {
	text: string;
	sIndex: number;
	command: string;
	tagName?: string;
	scriptCommand: ScriptCommand;
};

export function usePositionReorder(initialState: step[]) {
	const [order, setOrder] = useState(initialState);
  const [orderTransformed, setOrderTransformed] = useState(false);
	if (!orderTransformed) {
		setOrderTransformed(true);
		setOrder(order.sort((a,b) => a.sIndex - b.sIndex));
	}
	// We need to collect an array of height and position data for all of this component's
	// `Item` children, so we can later us that in calculations to decide when a dragging
	// `Item` should swap places with its siblings.
	const positions = useRef<Position[]>([]).current;
	const updatePosition = (i: number, offset: Position) =>
		(positions[i] = offset);

	// Find the ideal index for a dragging item based on its position in the array, and its
	// current drag offset. If it's different to its current index, we swap this item with that
	// sibling.
	const updateOrder = (i: number, dragOffset: number): step[] | null => {
		const targetIndex = findIndex(i, dragOffset, positions);
		const newOrder = move(order, i, targetIndex);
		if (targetIndex !== i) {
			setOrder(newOrder);
			return newOrder;
		}
		return null;
	};

	return { order, updatePosition, updateOrder, setOrder };
}
