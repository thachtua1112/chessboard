import React, { useState } from 'react';
import './Chessboard.css';

const Chessboard = () => {
  const generateSquareColors = (): string[] => {
    const colors: Array<string> = [];
    for (let i = 0; i < 64; i++) {
      const randomColor: string = generateRandomColor();
      colors.push(randomColor);
    }
    return colors;
  }

  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  const [squareColors, setSquareColors] = useState<string[]>(generateSquareColors());

  const [draggingSquareIndex, setDraggingSquareIndex] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    setDraggingSquareIndex(index);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    const droppedSquareColor = squareColors[index];
    // Swap color
    const updatedSquareColors = [...squareColors];
    updatedSquareColors[index] = squareColors[draggingSquareIndex as number];
    updatedSquareColors[draggingSquareIndex as number] = droppedSquareColor;
    setSquareColors(updatedSquareColors);
    setDraggingSquareIndex(null);
  };

  const renderSquare = (i: number) => {
    return (
      <div
        key={i}
        className="square"
        draggable
        onDragStart={(e) => handleDragStart(e, i)}
        onDragOver={(e) => handleDragOver(e, i)}
        onDrop={(e) => handleDrop(e, i)}
        style={{ backgroundColor: squareColors[i] }}
      />
    );
  };

  return (
    <div className="chessboard">
      {Array(64)
        .fill(null)
        .map((_, i) => renderSquare(i))}
    </div>
  );
};

export default Chessboard;
