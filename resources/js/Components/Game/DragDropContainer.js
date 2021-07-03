import React, { Component, useState, useEffect, useRef  } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const DragDropContainer = () => {
    const grid = 8;

    const [words, setWords] = useState();
    const [rightWords, setRightWords] = useState();

    useEffect(() => {
        getWords();
    }, []);

    useEffect(() => {
        if(isRight())
        {
            getWords();
        }
    }, [words]);

    // a little function to help us with reordering the result
    const reorder = (startIndex, endIndex) => {
        const result = Array.from(words);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    const getListStyle = isDraggingOver => ({
        background: isDraggingOver ? 'lightblue' : 'lightgrey',
        display: 'flex',
        padding: grid,
        overflow: 'auto',
    });


    function getWords()
    {
        fetch(route('api.game.getWords'))
        .then(res => res.json())
        .then((data) => {
            setWords(data.words);
            setRightWords(data.rightWords);
        })
        .catch(console.log)


    }

    function isRight(){
        fetch(route('api.game.isRight'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(words),
        })
        .then(res => res.json())
        .then((data) => {
            return data.isRight;
        })
        .catch(console.log)


        return false;
    }

    const getItemStyle = (isDragging, draggableStyle) => ({
        // some basic styles to make the words look a bit nicer
        userSelect: 'none',
        padding: grid * 2,
        margin: `0 ${grid}px 0 0`,

        // change background colour if dragging
        background: isDragging ? 'lightgreen' : 'grey',

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

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable" direction="horizontal">
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

    );

}

export default DragDropContainer;

