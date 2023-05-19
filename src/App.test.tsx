import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Chessboard from './Chessboard';

describe('Chessboard', () => {
  test('renders all squares', () => {
    const { container } = render(<Chessboard />);
    const squares = container.getElementsByClassName('square');
    expect(squares.length).toBe(64);
  });

  test('removes pointer CSS when dragging leaves a square', () => {
    const { container } = render(<Chessboard />);
    const squares = container.getElementsByClassName('square');

    const sourceSquare = squares[0];
    const targetSquare = squares[1];

    fireEvent.dragStart(sourceSquare);
    fireEvent.dragEnter(targetSquare);
    fireEvent.dragLeave(targetSquare);

    expect(targetSquare).not.toHaveClass('drag-over');
    expect(targetSquare).not.toHaveStyle('cursor: pointer; border: 2px dashed #ff0000;');
  });
});
