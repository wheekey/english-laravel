import React, { Component, useState, useEffect, useRef  } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ReactCanvasConfetti from 'react-canvas-confetti';



const DragDropContainer = () => {
    const grid = 16;

    const [audio] = useState(new Audio('mp3/right-us.mp3'));
    const [words, setWords] = useState();
    const [gameId, setGameId] = useState();
    const [image, setGameImage] = useState();
    const [right, setIsRight] = useState(false);
    const [animationInstance, setAnimationInstance] = useState();

    useEffect(() => {
        getWords();
    }, []);

    useEffect(() => {
        if(gameId)
        {
            updateIsRight();
        }

    }, [words]);

    useEffect(() => {
        console.log(animationInstance);
    }, [animationInstance]);

    useEffect(() => {
        if(right)
        {
            makeShot(90, 0);
            audio.play();
            setTimeout(function () {
                getWords();
            }, 2000);
        }
    }, [right]);

    // a little function to help us with reordering the result
    const reorder = (startIndex, endIndex) => {
        const result = Array.from(words);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    const getListStyle = isDraggingOver => ({
        /*background: isDraggingOver ? 'lightblue' : 'lightgrey',*/
        display: 'flex',
        padding: grid,
        overflow: 'auto',
        justifyContent: 'space-between'
    });


    function getWords()
    {
        fetch(route('api.game.getWords'))
        .then(res => res.json())
        .then((data) => {
            setWords(data.words);
            setGameId(data.gameId);
            setGameImage(data.imageUrl);
            setIsRight(false);
        })
        .catch(console.log)
    }

    function updateIsRight(){
        fetch(route('api.game.isRight'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'words': words, 'gameId': gameId}),
        })
        .then(res => res.json())
        .then((data) => {
            setIsRight(data.isRight);
        })
        .catch(console.log)
    }

    const getItemStyle = (isDragging, draggableStyle) => ({
        // some basic styles to make the words look a bit nicer
        userSelect: 'none',
        padding: grid * 2,
        margin: `0 ${grid}px 0 0`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',

        // styles we need to apply on draggables
        ...draggableStyle,
    });

    function onDragEnd(result) {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const items = reorder(
            result.source.index,
            result.destination.index
        );

        setWords(items);
    }

    const canvasStyles = {
        position: 'fixed',
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0
    };

    function makeShot ()  {
        animationInstance && animationInstance({

            angle: 90,
            startVelocity: 45,
            spread: 90,
            ticks: 200,
            decay: 0.9,
            shapes: [
                    'circle',
                'square'
    ],
            particleCount: 100,
            origin:{
            x: 0.5,
                y: 0.3
        },
            colors: [
                '#26ccff',
                '#a25afd',
                '#ff5e7e',
                '#88ff5a',
                '#fcff42',
                '#ffa62d',
                '#ff36ff'
            ],
        });
    }

    function getInstance (instance) {
        console.log(123);
        setAnimationInstance(() =>instance);

    }

    return (
        <div>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="mb-16 ">
                    <img className="rounded" src={image} alt=""/>
                </div>

                <Droppable  droppableId="droppable" direction="horizontal">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                            {...provided.droppableProps}
                        >
                            {words && words.map((item, index) => (
                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            className="bg-bear bg-center bg-cover"
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                            )}
                                        >
                                            {item.content}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles}/>
        </div>
    );

}

export default DragDropContainer;

