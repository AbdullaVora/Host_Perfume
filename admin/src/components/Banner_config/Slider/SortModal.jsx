import { useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ItemType = "SLIDER_ITEM";

const DraggableItem = ({ item, index, moveItem }) => {
    const ref = useRef(null);
    
    const [{ isDragging }, drag] = useDrag({
        type: ItemType,
        item: { id: item.id, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: ItemType,
        hover: (draggedItem, monitor) => {
            if (!ref.current) {
                return;
            }
            
            const dragIndex = draggedItem.index;
            const hoverIndex = index;
            
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }
            
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current.getBoundingClientRect();
            
            // Get vertical middle
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            
            // Determine mouse position
            const clientOffset = monitor.getClientOffset();
            
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            
            // Time to actually perform the action
            moveItem(dragIndex, hoverIndex);
            
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            draggedItem.index = hoverIndex;
        },
    });
    
    // Initialize drag and drop refs
    drag(drop(ref));

    return (
        <div
            ref={ref}
            className={`p-3 border bg-gray-100 rounded cursor-pointer flex items-center justify-between mb-2 transition ${
                isDragging ? "opacity-50" : "opacity-100"
            }`}
        >
            <strong>{item.name}</strong>
            <span className="cursor-move">⋮⋮</span>
        </div>
    );
};

const SortModal = ({ onClose, sliders, onConfirm }) => {
    const [sortedItems, setSortedItems] = useState(sliders);

    const moveItem = useCallback(
        (fromIndex, toIndex) => {
            console.log(`Moving from ${fromIndex} to ${toIndex}`);
            setSortedItems((prevItems) => {
                const result = [...prevItems];
                const [removed] = result.splice(fromIndex, 1);
                result.splice(toIndex, 0, removed);
                return result;
            });
        },
        []
    );

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md border-t-[6px] border-orange-500"
                >
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-gray-700">Slider Sorting</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-xl">✕</button>
                    </div>

                    <div className="space-y-2 max-h-[300px] overflow-y-auto">
                        {sortedItems.map((item, index) => (
                            <DraggableItem 
                                key={item.id} 
                                item={item} 
                                index={index} 
                                moveItem={moveItem} 
                            />
                        ))}
                    </div>

                    <div className="flex justify-end space-x-2 mt-6">
                        <button 
                            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700" 
                            onClick={() => onConfirm(sortedItems)}
                        >
                            Confirm
                        </button>
                        <button 
                            className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400" 
                            onClick={onClose}
                        >
                            Close
                        </button>
                    </div>
                </motion.div>
            </div>
        </DndProvider>
    );
};

export default SortModal;