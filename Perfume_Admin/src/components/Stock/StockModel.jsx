import React, { useState } from 'react';

const StockModal = ({ product, onClose, onSave }) => {
    const [stockData, setStockData] = useState(
        product.variants?.variants?.map(variant => ({
            id: variant.id,
            name: variant.data[0].value,
            currentStock: variant.stock,
            newStock: variant.stock
        })) || []
    );

    const handleStockChange = (id, value) => {
        setStockData(prev => prev.map(item => 
            item.id === id ? { ...item, newStock: parseInt(value) || 0 } : item
        ));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            variants: stockData.map(item => ({
                id: item.id,
                stock: item.newStock
            }))
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Edit Stock for {product.name}</h2>
                    <button 
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                </div>
                
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4 mb-6 max-h-96 overflow-y-auto pr-2">
                        {stockData.length > 0 ? (
                            stockData.map(variant => (
                                <div key={variant.id} className="flex items-center justify-between p-2 border-b">
                                    <div>
                                        <span className="font-medium">{variant.name}</span>
                                        <p className="text-sm text-gray-500">Current: {variant.currentStock}</p>
                                    </div>
                                    <input
                                        type="number"
                                        min="0"
                                        value={variant.newStock}
                                        onChange={(e) => handleStockChange(variant.id, e.target.value)}
                                        className="w-24 px-3 py-1 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No variants available</p>
                        )}
                    </div>
                    
                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                            disabled={stockData.length === 0}
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StockModal;